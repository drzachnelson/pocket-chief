"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldWarning, SpinnerGap } from "@phosphor-icons/react";
import { detectLikelyPHI } from "@/lib/safety";
import type { TaxonomyNode } from "@/lib/types";

export function AddNoteForm({ taxonomy }: { taxonomy: TaxonomyNode[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [scoreNodeId, setScoreNodeId] = useState(taxonomy.at(-1)?.id ?? "unassigned");
  const [sourceDetails, setSourceDetails] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent, mode: "ai" | "notes_only" = "ai") {
    event.preventDefault(); setMessage("");
    const assessment = detectLikelyPHI([title, notes, sourceDetails].join("\n"));
    if (assessment.blocked) {
      setMessage(`Draft blocked. Remove possible ${assessment.reasons.join(", ")}.`);
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/topics/drafts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, rawNotes: notes, imageIds: [], sourceMetadata: [{ title: `${title} owner-supplied notes`, kind: "user_notes", citation: sourceDetails || `${title} personal study packet`, details: sourceDetails || undefined }], scoreNodeId, tags: [], mode }) });
      const data = await response.json() as { error?: string; draft?: { id: string } };
      if (response.ok && data.draft) { router.push(`/drafts/${data.draft.id}`); return; }
      setMessage(data.error || "Could not create the draft.");
    } catch {
      setMessage("Drafting requires an online connection.");
    } finally { setBusy(false); }
  }

  return (
    <form className="form-card" onSubmit={(event) => submit(event, "ai")}>
      <div className="notice"><ShieldWarning size={18} weight="fill" /><p><strong>Do not enter patient information.</strong> Pocket Chief rejects suspected identifiers before any AI request.</p></div>
      <div className="field" style={{ marginTop: 18 }}><label htmlFor="topic-title">Topic title</label><input id="topic-title" name="title" required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g., Acute mesenteric ischemia" /></div>
      <div className="field"><label htmlFor="score-node">SCORE category</label><select id="score-node" value={scoreNodeId} onChange={(event) => setScoreNodeId(event.target.value)}>{taxonomy.map((node) => <option value={node.id} key={node.id}>{node.title}</option>)}<option value="unassigned">Unassigned — organize during review</option></select></div>
      <div className="field"><label htmlFor="raw-notes">Source notes</label><textarea id="raw-notes" required value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Paste your original study notes here…" /><small>Paid material should be paraphrased. Do not reproduce question stems or explanations.</small></div>
      <div className="field"><label htmlFor="source-details">Source details</label><input id="source-details" value={sourceDetails} onChange={(event) => setSourceDetails(event.target.value)} placeholder="Title, edition, chapter, page, or URL" /><small>Precise details make claim review faster. Pocket Chief never invents them.</small></div>
      {message && <p className="form-message" role="status">{message}</p>}
      <div className="form-footer"><button className="button secondary" disabled={busy || !title.trim() || !notes.trim()} type="button" onClick={(event) => submit(event, "notes_only")}>Save notes only</button><button className="button" disabled={busy || !title.trim() || !notes.trim()} type="submit">{busy ? <SpinnerGap className="spin" size={16} /> : <>Create review draft <ArrowRight size={15} /></>}</button></div>
    </form>
  );
}
