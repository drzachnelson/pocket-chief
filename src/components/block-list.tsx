"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { flushSync } from "react-dom";
import { Brain, CaretDown, Info, Lightbulb, Warning, WarningCircle, WarningOctagon } from "@phosphor-icons/react";
import type { TopicBlock } from "@/lib/types";
import type { InlineSegment, LinkIndexEntry } from "@/lib/inline";
import { bulletDepth, createLinkScope, groupSections, headingLevel, isCallout, parseInline, stripMarkup } from "@/lib/inline";
import { InlineText } from "@/components/inline-text";
import { DecisionFlow } from "@/components/decision-flow";

// Supported blocks show and say nothing; only the exception is marked.
const isSupported = (block: TopicBlock) => block.claims.every((claim) => claim.status === "cited" && claim.citationIds.length > 0);

function UnsupportedMark() {
  return <span className="unsupported-mark" role="img" aria-label="Unsupported" title="Unsupported"><WarningCircle size={20} weight="fill" /></span>;
}

const TONE_ICONS = { pearl: Lightbulb, mnemonic: Brain, danger: WarningOctagon } as const;

/** Tone is colour and a decorative icon; nothing about it is spoken. */
function calloutIcon(block: TopicBlock) {
  if (!isCallout(block)) return null;
  const Icon = block.type === "summary" ? Info : block.type === "warning" && block.tone ? TONE_ICONS[block.tone] : Warning;
  return <span className="callout-icon"><Icon size={18} weight="fill" /></span>;
}

const calloutClass = (block: TopicBlock) => block.type === "summary" ? " summary-block" : block.type === "warning" ? ` warning-block${block.tone ? ` tone-${block.tone}` : ""}` : "";

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

/** What a block shows under its heading. Each block gets its own link scope, so a section that took in repeated-heading blocks links the same terms it did when they were rows. */
function blockContent(block: TopicBlock, linkEntries: LinkIndexEntry[], selfSlug: string): ReactNode {
  // Built fresh on every render, never memoized: parseInline records each linked key on the
  // scope so a term fires once per block, which means a reused scope renders the second pass
  // with every link already spent.
  const scope = createLinkScope(linkEntries, selfSlug);
  const inline = (text: string) => <InlineText segments={parseInline(text, scope)} />;
  if (block.type === "summary" || block.type === "prose" || block.type === "warning") return <p>{inline(block.text)}</p>;
  if (block.type === "bullets") return <BulletList nodes={bulletTree(block.items, (text) => parseInline(text, scope))} />;
  if (block.type === "table") return <div className="table-scroll"><table data-columns={block.columns.length}><thead><tr>{block.columns.map((column) => <th key={column}>{inline(column)}</th>)}</tr></thead><tbody>{block.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell}>{inline(cell)}</th> : <td key={`${row[0]}-${cell}`}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
  if (block.type === "sequence") return <ol className="sequence-list">{block.steps.map((step, index) => <li key={step.title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><div><strong>{inline(step.title)}</strong><p>{inline(step.detail)}</p></div></li>)}</ol>;
  if (block.type === "flow") return <DecisionFlow block={block} renderInline={inline} />;
  if (block.type === "image") return <><Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/${block.mediaId}`} alt={block.alt} width={1200} height={630} unoptimized />{block.caption && <figcaption>{inline(block.caption)}</figcaption>}</>;
  return null;
}

/**
 * One section of the page. `merged` holds the blocks whose `↳` heading only repeated this block's: their content follows
 * under this one title and disclosure, each still addressable by its own id.
 */
export function Block({ block, merged = [], expanded, linkEntries, selfSlug, onToggle }: { block: TopicBlock; merged?: TopicBlock[]; expanded: boolean; linkEntries: LinkIndexEntry[]; selfSlug: string; onToggle: (id: string, open: boolean) => void }) {
  if (block.type === "references") return null;
  const title = block.heading ? headingLevel(block.heading) : null;
  const collapsible = Boolean(title) && !isCallout(block);
  const Heading = title?.level === 3 ? "h3" : "h2";
  // Headings parse emphasis but not links — an anchor inside a <summary> would both navigate
  // and toggle the section on the same click.
  const headingNode = title && <Heading><InlineText segments={parseInline(title.text)} /></Heading>;
  // The one mark for the whole section: a merged block has no row of its own to carry one.
  const mark = [block, ...merged].every(isSupported) ? null : <UnsupportedMark />;
  const icon = calloutIcon(block);
  const anchors = { id: block.id, "data-block-id": block.id, ...(title?.level === 3 ? { "data-level": "3" } : {}) };
  const actions = mark && <div className="block-actions">{mark}</div>;
  // A block with no heading row has nowhere to put its icon and mark, so they lead it instead.
  const lead = !title && (icon || mark) ? <div className="block-heading">{icon}{mark}</div> : null;
  if (block.type === "image" && !collapsible) return <figure {...anchors} className="topic-block">{lead}{blockContent(block, linkEntries, selfSlug)}</figure>;
  const content = (part: TopicBlock) => part.type === "image" ? <figure>{blockContent(part, linkEntries, selfSlug)}</figure> : blockContent(part, linkEntries, selfSlug);
  if (collapsible) {
    const parts = merged.map((part) => { const partIcon = calloutIcon(part); return <div key={part.id} id={part.id} data-block-id={part.id} className={`topic-block section-part${calloutClass(part)}`}>{partIcon && <div className="block-heading">{partIcon}</div>}{content(part)}</div>; });
    return <details {...anchors} className="topic-block section-block" open={expanded} onToggle={(event) => onToggle(block.id, event.currentTarget.open)}><summary className="block-heading" aria-label={`${stripMarkup(title!.text)}${mark ? ", unsupported" : ""}`}>{headingNode}<span className="block-disclosure" aria-hidden="true"><CaretDown size={13} weight="bold" /></span>{actions}</summary>{content(block)}{parts}</details>;
  }
  return <section {...anchors} className={`topic-block${calloutClass(block)}`}>{title ? <div className="block-heading">{icon}{headingNode}{actions}</div> : lead}{content(block)}</section>;
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
  const groups = useMemo(() => groupSections(blocks), [blocks]);
  // A block merged into the section above has no disclosure of its own; a link to it opens that section.
  const owners = useMemo(() => new Map(groups.flatMap(({ block, merged }) => merged.map((part) => [part.id, block.id] as const))), [groups]);
  // Callouts stay open prose; only headed non-callout sections carry a disclosure.
  const collapsibleIds = useMemo(() => groups.filter(({ block }) => block.heading && !isCallout(block)).map(({ block }) => block.id), [groups]);
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
    const blockId = blockIds.has(targetId) ? owners.get(targetId) ?? targetId : target?.closest<HTMLDetailsElement>("details[data-block-id]")?.dataset.blockId;
    if (!blockId) return;
    // Committed before the scroll, so the target exists and is open when the page is aimed at it. The browser's own hash jump
    // already happened while Notes was hidden or the section closed, and landed short.
    flushSync(() => { showNotes?.(); setBlockOpen(blockId, true); });
    document.getElementById(targetId)?.scrollIntoView();
    window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
  }, [blockIds, owners, setBlockOpen, showNotes]);

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
  const groups = useMemo(() => groupSections(blocks), [blocks]);
  return <article className="topic-article" ref={rootRef}>{groups.map(({ block, merged }) => <Block key={block.id} block={block} merged={merged} expanded={!collapsed.has(block.id)} linkEntries={linkEntries} selfSlug={selfSlug} onToggle={setBlockOpen} />)}</article>;
}
