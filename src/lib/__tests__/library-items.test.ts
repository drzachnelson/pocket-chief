import { describe, expect, it } from "vitest";
import { categoryHref, groupRecentlyAdded, playbookItem, quietLine, resolveEntries, specialtyId, topicItem, topicPath, type LibraryItem } from "@/lib/library-items";
import { APPROACH_LABELS, type Playbook, type PlaybookApproach, type Topic } from "@/lib/types";

const topic = (id: string, slug: string, scoreCategory = "SCORE · Trauma · Diseases & Conditions"): Topic => ({ id, slug, title: `Title ${slug}`, aliases: [], scoreNodeId: "n", scoreCategory, tags: [], approvedVersion: null, versions: [], updatedAt: "2026-11-01T00:00:00.000Z" });
const playbook = (id: string, slug: string): Playbook => ({ id, slug, title: `Title ${slug}`, aliases: [], procedureId: slug.replace(/-/g, "_"), approach: "robotic", specialty: "Surgical Oncology", tags: [], blocks: [], sourceIds: [], warnings: [], reviewedAt: "2026-11-01T00:00:00.000Z", updatedAt: "2026-11-01T00:00:00.000Z" });
const item = (title: string): LibraryItem => ({ kind: "topic", id: title, slug: title, title, path: [] });

describe("topicPath", () => {
  it("drops the stored SCORE root and keeps category then group", () => {
    expect(topicPath(topic("t", "t"))).toEqual(["Trauma", "Diseases & Conditions"]);
  });

  it("returns a single segment for a topic filed directly under its category", () => {
    expect(topicPath({ scoreCategory: "SCORE · Preoperative Evaluation and Perioperative Care" })).toEqual(["Preoperative Evaluation and Perioperative Care"]);
  });

  it("leaves a path that never had the root alone, and returns nothing for an empty one", () => {
    expect(topicPath({ scoreCategory: "Biliary" })).toEqual(["Biliary"]);
    expect(topicPath({ scoreCategory: "" })).toEqual([]);
    expect(topicPath({ scoreCategory: "SCORE" })).toEqual([]);
  });
});

describe("specialtyId", () => {
  it("derives one stable anchor from a specialty name", () => {
    expect(specialtyId("Surgical Oncology")).toBe("surgical-oncology");
    expect(specialtyId("General Abdomen")).toBe("general-abdomen");
    expect(specialtyId("Vascular")).toBe(specialtyId("Vascular"));
  });
});

describe("APPROACH_LABELS", () => {
  it("names every approach once, in sentence case", () => {
    const approaches: PlaybookApproach[] = ["open", "laparoscopic", "robotic", "endovascular"];
    expect(Object.keys(APPROACH_LABELS).sort()).toEqual([...approaches].sort());
    for (const approach of approaches) expect(APPROACH_LABELS[approach]).toMatch(/^[A-Z][a-z]+$/);
  });
});

describe("resolveEntries", () => {
  const topics = [topic("topic-id", "renamed-slug")];
  const playbooks = [playbook("playbook-id", "some-playbook")];

  it("rebuilds each entry from the current library by id, so a renamed slug still resolves", () => {
    const entries = [{ id: "topic-id", kind: "topic" as const, savedAt: "a" }, { id: "playbook-id", kind: "playbook" as const, savedAt: "b" }];
    const resolved = resolveEntries(entries, topics, playbooks);
    expect(resolved.map(({ entry }) => entry)).toEqual(entries);
    expect(resolved[0].item).toEqual(topicItem(topics[0]));
    expect(resolved[0].item).toMatchObject({ slug: "renamed-slug", path: ["Trauma", "Diseases & Conditions"] });
    expect(resolved[1].item).toEqual(playbookItem(playbooks[0]));
    expect(resolved[1].item).toMatchObject({ kind: "playbook", slug: "some-playbook", specialty: "Surgical Oncology", approach: "robotic" });
  });

  it("returns a null item for an id that is gone, in place, and looks only in the entry's own corpus", () => {
    const resolved = resolveEntries([{ id: "gone", kind: "topic" as const }, { id: "topic-id", kind: "playbook" as const }, { id: "playbook-id", kind: "topic" as const }], topics, playbooks);
    expect(resolved.map(({ item }) => item)).toEqual([null, null, null]);
  });
});

describe("groupRecentlyAdded", () => {
  const at = (title: string, reviewedAt: string) => ({ item: item(title), reviewedAt });

  it("takes the newest entries, groups them by day, and sorts by title within a day", () => {
    const days = groupRecentlyAdded([
      at("Hernia", "2026-11-08T00:00:00.000Z"), at("Appendix", "2026-11-09T00:00:00.000Z"), at("Colon", "2026-11-09T00:00:00.000Z"),
      at("Bile duct", "2026-11-09T00:00:00.000Z"), at("Old", "2026-10-01T00:00:00.000Z"),
    ], 4);
    expect(days.map((day) => [day.day, day.items.map((entry) => entry.title)])).toEqual([["2026-11-09", ["Appendix", "Bile duct", "Colon"]], ["2026-11-08", ["Hernia"]]]);
  });

  it("shows only the first entries of a batch larger than the limit, by title", () => {
    const days = groupRecentlyAdded(["D", "B", "A", "C"].map((title) => at(title, "2026-10-22T00:00:00.000Z")), 2);
    expect(days).toEqual([{ day: "2026-10-22", items: [item("A"), item("B")] }]);
  });

  it("reads the day in UTC, whatever offset the instant was written in", () => {
    const days = groupRecentlyAdded([at("Late", "2026-11-09T23:30:00-05:00"), at("Early", "2026-11-09T00:30:00+05:00")], 8);
    expect(days.map((day) => day.day)).toEqual(["2026-11-10", "2026-11-08"]);
  });

  it("returns nothing for an empty library or a zero limit", () => {
    expect(groupRecentlyAdded([], 8)).toEqual([]);
    expect(groupRecentlyAdded([at("A", "2026-11-09T00:00:00.000Z")], 0)).toEqual([]);
  });
});

describe("categoryHref", () => {
  it("puts a category page under /topics/category/, apart from the topic slugs", () => {
    expect(categoryHref("biliary")).toBe("/topics/category/biliary");
  });
});

describe("quietLine", () => {
  const trauma: LibraryItem = { kind: "topic", id: "t", slug: "t", title: "T", path: ["Trauma", "Diseases & Conditions"] };
  const tab = playbookItem(playbook("p", "p"));

  it("gives a topic its category then group", () => {
    expect(quietLine(trauma)).toBe("Trauma · Diseases & Conditions");
    expect(quietLine({ ...trauma, path: ["Hernia"] })).toBe("Hernia");
  });

  it("gives a playbook its specialty, and adds the approach only when asked", () => {
    expect(quietLine(tab)).toBe("Surgical Oncology");
    expect(quietLine(tab, { approach: true })).toBe("Surgical Oncology · Robotic");
  });
});
