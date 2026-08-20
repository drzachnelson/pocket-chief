"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BookmarkSimple, Brain, CaretDown, CaretUp, CheckCircle, Copy, DownloadSimple, Lightning, Warning, WarningOctagon, X } from "@phosphor-icons/react";
import type { ClozeDraft, SuppliedSource, Topic, TopicBlock, TopicVersion } from "@/lib/types";
import type { InlineSegment, LinkIndexEntry } from "@/lib/inline";
import { buildAnkiMobileUrl, createFallbackCloze, sendToAnkiConnect, toAnkiTsv } from "@/lib/anki";
import { loadAnkiSettings } from "@/lib/anki-settings";
import { bulletDepth, createLinkScope, headingLevel, parseInline, stripMarkup } from "@/lib/inline";
import { isTopicSaved, recordRecentView, setTopicSaved } from "@/lib/offline";
import { InlineText } from "@/components/inline-text";
import { DecisionFlow } from "@/components/decision-flow";

// Every string that leaves the reading view is stripped: an Anki card is plain text, and a
// `**` or `[[` that survives into a flashcard is a defect the owner only sees at review time.
function excerpt(block: TopicBlock) {
  if (block.type === "summary" || block.type === "prose" || block.type === "warning") return stripMarkup(block.text);
  if (block.type === "bullets") return stripMarkup(block.items[0] ?? "");
  if (block.type === "sequence") return stripMarkup(block.steps[0]?.detail ?? "");
  if (block.type === "table") return stripMarkup(block.rows[0]?.join(" — ") ?? "");
  if (block.type === "flow") return stripMarkup(block.nodes.map((node) => node.label).join(" → "));
  return block.heading ? stripMarkup(block.heading) : "Pocket Chief";
}

function contextImageDataUrl(rawHeading: string, rawText: string, rawDiagram: string) {
  // Strip before slicing: cutting a `**` in half would leave the marker visible on the card image.
  const [heading, text, diagram] = [rawHeading, rawText, rawDiagram].map(stripMarkup);
  const safe = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[character]!));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f5f7fb"/><rect x="70" y="55" width="1060" height="520" rx="30" fill="#fff" stroke="#dfe4ec" stroke-width="3"/><rect x="70" y="55" width="16" height="520" rx="8" fill="#1748d2"/><text x="125" y="140" font-family="Arial,sans-serif" font-weight="700" font-size="34" fill="#182033">${safe(heading)}</text><foreignObject x="125" y="175" width="900" height="190"><div xmlns="http://www.w3.org/1999/xhtml" style="font:27px/1.4 Arial,sans-serif;color:#465168">${safe(text.slice(0, 240))}</div></foreignObject><rect x="125" y="395" width="900" height="80" rx="18" fill="#edf2ff" stroke="#b7c6f9"/><text x="155" y="430" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#1748d2">NEAREST DECISION FLOW</text><text x="155" y="458" font-family="Arial,sans-serif" font-size="18" fill="#465168">${safe(diagram.slice(0, 88))}</text><text x="125" y="535" font-family="Arial,sans-serif" font-size="20" fill="#1748d2">POCKET CHIEF · REVIEWED SECTION</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

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

function BulletList({ nodes, nested, onCard }: { nodes: BulletNode[]; nested?: boolean; onCard: (item: string) => void }) {
  return <ul className={nested ? "clinical-list clinical-list-nested" : "clinical-list"}>{nodes.map((node) => <li key={node.item} data-depth={node.depth}><span><InlineText segments={node.segments} /></span><button aria-label={`Make Anki card from ${stripMarkup(node.item)}`} onClick={() => onCard(node.item)}><Lightning size={13} /></button>{node.children.length > 0 && <BulletList nodes={node.children} nested onCard={onCard} />}</li>)}</ul>;
}

