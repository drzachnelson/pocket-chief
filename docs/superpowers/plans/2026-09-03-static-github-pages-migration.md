# Static GitHub Pages Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Pocket Chief into a self-contained static PWA that builds from this repository and deploys to GitHub Pages, with Vercel, Supabase, OpenAI, and the whole server-side authoring surface removed.

**Architecture:** The 46 authored topics in `src/content/` already are the database. A new `src/lib/library.ts` reads them directly as pure functions, replacing the `ContentRepository` abstraction and both of its implementations. Pages become statically prerendered at build time (`output: "export"`); the only state left — bookmarks and reading history — lives in IndexedDB, which `src/lib/offline.ts` already implements. A single `library.json` static asset seeds the offline cache and powers client-side search. Anki export is removed outright: flashcards now come from handing the published page to an assistant. GitHub Actions builds `out/` and publishes it to Pages under `basePath: "/pocket-chief"`.

**Tech Stack:** Next.js 16 (App Router, `output: "export"`), React 19, TypeScript, Tailwind 4, `idb` for IndexedDB, Vitest, Playwright, GitHub Actions + GitHub Pages.

---

## Context you need before starting

**`pnpm` is not on PATH in this environment.** Every command in this plan calls binaries through `node` directly. Do not substitute `pnpm test`.

**Read these first:** `CLAUDE.md` (architecture, conventions, environment gotchas) and `AGENTS.md` (editorial rules). The claim-support invariant described in `CLAUDE.md` still governs content authoring after this migration — it just stops being enforced in SQL, because there is no SQL any more.

**Do not touch `src/content/`** except where a task explicitly says so. Those 46 files are the product. A PostToolUse hook runs the content contract test on any edit under `src/content/`.

**What survives, and why it matters:**

| Module | Status | Reason |
| --- | --- | --- |
| `src/content/**` | keep | The library. 46 approved topics. |
| `src/lib/search.ts` | keep | `searchTopics(query, topics)` is already a pure function. |
| `src/lib/offline.ts` | keep | IndexedDB layer. Already stores topics, taxonomy, saved, recent. |
| `src/lib/taxonomy.ts`, `topic-navigation.ts`, `inline.ts`, `text.ts` | keep | Pure, no server dependency. `stripMarkup` still feeds the decision-flow screen-reader descriptions. |
| `src/lib/editorial.ts` | prune | Only `factualUnits` and `supportWarnings` are still reachable (Task 10). |
| `src/lib/repository.ts`, `repositories/**`, `supabase/**`, `auth.ts`, `data-mode.ts`, `store.ts`, `proxy.ts`, `ai.ts`, `safety.ts`, `schemas.ts`, `rate-limit.ts`, `backup.ts`, `library-install.ts` | delete | Server-only. Nothing reachable in a static build. |
| `src/lib/anki.ts`, `src/lib/anki-settings.ts` | delete | Anki export is removed from the product (Task 7). |
| `src/app/api/**`, `src/app/auth/**`, `src/app/add/`, `src/app/drafts/`, `src/app/configuration-error/` | delete | No server, no auth, no AI drafting. |

**Two behaviour changes the owner should expect, called out here so nobody rediscovers them as bugs:**

1. **Anki export is gone entirely** — the per-block "Make Anki" buttons, the cloze dialog, the AnkiMobile URL scheme, AnkiConnect, the TSV fallback, and the Settings preferences for deck and field mapping. Flashcards now come from handing the published page URL to an assistant. This is a deliberate product decision, not an oversight; nothing in the plan restores it.
2. **Response headers are gone.** GitHub Pages cannot set `X-Robots-Tag` or `Referrer-Policy`, and `headers()` is silently inert under `output: "export"`. Task 11 replaces them with `robots.txt` plus the `<meta name="robots">` the root layout already emits. If the repository is made public, treat the content as world-readable — the topics derive from licensed SCORE and Fiser material, and `noindex` is a crawler request, not access control.

3. **Bookmarks and reading history stop syncing across devices.** Both were server-backed: `listBookmarkedTopics` read a `bookmarks` table and `listRecentTopics` a `recent_views` table, so a second device saw the same saved topics and resumed where you left off. Both are now per-device IndexedDB only — a phone and a laptop keep separate, independent sets, and a device with an empty cache shows no favorites and resumes at the curriculum's first topic. Clearing site data is now irreversible for that device. Unavoidable without a server, but a real capability loss rather than a pure refactor, and the one piece of user state this migration cannot preserve.

**Explicitly out of scope:** re-authoring `src/content/topics/choledocholithiasis.ts` through the `sourced()` helper. Its byte-pinning constraint disappears with the SQL, but rewriting it is a content change, not a migration change.

---

## File Structure

**New files**

| File | Responsibility |
| --- | --- |
| `src/lib/library.ts` | Build-time reads over `src/content/`. Replaces `getRepository()`. Pure and synchronous. |
| `src/lib/library-client.ts` | Browser-side library loader: fetch `library.json`, seed IndexedDB, fall back to the cache when offline. |
| `src/app/library.json/route.ts` | Static GET route handler that emits the whole library as one JSON asset at build time. |
| `src/components/search-experience.tsx` | The home page's client half: reads `?q=`, searches, renders results / recents / favorites. |
| `public/robots.txt` | Crawler exclusion, replacing the removed `X-Robots-Tag` header. |
| `.github/workflows/deploy.yml` | Verify → build → publish to GitHub Pages. |
| `src/lib/__tests__/library.test.ts` | Contract for `src/lib/library.ts`. |

**Rewritten files**

| File | Change |
| --- | --- |
| `next.config.ts` | `output: "export"`, `basePath`, `trailingSlash`, `images.unoptimized`; drop `headers()`. |
| `src/app/page.tsx` | Server shell around a Suspense-wrapped client search experience. |
| `src/app/topics/page.tsx`, `topics/layout.tsx`, `topics/[slug]/page.tsx` | Static library reads + `generateStaticParams`. |
| `src/app/settings/page.tsx`, `src/components/settings-form.tsx` | Local-only: clear offline data, and what the library is. |
| `src/components/topic-content.tsx` | Local bookmarks and recents; no Anki, no restore. Loses roughly a third of its lines. |
| `src/lib/types.ts` | Drop `ClozeDraft` and `AnkiSettings`. |
| `src/app/globals.css` | Drop the five rule groups only the Anki dialog and its buttons used. |
| `src/components/saved-library.tsx`, `favorite-topics.tsx`, `recent-topics.tsx`, `topics-resume.tsx`, `search-form.tsx`, `offline-hydrator.tsx`, `app-shell.tsx`, `service-worker-registration.tsx` | Drop every `/api/*` call and the `/add` destination. |
| `public/sw.js` | basePath-aware, cache v4, no `/api/` special-casing. |
| `src/app/manifest.ts` | basePath-aware `start_url`, `scope`, and icon paths. |
| `tests/e2e/pocket-chief.spec.ts` | Drop authoring flows; relative paths for basePath. |
| `playwright.config.ts` | basePath-aware `baseURL`, no demo env. |
| `README.md`, `CLAUDE.md`, `AGENTS.md`, `docs/SECURITY.md` | Describe the static app. |

---

## Task 1: Branch and baseline

**Files:**
- No edits. This task records the starting state so later failures are attributable.

- [ ] **Step 1: Confirm you are in the worktree and on a clean tree**

```bash
git status --short && git rev-parse --abbrev-ref HEAD
```

Expected: no output from `git status --short`, and a branch name printed.

- [ ] **Step 2: Create the working branch**

```bash
git checkout -b claude/static-github-pages
```

- [ ] **Step 3: Record the baseline test result**

```bash
node node_modules/vitest/vitest.mjs run 2>&1 | tail -20
```

Expected: all test files pass. Write down the file and test counts — you will compare against them in Task 15. If anything already fails here, stop and report it; do not start deleting code on a red tree.

- [ ] **Step 4: Record the baseline typecheck and lint**

```bash
node node_modules/typescript/bin/tsc --noEmit && node node_modules/eslint/bin/eslint.js . --max-warnings=0 && echo BASELINE_GREEN
```

Expected: `BASELINE_GREEN`.

---

## Task 2: The static library accessor

Replaces `getRepository()` with pure functions over the authored content. Nothing consumes it yet.

**Files:**
- Create: `src/lib/library.ts`
- Test: `src/lib/__tests__/library.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/library.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { getTopicBySlug, listSources, listTaxonomy, listTopics, searchLibrary } from "@/lib/library";

describe("static library", () => {
  it("lists every approved authored topic", () => {
    const topics = listTopics();
    expect(topics.length).toBeGreaterThan(40);
    expect(topics.every((topic) => topic.approvedVersion)).toBe(true);
  });

  it("resolves a topic by slug and returns null for an unknown one", () => {
    expect(getTopicBySlug("choledocholithiasis")?.title).toBe("Choledocholithiasis");
    expect(getTopicBySlug("not-a-real-topic")).toBeNull();
  });

  it("searches the approved library typo-tolerantly", () => {
    expect(searchLibrary("choledochoithiasis").some((topic) => topic.slug === "choledocholithiasis")).toBe(true);
  });

  it("returns every supplied source, or just the requested ids", () => {
    const all = listSources();
    expect(all.length).toBeGreaterThan(0);
    expect(listSources([all[0].id])).toEqual([all[0]]);
  });

  it("exposes the SCORE taxonomy rooted at the curriculum node", () => {
    const nodes = listTaxonomy();
    expect(nodes.find((node) => node.id === "score")?.title).toBe("SCORE Curriculum");
    expect(nodes.filter((node) => !node.parentId)).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

```bash
node node_modules/vitest/vitest.mjs run src/lib/__tests__/library.test.ts
```

Expected: FAIL — `Failed to resolve import "@/lib/library"`.

- [ ] **Step 3: Write `src/lib/library.ts`**

Match the dense single-line style used across `src/lib`.

```ts
import { demoTopics, suppliedSources, taxonomy } from "@/content";
import { searchTopics } from "@/lib/search";
import type { SuppliedSource, TaxonomyNode, Topic } from "@/lib/types";

// The library is the content authored in `src/content/`, read straight out of the module graph at
// build time. There is no database, no request context and no async boundary: a server component,
// a unit test and the static JSON emitter all read the same frozen objects. Callers still get
// clones, because the renderer and the offline cache both mutate what they are handed.

const approved = () => demoTopics.filter((topic) => topic.approvedVersion);

export function listTopics(): Topic[] { return structuredClone(approved()); }

export function getTopicBySlug(slug: string): Topic | null { return structuredClone(approved().find((topic) => topic.slug === slug) ?? null); }

export function listTaxonomy(): TaxonomyNode[] { return structuredClone(taxonomy); }

export function listSources(ids?: string[]): SuppliedSource[] { return structuredClone(ids ? suppliedSources.filter((source) => ids.includes(source.id)) : suppliedSources); }

export function searchLibrary(query: string): Topic[] { return structuredClone(searchTopics(query, approved())); }
```

- [ ] **Step 4: Run the test and confirm it passes**

```bash
node node_modules/vitest/vitest.mjs run src/lib/__tests__/library.test.ts
```

Expected: PASS, 5 tests.

- [ ] **Step 5: Prove the approval filter actually bites**

Every one of the 46 authored topics already carries an `approvedVersion` — `buildTopic()` sets it unconditionally — so the `every(...approvedVersion)` assertion in Step 1 would still pass if `approved()` were deleted outright. `library.json` is the app's entire public output, so "only approved content ships" needs a test that can actually fail.

`vi.mock` is hoisted per file, so this needs its own file: mocking `@/content` inside `library.test.ts` would break the five tests there that deliberately read the real corpus. Wrap the fixtures in `vi.hoisted()` — a plain IIFE fails with "Cannot access 'fixtures' before initialization", because the `vi.mock` factory is hoisted above it. Create `src/lib/__tests__/library-approval.test.ts` that mocks `@/content` with a synthetic mix of approved and unapproved topics and asserts both `listTopics()` and `searchLibrary()` exclude the unapproved one. The mock factory must supply `suppliedSources` and `taxonomy` as well — `library.ts` imports all three named exports.

Verify the test bites: temporarily change `approved()` to `() => demoTopics`, confirm the new file FAILS, then restore and confirm `git diff src/lib/library.ts` is empty.

- [ ] **Step 6: Commit**

```bash
git add src/lib/library.ts src/lib/__tests__/library.test.ts src/lib/__tests__/library-approval.test.ts && git commit -m "feat(library): read authored content directly without a repository

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 3: The shipped library asset and its browser loader

The browser needs the whole library for offline reading and client-side search. One static JSON asset serves both, and doubles as what the service worker caches.

**Files:**
- Create: `src/app/library.json/route.ts`
- Create: `src/lib/library-client.ts`
- Modify: `src/components/offline-hydrator.tsx`

- [ ] **Step 1: Create the static route handler**

Create `src/app/library.json/route.ts`:

```ts
import { listTaxonomy, listTopics } from "@/lib/library";

// `force-static` is what makes this a file rather than a handler: under `output: "export"` Next
// renders it once at build time and writes `out/library.json`. Nothing here may read the request.
export const dynamic = "force-static";

export function GET() {
  return Response.json({ topics: listTopics(), taxonomy: listTaxonomy() });
}
```

- [ ] **Step 2: Create the browser-side loader**

Create `src/lib/library-client.ts`:

