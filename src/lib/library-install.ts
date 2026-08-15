import { demoTopics, suppliedSources, taxonomy } from "@/content";
import type { ContentRepository } from "@/lib/repository";
import type { TopicVersion } from "@/lib/types";

/**
 * Installs the authored library in `src/content/` into whatever store the
 * repository is backed by.
 *
 * The Supabase path only ever installs the one sha256-pinned launch topic
 * through `ensure_launch_topic`; every other topic lives in `src/content/` and
 * was previously reachable only through the demo repository. This walks the
 * same public interface a hand-authored topic goes through — `createTopicDraft`
 * then `approveDraft` — so RLS, `topic_block_expected_claims`, and the
 * claim-support invariant apply exactly as they do to owner-authored content.
 *
 * Idempotent: a topic whose slug already carries an approved version is left
 * alone, so re-running only fills gaps.
 */

export type TopicInstallStatus = "installed" | "present" | "failed";

export interface TopicInstallOutcome { slug: string; title: string; status: TopicInstallStatus; error?: string }

export interface LibraryInstallReport { taxonomyNodes: number; installed: number; present: number; failed: number; topics: TopicInstallOutcome[] }

/**
 * Reconciles the authored taxonomy against the store and returns a map from
 * authored node id to the id the store actually uses.
 *
 * Authored nodes are keyed by readable strings (`"biliary"`), but
 * `taxonomy_nodes.id` is a uuid and `ensure_default_taxonomy` already seeded
 * three nodes under server-assigned uuids. Slug is the stable key on both
 * sides — the same key `ensure_launch_topic` resolves `biliary-tract` by — so
 * existing rows are matched by slug and only genuinely new nodes get a fresh id.
 */
async function syncTaxonomy(repository: ContentRepository): Promise<Map<string, string>> {
  const idBySlug = new Map((await repository.listTaxonomy()).map((node) => [node.slug, node.id]));
  const storeIds = new Map<string, string>();
  for (const node of taxonomy) {
    if (node.parentId && !storeIds.has(node.parentId)) throw new Error(`Taxonomy node "${node.id}" is declared before its parent "${node.parentId}".`);
    const saved = await repository.saveTaxonomyNode({
      id: idBySlug.get(node.slug) ?? crypto.randomUUID(),
      title: node.title,
      slug: node.slug,
      parentId: node.parentId ? storeIds.get(node.parentId) : undefined,
      order: node.order,
    });
    storeIds.set(node.id, saved.id);
  }
  return storeIds;
}

export async function installLibrary(repository: ContentRepository, ownerEmail: string): Promise<LibraryInstallReport> {
  const storeIds = await syncTaxonomy(repository);
  const sourcesById = new Map(suppliedSources.map((source) => [source.id, source]));
  const topics: TopicInstallOutcome[] = [];

  for (const topic of demoTopics) {
    try {
      const existing = await repository.getTopicBySlug(topic.slug);
      if (existing?.approvedVersion) { topics.push({ slug: topic.slug, title: topic.title, status: "present" }); continue; }

      const approved = topic.approvedVersion;
      if (!approved) throw new Error("Authored topic carries no approved version.");
      const scoreNodeId = storeIds.get(topic.scoreNodeId);
      if (!scoreNodeId) throw new Error(`No taxonomy node matches "${topic.scoreNodeId}".`);
      const sources = approved.sourceIds.map((id) => {
        const source = sourcesById.get(id);
        if (!source) throw new Error(`Cites source ${id}, which is not in suppliedSources.`);
        return source;
      });

      // A fresh version id per attempt: create_topic_draft inserts topic_versions
      // without an on-conflict clause, so reusing the authored id would collide
      // on retry after a partial failure.
      const draft: TopicVersion = { ...approved, id: crypto.randomUUID(), status: "draft", scoreNodeId, reviewedAt: undefined, reviewedBy: undefined };
      const created = await repository.createTopicDraft({
        topic: { id: topic.id, title: topic.title, slug: topic.slug, aliases: topic.aliases, scoreNodeId, scoreCategory: topic.scoreCategory, tags: topic.tags },
        sources,
        draft,
      });
      await repository.approveDraft(created.draft.id, ownerEmail);
      topics.push({ slug: topic.slug, title: topic.title, status: "installed" });
    } catch (error) {
      topics.push({ slug: topic.slug, title: topic.title, status: "failed", error: error instanceof Error ? error.message : String(error) });
    }
  }

  const count = (status: TopicInstallStatus) => topics.filter((topic) => topic.status === status).length;
  return { taxonomyNodes: storeIds.size, installed: count("installed"), present: count("present"), failed: count("failed"), topics };
}
