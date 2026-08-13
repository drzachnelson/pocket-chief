import { describe, expect, it } from "vitest";
import { approveDraft, createDraft, reviseDraftBlock } from "@/lib/editorial";
import { choledocholithiasisTopic } from "@/lib/seed";

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
    const approved = approveDraft(cited, "owner@example.com");
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
});
