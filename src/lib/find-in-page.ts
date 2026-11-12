/**
 * Find text: the match engine behind the find bar. It reads the page and never writes to it. A match is a `Range`, so React's text
 * nodes (and the keys the renderer derives from their text) are left alone, and the ranges are painted through the CSS Custom Highlight API.
 */

// What a reader sees but did not write: the flow's hidden relationship list, icons, and the per-block support mark.
const SKIPPED = ".visually-hidden, [aria-hidden='true'], .block-actions, svg, script, style";
const MATCH = "find-match";
const CURRENT = "find-current";

const escapePattern = (word: string) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Every match of `query` under `root`, in document order. Case-insensitive; any run of whitespace in the query matches any run in the text.
 * Text is joined across inline markup (a bold term inside a sentence still matches the sentence) but never across blocks, so "a b" cannot
 * match the end of one paragraph and the start of the next.
 */
export function findMatches(root: Element, query: string): Range[] {
  const words = query.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const pattern = new RegExp(words.map(escapePattern).join("\\s+"), "gi");

  const blocks = new Map<Element, Element>();
  const blockOf = (element: Element): Element => {
    let block = blocks.get(element);
    if (!block) {
      const display = getComputedStyle(element).display;
      block = (display === "inline" || display === "contents") && element.parentElement ? blockOf(element.parentElement) : element;
      blocks.set(element, block);
    }
    return block;
  };

  const runs: { block: Element; nodes: Text[] }[] = [];
  const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    const parent = node.parentElement;
    if (!parent || parent.closest(SKIPPED)) continue;
    const block = blockOf(parent);
    const last = runs[runs.length - 1];
    if (last?.block === block) last.nodes.push(node); else runs.push({ block, nodes: [node] });
  }

  const ranges: Range[] = [];
  for (const { nodes } of runs) {
    const starts: number[] = [];
    let text = "";
    for (const node of nodes) { starts.push(text.length); text += node.data; }
    // The node a text offset falls in. An end offset on a boundary belongs to the node before it.
    const locate = (offset: number, end: boolean) => { let at = 0; while (at + 1 < nodes.length && (end ? starts[at + 1] < offset : starts[at + 1] <= offset)) at++; return at; };
    for (const match of text.matchAll(pattern)) {
      const from = match.index;
      const to = from + match[0].length;
      const first = locate(from, false);
      const last = locate(to, true);
      const range = root.ownerDocument.createRange();
      range.setStart(nodes[first], from - starts[first]);
      range.setEnd(nodes[last], to - starts[last]);
      ranges.push(range);
    }
  }
  return ranges;
}

const highlights = () => typeof CSS !== "undefined" && "highlights" in CSS && typeof Highlight !== "undefined" ? CSS.highlights : null;
// Set only by the selection fallback, so clearing never wipes a selection the reader made.
let selecting = false;

/**
 * Paints every match and, over it, the current one. Where the Highlight API is missing (Safari before 17.2, Firefox before 140) there is
 * nothing to paint all matches with, so the current match is selected instead, and only while focus is outside a text field: a selection
 * moves the caret out of the field and typing would stop. The count and the scrolling work either way, and nothing is rewritten.
 */
export function paintMatches(matches: Range[], current: number) {
  const registry = highlights();
  if (registry) {
    registry.set(MATCH, new Highlight(...matches));
    const mark = new Highlight(matches[current]);
    mark.priority = 1;
    registry.set(CURRENT, mark);
    return;
  }
  if (document.activeElement instanceof HTMLInputElement) return;
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(matches[current]);
  selecting = true;
}

export function clearMatches() {
  const registry = highlights();
  if (registry) { registry.delete(MATCH); registry.delete(CURRENT); return; }
  if (selecting) window.getSelection()?.removeAllRanges();
  selecting = false;
}
