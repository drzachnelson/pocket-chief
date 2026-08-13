import { afterEach, describe, expect, it, vi } from "vitest";
import { detectLikelyPHI } from "@/lib/safety";
import { buildAnkiMobileUrl, createDuplicateHash, createFallbackCloze, sendToAnkiConnect, toAnkiTsv } from "@/lib/anki";

afterEach(() => vi.unstubAllGlobals());

describe("safety and Anki portability", () => {
  it("blocks likely patient identifiers", () => {
    expect(detectLikelyPHI("MRN 12345678, patient John Smith, DOB 1/2/1980").blocked).toBe(true);
  });

  it("does not block ordinary educational notes", () => {
    expect(detectLikelyPHI("CBD stones under 6 mm may be amenable to a transcystic approach.").blocked).toBe(false);
  });

  it.each([
    ["full name", "John Smith was transferred for evaluation"],
    ["street address", "Lives at 123 Main Street, Boston"],
    ["social security number", "SSN 123-45-6789"],
    ["full date", "Seen on 08/12/2026 for pain"],
    ["account identifier", "Account number: AB1234567"],
    ["health plan identifier", "Member ID ZXY-992810"],
    ["IP address", "Device address 192.168.10.24"],
  ])("blocks %s before external processing", (_label, value) => {
    expect(detectLikelyPHI(value).blocked).toBe(true);
  });

  it("encodes an AnkiMobile cloze URL and emits UTF-8 TSV", async () => {
    const draft = {
      id: "card-1",
      clozeText: "Completion {{c1::cholangiography}} documents duct clearance.",
      additionalContext: "Pocket Chief · Choledocholithiasis",
      sourceBlockIds: ["block-sequence"],
      contextImageRef: "context-card-1.png",
      tags: ["pocket-chief", "biliary"],
      duplicateHash: await createDuplicateHash("Completion cholangiography documents duct clearance."),
    };
    expect(buildAnkiMobileUrl(draft, { deck: "Pocket Chief", noteType: "Cloze", tagPrefix: "pc::" })).toContain("anki://x-callback-url/addnote");
    expect(toAnkiTsv([draft])).toContain("{{c1::cholangiography}}");
  });

  it("chooses a meaningful subject instead of a stopword for deterministic cloze", () => {
    expect(createFallbackCloze("Age alone is not a contraindication to operative duct exploration.")).toBe("{{c1::Age alone}} is not a contraindication to operative duct exploration.");
  });

  it("reports AnkiConnect unavailability so the UI can download a fallback", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("connection refused")));
    await expect(sendToAnkiConnect({ id: "1", clozeText: "{{c1::CBD}}", additionalContext: "Context", sourceBlockIds: ["b"], contextImageRef: "context.png", tags: [], duplicateHash: "abc" }, { deck: "Pocket Chief", noteType: "Cloze", tagPrefix: "pc::" })).rejects.toThrow("connection refused");
  });
});
