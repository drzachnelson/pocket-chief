import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TopicContent } from "@/components/topic-content";
import type { ContentsData } from "@/lib/reader-contents";
import type { SuppliedSource, Topic, TopicBlock, TopicVersion } from "@/lib/types";

vi.mock("@/lib/offline", () => ({ isTopicReviewed: async () => false, isTopicSaved: async () => false, recordRecentView: async () => undefined, setTopicReviewed: async () => undefined, setTopicSaved: async () => undefined }));
vi.mock("next/navigation", () => ({ usePathname: () => "/topics/gallstones", useRouter: () => ({ push: vi.fn() }) }));

// jsdom has no layout and no Highlight API; the painted ranges are recorded here instead.
const scrollIntoView = vi.fn();
Element.prototype.scrollIntoView = scrollIntoView;
const registry = new Map<string, { ranges: Range[]; priority?: number }>();

beforeEach(() => {
  registry.clear();
  scrollIntoView.mockReset();
  vi.stubGlobal("CSS", { highlights: registry });
  vi.stubGlobal("Highlight", class { ranges: Range[]; priority = 0; constructor(...ranges: Range[]) { this.ranges = ranges; } });
  window.history.replaceState({}, "", "/topics/gallstones");
});
afterEach(() => { vi.unstubAllGlobals(); });

const blocks: TopicBlock[] = [
  { id: "b1", type: "prose", heading: "Assessment", text: "Stones can reach the **bile duct** and cause cholangitis.", claims: [] },
  { id: "b2", type: "table", heading: "Labs", columns: ["Test", "Finding"], rows: [["ALP", "Raised in cholangitis"], ["Lipase", "Normal"]], claims: [] },
  { id: "b3", type: "flow", heading: "Pathway", nodes: [{ id: "n1", label: "Cholangitis suspected" }, { id: "n2", label: "Antibiotics" }], edges: [{ from: "n1", to: "n2", label: "if unstable" }], claims: [] },
  { id: "b4", type: "warning", heading: "Watch out", text: "Do not delay for cholangitis.", tone: "danger", claims: [] },
];
const sources: SuppliedSource[] = [{ id: "s1", title: "Practice guideline", citation: "Society 2024", kind: "article", suppliedAt: "2026-01-01" }];
const version: TopicVersion = { id: "v1", topicId: "t1", versionNumber: 1, status: "approved", blocks, sourceIds: ["s1"], scoreNodeId: "n", tags: [], warnings: [], createdAt: "2026-01-01" };
const topic: Topic = { id: "t1", slug: "gallstones", title: "Gallstones", aliases: [], scoreNodeId: "n", scoreCategory: "SCORE", tags: [], approvedVersion: version, versions: [version], updatedAt: "2026-01-01" };
const contents: ContentsData = { corpus: "topics", sections: [], branches: [] };

const mount = () => render(<><div id="shell-toolbar" /><TopicContent contents={contents} topic={topic} sources={sources} linkEntries={[]} /></>);
const section = (id: string) => document.querySelector<HTMLDetailsElement>(`details[data-block-id="${id}"]`)!;
// By id: a hidden group has no accessible name for the role query to match.
const bar = () => document.getElementById("find-bar")!;
const field = () => screen.getByRole("searchbox", { name: "Find in page" });
const frame = () => act(async () => { await new Promise((resolve) => requestAnimationFrame(() => resolve(null))); });
const type = async (user: ReturnType<typeof userEvent.setup>, text: string) => { await user.keyboard(text); await frame(); };

