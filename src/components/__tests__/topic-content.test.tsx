import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TopicContent } from "@/components/topic-content";
import type { Topic, TopicBlock, TopicVersion } from "@/lib/types";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
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
    expect(screen.getByLabelText("Make Anki card from Deep one")).toBeInTheDocument();

    const warning = container.querySelector("section.warning-block")!;
    expect(warning.tagName).toBe("SECTION");
    expect(warning.classList.contains("tone-danger")).toBe(true);
    expect(warning.querySelector(".block-heading .callout-icon")).not.toBeNull();

    // Anki button inside a summary must not toggle the section.
    const ankiInSummary = details[0].querySelector("button.anki-inline")!;
    fireEvent.click(ankiInSummary);
    expect((details[0] as HTMLDetailsElement).open).toBe(true);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
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
});