function Block({ block, expanded, linkEntries, selfSlug, onToggle, onMakeCard }: { block: TopicBlock; expanded: boolean; linkEntries: LinkIndexEntry[]; selfSlug: string; onToggle: (id: string, open: boolean) => void; onMakeCard: (text: string, block: TopicBlock) => void }) {
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
  // preventDefault is what actually stops the disclosure: a summary's activation behaviour runs
  // for clicks anywhere in its subtree unless the event is cancelled.
  const actions = title && <div className="block-actions"><SupportMark block={block} /><button className="anki-inline" onClick={(event) => { event.preventDefault(); event.stopPropagation(); onMakeCard(excerpt(block), block); }}><Lightning size={13} weight="fill" />Make Anki</button></div>;
  const frame = (children: ReactNode, extra = "") => {
    const anchors = { id: block.id, "data-block-id": block.id, ...(title?.level === 3 ? { "data-level": "3" } : {}) };
    if (collapsible) return <details {...anchors} className={`topic-block section-block${extra}`} open={expanded} onToggle={(event) => onToggle(block.id, event.currentTarget.open)}><summary className="block-heading" aria-label={title!.text}>{headingNode}<span className="block-disclosure" aria-hidden="true"><CaretDown size={13} weight="bold" /></span>{actions}</summary>{children}</details>;
    return <section {...anchors} className={`topic-block${extra}`}>{title ? <div className="block-heading">{icon}{headingNode}{actions}</div> : icon}{children}</section>;
  };
  if (block.type === "summary") return frame(<p>{inline(block.text)}</p>, " summary-block");
  if (block.type === "prose") return frame(<p>{inline(block.text)}</p>);
  if (block.type === "warning") return frame(<p>{inline(block.text)}</p>, ` warning-block${block.tone ? ` tone-${block.tone}` : ""}`);
  if (block.type === "bullets") return frame(<BulletList nodes={bulletTree(block.items, (text) => parseInline(text, scope))} onCard={(item) => onMakeCard(stripMarkup(item), block)} />);
  if (block.type === "table") return frame(<div className="table-scroll"><table><thead><tr>{block.columns.map((column) => <th key={column}>{inline(column)}</th>)}</tr></thead><tbody>{block.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell}>{inline(cell)}</th> : <td key={`${row[0]}-${cell}`}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>);
  if (block.type === "sequence") return frame(<ol className="sequence-list">{block.steps.map((step, index) => <li key={step.title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><div><strong>{inline(step.title)}</strong><p>{inline(step.detail)}</p></div><button aria-label={`Make Anki card from ${stripMarkup(step.title)}`} onClick={() => onMakeCard(stripMarkup(`${step.title}: ${step.detail}`), block)}><Lightning size={13} /></button></li>)}</ol>);
  if (block.type === "flow") return frame(<DecisionFlow block={block} renderInline={inline} />);
  if (block.type === "image") {
    const media = <><Image src={`/api/media/${block.mediaId}`} alt={block.alt} width={1200} height={630} unoptimized />{block.caption && <figcaption>{inline(block.caption)}</figcaption>}</>;
    return collapsible ? frame(<figure>{media}</figure>) : <figure id={block.id} data-block-id={block.id} className="topic-block">{media}</figure>;
  }
  return null;
}

function AnkiDialog({ selection, topic, block, onClose }: { selection: string; topic: Topic; block: TopicBlock; onClose: () => void }) {
  const defaultCloze = useMemo(() => createFallbackCloze(selection), [selection]);
  const [text, setText] = useState(defaultCloze);
  const [status, setStatus] = useState("");
  const [persistedDraft, setPersistedDraft] = useState<ClozeDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const textRef = useRef(defaultCloze);
  const userEditedRef = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contextRef = useMemo(() => {
    const nearestFlow = topic.approvedVersion?.blocks.find((item) => item.type === "flow");
    const diagram = nearestFlow?.type === "flow" ? nearestFlow.nodes.map((node) => node.label).join(" → ") : "No nearby diagram supplied.";
    return contextImageDataUrl(block.heading ?? topic.title, excerpt(block), diagram);
  }, [block, topic]);

  useEffect(() => {
    let active = true;
    fetch("/api/anki/drafts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ selection, topicId: topic.id, sourceBlockIds: [block.id], contextImageRef: contextRef, tags: ["pocket-chief", ...topic.tags] }) })
      .then(async (response) => {
        const value = await response.json() as { draft?: ClozeDraft; error?: string };
        if (!response.ok || !value.draft) throw new Error(value.error ?? "Could not save this private draft.");
        return { draft: value.draft };
      })
      .then((value) => { if (active && value?.draft) { setPersistedDraft(value.draft); if (!userEditedRef.current && value.draft.clozeText) { textRef.current = value.draft.clozeText; setText(value.draft.clozeText); } } })
      .catch((error) => { if (active) setStatus(`${error instanceof Error ? error.message : "Could not save this private draft."} Export stays disabled.`); });
    return () => { active = false; };
  }, [block.id, contextRef, selection, topic.id, topic.tags]);

  async function draft(): Promise<ClozeDraft> {
    if (!persistedDraft) throw new Error("The private cloze draft is not ready.");
    const reviewedText = textRef.current;
    if (persistedDraft.clozeText === reviewedText) return persistedDraft;
    setSaving(true);
    try {
      const response = await fetch(`/api/anki/drafts/${persistedDraft.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ clozeText: reviewedText }) });
      const data = await response.json() as { draft?: ClozeDraft; error?: string };
      if (!response.ok || !data.draft) throw new Error(data.error ?? "Could not save the reviewed cloze draft.");
      setPersistedDraft(data.draft);
      setStatus("Reviewed card saved privately");
      return data.draft;
    } finally { setSaving(false); }
  }
  async function copyTsv() { try { const value = toAnkiTsv([await draft()], loadAnkiSettings()); await navigator.clipboard.writeText(value); setStatus("TSV copied"); } catch (error) { setStatus(error instanceof Error ? error.message : "Could not save this card."); } }
  async function openMobile() { try { window.location.href = buildAnkiMobileUrl(await draft(), loadAnkiSettings()); } catch (error) { setStatus(error instanceof Error ? error.message : "Could not save this card."); } }
  async function exportDesktop() {
    let card: ClozeDraft;
    try { card = await draft(); }
    catch (error) { setStatus(error instanceof Error ? error.message : "Could not save this card."); return; }
    const settings = loadAnkiSettings();
    try { await sendToAnkiConnect(card, settings); setStatus("Added through AnkiConnect"); }
    catch {
      const blob = new Blob([toAnkiTsv([card], settings)], { type: "text/tab-separated-values;charset=utf-8" });
      const anchor = document.createElement("a"); anchor.href = URL.createObjectURL(blob); anchor.download = "Pocket-Chief-Anki.tsv"; anchor.click(); URL.revokeObjectURL(anchor.href);
      setStatus("AnkiConnect was unavailable; downloaded a UTF-8 import file.");
    }
  }
  async function close() {
    if (!persistedDraft) { setStatus("Saving the private draft. Try closing again in a moment."); return; }
    try { if (persistedDraft.clozeText !== textRef.current) await draft(); onClose(); }
    catch (error) { setStatus(error instanceof Error ? error.message : "Could not save this card."); }
  }

  return (
    <dialog ref={dialogRef} open className="anki-dialog" aria-labelledby="anki-title">
      <div className="dialog-head"><div><p className="eyebrow">Review before export</p><h2 id="anki-title">Make Anki card</h2></div><button className="icon-button" disabled={!persistedDraft || saving} onClick={close} aria-label="Close"><X size={17} /></button></div>
      <div className="context-preview"><small>Context image attached</small><strong>{block.heading && stripMarkup(block.heading)}</strong><p>{excerpt(block)}</p></div>
      <div className="field"><label htmlFor="cloze-text">Cloze text</label><textarea id="cloze-text" value={text} onChange={(event) => { userEditedRef.current = true; textRef.current = event.target.value; setText(event.target.value); }} /><small>Edit the single deletion. Your reviewed wording is saved before close or export, and a rendered image of this section travels with the card.</small></div>
      {status && <p className="form-message" role="status">{status}</p>}
      <div className="dialog-actions"><button className="button ghost" disabled={!persistedDraft || saving} onClick={copyTsv}><Copy size={15} />Copy row</button><button className="button secondary" disabled={!persistedDraft || saving} onClick={exportDesktop}><DownloadSimple size={15} />Send to desktop Anki</button><button className="button" disabled={!persistedDraft || saving} onClick={openMobile}>Open in AnkiMobile</button></div>
    </dialog>
  );
}

export function TopicContent({ topic, sources, linkEntries }: { topic: Topic; sources: SuppliedSource[]; linkEntries: LinkIndexEntry[] }) {
  const router = useRouter();
  const [card, setCard] = useState<{ selection: string; block: TopicBlock } | null>(null);
  const [saved, setSaved] = useState(false);
  const [savedReady, setSavedReady] = useState(false);
  const [saveError, setSaveError] = useState("");
  const savedTouched = useRef(false);
  const version = topic.approvedVersion!;
  const blocks = useMemo(() => version.blocks.filter((block) => block.type !== "references"), [version]);
  // Callouts stay open prose; only headed non-callout sections carry a disclosure.
  const collapsible = useMemo(() => blocks.filter((block) => block.heading && block.type !== "summary" && block.type !== "warning").map((block) => block.id), [blocks]);
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => new Set());
  const allOpen = collapsed.size === 0;
  // Mirroring every native toggle back into state is what lets "Expand all" reopen a section the
  // reader closed by hand — otherwise React sees an unchanged `open` prop and leaves the DOM alone.
  function setBlockOpen(id: string, open: boolean) {
    setCollapsed((current) => { if (open !== current.has(id)) return current; const next = new Set(current); if (open) next.delete(id); else next.add(id); return next; });
  }
  useEffect(() => {
    recordRecentView(topic).catch(() => undefined);
    fetch("/api/recent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topicId: topic.id }) }).catch(() => undefined);
    // A blocked IndexedDB request neither resolves nor rejects, so awaiting it alone left
    // Save disabled forever. Racing a timeout means the button is always usable; the worst
    // case is that it opens showing "Save" on a topic already saved on this device, which
    // toggleSaved corrects on the next write.
    Promise.race([isTopicSaved(topic.id), new Promise<boolean | undefined>((resolve) => setTimeout(() => resolve(undefined), 1500))])
      .then((value) => { if (typeof value === "boolean" && !savedTouched.current) setSaved(value); }).catch(() => undefined).finally(() => setSavedReady(true));
  }, [topic]);

  function toggleSaved() {
    savedTouched.current = true;
    const next = !saved; setSaved(next); setSaveError("");
    setTopicSaved(topic, next)
      .then(async () => {
        const response = await fetch("/api/bookmarks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topicId: topic.id, saved: next }), keepalive: true });
        if (!response.ok) throw new Error("Private bookmark sync failed.");
      })
      .catch((error) => { setSaveError(error instanceof Error ? `${error.message} It remains saved on this device.` : "Private sync failed; it remains saved on this device."); });
  }

  async function restore(versionId: string) {
    const response = await fetch(`/api/topics/versions/${versionId}/restore`, { method: "POST" });
    const data = await response.json() as { draft?: TopicVersion };
    if (response.ok && data.draft) router.push(`/drafts/${data.draft.id}`);
  }

  function captureSelection(event: React.MouseEvent<HTMLElement>) {
    const selection = window.getSelection()?.toString().trim();
    if (!selection || selection.length < 8) return;
    const element = (event.target as HTMLElement).closest<HTMLElement>("[data-block-id]");
    const block = version.blocks.find((item) => item.id === element?.dataset.blockId);
    if (block) setCard({ selection, block });
  }

  return (
    <>
      <div className="topic-actions-row"><button className={`button secondary small ${saved ? "saved" : ""}`} disabled={!savedReady} onClick={toggleSaved}><BookmarkSimple size={14} weight={saved ? "fill" : "regular"} />{saved ? "Saved offline" : "Save"}</button>{collapsible.length > 0 && <button className="expand-toggle" onClick={() => setCollapsed(allOpen ? new Set(collapsible) : new Set())}>{allOpen ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}{allOpen ? "Collapse all" : "Expand all"}</button>}<span className="status-pill"><span className="status-dot" />Version {version.versionNumber} reviewed</span>{saveError && <span className="form-message" role="alert">{saveError}</span>}</div>
      <Tabs.Root defaultValue="notes" className="topic-tabs">
        <Tabs.List className="tabs-list" aria-label="Topic views"><Tabs.Trigger value="notes">Notes</Tabs.Trigger><Tabs.Trigger value="sources">Sources <span>{sources.length}</span></Tabs.Trigger><Tabs.Trigger value="history">History <span>{topic.versions.length}</span></Tabs.Trigger></Tabs.List>
        <Tabs.Content value="notes"><article className="topic-article" onMouseUp={captureSelection}>{blocks.map((block) => <Block key={block.id} block={block} expanded={!collapsed.has(block.id)} linkEntries={linkEntries} selfSlug={topic.slug} onToggle={setBlockOpen} onMakeCard={(selection, item) => setCard({ selection, block: item })} />)}</article></Tabs.Content>
        <Tabs.Content value="sources"><div className="source-list">{sources.map((source, index) => <article key={source.id}><span>{index + 1}</span><div><h2>{source.title}</h2><p>{source.citation}</p>{source.details && <small>{source.details}</small>}</div></article>)}</div></Tabs.Content>
        <Tabs.Content value="history"><div className="history-list">{topic.versions.map((item) => <article key={item.id}><span className="status-dot" /><div><h2>Version {item.versionNumber} · {item.status}</h2><p>{item.reviewedAt ? `Reviewed ${new Date(item.reviewedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : "Draft in review"}</p></div>{item.status === "approved" && <button className="button ghost small" onClick={() => restore(item.id)}>Restore as draft</button>}</article>)}</div></Tabs.Content>
      </Tabs.Root>
      {card && <AnkiDialog selection={card.selection} topic={topic} block={card.block} onClose={() => setCard(null)} />}
    </>
  );
}
