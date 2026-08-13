import type { TopicBlock, TopicDraftInput, TopicVersion } from "@/lib/types";

const clone = <T,>(value: T): T => structuredClone(value);

export function supportWarnings(blocks: TopicBlock[]): string[] {
  return blocks.flatMap((block) => block.claims)
    .filter((claim) => claim.status !== "cited" || claim.citationIds.length === 0)
    .map((claim) => `Needs support: ${claim.text}`);
}

export function createDraft(input: TopicDraftInput, basedOn?: TopicVersion): TopicVersion {
  const versionNumber = (basedOn?.versionNumber ?? 0) + 1;
  const block: TopicBlock = {
    id: `draft-summary-${versionNumber}`,
    type: "summary",
    heading: "Draft summary",
    text: input.rawNotes,
    claims: [{
      id: `draft-claim-${versionNumber}`,
      text: input.rawNotes,
      citationIds: [],
      status: "needs_support",
    }],
  };
  return {
    id: `${input.topicId}-v${versionNumber}-draft`,
    topicId: input.topicId,
    versionNumber,
    status: "draft",
    blocks: [block],
    sourceIds: [...input.sourceIds],
    scoreNodeId: input.scoreNodeId,
    tags: [...input.tags],
    warnings: supportWarnings([block]),
    createdAt: new Date().toISOString(),
    basedOnVersion: basedOn?.versionNumber,
  };
}

export function reviseDraftBlock(draft: TopicVersion, blockId: string, replacement: TopicBlock): TopicVersion {
  if (draft.status !== "draft") throw new Error("Approved versions are immutable.");
  if (!draft.blocks.some((block) => block.id === blockId)) throw new Error("Block not found.");
  const blocks = draft.blocks.map((block) => block.id === blockId ? clone(replacement) : clone(block));
  return { ...clone(draft), blocks, warnings: supportWarnings(blocks) };
}

export function approveDraft(draft: TopicVersion, ownerEmail: string): TopicVersion {
  if (draft.status !== "draft") throw new Error("Only drafts can be approved.");
  const warnings = supportWarnings(draft.blocks);
  if (warnings.length > 0) throw new Error("Approval blocked: every factual claim must have source support.");
  return {
    ...clone(draft),
    id: draft.id.replace(/-draft$/, "-approved"),
    status: "approved",
    warnings: [],
    reviewedAt: new Date().toISOString(),
    reviewedBy: ownerEmail,
  };
}

export function restoreVersion(version: TopicVersion): TopicVersion {
  return {
    ...clone(version),
    id: `${version.topicId}-v${version.versionNumber + 1}-draft`,
    versionNumber: version.versionNumber + 1,
    status: "draft",
    reviewedAt: undefined,
    reviewedBy: undefined,
    createdAt: new Date().toISOString(),
    basedOnVersion: version.versionNumber,
  };
}
