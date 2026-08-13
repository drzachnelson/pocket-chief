import { factualUnits } from "@/lib/editorial";
import type { Claim, Topic, TopicBlock, TopicVersion } from "@/lib/types";

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
    sourceIds: [input.sourceId],
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
