import { buildTopic, references, sourced } from "@/content/authoring";
import { THYROID_CANCER_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// STUB: the batch agent replaces this file.
const blocks: TopicBlock[] = [
  sourced({ id: "block-tc-summary", type: "summary", heading: "At a glance", text: "Placeholder pending authoring." }, PACKET),
  references("block-tc-references", [PACKET]),
];

export const thyroidCancerTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000008920",
  versionId: "00000000-0000-4000-8000-000000008921",
  slug: "thyroid-cancer",
  title: "Thyroid Cancer",
  aliases: [],
  scoreNodeId: "endocrine-conditions",
  scoreCategory: "SCORE · Endocrine · Diseases & Conditions",
  tags: ["endocrine"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
