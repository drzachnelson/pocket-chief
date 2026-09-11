import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BlockList, useBlockCollapse } from "@/components/block-list";
import type { TopicBlock } from "@/lib/types";

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
});
