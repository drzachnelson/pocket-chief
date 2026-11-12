import { cache } from "react";
import { groupSections, headingLevel } from "@/lib/inline";
import { getPlaybookBySlug, getTopicBySlug, listPlaybookSummaries, listTaxonomy, listTopics } from "@/lib/library";
import { specialtyId } from "@/lib/library-items";
import { buildTopicNavigation } from "@/lib/topic-navigation";
import type { TopicBlock } from "@/lib/types";

// Build-time projection for the Contents component, shared by both reader corpora. Titles, headings and ids only: no block text reaches the client through it.

export interface ContentsLink { slug: string; label: string }
export interface ContentsGroup { id: string; label: string; links: ContentsLink[] }
/** A category (topics) or a specialty (playbooks). Only categories have groups. */
export interface ContentsBranch extends ContentsGroup { groups: ContentsGroup[] }
export interface ContentsSection { id: string; label: string; level: 2 | 3 }
export interface ContentsData { corpus: "topics" | "playbooks"; sections: ContentsSection[]; branches: ContentsBranch[] }

const sectionsOf = (blocks: TopicBlock[]): ContentsSection[] => groupSections(blocks).map(({ block }) => block).filter((block) => block.heading && block.type !== "references").map((block) => { const { level, text } = headingLevel(block.heading!); return { id: block.id, label: text, level }; });

const topicBranches = cache((): ContentsBranch[] => buildTopicNavigation(listTaxonomy(), listTopics()).map((category) => ({
  id: category.id, label: category.label, links: category.topics.map(({ slug, label }) => ({ slug, label })),
  groups: category.children.map((child) => ({ id: child.id, label: child.label, links: child.topics.map(({ slug, label }) => ({ slug, label })) })),
})));

/** One branch per specialty, alphabetical, playbooks alphabetical inside it: the order the Playbooks index uses. */
const playbookBranches = cache((): ContentsBranch[] => {
  const bySpecialty = new Map<string, ContentsLink[]>();
  for (const { slug, title, specialty } of [...listPlaybookSummaries()].sort((a, b) => a.title.localeCompare(b.title))) bySpecialty.set(specialty, [...(bySpecialty.get(specialty) ?? []), { slug, label: title }]);
  return [...bySpecialty].sort(([a], [b]) => a.localeCompare(b)).map(([specialty, links]) => ({ id: specialtyId(specialty), label: specialty, links, groups: [] }));
});

export function topicContents(slug: string): ContentsData | null {
  const topic = getTopicBySlug(slug);
  return topic?.approvedVersion ? { corpus: "topics", sections: sectionsOf(topic.approvedVersion.blocks), branches: topicBranches() } : null;
}

export function playbookContents(slug: string): ContentsData | null {
  const playbook = getPlaybookBySlug(slug);
  return playbook ? { corpus: "playbooks", sections: sectionsOf(playbook.blocks), branches: playbookBranches() } : null;
}

export const topicSlugs = () => listTopics().map(({ slug }) => ({ slug }));
export const playbookSlugs = () => listPlaybookSummaries().map(({ slug }) => ({ slug }));
