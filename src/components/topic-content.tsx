"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BookmarkSimple, Brain, CaretDown, CaretUp, CheckCircle, Warning, WarningOctagon } from "@phosphor-icons/react";
import type { SuppliedSource, Topic, TopicBlock } from "@/lib/types";
import type { InlineSegment, LinkIndexEntry } from "@/lib/inline";
import { bulletDepth, createLinkScope, headingLevel, parseInline } from "@/lib/inline";
import { isTopicReviewed, isTopicSaved, recordRecentView, setTopicReviewed, setTopicSaved } from "@/lib/offline";
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

function Block({ block, expanded, linkEntries, selfSlug, onToggle }: { block: TopicBlock; expanded: boolean; linkEntries: LinkIndexEntry[]; selfSlug: string; onToggle: (id: string, open: boolean) => void }) {
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
    if (collapsible) return <details {...anchors} className={`topic-block section-block${extra}`} open={expanded} onToggle={(event) => onToggle(block.id, event.currentTarget.open)}><summary className="block-heading" aria-label={title!.text}>{headingNode}<span className="block-disclosure" aria-hidden="true"><CaretDown size={13} weight="bold" /></span>{actions}</summary>{children}</details>;
    return <section {...anchors} className={`topic-block${extra}`}>{title ? <div className="block-heading">{icon}{headingNode}{actions}</div> : icon}{children}</section>;
  };
  if (block.type === "summary") return frame(<p>{inline(block.text)}</p>, " summary-block");
  if (block.type === "prose") return frame(<p>{inline(block.text)}</p>);
  if (block.type === "warning") return frame(<p>{inline(block.text)}</p>, ` warning-block${block.tone ? ` tone-${block.tone}` : ""}`);
  if (block.type === "bullets") return frame(<BulletList nodes={bulletTree(block.items, (text) => parseInline(text, scope))} />);
  if (block.type === "table") return frame(<div className="table-scroll"><table><thead><tr>{block.columns.map((column) => <th key={column}>{inline(column)}</th>)}</tr></thead><tbody>{block.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell}>{inline(cell)}</th> : <td key={`${row[0]}-${cell}`}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>);
  if (block.type === "sequence") return frame(<ol className="sequence-list">{block.steps.map((step, index) => <li key={step.title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><div><strong>{inline(step.title)}</strong><p>{inline(step.detail)}</p></div></li>)}</ol>);
  if (block.type === "flow") return frame(<DecisionFlow block={block} renderInline={inline} />);
  if (block.type === "image") {
    const media = <><Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/${block.mediaId}`} alt={block.alt} width={1200} height={630} unoptimized />{block.caption && <figcaption>{inline(block.caption)}</figcaption>}</>;
    return collapsible ? frame(<figure>{media}</figure>) : <figure id={block.id} data-block-id={block.id} className="topic-block">{media}</figure>;
  }
  return null;
}

export interface NextTopicMetadata {
  slug: string;
  label: string;
  categoryLabel: string;
}

export function TopicContent({ topic, sources, linkEntries, nextTopic }: { topic: Topic; sources: SuppliedSource[]; linkEntries: LinkIndexEntry[]; nextTopic?: NextTopicMetadata }) {
  const [saved, setSaved] = useState(false);
  const [savedReady, setSavedReady] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [reviewedReady, setReviewedReady] = useState(false);
  const [reviewSaving, setReviewSaving] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const savedTouched = useRef(false);
  const version = topic.approvedVersion!;
  const blocks = useMemo(() => version.blocks.filter((block) => block.type !== "references"), [version]);
  // Callouts stay open prose; only headed non-callout sections carry a disclosure.
  const collapsible = useMemo(() => blocks.filter((block) => block.heading && block.type !== "summary" && block.type !== "warning").map((block) => block.id), [blocks]);
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => new Set(collapsible));
  const allOpen = collapsed.size === 0;
  // Mirroring every native toggle back into state is what lets "Open all" reopen a section the
  // reader closed by hand — otherwise React sees an unchanged `open` prop and leaves the DOM alone.
  const setBlockOpen = useCallback((id: string, open: boolean) => {
    setCollapsed((current) => { if (open !== current.has(id)) return current; const next = new Set(current); if (open) next.delete(id); else next.add(id); return next; });
  }, []);

  const openDeepLinkedBlock = useCallback(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    let targetId = hash;
    try { targetId = decodeURIComponent(hash); } catch { return; }
    const target = document.getElementById(targetId);
    const details = target?.closest<HTMLDetailsElement>("details[data-block-id]");
    if (!details) return;
    const blockId = details.dataset.blockId;
    if (blockId) setBlockOpen(blockId, true);
    // The browser already made its own hash jump while this section was still closed, so it
    // landed short of the heading. Re-aim once React has committed the open state and the
    // sections below it have reflowed.
    window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
  }, [setBlockOpen]);

  useEffect(() => {
    recordRecentView(topic).catch(() => undefined);
    // A blocked IndexedDB request neither resolves nor rejects, so awaiting it alone left
    // Save disabled forever. Racing a timeout means the button is always usable; the worst
    // case is that it opens showing "Save" on a topic already saved on this device, which
    // toggleSaved corrects on the next write.
    Promise.race([isTopicSaved(topic.id), new Promise<boolean | undefined>((resolve) => setTimeout(() => resolve(undefined), 1500))])
      .then((value) => { if (typeof value === "boolean" && !savedTouched.current) setSaved(value); }).catch(() => undefined).finally(() => setSavedReady(true));
    Promise.race([isTopicReviewed(topic.id), new Promise<boolean | undefined>((resolve) => setTimeout(() => resolve(undefined), 1500))])
      .then((value) => { if (typeof value === "boolean") setReviewed(value); }).catch(() => undefined).finally(() => setReviewedReady(true));
  }, [topic]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(openDeepLinkedBlock);
    window.addEventListener("hashchange", openDeepLinkedBlock);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("hashchange", openDeepLinkedBlock); };
  }, [openDeepLinkedBlock]);

  function toggleSaved() {
    savedTouched.current = true;
    const next = !saved; setSaved(next); setSaveError("");
    setTopicSaved(topic, next).catch(() => setSaveError("This device blocked private storage, so the bookmark was not kept."));
  }

  function toggleReviewed() {
    if (!reviewedReady || reviewSaving) return;
    const next = !reviewed;
    setReviewed(next);
    setReviewError("");
    setReviewSaving(true);
    setTopicReviewed(topic, next)
      .catch((error) => {
        setReviewed(!next);
        setReviewError(error instanceof Error ? error.message : "Could not save reviewed status on this device.");
      })
      .finally(() => setReviewSaving(false));
  }

  return (
    <>
      <div className="topic-actions-row"><button className={`button secondary small ${saved ? "saved" : ""}`} disabled={!savedReady} onClick={toggleSaved}><BookmarkSimple size={14} weight={saved ? "fill" : "regular"} />{saved ? "Saved offline" : "Save"}</button>{collapsible.length > 0 && <button className="expand-toggle" onClick={() => setCollapsed(allOpen ? new Set(collapsible) : new Set())}>{allOpen ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}{allOpen ? "Close all" : "Open all"}</button>}{saveError && <span className="form-message" role="alert">{saveError}</span>}</div>
      <Tabs.Root defaultValue="notes" className="topic-tabs">
        <Tabs.List className="tabs-list" aria-label="Topic views"><Tabs.Trigger value="notes">Notes</Tabs.Trigger><Tabs.Trigger value="sources">Sources <span>{sources.length}</span></Tabs.Trigger><Tabs.Trigger value="history">History <span>{topic.versions.length}</span></Tabs.Trigger></Tabs.List>
        <Tabs.Content value="notes"><article className="topic-article">{blocks.map((block) => <Block key={block.id} block={block} expanded={!collapsed.has(block.id)} linkEntries={linkEntries} selfSlug={topic.slug} onToggle={setBlockOpen} />)}</article></Tabs.Content>
        <Tabs.Content value="sources"><div className="source-list">{sources.map((source, index) => <article key={source.id}><span>{index + 1}</span><div><h2>{source.title}</h2><p>{source.citation}</p>{source.details && <small>{source.details}</small>}</div></article>)}</div></Tabs.Content>
        <Tabs.Content value="history"><div className="history-list">{topic.versions.map((item) => <article key={item.id}><span className="status-dot" /><div><h2>Version {item.versionNumber} · {item.status}</h2><p>{item.reviewedAt ? `Reviewed ${new Date(item.reviewedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : "Draft in review"}</p></div></article>)}</div></Tabs.Content>
      </Tabs.Root>
      <section className="topic-progress" aria-label="Study progress">
        <div className="topic-progress-status">
          <p className="eyebrow">Study progress</p>
          <p className="topic-review-status" role="status">{reviewed ? "Reviewed on this device" : "Not reviewed on this device"}</p>
          <button className={`button secondary small ${reviewed ? "saved" : ""}`} type="button" aria-pressed={reviewed} disabled={!reviewedReady || reviewSaving} onClick={toggleReviewed}>{reviewSaving ? "Saving…" : reviewed ? "Mark not reviewed" : "Mark reviewed"}</button>
          {reviewError && <span className="form-message" role="alert">{reviewError}</span>}
        </div>
        <div className="topic-next">
          <p className="eyebrow">Continue studying</p>
          {nextTopic ? <Link className="topic-next-link" href={`/topics/${nextTopic.slug}`} aria-label={`Next topic: ${nextTopic.label} — ${nextTopic.categoryLabel}`}><span>Next topic</span><strong>{nextTopic.label}</strong><small>{nextTopic.categoryLabel}</small></Link> : <Link className="topic-next-link" href="/topics" aria-label="End of category: back to all topics"><span>End of category</span><strong>Back to all topics</strong></Link>}
        </div>
      </section>
    </>
  );
}
