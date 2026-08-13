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
});
