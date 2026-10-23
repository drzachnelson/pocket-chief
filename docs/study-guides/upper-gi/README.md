# Upper GI study-guide batch

Six source-linked guides, prepared October 22, 2026, and promoted to regular library topics on the same date. **Pending Zach's clinical review.**

The [promotion PR #40](https://github.com/drzachnelson/pocket-chief/pull/40) (branch `claude/promote-upper-gi-drafts`) moves the six topics to `src/content/topics/<slug>.ts` as ordinary `buildTopic` entries and registers them in the published library. They keep the clinical text, decision tables, operative sequences, source-specific corrections and source registrations of the Markdown guides here. That PR stays unmerged until Zach signs off on the per-topic items in [review.md](review.md). Conversion and verification are in [BATCH_NOTES.md](BATCH_NOTES.md). The earlier draft-only registry from PR #38 (`src/content/drafts/upper-gi/`, `buildDraftTopic`) has been removed.

| Guide | SCORE objective/subobjective entries |
|---|---:|
| [Peptic Ulcer Disease](peptic-ulcer-disease.md) | 12 |
| [Gastroduodenal Perforation Repair](gastroduodenal-perforation-repair.md) | 8 |
| [Vagotomy and Drainage](vagotomy-and-drainage.md) | 12 |
| [Upper Gastrointestinal Bleeding](upper-gastrointestinal-bleeding.md) | 13 |
| [Stress Gastritis](stress-gastritis.md) | 11 |
| [Esophagogastroduodenoscopy](esophagogastroduodenoscopy.md) | 7 |

These 63 entries map 41 top-level SCORE objectives and 22 numbered subobjectives, including delegated coverage and explicit limits. They do not certify procedural competency or clinical correctness.

All six complete SCORE modules and relevant Fiser sections were used. No matching stomach/endoscopy question-bank notes were supplied. Primary-guideline additions, source disagreements, unread media and full-text access limits are described in each guide and [source-manifest.json](source-manifest.json). Licensed source texts/images are not committed. Workstation-only source links were converted to private-corpus path descriptions; original society links remain.

[block-source-locators.json](block-source-locators.json) preserves the original paragraph/row citation markers beside each generated block and claim ID without duplicating its clinical prose. The app reference registry contains distinct source records and access/review details; the existing Fiser pancreas source is reused.

## Before merging

Review the per-topic sign-off list in [review.md](review.md). It covers H. pylori regimen/cure details, gastrin units and acid context, patch terminology, complex repair/rescue, adherent-clot management, ICU prophylaxis, airway/antithrombotics and sedation, plus every warning the drafts carried. Resolve unsupported protocol details rather than approving them by association. Merging the promotion PR publishes the topics.

## PR #38 draft-integration validation (historical)

Validated October 22, 2026, before promotion. Current results are in [BATCH_NOTES.md](BATCH_NOTES.md).

- 184 unit/component/content tests passed. All 162 draft blocks and 347 claims are included in contract checks; component checks count every table row, operative step and all 24 flow nodes.
- TypeScript and zero-warning ESLint passed.
- Production static build passed, generating 126 pages. The exported library retained 100 approved topics, with zero draft topic records or draft routes.
- Browser regression suite: 22 passed, four device-specific skips across mobile/desktop, including search, reading, navigation, saving and offline use. These exercise the published app; the six unapproved drafts intentionally have no published routes.
- Separate Standards and Spec reviews found no actionable issues. These are code/conversion reviews, not clinical approval.

Commands: `node node_modules/vitest/vitest.mjs run`, `node node_modules/typescript/bin/tsc --noEmit`, `node node_modules/eslint/bin/eslint.js . --max-warnings=0`, `node node_modules/next/dist/bin/next build --webpack`, and `node node_modules/@playwright/test/cli.js test`.

The baseline passed before integration (172 tests plus one skip). Initial added rendering checks used an obsolete flow selector; that test was corrected to the current `data-node-id` markup. The first browser attempt lacked the matching Chromium runtime; after installing it, the complete suite passed. No dependency manifest or lockfile was changed.

The branch was reconciled with main commit `3ac78a8` after the anorectal batch landed. Both batches initially allocated the same ID range; only upper-GI source/topic/version IDs and their locator ledger were moved to 4700–4735, preserving all incoming source records and existing topic IDs. Both review axes were rerun against the updated base with no actionable findings. All validation above was rerun after resolution. One post-merge browser run hit the existing resume-navigation assertion once; it passed three isolated diagnostic repetitions and the final complete 22-test browser pass. No resume-navigation code or test was changed.
