# Handoff: Pocket Chief static GitHub Pages migration

**Status:** migration complete and verified on its branch. **Blocked on one merge** before it can reach `main`.

**Branch:** `claude/static-github-pages` — 32 commits, clean tree, ahead of `origin/main` by 32 and **behind by 5**.

**Worktree:** `/Users/zach/Documents/Cowork OS/Pocket Chief/.claude/worktrees/vercel-rebuild-trigger-4e3ff0`
Run everything from there. Do NOT `cd` to the main checkout.

---

## What was done

Pocket Chief was migrated from a Vercel + Supabase deployment to a fully static GitHub Pages site. 146 files changed, +3,574 / −6,588.

The plan that was executed is `docs/superpowers/plans/2026-09-03-static-github-pages-migration.md`, 15 tasks, all complete. It was kept current as execution went — several tasks were corrected in place when reality disagreed with the plan, so trust the file over any memory of it.

**Architecture now:** the 46 authored topics in `src/content/` are the database. `src/lib/library.ts` reads them as pure synchronous functions at build time. The browser gets the whole library as one static `library.json` asset via `src/lib/library-client.ts`'s `loadLibrary()`, which seeds IndexedDB and falls back to it offline. Bookmarks and reading history live only in IndexedDB. `output: "export"` with `basePath: "/pocket-chief"` and `trailingSlash: true` produces a working static site.

**Deleted entirely:** all 14 API routes, `src/proxy.ts` middleware, both repository implementations and the `ContentRepository` interface, the Supabase client and SQL migrations, the OpenAI adapter, PHI safety, rate limiting, the backup builder, the library installer, both Anki modules, and the `/add` and `/drafts` authoring pages.

**Removed as a product decision:** Anki export, in full. Flashcards now come from handing a published topic URL to an assistant. Do not reintroduce it.

**Verified green at HEAD (136f265):**
- `tsc --noEmit` clean, `eslint . --max-warnings=0` clean
- 21 test files, 103 tests passing
- Playwright: 13 passed, 3 skipped
- `next build --webpack` produces `out/` with 46 topic pages, `library.json` (46 topics, 35 taxonomy nodes), `404.html`, `manifest.webmanifest`, `robots.txt`, `sw.js`
- Serving `out/` the way Pages does: all 9 routes return 200, no `/api/` references survive

---

## The blocker

