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
