---
name: add-topic
description: Use when a packet of surgical study material becomes Pocket Chief library content — a Word or PDF document, pasted web or AI-search output, a SCORE module text, or a NotebookLM "# PACKET:" block — covering both corpora (SCORE topics and OR playbooks), whether the packet deepens an existing entry or opens a new one, clinical review, block authoring, taxonomy or procedure placement, verification, and commit. Not for app features, search, or rendering.
argument-hint: "[attach a document, paste the material, or name the SCORE section or procedure to work through]"
---

# Adding library content to Pocket Chief

Everything that arrives is a **packet** — a Word doc, a pasted answer from a web search, a SCORE module, a NotebookLM block. The format only changes step 1. From step 2 the work is identical, so the rest of this skill says "the packet" and means whichever one you got.

Pocket Chief holds **two corpora**. They share everything except placement and builder:

| | **Topic** | **Playbook** |
|---|---|---|
| What it is | A SCORE curriculum entry — a disease or an operation as the boards test it | An operative guide for one procedure as it is actually done |
| Lives in | `src/content/topics/<slug>.ts` | `src/content/playbooks/<slug>.ts` |
| Placed by | taxonomy node + `scoreCategory` | `procedureId` + `approach` + `specialty` |
| Built by | `buildTopic()` | `buildPlaybook()` |
| Registered in | `src/content/index.ts` **and** `src/content/taxonomy.ts` | `src/content/playbooks/index.ts` only |
| Ships | draft → approved version, with a History tab | approved-only; git is the version history |

Blocks, `sourced()`, `supportWarnings`, the renderer and the search scorer are identical across both. Steps 1, 3, 4, 5 and 8 do not care which you are writing. **Steps 2, 6 and 7 fork**, and say so where they do.

You draft; Zach approves. Say what you decided and why, in chat, as you go.

## Non-negotiables

Each of these has already bitten this project.

1. **Author every block through `sourced()`** in `src/content/authoring.ts`. It derives claims from `factualUnits()`, the same function approval checks against. Hand-written `claims` arrays drift and block approval.
2. **Every claim cites a source Zach actually supplied.** Where you add clinical content beyond the packet — and you should, where it is high-yield — say so in chat and record it in the source's `details`.
3. **A playbook never enters the SCORE taxonomy**, and never gets a `scoreNodeId` or `scoreCategory`. `library.test.ts` (one parentless root) and `taxonomy.test.ts` (the exact ordered section list) are the tripwire. The reason is concrete: every reader of the saved and recent stores renders rows through `TopicCard`, which reads `scoreCategory` and links to `/topics/<slug>` — a playbook in there is a broken card pointing at a 404. For the same reason `PlaybookContent` must never call `recordRecentView` or `setTopicSaved`.
4. **No PHI.** No patient details, no case specifics, no identifiers. `content-privacy.test.ts` asserts this over `src/content/` and over `out/`.
5. **Beat the ghost before you believe the browser.** Next 16 refuses a second `next dev` for this directory on *any* port, so a server another chat left running blocks you entirely — and keeps serving its cached library. That looks exactly like new content failing to register, and it has cost an hour before. Confirm what the server actually holds:

   ```bash
   curl -s localhost:3210/pocket-chief/library.json | grep -o '<new-slug>'
   ```

   The `/pocket-chief` prefix is `basePath` from `next.config.ts`, and it applies in development too. Drop it and you get a 404 for a healthy server, which reads as a ghost that isn't there.

`pnpm` is not on PATH. Call binaries through `node node_modules/<pkg>/...`.

> **If you find an older rule about `choledocholithiasis.ts` being sha256-pinned, it is history.** `MEMORY.md` and the migration plan still describe `ensure_launch_topic` rejecting content whose digest moved. The static migration deleted that SQL and with it the constraint — the file's own header comment records this. It is now an ordinary topic that merely has not been converted to `sourced()` yet, and converting it is safe.

## 1. Get the packet into markdown, and confirm it is whole

Read `references/ingest.md` for the format you were handed. It covers the `.docx` extractor, PDFs, pasted text, the SCORE and Fiser corpora on disk, and NotebookLM packets.

