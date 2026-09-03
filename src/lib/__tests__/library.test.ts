import { describe, expect, it } from "vitest";
import { getTopicBySlug, listSources, listTaxonomy, listTopics, searchLibrary } from "@/lib/library";

describe("static library", () => {
  it("lists every approved authored topic", () => {
    const topics = listTopics();
    expect(topics.length).toBeGreaterThan(40);
    expect(topics.every((topic) => topic.approvedVersion)).toBe(true);
  });

  it("resolves a topic by slug and returns null for an unknown one", () => {
    expect(getTopicBySlug("choledocholithiasis")?.title).toBe("Choledocholithiasis");
    expect(getTopicBySlug("not-a-real-topic")).toBeNull();
  });

  it("searches the approved library typo-tolerantly", () => {
    expect(searchLibrary("choledochoithiasis").some((topic) => topic.slug === "choledocholithiasis")).toBe(true);
  });

  it("returns every supplied source, or just the requested ids", () => {
    const all = listSources();
    expect(all.length).toBeGreaterThan(0);
    expect(listSources([all[0].id])).toEqual([all[0]]);
  });

  it("exposes the SCORE taxonomy rooted at the curriculum node", () => {
    const nodes = listTaxonomy();
    expect(nodes.find((node) => node.id === "score")?.title).toBe("SCORE Curriculum");
    expect(nodes.filter((node) => !node.parentId)).toHaveLength(1);
  });
});
