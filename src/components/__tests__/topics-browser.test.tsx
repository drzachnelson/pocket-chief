import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TopicsBrowser } from "@/components/topics-browser";
import type { TopicNavigationCategory } from "@/lib/topic-navigation";

function topic(id: string, label: string, searchTerms: string[] = []) {
  return { id, slug: id, label, updatedAt: "2026-08-20", taxonomyNodeId: "category", searchTerms, sections: [] };
}

const navigation: TopicNavigationCategory[] = [
  {
    id: "first",
    slug: "first",
    label: "First category",
    topics: [topic("direct", "Direct topic", ["alpha alias", "core"])],
    children: [
      { id: "section", slug: "section", label: "Meaningful subsection", topics: [topic("child", "Child topic", ["beta"]), topic("another", "Another topic")], children: [] },
      { id: "empty", slug: "empty", label: "Empty subsection", topics: [], children: [] },
    ],
  },
  { id: "second", slug: "second", label: "Second category", topics: [topic("later", "Later topic")], children: [] },
];

describe("TopicsBrowser", () => {
  it("renders curriculum categories, direct topics, subsection labels, and counts", () => {
    render(<TopicsBrowser navigation={navigation} />);

    expect(screen.getByRole("heading", { name: "First category" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Meaningful subsection" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Direct topic" })).toHaveAttribute("href", "/topics/direct");
    expect(screen.queryByRole("heading", { name: "Empty subsection" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Curriculum" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "All topics" })).toHaveAttribute("aria-pressed", "false");
  });

  it("filters labels, category/subsection context, aliases, and removes empty branches", () => {
    render(<TopicsBrowser navigation={navigation} />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Search topics" }), { target: { value: "beta" } });

    expect(screen.getByRole("link", { name: "Child topic" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Direct topic" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Second category" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Direct topics" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Empty subsection" })).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole("searchbox", { name: "Search topics" }), { target: { value: "first category" } });
    expect(screen.getByRole("link", { name: "Direct topic" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Child topic" })).toBeInTheDocument();
  });

  it("switches to one alphabetical all-topics index without duplicate links", () => {
    render(<TopicsBrowser navigation={navigation} />);
    fireEvent.click(screen.getByRole("button", { name: "All topics" }));

    expect(screen.getByRole("heading", { name: "All topics" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "First category" })).not.toBeInTheDocument();
    const links = within(screen.getByRole("list")).getAllByRole("link");
    expect(links.map((link) => link.firstElementChild?.textContent)).toEqual(["Another topic", "Child topic", "Direct topic", "Later topic"]);
    expect(screen.getAllByRole("link", { name: "Child topic" })).toHaveLength(1);
  });

  it("shows a clear no-match state and clears the query", () => {
    render(<TopicsBrowser navigation={navigation} />);
    const search = screen.getByRole("searchbox", { name: "Search topics" });
    fireEvent.change(search, { target: { value: "not-a-topic" } });

    expect(screen.getByRole("heading", { name: "No topics found" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(screen.getByRole("link", { name: "Direct topic" })).toBeInTheDocument();
    expect(search).toHaveValue("");
  });
});
