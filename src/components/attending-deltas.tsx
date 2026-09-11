"use client";

import { PencilSimple, UserFocus } from "@phosphor-icons/react";
import type { Attending, AttendingNote } from "@/lib/attending";

/**
 * One attending's preference, rendered beside the step it modifies.
 *
 * Always attributed. Pocket Chief's whole contract is that every factual block cites a supplied
 * source, and a delta is the one thing on the page that deliberately does not — so it says whose
 * preference it is instead. An unattributed preference reads as fact, which is the failure mode
 * worth designing against.
 */
export function AttendingDeltas({ notes, attending, onEdit }: { notes: AttendingNote[]; attending: Attending; onEdit?: (note: AttendingNote) => void }) {
  if (notes.length === 0) return null;
  return (
    <>
      {notes.map((note) => (
        <aside key={note.id} className="topic-block attending-delta" aria-label={`${attending.name}'s preference`}>
          <p className="attending-delta-byline">
            <span className="callout-icon"><UserFocus size={14} weight="fill" /></span>
            {attending.name}
            {attending.hospital && <span>{attending.hospital}</span>}
          </p>
          <p>{note.text}</p>
          {onEdit && (
            <div className="attending-delta-actions">
              <button type="button" className="button ghost small" onClick={() => onEdit(note)}>
                <PencilSimple size={13} />Edit
              </button>
            </div>
          )}
        </aside>
      ))}
    </>
  );
}
