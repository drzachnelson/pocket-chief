import { describe, expect, it } from "vitest";
import { upperGiDraftTopics } from "@/content/drafts/upper-gi";
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

describe("upper GI study-guide drafts", () => {
  it("contains the six requested disease and procedure guides", () => {
    expect(upperGiDraftTopics.map((topic) => topic.slug)).toEqual(slugs);
  });

  it("cannot silently approve the guides or expose them through the published library", () => {
    for (const topic of upperGiDraftTopics) {
      expect(topic.approvedVersion, topic.slug).toBeNull();
      expect(topic.versions, topic.slug).toHaveLength(1);
      const version = topic.versions[0];
      expect(version.status, topic.slug).toBe("draft");
      expect(version.reviewedAt, topic.slug).toBeUndefined();
      expect(version.reviewedBy, topic.slug).toBeUndefined();
      expect(version.warnings.join(" "), topic.slug).toContain("pending Zach's clinical review");
      expect(libraryTopics.some((published) => published.slug === topic.slug), topic.slug).toBe(false);
      expect(listTopics().some((published) => published.slug === topic.slug), topic.slug).toBe(false);
      expect(getTopicBySlug(topic.slug), topic.slug).toBeNull();
      expect(searchLibrary(topic.title).some((published) => published.slug === topic.slug), topic.slug).toBe(false);
    }
  });

  it("resolves every draft factual unit to registered and allowed sources", () => {
    const known = new Set(suppliedSources.map((source) => source.id));
    for (const topic of upperGiDraftTopics) {
      const version = topic.versions[0];
      expect(supportWarnings(version.blocks, new Set(version.sourceIds)), topic.slug).toEqual([]);
      for (const id of version.sourceIds) expect(known, topic.slug).toContain(id);
      for (const block of version.blocks) {
        expect(block.claims.map((claim) => claim.text), `${topic.slug}/${block.id}`).toEqual(factualUnits(block));
        for (const claim of block.claims) for (const id of claim.citationIds) expect(known, block.id).toContain(id);
      }
      expect(version.blocks[0].type, topic.slug).toBe("summary");
      expect(version.blocks.at(-1)?.type, topic.slug).toBe("references");
      expect(version.blocks.some((block) => block.heading?.startsWith("Board answer versus current practice")), topic.slug).toBe(true);
    }
  });

  it("preserves SCORE placement and identifiers without colliding with published content", () => {
    const all = [...libraryTopics, ...upperGiDraftTopics];
    expect(new Set(all.map((topic) => topic.id)).size).toBe(all.length);
    expect(new Set(all.map((topic) => topic.slug)).size).toBe(all.length);
    const versionIds = all.flatMap((topic) => topic.versions.map((version) => version.id));
    expect(new Set(versionIds).size).toBe(versionIds.length);
    expect(new Set(suppliedSources.map((source) => source.id)).size).toBe(suppliedSources.length);
    for (const topic of upperGiDraftTopics) {
      const ancestry = taxonomyAncestry(topic.scoreNodeId, taxonomy);
      expect(ancestry.length, topic.slug).toBeGreaterThan(1);
      expect(topic.scoreCategory, topic.slug).toBe(ancestry.map((node) => node.id === "score" ? "SCORE" : node.title).join(" · "));
    }
  });

  it("keeps editorial citation tokens, local file paths and Markdown links out of rendered clinical text", () => {
    for (const topic of upperGiDraftTopics) {
      for (const block of topic.versions[0].blocks) {
        for (const unit of factualUnits(block)) {
          expect(unit, block.id).not.toMatch(/\[S\d|\/Users\/|\]\([^)]*\.md|\b(?:TODO|TBD|FIXME)\b/);
        }
      }
    }
  });
});
