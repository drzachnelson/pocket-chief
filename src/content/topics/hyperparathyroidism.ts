import { buildTopic, references, sourced } from "@/content/authoring";
import { HYPERPARATHYROIDISM_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// STUB: the batch agent replaces this file.
const blocks: TopicBlock[] = [
  sourced({ id: "block-hp-summary", type: "summary", heading: "At a glance", text: "Placeholder pending authoring." }, PACKET),
  references("block-hp-references", [PACKET]),
];

export const hyperparathyroidismTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000008620",
  versionId: "00000000-0000-4000-8000-000000008621",
  slug: "hyperparathyroidism",
  title: "Hyperparathyroidism",
  aliases: [],
  scoreNodeId: "endocrine-conditions",
  scoreCategory: "SCORE · Endocrine · Diseases & Conditions",
  tags: ["endocrine"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
