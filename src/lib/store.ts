import type { ClozeDraft, SuppliedSource, Topic, TopicVersion } from "@/lib/types";
import { demoTopics, suppliedSources } from "@/lib/seed";

export interface AuditEvent { id: string; action: string; entityId: string; actor: string; at: string; metadata?: Record<string, string | number | boolean> }

interface DemoState {
  topics: Topic[];
  drafts: Map<string, TopicVersion>;
  sources: SuppliedSource[];
  clozeDrafts: Map<string, ClozeDraft>;
  bookmarks: Set<string>;
  recentViews: Array<{ topicId: string; viewedAt: string }>;
  audit: AuditEvent[];
}

function initial(): DemoState {
  return {
    topics: structuredClone(demoTopics),
    drafts: new Map(),
    sources: structuredClone(suppliedSources),
    clozeDrafts: new Map(),
    bookmarks: new Set(),
    recentViews: [],
    audit: [],
  };
}

let state = initial();

export function resetDemoStore() { state = initial(); }

export const demoStore = {
  topics: () => state.topics,
  drafts: () => [...state.drafts.values()],
  sources: () => state.sources,
  cards: () => [...state.clozeDrafts.values()],
  getDraft: (id: string) => state.drafts.get(id),
  saveDraft(draft: TopicVersion) { state.drafts.set(draft.id, structuredClone(draft)); return draft; },
  replaceDraft(id: string, draft: TopicVersion) { state.drafts.delete(id); state.drafts.set(draft.id, structuredClone(draft)); return draft; },
  addSource(source: SuppliedSource) { state.sources.push(structuredClone(source)); },
  addCard(card: ClozeDraft) { state.clozeDrafts.set(card.id, structuredClone(card)); return card; },
  getCards(ids: string[]) { return ids.flatMap((id) => state.clozeDrafts.get(id) ? [state.clozeDrafts.get(id)!] : []); },
  approveVersion(version: TopicVersion) {
    const topic = state.topics.find((item) => item.id === version.topicId);
    if (topic) { topic.approvedVersion = structuredClone(version); topic.versions.push(structuredClone(version)); topic.updatedAt = version.reviewedAt ?? version.createdAt; }
    state.drafts.delete(version.id.replace(/-approved$/, "-draft"));
    return version;
  },
  audit(action: string, entityId: string, actor: string, metadata?: AuditEvent["metadata"]) { state.audit.push({ id: crypto.randomUUID(), action, entityId, actor, at: new Date().toISOString(), metadata }); },
};
