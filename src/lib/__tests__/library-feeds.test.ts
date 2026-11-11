import { describe, expect, it } from "vitest";
import { listPlaybookSummaries, listPlaybooks, listRecentlyAdded, listTaxonomy, listTopics } from "@/lib/library";
import { specialtyId, topicPath } from "@/lib/library-items";

describe("listPlaybookSummaries", () => {
  it("returns slug, title, specialty and approach for every playbook and nothing else", () => {
    const summaries = listPlaybookSummaries();
    const playbooks = listPlaybooks();
    expect(summaries).toHaveLength(playbooks.length);
    summaries.forEach((summary, index) => {
      const { slug, title, specialty, approach } = playbooks[index];
      expect(summary).toEqual({ slug, title, specialty, approach });
      expect(Object.keys(summary).sort()).toEqual(["approach", "slug", "specialty", "title"]);
    });
  });
});

describe("listRecentlyAdded", () => {
  const key = (reviewedAt: string, title: string) => `${reviewedAt.slice(0, 10)} ${title}`;

  it("returns the 8 newest topics and playbooks together by review day, ties by title", () => {
    const reviewed = [
      ...listTopics().map((topic) => key(topic.approvedVersion?.reviewedAt ?? topic.updatedAt, topic.title)),
      ...listPlaybooks().map((playbook) => key(playbook.reviewedAt, playbook.title)),
    ];
    const newestFirst = [...reviewed].sort((a, b) => b.slice(0, 10).localeCompare(a.slice(0, 10)) || a.slice(11).localeCompare(b.slice(11)));
    const days = listRecentlyAdded(8);
    expect(days.flatMap((group) => group.items.map((entry) => `${group.day} ${entry.title}`))).toEqual(newestFirst.slice(0, 8));
  });

  it("groups by distinct UTC days, newest first, and carries what a list row needs", () => {
    const days = listRecentlyAdded(8);
    expect(days.map((group) => group.day)).toEqual([...new Set(days.map((group) => group.day))].sort().reverse());
    for (const group of days) {
      expect(group.day).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      for (const entry of group.items) {
        if (entry.kind === "topic") expect(entry.path.length, entry.slug).toBeGreaterThan(0);
        else expect(entry.specialty, entry.slug).not.toBe("");
      }
    }
  });

  it("honours the limit", () => {
    expect(listRecentlyAdded(3).flatMap((group) => group.items)).toHaveLength(3);
  });
});

describe("shipped library shape the display helpers rely on", () => {
  it("files every topic under one real category, and at most one group inside it", () => {
    const nodes = listTaxonomy();
    const categories = new Map(nodes.filter((node) => node.parentId === "score").map((node) => [node.title, node.id]));
    for (const topic of listTopics()) {
      const path = topicPath(topic);
      expect(path.length, topic.slug).toBeGreaterThanOrEqual(1);
      expect(path.length, topic.slug).toBeLessThanOrEqual(2);
      expect(categories.has(path[0]), `${topic.slug}: ${path[0]}`).toBe(true);
      if (path[1]) expect(nodes.some((node) => node.title === path[1] && node.parentId === categories.get(path[0])), `${topic.slug}: ${path[1]}`).toBe(true);
    }
  });

  it("gives every specialty its own anchor id that is safe in a URL hash", () => {
    const specialties = [...new Set(listPlaybooks().map((playbook) => playbook.specialty))];
    const ids = specialties.map(specialtyId);
    expect(new Set(ids).size).toBe(specialties.length);
    for (const id of ids) expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
  });
});