**Confirm the packet is whole before anything else.** A truncated document reads as a finished one — nothing announces the cut, and an intact first section is enough to look complete. Check that it reaches a plausible last section, that any reference list is present and its highest number matches the highest marker in the body, and that it does not stop mid-sentence. Ask for the rest before authoring rather than after. This has already cost a full review pass once.

## 2. Decide the corpus, then the placement — FORKS

### Which corpus

Ask what the packet is *for*. A packet about how an operation is **tested** is a topic; a packet about how it is **done**, step by step, for a case you are scrubbing tomorrow, is a playbook. The SCORE outline is the tiebreaker: if the outline names it, it is a topic.

One procedure can legitimately be both — `carotid-endarterectomy-bovine-patch` is a playbook while neck anatomy and indications live in topics. When that happens, write the playbook and add `relatedTopicSlugs`; do not duplicate the topic's content into it.

### Topic path

**Search the library first.** The library is past the point where a packet is presumed new:

```bash
grep -ril "<topic>" src/content/topics/ && grep -n "aliases:" src/content/topics/<candidate>.ts
```

Three outcomes, and the call is yours to make and state:

| What you find | What to do |
|---|---|
| Nothing close | New topic. |
| An existing topic the packet **deepens** — same operation, same disease, more detail | Revise it in place: keep its `id`, `versionId`, and `slug`, rewrite `blocks`, extend `aliases`, bump `reviewedAt`, and add the new source to `additionalSourceIds`. Bookmarks key off the slug. |
| An existing topic the packet **specializes** — a distinct context that is separately testable | New topic beside it, and add a cross-reference alias to each. Trauma versus elective is the usual instance of this. |

Then settle splits and merges. One comparison topic beats two thin ones when the value is the side-by-side (`fibroadenoma-vs-phyllodes-tumor`); separate topics win when they are separately testable. When the SCORE outline names a disease and its operation as separate entries, that is the answer — write two. `malrotation` and `malrotation-operation` are the worked example: the disease is tested on diagnosis, the operation on technique, and merging buries one inside the other.

Confirm taxonomy placement against `Pocket Chief Resources/score-module-outline.md` before writing. Match the outline's titles and granularity for anything new; the app's earliest sections were split finer than SCORE splits them. If the topic is absent from the outline or its placement is genuinely ambiguous, ask rather than inventing a branch.

### Playbook path

Read `references/playbooks.md` before writing your first one. Placement is three fields rather than a tree. Attending preference notes join on **`procedureId`, deliberately not on the slug** (`src/lib/attending.ts:50`), so the slug is safe to rename later and the `procedureId` is not: changing one orphans hand-written notes that live only on Zach's device, in a second database, and are not in the build.

```bash
grep -n "procedureId\|approach\|specialty" src/content/playbooks/*.ts
```

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

A playbook inherits this whole section. It is more likely to hit the third row, because operative guides mix societies routinely — and that is what `sourcedUnits()` is for (step 4).

## 4. Register the sources

`sourced()` tags one source per block, and `supportWarnings` rejects a citation the version does not list — so every source a block cites goes in `src/content/sources.ts` and onto the entry through `sourceId` plus `additionalSourceIds`.

How many sources a packet becomes depends on how it was written:

- **A synthesis Zach assembled** — one `user_notes` source for the packet, with what it drew on recorded in `details`.
- **A densely cited document** — one source for the document itself, with its full reference list folded into `details`, *plus* a separate entry for any work a block leans on as the authority: a named guideline, a landmark trial, a specific edition. Register the ones you can attribute confidently through the packet's `[N]` markers and cite those blocks to them; leave the long tail in `details`. Do not manufacture 38 source entries because the document has 38 references.
- **A SCORE module or Fiser chapter** — its own entry, with the real citation, edition or retrieval date, and URL.

Give every source its actual citation string. These packets carry real book, chapter, guideline, and trial names — flattening them back into a generic blob loses the one thing that makes a claim checkable. Record anything you added beyond the packet in `details`, marked as pending Zach's sign-off.

**IDs are `00000000-0000-4000-8000-0000000XXXXX`, allocated in hundreds blocks.** Check what is taken before choosing, because the ranges have grown well past what older notes describe:

