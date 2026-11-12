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

  const renderFlow = (flow: TopicBlock, linkEntries: typeof entries = []) => {
    const flowVersion = { ...version, blocks: [flow] };
    return renderTopic(<TopicContent contents={contents} topic={{ ...topic, approvedVersion: flowVersion, versions: [flowVersion] }} sources={[]} linkEntries={linkEntries} />);
  };
  const twoColumnFlow: TopicBlock = {
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
  // Three exits at one level make this wider than two columns; "shared" is reached by two branches.
  const wideFlow: TopicBlock = {
    id: "flow-2",
    type: "flow",
    heading: "Wide decision",
    nodes: [
      { id: "start", label: "Presentation" },
      { id: "a", label: "Branch A" },
      { id: "b", label: "Branch B" },
      { id: "c", label: "Branch C", tone: "good" },
      { id: "shared", label: "Shared step", tone: "caution" },
      { id: "end", label: "Outcome" },
    ],
    edges: [
      { from: "start", to: "a", label: "first" },
      { from: "start", to: "b", label: "second" },
      { from: "start", to: "c" },
      { from: "a", to: "shared", label: "from A" },
      { from: "b", to: "shared" },
      { from: "shared", to: "end" },
    ],
    claims: [],
  };

  it("draws a flow of two columns or fewer with every supplied edge as a connector and the condition above its box", () => {
    const { container } = renderFlow(twoColumnFlow);

    const diagram = container.querySelector(".decision-flow");
    expect(diagram).toHaveAttribute("aria-label", "Treatment decision flowchart");
    expect(diagram!.querySelectorAll(".flow-node[data-node-id]")).toHaveLength(twoColumnFlow.nodes.length);
    expect(diagram!.querySelectorAll("svg.flow-connectors path.flow-edge")).toHaveLength(twoColumnFlow.edges.length);
    for (const edge of twoColumnFlow.edges) {
      expect(diagram!.querySelector(`path[data-from="${edge.from}"][data-to="${edge.to}"]`)).not.toBeNull();
    }
    // A condition is a sibling placed right before the box it leads to, not a label floating on the connector.
    const stable = diagram!.querySelector('.flow-node[data-node-id="stable"]')!;
    expect(stable.previousElementSibling).toHaveClass("flow-conditions");
    expect(stable.previousElementSibling).toHaveTextContent("stable");
    expect(diagram!.querySelector('.flow-node[data-node-id="observe"]')!.previousElementSibling).toBeNull();
    expect(diagram).not.toHaveTextContent("Compare the source-linked paths");
    expect(diagram).not.toHaveTextContent("Then");
  });

  it("keeps the old kicker, kind, root tint, chip, relationships list and scroller out of the markup", () => {
    const { container } = renderFlow(twoColumnFlow);

    expect(container.querySelector("[data-node-kind]")).toBeNull();
    expect(container.querySelector(".flow-node small")).toBeNull();
    expect(container.querySelector(".flow-node.root, .flow-node.good, .flow-node.caution")).toBeNull();
    expect(container.querySelector(".flow-edge-label")).toBeNull();
    expect(container.querySelector(".flow-relationships, .flow-relationship")).toBeNull();
    expect(container.querySelector(".flow-canvas")).not.toHaveStyle({ minWidth: "100%" });
    for (const word of ["Start", "Decision", "Merge", "Outcome", "Step"]) expect(container.querySelector(".flow-node")).not.toHaveTextContent(new RegExp(`^${word}`));
  });

  it("hides the diagram from assistive tech and gives it the outline instead, one item per step", () => {
    const { container } = renderFlow(twoColumnFlow);

    expect(container.querySelector(".flow-canvas")).toHaveAttribute("aria-hidden", "true");
    const outline = container.querySelector(".decision-flow > ul.flow-outline")!;
    expect(outline).toHaveClass("visually-hidden");
    expect(outline.closest("[aria-hidden='true']")).toBeNull();
    expect(outline.querySelectorAll("li")).toHaveLength(twoColumnFlow.nodes.length);
    expect(outline.textContent).toContain("stable → Stable");
    expect(outline.textContent).toContain("unstable → Unstable");
    expect(outline.textContent).toContain("→ Observe");
    // The first step has no exit, so it carries no arrow.
    expect(outline.querySelector(":scope > li > .flow-exit")).toBeNull();
  });

  it("marks tone with a silent 15px glyph in the diagram and in the outline, and nowhere else", () => {
    const { container } = renderFlow(twoColumnFlow);

    for (const scope of [".flow-canvas", ".flow-outline"]) {
      expect(container.querySelectorAll(`${scope} svg.flow-glyph.good`)).toHaveLength(1);
      expect(container.querySelectorAll(`${scope} svg.flow-glyph.caution`)).toHaveLength(2);
    }
    for (const glyph of container.querySelectorAll(".decision-flow svg.flow-glyph")) {
      expect(glyph).toHaveAttribute("aria-hidden", "true");
      expect(glyph).toHaveAttribute("width", "15");
    }
    expect(container.querySelectorAll(".flow-node:not([data-node-id='stable']):not([data-node-id='unstable']):not([data-node-id='operate']) svg")).toHaveLength(0);
  });

  it("renders a flow wider than two columns as a visible outline and no diagram, repeating the shared step", () => {
    const { container } = renderFlow(wideFlow);

    const diagram = container.querySelector(".decision-flow")!;
    expect(diagram).toHaveAttribute("aria-label", "Wide decision flowchart");
    expect(diagram.querySelector(".flow-canvas, svg.flow-connectors, .flow-node")).toBeNull();
    const outline = diagram.querySelector("ul.flow-outline")!;
    expect(outline).not.toHaveClass("visually-hidden");
    expect(outline.closest("[aria-hidden='true']")).toBeNull();
    // start + a, b, c + "Shared step" and "Outcome" once under each branch that reaches them.
    expect(outline.querySelectorAll("li")).toHaveLength(1 + 3 + 2 + 2);
    const steps = [...outline.querySelectorAll(".flow-step")].map((step) => step.textContent);
    expect(steps.filter((step) => step === "Shared step")).toHaveLength(2);
    expect(steps.filter((step) => step === "Outcome")).toHaveLength(2);
    // Each branch carries its own subtree.
    const branchA = [...outline.querySelectorAll(":scope > li > ul > li")].find((li) => li.textContent?.startsWith("first"))!;
    expect([...branchA.querySelectorAll(".flow-exit, .flow-step")].map((part) => part.textContent)).toEqual(["first → ", "Branch A", "from A → ", "Shared step", "→ ", "Outcome"]);
    const branchC = [...outline.querySelectorAll(":scope > li > ul > li")].find((li) => li.textContent?.startsWith("→ Branch C"))!;
    expect(branchC.querySelector("ul")).toBeNull();
  });

  it("leaves each link focusable once: the outline keeps it, the hidden diagram copy leaves the tab order", () => {
    const linked: TopicBlock = { ...twoColumnFlow, nodes: twoColumnFlow.type === "flow" ? twoColumnFlow.nodes.map((node) => node.id === "observe" ? { ...node, label: "Observe, then choledocholithiasis workup" } : node) : [] };
    const { container } = renderFlow(linked, entries);

    const inDiagram = container.querySelectorAll(".flow-canvas a.inline-link");
    const inOutline = container.querySelectorAll(".flow-outline a.inline-link");
    expect(inDiagram).toHaveLength(1);
    expect(inOutline).toHaveLength(1);
    expect(inDiagram[0]).toHaveAttribute("tabindex", "-1");
    expect(inOutline[0]).not.toHaveAttribute("tabindex");
    expect(inDiagram[0].getAttribute("href")).toBe(inOutline[0].getAttribute("href"));
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
