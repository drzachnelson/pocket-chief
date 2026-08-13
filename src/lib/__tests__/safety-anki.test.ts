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
    expect(detectLikelyPHI("Acute Wound Care\nOperative Decision Review").blocked).toBe(false);
  });

  it.each([
    ["narrative readmission with POD marker", "The patient was readmitted on POD 3 with fevers."],
    ["s/p narrative discharge", "S/p cholecystectomy, the patient was discharged home in stable condition."],
    ["narrative taken back to the OR", "The patient was taken back to the OR for a bile leak."],
  ])("blocks %s before external processing", (_label, value) => {
    expect(detectLikelyPHI(value).blocked).toBe(true);
  });

  it.each([
    ["general typical-presentation prose", "Patients with choledocholithiasis typically present with right upper quadrant pain and jaundice."],
    ["general management guidance", "A patient with a dilated common bile duct on ultrasound should undergo further workup."],
    ["spelled-out postoperative day without narrative verb", "Post-operative day 3 fever should prompt evaluation for infection, DVT, or atelectasis."],
  ])("does not block %s", (_label, value) => {
    expect(detectLikelyPHI(value).blocked).toBe(false);
  });

  it.each([
    ["lowercase-typed full name", "john smith was seen today for rlq pain"],
    ["all-caps full name", "JOHN SMITH presented with pain"],
    ["lowercase patient-prefixed name", "patient john doe here for follow-up"],
  ])("blocks %s regardless of letter case", (_label, value) => {
    expect(detectLikelyPHI(value).blocked).toBe(true);
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
    const tsv = toAnkiTsv([draft], { deck: "Pocket Chief", noteType: "Cloze", tagPrefix: "pc::" });
    expect(tsv).toContain("{{c1::cholangiography}}");
    expect(tsv).toContain("pc::pocket-chief pc::biliary");
  });

  it("chooses a meaningful subject instead of a stopword for deterministic cloze", () => {
    expect(createFallbackCloze("Age alone is not a contraindication to operative duct exploration.")).toBe("{{c1::Age alone}} is not a contraindication to operative duct exploration.");
  });

  it("reports AnkiConnect unavailability so the UI can download a fallback", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("connection refused")));
    await expect(sendToAnkiConnect({ id: "1", clozeText: "{{c1::CBD}}", additionalContext: "Context", sourceBlockIds: ["b"], contextImageRef: "context.png", tags: [], duplicateHash: "abc" }, { deck: "Pocket Chief", noteType: "Cloze", tagPrefix: "pc::" })).rejects.toThrow("connection refused");
  });
});
