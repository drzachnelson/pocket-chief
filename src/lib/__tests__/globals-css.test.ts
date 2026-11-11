import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Tripwire for the type scale, ink and chrome (DESIGN.md, Typography and Components). It reads
 * `globals.css` as text, because jsdom does no layout and these are properties of the stylesheet,
 * not of any one page. A later slice that reintroduces a 10px label, an uppercase eyebrow, the faint
 * grey, a stray weight, a blur, a one-off shadow, a literal duration or a hover that moves fails
 * here instead of shipping.
 */
const css = readFileSync(join(import.meta.dirname, "..", "..", "app", "globals.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

interface Rule { selector: string; declarations: Map<string, string> }

// Nested at-rules fall out for free: the prelude of `@media (…) {` can never match `[^{}]+ {[^{}]*}`
// because its body contains a `{`, so the regex lands on the inner rules instead.
const rules: Rule[] = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({
  // The first rule follows `@import …;`, which the prelude pattern swallows.
  selector: selector.slice(selector.lastIndexOf(";") + 1).trim(),
  declarations: new Map(body.split(";").flatMap((line) => { const at = line.indexOf(":"); return at < 0 ? [] : [[line.slice(0, at).trim(), line.slice(at + 1).trim()] as [string, string]]; })),
}));
const declared = (property: string) => rules.flatMap(({ selector, declarations }) => declarations.has(property) ? [{ selector, value: declarations.get(property)! }] : []);

const root = rules.find((rule) => rule.selector === ":root")!.declarations;
const px = (value: string) => { const match = /^(\d+(?:\.\d+)?)px$/.exec(value); return match ? Number(match[1]) : null; };
const TEXT_TOKENS = ["title", "heading", "subheading", "body", "field", "small", "caption"].map((role) => `--text-${role}`);

describe("globals.css type scale", () => {
  it("defines exactly the seven named roles and none of the old size steps", () => {
    expect([...root.keys()].filter((name) => name.startsWith("--text-")).sort()).toEqual([...TEXT_TOKENS].sort());
    expect(css).not.toMatch(/--text-(2xs|xs|sm|base|md|lg|xl)\b/);
  });

  it("keeps every font size at or above 12px at every width", () => {
    const sizes = declared("font-size");
    expect(sizes.length).toBeGreaterThan(40);
    for (const token of TEXT_TOKENS) expect(px(root.get(token)!), token).toBeGreaterThanOrEqual(12);
    for (const { selector, value } of sizes) {
      const token = /^var\((--text-[a-z]+)\)$/.exec(value)?.[1];
      // Only px or a role token resolve to a number this test can check; em, rem and clamp() would hide a small size.
      const size = token ? px(root.get(token) ?? "") : px(value);
      expect(size, `${selector} { font-size: ${value} }`).not.toBeNull();
      expect(size!, `${selector} { font-size: ${value} }`).toBeGreaterThanOrEqual(12);
    }
  });

  it("uses only weights 400, 500 and 600", () => {
    const weights = declared("font-weight");
    expect(weights.length).toBeGreaterThan(20);
    for (const { selector, value } of weights) expect(["400", "500", "600"], `${selector} { font-weight: ${value} }`).toContain(value);
  });

  it("tracks -.02em on titles, -.01em on headings and nothing elsewhere", () => {
    for (const { selector, value } of declared("letter-spacing")) expect(["0", "-.01em", "-.02em"], `${selector} { letter-spacing: ${value} }`).toContain(value);
  });

  it("never uppercases text", () => {
    expect(declared("text-transform")).toEqual([]);
  });

  it("sets the weight on every rule that sizes a heading element", () => {
    // Tailwind's reset leaves h1–h6 at the body weight, so a heading that sets only a size reads as plain text.
    const headingRules = rules.filter(({ selector, declarations }) => declarations.has("font-size") && selector.split(",").some((part) => /(^|[\s>+~])h[1-6]$/.test(part.trim())));
    expect(headingRules.length).toBeGreaterThan(5);
    for (const { selector, declarations } of headingRules) expect(declarations.has("font-weight"), `${selector} sets no font-weight`).toBe(true);
  });
});

describe("globals.css ink", () => {
  it("has no faint grey", () => {
    expect(css).not.toMatch(/ink-faint/);
  });

  // WCAG contrast, written out so the test needs no dependency.
  const channel = (value: number) => { const c = value / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const luminance = (hex: string) => { const n = parseInt(hex.slice(1), 16); return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255); };
  const contrast = (a: string, b: string) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
  const colour = (token: string) => root.get(token)!;

  it("keeps --ink-muted at 5.3:1 or better on every light surface, including the cobalt tint", () => {
    for (const surface of ["--canvas", "--surface", "--surface-muted", "--surface-strong", "--cobalt-soft"]) expect(contrast(colour("--ink-muted"), colour(surface)), surface).toBeGreaterThanOrEqual(5.3);
  });

  it("keeps the dark --ink-muted at about 6.8:1 or better on every dark surface", () => {
    // The tightest surface is the cobalt tint at 6.78:1; 6.75 is the spec's 6.8 without rounding it up.
    for (const surface of ["--dark-canvas", "--dark-surface", "--dark-surface-muted", "--dark-surface-strong", "--dark-cobalt-soft"]) expect(contrast(colour("--dark-ink-muted"), colour(surface)), surface).toBeGreaterThanOrEqual(6.75);
  });
});

describe("globals.css touch targets and tables", () => {
  it("defines one --target: 44px, and 36px only at 1080px and up with a fine pointer", () => {
    expect(root.get("--target")).toBe("44px");
    const fine = rules.find(({ selector, declarations }) => selector === ":root" && declarations.get("--target") === "36px");
    expect(fine).toBeDefined();
    expect(css).toMatch(/@media \(min-width: 1080px\) and \(pointer: fine\) \{\s*:root \{ --target: 36px; \}/);
  });

  it("has no negative-inset hit-area extension", () => {
    // Elements take their real height instead of padding a ::before or ::after out past their box.
    for (const { selector, value } of declared("inset")) expect(value, `${selector} { inset: ${value} }`).not.toMatch(/(^|\s)-\d/);
  });

  it("lets tables of three or fewer columns wrap, gives wider ones a column minimum and pins the row header", () => {
    expect(rules.find(({ selector }) => selector === "table")!.declarations.has("min-width")).toBe(false);
    const wide = rules.filter(({ selector }) => selector.startsWith('table:not([data-columns="1"], [data-columns="2"], [data-columns="3"])'));
    expect(wide.map(({ declarations }) => declarations.get("min-width"))).toContain("120px");
    // Pinned on every table, so one that still overflows keeps its row labels in view.
    expect(rules.find(({ selector }) => selector === "thead th:first-child, tbody th")?.declarations.get("position")).toBe("sticky");
  });
});

describe("globals.css chrome", () => {
  const rule = (selector: string) => rules.find((candidate) => candidate.selector === selector)?.declarations;
  const DARK_BLOCKS = [':root:not([data-theme="light"])', ':root[data-theme="dark"]'];

  it("has no backdrop blur anywhere", () => {
    // Built from parts: Tailwind scans this file, and the literal property name would add an unused utility class to the built CSS.
    expect(css).not.toMatch(new RegExp(["backdrop", "filter"].join("-")));
  });

  it("defines the float shadow, scrim, tile edge and motion tokens, with the dark values in both dark blocks", () => {
    expect(root.get("--shadow-float")).toBe("0 8px 24px rgb(16 24 40 / 0.12), 0 2px 6px rgb(16 24 40 / 0.08)");
    expect(root.get("--dark-shadow-float")).toBe("0 8px 24px rgb(0 0 0 / 0.5)");
    expect(root.get("--scrim")).toBe("rgb(7 12 24 / 0.5)");
    expect(root.get("--tile-edge")).toBe("transparent");
    expect([root.get("--dur-fast"), root.get("--dur-sheet"), root.get("--ease-out")]).toEqual(["120ms", "220ms", "cubic-bezier(.22, .9, .3, 1)"]);
    for (const selector of DARK_BLOCKS) {
      expect(rule(selector)?.get("--shadow-float"), selector).toBe("var(--dark-shadow-float)");
      expect(rule(selector)?.get("--tile-edge"), selector).toBe("var(--dark-line-strong)");
    }
  });

  it("has dropped the old shadow tokens", () => {
    expect(css).not.toMatch(/--(?:dark-)?shadow(?![\w-])/);
  });

  it("allows a box-shadow only as the float token, and an rgb() colour only inside the token blocks", () => {
    for (const { selector, value } of declared("box-shadow")) expect(value, `${selector} { box-shadow: ${value} }`).toBe("var(--shadow-float)");
    for (const { selector, declarations } of rules) {
      if (selector.startsWith(":root")) continue;
      for (const [property, value] of declarations) expect(value, `${selector} { ${property}: ${value} }`).not.toMatch(/\brgba?\(/);
    }
  });

  it("takes every transition and animation from the motion tokens", () => {
    // `.skeleton` still shimmers on a literal 1.5s until the loading rows replace it.
    const motion = [...declared("transition"), ...declared("animation")].filter(({ selector, value }) => selector !== ".skeleton" && !value.startsWith("none"));
    expect(motion.length).toBeGreaterThanOrEqual(8);
    for (const { selector, value } of motion) {
      const label = `${selector} { ${value} }`;
      expect(value, label).toMatch(/var\(--dur-(?:fast|sheet)\)/);
      expect(value, label).toMatch(/var\(--ease-out\)/);
      // A literal time, a keyword curve or a literal curve would bypass the tokens.
      expect(value, label).not.toMatch(/\d(?:ms|s)\b|cubic-bezier|(?:^|[\s,])(?:ease|ease-in|ease-out|ease-in-out|linear)(?=[\s,]|$)/);
    }
  });

  it("keeps every :hover rule inside (hover: hover), changing one colour or fill and nothing else", () => {
    // Strip each `@media (hover: hover) { … }` block by brace depth; a :hover left outside would stick on a phone.
    const OPEN = "@media (hover: hover) {";
    let outside = css;
    for (let at = outside.indexOf(OPEN); at >= 0; at = outside.indexOf(OPEN)) {
      let depth = 0;
      let end = outside.length;
      for (let i = at; i < outside.length; i++) {
        if (outside[i] === "{") depth++;
        if (outside[i] === "}" && --depth === 0) { end = i + 1; break; }
      }
      outside = outside.slice(0, at) + outside.slice(end);
    }
    expect(outside).not.toMatch(/:hover/);
    const hover = rules.filter(({ selector }) => selector.includes(":hover"));
    expect(hover.length).toBeGreaterThan(10);
    for (const { selector, declarations } of hover) {
      expect([...declarations.keys()], `${selector} changes more than one thing`).toHaveLength(1);
      expect(["background", "color", "border-color", "text-decoration-color"], selector).toContain([...declarations.keys()][0]);
    }
  });

  it("sets the phone header on the canvas and the tab bar on the surface, each with one hairline and no shadow", () => {
    expect(rule(".mobile-header")?.get("background")).toBe("var(--canvas)");
    expect(rule(".mobile-header")?.get("border-bottom")).toBe("1px solid var(--line)");
    expect(rule(".mobile-nav")?.get("background")).toBe("var(--surface)");
    expect(rule(".mobile-nav")?.get("border-top")).toBe("1px solid var(--line)");
    for (const selector of [".mobile-header", ".mobile-nav", ".brand-mark", ".search-field input", ".form-card"]) expect(rule(selector)?.has("box-shadow"), `${selector} is flat`).toBe(false);
    expect(rule(".topics-drawer-backdrop")?.get("background")).toBe("var(--scrim)");
  });

  it("has no history status dot and no tone on a summary", () => {
    for (const { selector, declarations } of rules.filter(({ selector }) => selector.includes(".status-dot"))) expect([...declarations.entries()], selector).toEqual([["display", "none"]]);
    expect(rules.filter(({ selector }) => /\.summary-block\.tone-/.test(selector))).toEqual([]);
  });
});