```ts
import { cacheApprovedTopic, cacheTaxonomy, getCachedTopics } from "@/lib/offline";
import type { TaxonomyNode, Topic } from "@/lib/types";

export interface Library { topics: Topic[]; taxonomy: TaxonomyNode[] }

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

let inFlight: Promise<Library> | undefined;

async function fetchLibrary(): Promise<Library> {
  const response = await fetch(`${basePath}/library.json`);
  if (!response.ok) throw new Error("The library asset is unavailable.");
  return await response.json() as Library;
}

/**
 * The shipped asset is the source of truth, and every successful load reseeds IndexedDB so a later
 * cold offline start still has content. A failed fetch falls back to whatever the device already
 * cached rather than rendering an empty atlas — the service worker usually answers first, so this
 * path only runs on a device that has never completed a load.
 *
 * Memoized per page load: search, the offline hydrator and the saved view all ask for it.
 */
export async function loadLibrary(): Promise<Library> {
  inFlight ??= fetchLibrary()
    .then(async (library) => {
      await cacheTaxonomy(library.taxonomy).catch(() => undefined);
      await Promise.all(library.topics.map((topic) => cacheApprovedTopic(topic).catch(() => undefined)));
      return library;
    })
    .catch(async () => ({ topics: await getCachedTopics().catch(() => [] as Topic[]), taxonomy: [] as TaxonomyNode[] }));
  return inFlight;
}
```

- [ ] **Step 3: Rewrite the offline hydrator to use it**

Replace the whole of `src/components/offline-hydrator.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { loadLibrary } from "@/lib/library-client";

/** Seeds IndexedDB from the shipped library asset so saved and offline reads have content. */
export function OfflineHydrator() {
  useEffect(() => { loadLibrary().catch(() => undefined); }, []);
  return null;
}
```

- [ ] **Step 4: Typecheck**

```bash
node node_modules/typescript/bin/tsc --noEmit && echo TYPES_OK
```

Expected: `TYPES_OK`.

- [ ] **Step 5: Verify the route serves in dev**

Start the preview with the Browser pane (`preview_start` with `{name: "pocket-chief"}` — never Bash), then:

```bash
curl -s localhost:3210/library.json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const l=JSON.parse(s);console.log('topics',l.topics.length,'taxonomy',l.taxonomy.length)})"
```

Expected: `topics 46 taxonomy 35`. If another chat already holds port 3210, the running server is serving its own cached library — confirm the port before concluding anything failed.

- [ ] **Step 6: Commit**

```bash
git add src/app/library.json src/lib/library-client.ts src/components/offline-hydrator.tsx && git commit -m "feat(library): ship the library as one static asset

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 4: Topic pages onto the static library

**Files:**
- Modify: `src/app/topics/[slug]/page.tsx`
- Modify: `src/app/topics/page.tsx`
- Modify: `src/app/topics/layout.tsx`
- Modify: `src/components/topics-resume.tsx`
- Test: `src/app/topics/[slug]/__tests__/page.test.tsx`, `src/app/topics/__tests__/page.test.tsx`

- [ ] **Step 1: Rewrite the topic page**

Replace the whole of `src/app/topics/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicContent } from "@/components/topic-content";
import { buildLinkIndex } from "@/lib/inline";
import { getTopicBySlug, listSources, listTaxonomy, listTopics } from "@/lib/library";
import { taxonomyAncestry } from "@/lib/taxonomy";

/** One prerendered HTML file per authored topic; the export has no server to resolve a slug. */
export function generateStaticParams() {
  return listTopics().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getTopicBySlug(slug)?.title ?? "Topic" };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic?.approvedVersion) notFound();
  const version = topic.approvedVersion;
  const suppliedSources = listSources(version.sourceIds);
  const linkEntries = buildLinkIndex(listTopics());
  const ancestry = taxonomyAncestry(topic.scoreNodeId, listTaxonomy());
  const scorePath = ancestry.map((node) => node.title === "SCORE Curriculum" ? "SCORE" : node.title).join(" · ");
  const updatedAt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(topic.updatedAt));
  return (
    <div className="topic-reading">
      <header className="topic-header"><div><p className="eyebrow">{scorePath}</p><h1 className="page-title">{topic.title}</h1><p className="topic-updated">Last updated {updatedAt}</p></div></header>
      <TopicContent topic={topic} sources={suppliedSources.filter((source) => version.sourceIds.includes(source.id))} linkEntries={linkEntries} />
    </div>
  );
}
```

- [ ] **Step 2: Rewrite the topics index page**

Replace the whole of `src/app/topics/page.tsx`:

```tsx
import type { Metadata } from "next";
import { TopicsResume } from "@/components/topics-resume";
import { listTaxonomy, listTopics } from "@/lib/library";
import { buildTopicNavigation } from "@/lib/topic-navigation";

export const metadata: Metadata = { title: "Topics" };

export default function TopicsPage() {
  const topics = listTopics();
  const navigation = buildTopicNavigation(listTaxonomy(), topics);
  const fallbackSlug = navigation.flatMap((category) => [...category.topics, ...category.children.flatMap((section) => section.topics)])[0]?.slug;
  return (
    <div className="topics-index-heading">
      <div><p className="eyebrow">SCORE curriculum</p><h1 className="page-title">Topics</h1><p className="page-lede">Browse the SCORE hierarchy.</p></div>
      <TopicsResume fallbackSlug={fallbackSlug} approvedTopics={topics.map(({ id, slug }) => ({ id, slug }))} />
    </div>
  );
}
```

- [ ] **Step 3: Rewrite the topics layout**

Replace the whole of `src/app/topics/layout.tsx`:

```tsx
import { TopicsWorkspace } from "@/components/topics-workspace";
import { listTaxonomy, listTopics } from "@/lib/library";
import { buildTopicNavigation } from "@/lib/topic-navigation";

/** Build-time curriculum navigation, prerendered into every Topics route. */
export default function TopicsLayout({ children }: { children: React.ReactNode }) {
  return <TopicsWorkspace navigation={buildTopicNavigation(listTaxonomy(), listTopics())}>{children}</TopicsWorkspace>;
}
```

- [ ] **Step 4: Drop the server-recent prop from `TopicsResume`**

In `src/components/topics-resume.tsx`, make these four edits.

Replace the props interface:

```tsx
export interface TopicsResumeProps {
  fallbackSlug?: string;
  approvedTopics: Array<{ id: string; slug: string }>;
}
```

Replace the signature line:

```tsx
export function TopicsResume({ fallbackSlug, approvedTopics }: TopicsResumeProps) {
```

Replace the `setResumeSlug` line inside `.then(...)`:

```tsx
        setResumeSlug(resumeFromDevice ?? fallbackSlug ?? null);
```

Replace the `.catch(...)` body and the dependency array:

```tsx
      .catch(() => { if (active) setResumeSlug(fallbackSlug ?? null); });
    return () => { active = false; };
  }, [approvedTopics, fallbackSlug]);
```

Also update the doc comment above the function to `/** Resolves a resume destination from this device's history, then the curriculum's first topic. */`.

- [ ] **Step 5: Rewrite the topic page test**

Replace the whole of `src/app/topics/[slug]/__tests__/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TopicPage from "@/app/topics/[slug]/page";
import { getTopicBySlug, listTaxonomy } from "@/lib/library";
import type { TaxonomyNode, Topic } from "@/lib/types";

vi.mock("@/lib/library", () => ({ getTopicBySlug: vi.fn(), listSources: vi.fn(() => []), listTaxonomy: vi.fn(), listTopics: vi.fn(() => []) }));
vi.mock("@/components/topic-content", () => ({ TopicContent: () => <div data-testid="topic-content" /> }));

const readTopic = vi.mocked(getTopicBySlug);
const readTaxonomy = vi.mocked(listTaxonomy);

const taxonomy: TaxonomyNode[] = [
  { id: "score", title: "SCORE Curriculum", slug: "score", order: 0 },
  { id: "trauma", title: "Trauma", slug: "trauma", parentId: "score", order: 1 },
  { id: "neck", title: "Neck", slug: "neck", parentId: "trauma", order: 1 },
];

const topic: Topic = {
  id: "neck-trauma", slug: "neck-trauma", title: "Neck trauma", aliases: [], scoreCategory: "Trauma", scoreNodeId: "neck", tags: ["airway"], updatedAt: "2026-08-20T00:30:00.000Z",
  approvedVersion: { id: "v1", topicId: "neck-trauma", versionNumber: 1, status: "approved", blocks: [], sourceIds: [], scoreNodeId: "neck", tags: ["airway"], warnings: [], createdAt: "2026-08-20T00:30:00.000Z" }, versions: [],
};

