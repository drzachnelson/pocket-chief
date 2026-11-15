import { buildPlaybook, references, sourced } from "@/content/authoring";
import { PARATHYROIDECTOMY_PLAYBOOK_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// STUB: the batch agent replaces this file.
const blocks: TopicBlock[] = [
  sourced({ id: "block-pt-summary", type: "summary", heading: "At a glance", text: "Placeholder pending authoring." }, SOURCE),
  references("block-pt-references", [SOURCE]),
];

export const parathyroidectomyPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000026",
  slug: "parathyroidectomy",
  title: "Parathyroidectomy",
  aliases: [],
  procedureId: "parathyroidectomy",
  approach: "open",
  specialty: "Endocrine",
  tags: ["endocrine"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
