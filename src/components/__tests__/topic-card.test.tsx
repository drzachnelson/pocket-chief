import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TopicCard } from "@/components/topic-card";
import type { Topic } from "@/lib/types";

const topic: Topic = {
  id: "topic-1", slug: "choledocholithiasis", title: "Choledocholithiasis", aliases: [],
  scoreCategory: "Hepatobiliary", scoreNodeId: "biliary", tags: ["biliary"], updatedAt: "2026-08-12T00:00:00.000Z",
  approvedVersion: { id: "topic-1-v1", topicId: "topic-1", versionNumber: 1, status: "approved", reviewedBy: "owner", reviewedAt: "2026-08-12T00:00:00.000Z", sourceIds: [], scoreNodeId: "biliary", tags: ["biliary"], warnings: [], blocks: [], createdAt: "2026-08-12T00:00:00.000Z" }, versions: [],
};

describe("TopicCard", () => {
  it("uses neutral browse metadata without a Reviewed badge", () => {
    render(<TopicCard topic={topic} />);

    expect(screen.getByText("Hepatobiliary")).toBeInTheDocument();
    expect(screen.queryByText("Reviewed")).not.toBeInTheDocument();
  });
});
