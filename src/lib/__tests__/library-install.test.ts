import { describe, expect, it } from "vitest";
import { installLibrary } from "@/lib/library-install";
import type { ContentRepository, TopicDraftRecord } from "@/lib/repository";
import { demoTopics, taxonomy } from "@/lib/seed";
import type { TaxonomyNode, Topic, TopicVersion } from "@/lib/types";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * A store with the parts `installLibrary` touches. Seeded the way a fresh
 * Supabase project is: `ensure_default_taxonomy` has already created the first
 * three nodes under server-assigned uuids, and `ensure_launch_topic` has already
 * installed choledocholithiasis.
 */
function fakeRepository(options: { approveFails?: (slug: string) => boolean } = {}) {
  const nodes = new Map<string, TaxonomyNode>();
  for (const slug of ["score", "alimentary-tract", "biliary-tract"]) {
    const source = taxonomy.find((node) => node.slug === slug)!;
    nodes.set(slug, { ...source, id: crypto.randomUUID(), parentId: undefined });
  }
  const topics = new Map<string, Topic>();
  const drafts = new Map<string, TopicVersion & { slug: string }>();
  const approved: string[] = [];

  const repository = {
    listTaxonomy: async () => [...nodes.values()],
    saveTaxonomyNode: async (node: TaxonomyNode) => { nodes.set(node.slug, node); return node; },
    getTopicBySlug: async (slug: string) => topics.get(slug) ?? null,
    createTopicDraft: async (record: TopicDraftRecord) => {
      const topic = { ...record.topic, approvedVersion: null, versions: [], updatedAt: record.draft.createdAt } as Topic;
      topics.set(record.topic.slug, topic);
      drafts.set(record.draft.id, { ...record.draft, slug: record.topic.slug });
      return { topic, draft: record.draft };
    },
    approveDraft: async (id: string) => {
      const draft = drafts.get(id)!;
      if (options.approveFails?.(draft.slug)) throw new Error("Every factual claim must be supported before approval");
      const version = { ...draft, status: "approved" as const };
      topics.set(draft.slug, { ...topics.get(draft.slug)!, approvedVersion: version });
      approved.push(draft.slug);
      return version;
    },
  } as unknown as ContentRepository;

  const launch = demoTopics.find((topic) => topic.slug === "choledocholithiasis")!;
  topics.set(launch.slug, { ...launch, scoreNodeId: nodes.get("biliary-tract")!.id });

  return { repository, nodes, topics, approved };
}

describe("library install", () => {
  it("installs every authored topic the store is missing", async () => {
    const { repository, approved } = fakeRepository();
    const report = await installLibrary(repository, "owner@example.com");

    expect(report.failed).toBe(0);
    expect(report.present).toBe(1);
    expect(report.installed).toBe(demoTopics.length - 1);
    expect(approved).not.toContain("choledocholithiasis");
    expect(report.topics.find((topic) => topic.slug === "choledocholithiasis")?.status).toBe("present");
  });

  it("reuses the store's id for a slug it already has, and mints one for the rest", async () => {
    const { repository, nodes } = fakeRepository();
    const before = new Map([...nodes.values()].map((node) => [node.slug, node.id]));

    await installLibrary(repository, "owner@example.com");

    expect(nodes.size).toBe(taxonomy.length);
    for (const [slug, id] of before) expect(nodes.get(slug)!.id, slug).toBe(id);
    for (const node of nodes.values()) expect(node.id, node.slug).toMatch(UUID);
  });

  it("points every installed topic at a taxonomy id the store issued, not the authored string", async () => {
    const { repository, topics } = fakeRepository();
    await installLibrary(repository, "owner@example.com");

    const authored = new Set(taxonomy.map((node) => node.id));
    for (const topic of topics.values()) {
      expect(topic.scoreNodeId, topic.slug).toMatch(UUID);
      expect(authored.has(topic.scoreNodeId), topic.slug).toBe(false);
    }
  });

  it("reports a rejected topic without abandoning the rest", async () => {
    const { repository } = fakeRepository({ approveFails: (slug) => slug === "abdominal-pain" });
    const report = await installLibrary(repository, "owner@example.com");

    const failure = report.topics.find((topic) => topic.slug === "abdominal-pain");
    expect(failure?.status).toBe("failed");
    expect(failure?.error).toContain("supported before approval");
    expect(report.failed).toBe(1);
    expect(report.installed).toBe(demoTopics.length - 2);
  });

  it("is a no-op the second time", async () => {
    const { repository, approved } = fakeRepository();
    await installLibrary(repository, "owner@example.com");
    approved.length = 0;

    const report = await installLibrary(repository, "owner@example.com");

    expect(approved).toEqual([]);
    expect(report.installed).toBe(0);
    expect(report.present).toBe(demoTopics.length);
  });
});
