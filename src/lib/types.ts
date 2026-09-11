export type ClaimStatus = "cited" | "needs_support";

export interface Claim {
  id: string;
  text: string;
  citationIds: string[];
  status: ClaimStatus;
}

interface BaseBlock {
  id: string;
  heading?: string;
  claims: Claim[];
}

export interface SummaryBlock extends BaseBlock {
  type: "summary" | "prose" | "warning";
  text: string;
  tone?: "pearl" | "mnemonic" | "danger";
}

export interface BulletsBlock extends BaseBlock {
  type: "bullets";
  items: string[];
}

export interface ComparisonTableBlock extends BaseBlock {
  type: "table";
  columns: string[];
  rows: string[][];
}

export interface FlowBlock extends BaseBlock {
  type: "flow";
  nodes: Array<{ id: string; label: string; tone?: "default" | "good" | "caution" }>;
  edges: Array<{ from: string; to: string; label?: string }>;
}

export interface SequenceBlock extends BaseBlock {
  type: "sequence";
  steps: Array<{ title: string; detail: string }>;
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  mediaId: string;
  alt: string;
  caption?: string;
}

export interface ReferencesBlock extends BaseBlock {
  type: "references";
  sourceIds: string[];
}

export type TopicBlock =
  | SummaryBlock
  | BulletsBlock
  | ComparisonTableBlock
  | FlowBlock
  | SequenceBlock
  | ImageBlock
  | ReferencesBlock;

export interface SuppliedSource {
  id: string;
  title: string;
  kind: "user_notes" | "book" | "article" | "website" | "image";
  citation: string;
  suppliedAt: string;
  url?: string;
  details?: string;
}

export interface TaxonomyNode {
  id: string;
  title: string;
  slug: string;
  parentId?: string;
  order: number;
}

export interface TopicVersion {
  id: string;
  topicId: string;
  versionNumber: number;
  status: "draft" | "approved";
  blocks: TopicBlock[];
  sourceIds: string[];
  scoreNodeId: string;
  tags: string[];
  warnings: string[];
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  basedOnVersion?: number;
  topicTitle?: string;
  topicSlug?: string;
  aliases?: string[];
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  aliases: string[];
  scoreNodeId: string;
  scoreCategory: string;
  tags: string[];
  approvedVersion: TopicVersion | null;
  versions: TopicVersion[];
  updatedAt: string;
}

export interface TopicDraftInput {
  topicId: string;
  rawNotes: string;
  imageIds: string[];
  sourceIds: string[];
  scoreNodeId: string;
  tags: string[];
}

/** How the operation is done. A browse/filter facet; `procedureId` is the join key. */
export type PlaybookApproach = "open" | "laparoscopic" | "robotic" | "endovascular";

/**
 * An operative procedure guide. Reuses TopicBlock so it inherits the claim-support invariant,
 * the renderer and the search scorer, but it is deliberately NOT a Topic:
 *
 * - It is organized by procedure and specialty, never placed in the SCORE taxonomy, which is
 *   what keeps the single-root and ordered-sections assertions in the taxonomy tests honest.
 * - It ships approved-only, so there is no TopicVersion wrapper and no draft state. Git is the
 *   version history.
 */
export interface Playbook {
  id: string;
  slug: string;
  title: string;
  aliases: string[];
  /** Stable lowercase_underscore id, unique per playbook. Attending notes join on this. */
  procedureId: string;
  approach: PlaybookApproach;
  /** Service line, e.g. "Vascular". */
  specialty: string;
  tags: string[];
  blocks: TopicBlock[];
  /** Every source any block cites — the allow-list `supportWarnings` validates against. */
  sourceIds: string[];
  warnings: string[];
  /** Slugs in `libraryTopics`. Powers a related-reading strip; not load-bearing. */
  relatedTopicSlugs?: string[];
  reviewedAt: string;
  updatedAt: string;
}

