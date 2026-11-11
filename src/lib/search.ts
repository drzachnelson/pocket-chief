import { playbookItem, topicItem, topicPath, type LibraryItem } from "@/lib/library-items";
import { APPROACH_LABELS, type Playbook, type Topic, type TopicBlock } from "@/lib/types";

// One matcher for topics and playbooks, run over an index that is normalised once, at export
// (`src/app/search-index.json`), not over raw blocks on every keystroke. Client-safe: it imports
// no content, so the browser can match against the downloaded index without the 9 MB library.

function blockText(block: TopicBlock): string {
  if (block.type === "summary" || block.type === "prose" || block.type === "warning") return `${block.heading ?? ""} ${block.text}`;
  if (block.type === "bullets") return `${block.heading ?? ""} ${block.items.join(" ")}`;
  if (block.type === "table") return `${block.heading ?? ""} ${block.columns.join(" ")} ${block.rows.flat().join(" ")}`;
  if (block.type === "flow") return `${block.heading ?? ""} ${block.nodes.map((node) => node.label).join(" ")}`;
  if (block.type === "sequence") return `${block.heading ?? ""} ${block.steps.flatMap((step) => [step.title, step.detail]).join(" ")}`;
  if (block.type === "image") return `${block.heading ?? ""} ${block.alt} ${block.caption ?? ""}`;
  return block.heading ?? "references";
}

