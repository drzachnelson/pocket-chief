import { approveDraft as approveEditorialDraft, restoreVersion as restoreEditorialVersion } from "@/lib/editorial";
import type { ContentRepository, TopicDraftRecord } from "@/lib/repository";
import { searchTopics } from "@/lib/search";
import { demoStore } from "@/lib/store";
import type { ClozeDraft, TopicVersion } from "@/lib/types";

export class DemoRepository implements ContentRepository {
  async listTopics() { return structuredClone(demoStore.topics()); }
  async searchTopics(query: string) { return structuredClone(searchTopics(query, demoStore.topics())); }
  async getTopicBySlug(slug: string) { return structuredClone(demoStore.getTopicBySlug(slug) ?? null); }
  async getTopicById(id: string) { return structuredClone(demoStore.getTopic(id) ?? null); }
  async listTaxonomy() { return structuredClone(demoStore.taxonomy()); }
  async listSources(ids?: string[]) { return structuredClone(ids ? demoStore.sources().filter((source) => ids.includes(source.id)) : demoStore.sources()); }

  async createTopicDraft(record: TopicDraftRecord) {
    record.sources.forEach((source) => demoStore.addSource(source));
    let topic = demoStore.getTopic(record.topic.id);
    if (!topic) {
      topic = demoStore.addTopic({
        ...record.topic,
        approvedVersion: null,
        versions: [],
        updatedAt: record.draft.createdAt,
      });
    }
    demoStore.saveDraft(record.draft);
    return { topic: structuredClone(topic), draft: structuredClone(record.draft) };
  }

  async getDraft(id: string) { return structuredClone(demoStore.getDraft(id) ?? null); }
  async replaceDraft(id: string, draft: TopicVersion) { return structuredClone(demoStore.replaceDraft(id, draft)); }

  async approveDraft(id: string, ownerEmail: string) {
    const draft = demoStore.getDraft(id);
    if (!draft) throw new Error("Draft not found.");
    const validSources = new Set(demoStore.sources().filter((source) => draft.sourceIds.includes(source.id)).map((source) => source.id));
    const approved = approveEditorialDraft(draft, ownerEmail, validSources);
    demoStore.approveVersion(approved);
    return structuredClone(approved);
  }

  async getVersion(id: string) { return structuredClone(demoStore.getVersion(id) ?? null); }

  async restoreVersion(id: string) {
    const version = demoStore.getVersion(id);
    if (!version) throw new Error("Version not found.");
    const topic = demoStore.getTopic(version.topicId);
    const highest = Math.max(0, ...(topic?.versions.map((item) => item.versionNumber) ?? []), ...demoStore.drafts().filter((item) => item.topicId === version.topicId).map((item) => item.versionNumber));
    const draft = restoreEditorialVersion(version, highest);
    demoStore.saveDraft(draft);
    return structuredClone(draft);
  }

  async addCard(card: ClozeDraft) { return structuredClone(demoStore.addCard(card)); }
  async getCards(ids: string[]) { return structuredClone(demoStore.getCards(ids)); }
  async listCards() { return structuredClone(demoStore.cards()); }
  async setBookmark(topicId: string, saved: boolean) { demoStore.setBookmark(topicId, saved); }
  async listBookmarkedTopics() { const ids = new Set(demoStore.bookmarkedTopicIds()); return structuredClone(demoStore.topics().filter((topic) => ids.has(topic.id) && topic.approvedVersion)); }
  async recordRecentView(topicId: string) { demoStore.recordRecentView(topicId); }
  async listRecentTopics(limit = 6) { const order = new Map(demoStore.recentViews().slice(0, limit).map((item, index) => [item.topicId, index])); return structuredClone(demoStore.topics().filter((topic) => order.has(topic.id) && topic.approvedVersion).sort((a, b) => order.get(a.id)! - order.get(b.id)!)); }
  async listMedia() { return []; }
  async audit(action: string, entityId: string, actor: string, metadata?: Record<string, string | number | boolean>) { demoStore.audit(action, entityId, actor, metadata); }
}
