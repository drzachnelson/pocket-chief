# Pocket Chief V1 Implementation Plan

## Global Constraints

- Build a private single-user Next.js 16.3.0 PWA with owner-only passwordless Supabase authentication.
- Match the selected Clinical Atlas visual target: cool neutrals, cobalt accent, compact dividers, Geist typography, moderate radii, system light/dark mode, and restrained motion.
- Keep all OpenAI and service credentials server-only. Never log raw notes or accept patient information.
- Every factual AI-generated block must cite a supplied source or carry `needs_support`; unresolved support blocks approval.
- Apply test-driven development to behavior and run fresh test, lint, typecheck, and production-build verification before completion.

## Task 1: Foundation and Application Shell

- Create the project configuration for Next.js 16.3.0, TypeScript, Tailwind v4, Vitest, Testing Library, and Playwright.
- Implement the responsive Clinical Atlas shell with desktop rail, mobile navigation, system theme support, manifest metadata, install icons, loading, empty, and error states.
- Add the one-topic choledocholithiasis seed fixture and navigation routes for Search, Topics, Saved, Add, Settings, and topic detail.
- Write tests first for shell navigation and responsive route behavior.

## Task 2: Domain Model, Search, and Editorial Workflow

- Define validated interfaces for taxonomy, sources, claims, topic blocks, topic versions, drafts, bookmarks, recent views, and cloze drafts.
- Implement deterministic demo repositories plus Supabase-ready repository interfaces.
- Add ranked title/alias/heading/body/category/tag search with typo tolerance and approved-version-only visibility.
- Implement draft creation, targeted block revision, support validation, approval, immutable version history, restore, save, and recent-view behavior.
- Write failing unit and route tests before each behavior.

## Task 3: Supabase Security and API Routes

- Add Supabase SSR clients, owner allowlist enforcement, auth callback, sign-in/sign-out, and middleware protection with a safe demo mode when environment variables are absent.
- Add SQL migrations for tables, indexes, full-text/trigram search, private storage policies, RLS, immutable approved versions, and signup restrictions.
- Implement the authenticated routes from the approved plan with validation, rate limiting, sanitized errors, and no raw-note logging.
- Add route and policy contract tests before implementation.

## Task 4: OpenAI Drafting and Anki Export

- Implement configurable OpenAI Responses API adapters using schema-constrained topic and cloze outputs, with deterministic local fallbacks for development and tests.
- Detect likely PHI before model calls and preserve source provenance through all content blocks.
- Implement selection-to-cloze review, relevant-section context rendering, AnkiMobile URL creation, AnkiConnect export, duplicate hashing, settings, and UTF-8 TSV fallback.
- Write failing tests for schema validation, unsupported-claim blocking, PHI detection, Anki URL encoding, AnkiConnect failure, and TSV output.

## Task 5: Offline PWA, Backup, and Seed Experience

- Add service-worker caching for the app shell and safe GET responses, plus IndexedDB storage for the taxonomy, compact approved-topic index, saved topics, and recent topics.
- Clear private caches on sign-out and invalidate stale topic versions.
- Implement a ZIP backup containing JSON, Markdown, sources, tags, Anki drafts, media manifest, and export manifest.
- Complete the choledocholithiasis topic page with comparison, criteria flow, procedural sequence, high-yield points, and supplied-note citation metadata.
- Write failing tests for cache selection, version invalidation, Markdown rendering, and backup manifest contents.

## Task 6: Visual QA, Verification, Repository, and Deployment

- Run full tests, lint, typecheck, build, browser smoke tests, and visual comparison against the selected Clinical Atlas mockup.
- Create and pass `design-qa.md`, fixing P0-P2 visual issues.
- Commit atomically on the feature branch, create the private `drzachnelson/pocket-chief` GitHub repository, push the branch, merge to main, and deploy to Vercel when authenticated account access is available.
- Document environment setup, Supabase migration steps, OpenAI configuration, deployment, backup, Anki setup, and the four remaining launch-topic inputs.

