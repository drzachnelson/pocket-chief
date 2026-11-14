# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Pocket Chief is a private, single-user general surgery reference PWA. `README.md` covers the product surface and production setup; `AGENTS.md` carries the workstation identity and editorial rules; `docs/SECURITY.md` carries the security contract. This file covers what you can only learn by reading several files at once.

## Commands

**`pnpm` is not on PATH in this environment.** Call binaries through `node` directly:

```bash
node node_modules/typescript/bin/tsc --noEmit
```

```bash
node node_modules/eslint/bin/eslint.js . --max-warnings=0
```

```bash
node node_modules/vitest/vitest.mjs run
```

Single test file, or a single test by name:

```bash
node node_modules/vitest/vitest.mjs run src/lib/__tests__/content-contract.test.ts
```

```bash
node node_modules/vitest/vitest.mjs run -t "keeps flow graphs renderable"
```

**Dev server**: use the Browser pane preview (`preview_start` with `{name: "pocket-chief"}`), never Bash. The `.claude/launch.json` entry at the vault root prefers port **3210** and falls back to an assigned port (`autoPort`). Next 16 still refuses a second `next dev` for this directory on *any* port, so if another chat has one running you cannot start your own — and that server keeps serving its cached library. The preview opens at `http://localhost:3210/pocket-chief/`.

**E2E**:

```bash
node node_modules/@playwright/test/cli.js test
```

Playwright starts *its own* dev server on port 3000 with `NEXT_PUBLIC_ENABLE_SERVICE_WORKER_TESTS=true`. **Stop the preview server first** — with one already running, `config.webServer` fails with exit code 1 and the whole run aborts. `scripts/serve-out.mjs` also binds port 3000, so it conflicts the same way.

## Architecture

### One library, read at build time

`src/lib/library.ts` reads the authored content in `src/content/` as pure functions — `listTopics`, `getTopicBySlug`, `listTaxonomy`, `listSources`, `searchLibrary`. There is no repository interface, no database and no request context. Server components call it during `next build`; the browser gets the same data through `out/library.json`, loaded by `src/lib/library-client.ts` and cached in IndexedDB.

The app builds with `output: "export"` under `basePath: "/pocket-chief"`, in development as well as CI. Consequences worth knowing before you debug something:

- Anything that needs a request at runtime — `searchParams` in a server component, a non-GET route handler, `headers()`, middleware — will fail the build or be silently inert. Search reads `?q=` on the client for exactly this reason.
- Bookmarks and reading history are per-device, in IndexedDB. Clearing site data clears them, and there is no server copy to restore from.
- There is no Anki export. Flashcards come from handing a published topic URL to an assistant; do not reintroduce an in-app exporter without asking.
- New content does not appear on HMR if a stale dev server from another chat is serving. Confirm with `curl -s localhost:3210/pocket-chief/library.json` before concluding new content failed to register. Keep the `basePath` prefix — without it a healthy server 404s and reads as a stale one.

### The claim-support invariant

This is the core domain rule and the most common way to break content.

Every block renders some set of factual statements. `factualUnits(block)` in `src/lib/editorial.ts` extracts them — bullet items, joined table rows, `title: detail` for sequence steps, node and edge labels for flows. A block is approvable only when `claims[i].text` matches `factualUnits(block)[i]` **exactly, in order**, with at least one citation resolving to a source the owner supplied. `supportWarnings()` enforces it, `approveDraft()` throws on any warning, and `requireOwnerAttestation()` strips citations back to `needs_support` whenever a block is edited.

`supportWarnings()` in `src/lib/editorial.ts` is now the only enforcement. `src/lib/__tests__/content-contract.test.ts` runs it over every authored topic, and a PostToolUse hook runs that test on any edit under `src/content/`.

### Two corpora, one block model

`Topic` and `Playbook` both render `TopicBlock[]`, so they share `sourced()`, `supportWarnings()`, the renderer and the search scorer. They are separate types on purpose:

