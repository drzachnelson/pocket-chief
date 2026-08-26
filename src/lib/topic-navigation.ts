import { headingLevel } from "@/lib/inline";
import { taxonomySections } from "@/lib/taxonomy";
import type { TaxonomyNode, Topic } from "@/lib/types";

export interface TopicNavigationSection {
  id: string;
  label: string;
  level: 2 | 3;
}

export interface TopicNavigationTopic {
  id: string;
  slug: string;
  label: string;
  updatedAt: string;
  taxonomyNodeId: string;
  /** Aliases and personal/curriculum tags used by the client-side topic index. */
  searchTerms?: string[];
  sections: TopicNavigationSection[];
}

export interface TopicNavigationCategory {
  id: string;
  slug: string;
  label: string;
  parentId?: string;
  topics: TopicNavigationTopic[];
  children: TopicNavigationCategory[];
}

export interface FlattenedTopicNavigationEntry {
  topic: TopicNavigationTopic;
  categoryLabel: string;
  subsectionLabel?: string;
  categoryId: string;
  subsectionId?: string;
}

function compactSearchTerms(values: Array<string | undefined>) {
  const seen = new Set<string>();
  return values
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value))
    .filter((value) => {
      const key = value.toLocaleLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function navigationTopic(topic: Topic): TopicNavigationTopic {
  const sections = topic.approvedVersion!.blocks
    .filter((block) => block.heading && block.type !== "references")
    .map((block) => {
      const { level, text } = headingLevel(block.heading!);
      return { id: block.id, label: text, level };
    });

  return {
    id: topic.id,
    slug: topic.slug,
    label: topic.title,
    updatedAt: topic.updatedAt,
    taxonomyNodeId: topic.scoreNodeId,
    searchTerms: compactSearchTerms([
      ...topic.aliases,
      ...topic.tags,
      ...(topic.approvedVersion?.tags ?? []),
    ]),
    sections,
  };
}

/**
 * Compact, RSC-safe navigation data for the Topics workspace. Topic blocks remain
 * on the server; only their heading anchors are exposed to the client tree.
 */
export function buildTopicNavigation(taxonomy: TaxonomyNode[], topics: Topic[]): TopicNavigationCategory[] {
  return taxonomySections(taxonomy, topics.filter((topic) => topic.approvedVersion))
    .filter((category) => category.topicCount > 0)
    .map((category) => ({
      id: category.node.id,
      slug: category.node.slug,
      label: category.node.title,
      ...(category.node.parentId ? { parentId: category.node.parentId } : {}),
      topics: category.topics.map(navigationTopic),
      children: category.subsections.map((section) => ({
        id: section.node.id,
        slug: section.node.slug,
        label: section.node.title,
        ...(section.node.parentId ? { parentId: section.node.parentId } : {}),
        topics: section.topics.map(navigationTopic),
        children: [],
      })),
    }));
}

/**
 * Return topics in canonical SCORE order, retaining their top-level context.
 * Direct category topics come before topics in each ordered subsection.
 */
export function flattenTopicNavigation(navigation: TopicNavigationCategory[]): FlattenedTopicNavigationEntry[] {
  return navigation.flatMap((category) => [
    ...category.topics.map((topic) => ({
      topic,
      categoryLabel: category.label,
      categoryId: category.id,
    })),
    ...category.children.flatMap((subsection) => subsection.topics.map((topic) => ({
      topic,
      categoryLabel: category.label,
      subsectionLabel: subsection.label,
      categoryId: category.id,
      subsectionId: subsection.id,
    }))),
  ]);
}

/** Alias for consumers that want to make the ordering guarantee explicit. */
export const flattenOrderedTopics = flattenTopicNavigation;

/**
 * Find the next topic in the current top-level category. Categories are bounded:
 * the last topic in a category has no next topic rather than wrapping or crossing
 * into the following curriculum category.
 */
export function nextTopicInCategory(
  navigation: TopicNavigationCategory[],
  currentSlug: string,
): { topic: TopicNavigationTopic; categoryLabel: string } | undefined {
  const ordered = flattenTopicNavigation(navigation);
  const currentIndex = ordered.findIndex(({ topic }) => topic.slug === currentSlug);
  if (currentIndex < 0) return undefined;
  const currentCategoryId = ordered[currentIndex].categoryId;
  const next = ordered[currentIndex + 1];
  if (!next || next.categoryId !== currentCategoryId) return undefined;
  return { topic: next.topic, categoryLabel: next.categoryLabel };
}
