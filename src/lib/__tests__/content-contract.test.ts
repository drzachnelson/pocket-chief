import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { factualUnits, supportWarnings } from "@/lib/editorial";
import { stripMarkup } from "@/lib/inline";
import { choledoBlocks, demoTopics, suppliedSources, taxonomy } from "@/lib/seed";
import { taxonomyAncestry } from "@/lib/taxonomy";
import type { Topic, TopicBlock } from "@/lib/types";

const blocksOf = (topic: Topic) => topic.approvedVersion!.blocks;
const eachBlock = (): Array<[string, TopicBlock]> => demoTopics.flatMap((topic) => blocksOf(topic).map((block) => [`${topic.slug}/${block.id}`, block] as [string, TopicBlock]));
const duplicates = (values: string[]) => values.filter((value, index) => values.indexOf(value) !== index);

describe("seeded content contract", () => {
  it("links every rendered unit to a supplied source", () => {
    for (const topic of demoTopics) {
      const version = topic.approvedVersion!;
      expect(supportWarnings(version.blocks, new Set(version.sourceIds)), topic.slug).toEqual([]);
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
    expect(duplicates(demoTopics.map((topic) => topic.id))).toEqual([]);
    expect(duplicates(demoTopics.map((topic) => topic.slug))).toEqual([]);
    expect(duplicates(demoTopics.map((topic) => topic.approvedVersion!.id))).toEqual([]);
    for (const topic of demoTopics) {
      expect(duplicates(blocksOf(topic).map((block) => block.id)), topic.slug).toEqual([]);
      expect(duplicates(blocksOf(topic).flatMap((block) => block.claims.map((claim) => claim.id))), topic.slug).toEqual([]);
    }
  });

  it("resolves every citation and reference to a supplied source", () => {
    const known = new Set(suppliedSources.map((source) => source.id));
    for (const [label, block] of eachBlock()) {
      for (const claim of block.claims) for (const id of claim.citationIds) expect(known, `${label} citation`).toContain(id);
      if (block.type === "references") for (const id of block.sourceIds) expect(known, `${label} reference`).toContain(id);
    }
    for (const topic of demoTopics) for (const id of topic.approvedVersion!.sourceIds) expect(known, topic.slug).toContain(id);
  });

  it("matches every topic to a taxonomy node and its printed category", () => {
    for (const topic of demoTopics) {
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

  it("keeps markup out of the text Anki exports", () => {
    for (const [label, block] of eachBlock()) {
      for (const unit of factualUnits(block)) {
        const stripped = stripMarkup(unit);
        expect(stripped, `${label}: stripMarkup left markers behind`).not.toMatch(/\*\*|\[\[|\]\]/);
        expect(stripped.length, `${label}: stripMarkup emptied a factual unit`).toBeGreaterThan(0);
      }
    }
  });

  // Scans every migration rather than one named file: `ensure_launch_topic` has been recreated
  // once already (202608160001, to put `extensions` on its search_path for pgcrypto's digest),
  // and applied migrations are immutable, so each recreation copies the pinned digest forward.
  // Checking only the original would let a stale pin in the newest — the one actually live —
  // pass unnoticed.
  it("holds the launch topic to the digest pinned in every Supabase migration", () => {
    const dir = "supabase/migrations";
    const digest = createHash("sha256").update(JSON.stringify(choledoBlocks), "utf8").digest("hex");
    const pins = readdirSync(dir).filter((file) => file.endsWith(".sql")).flatMap((file) =>
      [...readFileSync(join(dir, file), "utf8").matchAll(/'([0-9a-f]{64})' then raise exception 'Launch topic content did not match/g)].map((match) => [file, match[1]] as const));
    expect(pins.length, "no migration pins the launch topic digest").toBeGreaterThan(0);
    for (const [file, pinned] of pins) expect(digest, `${file} pins a stale digest — choledoBlocks must serialize byte-identically or ensure_launch_topic rejects it`).toBe(pinned);
  });
});