function normalize(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Damerau-Levenshtein: a transposed pair costs 1, not 2.
 *
 * Transposition is the dominant typing error, so pricing it correctly lets the
 * tolerance below stay tight. A plain edit distance of 2 is far too loose once
 * the library is large — every five-letter token finds some neighbour.
 */
let cells = new Int32Array(0); // one flat matrix reused across calls: this runs thousands of times per keystroke
function editDistance(a: string, b: string): number {
  const width = a.length + 1;
  if (cells.length < width * (b.length + 1)) cells = new Int32Array(width * (b.length + 1));
  for (let col = 0; col <= a.length; col += 1) cells[col] = col;
  for (let row = 1; row <= b.length; row += 1) {
    cells[row * width] = row;
    for (let col = 1; col <= a.length; col += 1) {
      const at = row * width + col;
      cells[at] = b[row - 1] === a[col - 1]
        ? cells[at - width - 1]
        : Math.min(cells[at - width - 1], cells[at - 1], cells[at - width]) + 1;
      if (row > 1 && col > 1 && b[row - 1] === a[col - 2] && b[row - 2] === a[col - 1]) {
        cells[at] = Math.min(cells[at], cells[at - 2 * width - 2] + 1);
      }
    }
  }
  return cells[b.length * width + a.length];
}

/** One searchable entry. Everything here is already normalised (lowercase, letters and digits, single spaces). */
export interface SearchEntry {
  /** What a result row needs; the index carries no more of the entry than this. */
  item: LibraryItem;
  /** Names a user types from memory, strongest first: the title, then aliases, then labels (a topic's category, group and tags; a playbook's specialty, approach and tags). */
  title: string;
  aliases: string[];
  labels: string[];
  /** Everything the entry renders, with a space at each end so a word starts at `indexOf(" word")`. */
  body: string;
}

export interface SearchIndex { entries: SearchEntry[] }

/** A ranked entry. `snippet` is set only when nothing in the names matched: the words around the first body match. */
export interface SearchHit { item: LibraryItem; snippet?: string }

const entry = (item: LibraryItem, aliases: string[], labels: string[], blocks: TopicBlock[]): SearchEntry => ({
  item,
  title: normalize(item.title),
  aliases: aliases.map(normalize).filter(Boolean),
  labels: labels.map(normalize).filter(Boolean),
  body: ` ${normalize(blocks.map(blockText).join(" "))} `,
});

/**
 * The export-time index. A topic is searchable only once it has an approved version, and only its
 * approved blocks are read, so no draft text can reach the index. Topic and playbook ids never
 * collide (`library.test.ts` pins that), which lets callers find an item by id.
 */
export function buildSearchIndex(topics: Topic[], playbooks: Playbook[] = []): SearchIndex {
  return { entries: [
    ...topics.flatMap((topic) => topic.approvedVersion ? [entry(topicItem(topic), topic.aliases, [...topicPath(topic), ...topic.tags], topic.approvedVersion.blocks)] : []),
    ...playbooks.map((playbook) => entry(playbookItem(playbook), playbook.aliases, [playbook.specialty, APPROACH_LABELS[playbook.approach], ...playbook.tags], playbook.blocks)),
  ] };
}

/** 50 exact word, 42 shared prefix either way, 38 down to 28 a typo. A typo is priced only against names, never body text. */
function wordScore(token: string, word: string): number {
  if (word === token) return 50;
  if (word.length >= 3 && (word.startsWith(token) || token.startsWith(word))) return 42;
  // Fuzzing every word of every block means any short token finds a neighbour once the library
  // grows ("wound" reached topics through "round" and "found"), so tolerance stays on names.
  const tolerance = token.length > 10 ? 2 : token.length >= 4 ? 1 : 0;
  if (!tolerance || Math.abs(word.length - token.length) > tolerance) return 0;
  const distance = editDistance(token, word);
  return distance <= tolerance ? 38 - distance * 5 : 0;
}

/** Title beats alias beats label, whatever the match quality: "Unusual Hernias" (a prefix) still outranks a topic whose tag is exactly "hernia". 0 means no name matches. */
function nameScore(token: string, { title, aliases, labels }: SearchEntry): number {
  let best = 0;
  const read = (field: string, rank: number) => {
    if (best >= rank * 100 + 50) return; // nothing in this field can beat what is already found
    for (const word of field.split(" ")) { const quality = wordScore(token, word); if (quality) best = Math.max(best, rank * 100 + quality); }
  };
  read(title, 3);
  for (const alias of aliases) read(alias, 2);
  for (const label of labels) read(label, 1);
  return best;
}

/**
 * Body words are found as word prefixes with `indexOf` (the body is the biggest thing scanned per
 * keystroke, so a miss costs one pass). One trailing "s" is dropped so "stones" finds "stone".
 * `count` is how often the word starts there, capped at 20: a topic that is about the word
 * outranks one that mentions it once.
 */
function bodyMatch(token: string, body: string): { at: number; count: number } | null {
  const find = (word: string) => {
    const probe = ` ${word}`, at = body.indexOf(probe);
    if (at < 0) return null;
    let count = 1;
    for (let next = body.indexOf(probe, at + 1); next >= 0 && count < 20; next = body.indexOf(probe, next + 1)) count += 1;
    return { at, count };
  };
  return find(token) ?? (token.length >= 5 && token.endsWith("s") ? find(token.slice(0, -1)) : null);
}

/** About eight words around a body match, cut on word boundaries. */
function around(body: string, at: number): string {
  const start = Math.max(0, at - 30), end = Math.min(body.length, at + 50);
  const words = body.slice(start, end).split(" ").filter(Boolean);
  if (start > 0 && body[start - 1] !== " ") words.shift();
  if (end < body.length && body[end] !== " ") words.pop();
  return words.join(" ");
}

/**
 * Ranks the whole index for a query. Every query word must match somewhere, in a name or the
 * body. Order: an exact title first; then more words matched in names (so a name match on every
 * word beats anything that needed the body); then stronger name fields; then body matches, by how
 * often the words appear; then the shorter title. What is left stays in index order, never
 * alphabetical: the sort is stable. An empty query returns every entry.
 */
export function searchIndex(index: SearchIndex, query: string): SearchHit[] {
  const needle = normalize(query);
  if (!needle) return index.entries.map(({ item }) => ({ item }));
  const tokens = needle.split(" ");
  const ranked: Array<{ hit: SearchHit; exact: number; named: number; nameSum: number; bodySum: number; length: number }> = [];
  entries: for (const entry of index.entries) {
    let named = 0, nameSum = 0, bodySum = 0, snippetAt = -1;
    for (const token of tokens) {
      const score = nameScore(token, entry);
      if (score) { named += 1; nameSum += score; continue; }
      const found = bodyMatch(token, entry.body);
      if (!found) continue entries;
      bodySum += found.count;
      if (snippetAt < 0) snippetAt = found.at;
    }
    ranked.push({ hit: named ? { item: entry.item } : { item: entry.item, snippet: around(entry.body, snippetAt) }, exact: entry.title === needle ? 1 : 0, named, nameSum, bodySum, length: entry.title.split(" ").length });
  }
  return ranked.sort((a, b) => b.exact - a.exact || b.named - a.named || b.nameSum - a.nameSum || b.bodySum - a.bodySum || a.length - b.length).map(({ hit }) => hit);
}

// The two functions below keep the per-corpus signatures that the search UI calls today, over the
// same matcher. They index the array they are given once and reuse it for later keystrokes, so the
// array must not be mutated in place (a loaded library never is). The UI moves to the prebuilt
// asset in the search UI slice; until then the browser builds the index once per page load.
const indexes = new WeakMap<object, SearchIndex>();

function searchItems<T extends { id: string }>(query: string, items: T[], build: () => SearchIndex): T[] {
  let index = indexes.get(items);
  if (!index) indexes.set(items, index = build());
  const byId = new Map(items.map((item) => [item.id, item]));
  return searchIndex(index, query).map(({ item }) => byId.get(item.id)!);
}

export const searchTopics = (query: string, topics: Topic[]): Topic[] => searchItems(query, topics, () => buildSearchIndex(topics));
export const searchPlaybooks = (query: string, playbooks: Playbook[]): Playbook[] => searchItems(query, playbooks, () => buildSearchIndex([], playbooks));
