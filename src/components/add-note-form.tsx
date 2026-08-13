"use client";

import { useState } from "react";
import { ArrowRight, ShieldWarning, SpinnerGap } from "@phosphor-icons/react";
import { detectLikelyPHI } from "@/lib/safety";

export function AddNoteForm() {
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const assessment = detectLikelyPHI(notes);
    if (assessment.blocked) {
      setMessage(`Draft blocked. Remove possible ${assessment.reasons.join(", ")}.`);
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/topics/drafts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rawNotes: notes, imageIds: [], sourceMetadata: [{ title: "Owner-supplied notes", kind: "user_notes" }], scoreNodeId: "biliary", tags: [] }) });
      const data = await response.json() as { error?: string };
      setMessage(response.ok ? "Draft created. Review every claim and source before approval." : data.error || "Could not create the draft.");
    } catch {
      setMessage("Drafting requires an online connection.");
    } finally { setBusy(false); }
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="notice"><ShieldWarning size={18} weight="fill" /><p><strong>Do not enter patient information.</strong> Pocket Chief rejects suspected identifiers before any AI request.</p></div>
      <div className="field" style={{ marginTop: 18 }}><label htmlFor="topic-title">Topic title</label><input id="topic-title" name="title" required placeholder="e.g., Acute mesenteric ischemia" /></div>
      <div className="field"><label htmlFor="score-node">SCORE category</label><select id="score-node" defaultValue="biliary"><option value="biliary">Alimentary Tract · Biliary Tract</option><option value="unassigned">Unassigned — organize during review</option></select></div>
      <div className="field"><label htmlFor="raw-notes">Source notes</label><textarea id="raw-notes" required value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Paste your original study notes here…" /><small>Paid material should be paraphrased. Do not reproduce question stems or explanations.</small></div>
      <div className="field"><label htmlFor="source-details">Source details</label><input id="source-details" placeholder="Title, edition, chapter, page, or URL" /><small>Precise details make claim review faster. Pocket Chief never invents them.</small></div>
      {message && <p className="form-message" role="status">{message}</p>}
      <div className="form-footer"><button className="button secondary" type="button">Save notes only</button><button className="button" disabled={busy || !notes.trim()} type="submit">{busy ? <SpinnerGap className="spin" size={16} /> : <>Create review draft <ArrowRight size={15} /></>}</button></div>
    </form>
  );
}
