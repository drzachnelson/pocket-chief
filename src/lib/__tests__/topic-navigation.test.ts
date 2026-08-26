import { describe, expect, it } from "vitest";
import { buildTopicNavigation, flattenTopicNavigation, nextTopicInCategory } from "@/lib/topic-navigation";
import type { TaxonomyNode, Topic } from "@/lib/types";

function topic(id: string, title: string, scoreNodeId: string, headings: string[] = [], aliases: string[] = [], tags: string[] = []): Topic {
  return {
    id,
    slug: id,
    title,
    aliases,
    scoreCategory: "",
    scoreNodeId,
    tags,
    updatedAt: "2026-08-19T00:00:00.000Z",
    approvedVersion: {
      id: `${id}-v1`,
      topicId: id,
      versionNumber: 1,
      status: "approved",
      blocks: headings.map((heading, index) => ({ id: `${id}-${index}`, type: "summary" as const, heading, text: "not included in navigation", claims: [] })),
      sourceIds: [],
      scoreNodeId,
      tags,
      warnings: [],
      createdAt: "2026-08-19T00:00:00.000Z",
    },
    versions: [],
  };
}

describe("buildTopicNavigation", () => {
  it("orders taxonomy nodes and topic labels while retaining only approved metadata and heading anchors", () => {
    const taxonomy: TaxonomyNode[] = [
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "later", title: "Later category", slug: "later", parentId: "score", order: 2 },
      { id: "first", title: "First category", slug: "first", parentId: "score", order: 1 },
      { id: "procedures", title: "Procedures", slug: "procedures", parentId: "first", order: 3 },
      { id: "empty", title: "Empty branch", slug: "empty", parentId: "first", order: 2 },
    ];
    const draft = { ...topic("draft", "Draft", "procedures"), approvedVersion: null };

    expect(buildTopicNavigation(taxonomy, [
      topic("zebra", "Zebra", "procedures", ["Overview", "↳ Approach"]),
      topic("aorta", "Aorta", "procedures"),
      topic("later-topic", "Later topic", "later"),
      draft,
    ])).toEqual([
      {
        id: "first",
        slug: "first",
        label: "First category",
        parentId: "score",
        topics: [],
        children: [
          {
            id: "procedures",
            slug: "procedures",
            label: "Procedures",
            parentId: "first",
            topics: [
              { id: "aorta", slug: "aorta", label: "Aorta", updatedAt: "2026-08-19T00:00:00.000Z", taxonomyNodeId: "procedures", searchTerms: [], sections: [] },
              {
                id: "zebra",
                slug: "zebra",
                label: "Zebra",
                updatedAt: "2026-08-19T00:00:00.000Z",
                taxonomyNodeId: "procedures",
                searchTerms: [],
                sections: [
                  { id: "zebra-0", label: "Overview", level: 2 },
                  { id: "zebra-1", label: "Approach", level: 3 },
                ],
              },
            ],
            children: [],
          },
        ],
      },
      {
        id: "later",
        slug: "later",
        label: "Later category",
        parentId: "score",
        topics: [
          { id: "later-topic", slug: "later-topic", label: "Later topic", updatedAt: "2026-08-19T00:00:00.000Z", taxonomyNodeId: "later", searchTerms: [], sections: [] },
        ],
        children: [],
      },
    ]);
  });

  it("projects compact, de-duplicated aliases and tags for client search", () => {
    const taxonomy: TaxonomyNode[] = [
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "category", title: "Category", slug: "category", parentId: "score", order: 1 },
    ];

    const category = buildTopicNavigation(taxonomy, [topic("one", "One", "category", [], ["Alias", "alias"], ["trauma", " Trauma "])])[0]!;
    expect(category.topics[0].searchTerms).toEqual(["Alias", "trauma"]);
  });

  it("flattens direct topics before ordered child sections and bounds next-topic lookup to a category", () => {
    const navigation = buildTopicNavigation([
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "first", title: "First", slug: "first", parentId: "score", order: 1 },
      { id: "first-section", title: "First section", slug: "first-section", parentId: "first", order: 1 },
      { id: "second", title: "Second", slug: "second", parentId: "score", order: 2 },
    ], [
      topic("child", "Child", "first-section"),
      topic("direct", "Direct", "first"),
      topic("other", "Other", "second"),
    ]);

    expect(flattenTopicNavigation(navigation).map(({ topic: item }) => item.slug)).toEqual(["direct", "child", "other"]);
    expect(nextTopicInCategory(navigation, "direct")).toEqual({ topic: expect.objectContaining({ slug: "child" }), categoryLabel: "First" });
    expect(nextTopicInCategory(navigation, "child")).toBeUndefined();
    expect(nextTopicInCategory(navigation, "missing")).toBeUndefined();
  });
});