describe("TopicPage", () => {
  it("renders one SCORE path and a UTC-stable last-updated label without tag chips or breadcrumbs", async () => {
    readTopic.mockReturnValue(topic);
    readTaxonomy.mockReturnValue(taxonomy);

    render(await TopicPage({ params: Promise.resolve({ slug: topic.slug }) }));

    expect(screen.getByText("SCORE · Trauma · Neck")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Neck trauma" })).toBeInTheDocument();
    expect(screen.getByText("Last updated Aug 20, 2026")).toBeInTheDocument();
    expect(screen.queryByLabelText("Breadcrumb")).not.toBeInTheDocument();
    expect(screen.queryByText("airway")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Rewrite the topics index test**

`TopicsPage` is no longer `async`, so `render(await TopicsPage())` becomes `render(TopicsPage())`. Replace the whole of `src/app/topics/__tests__/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TopicsPage from "@/app/topics/page";
import { getRecentTopics } from "@/lib/offline";
import { listTaxonomy, listTopics } from "@/lib/library";
import type { TaxonomyNode, Topic } from "@/lib/types";

vi.mock("@/lib/library", () => ({ listTaxonomy: vi.fn(), listTopics: vi.fn() }));
vi.mock("@/lib/offline", () => ({ getRecentTopics: vi.fn() }));

const readTaxonomy = vi.mocked(listTaxonomy);
const readTopics = vi.mocked(listTopics);
const readDeviceRecents = vi.mocked(getRecentTopics);

function topic(slug: string, title: string, scoreNodeId: string): Topic {
  return {
    id: slug,
    slug,
    title,
    aliases: [],
    scoreCategory: "",
    scoreNodeId,
    tags: [],
    updatedAt: "2026-08-19T00:00:00.000Z",
    approvedVersion: { id: `${slug}-v1`, topicId: slug, versionNumber: 1, status: "approved", blocks: [], sourceIds: [], scoreNodeId, tags: [], warnings: [], createdAt: "2026-08-19T00:00:00.000Z" },
    versions: [],
  };
}

afterEach(() => { vi.clearAllMocks(); });

describe("TopicsPage", () => {
  it("uses neutral browse copy", () => {
    readTaxonomy.mockReturnValue([
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "stocked", title: "Stocked", slug: "stocked", parentId: "score", order: 1 },
    ]);
    readTopics.mockReturnValue([topic("stocked-topic", "Stocked topic", "stocked")]);
    readDeviceRecents.mockResolvedValue([]);

    render(TopicsPage());

    expect(screen.getByText("Browse the SCORE hierarchy.")).toBeInTheDocument();
    expect(screen.queryByText(/Browse the reviewed SCORE hierarchy/i)).not.toBeInTheDocument();
  });

  it("does not render empty curriculum branches", () => {
    readTaxonomy.mockReturnValue([
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "stocked", title: "Stocked", slug: "stocked", parentId: "score", order: 1 },
      { id: "empty", title: "Empty", slug: "empty", parentId: "score", order: 2 },
    ]);
    readTopics.mockReturnValue([topic("stocked-topic", "Stocked topic", "stocked")]);
    readDeviceRecents.mockResolvedValue([]);

    render(TopicsPage());

    expect(screen.queryAllByText("Empty")).toHaveLength(0);
    expect(screen.queryByText("Not started")).not.toBeInTheDocument();
  });

  it("uses the first approved topic in curriculum order as the resume fallback", async () => {
    readTaxonomy.mockReturnValue([
      { id: "score", title: "SCORE", slug: "score", order: 0 },
      { id: "later", title: "Later", slug: "later", parentId: "score", order: 2 },
      { id: "first", title: "First", slug: "first", parentId: "score", order: 1 },
    ]);
    readTopics.mockReturnValue([topic("aorta", "Aorta", "later"), topic("zebra", "Zebra", "first")]);
    readDeviceRecents.mockResolvedValue([]);

    render(TopicsPage());

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/zebra");
  });
});
```

Drop the `TaxonomyNode` import. The old file needed it for a locally-typed `const taxonomy: TaxonomyNode[] = [...]`; this version passes bare array literals straight into `readTaxonomy.mockReturnValue([...])`, whose shape TypeScript infers contextually from `listTaxonomy`'s declared return type. Left in place it is unused, and `eslint --max-warnings=0` fails on it. Keep the `Topic` import — the `topic()` helper uses it.

- [ ] **Step 7: Rewrite the resume test**

Four of the five existing cases pass a `recentSlug` prop that no longer exists, and two assert on a server-supplied slug. Replace the whole of `src/components/__tests__/topics-resume.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getRecentTopics } from "@/lib/offline";
import { TopicsResume } from "@/components/topics-resume";
import type { Topic } from "@/lib/types";

vi.mock("@/lib/offline", () => ({ getRecentTopics: vi.fn() }));

const readRecent = vi.mocked(getRecentTopics);

function topic(id: string, slug = id): Topic {
  return {
    id,
    slug,
    title: slug,
    aliases: [],
    scoreCategory: "",
    scoreNodeId: "section",
    tags: [],
    updatedAt: "2026-08-19T00:00:00.000Z",
    approvedVersion: { id: `${slug}-v1`, topicId: slug, versionNumber: 1, status: "approved", blocks: [], sourceIds: [], scoreNodeId: "section", tags: [], warnings: [], createdAt: "2026-08-19T00:00:00.000Z" },
    versions: [],
  };
}

beforeEach(() => { readRecent.mockResolvedValue([]); });
afterEach(() => { vi.clearAllMocks(); });

describe("TopicsResume", () => {
  it("prefers the most recently viewed approved topic on this device", async () => {
    readRecent.mockResolvedValue([topic("device-recent")]);
    render(<TopicsResume fallbackSlug="fallback" approvedTopics={[{ id: "device-recent", slug: "device-recent" }]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/device-recent");
  });

  it("uses the curriculum fallback when this device has no recents", async () => {
    render(<TopicsResume fallbackSlug="fallback" approvedTopics={[]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/fallback");
  });

  it("maps a stale device slug to the current approved topic slug", async () => {
    readRecent.mockResolvedValue([topic("stable-id", "old-slug")]);
    render(<TopicsResume fallbackSlug="fallback" approvedTopics={[{ id: "stable-id", slug: "current-slug" }]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/current-slug");
  });

  it("ignores a device recent that is no longer in the library", async () => {
    readRecent.mockResolvedValue([topic("removed-id", "removed-slug")]);
    render(<TopicsResume fallbackSlug="fallback" approvedTopics={[{ id: "current-id", slug: "current-slug" }]} />);

    expect(await screen.findByRole("link", { name: /resume topic/i })).toHaveAttribute("href", "/topics/fallback");
  });

  it("falls back to the empty state when the device storage read fails and there is no fallback", async () => {
    readRecent.mockRejectedValue(new Error("blocked"));
    render(<TopicsResume approvedTopics={[]} />);

    expect(await screen.findByText("No topic ready to resume.")).toBeInTheDocument();
  });
});
```

- [ ] **Step 8: Run the affected tests**

```bash
node node_modules/vitest/vitest.mjs run src/app/topics src/components/__tests__/topics-resume.test.tsx
```

Expected: PASS, 3 + 5 tests.

- [ ] **Step 9: Typecheck and commit**

```bash
node node_modules/typescript/bin/tsc --noEmit && echo TYPES_OK
```

```bash
git add src/app/topics src/components/topics-resume.tsx src/components/__tests__/topics-resume.test.tsx && git commit -m "refactor(topics): prerender topic routes from the static library

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

The resume test lives under `src/components/__tests__/`, which neither of the other two paths reaches — omit it and Step 7's rewrite is left unstaged.

---

## Task 5: The home page becomes client-side search

`searchParams` cannot be read in a server component under `output: "export"`. The search page moves to the client, where it can read `?q=` and search the library the device already has.

**Files:**
- Create: `src/components/search-experience.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/search-form.tsx`

- [ ] **Step 1: Create the client search experience**

Create `src/components/search-experience.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookmarkSimple, ClockCounterClockwise, Notebook } from "@phosphor-icons/react";
import { SearchForm } from "@/components/search-form";
import { TopicCard } from "@/components/topic-card";
import { RecentTopics } from "@/components/recent-topics";
import { FavoriteTopics } from "@/components/favorite-topics";
import { loadLibrary } from "@/lib/library-client";
import { searchTopics } from "@/lib/search";
import type { Topic } from "@/lib/types";

export function SearchExperience() {
  const query = useSearchParams().get("q") ?? "";
  const [topics, setTopics] = useState<Topic[] | null>(null);
  useEffect(() => { loadLibrary().then((library) => setTopics(library.topics)).catch(() => setTopics([])); }, []);
  const reviewed = topics ?? [];
  const results = query ? searchTopics(query, reviewed) : reviewed;
  const sectionsCovered = new Set(reviewed.map((topic) => topic.scoreNodeId)).size;
  return (
    <>
      <section className="search-hero">
        <p className="eyebrow">Private clinical atlas</p>
        <h1 className="visually-hidden">Pocket Chief</h1>
        <p className="page-lede">Search general surgery notes, decision flows, procedures, and high-yield board pearls.</p>
        <SearchForm defaultValue={query} />
        <p className="search-hint">Titles, aliases, headings, SCORE categories, body text, and tags · typo tolerant</p>
      </section>

      {query ? (
        <section className="section" aria-live="polite">
          <div className="section-heading"><h2>{results.length} {results.length === 1 ? "result" : "results"} for “{query}”</h2><Link href="/">Clear search</Link></div>
          {results.length ? <div className="topic-grid">{results.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div> : (
            <div className="empty-state"><span className="empty-icon"><Notebook size={22} /></span><h2>No topic matches yet</h2><p>Try an alias or shorter term.</p><Link className="button" href="/topics"><Notebook size={15} />Browse the curriculum</Link></div>
          )}
        </section>
      ) : (
        <>
          <section className="section">
            <div className="section-heading"><h2>Recently viewed</h2><Link href="/topics">Browse curriculum</Link></div>
            <RecentTopics fallback={reviewed.slice(0, 6)} />
          </section>
          <section className="section">
            <div className="section-heading"><h2>Favorites</h2><Link href="/saved">View all saved</Link></div>
            <FavoriteTopics />
          </section>
          <section className="section">
            <div className="section-heading"><h2>Library</h2><span>{sectionsCovered} SCORE {sectionsCovered === 1 ? "section" : "sections"} covered</span></div>
            <div className="topic-grid">
              <Link href="/topics" className="topic-card"><span className="topic-icon"><Notebook size={19} /></span><span><h3>Browse the SCORE curriculum</h3><p>Every reviewed topic, by section</p></span><span className="topic-card-meta">{reviewed.length} topics</span></Link>
              <Link href="/saved" className="topic-card"><span className="topic-icon"><ClockCounterClockwise size={19} /></span><span><h3>Return to saved topics</h3><p>Private bookmarks available offline</p></span><span className="topic-card-meta"><BookmarkSimple size={14} /> On this device</span></Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
```

- [ ] **Step 2: Reduce the home page to a Suspense shell**

Replace the whole of `src/app/page.tsx`:

```tsx
import { Suspense } from "react";
import { SearchExperience } from "@/components/search-experience";

// `useSearchParams` needs a Suspense boundary to prerender: the static HTML is built without a
// query string and the client fills it in on hydration.
export default function SearchPage() {
  return <Suspense fallback={<div className="loading-stack"><div className="skeleton card" /><div className="skeleton card" /></div>}><SearchExperience /></Suspense>;
}
```

- [ ] **Step 3: Point the quick-results dropdown at the shipped library**

In `src/components/search-form.tsx`, change the import line

```tsx
import { getCachedTopics } from "@/lib/offline";
```

to

```tsx
import { loadLibrary } from "@/lib/library-client";
```

and change the effect

```tsx
  useEffect(() => { getCachedTopics().then(setCached).catch(() => undefined); }, []);
```

to

```tsx
  useEffect(() => { loadLibrary().then((library) => setCached(library.topics)).catch(() => undefined); }, []);
```

Leave everything else in the file alone — the offline-submit guard and the `defaultValue` resync still behave the same.

- [ ] **Step 4: Typecheck**

```bash
node node_modules/typescript/bin/tsc --noEmit && echo TYPES_OK
```

Expected: `TYPES_OK`.

**Task 6 must land in the same sitting as this one.** `FavoriteTopics` still declares its `fallback` prop here, and while omitting it typechecks, the runtime semantics are destructive: `fallback` defaults to `[]`, and the component treats that as the authoritative server-side bookmark list, so its reconciliation branch unsaves every topic in IndexedDB that is absent from it — which is all of them. Worse, the `[]` default is a fresh array identity each render and sits in the effect's dependency array, so it re-runs continuously rather than once on mount. Landing Task 5 alone leaves a branch where visiting the home page online wipes the device's bookmarks. Task 6 rewrites the component to read only from the device, deleting the reconciliation path entirely, which is the real fix — do not paper over it here.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/components/search-experience.tsx src/components/search-form.tsx && git commit -m "refactor(search): move the home page to client-side search

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 6: Saved, favorites and recents read only the device

**Files:**
- Modify: `src/components/saved-library.tsx`
- Modify: `src/components/favorite-topics.tsx`
- Modify: `src/components/recent-topics.tsx`
- Test: `src/components/__tests__/favorite-topics.test.tsx`

- [ ] **Step 1: Rewrite the saved library**

Replace the whole of `src/components/saved-library.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookmarkSimple, MagnifyingGlass } from "@phosphor-icons/react";
import { getSavedTopics } from "@/lib/offline";
import type { Topic } from "@/lib/types";
import { TopicCard } from "@/components/topic-card";

export function SavedLibrary() {
  const [topics, setTopics] = useState<Topic[] | null>(null);
  useEffect(() => { getSavedTopics().then(setTopics).catch(() => setTopics([])); }, []);
  if (topics === null) return <div className="loading-stack"><div className="skeleton card" /><div className="skeleton card" /></div>;
  if (topics.length) return <div className="topic-grid">{topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>;
  return <div className="empty-state"><span className="empty-icon"><BookmarkSimple size={23} /></span><h2>No saved topics yet</h2><p>Use the bookmark on any topic. Saved topics stay cached on this device.</p><Link className="button" href="/"><MagnifyingGlass size={15} />Find a topic</Link></div>;
}
```

- [ ] **Step 2: Rewrite favorites**

Replace the whole of `src/components/favorite-topics.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookmarkSimple, Notebook } from "@phosphor-icons/react";
import { getSavedTopics } from "@/lib/offline";
import type { Topic } from "@/lib/types";
import { TopicCard } from "@/components/topic-card";

// Bookmarks live only on this device now, so IndexedDB is the whole story: there is no server copy
// to reconcile against and no ordering rule to protect.
export function FavoriteTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  useEffect(() => { getSavedTopics().then(setTopics).catch(() => undefined); }, []);
  if (topics.length) return <div className="topic-grid">{topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>;
  return <div className="empty-state compact"><span className="empty-icon"><BookmarkSimple size={22} /></span><h2>No favorites saved yet</h2><p>Bookmark any topic while reading to pin it here for quick access.</p><Link className="button" href="/topics"><Notebook size={15} />Browse topics</Link></div>;
}
```

- [ ] **Step 3: Leave `recent-topics.tsx` alone**

It already reads `getRecentTopics()` and takes a `fallback` prop, which `SearchExperience` now supplies from the library. No change needed. Open it and confirm it matches this — if it does not, stop and report the difference.

- [ ] **Step 4: Rewrite the favorites test**

Replace the whole of `src/components/__tests__/favorite-topics.test.tsx`:

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getSavedTopics } from "@/lib/offline";
import { FavoriteTopics } from "@/components/favorite-topics";
import type { Topic } from "@/lib/types";

vi.mock("@/lib/offline", () => ({ getSavedTopics: vi.fn() }));

const readSaved = vi.mocked(getSavedTopics);

function topic(id: string, title: string): Topic {
  return {
    id,
    title,
    slug: id,
    aliases: [],
    scoreCategory: "Biliary Tract",
    scoreNodeId: "biliary",
    tags: ["biliary"],
    updatedAt: "2026-08-12T00:00:00.000Z",
    approvedVersion: { id: `${id}-v1`, topicId: id, versionNumber: 1, status: "approved", reviewedBy: "owner", reviewedAt: "2026-08-12T00:00:00.000Z", sourceIds: ["src-1"], scoreNodeId: "biliary", tags: ["biliary"], warnings: [], blocks: [], createdAt: "2026-08-12T00:00:00.000Z" },
    versions: [],
  };
}

afterEach(() => vi.clearAllMocks());

describe("FavoriteTopics", () => {
  it("renders the topics bookmarked on this device", async () => {
    readSaved.mockResolvedValue([topic("choledocholithiasis", "Choledocholithiasis")]);
    render(<FavoriteTopics />);
    await waitFor(() => expect(screen.getByText("Choledocholithiasis")).toBeInTheDocument());
  });

  it("invites the reader to browse when nothing is bookmarked", async () => {
    readSaved.mockResolvedValue([]);
    render(<FavoriteTopics />);
    await waitFor(() => expect(screen.getByText("No favorites saved yet")).toBeInTheDocument());
  });

  it("shows the empty state rather than failing when storage is unavailable", async () => {
    readSaved.mockRejectedValue(new Error("blocked"));
    render(<FavoriteTopics />);
    await waitFor(() => expect(screen.getByText("No favorites saved yet")).toBeInTheDocument());
  });
});
```

- [ ] **Step 5: Run the tests**

```bash
node node_modules/vitest/vitest.mjs run src/components/__tests__/favorite-topics.test.tsx
```

Expected: PASS, 3 tests.

- [ ] **Step 6: Commit**

```bash
git add src/components/saved-library.tsx src/components/favorite-topics.tsx src/components/__tests__/favorite-topics.test.tsx && git commit -m "refactor(offline): read saved and favorite topics only from the device

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 7: Strip Anki out of the reading view

The per-block "Make Anki" buttons, the selection-capture handler, the cloze dialog, and the SVG context-image generator all go. What is left is a reading view: blocks, bookmarks, reading history, and the three tabs.

**Files:**
- Modify: `src/components/topic-content.tsx`
- Modify: `src/lib/types.ts`
- Modify: `src/app/globals.css`
- Test: `src/components/__tests__/topic-content.test.tsx`, `src/lib/__tests__/content-contract.test.ts`

- [ ] **Step 1: Rewrite `src/components/topic-content.tsx`**

Roughly a third of the file goes. Replace it in full:

```tsx
"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BookmarkSimple, Brain, CaretDown, CaretUp, CheckCircle, Warning, WarningOctagon } from "@phosphor-icons/react";
import type { SuppliedSource, Topic, TopicBlock } from "@/lib/types";
import type { InlineSegment, LinkIndexEntry } from "@/lib/inline";
import { bulletDepth, createLinkScope, headingLevel, parseInline } from "@/lib/inline";
import { isTopicSaved, recordRecentView, setTopicSaved } from "@/lib/offline";
import { InlineText } from "@/components/inline-text";
import { DecisionFlow } from "@/components/decision-flow";

function SupportMark({ block }: { block: TopicBlock }) {
  const supported = block.claims.every((claim) => claim.status === "cited" && claim.citationIds.length > 0);
  return <span className={`support-mark ${supported ? "supported" : "unsupported"}`} title={supported ? "All factual claims linked to supplied sources" : "Unresolved source support"}><CheckCircle size={13} weight="fill" />{supported ? "Supported" : "Needs support"}</span>;
}

const CALLOUT_ICONS = { pearl: CheckCircle, mnemonic: Brain, danger: WarningOctagon } as const;

function CalloutIcon({ tone }: { tone?: "pearl" | "mnemonic" | "danger" }) {
  const Icon = tone ? CALLOUT_ICONS[tone] : Warning;
  return <span className="callout-icon"><Icon size={15} weight="fill" /></span>;
}

interface BulletNode { item: string; segments: InlineSegment[]; depth: 0 | 1 | 2; children: BulletNode[] }

/**
 * Turns the flat `- ` / `-- ` prefixed items into real nesting. A flat list with left padding
 * looks indented but tells a screen reader nothing about what belongs under what.
 *
 * Parsing happens here rather than in the leaf so every `parseInline` call for a block runs
 * inside that block's render, in document order, against the one scope it was given.
 */
function bulletTree(items: string[], parse: (text: string) => InlineSegment[]): BulletNode[] {
  const roots: BulletNode[] = [];
  const stack: BulletNode[] = [];
  for (const item of items) {
    const { depth, text } = bulletDepth(item);
    const node: BulletNode = { item, segments: parse(text), depth, children: [] };
    // A `--` item that never got a `-` parent hangs off the nearest shallower item instead.
    while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
    (stack[stack.length - 1]?.children ?? roots).push(node);
    stack.push(node);
  }
  return roots;
}

function BulletList({ nodes, nested }: { nodes: BulletNode[]; nested?: boolean }) {
  return <ul className={nested ? "clinical-list clinical-list-nested" : "clinical-list"}>{nodes.map((node) => <li key={node.item} data-depth={node.depth}><span><InlineText segments={node.segments} /></span>{node.children.length > 0 && <BulletList nodes={node.children} nested />}</li>)}</ul>;
}

function Block({ block, expanded, linkEntries, selfSlug, onToggle }: { block: TopicBlock; expanded: boolean; linkEntries: LinkIndexEntry[]; selfSlug: string; onToggle: (id: string, open: boolean) => void }) {
  // Built fresh on every render, never memoized: parseInline records each linked key on the
  // scope so a term fires once per block, which means a reused scope renders the second pass
  // with every link already spent.
  const scope = createLinkScope(linkEntries, selfSlug);
  const inline = (text: string) => <InlineText segments={parseInline(text, scope)} />;
  const title = block.heading ? headingLevel(block.heading) : null;
  const callout = block.type === "summary" || block.type === "warning";
  const collapsible = Boolean(title) && !callout;
  const Heading = title?.level === 3 ? "h3" : "h2";
  // Headings parse emphasis but not links — an anchor inside a <summary> would both navigate
  // and toggle the section on the same click.
  const headingNode = title && <Heading><InlineText segments={parseInline(title.text)} /></Heading>;
  const icon = block.type === "warning" ? <CalloutIcon tone={block.tone} /> : null;
  const actions = title && <div className="block-actions"><SupportMark block={block} /></div>;
  const frame = (children: ReactNode, extra = "") => {
    const anchors = { id: block.id, "data-block-id": block.id, ...(title?.level === 3 ? { "data-level": "3" } : {}) };
    if (collapsible) return <details {...anchors} className={`topic-block section-block${extra}`} open={expanded} onToggle={(event) => onToggle(block.id, event.currentTarget.open)}><summary className="block-heading" aria-label={title!.text}>{headingNode}<span className="block-disclosure" aria-hidden="true"><CaretDown size={13} weight="bold" /></span>{actions}</summary>{children}</details>;
    return <section {...anchors} className={`topic-block${extra}`}>{title ? <div className="block-heading">{icon}{headingNode}{actions}</div> : icon}{children}</section>;
  };
  if (block.type === "summary") return frame(<p>{inline(block.text)}</p>, " summary-block");
  if (block.type === "prose") return frame(<p>{inline(block.text)}</p>);
  if (block.type === "warning") return frame(<p>{inline(block.text)}</p>, ` warning-block${block.tone ? ` tone-${block.tone}` : ""}`);
  if (block.type === "bullets") return frame(<BulletList nodes={bulletTree(block.items, (text) => parseInline(text, scope))} />);
  if (block.type === "table") return frame(<div className="table-scroll"><table><thead><tr>{block.columns.map((column) => <th key={column}>{inline(column)}</th>)}</tr></thead><tbody>{block.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell}>{inline(cell)}</th> : <td key={`${row[0]}-${cell}`}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>);
  if (block.type === "sequence") return frame(<ol className="sequence-list">{block.steps.map((step, index) => <li key={step.title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><div><strong>{inline(step.title)}</strong><p>{inline(step.detail)}</p></div></li>)}</ol>);
  if (block.type === "flow") return frame(<DecisionFlow block={block} renderInline={inline} />);
  if (block.type === "image") {
    const media = <><Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/${block.mediaId}`} alt={block.alt} width={1200} height={630} unoptimized />{block.caption && <figcaption>{inline(block.caption)}</figcaption>}</>;
    return collapsible ? frame(<figure>{media}</figure>) : <figure id={block.id} data-block-id={block.id} className="topic-block">{media}</figure>;
  }
  return null;
}

export function TopicContent({ topic, sources, linkEntries }: { topic: Topic; sources: SuppliedSource[]; linkEntries: LinkIndexEntry[] }) {
  const [saved, setSaved] = useState(false);
  const [savedReady, setSavedReady] = useState(false);
  const [saveError, setSaveError] = useState("");
  const savedTouched = useRef(false);
  const version = topic.approvedVersion!;
  const blocks = useMemo(() => version.blocks.filter((block) => block.type !== "references"), [version]);
  // Callouts stay open prose; only headed non-callout sections carry a disclosure.
  const collapsible = useMemo(() => blocks.filter((block) => block.heading && block.type !== "summary" && block.type !== "warning").map((block) => block.id), [blocks]);
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => new Set());
  const allOpen = collapsed.size === 0;
  // Mirroring every native toggle back into state is what lets "Expand all" reopen a section the
  // reader closed by hand — otherwise React sees an unchanged `open` prop and leaves the DOM alone.
  function setBlockOpen(id: string, open: boolean) {
    setCollapsed((current) => { if (open !== current.has(id)) return current; const next = new Set(current); if (open) next.delete(id); else next.add(id); return next; });
  }
  useEffect(() => {
    recordRecentView(topic).catch(() => undefined);
    // A blocked IndexedDB request neither resolves nor rejects, so awaiting it alone left
    // Save disabled forever. Racing a timeout means the button is always usable; the worst
    // case is that it opens showing "Save" on a topic already saved on this device, which
    // toggleSaved corrects on the next write.
    Promise.race([isTopicSaved(topic.id), new Promise<boolean | undefined>((resolve) => setTimeout(() => resolve(undefined), 1500))])
      .then((value) => { if (typeof value === "boolean" && !savedTouched.current) setSaved(value); }).catch(() => undefined).finally(() => setSavedReady(true));
  }, [topic]);

  function toggleSaved() {
    savedTouched.current = true;
    const next = !saved; setSaved(next); setSaveError("");
    setTopicSaved(topic, next).catch(() => setSaveError("This device blocked private storage, so the bookmark was not kept."));
  }

  return (
    <>
      <div className="topic-actions-row"><button className={`button secondary small ${saved ? "saved" : ""}`} disabled={!savedReady} onClick={toggleSaved}><BookmarkSimple size={14} weight={saved ? "fill" : "regular"} />{saved ? "Saved offline" : "Save"}</button>{collapsible.length > 0 && <button className="expand-toggle" onClick={() => setCollapsed(allOpen ? new Set(collapsible) : new Set())}>{allOpen ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}{allOpen ? "Collapse all" : "Expand all"}</button>}{saveError && <span className="form-message" role="alert">{saveError}</span>}</div>
      <Tabs.Root defaultValue="notes" className="topic-tabs">
        <Tabs.List className="tabs-list" aria-label="Topic views"><Tabs.Trigger value="notes">Notes</Tabs.Trigger><Tabs.Trigger value="sources">Sources <span>{sources.length}</span></Tabs.Trigger><Tabs.Trigger value="history">History <span>{topic.versions.length}</span></Tabs.Trigger></Tabs.List>
        <Tabs.Content value="notes"><article className="topic-article">{blocks.map((block) => <Block key={block.id} block={block} expanded={!collapsed.has(block.id)} linkEntries={linkEntries} selfSlug={topic.slug} onToggle={setBlockOpen} />)}</article></Tabs.Content>
        <Tabs.Content value="sources"><div className="source-list">{sources.map((source, index) => <article key={source.id}><span>{index + 1}</span><div><h2>{source.title}</h2><p>{source.citation}</p>{source.details && <small>{source.details}</small>}</div></article>)}</div></Tabs.Content>
        <Tabs.Content value="history"><div className="history-list">{topic.versions.map((item) => <article key={item.id}><span className="status-dot" /><div><h2>Version {item.versionNumber} · {item.status}</h2><p>{item.reviewedAt ? `Reviewed ${new Date(item.reviewedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : "Draft in review"}</p></div></article>)}</div></Tabs.Content>
      </Tabs.Root>
    </>
  );
}
```

- [ ] **Step 2: Drop the Anki types**

In `src/lib/types.ts`, delete the last two interfaces:

```ts
export interface ClozeDraft {
  id: string;
  clozeText: string;
  additionalContext: string;
  sourceBlockIds: string[];
  contextImageRef: string;
  tags: string[];
  duplicateHash: string;
}

export interface AnkiSettings {
  deck: string;
  noteType: string;
  tagPrefix: string;
  fieldMap?: { text: string; extra: string };
}
```

- [ ] **Step 3: Remove the dead CSS**

In `src/app/globals.css`, delete these rules. Match on the selector, not on a line number — earlier edits shift them.

Three `.anki-inline` rules, immediately after `.support-mark.unsupported`:

```css
.anki-inline { position: relative; display: inline-flex; align-items: center; gap: 4px; padding: 4px var(--space-2); border: 0; border-radius: var(--radius-sm); background: transparent; color: var(--ink-faint); font-size: var(--text-2xs); cursor: pointer; }
.anki-inline::after { content: ""; position: absolute; inset: -11px 0; }
.anki-inline:hover { background: var(--surface-strong); color: var(--cobalt-dark); }
```

The dialog group, five consecutive lines beginning `.anki-dialog {`, through the line containing `.dialog-actions`:

```css
.anki-dialog { position: fixed; z-index: var(--z-dialog); inset: auto 10px max(10px, env(safe-area-inset-bottom)); width: min(620px, calc(100% - 20px)); max-height: calc(100vh - 40px); overflow-y: auto; margin: 0 auto; padding: 18px; border: 1px solid var(--line-strong); border-radius: 15px; background: var(--surface); color: var(--ink); box-shadow: 0 24px 90px rgb(0 0 0 / .35); }
.anki-dialog::backdrop { background: rgb(7 12 24 / .45); backdrop-filter: blur(3px); }
.dialog-head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }.dialog-head h2 { margin: 0; font-size: 18px; }.dialog-head .eyebrow { margin-bottom: 2px; }
.context-preview { margin: 15px 0; padding: 13px; border-left: 3px solid var(--cobalt); border-radius: 8px; background: var(--cobalt-soft); }.context-preview small, .context-preview strong { display: block; }.context-preview small { color: var(--cobalt-dark); font-size: 9px; text-transform: uppercase; letter-spacing: .06em; }.context-preview strong { margin-top: 4px; font-size: 12px; }.context-preview p { margin: 3px 0 0; color: var(--ink-muted); font-size: 11px; }
.anki-dialog textarea { min-height: 110px; }.dialog-actions { display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 8px; }
```

The three `.support-confirm` rules directly beneath them — those styled the draft-review attestation checkbox, which Task 9 deletes:

```css
.support-confirm { display: grid; justify-items: start; gap: 9px; margin-top: 13px; padding: 11px; border: 1px solid var(--line); border-radius: 9px; background: var(--cobalt-soft); }
.support-confirm label { display: flex; align-items: flex-start; gap: 8px; color: var(--ink-muted); font-size: 11px; line-height: 1.45; }
.support-confirm input { width: 14px; height: 14px; margin-top: 1px; accent-color: var(--cobalt); }
```

One line inside the narrow-viewport media query, next to `.support-mark { font-size: 9px; }`:

```css
  .anki-inline { font-size: 9px; }
```

One line inside the `@media (min-width: 760px)` block:

```css
  .anki-dialog { inset: 50% auto auto 50%; transform: translate(-50%, -50%); }
```

Finally, correct the comment above `.block-heading > div`, which explains itself by reference to the deleted draft-review view:

```css
/* .block-heading > div is the actions group and must stay shrinkable next to a long heading.
   Only .block-actions is pinned. */
```

- [ ] **Step 4: Update the component test**

In `src/components/__tests__/topic-content.test.tsx`, delete the `next/navigation` mock on line 6:

```tsx
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
```

In the test named `"renders inline markup, nesting, tones, and collapse state"`, delete the Anki assertion in the bullet section:

```tsx
    expect(screen.getByLabelText("Make Anki card from Deep one")).toBeInTheDocument();
```

and delete the final four lines of that same test, which click the in-summary Anki button:

```tsx
    // Anki button inside a summary must not toggle the section.
    const ankiInSummary = details[0].querySelector("button.anki-inline")!;
    fireEvent.click(ankiInSummary);
    expect((details[0] as HTMLDetailsElement).open).toBe(true);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
```

Then add one case at the end of the `describe` block, pinning the removal so nobody reintroduces it by accident:

```tsx
  it("offers no flashcard affordance anywhere in the reading view", () => {
    const { container } = render(<TopicContent topic={topic} sources={[]} linkEntries={entries} />);
    expect(container.querySelector("button.anki-inline")).toBeNull();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText(/anki/i)).not.toBeInTheDocument();
  });
```

`fireEvent` is still used by the collapse test, so leave its import alone.

- [ ] **Step 5: Rename the content-contract case that justified itself by Anki**

`stripMarkup` still matters — `src/components/decision-flow.tsx` builds its screen-reader edge descriptions with it, so a marker that survives stripping ends up read aloud. Only the name and comment need correcting. In `src/lib/__tests__/content-contract.test.ts`, change:

```ts
  it("keeps markup out of the text Anki exports", () => {
```

to:

```ts
  // decision-flow.tsx builds its accessible edge descriptions from stripped labels, so a marker
  // that survives stripping is read aloud verbatim.
  it("strips every inline marker without emptying a factual unit", () => {
```

- [ ] **Step 6: Run the affected tests**

```bash
node node_modules/vitest/vitest.mjs run src/components/__tests__/topic-content.test.tsx src/lib/__tests__/content-contract.test.ts
```

Expected: PASS.

- [ ] **Step 7: Typecheck and commit**

```bash
node node_modules/typescript/bin/tsc --noEmit && echo TYPES_OK
```

**`tsc` will not be clean after this step, and that is expected.** Removing `ClozeDraft` and `AnkiSettings` breaks every file that still imports them. Measured after implementing this task, `tsc --noEmit` reports 12 errors across exactly these eight files:

```
src/lib/ai.ts          src/lib/backup.ts              src/lib/repository.ts
src/lib/anki.ts        src/lib/repositories/demo.ts   src/lib/store.ts
src/lib/anki-settings.ts   src/lib/repositories/supabase.ts
```

Every one is on Task 9's deletion list, so the breakage is confined to code that is about to be removed — the card-storage feature (`addCard`, `updateCard`, `listCards`, `buildBackupManifest`) reached further into the repository layer than the type names suggest. Note `settings-form.tsx` does *not* error: it only consumes already-broken exports, so TypeScript does not re-flag it.

Cross-check the list rather than trusting it: any erroring file that is not one Task 9 deletes is a real problem you introduced. Use `eslint` and the test suite as this task's green signals, and treat `tsc` as a scoped check until Task 9 lands.

```bash
git add src/components/topic-content.tsx src/components/__tests__/topic-content.test.tsx src/lib/types.ts src/app/globals.css src/lib/__tests__/content-contract.test.ts && git commit -m "refactor(topic): remove Anki export from the reading view

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 8: Settings becomes device storage only

With Anki gone, Settings holds one control: clearing what the app stored in this browser.

**Files:**
- Modify: `src/components/settings-form.tsx`
- Modify: `src/app/settings/page.tsx`

- [ ] **Step 1: Rewrite the settings form**

Replace the whole of `src/components/settings-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Trash } from "@phosphor-icons/react";
import { clearPrivateOfflineData } from "@/lib/offline";

export function SettingsForm() {
  const [status, setStatus] = useState("");
  async function clearOfflineData() {
    setStatus("");
    try {
      await clearPrivateOfflineData();
      navigator.serviceWorker?.controller?.postMessage({ type: "CLEAR_PRIVATE_DATA" });
      setStatus("Cleared. Reload to restore the atlas from the app bundle.");
    } catch { setStatus("Could not clear offline storage. Close other Pocket Chief tabs and try again."); }
  }
  return (
    <div className="settings-grid">
      <section className="form-card">
        <div className="section-heading"><h2>Offline storage</h2><span>This device</span></div>
        <p className="settings-copy">Pocket Chief keeps the atlas, your bookmarks, and your reading history in this browser. Clearing removes all three; the atlas comes back on the next load, your bookmarks do not.</p>
        <div className="settings-actions"><button type="button" className="button ghost danger" onClick={clearOfflineData}><Trash size={15} />Clear offline data</button></div>
        {status && <p className="form-message" role="status">{status}</p>}
      </section>
      <section className="form-card">
        <div className="section-heading"><h2>The library</h2><span>Read only</span></div>
        <p className="settings-copy">Topics are authored as files in <code>src/content/</code> and ship with the app. Adding or revising one is a commit to the repository, not an edit here.</p>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite the settings page**

Replace the whole of `src/app/settings/page.tsx`:

```tsx
import type { Metadata } from "next";
import { SettingsForm } from "@/components/settings-form";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return <><div className="page-heading"><div><p className="eyebrow">Preferences</p><h1 className="page-title">Settings</h1><p className="page-lede">Manage what Pocket Chief stores on this device.</p></div></div><SettingsForm /></>;
}
```

- [ ] **Step 3: Typecheck**

```bash
node node_modules/typescript/bin/tsc --noEmit && echo TYPES_OK
```

Expected: errors only in `src/lib/anki.ts` and `src/lib/anki-settings.ts`, which Task 9 deletes. No other file may appear.

- [ ] **Step 4: Commit**

```bash
git add src/app/settings src/components/settings-form.tsx && git commit -m "refactor(settings): keep only the offline-storage control

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---
## Task 9: Delete the server surface

Everything below is now unreachable. This is the big deletion; it is safe because Tasks 4–8 removed every caller.

**Files:**
- Delete: `src/app/api/`, `src/app/auth/`, `src/app/add/`, `src/app/drafts/`, `src/app/configuration-error/`, `src/proxy.ts`, `src/lib/repository.ts`, `src/lib/repositories/`, `src/lib/supabase/`, `src/lib/auth.ts`, `src/lib/data-mode.ts`, `src/lib/store.ts`, `src/lib/ai.ts`, `src/lib/safety.ts`, `src/lib/schemas.ts`, `src/lib/rate-limit.ts`, `src/lib/backup.ts`, `src/lib/library-install.ts`, `src/components/add-note-form.tsx`, `src/components/draft-review.tsx`, `src/components/sign-in-form.tsx`, `supabase/`, and the tests listed below
- Modify: `src/components/app-shell.tsx`, `src/lib/__tests__/content-contract.test.ts`, `src/components/__tests__/app-shell.test.tsx`

- [ ] **Step 1: Delete the routes, pages and server modules**

```bash
git rm -r --quiet src/app/api src/app/auth src/app/add src/app/drafts src/app/configuration-error src/lib/repositories src/lib/supabase supabase
```

```bash
git rm --quiet src/proxy.ts src/lib/repository.ts src/lib/auth.ts src/lib/data-mode.ts src/lib/store.ts src/lib/ai.ts src/lib/safety.ts src/lib/schemas.ts src/lib/rate-limit.ts src/lib/backup.ts src/lib/library-install.ts src/lib/anki.ts src/lib/anki-settings.ts src/components/add-note-form.tsx src/components/draft-review.tsx src/components/sign-in-form.tsx
```

- [ ] **Step 2: Delete the tests that covered them**

```bash
git rm --quiet src/lib/__tests__/auth-mode.test.ts src/lib/__tests__/security-contract.test.ts src/lib/__tests__/ai-contract.test.ts src/lib/__tests__/ai-model-config.test.ts src/lib/__tests__/library-install.test.ts src/lib/__tests__/offline-backup.test.ts src/lib/__tests__/safety-anki.test.ts src/lib/__tests__/anki-settings.test.ts
```

`offline-backup.test.ts` also asserted `shouldReplaceCachedTopic`, which is still live. Re-add that one case as `src/lib/__tests__/offline-versioning.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { shouldReplaceCachedTopic } from "@/lib/offline";

describe("offline cache versioning", () => {
  it("replaces stale topic versions only", () => {
    expect(shouldReplaceCachedTopic(undefined, 1)).toBe(true);
    expect(shouldReplaceCachedTopic(2, 3)).toBe(true);
    expect(shouldReplaceCachedTopic(3, 3)).toBe(false);
    expect(shouldReplaceCachedTopic(4, 3)).toBe(false);
  });
});
```

- [ ] **Step 3: Confirm the Anki modules left nothing behind**

Task 7 removed the last runtime caller and Step 2 deleted both test files. Verify no import survives:

```bash
grep -rn "@/lib/anki\|ClozeDraft\|AnkiSettings\|detectLikelyPHI" src --include='*.ts' --include='*.tsx' || echo ANKI_AND_PHI_FULLY_REMOVED
```

Expected: `ANKI_AND_PHI_FULLY_REMOVED`.

PHI detection went with `safety.ts`, deliberately: it guarded free-text input on its way to a model, and the app no longer accepts free-text input or calls a model. `stripMarkup` stays in `src/lib/inline.ts` — `decision-flow.tsx` still needs it, and `inline.test.ts` still covers it.

- [ ] **Step 4: Drop the migration-digest assertion from the content contract**

In `src/lib/__tests__/content-contract.test.ts`, delete the final `it("holds the launch topic to the digest pinned in every Supabase migration", ...)` block together with its preceding comment paragraph. Then replace the first three import lines:

```ts
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
```

with nothing, and change

```ts
import { choledoBlocks, demoTopics, suppliedSources, taxonomy } from "@/lib/seed";
```

to

```ts
import { demoTopics, suppliedSources, taxonomy } from "@/lib/seed";
```

Every other assertion in the file stays — the claim-support invariant, the renderer key rules and the inline-markup guards are all still enforced, just no longer duplicated in SQL.

- [ ] **Step 5: Remove the Add destination from navigation**

In `src/components/app-shell.tsx`, replace the `primaryNavigation` array:

```tsx
export const primaryNavigation = [
  { href: "/", label: "Search", icon: MagnifyingGlass },
  { href: "/topics", label: "Topics", icon: Notebook },
  { href: "/saved", label: "Saved", icon: BookmarkSimple },
];
```

Then remove `Plus` from the `@phosphor-icons/react` import on the same file, and delete the `pathname.startsWith("/auth/")` branch from `AppShell`, so it reads:

```tsx
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <TopicsDrawerProvider><ServiceWorkerRegistration /><OfflineHydrator />{pathname.startsWith("/topics") ? <TopicsRouteShell>{children}</TopicsRouteShell> : <StandardShell>{children}</StandardShell>}</TopicsDrawerProvider>;
}
```

- [ ] **Step 6: Update the app-shell test**

In `src/components/__tests__/app-shell.test.tsx`, change the second test's name to `"renders the three primary mobile destinations"` and delete this line:

```tsx
    expect(screen.getAllByRole("link", { name: /add/i }).length).toBeGreaterThan(0);
```

- [ ] **Step 7: Run the whole suite**

```bash
node node_modules/vitest/vitest.mjs run
```

Expected: PASS. Every remaining failure will name a module you just deleted — fix the importer, do not restore the module.

- [ ] **Step 8: Typecheck and lint**

```bash
node node_modules/typescript/bin/tsc --noEmit && node node_modules/eslint/bin/eslint.js . --max-warnings=0 && echo CLEAN
```

Expected: `CLEAN`. `tsconfig.json` includes `.next/types/**/*.ts`; if stale route types from the deleted API handlers surface, delete `.next/` and rerun.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "refactor: remove the Supabase, OpenAI and authoring server surface

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 10: Prune the editorial module to the authoring invariant

`src/content/authoring.ts` calls `factualUnits`; the content contract test calls `factualUnits` and `supportWarnings`. The draft lifecycle functions have no callers left.

**Files:**
- Modify: `src/lib/editorial.ts`
- Test: `src/lib/__tests__/editorial.test.ts`

- [ ] **Step 1: Confirm nothing else imports the lifecycle functions**

```bash
grep -rn "createDraft\|reviseDraftBlock\|approveDraft\|restoreVersion\|requireOwnerAttestation\|normalizeClaimSupport" src --include='*.ts' --include='*.tsx'
```

Expected: matches only inside `src/lib/editorial.ts` and `src/lib/__tests__/editorial.test.ts`. If anything else appears, stop — a caller survived Task 9.

- [ ] **Step 2: Reduce `src/lib/editorial.ts` to the two live functions**

Replace the whole file:

```ts
import type { TopicBlock } from "@/lib/types";

export function factualUnits(block: TopicBlock): string[] {
  if (block.type === "summary" || block.type === "prose" || block.type === "warning") return [block.text];
  if (block.type === "bullets") return block.items;
  if (block.type === "table") return block.rows.map((row) => row.join(" — "));
  if (block.type === "sequence") return block.steps.map((step) => `${step.title}: ${step.detail}`);
  if (block.type === "flow") return [...block.nodes.map((node) => node.label), ...block.edges.flatMap((edge) => edge.label ? [edge.label] : [])];
  if (block.type === "image") return [block.alt, ...(block.caption ? [block.caption] : [])];
  return [];
}

const comparable = (value: string) => value.trim().replace(/\s+/g, " ");

/**
 * The claim-support invariant, and the only thing standing behind it now that the SQL is gone:
 * a block is supported when `claims[i].text` matches `factualUnits(block)[i]` exactly and in
 * order, every claim is `cited`, and every citation resolves to a source the topic supplied.
 * `sourced()` in `src/content/authoring.ts` derives both sides from `factualUnits`, so the
 * contract test is what catches a hand-edited claim list drifting from rendered text.
 */
export function supportWarnings(blocks: TopicBlock[], validSourceIds?: ReadonlySet<string>): string[] {
  const warnings: string[] = [];
  for (const block of blocks) {
    const units = factualUnits(block);
    units.forEach((unit, index) => {
      const claim = block.claims[index];
      if (!claim || comparable(claim.text) !== comparable(unit)) {
        warnings.push(`Needs support: ${unit}`);
        return;
      }
      const citationsAreValid = claim.citationIds.length > 0
        && (!validSourceIds || claim.citationIds.every((id) => validSourceIds.has(id)));
      if (claim.status !== "cited" || !citationsAreValid) warnings.push(`Needs support: ${claim.text}`);
    });
    for (const claim of block.claims.slice(units.length)) warnings.push(`Needs support: ${claim.text}`);
  }
  return [...new Set(warnings)];
}
```

- [ ] **Step 3: Rewrite the editorial test against `supportWarnings` directly**

Replace the whole of `src/lib/__tests__/editorial.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { factualUnits, supportWarnings } from "@/lib/editorial";
import { demoTopics } from "@/lib/seed";
import type { TopicBlock } from "@/lib/types";

const cited = (text: string, sourceId = "src-1") => ({ id: `claim-${text.slice(0, 12)}`, text, citationIds: [sourceId], status: "cited" as const });
const sources = new Set(["src-1"]);

describe("claim support", () => {
  it("warns when a factual unit has no claim at all", () => {
    const block: TopicBlock = { id: "b1", type: "prose", text: "Stones under 6 mm may pass.", claims: [] };
    expect(supportWarnings([block], sources)).toEqual(["Needs support: Stones under 6 mm may pass."]);
  });

  it("warns when the claim text has drifted from the rendered text", () => {
    const block: TopicBlock = { id: "b1", type: "prose", text: "Stones under 6 mm may pass.", claims: [cited("Something else entirely.")] };
    expect(supportWarnings([block], sources)).toEqual(["Needs support: Stones under 6 mm may pass."]);
  });

  it("accepts a claim that matches apart from whitespace", () => {
    const block: TopicBlock = { id: "b1", type: "prose", text: "Stones  under 6 mm\nmay pass.", claims: [cited("Stones under 6 mm may pass.")] };
    expect(supportWarnings([block], sources)).toEqual([]);
  });

  it("rejects a citation that is not one of the topic's supplied sources", () => {
    const block: TopicBlock = { id: "b1", type: "prose", text: "Stones under 6 mm may pass.", claims: [cited("Stones under 6 mm may pass.", "invented")] };
    expect(supportWarnings([block], sources)).toEqual(["Needs support: Stones under 6 mm may pass."]);
  });

  it("rejects a claim marked cited with no citations", () => {
    const block: TopicBlock = { id: "b1", type: "prose", text: "Stones under 6 mm may pass.", claims: [{ id: "c1", text: "Stones under 6 mm may pass.", citationIds: [], status: "cited" }] };
    expect(supportWarnings([block], sources)).toEqual(["Needs support: Stones under 6 mm may pass."]);
  });

  it("rejects extra claims hidden past the rendered units", () => {
    const block: TopicBlock = { id: "b1", type: "references", heading: "Sources", sourceIds: ["src-1"], claims: [cited("A claim nothing renders.")] };
    expect(supportWarnings([block], sources)).toEqual(["Needs support: A claim nothing renders."]);
  });

  it("requires one claim per table row and per flow node and edge label", () => {
    const table: TopicBlock = { id: "t1", type: "table", columns: ["Route", "When"], rows: [["Transcystic", "Small stone"], ["Choledochotomy", "Large stone"]], claims: [cited("Transcystic — Small stone")] };
    expect(supportWarnings([table], sources)).toEqual(["Needs support: Choledochotomy — Large stone"]);
    const flow: TopicBlock = { id: "f1", type: "flow", nodes: [{ id: "a", label: "Suspected stone" }, { id: "b", label: "MRCP" }], edges: [{ from: "a", to: "b", label: "intermediate risk" }], claims: [] };
    expect(supportWarnings([flow], sources)).toEqual(["Needs support: Suspected stone", "Needs support: MRCP", "Needs support: intermediate risk"]);
  });

  it("requires support for rendered image alt text and captions", () => {
    const block: TopicBlock = { id: "i1", type: "image", mediaId: "m1", alt: "Biliary anatomy", caption: "Cystic duct insertion", claims: [] };
    expect(factualUnits(block)).toEqual(["Biliary anatomy", "Cystic duct insertion"]);
    expect(supportWarnings([block], sources)).toHaveLength(2);
  });

  it("keeps every authored topic in the shipped library source-linked", () => {
    for (const topic of demoTopics) {
      const version = topic.approvedVersion!;
      expect(supportWarnings(version.blocks, new Set(version.sourceIds)), topic.slug).toEqual([]);
    }
  });
});
```

- [ ] **Step 4: Run the affected tests**

```bash
node node_modules/vitest/vitest.mjs run src/lib/__tests__/editorial.test.ts src/lib/__tests__/content-contract.test.ts
```

Expected: PASS.

- [ ] **Step 5: Typecheck, lint and commit**

```bash
node node_modules/typescript/bin/tsc --noEmit && node node_modules/eslint/bin/eslint.js . --max-warnings=0 && echo CLEAN
```

```bash
git add src/lib/editorial.ts src/lib/__tests__/editorial.test.ts && git commit -m "refactor(editorial): keep only the claim-support invariant

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 11: Static export, basePath, manifest, service worker, robots

**Files:**
- Modify: `next.config.ts`, `src/app/manifest.ts`, `public/sw.js`, `src/components/service-worker-registration.tsx`
- Create: `public/robots.txt`
- Modify: `.claude/launch.json`

- [ ] **Step 1: Rewrite `next.config.ts`**

```ts
import type { NextConfig } from "next";

// GitHub Pages serves a project repository under /<repo>, and the app is mounted there in
// development too: a basePath that only exists in CI produces a class of broken-asset bug you
// cannot see until the deploy is live.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/pocket-chief";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  poweredByHeader: false,
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  // Static hosting has no image optimizer.
  images: { unoptimized: true },
  // `headers()` is inert under `output: "export"` and GitHub Pages cannot set response headers.
  // The crawler signals now ship in the document: `robots` metadata in the root layout, plus
  // public/robots.txt.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
```

- [ ] **Step 2: Make the manifest basePath-aware**

Replace the whole of `src/app/manifest.ts`:

```ts
import type { MetadataRoute } from "next";

// Next rewrites hrefs in JSX but not values inside a manifest, so every path here is prefixed by
// hand. `start_url` is what the installed icon opens; getting it wrong installs a 404.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pocket Chief · General Surgery Atlas",
    short_name: "Pocket Chief",
    description: "Private general surgery notes for rapid reference.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#f5f7fb",
    theme_color: "#1748d2",
    orientation: "portrait",
    categories: ["medical", "education", "productivity"],
    icons: [
      { src: `${basePath}/icon.svg`, sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: `${basePath}/icon-maskable.svg`, sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
```

- [ ] **Step 3: Rewrite the service worker**

Replace the whole of `public/sw.js`:

```js
// v4 discards every earlier cache. The worker derives its own mount point from its script URL, so
// the same file works at the site root and under a GitHub Pages project path with no build step.
const BASE = new URL("./", self.location).pathname;
const SHELL = "pocket-chief-shell-v4";
const CONTENT = "pocket-chief-content-v4";
const SHELL_ASSETS = [BASE, `${BASE}topics/`, `${BASE}saved/`, `${BASE}icon.svg`, `${BASE}manifest.webmanifest`, `${BASE}library.json`];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL).then((cache) => cache.addAll(SHELL_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("pocket-chief-") && ![SHELL, CONTENT].includes(key)).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then((response) => {
    // Clone before returning, not inside the caches.open callback: that resolves a microtask later,
    // by which point `return response` has handed the body to the page and cloning throws
    // "Response body is already used". waitUntil keeps the worker alive until the write lands.
    if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CONTENT).then((cache) => cache.put(event.request, copy))); }
    return response;
  }).catch(() => caches.match(event.request).then((cached) => cached || caches.match(BASE))));
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "CLEAR_PRIVATE_DATA") {
    event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("pocket-chief-")).map((key) => caches.delete(key)))));
  }
});
```

- [ ] **Step 4: Register the worker under the basePath**

Replace the whole of `src/components/service-worker-registration.tsx`:

```tsx
"use client";

import { useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Dev registration is opt-in so an in-progress edit is never served from a stale cache; the
    // e2e run sets the flag to exercise the real worker.
    if ("serviceWorker" in navigator && (process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER_TESTS === "true")) {
      navigator.serviceWorker.register(`${basePath}/sw.js`, { scope: `${basePath}/` }).catch(() => undefined);
    }
  }, []);
  return null;
}
```

- [ ] **Step 5: Add `public/robots.txt`**

```
User-agent: *
Disallow: /
```

- [ ] **Step 6: Update the dev preview entry**

`.claude/launch.json` opens the preview at the port root, which is now a 404. Replace its single configuration:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "pocket-chief",
      "runtimeExecutable": "node",
      "runtimeArgs": ["node_modules/next/dist/bin/next", "dev"],
      "port": 3210,
      "autoPort": true,
      "url": "http://localhost:3210"
    }
  ]
}
```

