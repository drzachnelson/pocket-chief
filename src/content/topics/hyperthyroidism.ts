import { buildTopic, references, sourced } from "@/content/authoring";
import { HYPERTHYROIDISM_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// STUB: the batch agent replaces this file.
const blocks: TopicBlock[] = [
  sourced({ id: "block-ht-summary", type: "summary", heading: "At a glance", text: "Placeholder pending authoring." }, PACKET),
  references("block-ht-references", [PACKET]),
];

export const hyperthyroidismTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000008720",
  versionId: "00000000-0000-4000-8000-000000008721",
  slug: "hyperthyroidism",
  title: "Hyperthyroidism",
  aliases: [],
  scoreNodeId: "endocrine-conditions",
  scoreCategory: "SCORE · Endocrine · Diseases & Conditions",
  tags: ["endocrine"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
