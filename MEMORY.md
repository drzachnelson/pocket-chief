# Pocket Chief Memory

## Contacts

- Zachery Nelson, MD — product owner and sole intended user; `zachpnw@gmail.com`; GitHub `drzachnelson`.

## Key Decisions

- Pocket Chief is a private, single-user PWA, not a public reference site.
- Authentication uses passwordless email OTP and an allowlisted owner email.
- The primary experience is search and browse; chat and built-in spaced repetition are out of v1.
- Topics follow an editable SCORE hierarchy and can carry personal tags.
- AI composes flexible pages from controlled content blocks. Human approval is required before indexing.
- The visual system is Clinical Atlas: cool neutrals, one cobalt accent, compact dividers, Geist typography, and restrained motion.
- Anki exports use a reviewed cloze card with the relevant section, nearest diagram, and a Pocket Chief deep link.
- Pocket Chief never accepts PHI or patient-specific information.
- V1 is implemented and locally verified. External launch remains pending Supabase/OpenAI credentials, GitHub authentication, and Vercel provisioning; four additional source packets are still needed for the five-topic launch library.
- 2026-08-13 multi-agent review (Fable-orchestrated): fixed an AnkiDialog race that silently discarded reviewed cloze edits (root cause of the flaky e2e test), enforced references-block source-ID grounding in both TS and SQL, restored case-insensitive PHI name detection with stopword guards plus a patient-narrative heuristic, and applied WCAG/craft design polish within Clinical Atlas (focus ring, light-mode faint-text contrast, 44px touch targets, mobile overflow, generic 404). Verified: vitest 72/72, playwright 12/12. Committed as 7871e90 + 9b95193 on feat/pocket-chief-v1.
- Migration rule going forward: never edit an applied migration file; 202608120001 is immutable, all schema changes land as new files (202608130001 is the catch-up for the earlier in-place edit).
- Known accepted risks (documented, not fixed): factualUnits (TS) and topic_block_expected_claims (SQL) are dual-maintained and must change together; in-memory rate limiter is single-instance only; owner_allowlist is not schema-limited to one row.
- 2026-08-13 launch packet 2 of 5: "Fibroadenoma vs Phyllodes Tumor" seeded under a new SCORE › Breast › Benign Breast Disease taxonomy branch. Kept as one comparison topic rather than two, because the packet's value is the side-by-side matrix and the "rapidly growing fibroadenoma = suspect phyllodes" link. Demo seed only — the Supabase path still seeds a single sha256-pinned launch topic and needs a new migration before this topic reaches a hosted install.
- Adding the second topic exposed three single-topic assumptions, now fixed: the topic breadcrumb and the /topics section heading were hardcoded to "Biliary Tract", the curriculum tree derived depth from array index, and search gave a full prefix score when a one-letter word in body text matched the start of a query token (so "acute wound" returned an unrelated topic). Prefix credit now requires a word of 3+ characters.
- 2026-08-13 General Abdomen batch (6 topics): Abdominal Pain, Rectus Sheath Hematoma, Desmoids & Fibromatoses, Peritoneal Neoplasms, Abdominal Exploration, PD Catheter Insertion — under a new SCORE › General Abdomen branch split into Diseases & Conditions and Operations & Procedures. Library is now 8 topics across 4 sections.
- Editorial precedent set with that batch: where board orthodoxy and current practice diverge, the topic carries both — the keyed answer plus a short "Board answer versus current practice" prose block. Desmoids is the worked example (WLE + sulindac/tamoxifen for the exam; surveillance-first and nirogacestat in practice).
- Content moved out of `src/lib/seed.ts` into `src/content/` — one file per topic, plus `sourced()` in `src/content/authoring.ts`, which derives every claim from `factualUnits()` so claim text can no longer drift from rendered text. `src/lib/seed.ts` is now a re-export so existing imports and the Supabase path are untouched. Choledocholithiasis was moved verbatim and must stay that way: its blocks are sha256-pinned by `ensure_launch_topic`, and `content-contract.test.ts` now asserts the digest against the migration.
- The flow block renderer was generalized from a hardcoded root-plus-two-branches to a level walk, so decision trees of any width and depth render. Existing flows re-verified.
- Repeatable workflow for the rest of the curriculum: `/score-topic` skill at `.claude/skills/score-topic/`, backed by `content-contract.test.ts` (claim parity, React key uniqueness, flow graph validity, citation resolution, taxonomy/category agreement, launch-topic digest) and a PostToolUse hook that runs it on any edit under `Pocket Chief/src/content/`.
- Each batch of topics has exposed latent single-library assumptions rather than content bugs: two search-scoring flaws (a one-letter body word could carry a query token; edit-distance tolerance of 2 was loose enough that "wound" matched "count") and hardcoded single-topic UI strings. Search now uses Damerau-Levenshtein with tolerance 1 for tokens under 11 characters. Expect the next batch to surface more of the same — fix the app, not the test.
- Environment: the vault lives in iCloud-synced Documents — iCloud can evict node_modules/.next file contents (commands hang at 0% CPU) and create "name 2.ext" conflict copies inside .next that break tsc. Remedy: reinstall node_modules fresh / delete conflict copies. pnpm is not on PATH; use ./node_modules/.bin/* or `CI=true npx pnpm@11`.
