import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getSavedTopics, setTopicSaved } from "@/lib/offline";
import { FavoriteTopics } from "@/components/favorite-topics";
import type { Topic } from "@/lib/types";

vi.mock("@/lib/offline", () => ({ getSavedTopics: vi.fn(), setTopicSaved: vi.fn() }));

const readSaved = vi.mocked(getSavedTopics);
const writeSaved = vi.mocked(setTopicSaved);

function topic(id: string, title: string): Topic {
  return {
    id,
    title,
    slug: id,
    aliases: [],
    scoreCategory: "Biliary Tract",
    scoreNodeId: "biliary",
    tags: ["biliary"],
    updatedAt: "2026-08-12T00:00:00.000Z",
    approvedVersion: { id: `${id}-v1`, topicId: id, versionNumber: 1, status: "approved", reviewedBy: "owner", reviewedAt: "2026-08-12T00:00:00.000Z", sourceIds: ["src-1"], scoreNodeId: "biliary", tags: ["biliary"], warnings: [], blocks: [], createdAt: "2026-08-12T00:00:00.000Z" },
    versions: [],
  };
}

afterEach(() => vi.clearAllMocks());

describe("FavoriteTopics", () => {
  it("renders the topics bookmarked on this device", async () => {
    readSaved.mockResolvedValue([topic("choledocholithiasis", "Choledocholithiasis")]);
    render(<FavoriteTopics />);
    await waitFor(() => expect(screen.getByText("Choledocholithiasis")).toBeInTheDocument());
  });

  it("invites the reader to browse when nothing is bookmarked", async () => {
    readSaved.mockResolvedValue([]);
    render(<FavoriteTopics />);
    await waitFor(() => expect(screen.getByText("No favorites saved yet")).toBeInTheDocument());
  });

  it("shows the empty state rather than failing when storage is unavailable", async () => {
    readSaved.mockRejectedValue(new Error("blocked"));
    render(<FavoriteTopics />);
    await waitFor(() => expect(screen.getByText("No favorites saved yet")).toBeInTheDocument());
  });

  it("regression: never writes back to storage, so a device's bookmarks cannot be wiped by rendering this component", async () => {
    readSaved.mockResolvedValue([topic("choledocholithiasis", "Choledocholithiasis")]);
    render(<FavoriteTopics />);
    await waitFor(() => expect(screen.getByText("Choledocholithiasis")).toBeInTheDocument());
    expect(writeSaved).not.toHaveBeenCalled();
  });
});
