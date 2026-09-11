import { afterEach, describe, expect, it, vi } from "vitest";

const openDBMock = vi.fn();
vi.mock("idb", () => ({ openDB: (...args: unknown[]) => openDBMock(...args), deleteDB: vi.fn() }));

afterEach(() => { openDBMock.mockReset(); vi.resetModules(); });

describe("offline.ts db() retry", () => {
  it("retries opening the database on the next call after a prior attempt rejected", async () => {
    openDBMock.mockRejectedValueOnce(new Error("blocked")).mockResolvedValueOnce({ get: vi.fn(async () => undefined) });
    const { isTopicSaved } = await import("@/lib/offline");
    await expect(isTopicSaved("topic-1")).rejects.toThrow("blocked");
    await expect(isTopicSaved("topic-1")).resolves.toBe(false);
    expect(openDBMock).toHaveBeenCalledTimes(2);
  });

  it("adds the reviewed store without recreating existing stores and persists approved topics", async () => {
    const stores = new Set(["topics", "taxonomy", "saved", "recent"]);
    const database = {
      objectStoreNames: { contains: (name: string) => stores.has(name) },
      createObjectStore: vi.fn((name: string) => { stores.add(name); }),
      get: vi.fn(async () => undefined),
      put: vi.fn(async () => undefined),
      delete: vi.fn(async () => undefined),
    };
    openDBMock.mockImplementation(async (_name: string, version: number, options: { upgrade: (db: typeof database) => void }) => {
      expect(version).toBe(2);
      options.upgrade(database);
      return database;
    });
    const { isTopicReviewed, setTopicReviewed } = await import("@/lib/offline");
    const topic = { id: "topic-1", slug: "topic-1", title: "Topic", aliases: [], scoreNodeId: "node", scoreCategory: "SCORE", tags: [], approvedVersion: { id: "v1", topicId: "topic-1", versionNumber: 1, status: "approved" as const, blocks: [], sourceIds: [], scoreNodeId: "node", tags: [], warnings: [], createdAt: "2026-01-01" }, versions: [], updatedAt: "2026-01-01" };

    await setTopicReviewed(topic, true);
    expect(stores).toContain("reviewed");
    expect(database.createObjectStore).toHaveBeenCalledTimes(1);
    expect(database.put).toHaveBeenCalledWith("reviewed", expect.objectContaining({ id: topic.id }));
    await expect(isTopicReviewed(topic.id)).resolves.toBe(false);
  });

  it("rejects instead of hanging when the database open never settles", async () => {
    // A blocked open neither resolves nor rejects, so every caller awaiting db() used to wait
    // forever. Failing is worse than succeeding but far better than wedging the whole surface.
    openDBMock.mockReturnValue(new Promise(() => {}));
    vi.useFakeTimers();
    try {
      const { isStorageBlocked, isTopicSaved } = await import("@/lib/offline");
      const pending = isTopicSaved("topic-1");
      const settled = expect(pending).rejects.toThrow(/busy in another Pocket Chief tab/);
      await vi.advanceTimersByTimeAsync(3000);
      await settled;
      expect(isStorageBlocked()).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });
});
