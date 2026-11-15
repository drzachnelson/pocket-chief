import { buildPlaybook, references, sourced } from "@/content/authoring";
import { OPEN_THYROID_LOBECTOMY_PLAYBOOK_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// STUB: the batch agent replaces this file.
const blocks: TopicBlock[] = [
  sourced({ id: "block-otl-summary", type: "summary", heading: "At a glance", text: "Placeholder pending authoring." }, SOURCE),
  references("block-otl-references", [SOURCE]),
];

export const openThyroidLobectomyPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000025",
  slug: "open-thyroid-lobectomy",
  title: "Open Thyroid Lobectomy",
  aliases: [],
  procedureId: "thyroid_lobectomy",
  approach: "open",
  specialty: "Endocrine",
  tags: ["endocrine"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
