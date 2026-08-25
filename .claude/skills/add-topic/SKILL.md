---
name: add-topic
description: Use when a packet of surgical study material becomes Pocket Chief library content — a Word or PDF document, pasted web or AI-search output, a SCORE module text, or a NotebookLM "# PACKET:" block — covering whether it deepens an existing topic or opens a new one, clinical review, block authoring, taxonomy placement, verification, and commit. Not for app features, search, or rendering.
argument-hint: "[attach a document, paste the material, or name the SCORE section to work through]"
---

# Adding a topic to Pocket Chief

Everything that arrives is a **packet** — a Word doc, a pasted answer from a web search, a SCORE module, a NotebookLM block. The format only changes step 1. From step 2 the work is identical, so the rest of this skill says "the packet" and means whichever one you got.

You draft; Zach approves. Say what you decided and why, in chat, as you go.

## Non-negotiables

Each of these has already bitten this project.

1. **Never re-author `src/content/topics/choledocholithiasis.ts`.** `ensure_launch_topic` in `supabase/migrations/202608130001_release_hardening.sql` rejects launch content whose sha256 over `JSON.stringify(choledoBlocks)` misses a pinned digest. Key order matters. `content-contract.test.ts` catches a violation — heed it rather than editing the migration.
2. **Author every block through `sourced()`** in `src/content/authoring.ts`. It derives claims from `factualUnits()`, the same function approval checks against. Hand-written `claims` arrays drift and block approval.
3. **Every claim cites a source Zach actually supplied.** Where you add clinical content beyond the packet — and you should, where it is high-yield — say so in chat and record it in the source's `details`.
4. **No PHI.** No patient details, no case specifics, no identifiers.
5. **Restart the dev server after content changes.** `src/lib/store.ts` caches the demo store on `globalThis`, so HMR keeps serving the old library. That **ghost** looks exactly like new content failing to register, and it will cost you an hour.

`pnpm` is not on PATH. Call binaries through `node node_modules/<pkg>/...`.

## 1. Get the packet into markdown, and confirm it is whole

Read `references/ingest.md` for the format you were handed. It covers the `.docx` extractor, PDFs, pasted text, the SCORE and Fiser corpora on disk, and NotebookLM packets.

**Confirm the packet is whole before anything else.** A truncated document reads as a finished one — nothing announces the cut, and an intact first section is enough to look complete. Check that it reaches a plausible last section, that any reference list is present and its highest number matches the highest marker in the body, and that it does not stop mid-sentence. Ask for the rest before authoring rather than after. This has already cost a full review pass once.

## 2. Decide which topics exist, and whether they are new

**Search the library first.** The library is past the point where a packet is presumed new:

```bash
grep -ril "<topic>" src/content/topics/ && grep -n "aliases:" src/content/topics/<candidate>.ts
```

Three outcomes, and the call is yours to make and state:

| What you find | What to do |
|---|---|
| Nothing close | New topic. |
| An existing topic the packet **deepens** — same operation, same disease, more detail | Revise it in place: keep its `id`, `versionId`, and `slug`, rewrite `blocks`, extend `aliases`, bump `reviewedAt`, and add the new source to `additionalSourceIds`. Bookmarks and Anki cards key off the slug. |
| An existing topic the packet **specializes** — a distinct context that is separately testable | New topic beside it, and add a cross-reference alias to each. Trauma versus elective is the usual instance of this. |

Then settle splits and merges. One comparison topic beats two thin ones when the value is the side-by-side (`fibroadenoma-vs-phyllodes-tumor`); separate topics win when they are separately testable. When the SCORE outline names a disease and its operation as separate entries, that is the answer — write two. `malrotation` and `malrotation-operation` are the worked example: the disease is tested on diagnosis, the operation on technique, and merging buries one inside the other.

Confirm taxonomy placement against `Pocket Chief Resources/score-module-outline.md` before writing. Match the outline's titles and granularity for anything new; the app's earliest sections were split finer than SCORE splits them. If the topic is absent from the outline or its placement is genuinely ambiguous, ask rather than inventing a branch.

## 3. Read it as a colleague, not a transcriptionist

Flag in chat, before authoring:

- Statements out of date versus current guidelines
- Internal inconsistencies between a summary table and the detail section under it
- **Contradictions between two supplied documents** — the most valuable thing a multi-document packet contains, because they mark where the teaching is genuinely unsettled
- Attributions to the wrong eponym, mechanism, or organism
- Foreign syntax: markdown links to other sites, NotebookLM citation chips, stray superscripts, literal `<strong>` tags. The app has no such routes and they render as dead text.

Web search is in scope and expected for anything guideline-dependent — screening criteria, size thresholds, surveillance intervals, trial outcomes. Verify before authoring rather than trusting the packet.

### Write the split

Where board orthodoxy and current practice diverge, keep the keyed answer **and** give the divergence its own block headed "Board answer versus current practice" — `prose` for a single split, a `table` with Question / Board answer / Current practice columns once there are several. Three situations reach for it:

| Situation | Worked example |
|---|---|
| Board orthodoxy overtaken by practice | `desmoid-tumors-and-fibromatoses.ts` — WLE and sulindac for the exam, surveillance-first and nirogacestat in practice |
| A source is simply wrong | `abdominal-and-aortoiliac-aneurysm-repair.ts` — Fiser's three-year interval for aneurysms over 5.0 cm |
| Two supplied sources disagree | `malrotation-operation.ts` — Fiser writes cecopexy into the keyed steps, the operative playbook forbids routine fixation; both describe something real |

