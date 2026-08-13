import type { SupabaseClient } from "@supabase/supabase-js";
import type { ContentRepository, MediaExport, TopicDraftRecord } from "@/lib/repository";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ClozeDraft, SuppliedSource, TaxonomyNode, Topic, TopicBlock, TopicVersion } from "@/lib/types";

interface TaxonomyRow { id: string; parent_id: string | null; title: string; slug: string; sort_order: number }
interface TopicRow { id: string; taxonomy_node_id: string | null; title: string; slug: string; aliases: string[]; personal_tags: string[]; current_approved_version_id: string | null; updated_at: string }
interface VersionRow { id: string; topic_id: string; version_number: number; status: "draft" | "approved"; content: TopicBlock[]; warnings: string[]; source_ids: string[]; based_on_version: number | null; reviewed_at: string | null; reviewed_by: string | null; created_at: string }
interface SourceRow { id: string; title: string; kind: SuppliedSource["kind"]; citation: string; url: string | null; details: string | null; supplied_at: string }
interface CardRow { id: string; topic_id: string | null; cloze_text: string; additional_context: string; source_block_ids: string[]; context_image_path: string | null; tags: string[]; duplicate_hash: string }
interface MediaRow { id: string; storage_path: string; mime_type: string }

function assertNoError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

function categoryFor(id: string | null, nodes: TaxonomyNode[]) {
  if (!id) return "SCORE · Unassigned";
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const path: string[] = [];
  let current = byId.get(id);
  while (current) {
    path.unshift(current.title);
    current = current.parentId ? byId.get(current.parentId) : undefined;
  }
  return path.join(" · ") || "SCORE · Unassigned";
}

function mapTaxonomy(row: TaxonomyRow): TaxonomyNode {
  return { id: row.id, parentId: row.parent_id ?? undefined, title: row.title, slug: row.slug, order: row.sort_order };
}

function mapSource(row: SourceRow): SuppliedSource {
  return { id: row.id, title: row.title, kind: row.kind, citation: row.citation, suppliedAt: row.supplied_at, url: row.url ?? undefined, details: row.details ?? undefined };
}

function mapVersion(row: VersionRow, scoreNodeId: string, tags: string[]): TopicVersion {
  return {
    id: row.id,
    topicId: row.topic_id,
    versionNumber: row.version_number,
    status: row.status,
    blocks: row.content,
    sourceIds: row.source_ids,
    scoreNodeId,
    tags,
    warnings: row.warnings,
    createdAt: row.created_at,
    reviewedAt: row.reviewed_at ?? undefined,
    reviewedBy: row.reviewed_by ?? undefined,
    basedOnVersion: row.based_on_version ?? undefined,
  };
}

export class SupabaseRepository implements ContentRepository {
  private constructor(private readonly client: SupabaseClient) {}

  static async create() { return new SupabaseRepository(await createSupabaseServerClient() as SupabaseClient); }

