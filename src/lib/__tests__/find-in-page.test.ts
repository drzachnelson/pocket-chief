import { afterEach, describe, expect, it, vi } from "vitest";
import { clearMatches, findMatches, paintMatches } from "@/lib/find-in-page";

function page(html: string) {
  const root = document.createElement("article");
  root.innerHTML = html;
  document.body.append(root);
  return root;
}
const texts = (ranges: Range[]) => ranges.map((range) => range.toString());

afterEach(() => { document.body.replaceChildren(); vi.unstubAllGlobals(); });

describe("findMatches", () => {
  it("finds every match in document order, ignoring case", () => {
    const root = page("<p>Aspirin and ASPIRIN</p><ul><li>no aspirin here? aspirin.</li></ul>");
    expect(texts(findMatches(root, "aspirin"))).toEqual(["Aspirin", "ASPIRIN", "aspirin", "aspirin"]);
  });

  it("matches across inline markup but never across blocks", () => {
    const root = page("<p>Give <strong>aspirin</strong> daily</p><p>end of one</p><p>start of two</p>");
    expect(texts(findMatches(root, "give aspirin daily"))).toEqual(["Give aspirin daily"]);
    expect(findMatches(root, "one start")).toEqual([]);
  });

  it("lets any run of whitespace in the query match any run in the text, and takes a query with regex characters literally", () => {
    const root = page("<p>pH  5.5\n(acid) a+b</p>");
    expect(texts(findMatches(root, "ph 5.5"))).toEqual(["pH  5.5"]);
    expect(texts(findMatches(root, "(acid) a+b"))).toEqual(["(acid) a+b"]);
    expect(findMatches(root, "5x5")).toEqual([]);
  });

  it("reaches table cells and flow labels, and keeps a table's cells apart", () => {
    const root = page(`<table><thead><tr><th>Test</th><th>Finding</th></tr></thead><tbody><tr><th>ALP</th><td>Raised</td></tr></tbody></table>
      <div class="flow-node"><strong>Cholangitis suspected</strong></div><span class="flow-edge-label">if unstable</span>`);
    expect(texts(findMatches(root, "raised"))).toEqual(["Raised"]);
    expect(texts(findMatches(root, "cholangitis"))).toEqual(["Cholangitis"]);
    expect(texts(findMatches(root, "if unstable"))).toEqual(["if unstable"]);
    expect(findMatches(root, "alp raised")).toEqual([]);
  });

  it("skips what the reader does not see as text: the hidden flow list, aria-hidden icons and the support mark", () => {
    const root = page(`<p>Visible steps</p><ol class="visually-hidden"><li>Visible steps lead to done</li></ol><span aria-hidden="true">steps</span><div class="block-actions"><span>Supported steps</span></div><svg><text>steps</text></svg>`);
    expect(findMatches(root, "steps")).toHaveLength(1);
  });

  it("finds two matches in one node and a match that spans three", () => {
    const root = page("<p>aa aa</p><p>x<em>y</em><b>z</b>w</p>");
    expect(texts(findMatches(root, "aa"))).toEqual(["aa", "aa"]);
    expect(texts(findMatches(root, "yzw"))).toEqual(["yzw"]);
  });

  it("returns nothing for an empty or blank query, and never edits the page", () => {
    const root = page("<p>Some <strong>text</strong></p>");
    const before = root.innerHTML;
    expect(findMatches(root, "")).toEqual([]);
    expect(findMatches(root, "   ")).toEqual([]);
    findMatches(root, "text");
    expect(root.innerHTML).toBe(before);
  });
});

describe("paintMatches and clearMatches", () => {
  it("paints every match and the current one over it through the Highlight API, and clears both", () => {
    const registry = new Map<string, { ranges: Range[]; priority?: number }>();
    vi.stubGlobal("CSS", { highlights: registry });
    vi.stubGlobal("Highlight", class { ranges: Range[]; priority = 0; constructor(...ranges: Range[]) { this.ranges = ranges; } });
    const matches = findMatches(page("<p>a a a</p>"), "a");

    paintMatches(matches, 1);
    expect(registry.get("find-match")!.ranges).toHaveLength(3);
    expect(registry.get("find-current")!.ranges).toEqual([matches[1]]);
    expect(registry.get("find-current")!.priority).toBe(1);

    clearMatches();
    expect(registry.size).toBe(0);
  });

  it("falls back to selecting the current match, and clears only a selection it made", () => {
    vi.stubGlobal("CSS", {});
    const root = page("<p>one two one</p>");
    const matches = findMatches(root, "one");

    clearMatches();
    paintMatches(matches, 1);
    expect(window.getSelection()!.toString()).toBe("one");
    expect(window.getSelection()!.getRangeAt(0)).toBe(matches[1]);
    clearMatches();
    expect(window.getSelection()!.rangeCount).toBe(0);

    // With the caret in a text field a selection would take it away and stop the typing, so nothing is selected.
    const field = document.createElement("input");
    document.body.append(field);
    field.focus();
    paintMatches(matches, 0);
    expect(window.getSelection()!.toString()).toBe("");
    field.remove();

    // A selection the reader made is theirs: with nothing painted, clearing leaves it.
    const own = document.createRange();
    own.selectNodeContents(root.querySelector("p")!);
    window.getSelection()!.addRange(own);
    clearMatches();
    expect(window.getSelection()!.rangeCount).toBe(1);
  });
});