The `url` must stay the bare origin — a localhost preview URL may not carry a path. Navigate to `/pocket-chief/` once the pane opens.

- [ ] **Step 6b: Memoize the library reads before building**

Measured during Task 4: one build pass over the `/topics` tree calls `listTopics()` and friends **95 times**, each `structuredClone`ing the full ~2.7 MB library — the layout re-runs once per generated route, and each topic page also clones the library again for `buildLinkIndex`. That is ~380 ms of pure duplicate work at 46 topics, and it grows roughly quadratically with the library.

Wrap the reads in React's `cache()` so each static-generation pass shares one clone. In `src/lib/library.ts`, import `cache` from `react` and wrap `listTopics`, `getTopicBySlug`, `listTaxonomy`, and `listSources`. `cache()` is scoped to a single render pass, so the 47 independent page generations stay isolated from each other — no cross-page state leaks.

Run `node node_modules/vitest/vitest.mjs run src/lib/__tests__/library.test.ts src/lib/__tests__/library-approval.test.ts` afterwards; both must still pass, since `cache()` must not change return values.

- [ ] **Step 7: Build the static export**

Stop any running preview server first, then:

```bash
rm -rf .next out && node node_modules/next/dist/bin/next build --webpack
```

Expected: `Exporting (…)` followed by a route table, and no error. The build uses webpack because Turbopack's local CSS worker needs a restricted ephemeral port in this environment.

