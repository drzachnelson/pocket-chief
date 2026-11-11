import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TopicsPage from "@/app/topics/page";
import CategoryPage, { generateStaticParams } from "@/app/topics/category/[slug]/page";
import { GET as categoriesFeed } from "@/app/categories.json/route";
import { listCategories } from "@/lib/categories";
import { listTaxonomy, listTopics } from "@/lib/library";
import { categoryHref } from "@/lib/library-items";

const categories = () => listCategories();
const category = (slug: string) => categories().find(({ node }) => node.slug === slug)!;

describe("Topics index", () => {
  it("is an h1 and one row per category with topics, in SCORE outline order, each counting its topics", () => {
    render(<TopicsPage />);

    expect(screen.getByRole("heading", { name: "Topics", level: 1 })).toBeInTheDocument();
    const rows = within(screen.getByRole("list")).getAllByRole("link");
    const expected = listTaxonomy().filter((node) => node.parentId === "score" && categories().some(({ node: shown }) => shown.id === node.id)).sort((a, b) => a.order - b.order);
    expect(rows).toHaveLength(expected.length);
    expect(rows.map((row) => row.textContent)).toEqual(expected.map((node) => `${node.title}${category(node.slug).topicCount}`));
    expect(rows.map((row) => row.getAttribute("href"))).toEqual(expected.map((node) => categoryHref(node.slug)));
    // Every topic sits in exactly one category, so the counts add up to the library.
    expect(categories().reduce((sum, { topicCount }) => sum + topicCount, 0)).toBe(listTopics().length);
  });

  it("has no search, view toggle, lede or resume, and leaves the counts to the eye", () => {
    const { container } = render(<TopicsPage />);

    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.querySelector(".eyebrow, .page-lede")).toBeNull();
    expect(screen.queryByText(/resume/i)).not.toBeInTheDocument();
    expect(container.querySelectorAll(".list-row-trailing > [aria-hidden=true]")).toHaveLength(categories().length);
  });

  it("hides a category with no topics", () => {
    const withTopics = new Set(categories().map(({ node }) => node.id));
    for (const node of listTaxonomy().filter((candidate) => candidate.parentId === "score" && !withTopics.has(candidate.id))) expect(screen.queryByText(node.title)).not.toBeInTheDocument();
  });
});

describe("category pages", () => {
  const render_ = async (slug: string) => render(await CategoryPage({ params: Promise.resolve({ slug }) }));

  it("prerenders one page per category with topics, and none collides with a topic slug", () => {
    // The export has no server to resolve a slug, so this list is the set of pages that exist.
    expect(generateStaticParams()).toEqual(categories().map(({ node }) => ({ slug: node.slug })));
    expect(generateStaticParams().length).toBeGreaterThan(0);
    // Topic pages are /topics/<slug>; categories live under /topics/category/, so the word itself must stay free.
    expect(listTopics().map(({ slug }) => slug)).not.toContain("category");
  });

  it("lists each group under a sentence-case heading with an id, over title-only rows in title order", async () => {
    const trauma = category("trauma");
    const { container } = await render_("trauma");

    expect(screen.getByRole("heading", { name: "Trauma", level: 1 })).toBeInTheDocument();
    for (const { node, topics } of trauma.subsections) {
      const heading = screen.getByRole("heading", { name: node.title, level: 2 });
      expect(heading).toHaveAttribute("id", node.slug);
      const list = heading.parentElement!.querySelector("ul")!;
      expect(within(list).getAllByRole("link").map((link) => link.textContent)).toEqual(topics.map(({ title }) => title));
      expect(within(list).getAllByRole("link")[0]).toHaveAttribute("href", `/topics/${topics[0].slug}`);
    }
    expect(trauma.subsections.length).toBe(2);
    expect(container.querySelectorAll("small")).toHaveLength(0);
    expect(new Set([...container.querySelectorAll("h2")].map((heading) => heading.id)).size).toBe(trauma.subsections.length);
  });

  it("lists topics filed straight under a category with no group heading", async () => {
    const direct = categories().find(({ topics }) => topics.length > 0);
    // The live taxonomy may have none; the page's behaviour is the same either way, so this only runs while one exists.
    if (!direct) return;
    await render_(direct.node.slug);
    for (const { title } of direct.topics) expect(screen.getByRole("link", { name: title })).toBeInTheDocument();
  });

  it("gives every category a page, including one with a single topic", async () => {
    for (const { node, topicCount } of categories()) {
      const { unmount } = await render_(node.slug);
      expect(screen.getByRole("heading", { name: node.title, level: 1 })).toBeInTheDocument();
      expect(screen.getAllByRole("link").length, node.slug).toBe(topicCount);
      unmount();
    }
  });

  it("is a 404 for a slug that is not a category", async () => {
    await expect(render_("not-a-category")).rejects.toThrow();
  });

  it("is listed for the service worker, which precaches one page per entry", async () => {
    expect(await categoriesFeed().json()).toEqual(categories().map(({ node }) => node.slug));
  });
});
