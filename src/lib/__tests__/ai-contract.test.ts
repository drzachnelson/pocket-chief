import { describe, expect, it } from "vitest";
import { parseTopicDraftOutput, topicDraftJsonSchema } from "@/lib/ai";

describe("AI structured output contract", () => {
  it("publishes the complete discriminated block union", () => {
    const items = topicDraftJsonSchema.properties.blocks.items as unknown as { anyOf?: readonly unknown[] };
    expect(items.anyOf).toHaveLength(9);
    expect(JSON.stringify(topicDraftJsonSchema)).toContain('"additionalProperties":false');
    expect(JSON.stringify(topicDraftJsonSchema)).toContain('"citationIds"');
  });

  it("accepts a complete topic payload", () => {
    const parsed = parseTopicDraftOutput({
      blocks: [{ id: "summary", type: "summary", heading: "At a glance", text: "Owner supplied fact.", claims: [{ id: "claim", text: "Owner supplied fact.", citationIds: ["source-1"], status: "cited" }] }],
      warnings: [],
    });
    expect(parsed.blocks[0].type).toBe("summary");
  });

  it("rejects arbitrary block shapes", () => {
    expect(() => parseTopicDraftOutput({ blocks: [{ type: "summary", invented: true }], warnings: [] })).toThrow();
  });
});
