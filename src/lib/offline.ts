import { deleteDB, openDB, type IDBPDatabase } from "idb";
import type { EntryKind, Playbook, RecentEntry, SavedEntry, TaxonomyNode, Topic } from "@/lib/types";

const DB_NAME = "pocket-chief-private";

export function shouldReplaceCachedTopic(cachedVersion: number | undefined, incomingVersion: number): boolean {
  return cachedVersion === undefined || incomingVersion > cachedVersion;
}

let databasePromise: Promise<IDBPDatabase> | undefined;

/** Long enough for a real upgrade to finish, short enough that a wedged tab is not forever. */
const OPEN_TIMEOUT_MS = 3000;
export const STORAGE_BUSY_MESSAGE = "Private storage is busy in another Pocket Chief tab. Close the others and reload.";

let storageBlocked = false;
/** True once an open has been blocked by another tab. The UI uses it to say which tab to close. */
export function isStorageBlocked(): boolean { return storageBlocked; }

async function openPrivateDatabase(): Promise<IDBPDatabase> {
  let handle: IDBPDatabase | undefined;
  let abandoned = false;
  const opening = openDB(DB_NAME, 2, {
    upgrade(database) {
      // Keep upgrades additive: existing users may already have data in any of these
      // stores, so never recreate an object store when moving from an older version.
      if (!database.objectStoreNames.contains("topics")) database.createObjectStore("topics", { keyPath: "id" });
      if (!database.objectStoreNames.contains("taxonomy")) database.createObjectStore("taxonomy", { keyPath: "id" });
      if (!database.objectStoreNames.contains("saved")) database.createObjectStore("saved", { keyPath: "id" });
      if (!database.objectStoreNames.contains("recent")) database.createObjectStore("recent", { keyPath: "id" });
      if (!database.objectStoreNames.contains("reviewed")) database.createObjectStore("reviewed", { keyPath: "id" });
    },
    // Our open is waiting on another tab that still holds an older version.
    blocked() { storageBlocked = true; },
    // The mirror image: another tab wants to upgrade and this connection is what stands in its
    // way. Close so its upgrade can run, and drop the memo so the next call reopens.
    blocking() { handle?.close(); handle = undefined; databasePromise = undefined; },
  });
  // Registered before the race so `handle` is set before anything can call `blocking`, and so a
  // connection that opens after we have given up gets closed rather than leaked.
  void opening.then((database) => { if (abandoned) database.close(); else handle = database; }, () => undefined);
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    // A blocked open neither resolves nor rejects. Without this every awaiting caller hangs
    // forever, which is worse than a failure they can retry or report.
    const database = await Promise.race([opening, new Promise<never>((_, reject) => {
      timer = setTimeout(() => { abandoned = true; storageBlocked = true; reject(new Error(STORAGE_BUSY_MESSAGE)); }, OPEN_TIMEOUT_MS);
    })]);
    storageBlocked = false;
    return database;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function db() {
  databasePromise ??= openPrivateDatabase().catch((error) => { databasePromise = undefined; throw error; });
  return databasePromise;
}

export async function cacheApprovedTopic(topic: Topic) {
  if (!topic.approvedVersion) return;
  const database = await db();
  const existing = await database.get("topics", topic.id) as Topic | undefined;
  if (shouldReplaceCachedTopic(existing?.approvedVersion?.versionNumber, topic.approvedVersion.versionNumber)) {
    await database.put("topics", topic);
  }
}

export async function cacheTaxonomy(nodes: TaxonomyNode[]) {
  const database = await db();
  const tx = database.transaction("taxonomy", "readwrite");
  await Promise.all([...nodes.map((node) => tx.store.put(node)), tx.done]);
}

export async function getCachedTopics(): Promise<Topic[]> {
  const database = await db();
  return database.getAll("topics") as Promise<Topic[]>;
}

export async function getCachedTaxonomy(): Promise<TaxonomyNode[]> {
  const database = await db();
  return database.getAll("taxonomy") as Promise<TaxonomyNode[]>;
}

// The `saved` and `recent` stores hold two generations of record, told apart by `kind`. A record
// written before playbooks could be saved or viewed is a whole Topic snapshot with no `kind`, and
// reads as a topic. Nothing here rewrites an old record: reads normalise in memory, and a record
// changes only when the reader saves or views that same page again.
//
// shortcut: new topic records still carry the snapshot (plus `kind`), so a stale tab running the
// previous bundle, which renders every record as a topic card, keeps working for topics. A
// playbook record has no snapshot and that tab would show it as a broken card; only a separate
// store avoids that, and a DB version bump makes the stale tab's own opens fail (VersionError).
// Revisit once nobody can still hold an old tab: write `{ id, kind, savedAt }` for topics too.
const kindOf = (record: { kind?: EntryKind }): EntryKind => record.kind ?? "topic";
const isPlaybook = (item: Topic | Playbook): item is Playbook => "procedureId" in item;
const newestFirst = <K extends string>(key: K) => (a: Record<K, string>, b: Record<K, string>) => b[key].localeCompare(a[key]);

export async function setTopicSaved(topic: Topic, saved: boolean) {
  const database = await db();
  if (saved) {
    await cacheApprovedTopic(topic);
    await database.put("saved", { ...topic, kind: "topic", savedAt: new Date().toISOString() });
  } else {
    await database.delete("saved", topic.id);
  }
}

export async function setPlaybookSaved(playbook: Playbook, saved: boolean) {
  const database = await db();
  if (saved) await database.put("saved", { id: playbook.id, kind: "playbook", savedAt: new Date().toISOString() });
  else await database.delete("saved", playbook.id);
}

/** Puts back, or takes off, a saved id the library no longer has: there is no Topic or Playbook to hand to the setters above, so the entry itself goes in and out. */
export async function setSavedEntry(entry: SavedEntry, saved: boolean) {
  const database = await db();
  if (saved) await database.put("saved", entry);
  else await database.delete("saved", entry.id);
}

/** Keyed by id, so it answers for a playbook as well as a topic. */
export async function isTopicSaved(topicId: string): Promise<boolean> {
  const database = await db();
  return Boolean(await database.get("saved", topicId));
}

export async function setTopicReviewed(topic: Topic, reviewed: boolean) {
  const database = await db();
  if (reviewed) {
    await cacheApprovedTopic(topic);
    await database.put("reviewed", { id: topic.id, reviewedAt: new Date().toISOString() });
  } else {
    await database.delete("reviewed", topic.id);
  }
}

export async function isTopicReviewed(topicId: string): Promise<boolean> {
  const database = await db();
  return Boolean(await database.get("reviewed", topicId));
}

/** Every saved item as an id into the library, newest first. Old snapshot records come back as topics, snapshot dropped. */
export async function getSavedEntries(): Promise<SavedEntry[]> {
  const database = await db();
  const records = await database.getAll("saved") as Array<{ id: string; kind?: EntryKind; savedAt: string }>;
  return records.map((record) => ({ id: record.id, kind: kindOf(record), savedAt: record.savedAt })).sort(newestFirst("savedAt"));
}

/** The saved topics as snapshots, for the views that still render them. Playbook records are not topics and are left out, and neither is an entry put back by `setSavedEntry`, which carries no snapshot. */
export async function getSavedTopics(): Promise<Topic[]> {
  const database = await db();
  return (await database.getAll("saved") as Array<Topic & { kind?: EntryKind }>).filter((record) => kindOf(record) === "topic" && record.slug);
}

export async function recordRecentView(item: Topic | Playbook) {
  const database = await db();
  const viewedAt = new Date().toISOString();
  if (isPlaybook(item)) { await database.put("recent", { id: item.id, kind: "playbook", viewedAt }); return; }
  await cacheApprovedTopic(item);
  await database.put("recent", { ...item, kind: "topic", viewedAt });
}

/** Every viewed page as an id into the library, newest first. The store may hold more than any one view shows. */
export async function getRecentEntries(): Promise<RecentEntry[]> {
  const database = await db();
  const records = await database.getAll("recent") as Array<{ id: string; kind?: EntryKind; viewedAt: string }>;
  return records.map((record) => ({ id: record.id, kind: kindOf(record), viewedAt: record.viewedAt })).sort(newestFirst("viewedAt"));
}

/** The recent topics as snapshots, for the views that still render them. Playbook records are left out. */
export async function getRecentTopics(limit = 6): Promise<Topic[]> {
  const database = await db();
  const topics = (await database.getAll("recent") as Array<Topic & { kind?: EntryKind; viewedAt: string }>).filter((record) => kindOf(record) === "topic");
  return topics.sort((a, b) => b.viewedAt.localeCompare(a.viewedAt)).slice(0, limit);
}

export async function clearPrivateOfflineData() {
  if (databasePromise) {
    const database = await databasePromise;
    database.close();
    databasePromise = undefined;
  }
  if (typeof indexedDB !== "undefined") await deleteDB(DB_NAME, { blocked: () => console.warn("Pocket Chief offline storage deletion is waiting for another tab to close.") });
  if (typeof caches !== "undefined") {
    await Promise.all((await caches.keys()).filter((key) => key.startsWith("pocket-chief")).map((key) => caches.delete(key)));
  }
}
