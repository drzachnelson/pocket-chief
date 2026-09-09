import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TopicsPage from "@/app/topics/page";
import { getRecentTopics } from "@/lib/offline";
import { listTaxonomy, listTopics } from "@/lib/library";
import type { Topic } from "@/lib/types";

vi.mock("@/lib/library", () => ({ listTaxonomy: vi.fn(), listTopics: vi.fn() }));
vi.mock("@/lib/offline", () => ({ getRecentTopics: vi.fn() }));

const readTaxonomy = vi.mocked(listTaxonomy);
const readTopics = vi.mocked(listTopics);
const readDeviceRecents = vi.mocked(getRecentTopics);

function topic(slug: string, title: string, scoreNodeId: string): Topic {
  return {
    id: slug,
    slug,
    title,
    aliases: [],
    scoreCategory: "",
    scoreNodeId,
    tags: [],
    updatedAt: "2026-08-19T00:00:00.000Z",
    approvedVersion: { id: `${slug}-v1`, topicId: slug, versionNumber: 1, status: "approved", blocks: [], sourceIds: [], scoreNodeId, tags: [], warnings: [], createdAt: "2026-08-19T00:00:00.000Z" },
    versions: [],
  };
}

afterEach(() => { vi.clearAllMocks(); });

describe("TopicsPage", () => {
  it("uses neutral browse copy", () => {
    readTaxonomy.mockReturnValue([
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "stocked", title: "Stocked", slug: "stocked", parentId: "score", order: 1 },
    ]);
    readTopics.mockReturnValue([topic("stocked-topic", "Stocked topic", "stocked")]);
    readDeviceRecents.mockResolvedValue([]);

    render(TopicsPage());

    expect(screen.getByText("Browse the SCORE hierarchy.")).toBeInTheDocument();
    expect(screen.queryByText(/Browse the reviewed SCORE hierarchy/i)).not.toBeInTheDocument();
  });

  it("does not render empty curriculum branches", () => {
    readTaxonomy.mockReturnValue([
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "stocked", title: "Stocked", slug: "stocked", parentId: "score", order: 1 },
      { id: "empty", title: "Empty", slug: "empty", parentId: "score", order: 2 },
    ]);
    readTopics.mockReturnValue([topic("stocked-topic", "Stocked topic", "stocked")]);
    readDeviceRecents.mockResolvedValue([]);

    render(TopicsPage());

    expect(screen.queryAllByText("Empty")).toHaveLength(0);
    expect(screen.queryByText("Not started")).not.toBeInTheDocument();
  });

  it("uses the first approved topic in curriculum order as the resume fallback", async () => {
    readTaxonomy.mockReturnValue([
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "later", title: "Later", slug: "later", parentId: "score", order: 2 },
      { id: "first", title: "First", slug: "first", parentId: "score", order: 1 },
    ]);
    readTopics.mockReturnValue([topic("aorta", "Aorta", "later"), topic("zebra", "Zebra", "first")]);
    readDeviceRecents.mockResolvedValue([]);

    render(TopicsPage());

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/zebra");
  });
});
