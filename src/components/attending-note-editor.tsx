"use client";

import { useEffect, useRef, useState } from "react";
import { ATTENDING_SECTIONS, anchorTargets, newId, type AttendingNote, type AttendingSectionId } from "@/lib/attending";
import { stripMarkup } from "@/lib/inline";
import type { TopicBlock } from "@/lib/types";

const anchorKey = (blockId: string, stepTitle?: string) => stepTitle ? `${blockId}\0${stepTitle}` : blockId;

function anchorLabel(blocks: TopicBlock[], blockId: string, stepTitle?: string) {
  const block = blocks.find((candidate) => candidate.id === blockId);
  const heading = block?.heading ? stripMarkup(block.heading) : "Untitled section";
  return stepTitle ? `${heading} — ${stripMarkup(stepTitle)}` : heading;
}

/**
 * A dialog rather than an inline form: the reader is mid-page and the note needs a section, an
 * anchor and a body. Focus enters the first field and returns to whatever opened it — this is
 * reached one-handed while walking, and losing focus means losing the note.
 */
export function AttendingNoteEditor({ blocks, procedureId, attendingId, note, onSave, onDelete, onClose }: {
  blocks: TopicBlock[];
  procedureId: string;
  attendingId: string;
  note: AttendingNote | null;
  onSave: (note: AttendingNote) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onClose: () => void;
}) {
  const [section, setSection] = useState<AttendingSectionId>(note?.section ?? "preference_snapshot");
  const [anchor, setAnchor] = useState(note?.anchor ? anchorKey(note.anchor.blockId, note.anchor.stepTitle) : "");
  const [text, setText] = useState(note?.text ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const firstField = useRef<HTMLSelectElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    opener.current = document.activeElement;
    firstField.current?.focus();
    const restore = opener.current;
    return () => { if (restore instanceof HTMLElement) restore.focus(); };
  }, []);

  const targets = anchorTargets(blocks);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!text.trim()) { setError("Write the preference before saving."); return; }
    setError("");
    setSaving(true);
    const [blockId, stepTitle] = anchor ? anchor.split("\0") : [];
    const now = new Date().toISOString();
    try {
      await onSave({
        id: note?.id ?? newId(),
        attendingId,
        procedureId,
        section,
        ...(blockId ? { anchor: { blockId, ...(stepTitle ? { stepTitle } : {}) } } : {}),
        text: text.trim(),
        createdAt: note?.createdAt ?? now,
        updatedAt: now,
      });
      onClose();
    } catch (cause) {
      // Kept in the editor, never silently altered: the author has to see why it was refused.
      setError(cause instanceof Error ? cause.message : "Could not save this note on this device.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="attending-dialog-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="form-card attending-dialog" role="dialog" aria-modal="true" aria-labelledby="attending-note-title" onKeyDown={(event) => { if (event.key === "Escape") onClose(); }}>
        <h2 id="attending-note-title">{note ? "Edit preference" : "Add preference"}</h2>
        <form onSubmit={save}>
          <div className="field">
            <label htmlFor="attending-note-section">Section</label>
            <select id="attending-note-section" ref={firstField} value={section} onChange={(event) => setSection(event.target.value as AttendingSectionId)}>
              {ATTENDING_SECTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="attending-note-anchor">Show it beside</label>
            <select id="attending-note-anchor" value={anchor} onChange={(event) => setAnchor(event.target.value)}>
              <option value="">The attending card only</option>
              {targets.map((target) => (
                <option key={anchorKey(target.blockId, target.stepTitle)} value={anchorKey(target.blockId, target.stepTitle)}>
                  {anchorLabel(blocks, target.blockId, target.stepTitle)}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="attending-note-text">Preference</label>
            <textarea id="attending-note-text" rows={4} value={text} onChange={(event) => setText(event.target.value)} placeholder="Closes fascia with a running 0 PDS, never interrupted." />
            <p className="settings-copy">Write the preference, not the case. No patient names, dates, record numbers or details of a specific operation.</p>
          </div>
          {error && <p className="form-message" role="alert">{error}</p>}
          <div className="settings-actions">
            <button className="button" type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
            <button className="button secondary" type="button" onClick={onClose}>Cancel</button>
            {note && onDelete && <button className="button ghost danger" type="button" onClick={() => onDelete(note.id).then(onClose)}>Delete</button>}
          </div>
        </form>
      </div>
    </div>
  );
}