```bash
grep -o '00000000-0000-4000-8000-0000000[0-9a-f]*' src/content/sources.ts | sed 's/.*-0000000//' | sort -u | tr '\n' ' '
```

Topics take the next free hundreds block below `03000`. **Playbook sources live in the `03000` block** and are allocated singly, not in hundreds. Never accept an id from a packet.

### When one block genuinely mixes societies

`sourcedUnits()` cites each factual unit separately. Prefer splitting a block so each has one source; reach for `sourcedUnits()` only when a table or list genuinely mixes them row by row — an ACC/AHA class recommendation beside a Cochrane review. Blanket multi-source citation passes `supportWarnings`, which only checks non-empty and allow-listed, while quietly telling the reader both works support both statements.

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

Playbooks render against the **topic** link index, so an operative guide silently inherits every topic alias. That is why `playbooks.test.ts` pins each playbook's links — see `references/playbooks.md`.

## 6. Write the files — FORKS

**Topic.** One topic per file at `src/content/topics/<slug>.ts`, shaped like an existing topic and built with `buildTopic()`. Register it in `src/content/index.ts` (both the import and `libraryTopics`), add any new taxonomy nodes to `src/content/taxonomy.ts`, and the sources to `src/content/sources.ts`.

`scoreCategory` must equal the taxonomy ancestry joined with " · " — the contract test compares them, because that string drives the breadcrumb and search.

**Playbook.** One per file at `src/content/playbooks/<slug>.ts`, built with `buildPlaybook()`, registered in `src/content/playbooks/index.ts` (the import, the re-export, and `libraryPlaybooks`). **Touch neither `src/content/index.ts` nor `src/content/taxonomy.ts`.** Details in `references/playbooks.md`.

Give aliases generously in both: abbreviations, eponyms, drug names, trial names, and the terms actually typed under pressure.

## 7. Verify — FORKS at the end

```bash
node node_modules/typescript/bin/tsc --noEmit
node node_modules/eslint/bin/eslint.js . --max-warnings=0
node node_modules/vitest/vitest.mjs run
```

Then read `references/verify.md` and work through it — the worktree setup, the preview, the ghost, the auto-link audit, and e2e. Every block must read **Supported** before you call this done.

**A new playbook adds one step the topic path does not have.** The deploy workflow gates on `out/playbooks.json` existing, being non-empty, and every playbook having prerendered to `out/playbooks/<slug>/index.html`. The dev server happily serves routes the static export never generated, so a green browser pass proves nothing about the deploy. Build the real artifact and assert against it:

```bash
node node_modules/next/dist/bin/next build
grep -o '<new-slug>' out/playbooks.json && ls out/playbooks/<new-slug>/index.html
```

## 8. Close out

Append what was **decided** to `MEMORY.md`, not what was done. Existing dated lines record what was true at the time — counts in them are history, not drift, so append rather than rewrite.

Branch before committing; `main` is the default branch of the private repo `drzachnelson/pocket-chief` and recent work has landed through pull requests. Committing is the ask; pushing is a separate one.

`.claude/` holds `settings.local.json` and git worktrees, both gitignored, alongside tracked files. Stage by name — never `git add -A` here.

## Watch for

Adding content keeps exposing assumptions built when the library held one topic: two search-scoring bugs and three hardcoded single-topic UI strings so far. When a test that expected an empty result set starts failing, ask whether the content is wrong or whether the app was only ever correct for one topic. Usually the latter, and the fix belongs in the app.

Three failures are the content's own doing rather than the app's, and all are correct to fix in place:

- **A new top-level section** breaks `taxonomy.test.ts`, which asserts the complete ordered section list. Add the new id. If you are writing a playbook and this test fails, you have given it a taxonomy node — that is non-negotiable 3, and the fix is to remove the node, not to update the test.
- **An over-broad alias on an existing topic** starts stealing auto-links the moment a topic that uses the phrase properly arrives. Narrow the alias at its source rather than avoiding the phrase in new content — `malrotation-operation` claimed the bare "damage control" and captured it away from the trauma laparotomy topic.
- **A new playbook fails the pinned auto-link assertion** in `playbooks.test.ts` by design. Review each link before adding it to the expected set; three false positives have already been caught this way.
