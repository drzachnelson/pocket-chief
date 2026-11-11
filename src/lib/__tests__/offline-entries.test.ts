import "fake-indexeddb/auto"; // installs the IDB* globals idb reads; each test then swaps in an empty factory
import { IDBFactory } from "fake-indexeddb";
import { openDB } from "idb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { listPlaybooks, listTopics } from "@/lib/library";

// Real IndexedDB (fake-indexeddb), because the claim under test is about what is on disk: an entry
// written before playbooks could be saved must still read as a topic and must not be rewritten.

const [topic, otherTopic] = listTopics();
const [playbook, otherPlaybook] = listPlaybooks();

async function freshOffline() {
  vi.resetModules();
  return import("@/lib/offline");
}

/** The device as the previous bundle left it: whole Topic snapshots with no `kind`. */
async function seedLegacyRecords() {
  const database = await openDB("pocket-chief-private", 2, { upgrade(created) { for (const name of ["topics", "taxonomy", "saved", "recent", "reviewed"]) created.createObjectStore(name, { keyPath: "id" }); } });
  await database.put("saved", { ...topic, savedAt: "2026-10-01T00:00:00.000Z" });
  await database.put("recent", { ...topic, viewedAt: "2026-10-02T00:00:00.000Z" });
  database.close();
}

async function rawRecords(store: "saved" | "recent") {
  const database = await openDB("pocket-chief-private", 2);
  try { return await database.getAll(store); } finally { database.close(); }
}

beforeEach(() => { globalThis.indexedDB = new IDBFactory(); });
afterEach(() => { vi.useRealTimers(); });

describe("saved and recent entries before playbooks", () => {
  it("reads a snapshot with no kind as a topic entry, without the snapshot", async () => {
    await seedLegacyRecords();
    const { getRecentEntries, getSavedEntries } = await freshOffline();
    expect(await getSavedEntries()).toEqual([{ id: topic.id, kind: "topic", savedAt: "2026-10-01T00:00:00.000Z" }]);
    expect(await getRecentEntries()).toEqual([{ id: topic.id, kind: "topic", viewedAt: "2026-10-02T00:00:00.000Z" }]);
  });

  it("rewrites nothing on a read: the old records are byte-for-byte what they were", async () => {
    await seedLegacyRecords();
    const before = { saved: await rawRecords("saved"), recent: await rawRecords("recent") };
    const { getRecentEntries, getRecentTopics, getSavedEntries, getSavedTopics } = await freshOffline();
    await Promise.all([getSavedEntries(), getRecentEntries(), getSavedTopics(), getRecentTopics()]);
    expect({ saved: await rawRecords("saved"), recent: await rawRecords("recent") }).toEqual(before);
    expect(before.saved[0]).not.toHaveProperty("kind");
  });

  it("still returns an old snapshot to the views that render topic cards", async () => {
    await seedLegacyRecords();
    const { getRecentTopics, getSavedTopics } = await freshOffline();
    expect((await getSavedTopics()).map((saved) => saved.id)).toEqual([topic.id]);
    expect((await getRecentTopics()).map((viewed) => viewed.id)).toEqual([topic.id]);
  });
});

