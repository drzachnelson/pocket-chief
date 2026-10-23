import { describe, expect, it } from "vitest";
import { libraryTopics, suppliedSources, taxonomy } from "@/content";
import { factualUnits, supportWarnings } from "@/lib/editorial";
import { getTopicBySlug, listTopics, searchLibrary } from "@/lib/library";
import { taxonomyAncestry } from "@/lib/taxonomy";

const slugs = [
  "peptic-ulcer-disease",
  "gastroduodenal-perforation-repair",
  "vagotomy-and-drainage",
  "upper-gastrointestinal-bleeding",
  "stress-gastritis",
  "esophagogastroduodenoscopy",
];
const upperGiTopics = slugs.map((slug) => libraryTopics.find((topic) => topic.slug === slug)!);

describe("upper GI library topics", () => {
  it("publishes the six disease and procedure topics as regular approved library entries", () => {
    for (const [index, topic] of upperGiTopics.entries()) {
      expect(topic, slugs[index]).toBeDefined();
      expect(topic.approvedVersion?.status, topic.slug).toBe("approved");
      expect(topic.versions, topic.slug).toHaveLength(1);
      expect(topic.tags, topic.slug).not.toContain("clinical-review-pending");
      expect(listTopics().some((published) => published.slug === topic.slug), topic.slug).toBe(true);
      expect(getTopicBySlug(topic.slug)?.id, topic.slug).toBe(topic.id);
    }
  });

  it("ranks each topic first for its title and every alias", () => {
    for (const topic of upperGiTopics) {
      for (const query of [topic.title, ...topic.aliases]) {
        expect(searchLibrary(query)[0]?.slug, `${topic.slug}: "${query}"`).toBe(topic.slug);
      }
    }
  });

  it("resolves every factual unit to registered and allowed sources", () => {
    const known = new Set(suppliedSources.map((source) => source.id));
    for (const topic of upperGiTopics) {
      const version = topic.approvedVersion!;
      expect(supportWarnings(version.blocks, new Set(version.sourceIds)), topic.slug).toEqual([]);
      for (const id of version.sourceIds) expect(known, topic.slug).toContain(id);
      expect(version.blocks[0].type, topic.slug).toBe("summary");
      expect(version.blocks.at(-1)?.type, topic.slug).toBe("references");
      expect(version.blocks.some((block) => block.heading?.startsWith("Board answer versus current practice")), topic.slug).toBe(true);
    }
  });

  it("keeps the 4700-4735 identifiers and SCORE placement", () => {
    for (const topic of upperGiTopics) {
      expect(topic.id, topic.slug).toMatch(/^00000000-0000-4000-8000-00000000472[0-5]$/);
      expect(topic.approvedVersion!.id, topic.slug).toMatch(/^00000000-0000-4000-8000-00000000473[0-5]$/);
      const ancestry = taxonomyAncestry(topic.scoreNodeId, taxonomy);
      expect(ancestry.length, topic.slug).toBeGreaterThan(1);
      expect(topic.scoreCategory, topic.slug).toBe(ancestry.map((node) => node.id === "score" ? "SCORE" : node.title).join(" · "));
    }
  });

  it("keeps editorial citation tokens, local file paths and Markdown links out of rendered clinical text", () => {
    for (const topic of upperGiTopics) {
      for (const block of topic.approvedVersion!.blocks) {
        for (const unit of factualUnits(block)) {
          expect(unit, block.id).not.toMatch(/\[S\d|\/Users\/|\]\([^)]*\.md|\b(?:TODO|TBD|FIXME)\b/);
        }
      }
    }
  });
});
