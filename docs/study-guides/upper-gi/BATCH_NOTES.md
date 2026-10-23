# Upper GI promotion — batch notes

[PR #40](https://github.com/drzachnelson/pocket-chief/pull/40): promotion of the six PR #38 drafts into regular library topics on 2026-10-22. The branch is `claude/promote-upper-gi-drafts`, cut from main `cbd2126`. **Not merged or deployed.** Clinical sign-off items are in [review.md](review.md).

## Conversion

- Before converting anything, each draft's `warnings` array was extracted programmatically and copied verbatim into `review.md` and the PR body: 7 + 6 + 7 + 6 + 6 + 6 = 38 items.
- `git mv src/content/drafts/upper-gi/<slug>.ts src/content/topics/<slug>.ts` for all six, so Git history follows the files.
- In each file: `buildDraftTopic` → `buildTopic`, export `<name>Draft` → `<name>Topic`, removed the `clinical-review-pending` tag, and replaced `createdAt` + `warnings` with `reviewedAt: "2026-10-22T00:00:00.000Z"`. The file-header comment now points to `review.md`. Blocks, aliases, topic IDs 4720–4725, version IDs 4730–4735, `scoreNodeId`, `scoreCategory`, `sourceId` and `additionalSourceIds` are unchanged. `src/content/sources.ts` is untouched.
- Registered the six topics in `libraryTopics` (`src/content/index.ts`), the same way as every other topic. `library.json`, search and the static routes all derive from that list.
- Deleted the review-only registry (`src/content/drafts/upper-gi/index.ts`; `src/content/drafts/` is now gone), its re-export, and `buildDraftTopic`/`DraftTopicInput` in `authoring.ts`. These had no other callers; per the amended AGENTS.md rule, the draft pattern is retired.
- Tests: restored `content-contract.test.ts` to its pre-#38 form, since only published topics remain. `upper-gi-drafts.test.ts` became `upper-gi-topics.test.ts`. It asserts that the six topics are published and approved-status, have no pending tag, keep the 4720–4735 IDs and SCORE placement, and rank first for their title and every alias. The rendering test now reads the published versions.

## Verification (2026-10-22, in this worktree)

| Check | Result |
|---|---|
| `tsc --noEmit` | Pass |
| `eslint . --max-warnings=0` | Pass |
| `vitest run` | 32 files, 184 passed, 1 skipped. The first full run had one timeout: `playbooks.test.ts` › "cross-links only into topics a reviewer has signed off on" took 6.2 s against a 5 s limit under parallel load. It passed in isolation, and a second full run passed cleanly. No playbook auto-link expectations changed. |
| `next build --webpack` | Pass; 136 exported HTML pages, `library.json` has 110 topics (104 on main + 6), all six with `approved` status and no pending tag |
| Playwright (`tests/e2e`) | 22 passed, 4 device-specific skips |
| Browser, static export (`scripts/serve-out.mjs`) | All six `/pocket-chief/topics/<slug>/` pages render. All 156 non-reference blocks show **Supported**, with 0 Unsupported (PUD 26, perforation 28, vagotomy 23, UGIB 28, stress gastritis 20, EGD 31). |
| Search, real UI (`/?q=`) | 29/29 title and alias queries return the correct topic as the first result (e.g. "EGD", "UGIB", "PUD", "Graham patch", "Curling ulcer") |
| 375 px viewport | No horizontal page scroll on any of the six pages (`scrollWidth` 375). The stress-gastritis flow canvas is 536 px wide and scrolls inside its standard `decision-flow` (`overflow-x: auto`) container, like other flows. |

Not checked: offline/service-worker behavior specific to these pages, since the change touches content only and the generic offline e2e passed. Not checked visually: desktop layout beyond the Playwright desktop project.

## Limits

These are structural and rendering checks. They do not approve the clinical content: the 38 sign-off items stay open until Zach reviews them. `buildTopic` sets `status: "approved"` and `reviewedBy: "owner"` for every library topic. That is how the library represents a published entry, and it is not a sign-off record. Holding the PR unmerged is what expresses that approval is pending.