describe("Find text", () => {
  it("opens from the toolbar button, moves focus into the field and exposes the bar as a group, not a search landmark", async () => {
    const user = userEvent.setup();
    mount();
    const button = screen.getByRole("button", { name: "Find text" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", bar().id);
    expect(bar()).toHaveAttribute("hidden");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(bar()).not.toHaveAttribute("hidden");
    expect(field()).toHaveAttribute("type", "search");
    expect(field()).toHaveFocus();
    expect(screen.getByRole("group", { name: "Find in page" })).toBe(bar());
    expect(screen.queryByRole("search")).not.toBeInTheDocument();
    expect(within(bar()).getByRole("status")).toBeInTheDocument();
    for (const name of ["Previous match", "Next match", "Close find"]) expect(within(bar()).getByRole("button", { name })).toBeInTheDocument();
  });

  it("counts matches across a collapsed section, a table cell, a flow label and a callout, and highlights each without rewriting text", async () => {
    const user = userEvent.setup();
    const { container } = mount();
    const textNodes = () => { const nodes: Text[] = []; const walker = document.createTreeWalker(container.querySelector("article")!, NodeFilter.SHOW_TEXT); for (let node = walker.nextNode(); node; node = walker.nextNode()) nodes.push(node as Text); return nodes; };
    const before = textNodes();
    await user.click(screen.getByRole("button", { name: "Find text" }));
    await type(user, "cholangitis");

    expect(screen.getByRole("status")).toHaveTextContent("1 of 4");
    expect(registry.get("find-match")!.ranges.map((range) => range.toString())).toEqual(["cholangitis", "cholangitis", "Cholangitis", "cholangitis"]);
    expect(registry.get("find-current")!.ranges).toEqual([registry.get("find-match")!.ranges[0]]);
    expect(registry.get("find-current")!.priority).toBe(1);
    // Highlighting is paint only: the very same text nodes are still in the page, so React's keys and hydration are untouched.
    const after = textNodes();
    expect(after).toHaveLength(before.length);
    after.forEach((node, index) => expect(node).toBe(before[index]));
    expect(container.querySelectorAll("mark")).toHaveLength(0);
  });

  it("opens the collapsed section that holds the current match and scrolls to it, and steps with Next, Previous and Enter", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole("button", { name: "Find text" }));
    expect(section("b1").open).toBe(false);
    expect(section("b2").open).toBe(false);

    await type(user, "cholangitis");
    expect(section("b1").open).toBe(true);
    expect(section("b2").open).toBe(false);
    expect(scrollIntoView).toHaveBeenLastCalledWith({ block: "center", inline: "nearest" });

    await user.click(screen.getByRole("button", { name: "Next match" }));
    expect(screen.getByRole("status")).toHaveTextContent("2 of 4");
    expect(section("b2").open).toBe(true);
    expect(registry.get("find-current")!.ranges[0].toString()).toBe("cholangitis");
    expect(registry.get("find-current")!.ranges[0].startContainer.parentElement!.closest("td")).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Next match" }));
    expect(section("b3").open).toBe(true);
    expect(registry.get("find-current")!.ranges[0].startContainer.parentElement!.closest(".flow-node")).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Previous match" }));
    expect(screen.getByRole("status")).toHaveTextContent("2 of 4");

    await user.click(field());
    await user.keyboard("{Enter}{Enter}{Enter}");
    expect(screen.getByRole("status")).toHaveTextContent("1 of 4");
    await user.keyboard("{Shift>}{Enter}{/Shift}");
    expect(screen.getByRole("status")).toHaveTextContent("4 of 4");
  });

  it("keeps the reader's place while the query grows, and says when nothing matches", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole("button", { name: "Find text" }));
    await type(user, "chol");
    await user.click(screen.getByRole("button", { name: "Next match" }));
    await user.click(screen.getByRole("button", { name: "Next match" }));
    expect(screen.getByRole("status")).toHaveTextContent("3 of 4");

    await user.type(field(), "angitis");
    await frame();
    expect(screen.getByRole("status")).toHaveTextContent("3 of 4");

    await user.type(field(), "zzz");
    await frame();
    expect(screen.getByRole("status")).toHaveTextContent("No matches");
    expect(registry.size).toBe(0);
    expect(screen.getByRole("button", { name: "Next match" })).toBeDisabled();
  });

  it("closes with the button or Escape, returns focus to the Find text button and clears the highlights", async () => {
    const user = userEvent.setup();
    mount();
    const button = screen.getByRole("button", { name: "Find text" });
    await user.click(button);
    await type(user, "bile");
    expect(registry.size).toBe(2);

    await user.click(screen.getByRole("button", { name: "Close find" }));
    expect(bar()).toHaveAttribute("hidden");
    expect(button).toHaveFocus();
    expect(registry.size).toBe(0);

    await user.click(button);
    expect(field()).toHaveFocus();
    expect(field()).toHaveValue("bile");
    await user.keyboard("{Escape}");
    expect(bar()).toHaveAttribute("hidden");
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("searches the tab being read and starts over when the tab changes", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole("button", { name: "Find text" }));
    await type(user, "guideline");
    expect(screen.getByRole("status")).toHaveTextContent("No matches");

    await user.click(screen.getByRole("tab", { name: /Sources/ }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("1 of 1"));
    expect(registry.get("find-current")!.ranges[0].startContainer.parentElement!.tagName).toBe("H2");

    await user.click(screen.getByRole("tab", { name: /^Notes$/ }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("No matches"));
  });

  it("clears the highlights when the page goes away", async () => {
    const user = userEvent.setup();
    const { unmount } = mount();
    await user.click(screen.getByRole("button", { name: "Find text" }));
    await type(user, "bile");
    expect(registry.size).toBe(2);
    unmount();
    expect(registry.size).toBe(0);
  });
});
