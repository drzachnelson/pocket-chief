import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Contents } from "@/components/contents";
import { TopicContent } from "@/components/topic-content";
import type { ContentsData } from "@/lib/reader-contents";
import type { Topic, TopicBlock, TopicVersion } from "@/lib/types";

const offlineMocks = vi.hoisted(() => ({
  isTopicReviewed: vi.fn(async () => false),
  isTopicSaved: vi.fn(async () => false),
  recordRecentView: vi.fn(async () => undefined),
  setTopicReviewed: vi.fn(async () => undefined),
  setTopicSaved: vi.fn(async () => undefined),
}));
vi.mock("@/lib/offline", () => offlineMocks);
vi.mock("next/navigation", () => ({ usePathname: () => "/topics/paraesophageal", useRouter: () => ({ push: vi.fn() }) }));

// jsdom has no layout, so it leaves scrollIntoView undefined; the deep-link effect calls it.
const scrollIntoView = vi.fn();
Element.prototype.scrollIntoView = scrollIntoView;

beforeEach(() => {
  offlineMocks.isTopicReviewed.mockReset().mockResolvedValue(false);
  offlineMocks.setTopicReviewed.mockReset().mockResolvedValue(undefined);
  scrollIntoView.mockReset();
  window.history.replaceState({}, "", "/topics/paraesophageal");
});

const claim = (text: string) => ({ id: `c-${text.slice(0, 8)}`, text, citationIds: ["s1"], status: "cited" as const });

const blocks: TopicBlock[] = [
  { id: "b1", type: "prose", heading: "Assessment", text: "Look for **Borchardt triad** in [[Choledocholithiasis]] and choledocholithiasis again.", claims: [claim("x")] },
  { id: "b2", type: "bullets", heading: "↳ Details", items: ["Top level item", "- Nested one", "-- Deep one", "Second top"], claims: [] },
  { id: "b3", type: "warning", heading: "Watch out", text: "Danger text", tone: "danger", claims: [] },
];

const version: TopicVersion = { id: "v1", topicId: "t1", versionNumber: 1, status: "approved", blocks, sourceIds: ["s1"], scoreNodeId: "n", tags: [], warnings: [], createdAt: "2026-01-01" };
const topic: Topic = { id: "t1", slug: "paraesophageal", title: "Paraesophageal", aliases: [], scoreNodeId: "n", scoreCategory: "SCORE", tags: [], approvedVersion: version, versions: [version], updatedAt: "2026-01-01" };
const contents: ContentsData = { corpus: "topics", sections: [{ id: "b1", label: "Assessment", level: 2 }, { id: "b2", label: "Details", level: 3 }], branches: [] };
const entries = [{ key: "choledocholithiasis", slug: "choledocholithiasis", title: "Choledocholithiasis" }, { key: "paraesophageal", slug: "paraesophageal", title: "Paraesophageal" }];

// The shell hosts the toolbar in its top row; a bare page has no such slot, so the tests supply one.
const renderTopic = (ui: React.ReactElement) => render(<><div id="shell-toolbar" />{ui}</>);