- [ ] **Step 8: Verify the export shape — this is the step that catches basePath and route-handler mistakes**

```bash
ls out/ && echo "--- library ---" && node -e "const l=require('./out/library.json');console.log('topics',l.topics.length,'taxonomy',l.taxonomy.length)" && echo "--- topic pages ---" && ls out/topics | head -5 && ls out/topics | wc -l && echo "--- asset prefix ---" && grep -o '/pocket-chief/_next/static[^\"]*' out/index.html | head -3
```

Expected: `out/` contains `index.html`, `library.json`, `manifest.webmanifest`, `robots.txt`, `sw.js`, `topics/`, `saved/`, `settings/`, `404.html`, `_next/`; the library reports `topics 46 taxonomy 35`; `out/topics` holds 46 directories plus `index.html`; and the asset grep prints paths beginning `/pocket-chief/_next/static`.

**If `out/library.json` is missing**, the route handler did not statically export in this Next version. Take the fallback, which does not depend on Next at all:

1. `git rm -r src/app/library.json`.
2. Create `scripts/emit-library.mjs`, which imports the content through Next's own build output is not possible — instead read the authored modules with Node's TypeScript stripping, which Node 22.18+ enables by default. `src/content/index.ts` uses the `@/` alias, so give the script an explicit alias resolver:

