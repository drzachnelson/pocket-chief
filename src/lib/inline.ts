import type { Topic } from "@/lib/types";

/** One run of text with optional emphasis and/or link target. Bold and link compose. */
export interface InlineSegment { text: string; bold?: boolean; slug?: string }

/** Serializable across the RSC boundary — deliberately a plain array, not a Map. */
export interface LinkIndexEntry { key: string; slug: string; title: string }

/** Mutable per-block scope; enforces "link each term at most once per block". */
export interface LinkScope { entries: LinkIndexEntry[]; selfSlug: string; used: Set<string> }

// Same shape as normalize() in search.ts. A term the search index cannot see is a term the
// reader cannot reach, so the two have to agree on what counts as a word.
const normalizeKey = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

// Below four characters a key stops naming a topic and starts matching prose: "bile", "duct".
const MIN_KEY_LENGTH = 4;

// matchAll clones the regex before iterating, so this shared global literal stays re-entrant
// across the recursive bold pass — its lastIndex is never advanced.
const MARKERS = /\*\*([\s\S]+?)\*\*|\[\[([^[\]]+?)\]\]/g;

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const segment = (text: string, bold?: boolean, slug?: string): InlineSegment => ({ text, ...(bold ? { bold: true } : {}), ...(slug ? { slug } : {}) });
const longestFirst = (a: LinkIndexEntry, b: LinkIndexEntry) => b.key.length - a.key.length || a.key.localeCompare(b.key);

const patterns = new Map<string, RegExp>();
/**
 * Keys are normalized but the prose they match is not, so words are joined by a run of
 * separators — "vs phyllodes" has to find "vs. phyllodes". The leading boundary is a consumed
 * group rather than a lookbehind, which iOS Safari only learned in 16.4.
 */
function pattern(key: string): RegExp {
  const cached = patterns.get(key);
  if (cached) return cached;
  const built = new RegExp(`(^|[^A-Za-z0-9])(${key.split(" ").map(escapeRegExp).join("[^A-Za-z0-9]+")})(?![A-Za-z0-9])`, "gi");
  patterns.set(key, built);
  return built;
}

/**
 * Builds the cross-link index from the library. `key` is the normalized title or
 * alias. Result is sorted longest-key-first so longest-match-wins is a linear scan.
 * Keys shorter than 4 characters are excluded.
 */
export function buildLinkIndex(topics: Pick<Topic, "slug" | "title" | "aliases">[]): LinkIndexEntry[] {
  const byKey = new Map<string, LinkIndexEntry>();
  for (const topic of topics) for (const label of [topic.title, ...topic.aliases]) {
    const key = normalizeKey(label);
    // First writer wins, and a topic's own title is written before its aliases, so a phrase that
    // is one topic's title never resolves to another topic that merely lists it as an alias.
    if (key.length >= MIN_KEY_LENGTH && !byKey.has(key)) byKey.set(key, { key, slug: topic.slug, title: topic.title });
  }
  return [...byKey.values()].sort(longestFirst);
}

/** One scope per block. Pass `[]` for entries to disable auto-linking. */
export function createLinkScope(entries: LinkIndexEntry[], selfSlug: string): LinkScope {
  // Re-sorting is a no-op on buildLinkIndex output; it keeps longest-match-wins honest for the
  // hand-built entry lists that tests and one-off callers pass in.
  return { entries: [...entries].sort(longestFirst), selfSlug, used: new Set<string>() };
}

function autoLink(text: string, bold: boolean | undefined, scope: LinkScope): InlineSegment[] {
  const claimed: Array<{ start: number; end: number; slug: string }> = [];
  for (const entry of scope.entries) {
    if (entry.key.length < MIN_KEY_LENGTH || entry.slug === scope.selfSlug || scope.used.has(entry.key)) continue;
    for (const match of text.matchAll(pattern(entry.key))) {
      const start = match.index + match[1].length;
      const end = start + match[2].length;
      // Entries arrive longest-first, so an overlap always means a longer key already owns the span.
      if (claimed.some((claim) => start < claim.end && claim.start < end)) continue;
      claimed.push({ start, end, slug: entry.slug });
      scope.used.add(entry.key);
      break;
    }
  }
  if (claimed.length === 0) return [segment(text, bold)];
  claimed.sort((a, b) => a.start - b.start);
  const segments: InlineSegment[] = [];
  let cursor = 0;
  for (const claim of claimed) {
    if (claim.start > cursor) segments.push(segment(text.slice(cursor, claim.start), bold));
    segments.push(segment(text.slice(claim.start, claim.end), bold, claim.slug));
    cursor = claim.end;
  }
  if (cursor < text.length) segments.push(segment(text.slice(cursor), bold));
  return segments;
}

function resolveLink(inner: string, bold: boolean | undefined, scope: LinkScope | undefined): InlineSegment[] {
  const target = scope?.entries.find((entry) => entry.key === normalizeKey(inner));
  // An unresolvable cross-link degrades to the words the author wrote — never a dead link.
  if (!scope || !target) return [segment(inner, bold)];
  // Claiming the key stops the auto-linker repeating the same term later in the block.
  scope.used.add(target.key);
  return [segment(inner, bold, target.slug)];
}

function parseMarkers(text: string, bold: boolean | undefined, scope: LinkScope | undefined): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const plain = (value: string) => scope ? autoLink(value, bold, scope) : [segment(value, bold)];
  let cursor = 0;
  for (const match of text.matchAll(MARKERS)) {
    if (match.index > cursor) segments.push(...plain(text.slice(cursor, match.index)));
    segments.push(...(match[1] === undefined ? resolveLink(match[2], bold, scope) : parseMarkers(match[1], true, scope)));
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) segments.push(...plain(text.slice(cursor)));
  return segments;
}

/**
 * Parses `**bold**` and `[[links]]`, then auto-links remaining plain text against
 * `scope`. Word-boundary, case-insensitive, longest match first, skips `selfSlug`,
 * and records each linked key in `scope.used` so it fires at most once per block.
 * Omit `scope` to parse emphasis only.
 *
 * Unbalanced `**` and unclosed `[[` never match, so malformed markup renders literally
 * rather than swallowing the rest of the sentence.
 */
export function parseInline(text: string, scope?: LinkScope): InlineSegment[] {
  return parseMarkers(text, undefined, scope);
}

/** Removes all markers, returning the plain sentence. Used on every Anki export path. */
export function stripMarkup(text: string): string {
  // Reuses the parser rather than a second set of regexes: whatever the reading view renders as
  // literal text is exactly what the card gets.
  return parseInline(headingLevel(bulletDepth(text).text).text).map((part) => part.text).join("");
}

/** Reads and removes a leading `- ` / `-- ` indent prefix from a bullets item. */
export function bulletDepth(item: string): { depth: 0 | 1 | 2; text: string } {
  const match = /^(-{1,2}) +/.exec(item);
  return match ? { depth: match[1].length as 1 | 2, text: item.slice(match[0].length) } : { depth: 0, text: item };
}

/** Reads and removes a leading `↳ ` prefix from a block heading. */
export function headingLevel(heading: string): { level: 2 | 3; text: string } {
  const match = /^↳ +/.exec(heading);
  return match ? { level: 3, text: heading.slice(match[0].length) } : { level: 2, text: heading };
}
