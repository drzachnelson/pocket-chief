import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getRecentTopics } from "@/lib/offline";
import { TopicsResume } from "@/components/topics-resume";
import type { Topic } from "@/lib/types";

vi.mock("@/lib/offline", () => ({ getRecentTopics: vi.fn() }));

const readRecent = vi.mocked(getRecentTopics);

function topic(slug: string): Topic {
  return {
    id: slug,
    slug,
    title: slug,
    aliases: [],
    scoreCategory: "",
    scoreNodeId: "section",
    tags: [],
    updatedAt: "2026-08-19T00:00:00.000Z",
    approvedVersion: { id: `${slug}-v1`, topicId: slug, versionNumber: 1, status: "approved", blocks: [], sourceIds: [], scoreNodeId: "section", tags: [], warnings: [], createdAt: "2026-08-19T00:00:00.000Z" },
    versions: [],
  };
}

beforeEach(() => { readRecent.mockResolvedValue([]); });
afterEach(() => { vi.clearAllMocks(); });

describe("TopicsResume", () => {
  it("prefers the most recently viewed approved topic on this device", async () => {
    readRecent.mockResolvedValue([topic("device-recent")]);
    render(<TopicsResume recentSlug="server-recent" fallbackSlug="fallback" />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/device-recent");
  });

  it("uses the server recent slug before the fallback when this device has no recents", async () => {
    render(<TopicsResume recentSlug="server-recent" fallbackSlug="fallback" />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/server-recent");
  });

  it("renders a compact empty state when no approved topic can be resumed", async () => {
    render(<TopicsResume />);

    expect(await screen.findByText("No topic ready to resume.")).toBeInTheDocument();
  });
});
