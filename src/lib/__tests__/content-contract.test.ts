import { describe, expect, it } from "vitest";
import { factualUnits, supportWarnings } from "@/lib/editorial";
import { stripMarkup } from "@/lib/inline";
import { libraryPlaybooks, libraryTopics, suppliedSources, taxonomy } from "@/lib/seed";
import { taxonomyAncestry } from "@/lib/taxonomy";
import type { Topic, TopicBlock } from "@/lib/types";

const blocksOf = (topic: Topic) => topic.approvedVersion!.blocks;

// Every invariant below walks both corpora. Playbooks reuse TopicBlock, so the renderer keys,
// the inline markup rules and the claim-support invariant apply to them identically — the only
// thing that differs is where the blocks and the source allow-list hang off the entity.
const authored: Array<{ label: string; blocks: TopicBlock[]; sourceIds: string[] }> = [
  ...libraryTopics.map((topic) => ({ label: topic.slug, blocks: blocksOf(topic), sourceIds: topic.approvedVersion!.sourceIds })),
  ...libraryPlaybooks.map((playbook) => ({ label: `playbooks/${playbook.slug}`, blocks: playbook.blocks, sourceIds: playbook.sourceIds })),
];
const eachBlock = (): Array<[string, TopicBlock]> => authored.flatMap(({ label, blocks }) => blocks.map((block) => [`${label}/${block.id}`, block] as [string, TopicBlock]));
const duplicates = (values: string[]) => values.filter((value, index) => values.indexOf(value) !== index);

