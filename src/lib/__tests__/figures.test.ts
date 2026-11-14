import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { libraryPlaybooks, libraryTopics } from "@/lib/seed";
import type { TopicBlock } from "@/lib/types";

/**
 * Figures are original SVG drawings (AGENTS.md, Editorial Rules), never a copy of a licensed photo or plate.
 * A raster file, or an SVG that wraps one in <image> or a data: URI, is how a copied picture would get in, so
 * both fail here. This is a tripwire, not proof of originality: it cannot tell a hand-built drawing from a trace.
 */
const MEDIA = join(import.meta.dirname, "..", "..", "..", "public", "media");
const shipped = () => (existsSync(MEDIA) ? readdirSync(MEDIA) : []);

/** The w3.org namespace URLs every SVG declares are fine; any other URL or embedded payload is not. */
const svgProblems = (svg: string): string[] => [
  ...(/<svg[^>]*\sviewBox="/.test(svg) ? [] : ["has no viewBox, so it cannot scale"]),
  ...(/<image[\s>]/i.test(svg) ? ["embeds an <image>"] : []),
  ...(/data:|https?:\/\/(?!www\.w3\.org\/)/i.test(svg) ? ["carries a data: or remote URL"] : []),
  ...(/<script|<foreignObject|\son[a-z]+=/i.test(svg) ? ["carries script or foreignObject"] : []),
];

const imageBlocks = [
  ...libraryTopics.flatMap((topic) => topic.approvedVersion!.blocks.map((block) => [`${topic.slug}/${block.id}`, block] as [string, TopicBlock])),
  ...libraryPlaybooks.flatMap((playbook) => playbook.blocks.map((block) => [`playbooks/${playbook.slug}/${block.id}`, block] as [string, TopicBlock])),
].flatMap(([label, block]) => (block.type === "image" ? [[label, block] as const] : []));

describe("figures", () => {
  it("ships only SVG files in public/media", () => {
    for (const file of shipped()) expect(file, file).toMatch(/\.svg$/);
  });

  it("keeps every shipped figure a plain vector drawing", () => {
    for (const file of shipped()) expect(svgProblems(readFileSync(join(MEDIA, file), "utf8")), file).toEqual([]);
  });

  it("catches a raster hidden inside an SVG", () => {
    expect(svgProblems('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10"/></svg>')).toEqual([]);
    expect(svgProblems('<svg viewBox="0 0 10 10"><image href="data:image/png;base64,AAAA"/></svg>')).toEqual(["embeds an <image>", "carries a data: or remote URL"]);
    expect(svgProblems('<svg><script>alert(1)</script></svg>')).toEqual(["has no viewBox, so it cannot scale", "carries script or foreignObject"]);
  });

  it("points every image block at a shipped figure and gives it alt text", () => {
    for (const [label, block] of imageBlocks) {
      expect(block.mediaId, label).toMatch(/^[a-z0-9-]+\.svg$/);
      expect(existsSync(join(MEDIA, block.mediaId)), `${label} -> public/media/${block.mediaId}`).toBe(true);
      expect(block.alt.trim(), `${label} alt`).not.toBe("");
    }
  });
});
