import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getRecentTopics } from "@/lib/offline";
import { TopicsResume } from "@/components/topics-resume";
import type { Topic } from "@/lib/types";

vi.mock("@/lib/offline", () => ({ getRecentTopics: vi.fn() }));

const readRecent = vi.mocked(getRecentTopics);

function topic(id: string, slug = id): Topic {
  return {
    id,
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
    render(<TopicsResume recentSlug="server-recent" fallbackSlug="fallback" approvedTopics={[{ id: "device-recent", slug: "device-recent" }]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/device-recent");
  });

  it("uses the server recent slug before the fallback when this device has no recents", async () => {
    render(<TopicsResume recentSlug="server-recent" fallbackSlug="fallback" approvedTopics={[]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/server-recent");
  });

  it("maps a stale device slug to the current approved topic slug", async () => {
    readRecent.mockResolvedValue([topic("stable-id", "old-slug")]);
    render(<TopicsResume recentSlug="server-recent" fallbackSlug="fallback" approvedTopics={[{ id: "stable-id", slug: "current-slug" }]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/current-slug");
  });

  it("ignores a device recent that is no longer approved", async () => {
    readRecent.mockResolvedValue([topic("removed-id", "removed-slug")]);
    render(<TopicsResume recentSlug="server-recent" fallbackSlug="fallback" approvedTopics={[{ id: "current-id", slug: "current-slug" }]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/server-recent");
  });

  it("renders a compact empty state when no approved topic can be resumed", async () => {
    render(<TopicsResume approvedTopics={[]} />);

    expect(await screen.findByText("No topic ready to resume.")).toBeInTheDocument();
  });
});
