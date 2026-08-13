import { describe, expect, it } from "vitest";
import { approveDraft, createDraft, normalizeClaimSupport, requireOwnerAttestation, restoreVersion, reviseDraftBlock, supportWarnings } from "@/lib/editorial";
import { choledocholithiasisTopic, demoTopics } from "@/lib/seed";

describe("editorial workflow", () => {
  it("blocks approval while any factual claim needs support", () => {
    const draft = createDraft({
      topicId: choledocholithiasisTopic.id,
      sourceIds: ["source-user-notes"],
      scoreNodeId: choledocholithiasisTopic.scoreNodeId,
      tags: ["biliary"],
      rawNotes: "A new unsupported assertion.",
      imageIds: [],
    });

    expect(() => approveDraft(draft, "owner@example.com")).toThrow(/support/i);
  });

  it("keeps every rendered unit in the reviewed launch topic source-linked", () => {
    expect(supportWarnings(choledocholithiasisTopic.approvedVersion!.blocks, new Set(choledocholithiasisTopic.approvedVersion!.sourceIds))).toEqual([]);
  });

  it("keeps every seeded launch topic source-linked", () => {
    for (const topic of demoTopics) {
      const approved = topic.approvedVersion!;
      expect(supportWarnings(approved.blocks, new Set(approved.sourceIds))).toEqual([]);
    }
  });

  it("keeps the approved version immutable while a revision is drafted", () => {
    const draft = createDraft({
      topicId: choledocholithiasisTopic.id,
      sourceIds: ["source-user-notes"],
      scoreNodeId: choledocholithiasisTopic.scoreNodeId,
      tags: ["biliary"],
      rawNotes: "Initial note",
      imageIds: [],
    });
    const cited = reviseDraftBlock(draft, draft.blocks[0].id, {
      ...draft.blocks[0],
      claims: [{ id: "claim-1", text: "Initial note", citationIds: ["source-user-notes"], status: "cited" }],
    });
    const approved = approveDraft(cited, "owner@example.com", new Set(["source-user-notes"]));
    const next = createDraft({
      topicId: approved.topicId,
      sourceIds: approved.sourceIds,
      scoreNodeId: approved.scoreNodeId,
      tags: approved.tags,
      rawNotes: "A later edit",
      imageIds: [],
    }, approved);

    expect(next.versionNumber).toBe(approved.versionNumber + 1);
    expect(approved.status).toBe("approved");
  });

  it("rejects invented citation IDs even when a claim says cited", () => {
    const block = {
      id: "summary",
      type: "summary" as const,
      text: "A factual assertion.",
      claims: [{ id: "claim", text: "A factual assertion.", citationIds: ["invented-source"], status: "cited" as const }],
    };

    expect(supportWarnings([block], new Set(["real-source"]))).toEqual(["Needs support: A factual assertion."]);
    expect(normalizeClaimSupport([block], new Set(["real-source"]))[0].claims[0]).toMatchObject({ citationIds: [], status: "needs_support" });
    expect(() => approveDraft({
      id: "topic-v1-draft",
      topicId: "topic",
      versionNumber: 1,
      status: "draft",
      blocks: [block],
      sourceIds: ["real-source"],
      scoreNodeId: "biliary",
      tags: [],
      warnings: [],
      createdAt: new Date().toISOString(),
    }, "owner@example.com", new Set(["real-source"]))).toThrow(/support/i);
  });

  it("requires an exact supported claim for every table row and flow node", () => {
    const table = {
      id: "table",
      type: "table" as const,
      columns: ["Feature", "Choice"],
      rows: [["Small stone", "Transcystic"], ["Large stone", "Alternative route"]],
      claims: [{ id: "claim", text: "The table describes stone choices.", citationIds: ["source"], status: "cited" as const }],
    };
    const flow = {
      id: "flow",
      type: "flow" as const,
      nodes: [{ id: "one", label: "Stone found" }, { id: "two", label: "Clear the duct" }],
      edges: [{ from: "one", to: "two" }],
      claims: [{ id: "one", text: "Stone found", citationIds: ["source"], status: "cited" as const }],
    };

    expect(supportWarnings([table, flow], new Set(["source"]))).toEqual([
      "Needs support: Small stone — Transcystic",
      "Needs support: Large stone — Alternative route",
      "Needs support: Clear the duct",
    ]);
  });

  it("rejects extraneous claims hidden in non-factual blocks", () => {
    const references = {
      id: "references",
      type: "references" as const,
      sourceIds: ["source"],
      claims: [{ id: "hidden", text: "A hidden assertion.", citationIds: ["source"], status: "cited" as const }],
    };
    expect(supportWarnings([references], new Set(["source"]))).toEqual(["Needs support: A hidden assertion."]);
  });

  it("strips a references block's sourceIds that fall outside the version's valid source IDs", () => {
    const references = {
      id: "references",
      type: "references" as const,
      sourceIds: ["real-source", "forged-source"],
      claims: [],
    };
    expect(normalizeClaimSupport([references], new Set(["real-source"]))[0]).toMatchObject({ sourceIds: ["real-source"] });
  });

  it("blanks claim support and strips invalid reference sourceIds together", () => {
    const summary = { id: "s", type: "summary" as const, text: "Fact.", claims: [{ id: "c", text: "Fact.", citationIds: ["real-source"], status: "cited" as const }] };
    const references = { id: "r", type: "references" as const, sourceIds: ["real-source", "forged-source"], claims: [] };
    const result = requireOwnerAttestation([summary, references], new Set(["real-source"]));
    expect(result[0].claims[0]).toMatchObject({ citationIds: [], status: "needs_support" });
    expect(result[1]).toMatchObject({ sourceIds: ["real-source"] });
  });

  it("requires support for rendered image alt text and captions", () => {
    const image = { id: "image", type: "image" as const, mediaId: "media", alt: "Operative anatomy.", caption: "The duct lies medially.", claims: [] };
    expect(supportWarnings([image], new Set(["source"]))).toEqual(["Needs support: Operative anatomy.", "Needs support: The duct lies medially."]);
  });

  it("allocates a restore after the highest existing version", () => {
    const restored = restoreVersion(choledocholithiasisTopic.approvedVersion!, 4);
    expect(restored.versionNumber).toBe(5);
    expect(restored.id).toContain("v5-draft");
  });
});
