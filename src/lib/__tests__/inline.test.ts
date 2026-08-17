import { describe, expect, it } from "vitest";
import { buildLinkIndex, bulletDepth, createLinkScope, headingLevel, parseInline, stripMarkup } from "@/lib/inline";

const library = [
  { slug: "choledocholithiasis", title: "Choledocholithiasis", aliases: ["CBD stones", "CBD"] },
  { slug: "acute-cholangitis", title: "Acute cholangitis", aliases: [] },
  { slug: "cholangitis-drainage", title: "Cholangitis", aliases: [] },
  { slug: "fibroadenoma-vs-phyllodes-tumor", title: "Fibroadenoma vs. phyllodes tumor", aliases: [] },
];

const index = buildLinkIndex(library);
const scopeFor = (selfSlug: string) => createLinkScope(index, selfSlug);
const text = (value: string, selfSlug = "unrelated-topic") => parseInline(value, scopeFor(selfSlug));

describe("inline markup", () => {
  it("parses bold runs and leaves the surrounding text plain", () => {
    expect(parseInline("**Borchardt triad**: severe pain, retching, no NGT")).toEqual([
      { text: "Borchardt triad", bold: true },
      { text: ": severe pain, retching, no NGT" },
    ]);
  });

  it("parses an explicit cross-link", () => {
    expect(text("see [[Choledocholithiasis]] for the algorithm")).toEqual([
      { text: "see " },
      { text: "Choledocholithiasis", slug: "choledocholithiasis" },
      { text: " for the algorithm" },
    ]);
  });

  it("auto-links an unmarked term, punctuation in the title and all", () => {
    expect(text("Compare Fibroadenoma vs. phyllodes tumor on core biopsy")).toEqual([
      { text: "Compare " },
      { text: "Fibroadenoma vs. phyllodes tumor", slug: "fibroadenoma-vs-phyllodes-tumor" },
      { text: " on core biopsy" },
    ]);
  });

  it("composes bold and link on one segment", () => {
    expect(text("**Choledocholithiasis** is the working diagnosis")).toEqual([
      { text: "Choledocholithiasis", bold: true, slug: "choledocholithiasis" },
      { text: " is the working diagnosis" },
    ]);
  });

  it("renders an unresolvable cross-link as plain text", () => {
    expect(text("see [[Whipple procedure]] instead")).toEqual([
      { text: "see " },
      { text: "Whipple procedure" },
      { text: " instead" },
    ]);
  });

  it("never links a topic to itself", () => {
    expect(text("Choledocholithiasis presents with jaundice", "choledocholithiasis")).toEqual([
      { text: "Choledocholithiasis presents with jaundice" },
    ]);
  });

  it("links a term at most once per scope, across every segment of the block", () => {
    const scope = scopeFor("unrelated-topic");
    expect(parseInline("**Choledocholithiasis** is confirmed", scope)).toEqual([
      { text: "Choledocholithiasis", bold: true, slug: "choledocholithiasis" },
      { text: " is confirmed" },
    ]);
    expect(parseInline("Choledocholithiasis recurs after clearance", scope)).toEqual([
      { text: "Choledocholithiasis recurs after clearance" },
    ]);
  });

  it("lets an explicit link claim the term so the auto-linker does not repeat it", () => {
    const scope = scopeFor("unrelated-topic");
    parseInline("see [[Choledocholithiasis]]", scope);
    expect(parseInline("Choledocholithiasis again", scope)).toEqual([{ text: "Choledocholithiasis again" }]);
  });

  it("gives an overlapping span to the longest matching key", () => {
    expect(text("Acute cholangitis is the emergency")).toEqual([
      { text: "Acute cholangitis", slug: "acute-cholangitis" },
      { text: " is the emergency" },
    ]);
  });

  it("excludes keys shorter than four characters and sorts longest key first", () => {
    expect(index.map((entry) => entry.key)).not.toContain("cbd");
    expect(index.map((entry) => entry.key.length)).toEqual([...index.map((entry) => entry.key.length)].sort((a, b) => b - a));
    expect(index.find((entry) => entry.key === "cbd stones")).toEqual({ key: "cbd stones", slug: "choledocholithiasis", title: "Choledocholithiasis" });
  });

  it("parses emphasis only when no scope is supplied", () => {
    expect(parseInline("Acute cholangitis needs drainage")).toEqual([{ text: "Acute cholangitis needs drainage" }]);
    expect(parseInline("Acute cholangitis needs drainage", createLinkScope([], "unrelated-topic"))).toEqual([{ text: "Acute cholangitis needs drainage" }]);
  });

  it("only matches whole words", () => {
    expect(text("precholangitislike wording stays intact")).toEqual([{ text: "precholangitislike wording stays intact" }]);
  });
});

describe("markup stripping", () => {
  it("returns the original unmarked sentence", () => {
    expect(stripMarkup("- **Borchardt triad**: pain, retching, no NGT — see [[Choledocholithiasis]]")).toBe("Borchardt triad: pain, retching, no NGT — see Choledocholithiasis");
    expect(stripMarkup("↳ Acute pulmonary exacerbations")).toBe("Acute pulmonary exacerbations");
    expect(stripMarkup("-- Increases the yield of the second look")).toBe("Increases the yield of the second look");
  });

  it("leaves unmarked text untouched", () => {
    expect(stripMarkup("Transcystic clearance is first line")).toBe("Transcystic clearance is first line");
  });
});

describe("indent prefixes", () => {
  it("reads and removes bullet depth", () => {
    expect(bulletDepth("Two or more CFTR modulators")).toEqual({ depth: 0, text: "Two or more CFTR modulators" });
    expect(bulletDepth("- Two or more CFTR modulators")).toEqual({ depth: 1, text: "Two or more CFTR modulators" });
    expect(bulletDepth("-- Increases the yield")).toEqual({ depth: 2, text: "Increases the yield" });
    // An em-dash-style lead-in is prose, not an indent marker.
    expect(bulletDepth("--- Increases the yield")).toEqual({ depth: 0, text: "--- Increases the yield" });
  });

  it("reads and removes the subsection prefix", () => {
    expect(headingLevel("Operative steps")).toEqual({ level: 2, text: "Operative steps" });
    expect(headingLevel("↳ Acute pulmonary exacerbations")).toEqual({ level: 3, text: "Acute pulmonary exacerbations" });
  });
});

describe("malformed markup", () => {
  it("renders unmatched markers literally instead of throwing", () => {
    for (const value of ["**unbalanced bold", "unclosed [[link", "trailing ]] bracket", "****", "[[]]", "[[Choledocholithiasis]", ""]) {
      expect(parseInline(value, scopeFor("unrelated-topic")).map((part) => part.text).join("")).toBe(value);
    }
    expect(parseInline("**unbalanced bold")).toEqual([{ text: "**unbalanced bold" }]);
    expect(stripMarkup("unclosed [[link")).toBe("unclosed [[link");
  });

  it("survives a stray marker pair without throwing or losing the sentence", () => {
    for (const value of ["a ** b ** c ** d", "**", "[[", "]]**[[", "**[[Choledocholithiasis]]**"]) {
      expect(() => parseInline(value, scopeFor("unrelated-topic"))).not.toThrow();
    }
    expect(parseInline("**[[Choledocholithiasis]]**", scopeFor("unrelated-topic"))).toEqual([{ text: "Choledocholithiasis", bold: true, slug: "choledocholithiasis" }]);
  });
});
