# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Pocket Chief is a private, single-user general surgery reference PWA. `README.md` covers the product surface and production setup; `AGENTS.md` carries the workstation identity and editorial rules; `docs/AI-CONTRACT.md` and `docs/SECURITY.md` carry the model and security contracts. This file covers what you can only learn by reading several files at once.

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

**Dev server**: use the Browser pane preview (`preview_start` with `{name: "pocket-chief"}`), never Bash. The `.claude/launch.json` entry at the vault root prefers port **3210** and falls back to an assigned port (`autoPort`). Next 16 still refuses a second `next dev` for this directory on *any* port, so if another chat has one running you cannot start your own — and that server keeps serving its cached library. Confirm with `curl -s localhost:3210/api/library` before concluding new content failed to register.

**E2E**:

```bash
node node_modules/@playwright/test/cli.js test
```

Playwright starts *its own* dev server on port 3000 with `POCKET_CHIEF_DEMO=true`. **Stop the preview server first** — with one already running, `config.webServer` fails with exit code 1 and the whole run aborts.

## Architecture

### Two data modes behind one interface

`dataMode()` in `src/lib/auth.ts` resolves to `demo`, `supabase`, or `misconfigured` from the environment, and `getRepository()` returns a `DemoRepository` or `SupabaseRepository` implementing the `ContentRepository` interface in `src/lib/repository.ts`. Every route and page goes through that interface — add a capability there and both implementations must satisfy it.

Local development runs in demo mode (`POCKET_CHIEF_DEMO=true`, no Supabase or OpenAI credentials in `.env.local`). Consequences worth knowing before you debug something:

- **The demo store caches on `globalThis`** (`src/lib/store.ts`). Seed changes do not appear on HMR — restart the dev server or you will chase a ghost.
- Drafts, bookmarks, and Anki cards created in demo mode are in-memory and vanish on restart.
- AI paths are inert without `OPENAI_API_KEY`; library content is added by authoring files, not through the `/add` flow.

`src/proxy.ts` gates everything: demo mode passes through, an incomplete configuration redirects to `/configuration-error` and fails API calls closed, and a configured deployment requires the session email to equal `POCKET_CHIEF_OWNER_EMAIL`.

### The claim-support invariant

This is the core domain rule and the most common way to break content.

Every block renders some set of factual statements. `factualUnits(block)` in `src/lib/editorial.ts` extracts them — bullet items, joined table rows, `title: detail` for sequence steps, node and edge labels for flows. A block is approvable only when `claims[i].text` matches `factualUnits(block)[i]` **exactly, in order**, with at least one citation resolving to a source the owner supplied. `supportWarnings()` enforces it, `approveDraft()` throws on any warning, and `requireOwnerAttestation()` strips citations back to `needs_support` whenever a block is edited.

The same expectations are duplicated in SQL as `topic_block_expected_claims`. **The TypeScript and SQL sides must change together** — this is a known, accepted dual-maintenance risk.

### Library content

Content lives in `src/content/`, one file per topic, aggregated by `src/content/index.ts`. `src/lib/seed.ts` is a re-export kept for existing imports.

- **Author blocks through `sourced()`** (`src/content/authoring.ts`). It derives claims from `factualUnits()`, so claim text cannot drift from rendered text. Hand-written `claims` arrays drift.
- **`src/content/topics/choledocholithiasis.ts` is byte-pinned.** `ensure_launch_topic` in `supabase/migrations/202608130001_release_hardening.sql` rejects launch content whose sha256 over `JSON.stringify(choledoBlocks)` does not match a pinned digest — so key order matters and this one file must not be re-authored through the helper. `content-contract.test.ts` asserts the digest against the migration.
- `scoreCategory` must equal the taxonomy ancestry joined with " · "; the contract test compares them because that string drives the breadcrumb and search.

`src/lib/__tests__/content-contract.test.ts` validates all of the above plus renderer constraints. A PostToolUse hook (`.claude/hooks/pocket-chief-content.mjs`, wired in the vault's `.claude/settings.local.json`) runs it automatically on edits under `src/content/`.

Adding a SCORE section is a repeatable workflow — invoke the `/score-topic` skill rather than reconstructing the steps.

### Renderer constraints on content

`src/components/topic-content.tsx` renders every block type, and its React keys impose rules that content must respect:

- **Tables**: `row[0]` is the row key and `${row[0]}-${cell}` is the cell key — row headers must be unique and no cell may repeat within its own row.
- **Flows**: laid out by longest path from the root, so arbitrary width and depth work, but there must be exactly one root, all edge endpoints must exist, and every node must be reachable or it silently disappears.
- **Bullets and sequences**: items and step titles are keys, so keep them unique.
- Any block with a `heading` appears in the on-page table of contents.

### Safety and AI

`detectLikelyPHI()` (`src/lib/safety.ts`) runs on titles, notes, and source metadata **before** any model call and returns 422 `PHI_SUSPECTED`. The AI adapter is server-only, schema-constrained, rate-limited by an in-memory limiter (single-instance only), and has deterministic fallbacks so a model failure never replaces approved content.

## Conventions

- **Applied migrations are immutable.** Never edit a migration that has run; add a new timestamped file. `202608120001` is frozen; `202608130001` is the catch-up for an earlier in-place edit.
- `src/lib` and `src/components` are written in a dense single-line style. Match the surrounding density rather than reformatting.
- Editorial and voice rules for content are in `AGENTS.md` and the vault's `00_Resources/voice-principles.md`. Every factual block cites a supplied source or is visibly marked unsupported; treat AI-authored content as draft until the owner approves it.
- Record durable product decisions in this workstation's `MEMORY.md`, not in commit messages alone.

## Environment gotchas

- The vault lives in iCloud-synced Documents. iCloud can evict `node_modules` and `.next` contents (commands hang at 0% CPU) and create `name 2.ext` conflict copies inside `.next` that break `tsc`. Remedy: reinstall `node_modules`, delete the conflict copies.
- The remote is the private repo `drzachnelson/pocket-chief`, and `main` is the default branch. The licensed corpora under `Pocket Chief Resources/` are deliberately gitignored except for `score-module-outline.md` — never commit the SCORE module texts or Fiser chapters.
- The vault's `.claude/launch.json` must use vault-relative paths for the `pocket-chief` entry. An absolute path pins it to one machine's home directory and the preview dies with `MODULE_NOT_FOUND`.
- Adding topics has repeatedly exposed assumptions built when the library held one topic — two search-scoring flaws and several hardcoded single-topic UI strings so far. When a test that expected an empty result set starts failing after new content lands, check whether the app was only ever correct for one topic before changing the test.
