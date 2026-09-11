"use client";

import { useEffect, useRef, useState } from "react";
import { DownloadSimple, Trash, UploadSimple } from "@phosphor-icons/react";
import { mergeAttendingBackup, parseAttendingBackup, type Attending, type AttendingNote } from "@/lib/attending";
import * as store from "@/lib/attending-db";

/**
 * Attending preferences are the only data in Pocket Chief with no rebuildable source: the atlas
 * comes back from the app bundle on the next load, a hand-written preference does not. So the
 * destructive control is gated behind an export rather than behind a confirmation dialog — a
 * dialog asks whether you meant it, which is not the same as making sure you can undo it.
 */
export function AttendingBackup() {
  const [counts, setCounts] = useState<{ attendings: number; notes: number } | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [exported, setExported] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const refresh = () => Promise.all([store.listAttendings(), store.listAllNotes()])
    .then(([attendings, notes]) => setCounts({ attendings: attendings.length, notes: notes.length }))
    .catch(() => setError("This device blocked private storage, so attending preferences cannot be read."));

  useEffect(() => { void refresh(); }, []);

  async function exportJson() {
    setError(""); setStatus("");
    try {
      const backup = await store.exportAttendingData();
      const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `pocket-chief-attending-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setExported(true);
      setStatus(`Exported ${backup.attendings.length} attending${backup.attendings.length === 1 ? "" : "s"} and ${backup.notes.length} preference${backup.notes.length === 1 ? "" : "s"}.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not export attending preferences.");
    }
  }

  async function importJson(file: File) {
    setError(""); setStatus("");
    try {
      const backup = parseAttendingBackup(JSON.parse(await file.text()));
      const current = { attendings: await store.listAttendings(), notes: await store.listAllNotes() };
      // Merge, never replace: a backup is a snapshot of one moment and cannot know what was
      // deliberately deleted since. Newer local edits win a tie on updatedAt.
      const merged = mergeAttendingBackup(current, backup);
      await store.replaceAttendingData(merged.attendings as Attending[], merged.notes as AttendingNote[]);
      await refresh();
      setStatus(`Merged ${backup.attendings.length} attending${backup.attendings.length === 1 ? "" : "s"} and ${backup.notes.length} preference${backup.notes.length === 1 ? "" : "s"}. Nothing already on this device was removed.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "That file could not be read as a backup.");
    }
  }

  async function deleteAll() {
    setError(""); setStatus("");
    try {
      await store.clearAttendingData();
      await refresh();
      setConfirmText("");
      setExported(false);
      setStatus("All attending preferences deleted from this device.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not delete attending preferences.");
    }
  }

  const empty = counts !== null && counts.attendings === 0 && counts.notes === 0;

  return (
    <section className="form-card">
      <div className="section-heading"><h2>Attending preferences</h2><span>This device only</span></div>
      <p className="settings-copy">
        {counts === null ? "Reading this device…"
          : empty ? "Nothing recorded yet. Preferences you add on a playbook are stored only in this browser and never leave the device."
          : `${counts.attendings} attending${counts.attendings === 1 ? "" : "s"} and ${counts.notes} preference${counts.notes === 1 ? "" : "s"} on this device. They are never published and never synced, so this export is the only backup that exists.`}
      </p>

      <div className="settings-actions">
        <button className="button secondary" type="button" onClick={exportJson} disabled={empty}><DownloadSimple size={15} />Export JSON</button>
        <button className="button secondary" type="button" onClick={() => fileInput.current?.click()}><UploadSimple size={15} />Import JSON</button>
        <input ref={fileInput} type="file" accept="application/json" hidden onChange={(event) => { const file = event.target.files?.[0]; if (file) void importJson(file); event.target.value = ""; }} />
      </div>

      {!empty && (
        <div className="attending-danger-zone">
          <p className="settings-copy">Deleting is permanent and there is no server copy. Export first, then type DELETE to confirm.</p>
          <div className="field">
            <label htmlFor="attending-confirm-delete">Type DELETE to enable</label>
            <input id="attending-confirm-delete" value={confirmText} onChange={(event) => setConfirmText(event.target.value)} autoComplete="off" disabled={!exported} />
          </div>
          <div className="settings-actions">
            <button className="button ghost danger" type="button" disabled={!exported || confirmText !== "DELETE"} onClick={deleteAll}><Trash size={15} />Delete all attending preferences</button>
          </div>
          {!exported && <p className="settings-copy">Export first — the button stays disabled until you do.</p>}
        </div>
      )}

      {status && <p className="form-message" role="status">{status}</p>}
      {error && <p className="form-message" role="alert">{error}</p>}
    </section>
  );
}
