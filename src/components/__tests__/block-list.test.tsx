import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BlockList, useBlockCollapse } from "@/components/block-list";
import { libraryTopics } from "@/content";
import type { Claim, TopicBlock } from "@/lib/types";

// jsdom has no layout, so it leaves scrollIntoView undefined; the deep-link effect calls it.
Element.prototype.scrollIntoView = vi.fn();

beforeEach(() => { window.history.replaceState({}, "", "/playbooks/x"); });

/**
 * The deep-link handler is queued with requestAnimationFrame, so a synchronous assertion runs
 * before it ever fires — and a test written that way passes whether the code works or not.
 * Queueing a second frame guarantees the first has already run.
 */
const flushFrame = () => act(async () => { await new Promise((resolve) => requestAnimationFrame(() => resolve(null))); });

const sectionBlocks: TopicBlock[] = [
  { id: "b1", type: "prose", heading: "First", text: "One", claims: [] },
  { id: "b2", type: "prose", heading: "Second", text: "Two", claims: [] },
];
const otherBlocks: TopicBlock[] = [{ id: "c1", type: "prose", heading: "Alpha", text: "A", claims: [] }];

const cited: Claim = { id: "k1", text: "Cited", citationIds: ["s1"], status: "cited" };
const uncited: Claim = { id: "k2", text: "Uncited", citationIds: [], status: "needs_support" };

// A parent, two blocks whose ↳ heading only repeats its title, and one that is a real sub-heading.
const repeated: TopicBlock[] = [
  { id: "p1", type: "prose", heading: "Landmarks", text: "Parent text", claims: [cited] },
  { id: "p2", type: "bullets", heading: "↳ Landmarks", items: ["Merged item"], claims: [cited] },
  { id: "p3", type: "warning", heading: "↳ Landmarks", text: "Merged warning", tone: "danger", claims: [cited] },
  { id: "p4", type: "prose", heading: "↳ A different title", text: "Real sub-heading text", claims: [cited] },
];

function Harness({ blocks }: { blocks: TopicBlock[] }) {
  const collapse = useBlockCollapse(blocks);
  return (
    <>
      <button onClick={collapse.toggleAll}>{collapse.allOpen ? "Close all" : "Open all"}</button>
      <BlockList blocks={blocks} collapse={collapse} linkEntries={[]} selfSlug="x" />
    </>
  );
}

const detail = (id: string) => document.querySelector<HTMLDetailsElement>(`details[data-block-id="${id}"]`);
const allDetails = (id: string) => [...document.querySelectorAll<HTMLDetailsElement>(`details[data-block-id="${id}"]`)];

