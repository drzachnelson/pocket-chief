import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({ apiOwner: vi.fn(async () => ({ owner: { email: "owner@example.com" }, response: undefined })) }));
vi.mock("@/lib/repository", () => ({
  getRepository: vi.fn(async () => ({
    getCards: vi.fn(async (ids: string[]) => ids.map((id) => ({ id, clozeText: "{{c1::CBD}} stones", additionalContext: "", sourceBlockIds: [], contextImageRef: "", tags: [], duplicateHash: "hash" }))),
    audit: vi.fn(async () => undefined),
  })),
}));
vi.mock("@/lib/anki", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/anki")>()),
  sendToAnkiConnect: vi.fn(async () => { throw new Error("connection refused"); }),
}));

const settings = { deck: "Pocket Chief", noteType: "Cloze", tagPrefix: "pc::" };

describe("anki export route", () => {
  it("returns 422 for a request-validation failure instead of the AnkiConnect fallback status", async () => {
    const { POST } = await import("@/app/api/anki/export/route");
    const response = await POST(new Request("http://localhost", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ draftIds: [], mode: "tsv", settings }) }));
    expect(response.status).toBe(422);
  });

  it("returns 503 with a TSV fallback only when AnkiConnect itself fails", async () => {
    const { POST } = await import("@/app/api/anki/export/route");
    const response = await POST(new Request("http://localhost", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ draftIds: ["card-1"], mode: "ankiconnect", settings }) }));
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ fallback: "tsv" });
  });
});