```js
// Emits public/library.json from the authored content. Run before `next dev` and `next build`.
import { register } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

register(pathToFileURL("./scripts/alias-loader.mjs"));
// `demoTopics` is renamed to `libraryTopics` in Task 15; update this import if you take the
// fallback after that rename has landed.
const { demoTopics, taxonomy } = await import("./src/content/index.ts");
mkdirSync("public", { recursive: true });
writeFileSync("public/library.json", JSON.stringify({ topics: demoTopics.filter((topic) => topic.approvedVersion), taxonomy }));
console.log(`library.json: ${demoTopics.length} topics, ${taxonomy.length} taxonomy nodes`);
```

with `scripts/alias-loader.mjs`:

```js
import { pathToFileURL } from "node:url";
import { resolve as resolvePath } from "node:path";

export function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) return next(pathToFileURL(resolvePath("src", specifier.slice(2))).href, context);
  return next(specifier, context);
}
```

3. Add `"prebuild": "node scripts/emit-library.mjs"` and `"predev": "node scripts/emit-library.mjs"` to `package.json`, and add `public/library.json` to `.gitignore`.
4. Rerun the build and Step 8's verification.

Report in the final summary which path you took — the route handler or the emitter — because it changes what a future content addition has to re-run.

- [ ] **Step 9: Verify the manifest and service worker paths**

