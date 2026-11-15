import { buildTopic, references, sourced } from "@/content/authoring";
import { THYROID_NODULE_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// STUB: the batch agent replaces this file.
const blocks: TopicBlock[] = [
  sourced({ id: "block-tn-summary", type: "summary", heading: "At a glance", text: "Placeholder pending authoring." }, PACKET),
  references("block-tn-references", [PACKET]),
];

export const thyroidNoduleTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000009020",
  versionId: "00000000-0000-4000-8000-000000009021",
  slug: "thyroid-nodule",
  title: "Thyroid Nodule",
  aliases: [],
  scoreNodeId: "endocrine-conditions",
  scoreCategory: "SCORE · Endocrine · Diseases & Conditions",
  tags: ["endocrine"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