describe("saving", () => {
  it("stamps a saved topic with its kind and keeps it readable as a topic", async () => {
    const { getSavedEntries, getSavedTopics, isTopicSaved, setTopicSaved } = await freshOffline();
    await setTopicSaved(topic, true);
    expect(await getSavedEntries()).toEqual([{ id: topic.id, kind: "topic", savedAt: expect.any(String) }]);
    expect((await rawRecords("saved"))[0]).toMatchObject({ id: topic.id, kind: "topic", slug: topic.slug });
    expect((await getSavedTopics()).map((saved) => saved.id)).toEqual([topic.id]);
    expect(await isTopicSaved(topic.id)).toBe(true);
  });

  it("saves a playbook as an id, a kind and a date, with no body, and keeps it out of the topic views", async () => {
    const { getSavedEntries, getSavedTopics, isTopicSaved, setPlaybookSaved } = await freshOffline();
    await setPlaybookSaved(playbook, true);
    expect(await rawRecords("saved")).toEqual([{ id: playbook.id, kind: "playbook", savedAt: expect.any(String) }]);
    expect(await getSavedEntries()).toEqual([{ id: playbook.id, kind: "playbook", savedAt: expect.any(String) }]);
    expect(await getSavedTopics()).toEqual([]);
    expect(await isTopicSaved(playbook.id)).toBe(true);
  });

  it("lists saved items of both kinds newest first, old snapshots included", async () => {
    await seedLegacyRecords();
    vi.useFakeTimers({ toFake: ["Date"] });
    const { getSavedEntries, setPlaybookSaved, setTopicSaved } = await freshOffline();
    vi.setSystemTime(new Date("2026-11-01T00:00:00.000Z")); await setPlaybookSaved(playbook, true);
    vi.setSystemTime(new Date("2026-11-02T00:00:00.000Z")); await setTopicSaved(otherTopic, true);
    vi.setSystemTime(new Date("2026-11-03T00:00:00.000Z")); await setPlaybookSaved(otherPlaybook, true);
    expect((await getSavedEntries()).map(({ id, kind }) => `${kind}:${id}`)).toEqual([`playbook:${otherPlaybook.id}`, `topic:${otherTopic.id}`, `playbook:${playbook.id}`, `topic:${topic.id}`]);
  });

  it("removes either kind, an old snapshot included, when it is unsaved", async () => {
    await seedLegacyRecords();
    const { getSavedEntries, setPlaybookSaved, setTopicSaved } = await freshOffline();
    await setPlaybookSaved(playbook, true);
    await setTopicSaved(topic, false);
    await setPlaybookSaved(playbook, false);
    expect(await getSavedEntries()).toEqual([]);
  });
});

describe("recent views", () => {
  it("records a viewed topic with its kind and still caches it for offline reading", async () => {
    const { getCachedTopics, getRecentEntries, getRecentTopics, recordRecentView } = await freshOffline();
    await recordRecentView(topic);
    expect(await getRecentEntries()).toEqual([{ id: topic.id, kind: "topic", viewedAt: expect.any(String) }]);
    expect((await getRecentTopics()).map((viewed) => viewed.id)).toEqual([topic.id]);
    expect((await getCachedTopics()).map((cached) => cached.id)).toEqual([topic.id]);
  });

  it("records a viewed playbook as an id, a kind and a date, and keeps it out of the topic views and the topic cache", async () => {
    const { getCachedTopics, getRecentEntries, getRecentTopics, recordRecentView } = await freshOffline();
    await recordRecentView(playbook);
    expect(await rawRecords("recent")).toEqual([{ id: playbook.id, kind: "playbook", viewedAt: expect.any(String) }]);
    expect(await getRecentEntries()).toEqual([{ id: playbook.id, kind: "playbook", viewedAt: expect.any(String) }]);
    expect(await getRecentTopics()).toEqual([]);
    expect(await getCachedTopics()).toEqual([]);
  });

  it("lists every viewed page newest first, old snapshots included, however many there are", async () => {
    await seedLegacyRecords();
    vi.useFakeTimers({ toFake: ["Date"] });
    const { getRecentEntries, recordRecentView } = await freshOffline();
    const pages = [playbook, otherPlaybook, otherTopic, ...listTopics().slice(2, 8)];
    for (const [index, page] of pages.entries()) { vi.setSystemTime(new Date(Date.UTC(2026, 10, 1 + index))); await recordRecentView(page); }
    const entries = await getRecentEntries();
    expect(entries).toHaveLength(pages.length + 1);
    expect(entries.map((entry) => entry.id)).toEqual([...pages].reverse().map((page) => page.id).concat(topic.id));
    expect(entries.at(-1)).toEqual({ id: topic.id, kind: "topic", viewedAt: "2026-10-02T00:00:00.000Z" });
  });
});
