# Handoff: Pocket Chief static GitHub Pages migration

**Status:** migration complete, merged with `main`, verified green. **Ready to push.** The merge that used to block this is done.

**Branch:** `claude/static-github-pages`, 34 commits, clean tree, ahead of `origin/main` by 34 and **behind by 0**.

**Worktree:** `/Users/zach/Documents/Cowork OS/Pocket Chief/.claude/worktrees/vercel-rebuild-trigger-4e3ff0`
Run everything from there. Do NOT `cd` to the main checkout, see Environment below for why.

---

## What was done

Pocket Chief was migrated from a Vercel + Supabase deployment to a fully static GitHub Pages site, then merged with the work that landed on `main` in the meantime.

The plan that was executed is `docs/superpowers/plans/2026-09-03-static-github-pages-migration.md`, 15 tasks, all complete. It was kept current as execution went, so trust the file over any memory of it.

**Architecture now:** the 49 authored topics in `src/content/` are the database. `src/lib/library.ts` reads them as pure synchronous functions at build time. The browser gets the whole library as one static `library.json` asset via `src/lib/library-client.ts`'s `loadLibrary()`, which seeds IndexedDB and falls back to it offline. Bookmarks and reading history live only in IndexedDB. `output: "export"` with `basePath: "/pocket-chief"` and `trailingSlash: true` produces a working static site.

**Deleted entirely:** all 14 API routes, `src/proxy.ts` middleware, both repository implementations and the `ContentRepository` interface, the Supabase client and SQL migrations, the OpenAI adapter, PHI safety, rate limiting, the backup builder, the library installer, both Anki modules, and the `/add` and `/drafts` authoring pages.

**Removed as a product decision:** Anki export, in full. Flashcards now come from handing a published topic URL to an assistant. Do not reintroduce it.

**Verified green at HEAD (`e03268f`):**
- `tsc --noEmit` clean, `eslint . --max-warnings=0` clean
- 22 test files, 115 tests passing
- Playwright: 20 passed, 4 skipped by project
- `next build --webpack` produces `out/` with 57 pages, 49 topic directories, `library.json` (49 topics, 39 taxonomy nodes), `404.html`, `manifest.webmanifest`, `robots.txt`, `sw.js`

---

## The merge with `main`, resolved

