import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TopicPage, { generateStaticParams } from "@/app/topics/[slug]/page";
import { getTopicBySlug, listTaxonomy, listTopics } from "@/lib/library";
import type { TaxonomyNode, Topic } from "@/lib/types";

vi.mock("@/lib/library", () => ({ getTopicBySlug: vi.fn(), listSources: vi.fn(() => []), listTaxonomy: vi.fn(), listTopics: vi.fn(() => []) }));
vi.mock("@/components/topic-content", () => ({ TopicContent: ({ nextTopic }: { nextTopic?: { slug: string; label: string; categoryLabel: string } }) => <div data-testid="topic-content" data-next-slug={nextTopic?.slug} data-next-label={nextTopic?.label} data-next-category={nextTopic?.categoryLabel} /> }));

const readTopic = vi.mocked(getTopicBySlug);
const readTaxonomy = vi.mocked(listTaxonomy);
const readTopics = vi.mocked(listTopics);

const taxonomy: TaxonomyNode[] = [
  { id: "score", title: "SCORE Curriculum", slug: "score", order: 0 },
  { id: "trauma", title: "Trauma", slug: "trauma", parentId: "score", order: 1 },
  { id: "neck", title: "Neck", slug: "neck", parentId: "trauma", order: 1 },
];

const topic: Topic = {
  id: "neck-trauma", slug: "neck-trauma", title: "Neck trauma", aliases: [], scoreCategory: "Trauma", scoreNodeId: "neck", tags: ["airway"], updatedAt: "2026-08-20T00:30:00.000Z",
  approvedVersion: { id: "v1", topicId: "neck-trauma", versionNumber: 1, status: "approved", blocks: [], sourceIds: [], scoreNodeId: "neck", tags: ["airway"], warnings: [], createdAt: "2026-08-20T00:30:00.000Z" }, versions: [],
};

const nextTopic: Topic = {
  ...topic,
  id: "neck-wound",
  slug: "neck-wound",
  title: "Neck wound",
  approvedVersion: { ...topic.approvedVersion!, id: "v2", topicId: "neck-wound" },
};

describe("TopicPage", () => {
  it("renders one SCORE path and a UTC-stable last-updated label without tag chips or breadcrumbs", async () => {
    readTopic.mockReturnValue(topic);
    readTaxonomy.mockReturnValue(taxonomy);
    readTopics.mockReturnValue([topic, nextTopic]);

    render(await TopicPage({ params: Promise.resolve({ slug: topic.slug }) }));

    expect(screen.getByText("SCORE · Trauma · Neck")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Neck trauma" })).toBeInTheDocument();
    expect(screen.getByText("Last updated Aug 20, 2026")).toBeInTheDocument();
    expect(screen.queryByLabelText("Breadcrumb")).not.toBeInTheDocument();
    expect(screen.queryByText("airway")).not.toBeInTheDocument();
    expect(screen.getByTestId("topic-content")).toHaveAttribute("data-next-slug", "neck-wound");
    expect(screen.getByTestId("topic-content")).toHaveAttribute("data-next-category", "Trauma");
  });

  it("does not wrap into another category at the end", async () => {
    readTopic.mockReturnValue(topic);
    readTaxonomy.mockReturnValue(taxonomy);
    readTopics.mockReturnValue([topic]);

    render(await TopicPage({ params: Promise.resolve({ slug: topic.slug }) }));
    const rendered = screen.getAllByTestId("topic-content").at(-1)!;
    expect(rendered).not.toHaveAttribute("data-next-slug");
  });
});

// The static export has no server to resolve a slug, so this list *is* the set of pages that
// exist. A wrong key or shape here fails at `next build` in Task 11, far from where it was written.
describe("generateStaticParams", () => {
  it("returns one param object per topic the library lists", () => {
    readTopics.mockReturnValue([topic, { ...topic, id: "escharotomy", slug: "escharotomy" }]);

    expect(generateStaticParams()).toEqual([{ slug: "neck-trauma" }, { slug: "escharotomy" }]);
  });
});
