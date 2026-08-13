"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, LinkSimple, SpinnerGap, Warning } from "@phosphor-icons/react";
import { supportWarnings } from "@/lib/editorial";
import type { SuppliedSource, Topic, TopicBlock, TopicVersion } from "@/lib/types";

function claimText(block: TopicBlock) {
  if (block.type === "summary" || block.type === "prose" || block.type === "warning") return block.text;
  if (block.type === "bullets") return block.items.join(" ");
  if (block.type === "table") return block.rows.flat().join(" ");
  if (block.type === "sequence") return block.steps.map((step) => `${step.title}: ${step.detail}`).join(" ");
  if (block.type === "flow") return block.nodes.map((node) => node.label).join(" ");
  return block.heading ?? "Source-linked content";
}

function supportedBlock(block: TopicBlock, sourceId: string): TopicBlock {
  const cited = (text: string, index: number) => ({ id: block.claims[index]?.id ?? crypto.randomUUID(), text, citationIds: [sourceId], status: "cited" as const });
  if (block.type === "bullets") return { ...block, claims: block.items.map(cited) };
  const claims = block.claims.length ? block.claims.map((claim) => ({ ...claim, citationIds: [sourceId], status: "cited" as const })) : [cited(claimText(block), 0)];
  return { ...block, claims };
}

function Preview({ block }: { block: TopicBlock }) {
  if (block.type === "summary" || block.type === "prose" || block.type === "warning") return <p>{block.text}</p>;
  if (block.type === "bullets") return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
  if (block.type === "sequence") return <ol>{block.steps.map((step) => <li key={step.title}><strong>{step.title}</strong> — {step.detail}</li>)}</ol>;
  if (block.type === "table") return <p>{block.rows.map((row) => row.join(" — ")).join(" · ")}</p>;
  if (block.type === "flow") return <p>{block.nodes.map((node) => node.label).join(" → ")}</p>;
  if (block.type === "image") return <p>{block.alt}</p>;
  if ("sourceIds" in block) return <p>{block.sourceIds.length} supplied source reference{block.sourceIds.length === 1 ? "" : "s"}</p>;
  return null;
}

export function DraftReview({ initialDraft, topic, sources }: { initialDraft: TopicVersion; topic: Topic; sources: SuppliedSource[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState(initialDraft);
  const [sourceId, setSourceId] = useState(sources[0]?.id ?? "");
  const [instruction, setInstruction] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const support = useMemo(() => supportWarnings(draft.blocks, new Set(sources.map((source) => source.id))), [draft, sources]);

  async function linkBlock(block: TopicBlock) {
    if (!sourceId) return;
    setBusy(true); setStatus("");
    const response = await fetch(`/api/topics/drafts/${draft.id}/blocks/${block.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ block: supportedBlock(block, sourceId) }) });
    const data = await response.json() as { draft?: TopicVersion; error?: string };
    if (response.ok && data.draft) setDraft(data.draft); else setStatus(data.error ?? "Could not update source support.");
    setBusy(false);
  }

  async function revise() {
    if (!instruction.trim()) return;
    setBusy(true); setStatus("");
    const response = await fetch(`/api/topics/drafts/${draft.id}/revise`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ instruction, blockIds: [] }) });
    const data = await response.json() as { draft?: TopicVersion; error?: string };
    if (response.ok && data.draft) { setDraft(data.draft); setInstruction(""); } else setStatus(data.error ?? "Could not revise this draft.");
    setBusy(false);
  }

  async function approve() {
    setBusy(true); setStatus("");
    const response = await fetch(`/api/topics/drafts/${draft.id}/approve`, { method: "POST" });
    const data = await response.json() as { error?: string };
    if (response.ok) { router.push(`/topics/${topic.slug}`); router.refresh(); return; }
    setStatus(data.error ?? "Approval remains blocked."); setBusy(false);
  }

  return (
    <div className="draft-review-layout">
      <section className="draft-review-main">
        <div className="review-toolbar">
          <div><p className="eyebrow">Private draft · Version {draft.versionNumber}</p><h1 className="page-title">Review {topic.title}</h1><p className="page-lede">Confirm the wording and source link for every factual block. This draft is not searchable.</p></div>
          <span className={`review-count ${support.length ? "blocked" : "ready"}`}>{support.length ? <><Warning size={15} />{support.length} support issue{support.length === 1 ? "" : "s"}</> : <><CheckCircle size={15} />Ready for approval</>}</span>
        </div>
        <div className="draft-blocks">
          {draft.blocks.map((block) => {
            const blockWarnings = supportWarnings([block], new Set(sources.map((source) => source.id)));
            return <article className="draft-block" key={block.id}><div className="block-heading"><div><small>{block.type}</small><h2>{block.heading ?? "Untitled block"}</h2></div><span className={`support-mark ${blockWarnings.length ? "unsupported" : "supported"}`}>{blockWarnings.length ? "Needs support" : "Supported"}</span></div><Preview block={block} />{blockWarnings.length > 0 && sourceId && <button className="button secondary small" onClick={() => linkBlock(block)} disabled={busy}><LinkSimple size={14} />Link this block to selected source</button>}</article>;
          })}
        </div>
      </section>
      <aside className="draft-review-panel form-card">
        <div className="field"><label htmlFor="review-source">Source used for support</label><select id="review-source" value={sourceId} onChange={(event) => setSourceId(event.target.value)}>{sources.map((source) => <option key={source.id} value={source.id}>{source.title}</option>)}</select></div>
        <div className="field"><label htmlFor="revision">Ask AI to restructure this draft</label><textarea id="revision" value={instruction} onChange={(event) => setInstruction(event.target.value)} placeholder="Keep only the operative decision points…" /><small>Revision stays source-bound and replaces the current draft blocks.</small></div>
        <button className="button secondary" type="button" disabled={busy || !instruction.trim()} onClick={revise}>Revise draft</button>
        {status && <p className="form-message" role="status">{status}</p>}
        <hr />
        <button className="button" type="button" disabled={busy || support.length > 0} onClick={approve}>{busy ? <SpinnerGap className="spin" size={16} /> : <>Approve & publish to search <ArrowRight size={15} /></>}</button>
        <small>Approval is recorded with the owner identity and keeps the prior approved version available.</small>
      </aside>
    </div>
  );
}
