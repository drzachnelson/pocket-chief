"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookmarkSimple, CheckCircle, Copy, DownloadSimple, Lightning, X } from "@phosphor-icons/react";
import type { ClozeDraft, SuppliedSource, Topic, TopicBlock, TopicVersion } from "@/lib/types";
import { buildAnkiMobileUrl, createFallbackCloze, sendToAnkiConnect, toAnkiTsv } from "@/lib/anki";
import { loadAnkiSettings } from "@/lib/anki-settings";
import { isTopicSaved, recordRecentView, setTopicSaved } from "@/lib/offline";

function excerpt(block: TopicBlock) {
  if (block.type === "summary" || block.type === "prose" || block.type === "warning") return block.text;
  if (block.type === "bullets") return block.items[0] ?? "";
  if (block.type === "sequence") return block.steps[0]?.detail ?? "";
  if (block.type === "table") return block.rows[0]?.join(" — ") ?? "";
  if (block.type === "flow") return block.nodes.map((node) => node.label).join(" → ");
  return block.heading ?? "Pocket Chief";
}

function contextImageDataUrl(heading: string, text: string, diagram: string) {
  const safe = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[character]!));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f5f7fb"/><rect x="70" y="55" width="1060" height="520" rx="30" fill="#fff" stroke="#dfe4ec" stroke-width="3"/><rect x="70" y="55" width="16" height="520" rx="8" fill="#1748d2"/><text x="125" y="140" font-family="Arial,sans-serif" font-weight="700" font-size="34" fill="#182033">${safe(heading)}</text><foreignObject x="125" y="175" width="900" height="190"><div xmlns="http://www.w3.org/1999/xhtml" style="font:27px/1.4 Arial,sans-serif;color:#465168">${safe(text.slice(0, 240))}</div></foreignObject><rect x="125" y="395" width="900" height="80" rx="18" fill="#edf2ff" stroke="#b7c6f9"/><text x="155" y="430" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#1748d2">NEAREST DECISION FLOW</text><text x="155" y="458" font-family="Arial,sans-serif" font-size="18" fill="#465168">${safe(diagram.slice(0, 88))}</text><text x="125" y="535" font-family="Arial,sans-serif" font-size="20" fill="#1748d2">POCKET CHIEF · REVIEWED SECTION</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function SupportMark({ block }: { block: TopicBlock }) {
  const supported = block.claims.every((claim) => claim.status === "cited" && claim.citationIds.length > 0);
  return <span className={`support-mark ${supported ? "supported" : "unsupported"}`} title={supported ? "All factual claims linked to supplied sources" : "Unresolved source support"}><CheckCircle size={13} weight="fill" />{supported ? "Supported" : "Needs support"}</span>;
}

function Block({ block, onMakeCard }: { block: TopicBlock; onMakeCard: (text: string, block: TopicBlock) => void }) {
  const header = block.heading && <div className="block-heading"><h2>{block.heading}</h2><div><SupportMark block={block} /><button className="anki-inline" onClick={() => onMakeCard(excerpt(block), block)}><Lightning size={13} weight="fill" />Make Anki</button></div></div>;
  if (block.type === "summary") return <section id={block.id} data-block-id={block.id} className="topic-block summary-block">{header}<p>{block.text}</p></section>;
  if (block.type === "prose") return <section id={block.id} data-block-id={block.id} className="topic-block">{header}<p>{block.text}</p></section>;
  if (block.type === "warning") return <section id={block.id} data-block-id={block.id} className="topic-block warning-block">{header}<p>{block.text}</p></section>;
  if (block.type === "bullets") return <section id={block.id} data-block-id={block.id} className="topic-block">{header}<ul className="clinical-list">{block.items.map((item) => <li key={item}><span>{item}</span><button aria-label={`Make Anki card from ${item}`} onClick={() => onMakeCard(item, block)}><Lightning size={13} /></button></li>)}</ul></section>;
  if (block.type === "table") return <section id={block.id} data-block-id={block.id} className="topic-block">{header}<div className="table-scroll"><table><thead><tr>{block.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{block.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell}>{cell}</th> : <td key={`${row[0]}-${cell}`}>{cell}</td>)}</tr>)}</tbody></table></div></section>;
  if (block.type === "sequence") return <section id={block.id} data-block-id={block.id} className="topic-block">{header}<ol className="sequence-list">{block.steps.map((step, index) => <li key={step.title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div><button aria-label={`Make Anki card from ${step.title}`} onClick={() => onMakeCard(`${step.title}: ${step.detail}`, block)}><Lightning size={13} /></button></li>)}</ol></section>;
  if (block.type === "flow") return <section id={block.id} data-block-id={block.id} className="topic-block">{header}<div className="decision-flow"><div className="flow-start">{block.nodes[0].label}</div><div className="flow-branch"><span>Compare the source-linked paths</span></div><div className="flow-options">{block.nodes.slice(1, 3).map((node) => <div key={node.id} className={`flow-card ${node.tone}`}><small>{block.edges.find((edge) => edge.from === block.nodes[0].id && edge.to === node.id)?.label ?? "Path"}</small><strong>{node.label}</strong><span>↓</span><p>{block.nodes.find((item) => block.edges.some((edge) => edge.from === node.id && edge.to === item.id))?.label}</p></div>)}</div></div></section>;
  if (block.type === "image") return <figure id={block.id} data-block-id={block.id} className="topic-block"><Image src={`/api/media/${block.mediaId}`} alt={block.alt} width={1200} height={630} unoptimized />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
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
      <div className="context-preview"><small>Context image attached</small><strong>{block.heading}</strong><p>{excerpt(block)}</p></div>
      <div className="field"><label htmlFor="cloze-text">Cloze text</label><textarea id="cloze-text" value={text} onChange={(event) => { userEditedRef.current = true; textRef.current = event.target.value; setText(event.target.value); }} /><small>Edit the single deletion. Your reviewed wording is saved before close or export, and a rendered image of this section travels with the card.</small></div>
      {status && <p className="form-message" role="status">{status}</p>}
      <div className="dialog-actions"><button className="button ghost" disabled={!persistedDraft || saving} onClick={copyTsv}><Copy size={15} />Copy row</button><button className="button secondary" disabled={!persistedDraft || saving} onClick={exportDesktop}><DownloadSimple size={15} />Send to desktop Anki</button><button className="button" disabled={!persistedDraft || saving} onClick={openMobile}>Open in AnkiMobile</button></div>
    </dialog>
  );
}

