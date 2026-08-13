import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({ apiOwner: vi.fn(async () => ({ owner: { email: "owner@example.com" }, response: undefined })) }));
vi.mock("@/lib/repository", () => ({
  getRepository: vi.fn(async () => ({
    getVersion: vi.fn(async () => ({ id: "version-1", versionNumber: 1 })),
    restoreVersion: vi.fn(async () => { throw new Error("advisory lock contention"); }),
    audit: vi.fn(async () => undefined),
  })),
}));

describe("restore version route", () => {
  it("returns a JSON error instead of throwing when the repository restore call fails", async () => {
    const { POST } = await import("@/app/api/topics/versions/[id]/restore/route");
    const response = await POST(new Request("http://localhost", { method: "POST" }), { params: Promise.resolve({ id: "version-1" }) });
    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ code: "RESTORE_FAILED" });
  });
});
