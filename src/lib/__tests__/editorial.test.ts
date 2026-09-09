import { describe, expect, it } from "vitest";
import { factualUnits, supportWarnings } from "@/lib/editorial";
import { demoTopics } from "@/lib/seed";
import type { TopicBlock } from "@/lib/types";

const cited = (text: string, sourceId = "src-1") => ({ id: `claim-${text.slice(0, 12)}`, text, citationIds: [sourceId], status: "cited" as const });
const sources = new Set(["src-1"]);

describe("claim support", () => {
  it("warns when a factual unit has no claim at all", () => {
    const block: TopicBlock = { id: "b1", type: "prose", text: "Stones under 6 mm may pass.", claims: [] };
    expect(supportWarnings([block], sources)).toEqual(["Needs support: Stones under 6 mm may pass."]);
  });

  it("warns when the claim text has drifted from the rendered text", () => {
    const block: TopicBlock = { id: "b1", type: "prose", text: "Stones under 6 mm may pass.", claims: [cited("Something else entirely.")] };
    expect(supportWarnings([block], sources)).toEqual(["Needs support: Stones under 6 mm may pass."]);
  });

  it("accepts a claim that matches apart from whitespace", () => {
    const block: TopicBlock = { id: "b1", type: "prose", text: "Stones  under 6 mm\nmay pass.", claims: [cited("Stones under 6 mm may pass.")] };
    expect(supportWarnings([block], sources)).toEqual([]);
  });

  it("rejects a citation that is not one of the topic's supplied sources", () => {
    const block: TopicBlock = { id: "b1", type: "prose", text: "Stones under 6 mm may pass.", claims: [cited("Stones under 6 mm may pass.", "invented")] };
    expect(supportWarnings([block], sources)).toEqual(["Needs support: Stones under 6 mm may pass."]);
  });

  it("rejects a claim marked cited with no citations", () => {
    const block: TopicBlock = { id: "b1", type: "prose", text: "Stones under 6 mm may pass.", claims: [{ id: "c1", text: "Stones under 6 mm may pass.", citationIds: [], status: "cited" }] };
    expect(supportWarnings([block], sources)).toEqual(["Needs support: Stones under 6 mm may pass."]);
  });

  it("rejects extra claims hidden past the rendered units", () => {
    const block: TopicBlock = { id: "b1", type: "references", heading: "Sources", sourceIds: ["src-1"], claims: [cited("A claim nothing renders.")] };
    expect(supportWarnings([block], sources)).toEqual(["Needs support: A claim nothing renders."]);
  });

  it("requires one claim per table row and per flow node and edge label", () => {
    const table: TopicBlock = { id: "t1", type: "table", columns: ["Route", "When"], rows: [["Transcystic", "Small stone"], ["Choledochotomy", "Large stone"]], claims: [cited("Transcystic — Small stone")] };
    expect(supportWarnings([table], sources)).toEqual(["Needs support: Choledochotomy — Large stone"]);
    const flow: TopicBlock = { id: "f1", type: "flow", nodes: [{ id: "a", label: "Suspected stone" }, { id: "b", label: "MRCP" }], edges: [{ from: "a", to: "b", label: "intermediate risk" }], claims: [] };
    expect(supportWarnings([flow], sources)).toEqual(["Needs support: Suspected stone", "Needs support: MRCP", "Needs support: intermediate risk"]);
  });

  it("requires support for rendered image alt text and captions", () => {
    const block: TopicBlock = { id: "i1", type: "image", mediaId: "m1", alt: "Biliary anatomy", caption: "Cystic duct insertion", claims: [] };
    expect(factualUnits(block)).toEqual(["Biliary anatomy", "Cystic duct insertion"]);
    expect(supportWarnings([block], sources)).toHaveLength(2);
  });

  it("keeps every authored topic in the shipped library source-linked", () => {
    for (const topic of demoTopics) {
      const version = topic.approvedVersion!;
      expect(supportWarnings(version.blocks, new Set(version.sourceIds)), topic.slug).toEqual([]);
    }
  });
});
