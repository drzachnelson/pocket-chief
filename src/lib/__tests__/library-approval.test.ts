import { describe, expect, it, vi } from "vitest";
import { listTopics, searchLibrary } from "@/lib/library";
import type { Topic } from "@/lib/types";

const fixtures = vi.hoisted(() => {
  const approvedTopic: Topic = {
    id: "fixture-approved-topic",
    slug: "zzyzx-canyon-repair",
    title: "Zzyzx Canyon Repair",
    aliases: [],
    scoreNodeId: "score",
    scoreCategory: "SCORE · Test Fixtures",
    tags: [],
    approvedVersion: {
      id: "fixture-approved-topic-v1",
      topicId: "fixture-approved-topic",
      versionNumber: 1,
      status: "approved",
      blocks: [],
      sourceIds: [],
      scoreNodeId: "score",
      tags: [],
      warnings: [],
      createdAt: "2026-01-01T00:00:00.000Z",
    },
    versions: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
  const draftTopic: Topic = {
    id: "fixture-draft-topic",
    slug: "zzyzx-canyon-draft",
    title: "Zzyzx Canyon Draft",
    aliases: [],
    scoreNodeId: "score",
    scoreCategory: "SCORE · Test Fixtures",
    tags: [],
    approvedVersion: null,
    versions: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
  return { approvedTopic, draftTopic };
});

// `libraryTopics` is a mixed set here on purpose: one topic with a real `approvedVersion`, one with
// `approvedVersion: null`. That makes these tests fail if the approval filter in library.ts is
// ever weakened or removed. `library.test.ts` deliberately never does this -- it asserts against
// the real corpus, which happens to be 100% approved today and so can't catch a missing filter.
vi.mock("@/content", () => ({ libraryTopics: [fixtures.approvedTopic, fixtures.draftTopic], suppliedSources: [], taxonomy: [] }));

describe("library approval filter", () => {
  it("listTopics excludes a topic with no approved version", () => {
    expect(listTopics().map((topic) => topic.slug)).toEqual([fixtures.approvedTopic.slug]);
  });

  it("searchLibrary excludes a topic with no approved version, even when the query matches both", () => {
    expect(searchLibrary("Zzyzx Canyon").map((topic) => topic.slug)).toEqual([fixtures.approvedTopic.slug]);
  });
});