export function TopicContent({ topic, sources }: { topic: Topic; sources: SuppliedSource[] }) {
  const router = useRouter();
  const [card, setCard] = useState<{ selection: string; block: TopicBlock } | null>(null);
  const [saved, setSaved] = useState(false);
  const [savedReady, setSavedReady] = useState(false);
  const [saveError, setSaveError] = useState("");
  const savedTouched = useRef(false);
  const version = topic.approvedVersion!;
  useEffect(() => {
    recordRecentView(topic).catch(() => undefined);
    fetch("/api/recent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topicId: topic.id }) }).catch(() => undefined);
    isTopicSaved(topic.id).then((value) => { if (!savedTouched.current) setSaved(value); }).catch(() => undefined).finally(() => setSavedReady(true));
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
      <div className="topic-actions-row"><button className={`button secondary small ${saved ? "saved" : ""}`} disabled={!savedReady} onClick={toggleSaved}><BookmarkSimple size={14} weight={saved ? "fill" : "regular"} />{saved ? "Saved offline" : "Save"}</button><span className="status-pill"><span className="status-dot" />Version {version.versionNumber} reviewed</span>{saveError && <span className="form-message" role="alert">{saveError}</span>}</div>
      <Tabs.Root defaultValue="notes" className="topic-tabs">
        <Tabs.List className="tabs-list" aria-label="Topic views"><Tabs.Trigger value="notes">Notes</Tabs.Trigger><Tabs.Trigger value="sources">Sources <span>{sources.length}</span></Tabs.Trigger><Tabs.Trigger value="history">History <span>{topic.versions.length}</span></Tabs.Trigger></Tabs.List>
        <Tabs.Content value="notes"><article className="topic-article" onMouseUp={captureSelection}>{version.blocks.filter((block) => block.type !== "references").map((block) => <Block key={block.id} block={block} onMakeCard={(selection, item) => setCard({ selection, block: item })} />)}</article></Tabs.Content>
        <Tabs.Content value="sources"><div className="source-list">{sources.map((source, index) => <article key={source.id}><span>{index + 1}</span><div><h2>{source.title}</h2><p>{source.citation}</p>{source.details && <small>{source.details}</small>}</div></article>)}</div></Tabs.Content>
        <Tabs.Content value="history"><div className="history-list">{topic.versions.map((item) => <article key={item.id}><span className="status-dot" /><div><h2>Version {item.versionNumber} · {item.status}</h2><p>{item.reviewedAt ? `Reviewed ${new Date(item.reviewedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : "Draft in review"}</p></div>{item.status === "approved" && <button className="button ghost small" onClick={() => restore(item.id)}>Restore as draft</button>}</article>)}</div></Tabs.Content>
      </Tabs.Root>
      {card && <AnkiDialog selection={card.selection} topic={topic} block={card.block} onClose={() => setCard(null)} />}
    </>
  );
}
