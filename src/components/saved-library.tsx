"use client";

import { useState } from "react";
import { BookmarkSimple } from "@phosphor-icons/react";
import { ListRow } from "@/components/list-row";
import { LoadingRows, ReadFailed } from "@/components/list-states";
import { loadHistory, useLoader, type History } from "@/lib/library-client";
import { quietLine, resolveEntries } from "@/lib/library-items";
import { setPlaybookSaved, setSavedEntry, setTopicSaved } from "@/lib/offline";
import type { SavedEntry } from "@/lib/types";

/** A page the library still has goes through the setter the reader's own Save uses, so both write the same record; a page it has lost goes through its entry alone. */
function writeSaved({ topics, playbooks }: History, entry: SavedEntry, next: boolean) {
  const topic = entry.kind === "topic" ? topics.find((candidate) => candidate.id === entry.id) : undefined;
  const playbook = entry.kind === "playbook" ? playbooks.find((candidate) => candidate.id === entry.id) : undefined;
  return topic ? setTopicSaved(topic, next) : playbook ? setPlaybookSaved(playbook, next) : setSavedEntry(entry, next);
}

/** The row's bookmark. Tapping it only flips the icon and the write; the row stays put until the next visit, so a slip is one more tap to undo. */
function SaveToggle({ name, write }: { name: string; write: (saved: boolean) => Promise<unknown> }) {
  const [saved, setSaved] = useState(true);
  function toggle() {
    const next = !saved;
    setSaved(next);
    write(next).catch(() => setSaved(!next)); // storage blocked: the icon goes back to what is stored
  }
  return <button type="button" className="row-toggle" aria-label={name} aria-pressed={saved} onClick={toggle}><BookmarkSimple size={20} weight={saved ? "fill" : "regular"} aria-hidden="true" /></button>;
}

/** Everything saved on this device, topics and playbooks together, newest first. Rows are rebuilt from the current library by id; a stored snapshot is never shown. */
export function SavedLibrary() {
  const history = useLoader(loadHistory);
  if (history.loading) return <LoadingRows />;
  if (history.failed) return <ReadFailed message="Couldn't load Saved." retrying={history.retrying} onRetry={history.retry} />;
  const { data } = history;
  if (!data.saved.length) return <div className="list-state"><p>Nothing saved yet.</p><p>Use Save on a topic or playbook.</p></div>;
  return (
    <ul className="list-rows">
      {resolveEntries(data.saved, data.topics, data.playbooks).map(({ entry, item }) => (
        <ListRow
          key={entry.id}
          href={item ? `/${item.kind}s/${item.slug}` : undefined}
          title={item?.title ?? "No longer available"}
          quiet={item ? quietLine(item) : undefined}
          trailing={item?.kind === "playbook" ? "Playbook" : undefined}
          action={<SaveToggle name={item ? `Save ${item.title}` : "Save, no longer available"} write={(next) => writeSaved(data, entry, next)} />}
        />
      ))}
    </ul>
  );
}
