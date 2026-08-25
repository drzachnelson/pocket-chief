import { describe, expect, it } from "vitest";
import { taxonomy } from "@/content/taxonomy";
import { demoTopics } from "@/lib/seed";
import { taxonomyDescendantIds, taxonomyParentIsValid, taxonomySections } from "@/lib/taxonomy";
import type { TaxonomyNode, Topic } from "@/lib/types";

const nodes = [
  { id: "root", title: "Root", slug: "root", order: 0 },
  { id: "child", title: "Child", slug: "child", parentId: "root", order: 1 },
  { id: "grandchild", title: "Grandchild", slug: "grandchild", parentId: "child", order: 2 },
];

describe("taxonomy integrity", () => {
  it("finds descendants and rejects cyclic parents", () => {
    expect([...taxonomyDescendantIds("root", nodes)]).toEqual(["child", "grandchild"]);
    expect(taxonomyParentIsValid("root", "grandchild", nodes)).toBe(false);
    expect(taxonomyParentIsValid("child", "root", nodes)).toBe(true);
  });
});

const approved = demoTopics.filter((entry) => entry.approvedVersion);

function topic(id: string, title: string, scoreNodeId: string): Topic {
  return { id, slug: id, title, aliases: [], scoreNodeId, scoreCategory: "", tags: [], approvedVersion: null, versions: [], updatedAt: "2026-01-01T00:00:00.000Z" };
}

describe("taxonomySections", () => {
  it("returns every top-level category in taxonomy order", () => {
    const sections = taxonomySections(taxonomy, approved);
    expect(sections.map((section) => section.node.id)).toEqual(["alimentary", "breast", "general-abdomen", "hernia", "arterial-disease", "critical-care", "esophagus", "pediatric", "trauma", "small-intestine", "large-intestine", "vascular-access"]);
  });

  it("counts every topic beneath a category, not just its direct children", () => {
    const sections = taxonomySections(taxonomy, approved);
    const hernia = sections.find((section) => section.node.id === "hernia")!;
    expect(hernia.topics).toEqual([]);
    expect(hernia.subsections.map((subsection) => subsection.node.id)).toEqual(["hernia-conditions", "hernia-procedures"]);
    expect(hernia.topicCount).toBe(hernia.subsections.reduce((total, subsection) => total + subsection.topics.length, 0));
    expect(hernia.topicCount).toBeGreaterThan(hernia.subsections[0]!.topics.length);
  });

  it("accounts for the whole approved library exactly once", () => {
    const sections = taxonomySections(taxonomy, approved);
    const listed = sections.flatMap((section) => [...section.topics, ...section.subsections.flatMap((subsection) => subsection.topics)]);
    expect(sections.reduce((total, section) => total + section.topicCount, 0)).toBe(approved.length);
    expect(new Set(listed.map((entry) => entry.id)).size).toBe(approved.length);
  });

  it("keeps a category with no approved topics, with a zero count and no subsections", () => {
    const nodes: TaxonomyNode[] = [
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "empty", title: "Empty", slug: "empty", parentId: "score", order: 1 },
      { id: "empty-child", title: "Child", slug: "empty-child", parentId: "empty", order: 2 },
    ];
    const [section] = taxonomySections(nodes, []);
    expect(section!.topicCount).toBe(0);
    expect(section!.subsections).toEqual([]);
  });

  it("rolls grandchild topics up into their subsection", () => {
    const nodes: TaxonomyNode[] = [
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "cat", title: "Cat", slug: "cat", parentId: "score", order: 1 },
      { id: "sub", title: "Sub", slug: "sub", parentId: "cat", order: 2 },
      { id: "leaf", title: "Leaf", slug: "leaf", parentId: "sub", order: 3 },
    ];
    const [section] = taxonomySections(nodes, [topic("deep", "Deep", "leaf")]);
    expect(section!.topicCount).toBe(1);
    expect(section!.subsections[0]!.topics.map((entry) => entry.id)).toEqual(["deep"]);
  });

  it("sorts topics alphabetically inside a subsection", () => {
    const nodes: TaxonomyNode[] = [
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "cat", title: "Cat", slug: "cat", parentId: "score", order: 1 },
      { id: "sub", title: "Sub", slug: "sub", parentId: "cat", order: 2 },
    ];
    const [section] = taxonomySections(nodes, [topic("z", "Zebra", "sub"), topic("a", "Aorta", "sub")]);
    expect(section!.subsections[0]!.topics.map((entry) => entry.title)).toEqual(["Aorta", "Zebra"]);
  });

  // The store the owner actually browses keys nodes by uuid and carries the authored ids
  // nowhere — `syncTaxonomy` reconciles the two sides by slug. A root matched by id left
  // /topics empty in Supabase mode while all of the above still passed, so this mirrors
  // that remapping and asserts the same categories come back.
  it("finds the same categories when the store keys nodes by uuid", () => {
    const storeId = new Map(taxonomy.map((node, index) => [node.id, `f47ac10b-58cc-4372-a567-${String(index).padStart(12, "0")}`]));
    const stored: TaxonomyNode[] = taxonomy.map((node) => ({ ...node, id: storeId.get(node.id)!, parentId: node.parentId ? storeId.get(node.parentId) : undefined }));
    const storedTopics = approved.map((entry) => ({ ...entry, scoreNodeId: storeId.get(entry.scoreNodeId)! }));
    const sections = taxonomySections(stored, storedTopics);
    expect(sections.map((section) => section.node.slug)).toEqual(taxonomySections(taxonomy, approved).map((section) => section.node.slug));
    expect(sections.reduce((total, section) => total + section.topicCount, 0)).toBe(approved.length);
  });

  it("keeps a top-level category the owner added with no parent", () => {
    const nodes: TaxonomyNode[] = [
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "cat", title: "Cat", slug: "cat", parentId: "score", order: 1 },
      { id: "owned", title: "Owner Category", slug: "owner-category", order: 2 },
    ];
    const sections = taxonomySections(nodes, [topic("t", "Topic", "owned")]);
    expect(sections.map((section) => section.node.id)).toEqual(["cat", "owned"]);
    expect(sections[1]!.topicCount).toBe(1);
  });
});
