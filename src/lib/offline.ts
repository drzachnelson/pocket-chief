import { openDB } from "idb";
import type { TaxonomyNode, Topic } from "@/lib/types";

const DB_NAME = "pocket-chief-private";

export function shouldReplaceCachedTopic(cachedVersion: number | undefined, incomingVersion: number): boolean {
  return cachedVersion === undefined || incomingVersion > cachedVersion;
}

function db() {
  return openDB(DB_NAME, 1, {
    upgrade(database) {
      database.createObjectStore("topics", { keyPath: "id" });
      database.createObjectStore("taxonomy", { keyPath: "id" });
      database.createObjectStore("saved", { keyPath: "id" });
      database.createObjectStore("recent", { keyPath: "id" });
    },
  });
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

export async function getSavedTopics(): Promise<Topic[]> {
  const database = await db();
  return database.getAll("saved") as Promise<Topic[]>;
}

export async function recordRecentView(topic: Topic) {
  const database = await db();
  await cacheApprovedTopic(topic);
  await database.put("recent", { ...topic, viewedAt: new Date().toISOString() });
}

export async function clearPrivateOfflineData() {
  if (typeof indexedDB !== "undefined") indexedDB.deleteDatabase(DB_NAME);
  if (typeof caches !== "undefined") {
    await Promise.all((await caches.keys()).filter((key) => key.startsWith("pocket-chief")).map((key) => caches.delete(key)));
  }
}
