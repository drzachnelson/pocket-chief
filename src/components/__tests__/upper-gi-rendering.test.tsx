import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Block } from "@/components/block-list";
import { libraryTopics } from "@/content";
import { buildLinkIndex } from "@/lib/inline";

const links = buildLinkIndex(libraryTopics);
const upperGiTopics = libraryTopics.filter((topic) => topic.tags.includes("upper-gi"));

describe("upper GI topic rendering", () => {
  it("covers all six topics", () => expect(upperGiTopics).toHaveLength(6));

  for (const topic of upperGiTopics) {
    it(`renders every ${topic.title} block, table row and operative step`, () => {
      const blocks = topic.approvedVersion!.blocks.filter((block) => block.type !== "references");
      const { container } = render(<article>{blocks.map((block) => <Block key={block.id} block={block} expanded linkEntries={links} selfSlug={topic.slug} onToggle={() => {}} />)}</article>);
      expect(container.querySelectorAll("[data-block-id]"), topic.slug).toHaveLength(blocks.length);
      expect(container.querySelectorAll(".support-mark.supported"), topic.slug).toHaveLength(blocks.length);
      expect(container.querySelectorAll(".support-mark.unsupported"), topic.slug).toHaveLength(0);
      const rows = blocks.flatMap((block) => block.type === "table" ? block.rows : []);
      const steps = blocks.flatMap((block) => block.type === "sequence" ? block.steps : []);
      const nodes = blocks.flatMap((block) => block.type === "flow" ? block.nodes : []);
      expect(container.querySelectorAll("tbody tr"), topic.slug).toHaveLength(rows.length);
      expect(container.querySelectorAll(".sequence-list > li"), topic.slug).toHaveLength(steps.length);
      expect(container.querySelectorAll("[data-node-id]"), topic.slug).toHaveLength(nodes.length);
      const paragraphs = container.querySelectorAll("p");
      expect([...paragraphs].some((p) => p.textContent?.includes("[S1")), topic.slug).toBe(false);
    });
  }
});
