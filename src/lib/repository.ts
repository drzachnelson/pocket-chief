import { dataMode } from "@/lib/auth";
import type { AuditEvent } from "@/lib/store";
import type { ClozeDraft, SuppliedSource, TaxonomyNode, Topic, TopicVersion } from "@/lib/types";
import { DemoRepository } from "@/lib/repositories/demo";
import { SupabaseRepository } from "@/lib/repositories/supabase";

export interface TopicDraftRecord {
  topic: Pick<Topic, "id" | "title" | "slug" | "aliases" | "scoreNodeId" | "scoreCategory" | "tags">;
  sources: SuppliedSource[];
  draft: TopicVersion;
}

export interface MediaExport {
  id: string;
  storagePath: string;
  mimeType: string;
  bytes: Uint8Array;
}

export interface ContentRepository {
  listTopics(): Promise<Topic[]>;
  searchTopics(query: string): Promise<Topic[]>;
  getTopicBySlug(slug: string): Promise<Topic | null>;
  getTopicById(id: string): Promise<Topic | null>;
  listTaxonomy(): Promise<TaxonomyNode[]>;
  listSources(ids?: string[]): Promise<SuppliedSource[]>;
  createTopicDraft(record: TopicDraftRecord): Promise<{ topic: Topic; draft: TopicVersion }>;
  getDraft(id: string): Promise<TopicVersion | null>;
  replaceDraft(id: string, draft: TopicVersion): Promise<TopicVersion>;
  approveDraft(id: string, ownerEmail: string): Promise<TopicVersion>;
  getVersion(id: string): Promise<TopicVersion | null>;
  restoreVersion(id: string): Promise<TopicVersion>;
  addCard(card: ClozeDraft, topicId: string): Promise<ClozeDraft>;
  updateCard(card: ClozeDraft): Promise<ClozeDraft>;
  getCards(ids: string[]): Promise<ClozeDraft[]>;
  listCards(): Promise<ClozeDraft[]>;
  setBookmark(topicId: string, saved: boolean): Promise<void>;
  listBookmarkedTopics(): Promise<Topic[]>;
  recordRecentView(topicId: string): Promise<void>;
  listRecentTopics(limit?: number): Promise<Topic[]>;
  listMedia(): Promise<MediaExport[]>;
  audit(action: string, entityId: string, actor: string, metadata?: AuditEvent["metadata"]): Promise<void>;
}

export async function getRepository(): Promise<ContentRepository> {
  const mode = dataMode();
  if (mode === "demo") return new DemoRepository();
  if (mode === "supabase") return SupabaseRepository.create();
  throw new Error("POCKET_CHIEF_CONFIGURATION_REQUIRED");
}
