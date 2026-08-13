import type { TopicBlock, TopicDraftInput, TopicVersion } from "@/lib/types";

const clone = <T,>(value: T): T => structuredClone(value);

export function supportWarnings(blocks: TopicBlock[], validSourceIds?: ReadonlySet<string>): string[] {
  const warnings: string[] = [];
  for (const block of blocks) {
    if (block.type !== "references" && block.type !== "image" && block.claims.length === 0) {
      warnings.push(`Needs support: ${block.heading ?? "Untitled factual block"}`);
    }
    if (block.type === "bullets" && block.claims.length < block.items.length) {
      warnings.push(`Needs support: ${block.heading ?? "Bullet list"} has uncited items.`);
    }
    for (const claim of block.claims) {
      const citationsAreValid = claim.citationIds.length > 0
        && (!validSourceIds || claim.citationIds.every((id) => validSourceIds.has(id)));
      if (claim.status !== "cited" || !citationsAreValid) warnings.push(`Needs support: ${claim.text}`);
    }
  }
  return [...new Set(warnings)];
}

export function normalizeClaimSupport(blocks: TopicBlock[], validSourceIds: ReadonlySet<string>): TopicBlock[] {
  return blocks.map((block) => ({
    ...clone(block),
    claims: block.claims.map((claim) => {
      const citationIds = [...new Set(claim.citationIds.filter((id) => validSourceIds.has(id)))];
      return { ...clone(claim), citationIds, status: claim.status === "cited" && citationIds.length > 0 ? "cited" as const : "needs_support" as const };
    }),
  })) as TopicBlock[];
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

export function approveDraft(draft: TopicVersion, ownerEmail: string, validSourceIds = new Set(draft.sourceIds)): TopicVersion {
  if (draft.status !== "draft") throw new Error("Only drafts can be approved.");
  const warnings = supportWarnings(draft.blocks, validSourceIds);
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

export function restoreVersion(version: TopicVersion, highestVersionNumber = version.versionNumber): TopicVersion {
  const versionNumber = highestVersionNumber + 1;
  return {
    ...clone(version),
    id: `${version.topicId}-v${versionNumber}-draft`,
    versionNumber,
    status: "draft",
    reviewedAt: undefined,
    reviewedBy: undefined,
    createdAt: new Date().toISOString(),
    basedOnVersion: version.versionNumber,
  };
}
