import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Playbook, RecentEntry, SavedEntry, TaxonomyNode, Topic } from "@/lib/types";

const cacheApprovedTopic = vi.fn();
const cacheTaxonomy = vi.fn();
const getCachedTopics = vi.fn();
const getCachedTaxonomy = vi.fn();
const getSavedEntries = vi.fn();
const getRecentEntries = vi.fn();
vi.mock("@/lib/offline", () => ({ cacheApprovedTopic, cacheTaxonomy, getCachedTaxonomy, getCachedTopics, getSavedEntries, getRecentEntries }));

function topic(id: string): Topic {
  return {
    id,
    slug: id,
    title: id,
    aliases: [],
    scoreNodeId: "biliary",
    scoreCategory: "Biliary Tract",
    tags: [],
    updatedAt: "2026-08-12T00:00:00.000Z",
    approvedVersion: { id: `${id}-v1`, topicId: id, versionNumber: 1, status: "approved", blocks: [], sourceIds: [], scoreNodeId: "biliary", tags: [], warnings: [], createdAt: "2026-08-12T00:00:00.000Z" },
    versions: [],
  };
}

const taxonomy: TaxonomyNode[] = [{ id: "score", title: "SCORE Curriculum", slug: "score", order: 0 }];
const shippedLibrary = { topics: [topic("topic-1")], taxonomy };
const shippedPlaybooks = { playbooks: [{ id: "playbook-1", slug: "playbook-1", title: "Playbook 1" } as Playbook] };
const ok = (body: unknown) => new Response(JSON.stringify(body), { status: 200 });
// Answers each asset by URL, so a test can fail one half and let the other succeed.
const serve = (routes: Record<string, () => Response | Promise<Response>>) => vi.fn(async (url: string) => { const route = Object.entries(routes).find(([suffix]) => url.endsWith(suffix)); if (!route) throw new Error(`unexpected ${url}`); return route[1](); });

// `library-client.ts` memoizes its fetch in a module-level `inFlight` variable, so each test needs
// a fresh module instance — same reason `offline-db-retry.test.ts` resets modules around `@/lib/offline`.
async function freshClient() {
  vi.resetModules();
  return import("@/lib/library-client");
}
async function freshLoadLibrary() { return (await freshClient()).loadLibrary; }

beforeEach(() => {
  cacheApprovedTopic.mockReset().mockResolvedValue(undefined);
  cacheTaxonomy.mockReset().mockResolvedValue(undefined);
  getCachedTopics.mockReset().mockResolvedValue([]);
  getCachedTaxonomy.mockReset().mockResolvedValue([]);
  getSavedEntries.mockReset().mockResolvedValue([]);
  getRecentEntries.mockReset().mockResolvedValue([]);
});

afterEach(() => { vi.unstubAllGlobals(); });