describe("seeded content contract", () => {
  it("links every rendered unit to a supplied source", () => {
    for (const { label, blocks, sourceIds } of authored) {
      expect(supportWarnings(blocks, new Set(sourceIds)), label).toEqual([]);
    }
  });

  it("gives every factual unit exactly one claim, in order", () => {
    for (const [label, block] of eachBlock()) {
      const units = factualUnits(block);
      expect(block.claims.map((claim) => claim.text), label).toEqual(units);
    }
  });

  it("keeps table cells unique enough for React keys", () => {
    for (const [label, block] of eachBlock()) {
      if (block.type !== "table") continue;
      // Rows key on row[0]; cells key on `${row[0]}-${cell}`.
      expect(duplicates(block.rows.map((row) => row[0])), `${label} row headers`).toEqual([]);
      for (const row of block.rows) expect(duplicates(row), `${label} row "${row[0]}"`).toEqual([]);
      expect(block.rows.every((row) => row.length === block.columns.length), `${label} column count`).toBe(true);
    }
  });

  it("keeps list and step keys unique", () => {
    for (const [label, block] of eachBlock()) {
      if (block.type === "bullets") expect(duplicates(block.items), label).toEqual([]);
      if (block.type === "sequence") expect(duplicates(block.steps.map((step) => step.title)), label).toEqual([]);
    }
  });

  it("keeps flow graphs renderable — one root, resolvable edges, no cycles", () => {
    for (const [label, block] of eachBlock()) {
      if (block.type !== "flow") continue;
      const ids = block.nodes.map((node) => node.id);
      expect(duplicates(ids), `${label} node ids`).toEqual([]);
      for (const edge of block.edges) {
        expect(ids, `${label} edge from ${edge.from}`).toContain(edge.from);
        expect(ids, `${label} edge to ${edge.to}`).toContain(edge.to);
      }
      const targeted = new Set(block.edges.map((edge) => edge.to));
      expect(ids.filter((id) => !targeted.has(id)), `${label} roots`).toHaveLength(1);

      const depth = new Map<string, number>();
      const walk = (id: string, seen: string[]): number => {
        expect(seen, `${label} cycle`).not.toContain(id);
        if (depth.has(id)) return depth.get(id)!;
        const incoming = block.edges.filter((edge) => edge.to === id);
        const value = incoming.length ? Math.max(...incoming.map((edge) => walk(edge.from, [...seen, id]) + 1)) : 0;
        depth.set(id, value);
        return value;
      };
      for (const id of ids) walk(id, []);
      // Every node must be reachable from the root, or the renderer drops it.
      expect([...depth.keys()].sort(), `${label} reachability`).toEqual([...ids].sort());
    }
  });

  it("keeps identifiers unique across the library", () => {
    expect(duplicates(libraryTopics.map((topic) => topic.id))).toEqual([]);
    expect(duplicates(libraryTopics.map((topic) => topic.slug))).toEqual([]);
    expect(duplicates(libraryTopics.map((topic) => topic.approvedVersion!.id))).toEqual([]);
    expect(duplicates(libraryPlaybooks.map((playbook) => playbook.id))).toEqual([]);
    expect(duplicates(libraryPlaybooks.map((playbook) => playbook.procedureId))).toEqual([]);
    // Slugs are unique across both corpora, not within each: they share a link index and will
    // share one ranked result list.
    expect(duplicates([...libraryTopics.map((topic) => topic.slug), ...libraryPlaybooks.map((playbook) => playbook.slug)])).toEqual([]);
    for (const { label, blocks } of authored) {
      expect(duplicates(blocks.map((block) => block.id)), label).toEqual([]);
      expect(duplicates(blocks.flatMap((block) => block.claims.map((claim) => claim.id))), label).toEqual([]);
    }
  });

  it("keeps playbook facets well formed and their related topics resolvable", () => {
    const slugs = new Set(libraryTopics.map((topic) => topic.slug));
    const approaches = new Set(["open", "laparoscopic", "robotic", "endovascular"]);
    for (const playbook of libraryPlaybooks) {
      // procedureId is the join key attending notes carry, so it has to stay stable and
      // machine-shaped rather than drift with the title.
      expect(playbook.procedureId, playbook.slug).toMatch(/^[a-z][a-z0-9_]*$/);
      expect(approaches, playbook.slug).toContain(playbook.approach);
      expect(playbook.specialty.length, playbook.slug).toBeGreaterThan(0);
      for (const related of playbook.relatedTopicSlugs ?? []) expect(slugs, `${playbook.slug} related`).toContain(related);
    }
  });

  it("resolves every citation and reference to a supplied source", () => {
    const known = new Set(suppliedSources.map((source) => source.id));
    for (const [label, block] of eachBlock()) {
      for (const claim of block.claims) for (const id of claim.citationIds) expect(known, `${label} citation`).toContain(id);
      if (block.type === "references") for (const id of block.sourceIds) expect(known, `${label} reference`).toContain(id);
    }
    for (const { label, sourceIds } of authored) for (const id of sourceIds) expect(known, label).toContain(id);
  });

  it("matches every topic to a taxonomy node and its printed category", () => {
    for (const topic of libraryTopics) {
      const ancestry = taxonomyAncestry(topic.scoreNodeId, taxonomy);
      expect(ancestry.length, `${topic.slug} taxonomy node`).toBeGreaterThan(0);
      const printed = ancestry.map((node) => node.title === "SCORE Curriculum" ? "SCORE" : node.title).join(" · ");
      expect(topic.scoreCategory, `${topic.slug} category`).toBe(printed);
      expect(topic.tags, `${topic.slug} tags`).toEqual(topic.approvedVersion!.tags);
    }
  });

  // Inline markup lives inside the plain strings, so nothing in the type system, the zod
  // schema or the SQL can catch a malformed marker. These three guards are the only thing
  // standing between a stray asterisk and a claim whose text no longer reads as English.
  it("balances every inline marker", () => {
    for (const [label, block] of eachBlock()) {
      for (const unit of factualUnits(block)) {
        expect(unit.split("**").length % 2, `${label}: unbalanced ** in "${unit.slice(0, 70)}"`).toBe(1);
        expect((unit.match(/\[\[/g) ?? []).length, `${label}: unclosed [[ in "${unit.slice(0, 70)}"`).toBe((unit.match(/\]\]/g) ?? []).length);
        expect(unit, `${label}: bold belongs outside the link, as **[[Term]]**`).not.toMatch(/\[\[[^\]]*\*\*/);
      }
    }
  });

  // `normalize()` in search.ts strips every non-alphanumeric, so a marker that splits a word
  // turns one search token into two broken ones — "chole**docho**lithiasis" stops matching
  // "choledocholithiasis" entirely. Whole-word wrapping is what keeps the index intact.
  it("never lets a marker split a word", () => {
    for (const [label, block] of eachBlock()) {
      for (const unit of factualUnits(block)) {
        expect(unit, `${label}: ** opens mid-word in "${unit.slice(0, 70)}"`).not.toMatch(/[A-Za-z0-9]\*\*[A-Za-z0-9]/);
      }
    }
  });

  // decision-flow.tsx builds its accessible edge descriptions from stripped labels, so a marker
  // that survives stripping is read aloud verbatim.
  it("strips every inline marker without emptying a factual unit", () => {
    for (const [label, block] of eachBlock()) {
      for (const unit of factualUnits(block)) {
        const stripped = stripMarkup(unit);
        expect(stripped, `${label}: stripMarkup left markers behind`).not.toMatch(/\*\*|\[\[|\]\]/);
        expect(stripped.length, `${label}: stripMarkup emptied a factual unit`).toBeGreaterThan(0);
      }
    }
  });

});
