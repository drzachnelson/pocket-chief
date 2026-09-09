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
    render(<TopicsResume fallbackSlug="fallback" approvedTopics={[{ id: "device-recent", slug: "device-recent" }]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/device-recent");
  });

  it("uses the curriculum fallback when this device has no recents", async () => {
    render(<TopicsResume fallbackSlug="fallback" approvedTopics={[]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/fallback");
  });

  it("maps a stale device slug to the current approved topic slug", async () => {
    readRecent.mockResolvedValue([topic("stable-id", "old-slug")]);
    render(<TopicsResume fallbackSlug="fallback" approvedTopics={[{ id: "stable-id", slug: "current-slug" }]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/current-slug");
  });

  it("ignores a device recent that is no longer in the library", async () => {
    readRecent.mockResolvedValue([topic("removed-id", "removed-slug")]);
    render(<TopicsResume fallbackSlug="fallback" approvedTopics={[{ id: "current-id", slug: "current-slug" }]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/fallback");
  });

  it("falls back to the empty state when the device storage read fails and there is no fallback", async () => {
    readRecent.mockRejectedValue(new Error("blocked"));
    render(<TopicsResume approvedTopics={[]} />);

    expect(await screen.findByText("No topic ready to resume.")).toBeInTheDocument();
  });
});
