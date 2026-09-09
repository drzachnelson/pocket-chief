import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TopicPage from "@/app/topics/[slug]/page";
import { getTopicBySlug, listTaxonomy } from "@/lib/library";
import type { TaxonomyNode, Topic } from "@/lib/types";

vi.mock("@/lib/library", () => ({ getTopicBySlug: vi.fn(), listSources: vi.fn(() => []), listTaxonomy: vi.fn(), listTopics: vi.fn(() => []) }));
vi.mock("@/components/topic-content", () => ({ TopicContent: () => <div data-testid="topic-content" /> }));

const readTopic = vi.mocked(getTopicBySlug);
const readTaxonomy = vi.mocked(listTaxonomy);

const taxonomy: TaxonomyNode[] = [
  { id: "score", title: "SCORE Curriculum", slug: "score", order: 0 },
  { id: "trauma", title: "Trauma", slug: "trauma", parentId: "score", order: 1 },
  { id: "neck", title: "Neck", slug: "neck", parentId: "trauma", order: 1 },
];

const topic: Topic = {
  id: "neck-trauma", slug: "neck-trauma", title: "Neck trauma", aliases: [], scoreCategory: "Trauma", scoreNodeId: "neck", tags: ["airway"], updatedAt: "2026-08-20T00:30:00.000Z",
  approvedVersion: { id: "v1", topicId: "neck-trauma", versionNumber: 1, status: "approved", blocks: [], sourceIds: [], scoreNodeId: "neck", tags: ["airway"], warnings: [], createdAt: "2026-08-20T00:30:00.000Z" }, versions: [],
};

describe("TopicPage", () => {
  it("renders one SCORE path and a UTC-stable last-updated label without tag chips or breadcrumbs", async () => {
    readTopic.mockReturnValue(topic);
    readTaxonomy.mockReturnValue(taxonomy);

    render(await TopicPage({ params: Promise.resolve({ slug: topic.slug }) }));

    expect(screen.getByText("SCORE · Trauma · Neck")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Neck trauma" })).toBeInTheDocument();
    expect(screen.getByText("Last updated Aug 20, 2026")).toBeInTheDocument();
    expect(screen.queryByLabelText("Breadcrumb")).not.toBeInTheDocument();
    expect(screen.queryByText("airway")).not.toBeInTheDocument();
  });
});
