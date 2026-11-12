import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TopicPage, { generateStaticParams } from "@/app/topics/[slug]/page";
import { getTopicBySlug, listTaxonomy, listTopics } from "@/lib/library";
import type { TaxonomyNode, Topic } from "@/lib/types";

vi.mock("@/lib/library", () => ({ getTopicBySlug: vi.fn(), listSources: vi.fn(() => []), listTaxonomy: vi.fn(), listTopics: vi.fn(() => []) }));
vi.mock("@/components/topic-content", () => ({ TopicContent: ({ breadcrumb, nextTopic, category }: { breadcrumb?: React.ReactNode; nextTopic?: { slug: string; label: string; categoryLabel: string }; category?: { label: string; href: string } }) => <div data-testid="topic-content" data-category-label={category?.label} data-category-href={category?.href} data-next-slug={nextTopic?.slug} data-next-label={nextTopic?.label} data-next-category={nextTopic?.categoryLabel}>{breadcrumb}</div> }));

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
  it("shows a breadcrumb of category then group, each linking into the category page, with no SCORE prefix", async () => {
    readTopic.mockReturnValue(topic);
    readTaxonomy.mockReturnValue(taxonomy);
    readTopics.mockReturnValue([topic, nextTopic]);

    render(await TopicPage({ params: Promise.resolve({ slug: topic.slug }) }));

    const crumbs = within(screen.getByRole("navigation", { name: "Breadcrumb" })).getAllByRole("link");
    expect(crumbs.map((link) => link.textContent)).toEqual(["Trauma", "Neck"]);
    // The category is the top-level node, the group is the node the topic sits in; the group link lands on its heading.
    expect(crumbs.map((link) => link.getAttribute("href"))).toEqual(["/topics/category/trauma", "/topics/category/trauma#neck"]);
    expect(screen.queryByText(/SCORE/)).not.toBeInTheDocument();
    expect(screen.getByTestId("topic-content")).toHaveAttribute("data-next-slug", "neck-wound");
    expect(screen.getByTestId("topic-content")).toHaveAttribute("data-next-category", "Trauma");
  });

  it("links a topic filed straight under its category with one crumb", async () => {
    readTopic.mockReturnValue({ ...topic, scoreNodeId: "trauma" });
    readTaxonomy.mockReturnValue(taxonomy);
    readTopics.mockReturnValue([topic]);

    render(await TopicPage({ params: Promise.resolve({ slug: topic.slug }) }));
    expect(within(screen.getByRole("navigation", { name: "Breadcrumb" })).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(["/topics/category/trauma"]);
  });

  it("closes the page with a UTC-stable Last updated line, then the disclaimer, once", async () => {
    readTopic.mockReturnValue(topic);
    readTaxonomy.mockReturnValue(taxonomy);
    readTopics.mockReturnValue([topic]);

    const { container } = render(await TopicPage({ params: Promise.resolve({ slug: topic.slug }) }));

    // Not in a header: the title heading is the h1 of TopicContent now, and the page has no heading of its own.
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    const end = container.querySelector(".reader-end")!;
    expect([...end.children].map((line) => line.textContent)).toEqual(["Last updated Aug 20, 2026", "Educational reference only. Not patient-specific guidance."]);
    expect(screen.getAllByText(/Educational reference only/)).toHaveLength(1);
    // Last in the page, after the content (which holds Studied and Next topic).
    expect(screen.getByTestId("topic-content").compareDocumentPosition(end) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.lastElementChild!.lastElementChild).toBe(end);
  });

  it("hands the content the category page for Back and for the end of the category", async () => {
    readTopic.mockReturnValue(topic);
    readTaxonomy.mockReturnValue(taxonomy);
    readTopics.mockReturnValue([topic]);

    render(await TopicPage({ params: Promise.resolve({ slug: topic.slug }) }));
    // The category is the top-level node (Trauma), not the group the topic sits in (Neck).
    expect(screen.getAllByTestId("topic-content").at(-1)).toHaveAttribute("data-category-href", "/topics/category/trauma");
    expect(screen.getAllByTestId("topic-content").at(-1)).toHaveAttribute("data-category-label", "Trauma");
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
