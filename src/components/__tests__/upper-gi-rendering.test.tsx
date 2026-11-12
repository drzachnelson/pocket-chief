import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlockList, useBlockCollapse } from "@/components/block-list";
import { libraryTopics } from "@/content";
import { buildLinkIndex, groupSections, isCallout } from "@/lib/inline";
import { topicContents } from "@/lib/reader-contents";
import type { Topic, TopicBlock } from "@/lib/types";

const links = buildLinkIndex(libraryTopics);
const upperGiTopics = libraryTopics.filter((topic) => topic.tags.includes("upper-gi"));

function Page({ blocks, slug }: { blocks: TopicBlock[]; slug: string }) {
  const collapse = useBlockCollapse(blocks);
  return <BlockList blocks={blocks} collapse={collapse} linkEntries={links} selfSlug={slug} />;
}

const renderBlocks = (topic: Topic) => {
  const blocks = topic.approvedVersion!.blocks.filter((block) => block.type !== "references");
  return { blocks, container: render(<Page blocks={blocks} slug={topic.slug} />).container };
};

describe("upper GI topic rendering", () => {
  it("covers all six topics", () => expect(upperGiTopics).toHaveLength(6));

  for (const topic of upperGiTopics) {
    it(`renders every ${topic.title} block, table row and operative step`, () => {
      const { blocks, container } = renderBlocks(topic);
      expect(container.querySelectorAll("[data-block-id]"), topic.slug).toHaveLength(blocks.length);
      // Supported blocks show and say nothing, so no mark of any kind appears on a shipped topic.
      expect(container.querySelectorAll(".support-mark"), topic.slug).toHaveLength(0);
      expect(container.querySelectorAll("[aria-label='Unsupported']"), topic.slug).toHaveLength(0);
      const rows = blocks.flatMap((block) => block.type === "table" ? block.rows : []);
      const steps = blocks.flatMap((block) => block.type === "sequence" ? block.steps : []);
      const nodes = blocks.flatMap((block) => block.type === "flow" ? block.nodes : []);
      expect(container.querySelectorAll("tbody tr"), topic.slug).toHaveLength(rows.length);
      expect(container.querySelectorAll(".sequence-list > li"), topic.slug).toHaveLength(steps.length);
      // Every flow reads as an outline, whether or not it is also drawn, so each node is a step in one.
      const outlineSteps = new Set([...container.querySelectorAll(".flow-outline .flow-step")].map((step) => step.textContent));
      for (const node of nodes) expect(outlineSteps.has(node.label), `${topic.slug}: ${node.label}`).toBe(true);
      const paragraphs = container.querySelectorAll("p");
      expect([...paragraphs].some((p) => p.textContent?.includes("[S1")), topic.slug).toBe(false);
    });

    it(`shows each ${topic.title} section once, with no row repeating the title above it`, () => {
      const { blocks, container } = renderBlocks(topic);
      const groups = groupSections(blocks);
      const rows = [...container.querySelectorAll<HTMLElement>("details.section-block > summary")];
      expect(rows, topic.slug).toHaveLength(groups.filter(({ block }) => block.heading && !isCallout(block)).length);
      const labels = rows.map((row) => row.getAttribute("aria-label"));
      labels.forEach((label, index) => { if (index) expect(label, `${topic.slug}: row ${index} repeats the row above`).not.toBe(labels[index - 1]); });
      // A merged block keeps its id and sits inside the section it repeats, so its link still lands and opens that section.
      for (const { block, merged } of groups) for (const part of merged) {
        const element = container.querySelector(`[data-block-id="${part.id}"]`)!;
        expect(element.closest("details")?.getAttribute("data-block-id"), `${topic.slug}: ${part.id}`).toBe(block.id);
        expect(element.querySelector("summary, h2, h3"), `${topic.slug}: ${part.id} drew a heading of its own`).toBeNull();
      }
    });
  }

  it("draws one row for each repeated EGD heading instead of a parent row and an indented copy", () => {
    const egd = upperGiTopics.find((topic) => topic.slug === "esophagogastroduodenoscopy")!;
    const { blocks, container } = renderBlocks(egd);
    const before = blocks.filter((block) => block.heading && !isCallout(block)).length;
    const merged = groupSections(blocks).reduce((total, group) => total + group.merged.length, 0);
    expect(merged).toBeGreaterThan(0);
    expect(container.querySelectorAll("details.section-block")).toHaveLength(before - merged);
  });

  it("lists each EGD section once in Contents, and every entry has a block on the page", () => {
    const egd = upperGiTopics.find((topic) => topic.slug === "esophagogastroduodenoscopy")!;
    const { container } = renderBlocks(egd);
    const sections = topicContents(egd.slug)!.sections;
    sections.forEach((section, index) => {
      expect(container.querySelector(`[id="${section.id}"]`), section.label).not.toBeNull();
      if (index) expect(section.label, `${section.id} repeats the entry above`).not.toBe(sections[index - 1].label);
    });
  });
});