  private async loadLibrary() {
    const [taxonomyResult, topicResult, versionResult] = await Promise.all([
      this.client.from("taxonomy_nodes").select("id,parent_id,title,slug,sort_order").order("sort_order"),
      this.client.from("topics").select("id,taxonomy_node_id,title,slug,aliases,personal_tags,current_approved_version_id,updated_at").order("title"),
      this.client.from("topic_versions").select("id,topic_id,version_number,status,content,warnings,source_ids,based_on_version,reviewed_at,reviewed_by,created_at").order("version_number"),
    ]);
    assertNoError(taxonomyResult.error); assertNoError(topicResult.error); assertNoError(versionResult.error);
    const nodes = ((taxonomyResult.data ?? []) as unknown as TaxonomyRow[]).map(mapTaxonomy);
    const versions = (versionResult.data ?? []) as unknown as VersionRow[];
    const topics = ((topicResult.data ?? []) as unknown as TopicRow[]).map((row): Topic => {
      const topicVersions = versions.filter((version) => version.topic_id === row.id).map((version) => mapVersion(version, row.taxonomy_node_id ?? "unassigned", row.personal_tags));
      return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        aliases: row.aliases,
        scoreNodeId: row.taxonomy_node_id ?? "unassigned",
        scoreCategory: categoryFor(row.taxonomy_node_id, nodes),
        tags: row.personal_tags,
        approvedVersion: topicVersions.find((version) => version.id === row.current_approved_version_id && version.status === "approved") ?? null,
        versions: topicVersions,
        updatedAt: row.updated_at,
      };
    });
    return { nodes, topics };
  }

  async listTopics() { return (await this.loadLibrary()).topics; }

  async searchTopics(query: string) {
    if (!query.trim()) return this.listTopics().then((topics) => topics.filter((topic) => topic.approvedVersion));
    const { data, error } = await this.client.rpc("search_approved_topics", { query_text: query, result_limit: 50 });
    assertNoError(error);
    const rows = (data ?? []) as Array<{ topic_id: string }>;
    const order = new Map(rows.map((row, index) => [row.topic_id, index]));
    return (await this.listTopics()).filter((topic) => order.has(topic.id)).sort((a, b) => order.get(a.id)! - order.get(b.id)!);
  }

  async getTopicBySlug(slug: string) { return (await this.listTopics()).find((topic) => topic.slug === slug) ?? null; }
  async getTopicById(id: string) { return (await this.listTopics()).find((topic) => topic.id === id) ?? null; }

  async listTaxonomy() {
    const ensured = await this.client.rpc("ensure_default_taxonomy");
    assertNoError(ensured.error);
    return (await this.loadLibrary()).nodes;
  }

  async listSources(ids?: string[]) {
    let query = this.client.from("sources").select("id,title,kind,citation,url,details,supplied_at").order("supplied_at");
    if (ids?.length) query = query.in("id", ids);
    const { data, error } = await query;
    assertNoError(error);
    return ((data ?? []) as unknown as SourceRow[]).map(mapSource);
  }

  async createTopicDraft(record: TopicDraftRecord) {
    const { error } = await this.client.rpc("create_topic_draft", {
      p_topic_id: record.topic.id,
      p_title: record.topic.title,
      p_slug: record.topic.slug,
      p_aliases: record.topic.aliases,
      p_score_node_id: record.topic.scoreNodeId === "unassigned" ? null : record.topic.scoreNodeId,
      p_tags: record.topic.tags,
      p_sources: record.sources,
      p_version_id: record.draft.id,
      p_version_number: record.draft.versionNumber,
      p_content: record.draft.blocks,
      p_warnings: record.draft.warnings,
      p_based_on_version: record.draft.basedOnVersion ?? null,
    });
    assertNoError(error);
    const topic = await this.getTopicById(record.topic.id);
    const draft = await this.getDraft(record.draft.id);
    if (!topic || !draft) throw new Error("Draft transaction did not return persisted records.");
    return { topic, draft };
  }

  async getDraft(id: string) {
    const { data, error } = await this.client.from("topic_versions").select("id,topic_id,version_number,status,content,warnings,source_ids,based_on_version,reviewed_at,reviewed_by,created_at").eq("id", id).eq("status", "draft").maybeSingle();
    assertNoError(error);
    if (!data) return null;
    const topic = await this.getTopicById((data as unknown as VersionRow).topic_id);
    return mapVersion(data as unknown as VersionRow, topic?.scoreNodeId ?? "unassigned", topic?.tags ?? []);
  }

  async replaceDraft(id: string, draft: TopicVersion) {
    const { error } = await this.client.rpc("replace_topic_draft", { p_version_id: id, p_content: draft.blocks, p_warnings: draft.warnings, p_source_ids: draft.sourceIds });
    assertNoError(error);
    const persisted = await this.getDraft(id);
    if (!persisted) throw new Error("Draft not found after update.");
    return persisted;
  }

  async approveDraft(id: string) {
    const { error } = await this.client.rpc("approve_topic_version", { version_id: id });
    assertNoError(error);
    const version = await this.getVersion(id);
    if (!version) throw new Error("Approved version not found.");
    return version;
  }

  async getVersion(id: string) {
    const { data, error } = await this.client.from("topic_versions").select("id,topic_id,version_number,status,content,warnings,source_ids,based_on_version,reviewed_at,reviewed_by,created_at").eq("id", id).maybeSingle();
    assertNoError(error);
    if (!data) return null;
    const row = data as unknown as VersionRow;
    const topic = await this.getTopicById(row.topic_id);
    return mapVersion(row, topic?.scoreNodeId ?? "unassigned", topic?.tags ?? []);
  }

  async restoreVersion(id: string) {
    const restoredId = crypto.randomUUID();
    const { error } = await this.client.rpc("restore_topic_version", { p_source_version_id: id, p_new_version_id: restoredId });
    assertNoError(error);
    const draft = await this.getDraft(restoredId);
    if (!draft) throw new Error("Restored draft not found.");
    return draft;
  }

  async addCard(card: ClozeDraft, topicId: string) {
    const { error } = await this.client.from("anki_drafts").insert({ id: card.id, owner_id: (await this.client.auth.getUser()).data.user?.id, topic_id: topicId, cloze_text: card.clozeText, additional_context: card.additionalContext, source_block_ids: card.sourceBlockIds, context_image_path: card.contextImageRef, tags: card.tags, duplicate_hash: card.duplicateHash });
    assertNoError(error);
    return card;
  }

  private mapCard(row: CardRow): ClozeDraft {
    return { id: row.id, clozeText: row.cloze_text, additionalContext: row.additional_context, sourceBlockIds: row.source_block_ids, contextImageRef: row.context_image_path ?? "", tags: row.tags, duplicateHash: row.duplicate_hash };
  }

  async getCards(ids: string[]) {
    const { data, error } = await this.client.from("anki_drafts").select("id,topic_id,cloze_text,additional_context,source_block_ids,context_image_path,tags,duplicate_hash").in("id", ids);
    assertNoError(error);
    return ((data ?? []) as unknown as CardRow[]).map((row) => this.mapCard(row));
  }

  async listCards() {
    const { data, error } = await this.client.from("anki_drafts").select("id,topic_id,cloze_text,additional_context,source_block_ids,context_image_path,tags,duplicate_hash").order("created_at");
    assertNoError(error);
    return ((data ?? []) as unknown as CardRow[]).map((row) => this.mapCard(row));
  }

  async setBookmark(topicId: string, saved: boolean) {
    const user = (await this.client.auth.getUser()).data.user;
    if (!user) throw new Error("Owner authentication required.");
    const result = saved
      ? await this.client.from("bookmarks").upsert({ owner_id: user.id, topic_id: topicId })
      : await this.client.from("bookmarks").delete().eq("topic_id", topicId);
    assertNoError(result.error);
  }

  async listBookmarkedTopics() {
    const { data, error } = await this.client.from("bookmarks").select("topic_id").order("created_at", { ascending: false });
    assertNoError(error);
    const order = new Map(((data ?? []) as Array<{ topic_id: string }>).map((row, index) => [row.topic_id, index]));
    return (await this.listTopics()).filter((topic) => order.has(topic.id) && topic.approvedVersion).sort((a, b) => order.get(a.id)! - order.get(b.id)!);
  }

  async recordRecentView(topicId: string) {
    const user = (await this.client.auth.getUser()).data.user;
    if (!user) throw new Error("Owner authentication required.");
    const { error } = await this.client.from("recent_views").upsert({ owner_id: user.id, topic_id: topicId, viewed_at: new Date().toISOString() });
    assertNoError(error);
  }

  async listRecentTopics(limit = 6) {
    const { data, error } = await this.client.from("recent_views").select("topic_id").order("viewed_at", { ascending: false }).limit(limit);
    assertNoError(error);
    const order = new Map(((data ?? []) as Array<{ topic_id: string }>).map((row, index) => [row.topic_id, index]));
    return (await this.listTopics()).filter((topic) => order.has(topic.id) && topic.approvedVersion).sort((a, b) => order.get(a.id)! - order.get(b.id)!);
  }

  async listMedia(): Promise<MediaExport[]> {
    const { data, error } = await this.client.from("media").select("id,storage_path,mime_type").order("created_at");
    assertNoError(error);
    const files: MediaExport[] = [];
    for (const row of (data ?? []) as unknown as MediaRow[]) {
      const downloaded = await this.client.storage.from("topic-media").download(row.storage_path);
      assertNoError(downloaded.error);
      if (!downloaded.data) throw new Error(`Media ${row.id} could not be downloaded.`);
      files.push({ id: row.id, storagePath: row.storage_path, mimeType: row.mime_type, bytes: new Uint8Array(await downloaded.data.arrayBuffer()) });
    }
    return files;
  }

  async audit(action: string, entityId: string, _actor: string, metadata: Record<string, string | number | boolean> = {}) {
    const user = (await this.client.auth.getUser()).data.user;
    if (!user) throw new Error("Owner authentication required.");
    const { error } = await this.client.from("audit_events").insert({ owner_id: user.id, action, entity_type: action.split(".")[0] || "library", entity_id: entityId, metadata });
    assertNoError(error);
  }
}