`main` had moved after this branch forked at `0497b87` (PR #16, Aug 25). PRs #17 and #18 landed 5 commits the branch had never seen. Those are now merged in as `e03268f`. Force-pushing was correctly declined at the time: it would have destroyed all of the below.

**Kept from `main`:**
- 3 new topics: `hemorrhoids.ts`, `procedures-for-hemorrhoids.ts`, `percutaneous-breast-biopsy-and-cyst-aspiration.ts`
- The Anorectal taxonomy section and the Breast "Operations & Procedures" branch, 4 new nodes, 35 to 39
- `src/components/topics-browser.tsx`, the searchable curriculum index
- Reader progress, "Mark reviewed", persisted per device in IndexedDB
- Collapsible topic sections with the "Open all" / "Close all" toggle, **starting collapsed**
- Next-topic navigation, `TopicContent` gained a `nextTopic` prop
- `openDeepLinkedBlock`, the deep-link re-aim
- The compact rail for half-width desktop
- The narrowed `escharotomy` alias, `"burn eschar"` rather than a bare `"eschar"` that stole auto-links

**Kept from the branch:** `generateStaticParams`, the Suspense-wrapped `SearchExperience`, the basePath form actions, the trailing-slash-tolerant `activeTopic()`, and the four regression tests listed below.

### Two things a future merge could easily lose again

Both came from PR #17 and neither appeared in the earlier resolution rule. Check them first if you ever redo this merge.

Item 2 turned up in the diff while resolving `topic-content.tsx`. Item 1 did not: it is a one-line change to a `useState` initialiser that reads as a harmless difference in default, and it was caught only by reading PR #17's commit body, which states the intent outright. That is the lesson worth carrying, a semantic conflict can hide in a line that merges cleanly and looks arbitrary.

1. **Sections start collapsed.** `topic-content.tsx` initialises `collapsed` to `new Set(collapsible)`. The pre-merge branch started them open. Getting this wrong silently inverts the reading experience and breaks item 2.
2. **`openDeepLinkedBlock`.** Sections start collapsed, so the browser's hash jump runs while the target `<details>` is still closed and lands short of the heading. The fix follows the open with a `scrollIntoView` on the next frame, once React has committed the state and the sections below have reflowed. It only makes sense given item 1.

Both are covered by the e2e test "topic sections start collapsed, toggle together, and reviewed state persists", which runs on mobile and desktop.

### How the 8 conflicting files were resolved

The rule for every hunk: **take `main`'s feature work, then re-apply the migration's two transformations on top.**

1. **Remove Anki.** The cloze dialog, `AnkiDialog`, `excerpt()`, `contextImageDataUrl()`, `captureSelection`, the `onMouseUp` handler, the per-block and per-bullet "Make Anki" buttons, and every `ClozeDraft` / `AnkiSettings` reference. Those types no longer exist in `src/lib/types.ts`.
2. **Swap `getRepository()` for `src/lib/library.ts`.** `listTopics`, `getTopicBySlug`, `listTaxonomy`, `listSources`, `searchLibrary`, all synchronous, no `await`. No `export const dynamic = "force-dynamic"`. No `fetch("/api/...")`, those routes are gone. Media resolves to a static `${basePath}/media/<id>` asset, not `/api/media/<id>`.

Five e2e specs were deleted rather than adapted, because every route they exercised is gone: the two cloze flows, the two `/add` and `/drafts` authoring flows, and the SCORE-category editing flow.

---

## Bugs the reviews caught, do not reintroduce these

All four are guarded by tests that pass at `e03268f`.

1. **Bookmark wipe.** `FavoriteTopics` treated an empty default `fallback` prop as an authoritative "nothing is bookmarked anywhere" and unsaved every topic in IndexedDB, on every online home-page visit. Fixed by making it a pure device read with no props and no writer imported. Guarded by a regression test asserting `setTopicSaved` is never called.
2. **Search 404'd in production.** Next prefixes `basePath` onto `<Link>` and router navigations but **not** onto a plain `<form action>`. Both search forms now use `` action={`${basePath}/`} ``. If a merge reintroduces a bare `action="/"`, that is the bug.
3. **Curriculum tree silently died.** `activeTopic()` compared `usePathname()` against an unslashed `/topics/<slug>`, and `trailingSlash` made it never match. Now normalises with `.replace(/\/+$/, "")`. The unit test covers both pathname shapes.
4. **A failed library load was memoized forever.** `loadLibrary()`'s `.catch` resolved, so one flaky fetch stranded the whole page session on an empty fallback. Now clears `inFlight` on the failure path so the next call retries.

Also: the mobile-drawer e2e test needs a real hydration gate. Waiting on the `library.json` response does **not** work, because the service worker precaches that same URL from its install handler, independent of React. Wait for `navigator.serviceWorker.controller` instead. Retrying the tap also does not work: `open()` sets state rather than toggling, so a second click steals focus from the close button.

---

## Environment, this will bite you

The vault is on an iCloud-synced volume that evicts files. Two forms, both seen repeatedly:

- **`node_modules`**, commands hang at 0% CPU with no output and never return. Diagnose with `find node_modules -type f -flags +dataless | wc -l`, healthy is 0. `brctl download` does **not** recover these. Fix: `rm -rf node_modules && npx --yes pnpm@11.19.0 install`, takes about 5 seconds because the pnpm store at `~/Library/pnpm/store/v11` is outside iCloud.
- **`.git/objects/pack/*.pack`**, surfaces as `far too short to be a packfile`. Here `brctl download <the pack file>` **does** work.
- Conflict-copy refs like `refs/heads/claude/static-github-pages 2` break `git fetch` outright. Find with `find "$(git rev-parse --git-common-dir)/refs" -name "* [0-9]"` and delete.

**As of 2026-09-09 the main checkout had 34,693 evicted files** and `git status` there hung for minutes. The worktree had 0 and was healthy, which is why all work happened in the worktree. The main checkout also showed uncommitted modifications to files this merge touched. Look at those before pushing.

`pnpm` is not on PATH. Call binaries through `node` directly, or use `npx --yes pnpm@11.19.0`.

Builds must use `--webpack`. Turbopack's CSS worker fails in this environment.

There is no `timeout` command on this machine.

---

## Still outstanding for the repository owner

Not done, deliberately. These publish the site.

1. **Settings → Pages → Source → GitHub Actions** in `drzachnelson/pocket-chief`
2. **Decide repository visibility.** On Free/Pro a Pages site is publicly reachable by URL regardless of whether the repo is private. The topics derive from licensed SCORE and Fiser material. `NOTICE.md` records provenance either way.
3. **Push `main`** and watch the first workflow run. `.github/workflows/deploy.yml` runs typecheck, lint, tests, and the build, then publishes `out/`.

## Deferred, recorded in the plan

- **Trim `library.json`.** Measured at 49 topics: **2899 KB raw, 418 KB gzipped**. `versions[]` duplicates `approvedVersion` byte-for-byte in **49 of 49** topics and costs **1423 KB**, roughly half the file. `claims[].text` / `.id` add a few hundred KB more that no browser code reads. Needs narrowing `Topic` / `TopicVersion` / `Claim`, whose fields are all required. Deliberately kept out of the merge to avoid compounding risk. Worth doing as its own task now that the merge is settled.
- **Scope the service worker's offline cache lookup.** `public/sw.js` falls back with an unscoped `caches.match()`, so after a redeploy an offline device could resolve a stale `SHELL` copy of `library.json` over a fresher `CONTENT` one.