describe("renderer redesign", () => {
  it("keeps guide controls compact without a version-reviewed decoration", () => {
    renderTopic(<TopicContent contents={contents} topic={topic} sources={[]} linkEntries={entries} />);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Expand all" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /^Notes$/ })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Sources/ })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /History/ })).toBeInTheDocument();
    expect(screen.queryByText(/Version 1 reviewed/i)).not.toBeInTheDocument();
  });

  it("renders inline markup, nesting, tones, and collapse state", () => {
    const { container } = renderTopic(<TopicContent contents={contents} topic={topic} sources={[]} linkEntries={entries} />);

    expect(container.querySelector("strong.inline-term")!.textContent).toBe("Borchardt triad");
    const links = container.querySelectorAll("a.inline-link");
    expect(links.length).toBe(1); // once per block, and never to itself
    expect(links[0].getAttribute("href")).toBe("/topics/choledocholithiasis");

    const details = container.querySelectorAll("details.topic-block.section-block");
    expect(details.length).toBe(2);
    expect(details[0].id).toBe("b1");
    expect((details[0] as HTMLDetailsElement).open).toBe(false);
    expect(details[1].getAttribute("data-level")).toBe("3");
    expect(details[1].querySelector("h3")!.textContent).toBe("Details");
    expect(details[0].querySelector("summary.block-heading .block-disclosure")).not.toBeNull();
    expect(details[0].querySelector("summary.block-heading .block-actions")).not.toBeNull();

    const outer = container.querySelector("ul.clinical-list")!;
    expect(outer.classList.contains("clinical-list-nested")).toBe(false);
    expect(outer.children.length).toBe(2);
    const nested = outer.children[0].querySelector("ul.clinical-list-nested")!;
    expect(nested.children.length).toBe(1);
    expect(nested.children[0].getAttribute("data-depth")).toBe("1");
    expect(nested.children[0].querySelector("ul.clinical-list-nested > li")!.getAttribute("data-depth")).toBe("2");

    const warning = container.querySelector("section.warning-block")!;
    expect(warning.tagName).toBe("SECTION");
    expect(warning.classList.contains("tone-danger")).toBe(true);
    expect(warning.querySelector(".block-heading .callout-icon")).not.toBeNull();
  });

  it("collapses and re-expands every section", () => {
    const { container } = renderTopic(<TopicContent contents={contents} topic={topic} sources={[]} linkEntries={entries} />);
    const details = container.querySelectorAll<HTMLDetailsElement>("details.section-block");
    fireEvent.click(screen.getByRole("button", { name: "Expand all" }));
    expect([...details].every((item) => item.open)).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Collapse all" }));
    expect([...details].every((item) => !item.open)).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Expand all" }));
    expect([...details].every((item) => item.open)).toBe(true);
    // A hand-closed section is mirrored into state, so Open all reopens it.
    details[0].open = false;
    fireEvent(details[0], new Event("toggle"));
    expect(screen.getByRole("button", { name: "Expand all" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Expand all" }));
    expect([...details].every((item) => item.open)).toBe(true);
  });

  it("opens a deep-linked section and records local reviewed state", async () => {
    window.history.replaceState({}, "", "/topics/paraesophageal#b1");
    const { container } = renderTopic(<TopicContent contents={contents} topic={topic} sources={[]} linkEntries={entries} nextTopic={{ slug: "next", label: "Next topic", categoryLabel: "Foregut" }} />);
    const details = container.querySelector<HTMLDetailsElement>("#b1")!;
    await waitFor(() => expect(details.open).toBe(true));

    const reviewed = screen.getByRole("button", { name: "Studied" });
    await waitFor(() => expect(reviewed).not.toBeDisabled());
    expect(reviewed).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(reviewed);
    await waitFor(() => expect(offlineMocks.setTopicReviewed).toHaveBeenCalledWith(topic, true));
    await waitFor(() => expect(reviewed).toHaveAttribute("aria-pressed", "true"));
    expect(reviewed).toHaveAccessibleName("Studied");
    expect(screen.getByRole("link", { name: "Next topic: Next topic — Foregut" })).toHaveAttribute("href", "/topics/next");
  });

  it("scrolls a deep-linked section into view once it has been opened", async () => {
    window.history.replaceState({}, "", "/topics/paraesophageal#b1");
    const { container } = renderTopic(<TopicContent contents={contents} topic={topic} sources={[]} linkEntries={entries} />);
    const details = container.querySelector<HTMLDetailsElement>("#b1")!;

    // The browser makes its own hash jump while the section is still closed, so it lands short.
    // Opening the section has to be followed by re-aiming at the target.
    await waitFor(() => expect(details.open).toBe(true));
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());
    expect(scrollIntoView.mock.instances[0]).toBe(details);
  });

  it("falls back to the topics index at the end of a category", () => {
    renderTopic(<TopicContent contents={contents} topic={topic} sources={[]} linkEntries={entries} />);
    expect(screen.getByRole("link", { name: "End of category: back to all topics" })).toHaveAttribute("href", "/topics");
  });

  it("renders every supplied decision edge as a connector instead of flattening nodes by depth", () => {
    const flow: TopicBlock = {
      id: "flow-1",
      type: "flow",
      heading: "Treatment decision",
      nodes: [
        { id: "start", label: "Suspected condition" },
        { id: "stable", label: "Stable", tone: "good" },
        { id: "unstable", label: "Unstable", tone: "caution" },
        { id: "observe", label: "Observe" },
        { id: "operate", label: "Operate", tone: "caution" },
      ],
      edges: [
        { from: "start", to: "stable", label: "stable" },
        { from: "start", to: "unstable", label: "unstable" },
        { from: "stable", to: "observe" },
        { from: "unstable", to: "operate" },
      ],
      claims: [],
    };
    const flowVersion = { ...version, blocks: [flow] };
    const flowTopic = { ...topic, approvedVersion: flowVersion, versions: [flowVersion] };
    const { container } = renderTopic(<TopicContent contents={contents} topic={flowTopic} sources={[]} linkEntries={[]} />);

    const diagram = container.querySelector(".decision-flow");
    expect(diagram).toHaveAttribute("aria-label", "Treatment decision flowchart");
    expect(diagram!.querySelectorAll(".flow-node[data-node-id]")).toHaveLength(flow.nodes.length);
    expect(diagram!.querySelectorAll("svg.flow-connectors path.flow-edge")).toHaveLength(flow.edges.length);
    for (const edge of flow.edges) {
      expect(diagram!.querySelector(`path[data-from="${edge.from}"][data-to="${edge.to}"]`)).not.toBeNull();
    }
    expect(diagram!.querySelectorAll(".flow-relationship")).toHaveLength(flow.edges.length);
    expect(diagram).not.toHaveTextContent("Compare the source-linked paths");
    expect(diagram).not.toHaveTextContent("Then");
  });

  it("prints a version's review date in UTC, matching the header's Last updated", async () => {
    const zone = process.env.TZ;
    process.env.TZ = "America/Los_Angeles"; // 02:30 UTC on the 22nd is still the 21st here
    try {
      const reviewed: TopicVersion = { ...version, reviewedAt: "2026-10-22T02:30:00.000Z" };
      renderTopic(<TopicContent contents={contents} topic={{ ...topic, approvedVersion: reviewed, versions: [reviewed] }} sources={[]} linkEntries={entries} />);
      await userEvent.click(screen.getByRole("tab", { name: /History/ }));
      expect(screen.getByText("Reviewed Oct 22, 2026")).toBeInTheDocument();
    } finally { if (zone === undefined) delete process.env.TZ; else process.env.TZ = zone; }
  });

  it("offers no flashcard affordance anywhere in the reading view", () => {
    const { container } = renderTopic(<TopicContent contents={contents} topic={topic} sources={[]} linkEntries={entries} />);
    expect(container.querySelector("button.anki-inline")).toBeNull();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText(/anki/i)).not.toBeInTheDocument();
  });
});

describe("reader chrome", () => {
  const history: TopicVersion = { ...version, reviewedAt: "2026-10-22T02:30:00.000Z" };

  it("keeps the tab in state, with silent counts and no tab in the address", async () => {
    renderTopic(<TopicContent contents={contents} topic={{ ...topic, approvedVersion: history, versions: [history] }} sources={[]} linkEntries={entries} />);
    expect(screen.getByRole("tab", { name: "Notes" })).toHaveAttribute("aria-selected", "true");
    // The counts are aria-hidden, so the tabs are named by their words alone.
    expect(screen.getByRole("tab", { name: "Sources" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "History" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("tab", { name: "History" }));
    expect(screen.getByRole("tab", { name: "History" })).toHaveAttribute("aria-selected", "true");
    expect(window.location.hash).toBe("");
  });

  it("draws no status dot on a history row", async () => {
    const { container } = renderTopic(<TopicContent contents={contents} topic={{ ...topic, approvedVersion: history, versions: [history] }} sources={[]} linkEntries={entries} />);
    await userEvent.click(screen.getByRole("tab", { name: "History" }));
    expect(screen.getByText("Version 1 · approved")).toBeInTheDocument();
    expect(container.querySelector(".status-dot")).toBeNull();
  });

  it("switches to Notes and opens the section when a #block link is followed from another tab", async () => {
    const { container } = renderTopic(<TopicContent contents={contents} topic={topic} sources={[]} linkEntries={entries} />);
    await userEvent.click(screen.getByRole("tab", { name: /Sources/ }));
    expect(container.querySelector("#b1")).toBeNull();

    act(() => { window.history.replaceState({}, "", "/topics/paraesophageal#b1"); window.dispatchEvent(new HashChangeEvent("hashchange")); });
    expect(screen.getByRole("tab", { name: "Notes" })).toHaveAttribute("aria-selected", "true");
    const details = container.querySelector<HTMLDetailsElement>("#b1")!;
    expect(details.open).toBe(true);
    expect(scrollIntoView.mock.instances.at(-1)).toBe(details);
  });

  it("also switches to Notes when the link followed points at the hash the page already has, which fires no hashchange", async () => {
    window.history.replaceState({}, "", "/topics/paraesophageal#b1");
    const { container } = renderTopic(<><a href="#b1">Assessment</a><TopicContent contents={contents} topic={topic} sources={[]} linkEntries={entries} /></>);
    await userEvent.click(screen.getByRole("tab", { name: /Sources/ }));
    expect(container.querySelector("#b1")).toBeNull();

    await userEvent.click(screen.getByRole("link", { name: "Assessment" }));
    expect(screen.getByRole("tab", { name: "Notes" })).toHaveAttribute("aria-selected", "true");
    expect(container.querySelector<HTMLDetailsElement>("#b1")!.open).toBe(true);
  });

  it("keeps a section's open state across a tab change", async () => {
    const { container } = renderTopic(<TopicContent contents={contents} topic={topic} sources={[]} linkEntries={entries} />);
    fireEvent.click(screen.getByRole("button", { name: "Expand all" }));
    await userEvent.click(screen.getByRole("tab", { name: /Sources/ }));
    await userEvent.click(screen.getByRole("tab", { name: "Notes" }));
    expect([...container.querySelectorAll<HTMLDetailsElement>("details.section-block")].every((item) => item.open)).toBe(true);
  });

  it("marks no section current while Sources or History shows, and marks one again on Notes", async () => {
    renderTopic(<><Contents data={contents} /><TopicContent contents={contents} topic={topic} sources={[]} linkEntries={entries} /></>);
    const current = () => screen.getAllByRole("link").filter((link) => link.getAttribute("aria-current") === "location");
    await waitFor(() => expect(current()).toHaveLength(1));

    await userEvent.click(screen.getByRole("tab", { name: /Sources/ }));
    await waitFor(() => expect(current()).toHaveLength(0));
    await userEvent.click(screen.getByRole("tab", { name: "Notes" }));
    await waitFor(() => expect(current()).toHaveLength(1));
  });
});