```bash
cat out/manifest.webmanifest && echo "--- sw base ---" && head -6 out/sw.js
```

Expected: `start_url` and `scope` are `/pocket-chief/`, icon `src` values start `/pocket-chief/`, and `sw.js` still derives `BASE` from `self.location`.

- [ ] **Step 10: Commit**

```bash
git add next.config.ts src/app/manifest.ts public/sw.js public/robots.txt src/components/service-worker-registration.tsx .claude/launch.json && git commit -m "feat(build): export a static PWA under the GitHub Pages base path

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 12: Prune dependencies and scripts

**Files:**
- Modify: `package.json`, `.env.example`
- Delete: `.env.example` is rewritten, not deleted

- [ ] **Step 1: Confirm the dependencies are genuinely unused**

```bash
grep -rn "@supabase/\|from \"zod\"\|jszip\|JSZip" src tests --include='*.ts' --include='*.tsx' || echo NONE_REFERENCED
```

Expected: `NONE_REFERENCED`. If `jszip` still appears in `tests/e2e/`, that is fine — Task 13 removes it, so run this check again afterwards rather than removing the dependency now.

- [ ] **Step 2: Remove the dead dependencies**

Edit `package.json`: delete these four lines from `dependencies`:

```json
    "@supabase/ssr": "^0.7.0",
    "@supabase/supabase-js": "^2.57.4",
    "jszip": "^3.10.1",
    "zod": "^4.1.12",
```

- [ ] **Step 3: Replace the `start` script with a static preview**

`next start` cannot serve a static export. Create `scripts/serve-out.mjs`:

```js
// Serves the built `out/` directory the way GitHub Pages does: under the base path, resolving a
// directory to its index.html. This previews the real artifact; it is not a production server.
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/pocket-chief";
const port = Number(process.env.PORT ?? 3000);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json", ".txt": "text/plain", ".ico": "image/x-icon", ".woff2": "font/woff2" };

async function resolve(pathname) {
  // normalize() collapses any ".." before it can escape out/.
  const candidate = join("out", normalize(pathname).replace(/^(\.\.[/\\])+/, ""));
  const direct = await stat(candidate).catch(() => null);
  if (direct?.isFile()) return candidate;
  if (direct?.isDirectory()) return join(candidate, "index.html");
  return `${candidate}.html`;
}

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname).replace(new RegExp(`^${basePath}`), "") || "/";
  const file = await resolve(pathname);
  response.setHeader("Content-Type", types[extname(file)] ?? "application/octet-stream");
  createReadStream(file)
    .on("error", () => { response.statusCode = 404; response.setHeader("Content-Type", types[".html"]); createReadStream(join("out", "404.html")).on("error", () => response.end("Not found")).pipe(response); })
    .pipe(response);
}).listen(port, () => console.log(`http://127.0.0.1:${port}${basePath}/`));
```

Then in `package.json`, replace:

```json
    "start": "next start",
```

with:

```json
    "serve": "node scripts/serve-out.mjs",
```

- [ ] **Step 4: Rewrite `.env.example`**

The app takes no secrets any more. Replace the whole file:

```
# Pocket Chief builds and runs with no secrets: the library is the content in src/content/ and
# every read happens in the browser. These two are build-time knobs, not credentials.

# Where the app is mounted. GitHub Pages serves this project repository under /pocket-chief.
# Set it to an empty string to build for a site root or a custom domain.
NEXT_PUBLIC_BASE_PATH=/pocket-chief

# Registers the real service worker outside a production build. Set only by the e2e run.
NEXT_PUBLIC_ENABLE_SERVICE_WORKER_TESTS=
```

- [ ] **Step 5: Reinstall and reverify**

pnpm is not on PATH here, so ask the owner to run `pnpm install` in a shell that has it, or run the install through corepack if available. Then:

```bash
node node_modules/typescript/bin/tsc --noEmit && node node_modules/eslint/bin/eslint.js . --max-warnings=0 && node node_modules/vitest/vitest.mjs run 2>&1 | tail -5
```

Expected: clean typecheck, clean lint, all tests pass.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml .env.example && git commit -m "chore(deps): drop Supabase, zod and jszip

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 13: Rewrite the end-to-end suite

Seven of the twelve existing specs drive flows that no longer exist. The rest need relative paths, because `baseURL` now carries the basePath.

**Files:**
- Modify: `playwright.config.ts`
- Modify: `tests/e2e/pocket-chief.spec.ts`

- [ ] **Step 1: Update the Playwright config**

Replace the whole of `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

