"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { flushSync } from "react-dom";
import { Brain, CaretDown, CheckCircle, Warning, WarningOctagon } from "@phosphor-icons/react";
import type { TopicBlock } from "@/lib/types";
import type { InlineSegment, LinkIndexEntry } from "@/lib/inline";
import { bulletDepth, createLinkScope, headingLevel, parseInline, stripMarkup } from "@/lib/inline";
import { InlineText } from "@/components/inline-text";
import { DecisionFlow } from "@/components/decision-flow";

function SupportMark({ block }: { block: TopicBlock }) {
  const supported = block.claims.every((claim) => claim.status === "cited" && claim.citationIds.length > 0);
  return <span className={`support-mark ${supported ? "supported" : "unsupported"}`} title={supported ? "All factual claims linked to supplied sources" : "Unresolved source support"}><CheckCircle size={13} weight="fill" />{supported ? "Supported" : "Needs support"}</span>;
}

const CALLOUT_ICONS = { pearl: CheckCircle, mnemonic: Brain, danger: WarningOctagon } as const;

function CalloutIcon({ tone }: { tone?: "pearl" | "mnemonic" | "danger" }) {
  const Icon = tone ? CALLOUT_ICONS[tone] : Warning;
  return <span className="callout-icon"><Icon size={15} weight="fill" /></span>;
}

interface BulletNode { item: string; segments: InlineSegment[]; depth: 0 | 1 | 2; children: BulletNode[] }

/**
 * Turns the flat `- ` / `-- ` prefixed items into real nesting. A flat list with left padding
 * looks indented but tells a screen reader nothing about what belongs under what.
 *
 * Parsing happens here rather than in the leaf so every `parseInline` call for a block runs
 * inside that block's render, in document order, against the one scope it was given.
 */
function bulletTree(items: string[], parse: (text: string) => InlineSegment[]): BulletNode[] {
  const roots: BulletNode[] = [];
  const stack: BulletNode[] = [];
  for (const item of items) {
    const { depth, text } = bulletDepth(item);
    const node: BulletNode = { item, segments: parse(text), depth, children: [] };
    // A `--` item that never got a `-` parent hangs off the nearest shallower item instead.
    while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
    (stack[stack.length - 1]?.children ?? roots).push(node);
    stack.push(node);
  }
  return roots;
}

function BulletList({ nodes, nested }: { nodes: BulletNode[]; nested?: boolean }) {
  return <ul className={nested ? "clinical-list clinical-list-nested" : "clinical-list"}>{nodes.map((node) => <li key={node.item} data-depth={node.depth}><span><InlineText segments={node.segments} /></span>{node.children.length > 0 && <BulletList nodes={node.children} nested />}</li>)}</ul>;
}

