"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import type { Playbook, SuppliedSource } from "@/lib/types";
import type { LinkIndexEntry } from "@/lib/inline";
import type { Attending, AttendingNote } from "@/lib/attending";
import { notesForAnchor } from "@/lib/attending";
import * as store from "@/lib/attending-db";
import { BlockList, useBlockCollapse } from "@/components/block-list";
import { AttendingCard } from "@/components/attending-card";
import { AttendingDeltas } from "@/components/attending-deltas";
import { AttendingNoteEditor } from "@/components/attending-note-editor";
import { AttendingPicker, readSelectedAttending } from "@/components/attending-picker";

/**
 * The playbook counterpart to `TopicContent`: same block rendering, different chrome.
 *
 * Deliberately does NOT record a recent view or offer Save. Both write Topic-shaped objects into
 * the `saved` and `recent` stores, and every surface that reads those renders rows through
 * TopicCard, which reads `scoreCategory` and links to `/topics/<slug>`. A playbook in there
 * renders a broken card pointing at a 404. Playbook bookmarking needs its own store.
 *
 * No History tab either — playbooks ship approved-only and have no version list.
 */
export function PlaybookContent({ playbook, sources, linkEntries }: { playbook: Playbook; sources: SuppliedSource[]; linkEntries: LinkIndexEntry[] }) {
  const blocks = playbook.blocks.filter((block) => block.type !== "references");
  const collapse = useBlockCollapse(blocks);

  const [attendings, setAttendings] = useState<Attending[] | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [notes, setNotes] = useState<AttendingNote[]>([]);
  const [editing, setEditing] = useState<AttendingNote | null | undefined>(undefined);
  const [storageError, setStorageError] = useState("");

  // Storage can be blocked outright, and a blocked open never settles, so every read is raced
  // against a timeout the same way the topic reader races its saved/reviewed lookups.
  const guard = useCallback(<T,>(work: Promise<T>, fallback: T) => Promise.race([
    work,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), 2000)),
  ]).catch(() => { setStorageError("This device blocked private storage, so attending preferences are unavailable."); return fallback; }), []);

  useEffect(() => {
    guard(store.listAttendings(), [] as Attending[]).then((rows) => {
      setAttendings(rows);
      const remembered = readSelectedAttending();
      // Only restore a remembered choice that still exists — a deleted attending must not leave
      // the picker pointing at nothing.
      if (rows.some((row) => row.id === remembered)) setSelectedId(remembered);
    });
  }, [guard]);

  const reloadNotes = useCallback((attendingId: string) => {
    // No synchronous setState here: with no attending chosen there is nothing to fetch, and the
    // empty case is derived below instead. Clearing state in the effect body would cascade.
    if (!attendingId) return;
    guard(store.listNotes(attendingId, playbook.procedureId), [] as AttendingNote[]).then(setNotes);
  }, [guard, playbook.procedureId]);

  useEffect(() => { reloadNotes(selectedId); }, [selectedId, reloadNotes]);

  const selected = attendings?.find((attending) => attending.id === selectedId) ?? null;
  // Derived, so switching back to standard technique hides the deltas without a state write.
  // Memoized because `annotate` depends on it and runs once per block on every render.
  const selectedIdentity = selected?.id ?? "";
  const visibleNotes = useMemo(() => selectedIdentity ? notes.filter((note) => note.attendingId === selectedIdentity) : [], [notes, selectedIdentity]);

  const annotate = useCallback((blockId: string, stepTitle?: string) => {
    if (!selected) return null;
    return <AttendingDeltas notes={notesForAnchor(visibleNotes, blockId, stepTitle)} attending={selected} onEdit={setEditing} />;
  }, [selected, visibleNotes]);

  async function saveNote(note: AttendingNote) {
    await store.saveNote(note);
    reloadNotes(selectedId);
  }

  async function removeNote(id: string) {
    await store.deleteNote(id);
    reloadNotes(selectedId);
  }

  async function createAttending(attending: Attending) {
    await store.saveAttending(attending);
    setAttendings((current) => [...current ?? [], attending].sort((a, b) => a.name.localeCompare(b.name)));
  }

  return (
    <>
      <AttendingPicker attendings={attendings ?? []} selectedId={selectedId} onSelect={setSelectedId} onCreate={createAttending} />
      {storageError && <p className="form-message" role="alert">{storageError}</p>}
      <div className="topic-actions-row">
        {collapse.collapsibleIds.length > 0 && <button className="expand-toggle" onClick={collapse.toggleAll}>{collapse.allOpen ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}{collapse.allOpen ? "Close all" : "Open all"}</button>}
      </div>
      <Tabs.Root defaultValue="notes" className="topic-tabs">
        <Tabs.List className="tabs-list" aria-label="Playbook views">
          <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
          {selected && <Tabs.Trigger value="attending">Attending <span>{visibleNotes.length}</span></Tabs.Trigger>}
          <Tabs.Trigger value="sources">Sources <span>{sources.length}</span></Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="notes"><BlockList blocks={blocks} collapse={collapse} linkEntries={linkEntries} selfSlug={playbook.slug} annotate={annotate} /></Tabs.Content>
        {selected && (
          <Tabs.Content value="attending">
            <AttendingCard attending={selected} notes={visibleNotes} blocks={blocks} onAdd={() => setEditing(null)} onEdit={setEditing} />
          </Tabs.Content>
        )}
        <Tabs.Content value="sources"><div className="source-list">{sources.map((source, index) => <article key={source.id}><span>{index + 1}</span><div><h2>{source.title}</h2><p>{source.citation}</p>{source.details && <small>{source.details}</small>}</div></article>)}</div></Tabs.Content>
      </Tabs.Root>
      {editing !== undefined && selected && (
        <AttendingNoteEditor
          blocks={blocks}
          procedureId={playbook.procedureId}
          attendingId={selected.id}
          note={editing}
          onSave={saveNote}
          onDelete={removeNote}
          onClose={() => setEditing(undefined)}
        />
      )}
    </>
  );
}