describe("loadLibrary", () => {
  it("fetches the shipped asset, seeds IndexedDB, and returns it", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(shippedLibrary), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const loadLibrary = await freshLoadLibrary();
    await expect(loadLibrary()).resolves.toEqual(shippedLibrary);
    expect(fetchMock).toHaveBeenCalledWith("/library.json");
    expect(cacheTaxonomy).toHaveBeenCalledWith(shippedLibrary.taxonomy);
    expect(cacheApprovedTopic).toHaveBeenCalledWith(shippedLibrary.topics[0]);
  });

  it("still returns the fetched library when caching it fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(shippedLibrary), { status: 200 })));
    cacheTaxonomy.mockRejectedValue(new Error("quota exceeded"));
    cacheApprovedTopic.mockRejectedValue(new Error("quota exceeded"));
    const loadLibrary = await freshLoadLibrary();
    await expect(loadLibrary()).resolves.toEqual(shippedLibrary);
  });

  it("falls back to the IndexedDB cache when the fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("network down"); }));
    getCachedTopics.mockResolvedValue([topic("cached-1")]);
    const loadLibrary = await freshLoadLibrary();
    await expect(loadLibrary()).resolves.toEqual({ topics: [topic("cached-1")], taxonomy: [] });
    expect(cacheTaxonomy).not.toHaveBeenCalled();
  });

  it("falls back to the IndexedDB cache when the response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 500 })));
    getCachedTopics.mockResolvedValue([topic("cached-1")]);
    const loadLibrary = await freshLoadLibrary();
    await expect(loadLibrary()).resolves.toEqual({ topics: [topic("cached-1")], taxonomy: [] });
  });

  it("reports failure, not an empty library, when the fetch fails and nothing is cached", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 500 })));
    getCachedTopics.mockResolvedValue([]);
    getCachedTaxonomy.mockResolvedValue(taxonomy);
    const loadLibrary = await freshLoadLibrary();
    await expect(loadLibrary()).rejects.toThrow("The library is unavailable.");
  });

  it("reports failure when the cache cannot be read either", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("network down"); }));
    getCachedTopics.mockRejectedValue(new Error("blocked"));
    const loadLibrary = await freshLoadLibrary();
    await expect(loadLibrary()).rejects.toThrow("The library is unavailable.");
  });

  it("memoizes concurrent callers behind a single fetch", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(shippedLibrary), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const loadLibrary = await freshLoadLibrary();
    const [first, second] = await Promise.all([loadLibrary(), loadLibrary()]);
    expect(first).toBe(second);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retries the network on a later call after a failed load, instead of replaying the failure", async () => {
    const fetchMock = vi.fn()
      .mockImplementationOnce(async () => { throw new Error("network down"); })
      .mockImplementationOnce(async () => new Response(JSON.stringify(shippedLibrary), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const loadLibrary = await freshLoadLibrary();
    await expect(loadLibrary()).rejects.toThrow("The library is unavailable.");
    await expect(loadLibrary()).resolves.toEqual(shippedLibrary);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("retries the network on a later call after a load that fell back to the cache, instead of replaying the stale fallback", async () => {
    const fetchMock = vi.fn()
      .mockImplementationOnce(async () => { throw new Error("network down"); })
      .mockImplementationOnce(async () => new Response(JSON.stringify(shippedLibrary), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    getCachedTopics.mockResolvedValue([topic("cached-1")]);
    const loadLibrary = await freshLoadLibrary();
    await expect(loadLibrary()).resolves.toEqual({ topics: [topic("cached-1")], taxonomy: [] });
    await expect(loadLibrary()).resolves.toEqual(shippedLibrary);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("gives concurrent callers one attempt and one shared failure, then lets the next call try again", async () => {
    const fetchMock = vi.fn().mockImplementationOnce(async () => { throw new Error("network down"); }).mockImplementation(async () => new Response(JSON.stringify(shippedLibrary), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const loadLibrary = await freshLoadLibrary();
    const results = await Promise.allSettled([loadLibrary(), loadLibrary()]);
    expect(results.map((result) => result.status)).toEqual(["rejected", "rejected"]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await expect(loadLibrary()).resolves.toEqual(shippedLibrary);
  });

  it("falls back to cached taxonomy, not an empty list, when the fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("network down"); }));
    getCachedTopics.mockResolvedValue([topic("cached-1")]);
    getCachedTaxonomy.mockResolvedValue(taxonomy);
    const loadLibrary = await freshLoadLibrary();
    await expect(loadLibrary()).resolves.toEqual({ topics: [topic("cached-1")], taxonomy });
  });

  it("returns the fetched library even when a cache write never settles", async () => {
    // The bug this guards: seeding used to be awaited, and a blocked IndexedDB open neither
    // resolves nor rejects, so `.catch()` could not rescue it. Search stayed empty forever
    // even though library.json had downloaded fine. Before the fix this test times out.
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(shippedLibrary), { status: 200 })));
    cacheTaxonomy.mockReturnValue(new Promise(() => {}));
    cacheApprovedTopic.mockReturnValue(new Promise(() => {}));
    const loadLibrary = await freshLoadLibrary();
    await expect(loadLibrary()).resolves.toEqual(shippedLibrary);
  });
});

describe("loadPlaybooks", () => {
  it("fetches the playbook asset and returns it", async () => {
    const fetchMock = vi.fn(async () => ok(shippedPlaybooks));
    vi.stubGlobal("fetch", fetchMock);
    const { loadPlaybooks } = await freshClient();
    await expect(loadPlaybooks()).resolves.toEqual(shippedPlaybooks);
    expect(fetchMock).toHaveBeenCalledWith("/playbooks.json");
  });

  it("reports failure instead of an empty list, on a network error and on a bad response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("network down"); }));
    const { loadPlaybooks } = await freshClient();
    await expect(loadPlaybooks()).rejects.toThrow("network down");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 500 })));
    await expect(loadPlaybooks()).rejects.toThrow("The playbooks asset is unavailable.");
  });

  it("gives concurrent callers one fetch, and a call after a failure fetches again", async () => {
    const fetchMock = vi.fn().mockImplementationOnce(async () => new Response("", { status: 500 })).mockImplementation(async () => ok(shippedPlaybooks));
    vi.stubGlobal("fetch", fetchMock);
    const { loadPlaybooks } = await freshClient();
    const results = await Promise.allSettled([loadPlaybooks(), loadPlaybooks()]);
    expect(results.map((result) => result.status)).toEqual(["rejected", "rejected"]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [first, second] = await Promise.all([loadPlaybooks(), loadPlaybooks()]);
    expect(first).toBe(second);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe("loadCorpora", () => {
  it("resolves with topics, taxonomy and playbooks together", async () => {
    vi.stubGlobal("fetch", serve({ "/library.json": () => ok(shippedLibrary), "/playbooks.json": () => ok(shippedPlaybooks) }));
    const { loadCorpora } = await freshClient();
    await expect(loadCorpora()).resolves.toEqual({ ...shippedLibrary, ...shippedPlaybooks });
  });

  it("fails when only the playbooks half is missing, so nothing is read as gone or as no match", async () => {
    vi.stubGlobal("fetch", serve({ "/library.json": () => ok(shippedLibrary), "/playbooks.json": () => new Response("", { status: 500 }) }));
    const { loadCorpora } = await freshClient();
    await expect(loadCorpora()).rejects.toThrow("The playbooks asset is unavailable.");
  });

  it("fails when only the topics half is missing and nothing is cached", async () => {
    vi.stubGlobal("fetch", serve({ "/library.json": () => new Response("", { status: 500 }), "/playbooks.json": () => ok(shippedPlaybooks) }));
    const { loadCorpora } = await freshClient();
    await expect(loadCorpora()).rejects.toThrow("The library is unavailable.");
  });

  it("counts a non-empty topic cache as the topics half", async () => {
    vi.stubGlobal("fetch", serve({ "/library.json": () => { throw new Error("offline"); }, "/playbooks.json": () => ok(shippedPlaybooks) }));
    getCachedTopics.mockResolvedValue([topic("cached-1")]);
    const { loadCorpora } = await freshClient();
    await expect(loadCorpora()).resolves.toEqual({ topics: [topic("cached-1")], taxonomy: [], ...shippedPlaybooks });
  });
});

describe("loadHistory", () => {
  const saved: SavedEntry[] = [{ id: "topic-1", kind: "topic", savedAt: "2026-11-02T00:00:00.000Z" }];
  const recent: RecentEntry[] = [{ id: "playbook-1", kind: "playbook", viewedAt: "2026-11-03T00:00:00.000Z" }];
  const healthy = () => vi.stubGlobal("fetch", serve({ "/library.json": () => ok(shippedLibrary), "/playbooks.json": () => ok(shippedPlaybooks) }));

  it("reads both corpora and what this device saved and viewed in one go", async () => {
    healthy();
    getSavedEntries.mockResolvedValue(saved);
    getRecentEntries.mockResolvedValue(recent);
    const { loadHistory } = await freshClient();
    await expect(loadHistory()).resolves.toEqual({ ...shippedLibrary, ...shippedPlaybooks, saved, recent });
  });

  it("fails as a whole when any part of the read fails", async () => {
    healthy();
    getRecentEntries.mockRejectedValue(new Error("blocked"));
    const { loadHistory } = await freshClient();
    await expect(loadHistory()).rejects.toThrow("blocked");
    getRecentEntries.mockResolvedValue([]);
    vi.stubGlobal("fetch", serve({ "/library.json": () => ok(shippedLibrary), "/playbooks.json": () => new Response("", { status: 500 }) }));
    const second = await freshClient();
    await expect(second.loadHistory()).rejects.toThrow("The playbooks asset is unavailable.");
  });
});
