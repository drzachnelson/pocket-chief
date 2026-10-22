# Upper GI study-guide review batch

Six app-ready drafts, prepared October 22, 2026. **Pending Zach's clinical review.**

The TypeScript drafts in `src/content/drafts/upper-gi/` preserve the clinical text, decision tables, operative sequences, source-specific corrections and review limits of the source-linked Markdown guides here. They use `buildDraftTopic`, with no approved version, owner review fields or registration in the published library/search/static payload. The PR is the review and integration handoff; it does not itself confer clinical approval.

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

## Before publication

Review the per-guide flags, including H. pylori regimen/cure details, gastrin units and acid context, patch terminology, complex repair/rescue, adherent-clot management, ICU prophylaxis, airway/antithrombotics and sedation. Resolve unsupported protocol details rather than approving them by association. After explicit clinical approval, promote the reviewed versions through the repository's content workflow and register those topics in the published library. Run the current content, search, static-export and browser checks at that point.

## Integration validation

Validated October 22, 2026:

- 183 unit/component/content tests passed; one existing test skipped. All 162 draft blocks and 347 claims are included in contract checks; component checks count every table row, operative step and all 24 flow nodes.
- TypeScript and zero-warning ESLint passed.
- Production static build passed, generating 119 pages. The exported library retained 93 approved topics, with zero draft topic records or draft routes.
- Browser regression suite: 22 passed, four device-specific skips across mobile/desktop, including search, reading, navigation, saving and offline use. These exercise the published app; the six unapproved drafts intentionally have no published routes.
- Separate Standards and Spec reviews found no actionable issues. These are code/conversion reviews, not clinical approval.

Commands: `node node_modules/vitest/vitest.mjs run`, `node node_modules/typescript/bin/tsc --noEmit`, `node node_modules/eslint/bin/eslint.js . --max-warnings=0`, `node node_modules/next/dist/bin/next build --webpack`, and `node node_modules/@playwright/test/cli.js test`.

The baseline passed before integration (172 tests plus one skip). Initial added rendering checks used an obsolete flow selector; that test was corrected to the current `data-node-id` markup. The first browser attempt lacked the matching Chromium runtime; after installing it, the complete suite passed. No dependency manifest or lockfile was changed.
