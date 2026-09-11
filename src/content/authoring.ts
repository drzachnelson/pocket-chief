import { factualUnits } from "@/lib/editorial";
import type { Claim, Playbook, PlaybookApproach, Topic, TopicBlock, TopicVersion } from "@/lib/types";

/**
 * A block written by hand, minus the claim list that every factual unit needs.
 * Reference blocks carry no factual units, so they are authored directly.
 */
export type AuthoredBlock = Exclude<TopicBlock, { type: "references" }> extends infer Block
  ? Block extends TopicBlock ? Omit<Block, "claims"> : never
  : never;

/**
 * Derives one cited claim per rendered factual unit.
 *
 * `supportWarnings` approves a block only when `claims[i].text` matches
 * `factualUnits(block)[i]` exactly, so both sides are generated from the same
 * function here. Hand-written claim lists drift; these cannot.
 */
export function sourced(block: AuthoredBlock, sourceId: string): TopicBlock {
  const withoutClaims = { ...block, claims: [] as Claim[] } as TopicBlock;
  const claims = factualUnits(withoutClaims).map((text, index) => ({
    id: `${block.id}-claim-${index + 1}`,
    text,
    citationIds: [sourceId],
    status: "cited" as const,
  }));
  return { ...withoutClaims, claims } as TopicBlock;
}

/** Reference blocks list supplied sources and carry no factual claims of their own. */
export function references(id: string, sourceIds: string[], heading = "Supplied sources"): TopicBlock {
  return { id, type: "references", heading, sourceIds, claims: [] };
}

export interface TopicInput {
  id: string;
  versionId: string;
  slug: string;
  title: string;
  aliases: string[];
  scoreNodeId: string;
  scoreCategory: string;
  tags: string[];
  sourceId: string;
  /**
   * Further sources this topic's blocks cite. `sourced()` tags one source per
   * block, so a topic drawing on several works needs each of them listed on the
   * version or `supportWarnings` rejects the citations it does not recognize.
   */
  additionalSourceIds?: string[];
  blocks: TopicBlock[];
  reviewedAt: string;
}

/** Wraps authored blocks in the single approved version every seeded topic ships with. */
export function buildTopic(input: TopicInput): Topic {
  const approvedVersion: TopicVersion = {
    id: input.versionId,
    topicId: input.id,
    versionNumber: 1,
    status: "approved",
    blocks: input.blocks,
    sourceIds: [...new Set([input.sourceId, ...input.additionalSourceIds ?? []])],
    scoreNodeId: input.scoreNodeId,
    tags: input.tags,
    warnings: [],
    createdAt: input.reviewedAt,
    reviewedAt: input.reviewedAt,
    reviewedBy: "owner",
  };
  return {
    id: input.id,
    slug: input.slug,
    title: input.title,
    aliases: input.aliases,
    scoreNodeId: input.scoreNodeId,
    scoreCategory: input.scoreCategory,
    tags: input.tags,
    approvedVersion,
    versions: [approvedVersion],
    updatedAt: input.reviewedAt,
  };
}

/**
 * Derives claims the same way as `sourced()`, but cites each factual unit separately.
 *
 * Needed because an operative guide routinely mixes societies inside one block — an ACC/AHA
 * class recommendation next to a Cochrane review. Putting the whole source list on every claim
 * would pass `supportWarnings`, which only checks non-empty and allow-listed, while quietly
 * telling the reader both works support both statements. Prefer splitting a block so each has
 * one source; reach for this only when a table or list genuinely mixes them row by row.
 */
export function sourcedUnits(block: AuthoredBlock, citationIds: string[][]): TopicBlock {
  const withoutClaims = { ...block, claims: [] as Claim[] } as TopicBlock;
  const units = factualUnits(withoutClaims);
  if (units.length !== citationIds.length) {
    throw new Error(`${block.id}: ${units.length} factual units but ${citationIds.length} citation lists. They must line up one to one.`);
  }
  const claims = units.map((text, index) => {
    if (citationIds[index].length === 0) throw new Error(`${block.id}: no citation for "${text}".`);
    return { id: `${block.id}-claim-${index + 1}`, text, citationIds: citationIds[index], status: "cited" as const };
  });
  return { ...withoutClaims, claims } as TopicBlock;
}

export interface PlaybookInput {
  id: string;
  slug: string;
  title: string;
  aliases: string[];
  procedureId: string;
  approach: PlaybookApproach;
  specialty: string;
  tags: string[];
  /** The source every block cites unless it says otherwise. */
  sourceId: string;
  /** Further sources this playbook's blocks cite, or `supportWarnings` rejects them. */
  additionalSourceIds?: string[];
  relatedTopicSlugs?: string[];
  blocks: TopicBlock[];
  reviewedAt: string;
}

/** Flatter than `buildTopic`: playbooks ship approved-only, so there is no version to wrap. */
export function buildPlaybook(input: PlaybookInput): Playbook {
  const { additionalSourceIds, sourceId, ...rest } = input;
  return {
    ...rest,
    sourceIds: [...new Set([sourceId, ...additionalSourceIds ?? []])],
    warnings: [],
    updatedAt: input.reviewedAt,
  };
}

