import { deleteDB, openDB, type IDBPDatabase } from "idb";
import type { TaxonomyNode, Topic } from "@/lib/types";

const DB_NAME = "pocket-chief-private";

export function shouldReplaceCachedTopic(cachedVersion: number | undefined, incomingVersion: number): boolean {
  return cachedVersion === undefined || incomingVersion > cachedVersion;
}

let databasePromise: Promise<IDBPDatabase> | undefined;

function db() {
  databasePromise ??= openDB(DB_NAME, 2, {
    upgrade(database) {
      // Keep upgrades additive: existing users may already have data in any of these
      // stores, so never recreate an object store when moving from an older version.
      if (!database.objectStoreNames.contains("topics")) database.createObjectStore("topics", { keyPath: "id" });
      if (!database.objectStoreNames.contains("taxonomy")) database.createObjectStore("taxonomy", { keyPath: "id" });
      if (!database.objectStoreNames.contains("saved")) database.createObjectStore("saved", { keyPath: "id" });
      if (!database.objectStoreNames.contains("recent")) database.createObjectStore("recent", { keyPath: "id" });
      if (!database.objectStoreNames.contains("reviewed")) database.createObjectStore("reviewed", { keyPath: "id" });
    },
  }).catch((error) => { databasePromise = undefined; throw error; });
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

export async function setTopicSaved(topic: Topic, saved: boolean) {
  const database = await db();
  if (saved) {
    await cacheApprovedTopic(topic);
    await database.put("saved", { ...topic, savedAt: new Date().toISOString() });
  } else {
    await database.delete("saved", topic.id);
  }
}

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

export async function getSavedTopics(): Promise<Topic[]> {
  const database = await db();
  return database.getAll("saved") as Promise<Topic[]>;
}

export async function recordRecentView(topic: Topic) {
  const database = await db();
  await cacheApprovedTopic(topic);
  await database.put("recent", { ...topic, viewedAt: new Date().toISOString() });
}

export async function getRecentTopics(limit = 6): Promise<Topic[]> {
  const database = await db();
  const topics = await database.getAll("recent") as Array<Topic & { viewedAt: string }>;
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
