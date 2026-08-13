import type { TopicBlock, TopicDraftInput, TopicVersion } from "@/lib/types";

const clone = <T,>(value: T): T => structuredClone(value);

export function factualUnits(block: TopicBlock): string[] {
  if (block.type === "summary" || block.type === "prose" || block.type === "warning") return [block.text];
  if (block.type === "bullets") return block.items;
  if (block.type === "table") return block.rows.map((row) => row.join(" — "));
  if (block.type === "sequence") return block.steps.map((step) => `${step.title}: ${step.detail}`);
  if (block.type === "flow") return [...block.nodes.map((node) => node.label), ...block.edges.flatMap((edge) => edge.label ? [edge.label] : [])];
  return [];
}

export function requireOwnerAttestation(blocks: TopicBlock[]): TopicBlock[] {
  return blocks.map((block) => ({
    ...clone(block),
    claims: block.claims.map((claim) => ({ ...clone(claim), citationIds: [], status: "needs_support" as const })),
  })) as TopicBlock[];
}

const comparable = (value: string) => value.trim().replace(/\s+/g, " ");

export function supportWarnings(blocks: TopicBlock[], validSourceIds?: ReadonlySet<string>): string[] {
  const warnings: string[] = [];
  for (const block of blocks) {
    const units = factualUnits(block);
    units.forEach((unit, index) => {
      const claim = block.claims[index];
      if (!claim || comparable(claim.text) !== comparable(unit)) {
        warnings.push(`Needs support: ${unit}`);
        return;
      }
      const citationsAreValid = claim.citationIds.length > 0
        && (!validSourceIds || claim.citationIds.every((id) => validSourceIds.has(id)));
      if (claim.status !== "cited" || !citationsAreValid) warnings.push(`Needs support: ${claim.text}`);
    });
    for (const claim of block.claims.slice(units.length)) warnings.push(`Needs support: ${claim.text}`);
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