- A playbook is organized by `procedureId` + `approach` + `specialty` and **never enters the SCORE taxonomy**. `library.test.ts:29` (one parentless root) and `taxonomy.test.ts:30` (the exact ordered section list) are the tripwire that proves it — do not add a taxonomy node for a playbook.
- Playbooks ship approved-only, so there is no `TopicVersion` wrapper and no History tab.
- A playbook is saved and viewed like a topic: `PlaybookContent` calls `recordRecentView`, and its header (`ReaderHeader`, shared with `TopicContent`) offers Save through `setPlaybookSaved`. The `saved` and `recent` stores hold one record per id with a `kind` (`topic` or `playbook`); a record with no `kind` is an old topic snapshot and reads as a topic. Rebuild rows from the current library by id with `resolveEntries()` (`src/lib/library-items.ts`) and render them in the shared `ListRow`, never from a stored snapshot: a playbook has no `scoreCategory` and no `/topics/<slug>` page. A missing id is a muted "No longer available" row on Saved and is dropped silently on Home. Saved and Home read the stores through one `useLoader(loadHistory)`; `getSavedEntries()` and `getRecentEntries()` are the only readers.
- `sourcedUnits()` cites each factual unit separately. Reach for it when one block genuinely mixes societies; blanket multi-source citation passes `supportWarnings` while quietly claiming both works support both statements.
- `src/lib/__tests__/playbooks.test.ts` pins the set of auto-links each playbook generates. An auto-link is a claim about clinical relatedness, and the topic link index is global, so a new one fails the test until someone reviews it. Three false positives have already been caught this way: "skip lesions" reaching Crohn disease, "a fast one" reaching the FAST exam, and "peroneal nerve" reaching escharotomy.

### The removed attending database

The attending-preference feature was removed on 2026-11-11. An earlier build kept hand-written notes in the IndexedDB database `pocket-chief-attendings`; the app never opens, migrates or deletes it, and `content-privacy.test.ts` fails if shipped source or `out/` ever names it again. Do not add a read or a delete for it without asking.

### Library content

Content lives in `src/content/`, one file per topic, aggregated by `src/content/index.ts`. `src/lib/seed.ts` is a re-export kept for existing imports.

- **Author blocks through `sourced()`** (`src/content/authoring.ts`). It derives claims from `factualUnits()`, so claim text cannot drift from rendered text. Hand-written `claims` arrays drift.
- `scoreCategory` must equal the taxonomy ancestry joined with " · "; the contract test compares them because that string drives the breadcrumb and search.

