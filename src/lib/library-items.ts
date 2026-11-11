import { slugify } from "@/lib/text";
import type { EntryKind, Playbook, PlaybookApproach, Topic } from "@/lib/types";

// Client-safe on purpose: this file imports no content, so a list row, the Saved page and the
// build-time feeds in `library.ts` all share one reading of a topic's path and a playbook's anchor.

/** A topic's displayed path, category then group. Stored `scoreCategory` keeps its "SCORE · " root; nothing shown to the reader does. */
export function topicPath({ scoreCategory }: Pick<Topic, "scoreCategory">): string[] {
  const parts = scoreCategory.split(" · ").filter(Boolean);
  return parts[0] === "SCORE" ? parts.slice(1) : parts;
}

/** The anchor id of a specialty heading on the Playbooks index. One helper, so a heading and the link to it cannot drift. */
export const specialtyId = (specialty: string) => slugify(specialty);

/** One library entry as a list row needs it, whichever corpus it came from. */
export type LibraryItem =
  | { kind: "topic"; id: string; slug: string; title: string; path: string[] }
  | { kind: "playbook"; id: string; slug: string; title: string; specialty: string; approach: PlaybookApproach };

export const topicItem = (topic: Topic): LibraryItem => ({ kind: "topic", id: topic.id, slug: topic.slug, title: topic.title, path: topicPath(topic) });
export const playbookItem = (playbook: Playbook): LibraryItem => ({ kind: "playbook", id: playbook.id, slug: playbook.slug, title: playbook.title, specialty: playbook.specialty, approach: playbook.approach });

/**
 * Rebuilds saved or recent entries from the current library by id, so a renamed slug still works.
 * `item` is null when the id is gone (Saved shows a muted "No longer available" row, Home drops
 * it). Only call it once topics AND playbooks have both loaded: a half-loaded library would
 * report every entry of the missing half as gone. Topic and playbook ids never collide
 * (`library.test.ts` pins that), because both kinds share one store keyed by id.
 */
export function resolveEntries<E extends { id: string; kind: EntryKind }>(entries: E[], topics: Topic[], playbooks: Playbook[]): Array<{ entry: E; item: LibraryItem | null }> {
  const topicsById = new Map(topics.map((topic) => [topic.id, topic]));
  const playbooksById = new Map(playbooks.map((playbook) => [playbook.id, playbook]));
  return entries.map((entry) => {
    const found = entry.kind === "playbook" ? playbooksById.get(entry.id) : topicsById.get(entry.id);
    return { entry, item: found ? ("procedureId" in found ? playbookItem(found) : topicItem(found)) : null };
  });
}

/** One day's batch on Home's Recently added list. `day` is a UTC date, `YYYY-MM-DD`, so a label cannot shift a day with the viewer's zone. */
export interface RecentlyAddedDay { day: string; items: LibraryItem[] }

/**
 * The `limit` newest entries by review day, newest day first and by title within a day (a batch
 * larger than `limit` shows its first `limit`), grouped by day. Review dates are authored as
 * instants, so the day is read in UTC.
 */
export function groupRecentlyAdded(candidates: Array<{ item: LibraryItem; reviewedAt: string }>, limit: number): RecentlyAddedDay[] {
  const dated = candidates.map(({ item, reviewedAt }) => ({ item, day: new Date(reviewedAt).toISOString().slice(0, 10) }));
  dated.sort((a, b) => b.day.localeCompare(a.day) || a.item.title.localeCompare(b.item.title));
  const days: RecentlyAddedDay[] = [];
  for (const { item, day } of dated.slice(0, limit)) {
    if (days.at(-1)?.day === day) days.at(-1)!.items.push(item);
    else days.push({ day, items: [item] });
  }
  return days;
}
