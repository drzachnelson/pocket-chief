import type { ClozeDraft, SuppliedSource, TaxonomyNode, Topic, TopicVersion } from "@/lib/types";
import { demoTopics, suppliedSources, taxonomy } from "@/lib/seed";

export interface AuditEvent { id: string; action: string; entityId: string; actor: string; at: string; metadata?: Record<string, string | number | boolean> }

interface DemoState {
  topics: Topic[];
  drafts: Map<string, TopicVersion>;
  sources: SuppliedSource[];
  clozeDrafts: Map<string, ClozeDraft>;
  bookmarks: Set<string>;
  recentViews: Array<{ topicId: string; viewedAt: string }>;
  taxonomy: TaxonomyNode[];
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
    taxonomy: structuredClone(taxonomy),
    audit: [],
  };
}

const demoGlobal = globalThis as typeof globalThis & { __pocketChiefDemoState?: DemoState };

function currentState() {
  demoGlobal.__pocketChiefDemoState ??= initial();
  return demoGlobal.__pocketChiefDemoState;
}

export function resetDemoStore() { demoGlobal.__pocketChiefDemoState = initial(); }

export const demoStore = {
  topics: () => currentState().topics,
  drafts: () => [...currentState().drafts.values()],
  sources: () => currentState().sources,
  taxonomy: () => currentState().taxonomy,
  cards: () => [...currentState().clozeDrafts.values()],
  bookmarkedTopicIds: () => [...currentState().bookmarks],
  recentViews: () => [...currentState().recentViews],
  getTopic: (id: string) => currentState().topics.find((topic) => topic.id === id),
  getTopicBySlug: (slug: string) => currentState().topics.find((topic) => topic.slug === slug),
  getVersion: (id: string) => currentState().topics.flatMap((topic) => topic.versions).find((version) => version.id === id) ?? currentState().drafts.get(id),
  getDraft: (id: string) => currentState().drafts.get(id),
  addTopic(topic: Topic) { currentState().topics.push(structuredClone(topic)); return topic; },
  saveDraft(draft: TopicVersion) { currentState().drafts.set(draft.id, structuredClone(draft)); return draft; },
  replaceDraft(id: string, draft: TopicVersion) { currentState().drafts.delete(id); currentState().drafts.set(draft.id, structuredClone(draft)); return draft; },
  addSource(source: SuppliedSource) { if (!currentState().sources.some((item) => item.id === source.id)) currentState().sources.push(structuredClone(source)); return source; },
  addCard(card: ClozeDraft) { currentState().clozeDrafts.set(card.id, structuredClone(card)); return card; },
  setBookmark(topicId: string, saved: boolean) { if (saved) currentState().bookmarks.add(topicId); else currentState().bookmarks.delete(topicId); },
  recordRecentView(topicId: string) { currentState().recentViews = [{ topicId, viewedAt: new Date().toISOString() }, ...currentState().recentViews.filter((item) => item.topicId !== topicId)]; },
  getCards(ids: string[]) { return ids.flatMap((id) => currentState().clozeDrafts.get(id) ? [currentState().clozeDrafts.get(id)!] : []); },
  approveVersion(version: TopicVersion) {
    const topic = currentState().topics.find((item) => item.id === version.topicId);
    if (topic) { topic.approvedVersion = structuredClone(version); topic.versions.push(structuredClone(version)); topic.updatedAt = version.reviewedAt ?? version.createdAt; }
    currentState().drafts.delete(version.id.replace(/-approved$/, "-draft"));
    return version;
  },
  audit(action: string, entityId: string, actor: string, metadata?: AuditEvent["metadata"]) { currentState().audit.push({ id: crypto.randomUUID(), action, entityId, actor, at: new Date().toISOString(), metadata }); },
};