`src/lib/__tests__/content-contract.test.ts` validates all of the above plus renderer constraints. A PostToolUse hook (`.claude/hooks/pocket-chief-content.mjs`, wired in the vault's `.claude/settings.local.json`) runs it automatically on edits under `src/content/`.

Adding content is a repeatable workflow — invoke the `/add-topic` skill rather than reconstructing the steps. It covers **both corpora**: steps 2, 6 and 7 fork for playbooks, which use `buildPlaybook()`, register in `src/content/playbooks/index.ts` only, and are documented in that skill's `references/playbooks.md`.

### Reader chrome: the shell hosts it, the page owns it

`TopicContent` and `PlaybookContent` each render one `ReaderTools` (`src/components/page-toolbar.tsx`), which portals the page toolbar into the shell's `#shell-toolbar` slot and owns the Contents dialog. The laptop sidebar's Contents is a separate copy rendered at build time by the `@contents` parallel route (`src/app/@contents/`) and handed to `AppShell` as `contents`; it shows on reader paths only (`isReaderPath`), because the slot keeps its last page on a soft navigation. Both copies read `src/lib/reader-contents.ts`. They share no React state: tab changes reach the sidebar through `READER_TAB_EVENT`, and section links reach the page through `hashchange` and an in-page click listener in `useBlockCollapse`. A new route under `/topics/<x>` or `/playbooks/<x>` that is not a reader page must change `isReaderPath` or it gets an empty Contents slot.

### Renderer constraints on content

`src/components/topic-content.tsx` renders every block type, and its React keys impose rules that content must respect:

- **Tables**: `row[0]` is the row key and `${row[0]}-${cell}` is the cell key — row headers must be unique and no cell may repeat within its own row.
- **Flows**: laid out by longest path from the root. A flow whose widest level has more than two boxes renders only as a nested outline (`condition → step`, a shared step written out again under each branch that reaches it); two columns or fewer also draw a diagram, hidden from assistive tech, with each condition above its box. There must be exactly one root, all edge endpoints must exist, and every node must be reachable or it silently disappears from both forms.
- **Bullets and sequences**: items and step titles are keys, so keep them unique.
- Any block with a `heading` appears in the on-page table of contents.
- A `↳` heading that repeats the heading of the block above is folded into that section (`groupSections` in `src/lib/inline.ts`): no row, title or Contents entry of its own, content under the parent's, the block's id still a link target that opens the parent. A `↳` heading that differs stays a real sub-heading. Author with distinct titles; do not repeat the parent's.
- **Figures** are `image` blocks: `sourced({ id, type: "image", heading, mediaId: "name.svg", alt, caption }, SOURCE)`. `mediaId` is the file name in `public/media/`, served at `<basePath>/media/<mediaId>`. `alt` and `caption` are factual units, so each needs a citation like any other text. Draw dark-on-white with a `viewBox` (the plate behind an `<img>` is `--figure-ground`, white in both themes). `figures.test.ts` fails on a raster file, an `<image>` or `data:` URI inside an SVG, or a block whose file is missing; originals only (AGENTS.md).

## Conventions

- `src/lib` and `src/components` are written in a dense single-line style. Match the surrounding density rather than reformatting.
- Editorial and voice rules for content are in `AGENTS.md` and the vault's `00_Resources/voice-principles.md`. Every factual block cites a supplied source or is visibly marked unsupported; treat AI-authored content as draft until the owner approves it.
- Record durable product decisions in this workstation's `MEMORY.md`, not in commit messages alone.

## Environment gotchas

- The vault lives in iCloud-synced Documents, and iCloud evicts `node_modules` wholesale. Evicted
  files keep their directory entry but carry the `dataless` flag, and reading one blocks forever —
  the process sits at 0% CPU with no output and no error. `brctl download` does not recover them.
  Diagnose with `find node_modules -type f -flags +dataless | wc -l` (a healthy tree returns 0) and,
  for a hung process, `lsof -p <pid>` names the exact file it is stuck on.
  Recovery is `rm -rf node_modules` — unlink does not materialize, so it is fast — then reinstall.
  `pnpm` is not on PATH; use `npx --yes pnpm@11.19.0 install`. The pnpm content-addressable store at
  `~/Library/pnpm/store/v11` lives outside iCloud and stays healthy, so the reinstall needs no
  network and takes about ten seconds.
- iCloud also evicts `.git/objects/pack/`, which every worktree shares with the main checkout. That
  surfaces as `error: ... pack-*.pack is far too short to be a packfile` or `unable to read tree` on
  an ordinary `git add` or `git commit`. `ls -la` shows the expected size while `du -sh` shows `0B`.
  This is NOT repository corruption and `git fsck --unpack` is the wrong reflex — run
  `brctl download <the named pack file>`, which does work here even though it does not for
  `node_modules`, then retry the git command.
- The remote is `drzachnelson/pocket-chief`, `main` is the default branch and the deploy branch, and the licensed corpora under `Pocket Chief Resources/` stay gitignored except `score-module-outline.md`.
- The vault's `.claude/launch.json` must use vault-relative paths for the `pocket-chief` entry. An absolute path pins it to one machine's home directory and the preview dies with `MODULE_NOT_FOUND`.
- The dev server happily serves routes the static export never generated, and Playwright runs `next dev`. Verify a new route against the real artifact (`next build`, then `node scripts/serve-out.mjs`), and note that `.github/workflows/deploy.yml` now gates on `out/playbooks.json` and on every playbook page having prerendered.
- Adding topics has repeatedly exposed assumptions built when the library held one topic — two search-scoring flaws and several hardcoded single-topic UI strings so far. When a test that expected an empty result set starts failing after new content lands, check whether the app was only ever correct for one topic before changing the test.

## Agent skills

### Issue tracker

Issues live as GitHub issues in `drzachnelson/pocket-chief`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
