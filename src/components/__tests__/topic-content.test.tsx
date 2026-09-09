import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TopicContent } from "@/components/topic-content";
import type { Topic, TopicBlock, TopicVersion } from "@/lib/types";

vi.mock("@/lib/offline", () => ({ isTopicSaved: async () => false, recordRecentView: async () => undefined, setTopicSaved: async () => undefined }));

const claim = (text: string) => ({ id: `c-${text.slice(0, 8)}`, text, citationIds: ["s1"], status: "cited" as const });

const blocks: TopicBlock[] = [
  { id: "b1", type: "prose", heading: "Assessment", text: "Look for **Borchardt triad** in [[Choledocholithiasis]] and choledocholithiasis again.", claims: [claim("x")] },
  { id: "b2", type: "bullets", heading: "↳ Details", items: ["Top level item", "- Nested one", "-- Deep one", "Second top"], claims: [] },
  { id: "b3", type: "warning", heading: "Watch out", text: "Danger text", tone: "danger", claims: [] },
];

const version: TopicVersion = { id: "v1", topicId: "t1", versionNumber: 1, status: "approved", blocks, sourceIds: ["s1"], scoreNodeId: "n", tags: [], warnings: [], createdAt: "2026-01-01" };
const topic: Topic = { id: "t1", slug: "paraesophageal", title: "Paraesophageal", aliases: [], scoreNodeId: "n", scoreCategory: "SCORE", tags: [], approvedVersion: version, versions: [version], updatedAt: "2026-01-01" };
const entries = [{ key: "choledocholithiasis", slug: "choledocholithiasis", title: "Choledocholithiasis" }, { key: "paraesophageal", slug: "paraesophageal", title: "Paraesophageal" }];

describe("renderer redesign", () => {
  it("keeps guide controls compact without a version-reviewed decoration", () => {
    render(<TopicContent topic={topic} sources={[]} linkEntries={entries} />);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Collapse all" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /^Notes$/ })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Sources/ })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /History/ })).toBeInTheDocument();
    expect(screen.queryByText(/Version 1 reviewed/i)).not.toBeInTheDocument();
  });

  it("renders inline markup, nesting, tones, and collapse state", () => {
    const { container } = render(<TopicContent topic={topic} sources={[]} linkEntries={entries} />);

    expect(container.querySelector("strong.inline-term")!.textContent).toBe("Borchardt triad");
    const links = container.querySelectorAll("a.inline-link");
    expect(links.length).toBe(1); // once per block, and never to itself
    expect(links[0].getAttribute("href")).toBe("/topics/choledocholithiasis");

    const details = container.querySelectorAll("details.topic-block.section-block");
    expect(details.length).toBe(2);
    expect(details[0].id).toBe("b1");
    expect((details[0] as HTMLDetailsElement).open).toBe(true);
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
    const { container } = render(<TopicContent topic={topic} sources={[]} linkEntries={entries} />);
    const details = container.querySelectorAll<HTMLDetailsElement>("details.section-block");
    fireEvent.click(screen.getByRole("button", { name: "Collapse all" }));
    expect([...details].every((item) => !item.open)).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Expand all" }));
    expect([...details].every((item) => item.open)).toBe(true);
    // A hand-closed section is mirrored into state, so Expand all reopens it.
    details[0].open = false;
    fireEvent(details[0], new Event("toggle"));
    expect(screen.getByRole("button", { name: "Expand all" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Expand all" }));
    expect([...details].every((item) => item.open)).toBe(true);
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
    const { container } = render(<TopicContent topic={flowTopic} sources={[]} linkEntries={[]} />);

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

  it("offers no flashcard affordance anywhere in the reading view", () => {
    const { container } = render(<TopicContent topic={topic} sources={[]} linkEntries={entries} />);
    expect(container.querySelector("button.anki-inline")).toBeNull();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText(/anki/i)).not.toBeInTheDocument();
  });
});
