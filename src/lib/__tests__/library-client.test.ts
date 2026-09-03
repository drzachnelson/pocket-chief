import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { TaxonomyNode, Topic } from "@/lib/types";

const cacheApprovedTopic = vi.fn();
const cacheTaxonomy = vi.fn();
const getCachedTopics = vi.fn();
vi.mock("@/lib/offline", () => ({ cacheApprovedTopic, cacheTaxonomy, getCachedTopics }));

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

// `library-client.ts` memoizes its fetch in a module-level `inFlight` variable, so each test needs
// a fresh module instance — same reason `offline-db-retry.test.ts` resets modules around `@/lib/offline`.
async function freshLoadLibrary() {
  vi.resetModules();
  return (await import("@/lib/library-client")).loadLibrary;
}

beforeEach(() => {
  cacheApprovedTopic.mockReset().mockResolvedValue(undefined);
  cacheTaxonomy.mockReset().mockResolvedValue(undefined);
  getCachedTopics.mockReset().mockResolvedValue([]);
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
    getCachedTopics.mockResolvedValue([]);
    const loadLibrary = await freshLoadLibrary();
    await expect(loadLibrary()).resolves.toEqual({ topics: [], taxonomy: [] });
  });

  it("memoizes concurrent callers behind a single fetch", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(shippedLibrary), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const loadLibrary = await freshLoadLibrary();
    const [first, second] = await Promise.all([loadLibrary(), loadLibrary()]);
    expect(first).toBe(second);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