export function Block({ block, expanded, linkEntries, selfSlug, onToggle }: { block: TopicBlock; expanded: boolean; linkEntries: LinkIndexEntry[]; selfSlug: string; onToggle: (id: string, open: boolean) => void }) {
  // Built fresh on every render, never memoized: parseInline records each linked key on the
  // scope so a term fires once per block, which means a reused scope renders the second pass
  // with every link already spent.
  const scope = createLinkScope(linkEntries, selfSlug);
  const inline = (text: string) => <InlineText segments={parseInline(text, scope)} />;
  const title = block.heading ? headingLevel(block.heading) : null;
  const callout = block.type === "summary" || block.type === "warning";
  const collapsible = Boolean(title) && !callout;
  const Heading = title?.level === 3 ? "h3" : "h2";
  // Headings parse emphasis but not links — an anchor inside a <summary> would both navigate
  // and toggle the section on the same click.
  const headingNode = title && <Heading><InlineText segments={parseInline(title.text)} /></Heading>;
  const icon = block.type === "warning" ? <CalloutIcon tone={block.tone} /> : null;
  const actions = title && <div className="block-actions"><SupportMark block={block} /></div>;
  const frame = (children: ReactNode, extra = "") => {
    const anchors = { id: block.id, "data-block-id": block.id, ...(title?.level === 3 ? { "data-level": "3" } : {}) };
    if (collapsible) return <details {...anchors} className={`topic-block section-block${extra}`} open={expanded} onToggle={(event) => onToggle(block.id, event.currentTarget.open)}><summary className="block-heading" aria-label={stripMarkup(title!.text)}>{headingNode}<span className="block-disclosure" aria-hidden="true"><CaretDown size={13} weight="bold" /></span>{actions}</summary>{children}</details>;
    return <section {...anchors} className={`topic-block${extra}`}>{title ? <div className="block-heading">{icon}{headingNode}{actions}</div> : icon}{children}</section>;
  };
  if (block.type === "summary") return frame(<p>{inline(block.text)}</p>, " summary-block");
  if (block.type === "prose") return frame(<p>{inline(block.text)}</p>);
  if (block.type === "warning") return frame(<p>{inline(block.text)}</p>, ` warning-block${block.tone ? ` tone-${block.tone}` : ""}`);
  if (block.type === "bullets") return frame(<BulletList nodes={bulletTree(block.items, (text) => parseInline(text, scope))} />);
  if (block.type === "table") return frame(<div className="table-scroll"><table data-columns={block.columns.length}><thead><tr>{block.columns.map((column) => <th key={column}>{inline(column)}</th>)}</tr></thead><tbody>{block.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell}>{inline(cell)}</th> : <td key={`${row[0]}-${cell}`}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>);
  if (block.type === "sequence") return frame(<ol className="sequence-list">{block.steps.map((step, index) => <li key={step.title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><div><strong>{inline(step.title)}</strong><p>{inline(step.detail)}</p></div></li>)}</ol>);
  if (block.type === "flow") return frame(<DecisionFlow block={block} renderInline={inline} />);
  if (block.type === "image") {
    const media = <><Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/${block.mediaId}`} alt={block.alt} width={1200} height={630} unoptimized />{block.caption && <figcaption>{inline(block.caption)}</figcaption>}</>;
    return collapsible ? frame(<figure>{media}</figure>) : <figure id={block.id} data-block-id={block.id} className="topic-block">{media}</figure>;
  }
  return null;
}

/**
 * Opens the section a node sits in, so a find match inside it can be seen. It sets the native attribute, as a tap on the summary does,
 * and the `toggle` event mirrors that into state through `setBlockOpen`; nothing closes a section again.
 */
export function openSectionAround(node: Node) {
  for (let section = node.parentElement?.closest("details"); section; section = section.parentElement?.closest("details")) section.open = true;
}

export interface BlockCollapse {
  rootRef: RefObject<HTMLElement | null>;
  collapsed: ReadonlySet<string>;
  collapsibleIds: string[];
  allOpen: boolean;
  toggleAll: () => void;
  setBlockOpen: (id: string, open: boolean) => void;
}

/**
 * Owns which sections are open, and the hash-deep-link handling that has to reopen one.
 *
 * Both are keyed on `block.id` alone, so the whole mechanism suits any surface that renders
 * blocks — the reason it lives here rather than in `TopicContent`. `showNotes` switches a tabbed
 * page back to the tab that renders these blocks before a deep link scrolls to one.
 */
export function useBlockCollapse(blocks: TopicBlock[], showNotes?: () => void): BlockCollapse {
  const rootRef = useRef<HTMLElement | null>(null);
  const blockIds = useMemo(() => new Set(blocks.map((block) => block.id)), [blocks]);
  // Callouts stay open prose; only headed non-callout sections carry a disclosure.
  const collapsibleIds = useMemo(() => blocks.filter((block) => block.heading && block.type !== "summary" && block.type !== "warning").map((block) => block.id), [blocks]);
  const identity = collapsibleIds.join(" ");
  const [state, setState] = useState<{ identity: string; collapsed: ReadonlySet<string> }>(() => ({ identity, collapsed: new Set(collapsibleIds) }));
  // `useState` initializes once, so a mounted list handed a different set of blocks would keep
  // the previous surface's open sections. Re-derive during render rather than in an effect,
  // which would paint the stale state for a frame first.
  if (state.identity !== identity) setState({ identity, collapsed: new Set(collapsibleIds) });
  const collapsed = state.identity === identity ? state.collapsed : new Set(collapsibleIds);
  const allOpen = collapsed.size === 0;

  // Mirroring every native toggle back into state is what lets "Open all" reopen a section the
  // reader closed by hand — otherwise React sees an unchanged `open` prop and leaves the DOM alone.
  const setBlockOpen = useCallback((id: string, open: boolean) => {
    setState((current) => {
      if (open !== current.collapsed.has(id)) return current;
      const next = new Set(current.collapsed);
      if (open) next.delete(id); else next.add(id);
      return { ...current, collapsed: next };
    });
  }, []);

  const toggleAll = useCallback(() => {
    setState((current) => ({ ...current, collapsed: current.collapsed.size === 0 ? new Set(collapsibleIds) : new Set() }));
  }, [collapsibleIds]);

  const reveal = useCallback((targetId: string) => {
    // Notes is unmounted on the other tabs, so a page's own block ids decide what the hash means, not the DOM. An element that is
    // on the page but outside this list belongs to another list, because `getElementById` is global.
    const target = document.getElementById(targetId);
    if (target && !rootRef.current?.contains(target)) return;
    const blockId = blockIds.has(targetId) ? targetId : target?.closest<HTMLDetailsElement>("details[data-block-id]")?.dataset.blockId;
    if (!blockId) return;
    // Committed before the scroll, so the target exists and is open when the page is aimed at it. The browser's own hash jump
    // already happened while Notes was hidden or the section closed, and landed short.
    flushSync(() => { showNotes?.(); setBlockOpen(blockId, true); });
    document.getElementById(targetId)?.scrollIntoView();
    window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
  }, [blockIds, setBlockOpen, showNotes]);

  useEffect(() => {
    const decode = (hash: string) => { try { return decodeURIComponent(hash); } catch { return ""; } };
    const fromLocation = () => { const id = decode(window.location.hash.slice(1)); if (id) reveal(id); };
    // A link to the hash the page already has fires no hashchange, so an in-page link is also read where it is clicked. That covers Contents,
    // whose sidebar copy sits outside this tree.
    const onClick = (event: MouseEvent) => {
      const href = (event.target as Element | null)?.closest?.("a[href^='#']")?.getAttribute("href");
      const id = href && decode(href.slice(1));
      if (id) reveal(id);
    };
    const frame = window.requestAnimationFrame(fromLocation);
    window.addEventListener("hashchange", fromLocation);
    document.addEventListener("click", onClick);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("hashchange", fromLocation); document.removeEventListener("click", onClick); };
  }, [reveal]);

  return { rootRef, collapsed, collapsibleIds, allOpen, toggleAll, setBlockOpen };
}

export function BlockList({ blocks, collapse, linkEntries, selfSlug }: { blocks: TopicBlock[]; collapse: BlockCollapse; linkEntries: LinkIndexEntry[]; selfSlug: string }) {
  // Destructured rather than used as `collapse.rootRef` in the JSX: react-hooks/refs reads a
  // property access in a ref position as reading ref.current during render.
  const { rootRef, collapsed, setBlockOpen } = collapse;
  return <article className="topic-article" ref={rootRef}>{blocks.map((block) => <Block key={block.id} block={block} expanded={!collapsed.has(block.id)} linkEntries={linkEntries} selfSlug={selfSlug} onToggle={setBlockOpen} />)}</article>;
}