`main` moved after this branch forked (fork point: `0497b87`, PR #16, Aug 25). PRs #17 and #18 landed 5 commits this branch has never seen:

- 3 new topics: `hemorrhoids.ts`, `procedures-for-hemorrhoids.ts`, `percutaneous-breast-biopsy-and-cyst-aspiration.ts`
- `src/components/topics-browser.tsx` — searchable curriculum index, "Find a topic" + alphabetical "All topics" view
- Reader progress — "Mark reviewed", persisted per device
- Collapsible topic sections — "Open all" / "Close all"
- Next-topic navigation — `TopicContent` gained a `nextTopic` prop
- A compact rail for half-width desktop, plus deep-link fixes

**Force-pushing this branch to `main` would destroy all of that.** The user asked to push and re-add only the topics; that was declined because it also loses the four UI features, which are not trivially re-addable. The merge keeps everything.

Those commits are also reachable on GitHub via the PR branches `claude/codex-superpowers-completion-c86b59` and `claude/pocket-chief-medical-topics-e9a4a0`, so nothing is unrecoverable — but merge, don't force-push.

### Measured merge shape

A trial merge was run and aborted; the tree is clean. Real numbers:

**Merges cleanly (no action needed):** the 3 new topics, `topics-browser.tsx` and its test, `src/lib/topic-navigation.ts`, `src/content/sources.ts`, `src/content/taxonomy.ts`, `src/lib/offline.ts`, `src/components/topics-workspace.tsx`, `src/components/topics-resume.tsx`, `src/components/app-shell.tsx`, `src/content/index.ts`.

Good news: `topics-browser.tsx` is pure client code built on `flattenTopicNavigation` — no server dependency, so it survives the migration untouched.

**8 files conflict, 18 hunks total:**

| File | Hunks |
| --- | --- |
| `src/components/topic-content.tsx` | 4 |
| `tests/e2e/pocket-chief.spec.ts` | 5 |
| `src/app/topics/[slug]/__tests__/page.test.tsx` | 2 |
| `src/components/__tests__/app-shell.test.tsx` | 2 |
| `src/components/__tests__/topic-content.test.tsx` | 2 |
| `src/app/page.tsx` | 1 |
| `src/app/topics/page.tsx` | 1 |
| `src/app/topics/[slug]/page.tsx` | 1 |

### The resolution rule, for every hunk

**Take `main`'s feature work, then re-apply the migration's two transformations on top:**

1. **Remove Anki.** Delete the cloze dialog, `AnkiDialog`, `excerpt()`, `contextImageDataUrl()`, `captureSelection`, the `onMouseUp` handler, the per-block and per-bullet "Make Anki" buttons, and every `ClozeDraft` / `AnkiSettings` reference. Those types no longer exist in `src/lib/types.ts`.
2. **Swap `getRepository()` for `src/lib/library.ts`.** `listTopics`, `getTopicBySlug`, `listTaxonomy`, `listSources`, `searchLibrary` — all synchronous, no `await`. Delete any `export const dynamic = "force-dynamic"`. Delete any `fetch("/api/...")` — those routes are gone.

Keep from `main`: collapsed sections and their Open all / Close all toggle, "Mark reviewed" and its persistence, the `nextTopic` prop and next-topic navigation, the topics-browser integration on `/topics`.

Keep from the branch: `generateStaticParams` in `topics/[slug]/page.tsx`, the Suspense-wrapped `SearchExperience` in `app/page.tsx`, the basePath form actions, the trailing-slash-tolerant `activeTopic()`.

`src/lib/offline.ts` merges cleanly but note the branch added `getCachedTaxonomy()` and `main` added reader-progress functions — confirm both survive.

### After resolving

1. `node node_modules/vitest/vitest.mjs run` — expect a higher count than 103; `main` brought its own tests
2. `node node_modules/typescript/bin/tsc --noEmit` — must be clean
3. `node node_modules/eslint/bin/eslint.js . --max-warnings=0` — must be clean
4. `rm -rf .next out && node node_modules/next/dist/bin/next build --webpack` — must succeed; confirm `out/library.json` now reports **49** topics, not 46
5. `node node_modules/@playwright/test/cli.js test` — the e2e spec is a 5-hunk conflict and `main` added specs for the new features; those need the same relative-path and trailing-slash treatment described in the plan's Task 13
6. Then push `main`

---

## Bugs the reviews caught — do not reintroduce these

1. **Bookmark wipe.** `FavoriteTopics` treated an empty default `fallback` prop as an authoritative "nothing is bookmarked anywhere" and unsaved every topic in IndexedDB, on every online home-page visit. Fixed by making it a pure device read with no props and no writer imported. Guarded by a regression test asserting `setTopicSaved` is never called.
2. **Search 404'd in production.** Next prefixes `basePath` onto `<Link>` and router navigations but **not** onto a plain `<form action>`. Both search forms now use `` action={`${basePath}/`} ``. If the merge reintroduces a bare `action="/"`, that is the bug.
3. **Curriculum tree silently died.** `activeTopic()` compared `usePathname()` against an unslashed `/topics/<slug>`; `trailingSlash` made it never match. Now normalises with `.replace(/\/+$/, "")`. The unit test covers both pathname shapes.
4. **A failed library load was memoized forever.** `loadLibrary()`'s `.catch` resolved, so one flaky fetch stranded the whole page session on an empty fallback. Now clears `inFlight` on the failure path so the next call retries.

Also: the mobile-drawer e2e test needs a real hydration gate. Waiting on the `library.json` response does **not** work — the service worker precaches that same URL from its install handler, independent of React. Wait for `navigator.serviceWorker.controller` instead. Retrying the tap also does not work: `open()` sets state rather than toggling, so a second click steals focus from the close button.

---

## Environment — this will bite you

The vault is on an iCloud-synced volume that evicts files. Two forms, both seen repeatedly:

- **`node_modules`** — commands hang at 0% CPU with no output and never return. Diagnose with `find node_modules -type f -flags +dataless | wc -l` (healthy is 0). `brctl download` does **not** recover these. Fix: `rm -rf node_modules && npx --yes pnpm@11.19.0 install` — takes ~5 seconds because the pnpm store at `~/Library/pnpm/store/v11` is outside iCloud.
- **`.git/objects/pack/*.pack`** — surfaces as `far too short to be a packfile`. Here `brctl download <the pack file>` **does** work.
- **Conflict-copy refs** like `refs/heads/claude/static-github-pages 2` break `git fetch` outright. Find with `find "$(git rev-parse --git-common-dir)/refs" -name "* [0-9]"` and delete.

`pnpm` is not on PATH. Call binaries through `node` directly, or use `npx --yes pnpm@11.19.0`.

Builds must use `--webpack`; Turbopack's CSS worker fails in this environment.

---

## Still outstanding for the repository owner

Not done, deliberately — these publish the site:

1. **Settings → Pages → Source → GitHub Actions** in `drzachnelson/pocket-chief`
2. **Decide repository visibility.** On Free/Pro a Pages site is publicly reachable by URL regardless of whether the repo is private. The topics derive from licensed SCORE and Fiser material; `NOTICE.md` records provenance either way.
3. **Push `main`** and watch the first workflow run. `.github/workflows/deploy.yml` runs typecheck, lint, tests, and the build, then publishes `out/`.

## Deferred, recorded in the plan

- **Trim `library.json`** — 2673 KB raw, 391 KB gzipped. `versions[]` duplicates `approvedVersion` byte-for-byte in 46 of 46 topics (1319 KB), and `claims[].text`/`.id` add ~755 KB no browser code reads. Needs narrowing `Topic`/`TopicVersion`/`Claim`, whose fields are all required — too risky mid-migration.
- **Scope the service worker's offline cache lookup** — `public/sw.js` falls back with an unscoped `caches.match()`, so after a redeploy an offline device could resolve a stale `SHELL` copy of `library.json` over a fresher `CONTENT` one.