describe("BlockList", () => {
  it("starts every headed section collapsed and opens them all together", () => {
    render(<Harness blocks={sectionBlocks} />);
    expect(detail("b1")!.open).toBe(false);

    fireEvent.click(screen.getByRole("button", { name: "Open all" }));

    expect(detail("b1")!.open).toBe(true);
    expect(detail("b2")!.open).toBe(true);
  });

  it("labels a section's summary with its heading text, not its markup", () => {
    render(<Harness blocks={[{ id: "m1", type: "prose", heading: "↳ **Borchardt** triad", text: "One", claims: [] }]} />);
    expect(detail("m1")!.querySelector("summary")).toHaveAttribute("aria-label", "Borchardt triad");
  });

  it("drops open sections when it is handed a different set of blocks", () => {
    // useState initializes once, so without an identity check a mounted list keeps the previous
    // surface's open sections — a playbook opening pre-expanded because a topic was.
    const { rerender } = render(<Harness blocks={sectionBlocks} />);
    fireEvent.click(screen.getByRole("button", { name: "Open all" }));
    expect(detail("b1")!.open).toBe(true);

    rerender(<Harness blocks={otherBlocks} />);

    expect(detail("c1")!.open).toBe(false);
    expect(screen.getByRole("button", { name: "Open all" })).toBeInTheDocument();
  });

  it("opens the section a hash points at", async () => {
    window.history.replaceState({}, "", "/playbooks/x#b2");
    render(<Harness blocks={sectionBlocks} />);

    await flushFrame();

    expect(detail("b2")!.open).toBe(true);
  });

  it("tells CSS how many columns each table has so narrow ones wrap and wide ones scroll", () => {
    const tables: TopicBlock[] = [
      { id: "t3", type: "table", columns: ["Type", "Sign", "Action"], rows: [["A", "a1", "a2"]], claims: [] },
      { id: "t4", type: "table", columns: ["Type", "Sign", "Action", "Note"], rows: [["A", "a1", "a2", "a3"]], claims: [] },
    ];
    const { container } = render(<Harness blocks={tables} />);
    expect([...container.querySelectorAll("table")].map((table) => table.dataset.columns)).toEqual(["3", "4"]);
  });

  it("opens only the list that owns the hash target when two lists share a block id", async () => {
    // Block ids are unique within a topic or playbook, not across them, so two surfaces on one
    // page can both hold "b1". getElementById is global and resolves to the first; without the
    // containment guard the second list opens its own unrelated section as well. The positive
    // case above is what proves this one is not a false pass.
    window.history.replaceState({}, "", "/playbooks/x#b1");
    render(<><Harness blocks={sectionBlocks} /><Harness blocks={sectionBlocks} /></>);

    await flushFrame();

    const [owner, bystander] = allDetails("b1");
    expect(owner.open).toBe(true);
    expect(bystander.open).toBe(false);
  });

  it("draws a ↳ heading that repeats the title above as part of that section, not as a second row", () => {
    const { container } = render(<Harness blocks={repeated} />);

    expect([...container.querySelectorAll("details.section-block")].map((section) => section.id)).toEqual(["p1", "p4"]);
    expect(container.querySelectorAll("summary")).toHaveLength(2);
    expect(screen.getAllByText("Landmarks")).toHaveLength(1);
    const parent = detail("p1")!;
    for (const id of ["p2", "p3"]) {
      const part = container.querySelector(`[data-block-id="${id}"]`)!;
      expect(part.parentElement).toBe(parent);
      expect(part.querySelector("summary, h2, h3")).toBeNull();
    }
    expect(parent).toHaveTextContent("Parent text");
    expect(parent).toHaveTextContent("Merged item");
    // A merged callout keeps its tone and icon; only its repeated title is gone.
    expect(parent.querySelector(".warning-block.tone-danger .callout-icon")).not.toBeNull();
    expect(parent.querySelector(".warning-block")).toHaveTextContent("Merged warning");
  });

  it("keeps a ↳ heading that differs as a sub-heading with its own row", () => {
    render(<Harness blocks={repeated} />);

    expect(detail("p4")).toHaveAttribute("data-level", "3");
    expect(detail("p4")!.querySelector("h3")).toHaveTextContent("A different title");
    expect(detail("p4")!.querySelector("summary")).toHaveAttribute("aria-label", "A different title");
  });

  it("keeps the thoracic outlet sub-heading as its own row on the shipped topic", () => {
    const blocks = libraryTopics.find((topic) => topic.slug === "thoracic-outlet-syndrome")!.approvedVersion!.blocks;
    const { container } = render(<Harness blocks={blocks} />);

    const row = container.querySelector("details[data-level='3'] > summary[aria-label='Current guidance on decompression']");
    expect(row).not.toBeNull();
    expect(row!.parentElement!.querySelector("h3")).toHaveTextContent("Current guidance on decompression");
  });

  it("opens the section that holds a merged block when a hash points at it", async () => {
    window.history.replaceState({}, "", "/playbooks/x#p3");
    render(<Harness blocks={repeated} />);

    await flushFrame();

    expect(detail("p1")!.open).toBe(true);
    expect(detail("p4")!.open).toBe(false);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it("opens and closes every row with Open all, which counts only the rows on the page", () => {
    const { container } = render(<Harness blocks={repeated} />);
    const open = () => [...container.querySelectorAll<HTMLDetailsElement>("details")].map((section) => section.open);

    fireEvent.click(screen.getByRole("button", { name: "Open all" }));
    expect(open()).toEqual([true, true]);
    fireEvent.click(screen.getByRole("button", { name: "Close all" }));
    expect(open()).toEqual([false, false]);
  });
});

describe("support mark", () => {
  const marks = (container: HTMLElement) => container.querySelectorAll("[aria-label='Unsupported']");

  it("shows and says nothing on a supported block", () => {
    const { container } = render(<Harness blocks={sectionBlocks.map((block) => ({ ...block, claims: [cited] }))} />);

    expect(marks(container)).toHaveLength(0);
    expect(container.querySelector(".support-mark, .supported, .block-actions, [title]")).toBeNull();
    expect(container).not.toHaveTextContent(/supported/i);
    expect(detail("b1")!.querySelector("summary")).toHaveAttribute("aria-label", "First");
  });

  it("marks an unsupported block once, at the end of its row, and speaks it once after the heading", () => {
    const { container } = render(<Harness blocks={[{ ...sectionBlocks[0], claims: [cited, uncited] }, sectionBlocks[1]]} />);

    expect(marks(container)).toHaveLength(1);
    const mark = marks(container)[0];
    expect(mark).toHaveAttribute("role", "img");
    expect(mark).toHaveAttribute("title", "Unsupported");
    expect(mark).toHaveTextContent("");
    expect(detail("b1")!.querySelector("summary > .block-actions")).toContainElement(mark as HTMLElement);
    expect(detail("b1")!.querySelector("summary")).toHaveAttribute("aria-label", "First, unsupported");
    expect(detail("b2")!.querySelector("summary")).toHaveAttribute("aria-label", "Second");
  });

  it("treats a claim with no citation id as unsupported, even when it says cited", () => {
    const { container } = render(<Harness blocks={[{ ...sectionBlocks[0], claims: [{ ...cited, citationIds: [] }] }]} />);

    expect(marks(container)).toHaveLength(1);
  });

  it("puts one mark on the section when a block merged into it is the unsupported one", () => {
    const { container } = render(<Harness blocks={repeated.map((block) => block.id === "p2" ? { ...block, claims: [uncited] } : block)} />);

    expect(marks(container)).toHaveLength(1);
    expect(detail("p1")!.querySelector("summary")).toHaveAttribute("aria-label", "Landmarks, unsupported");
    expect(detail("p4")!.querySelector("summary")).toHaveAttribute("aria-label", "A different title");
  });

  it("marks a callout in its heading row and a block with no heading at the head of the block", () => {
    const { container } = render(<Harness blocks={[
      { id: "w1", type: "warning", heading: "Caution", text: "Careful", claims: [uncited] },
      { id: "n1", type: "prose", text: "No heading", claims: [uncited] },
    ]} />);

    expect(marks(container)).toHaveLength(2);
    expect(container.querySelector("#w1 > .block-heading > .block-actions [aria-label='Unsupported']")).not.toBeNull();
    expect(container.querySelector("#n1 > .block-heading:first-child [aria-label='Unsupported']")).not.toBeNull();
  });
});

describe("callout icons", () => {
  const iconed = (container: HTMLElement, id: string) => container.querySelector(`#${id} > .block-heading > .callout-icon svg`);

  it("gives each tone an 18px decorative icon and no word of its own", () => {
    const blocks: TopicBlock[] = [
      { id: "s1", type: "summary", heading: "At a glance", text: "Summary", claims: [] },
      { id: "w1", type: "warning", heading: "Caution", text: "Caution text", claims: [] },
      { id: "w2", type: "warning", heading: "Danger", text: "Danger text", tone: "danger", claims: [] },
      { id: "w3", type: "warning", heading: "Pearl", text: "Pearl text", tone: "pearl", claims: [] },
      { id: "w4", type: "warning", heading: "Memory", text: "Memory text", tone: "mnemonic", claims: [] },
    ];
    const { container } = render(<Harness blocks={blocks} />);

    const shapes = blocks.map(({ id }) => { const svg = iconed(container, id)!; expect(svg, id).not.toBeNull(); expect(svg.getAttribute("width"), id).toBe("18"); return svg.innerHTML; });
    // Five tones, five different glyphs.
    expect(new Set(shapes).size).toBe(5);
    expect(container.querySelectorAll(".callout-icon").length).toBe(5);
    expect(container.querySelector(".warning-block.tone-pearl, .warning-block.tone-danger, .warning-block.tone-mnemonic")).not.toBeNull();
    expect(container.querySelector("#s1 h2")).toHaveTextContent("At a glance");
  });
});
