"use client";

import { LinkBreak, Plus } from "@phosphor-icons/react";
import { ATTENDING_SECTIONS, notesBySection, unlinkedNotes, type Attending, type AttendingNote } from "@/lib/attending";
import type { TopicBlock } from "@/lib/types";

/**
 * Everything one attending wants for this operation, in the vault's canonical order.
 *
 * Empty sections are rendered as prompts rather than hidden. For months this card will be mostly
 * empty, and the eight headings are what teach the shape of a useful preference note — hiding
 * them would leave a blank page and no idea what to write.
 */
export function AttendingCard({ attending, notes, blocks, onAdd, onEdit }: {
  attending: Attending;
  notes: AttendingNote[];
  blocks: TopicBlock[];
  onAdd: () => void;
  onEdit: (note: AttendingNote) => void;
}) {
  const grouped = notesBySection(notes);
  // A note whose anchor no longer resolves — a renamed step, a deleted block. It still belongs to
  // the attending, so it is surfaced here rather than disappearing from the app entirely.
  const stale = unlinkedNotes(notes, blocks).filter((note) => note.anchor);

  return (
    <div className="attending-card">
      <div className="section-heading">
        <h2>{attending.name}</h2>
        <span>{[attending.hospital, attending.specialty].filter(Boolean).join(" · ")}</span>
      </div>

      {stale.length > 0 && (
        <section className="empty-state compact" aria-label="Unlinked preferences">
          <span className="empty-icon"><LinkBreak size={20} /></span>
          <h2>{stale.length} unlinked {stale.length === 1 ? "preference" : "preferences"}</h2>
          <p>These point at a step that has since been renamed or removed. Edit one to re-attach it.</p>
          <div className="topic-grid">
            {stale.map((note) => (
              <button key={note.id} type="button" className="topic-card" onClick={() => onEdit(note)}>
                <div><h3>{note.text.slice(0, 70)}{note.text.length > 70 ? "…" : ""}</h3><p>Tap to re-attach</p></div>
              </button>
            ))}
          </div>
        </section>
      )}

      {ATTENDING_SECTIONS.map((section) => {
        const entries = grouped.get(section.id) ?? [];
        return (
          <section className="topic-block" key={section.id}>
            <div className="block-heading"><h3>{section.label}</h3></div>
            {entries.length === 0
              ? <p className="settings-copy">Nothing recorded yet.</p>
              : <ul className="clinical-list">{entries.map((note) => <li key={note.id} data-depth={0}><span><button type="button" className="attending-note-button" onClick={() => onEdit(note)}>{note.text}</button></span></li>)}</ul>}
          </section>
        );
      })}

      <div className="settings-actions">
        <button className="button" type="button" onClick={onAdd}><Plus size={14} />Add a preference</button>
      </div>
    </div>
  );
}