// baseURL carries the basePath, so every goto in the suite is relative ("topics/fasciotomy", not
// "/topics/fasciotomy") — a leading slash resolves against the origin and skips the mount point.
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000/pocket-chief/",
    trace: "on-first-retry",
  },
  projects: [
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
    { name: "desktop-chrome", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "node node_modules/next/dist/bin/next dev --port 3000",
    url: "http://127.0.0.1:3000/pocket-chief/",
    reuseExistingServer: false,
    env: { NEXT_PUBLIC_ENABLE_SERVICE_WORKER_TESTS: "true" },
  },
});
```

- [ ] **Step 2: Delete the specs whose flows are gone**

In `tests/e2e/pocket-chief.spec.ts`, delete these five tests in full:

- `"creates, revises, approves, finds, and restores a source-bound topic"`
- `"requires explicit owner confirmation before linking every statement"`
- `"adds and edits the owner's SCORE organization"`
- `"edits made while the draft is still saving are not lost on close"` — this was entirely an Anki-draft race
- the `test.beforeEach` block that clears bookmarks through `/api/bookmarks`

Also delete the `import JSZip from "jszip";` line. Of the twelve original specs, seven go; five survive with path changes.

- [ ] **Step 3: Rewrite the search-read-save journey without Anki**

Replace the first remaining test:

```ts
test("search, read, and save a topic", async ({ page }) => {
  await page.goto("./");
  await page.getByLabel("Search Pocket Chief").fill("choledochoithiasis");
  await page.getByRole("button", { name: "Search" }).click();
  const result = page.locator(".topic-grid").getByRole("link", { name: /Choledocholithiasis/ });
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.getByRole("heading", { name: "Transcystic decision flow" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Make Anki/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("button", { name: "Saved offline" })).toBeVisible();

  await page.goto("./saved/");
  await expect(page.locator(".topic-grid").getByRole("link", { name: /Choledocholithiasis/ })).toBeVisible();
});
```

The typo in the search term is deliberate — it exercises the typo tolerance in `searchTopics`.

- [ ] **Step 4: Fix the navigation count test**

```ts
test("mobile navigation exposes three primary destinations", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("./");
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation.getByRole("link", { name: "Search" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Topics" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Saved" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Add" })).toHaveCount(0);
});
```

- [ ] **Step 5: Convert every remaining `page.goto` to a relative path**

Every remaining spec — the decision-flow layout test, topics resume, canonical navigation, rail collapse, mobile drawer, and the offline test — keeps its assertions and changes only its navigation calls:

| Before | After |
| --- | --- |
| `page.goto("/")` | `page.goto("./")` |
| `page.goto("/topics")` | `page.goto("./topics/")` |
| `page.goto("/topics/fasciotomy")` | `page.goto("./topics/fasciotomy/")` |
| `page.goto("/topics/choledocholithiasis")` | `page.goto("./topics/choledocholithiasis/")` |
| `page.goto("/settings")` | `page.goto("./settings/")` |
| `page.goto("/topics/choledocholithiasis#block-comparison", …)` | `page.goto("./topics/choledocholithiasis/#block-comparison", …)` |
| `page.goto(\`/?q=${…}\`)` | `page.goto(\`./?q=${…}\`)` |

`toHaveURL` assertions match on the full URL, so `/\/topics\/choledocholithiasis$/` must become `/\/topics\/choledocholithiasis\/$/` — trailing slashes are now real.

- [ ] **Step 6: Fix the topics-resume spec**

The "topics resumes a visited guide and excludes an empty curriculum branch" test added an empty category through Settings, which no longer exists. Delete the two Settings interactions and the `emptyCategory` variable, keep the resume assertion, and keep the `Reviewed` count assertion:

```ts
test("topics resumes a visited guide", async ({ page }) => {
  await page.goto("./topics/choledocholithiasis/");
  await expect(page.getByRole("heading", { name: "Choledocholithiasis" })).toBeVisible();
  await page.waitForFunction(async () => {
    if (!(await indexedDB.databases()).some((database) => database.name === "pocket-chief-private")) return false;
    return new Promise<boolean>((resolve, reject) => {
      const request = indexedDB.open("pocket-chief-private");
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains("recent")) { database.close(); resolve(false); return; }
        const recent = database.transaction("recent").objectStore("recent").get("00000000-0000-4000-8000-000000000101");
        recent.onerror = () => { database.close(); reject(recent.error); };
        recent.onsuccess = () => { database.close(); resolve(recent.result?.slug === "choledocholithiasis"); };
      };
    });
  });
  await page.goto("./topics/");
  await expect(page.getByRole("link", { name: "Resume topic" })).toHaveAttribute("href", "/pocket-chief/topics/choledocholithiasis/");
  await expect(page.getByText("Reviewed", { exact: true })).toHaveCount(0);
});
```

- [ ] **Step 7: Run the suite**

Stop the Browser pane preview server first — Playwright starts its own on port 3000, and `config.webServer` aborts the whole run with exit code 1 if one is already up.

```bash
node node_modules/@playwright/test/cli.js test
```

Expected: all specs pass in both projects. Investigate failures against the app, not by loosening assertions.

- [ ] **Step 8: Reconfirm the dependency prune and commit**

```bash
grep -rn "jszip\|JSZip" src tests --include='*.ts' --include='*.tsx' || echo NONE_REFERENCED
```

```bash
git add playwright.config.ts tests/e2e/pocket-chief.spec.ts && git commit -m "test(e2e): cover the static app under its base path

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 14: Publish from GitHub Actions

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# One deploy at a time; a queued run supersedes a waiting one but never cancels a live deploy.
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - run: pnpm typecheck

      - run: pnpm lint

      - run: pnpm test

      - run: pnpm build

      # `_next` starts with an underscore, which the legacy Jekyll pipeline drops. Actions-based
      # Pages deploys do not run Jekyll, but the marker costs nothing and removes the question.
      - run: touch out/.nojekyll

      - name: Fail if the library asset did not export
        run: test -s out/library.json && node -e "const l=require('./out/library.json');if(!l.topics?.length)process.exit(1)"

      - uses: actions/configure-pages@v5

      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify the workflow's assumptions locally**

The workflow runs `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`. Confirm all four scripts still exist:

```bash
node -e "const s=require('./package.json').scripts;for(const k of ['typecheck','lint','test','build'])if(!s[k])throw new Error('missing script: '+k);console.log('SCRIPTS_OK')"
```

Expected: `SCRIPTS_OK`.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml && git commit -m "ci: build and publish the static site to GitHub Pages

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

- [ ] **Step 4: Note what the owner must do by hand**

Do not do these yourself — enabling Pages publishes the site, and changing repository visibility is not reversible in effect. Write them into the final report instead:

1. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Decide repository visibility. On a Free or Pro account a Pages site is publicly reachable even from a private repository; private Pages needs GitHub Enterprise Cloud.
3. Push `main` and watch the first run.

---

## Task 15: Documentation and repository hygiene

**Files:**
- Modify: `README.md`, `CLAUDE.md`, `AGENTS.md`, `docs/SECURITY.md`
- Delete: `docs/AI-CONTRACT.md`, `.planning/`
- Create: `NOTICE.md`
- Modify: `.gitignore`
- Rename: `demoTopics` → `libraryTopics` across the tree

- [ ] **Step 1: Delete the superseded planning artifacts and AI contract**

```bash
git rm -r --quiet .planning && git rm --quiet docs/AI-CONTRACT.md
```

Nothing references `.planning/`, and `docs/AI-CONTRACT.md` describes an OpenAI adapter that no longer exists.

- [ ] **Step 2: Rewrite `README.md`**

```markdown
# Pocket Chief

A private, installable, search-first general surgery reference. Forty-six SCORE-aligned topics, authored as source-linked content files, built into a static site that works offline on a phone.

## What it is

- A Next.js app exported to static HTML. No server, no database, no accounts, no API keys.
- The library is `src/content/` — one TypeScript file per topic, each block citing a supplied source.
- Bookmarks, reading history, and the offline copy of the atlas live in the browser's IndexedDB. They belong to the device, not to an account.
- Typo-tolerant search over titles, aliases, headings, body text, SCORE categories, and tags, running entirely in the browser.

For flashcards, hand a topic's URL to an assistant and ask it to write the cards. The app deliberately has no export of its own.

## Running it locally

Requirements: Node 20.9 or newer, and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000/pocket-chief/`. The app is mounted under `/pocket-chief` in development as well as production, because that is where GitHub Pages serves it.

To preview the real static artifact instead of the dev server:

```bash
pnpm serve
```

## Adding a topic

Authoring is a commit, not an in-app flow. Invoke the `/score-topic` skill rather than reconstructing the steps by hand. Every block goes through `sourced()` in `src/content/authoring.ts`, which derives one cited claim per rendered factual unit — hand-written claim arrays drift from rendered text and the content contract test will reject them.

## Deployment

`.github/workflows/deploy.yml` runs typecheck, lint, unit tests, and the static build on every push to `main`, then publishes `out/` to GitHub Pages. Set **Settings → Pages → Source** to **GitHub Actions** once.

A Pages site is publicly reachable by URL on Free and Pro accounts, whatever the repository's visibility. `robots.txt` and the `noindex` metadata ask crawlers to stay away; they are not access control.

## Verification

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
```

The build uses webpack because Turbopack's local CSS worker requires a restricted ephemeral port in this environment. Stop the dev server before running the e2e suite — Playwright starts its own.

## Content and licensing

The topics are original prose written from licensed reference material. The source corpora are not in this repository and are not redistributable. See `NOTICE.md`.
```

- [ ] **Step 3: Update `CLAUDE.md`**

Make these edits, keeping the file's structure:

- Delete the whole "Two data modes behind one interface" subsection and replace it with:

```markdown
### One library, read at build time

`src/lib/library.ts` reads the authored content in `src/content/` as pure functions — `listTopics`, `getTopicBySlug`, `listTaxonomy`, `listSources`, `searchLibrary`. There is no repository interface, no database and no request context. Server components call it during `next build`; the browser gets the same data through `out/library.json`, loaded by `src/lib/library-client.ts` and cached in IndexedDB.

The app builds with `output: "export"` under `basePath: "/pocket-chief"`, in development as well as CI. Consequences worth knowing before you debug something:

- Anything that needs a request at runtime — `searchParams` in a server component, a non-GET route handler, `headers()`, middleware — will fail the build or be silently inert. Search reads `?q=` on the client for exactly this reason.
- Bookmarks and reading history are per-device, in IndexedDB. Clearing site data clears them, and there is no server copy to restore from.
- There is no Anki export. Flashcards come from handing a published topic URL to an assistant; do not reintroduce an in-app exporter without asking.
- New content does not appear on HMR if a stale dev server from another chat is serving. Confirm with `curl -s localhost:3210/library.json` before concluding new content failed to register.
```

- In "The claim-support invariant", delete the closing paragraph about `topic_block_expected_claims` and SQL dual-maintenance, and replace it with:

```markdown
`supportWarnings()` in `src/lib/editorial.ts` is now the only enforcement. `src/lib/__tests__/content-contract.test.ts` runs it over every authored topic, and a PostToolUse hook runs that test on any edit under `src/content/`.
```

- In "Library content", delete the bullet beginning "**`src/content/topics/choledocholithiasis.ts` is byte-pinned.**" entirely. The SQL that pinned it is gone; that file is now an ordinary topic, though re-authoring it through `sourced()` is a separate content change nobody has made yet.

- In "Commands", replace the dev-server paragraph's port note with the basePath: the preview opens at `http://localhost:3210/pocket-chief/`.

- In "Conventions", delete the "Applied migrations are immutable" bullet.

- In "Environment gotchas", replace the remote bullet with: the remote is `drzachnelson/pocket-chief`, `main` is the default branch and the deploy branch, and the licensed corpora under `Pocket Chief Resources/` stay gitignored except `score-module-outline.md`.

- Also in "Environment gotchas", expand the iCloud bullet with the recovery that actually works, learned the hard way during this migration:

```markdown
- The vault lives in iCloud-synced Documents, and iCloud evicts `node_modules` wholesale. Evicted
  files keep their directory entry but carry the `dataless` flag, and reading one blocks forever —
  the process sits at 0% CPU with no output and no error. `brctl download` does not recover them.
  Diagnose with `find node_modules -type f -flags +dataless | wc -l` (a healthy tree returns 0) and,
  for a hung process, `lsof -p <pid>` names the exact file it is stuck on.
  Recovery is `rm -rf node_modules` — unlink does not materialize, so it is fast — then reinstall.
  `pnpm` is not on PATH; use `npx --yes pnpm@11.19.0 install`. The pnpm content-addressable store at
  `~/Library/pnpm/store/v11` lives outside iCloud and stays healthy, so the reinstall needs no
  network and takes about ten seconds.
```

- [ ] **Step 4: Rewrite `docs/SECURITY.md`**

Twelve lines describing Supabase RLS and owner auth. Replace with:

```markdown
# Security

Pocket Chief is a static site. It has no server, no database, no accounts, and no secrets — there is nothing to authenticate against and no credential to leak.

**What that means in practice**

- Everything the app knows ships in the build: the 46 authored topics and the SCORE taxonomy. Anyone who can load the site can read all of it.
- Bookmarks and reading history are stored in the visitor's own browser (IndexedDB), as is the Topics sidebar state (`localStorage`). None of it leaves the device or is readable by anyone else.
- The app makes no outbound requests at all beyond fetching its own static assets from the origin it was served from. There is no analytics, no telemetry, no third-party script, and no API to call.

**What it does not mean**

- GitHub Pages serves publicly on Free and Pro accounts, regardless of repository visibility. `robots.txt` and `<meta name="robots" content="noindex">` ask crawlers not to index the site; neither restricts access. Treat everything in `src/content/` as published.
- Response headers cannot be set on Pages. The `X-Robots-Tag`, `Referrer-Policy` and `Cross-Origin-Opener-Policy` headers the hosted app used to send are gone.

**Content rules that still apply**

Never commit patient information, and never commit copied paid question stems or explanations. The licensed reference corpora under `Pocket Chief Resources/` are gitignored and must stay that way.
```

- [ ] **Step 5: Update `AGENTS.md`**

Two edits. First, in `# Identity`, drop `Anki exports, ` from the routing sentence so it reads `...search, offline access, product design, implementation, and deployment.`

Second, replace the five numbered steps under `# Workflow` with:

```markdown
1. Gather the SCORE module text and any cross-checks without patient information.
2. Author the topic as a file in `src/content/topics/`, every block built with `sourced()` so each rendered factual unit carries a citation.
3. Register it in `src/content/index.ts`, add taxonomy nodes and sources as needed, and run the content contract test.
4. Verify mobile, desktop, and offline behavior, then push to `main` and confirm the Pages deploy.
5. Record durable product decisions in this workstation's `MEMORY.md`.
```

Leave the Resources and Editorial Rules sections alone — the voice, sourcing, paraphrasing, and no-patient-identifier rules all still apply, and the "treat all AI output as a draft until Zach explicitly approves it" rule now governs authored content files rather than an in-app approval button. Do not touch the `<!-- BEGIN:nextjs-agent-rules -->` block; `next dev` writes it.

- [ ] **Step 6: Add `NOTICE.md`**

```markdown
# Notice

The topic content in `src/content/` is original prose written from licensed reference material — the SCORE curriculum modules and Fiser's *The ABSITE Review* among others. Those source texts are not included in this repository, are not redistributable, and are excluded by `.gitignore`.

Each topic cites the sources it was written from; the citations are metadata, not reproductions.

This is an educational reference, not patient-specific guidance, and carries no warranty of accuracy or currency.
```

- [ ] **Step 7: Fix the one stale comment left in surviving code**

`src/lib/taxonomy.ts` explains its slug-keyed root match by pointing at the demo store, Supabase uuids, `library-install.ts`, and the Settings taxonomy editor — all four are gone, but the behaviour the comment protects is unchanged. Replace the paragraph beginning `// The curriculum root is matched by SLUG` (through the line ending `never a browsable one.`) with:

```ts
// The curriculum root is matched by SLUG, never by id, so a renamed or re-keyed root node keeps
// /topics populated. A parentless node that is not the root is a category in its own right; the
// root itself is a container and never browsable.
```

Leave every line of executable code in the file alone — this is a comment correction, not a behaviour change. Confirm with:

```bash
node node_modules/vitest/vitest.mjs run src/lib/__tests__/taxonomy.test.ts
```

Expected: PASS.

- [ ] **Step 8: Clean up `.gitignore`**

Remove the now-meaningless `.vercel/` line. Add `out/` beside `.next/` if it is not already covered:

```bash
grep -n "vercel\|^out/" .gitignore
```

Delete the `.vercel/` line; `out/` is already listed.

- [ ] **Step 9: Rename `demoTopics` to `libraryTopics`**

There is no demo mode left, so the name misleads. It appears in `src/` and in one authoring doc, `.claude/skills/add-topic/SKILL.md`, which instructs the next author to register a topic in `demoTopics` — leaving that stale would send them looking for a symbol that does not exist.

```bash
grep -rl "demoTopics" src .claude/skills --include='*.ts' --include='*.tsx' --include='*.md' | xargs sed -i '' 's/demoTopics/libraryTopics/g'
```

Then confirm nothing was missed:

```bash
grep -rn "demoTopics" src .claude docs README.md CLAUDE.md AGENTS.md || echo RENAME_COMPLETE
```

Expected: `RENAME_COMPLETE`.

Also replace the doc comment in `src/lib/seed.ts` so it stops calling the library a seed:

```ts
/**
 * The authored library lives in `src/content/`, one file per topic.
 * This module stays as the import path the app and its tests already use.
 */
```

- [ ] **Step 10: Full verification**

```bash
node node_modules/typescript/bin/tsc --noEmit && node node_modules/eslint/bin/eslint.js . --max-warnings=0 && node node_modules/vitest/vitest.mjs run 2>&1 | tail -8
```

Expected: clean typecheck, clean lint, all tests pass. Compare the test count against the Task 1 baseline: it should be lower by the deleted suites and higher by `library.test.ts` and the rewritten `editorial.test.ts`.

```bash
rm -rf .next out && node node_modules/next/dist/bin/next build --webpack && ls out/library.json out/index.html out/404.html
```

Expected: the build succeeds and all three files exist.

- [ ] **Step 11: Confirm no licensed material is tracked**

```bash
git ls-files "Pocket Chief Resources" && git ls-files | grep -i "supabase\|vercel" || echo NO_LICENSED_OR_CLOUD_FILES_TRACKED
```

Expected: only `Pocket Chief Resources/score-module-outline.md`, then `NO_LICENSED_OR_CLOUD_FILES_TRACKED`.

- [ ] **Step 12: Commit**

```bash
git add -A && git commit -m "docs: describe the static, self-hosted atlas

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Post-migration follow-ups

Found during execution, deliberately deferred. Not part of this plan's definition of done.

**Trim `library.json`.** Measured after Task 3: the asset is 2673 KB raw, 391 KB gzipped. Two thirds of it is dead weight on the wire.

- `versions[]` duplicates `approvedVersion` byte-for-byte in **46 of 46** topics — 1319 KB, 49% of the payload. `buildTopic()` in `src/content/authoring.ts` sets `versions: [approvedVersion]`, the same object, and `JSON.stringify` serializes it twice. The History tab reads only `id`, `versionNumber`, `status` and `reviewedAt` from those entries; nothing in the browser reads their `blocks`.
- `claims[].text` and `claims[].id` add ~755 KB that no browser code reads. `SupportMark` needs only `claim.status` and `claim.citationIds.length`.

Deferred because trimming requires narrowing `Topic`, `TopicVersion` and `Claim` in `src/lib/types.ts` — every field is currently required — and those types are read by the renderer, the IndexedDB cache and the content contract test. Type surgery on the app's central data type mid-migration risks the remaining tasks for a payload that is already double-cached (service worker and IndexedDB) and gzipped to 391 KB. Revisit once the migration has landed and the type's consumers have stopped moving.

**Scope the service worker's offline cache lookup.** `public/sw.js` falls back with an unscoped `caches.match(event.request)`, which searches the `SHELL` cache (written once at install) and the `CONTENT` cache (refreshed on every successful online fetch) without preferring either. After a redeploy, a device that goes offline could resolve a stale `SHELL` copy of `library.json` over a fresher `CONTENT` one. Fix by trying `caches.open(CONTENT)` first, then falling back. Task 11 rewrites this file; fold it in there if convenient, otherwise afterwards.

---

## Definition of done

- [ ] `node node_modules/typescript/bin/tsc --noEmit` is clean.
- [ ] `node node_modules/eslint/bin/eslint.js . --max-warnings=0` is clean.
- [ ] `node node_modules/vitest/vitest.mjs run` is green.
- [ ] `node node_modules/@playwright/test/cli.js test` is green in both projects.
- [ ] `node node_modules/next/dist/bin/next build --webpack` produces `out/` with `index.html`, `404.html`, `library.json` (46 topics), `manifest.webmanifest`, `robots.txt`, `sw.js`, and 46 directories under `out/topics/`.
- [ ] `grep -rn "supabase\|@supabase\|OPENAI\|vercel" src package.json` returns nothing.
- [ ] `.github/workflows/deploy.yml` exists and every script it invokes is defined in `package.json`.
- [ ] The owner has been told the three manual steps from Task 14, Step 4.