Do not pick a winner when the disagreement is real. Say what each source claims, what each is probably counting or assuming, and which answer a question is asking for. Packets written from the current literature often mark these themselves, as "Board-classic vs current" or similar — those lines are the split already located for you, and they belong in a split block rather than flattened into a bullet.

## 4. Register the sources

`sourced()` tags one source per block, and `supportWarnings` rejects a citation the version does not list — so every source a block cites goes in `src/content/sources.ts` and onto the topic through `sourceId` plus `additionalSourceIds`.

How many sources a packet becomes depends on how it was written:

- **A synthesis Zach assembled** — one `user_notes` source for the packet, with what it drew on recorded in `details`.
- **A densely cited document** — one source for the document itself, with its full reference list folded into `details`, *plus* a separate entry for any work a block leans on as the authority: a named guideline, a landmark trial, a specific edition. Register the ones you can attribute confidently through the packet's `[N]` markers and cite those blocks to them; leave the long tail in `details`. Do not manufacture 38 source entries because the document has 38 references.
- **A SCORE module or Fiser chapter** — its own entry, with the real citation, edition or retrieval date, and URL.

Give every source its actual citation string. These packets carry real book, chapter, guideline, and trial names — flattening them back into a generic blob loses the one thing that makes a claim checkable. Record anything you added beyond the packet in `details`, marked as pending Zach's sign-off.

IDs are `00000000-0000-4000-8000-0000000001XX`. Take the next free hundreds block for a new section and allocate within it yourself; never accept an id from a packet.

## 5. Map content to blocks

| Content shape | Block type |
|---|---|
| One-paragraph orientation | `summary` — always first |
| Parallel comparison, classification, staging | `table` |
| Branching management decision | `flow` |
| Ordered operative or diagnostic steps | `sequence` |
| Pearls, indications, risk factors | `bullets` |
| A trap worth its own callout | `warning` |
| Nuance that is prose, not a list | `prose` |
| Sources | `references` — always last |

Renderer constraints the contract test enforces:

- **Tables**: the first cell of a row is its React key, so row headers must be unique and no cell may repeat inside its own row. Every row matches the column count.
- **Flows**: exactly one root, every edge endpoint exists, no cycles, every node reachable. Layout is by longest path from the root, so arbitrary width and depth are fine.
- **Bullets and sequences**: items and step titles are keys, so keep them unique.
- Any block with a `heading` lands in the on-page table of contents.

### Inline markup

Block text runs through `src/lib/inline.ts`, which gives you more than emphasis:

- `**bold**` — **whole words only**. `chole**docho**lithiasis` splits one search token into two broken ones, and the contract test rejects it. Markers must balance within each factual unit.
- `[[Term]]` — an explicit cross-link to another topic, resolved against titles and aliases. Bold goes **outside**: `**[[Cooper's ligament]]**`.
- Plain text **auto-links** against every other topic's title and aliases, longest match first, at most once per block. You get cross-links for free — and you inherit any over-broad alias another topic claimed, so audit what it produced (see `references/verify.md`).
- A leading `- ` or `-- ` on a bullets item nests it one or two levels.
- A leading `↳ ` on a block heading renders it as a sub-heading under the block above.

Strip the packet's `[N]` markers out of block text — they become part of the claim string and render as literal junk.

## 6. Write the files

One topic per file at `src/content/topics/<slug>.ts`, shaped like an existing topic. Register it in `src/content/index.ts` (both the import and `demoTopics`), add any new taxonomy nodes to `src/content/taxonomy.ts`, and the sources to `src/content/sources.ts`.

`scoreCategory` must equal the taxonomy ancestry joined with " · " — the contract test compares them, because that string drives the breadcrumb and search.

Give aliases generously: abbreviations, eponyms, drug names, trial names, and the terms actually typed under pressure.

## 7. Verify

```bash
node node_modules/typescript/bin/tsc --noEmit
node node_modules/eslint/bin/eslint.js . --max-warnings=0
node node_modules/vitest/vitest.mjs run
```

Then read `references/verify.md` and work through it — the browser pass, the ghost, and e2e. Every block must read **Supported** before you call this done.

## 8. Close out

Append what was **decided** to `MEMORY.md`, not what was done. Existing dated lines record what was true at the time — topic counts in them are history, not drift, so append rather than rewrite.

Branch before committing; `main` is the default branch of the private repo `drzachnelson/pocket-chief` and recent work has landed through pull requests. Committing is the ask; pushing is a separate one.

`.claude/` holds `settings.local.json` and git worktrees, both gitignored, alongside tracked files. Stage by name — never `git add -A` here.

## Watch for

Adding topics keeps exposing assumptions built when the library held one topic: two search-scoring bugs and three hardcoded single-topic UI strings so far. When a test that expected an empty result set starts failing, ask whether the content is wrong or whether the app was only ever correct for one topic. Usually the latter, and the fix belongs in the app.

Two failures are the content's own doing rather than the app's, and both are correct to fix in place:

- **A new top-level section** breaks `taxonomy.test.ts`, which asserts the complete ordered section list. Add the new id.
- **An over-broad alias on an existing topic** starts stealing auto-links the moment a topic that uses the phrase properly arrives. Narrow the alias at its source rather than avoiding the phrase in new content — `malrotation-operation` claimed the bare "damage control" and captured it away from the trauma laparotomy topic.
