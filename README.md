# Pocket Chief

Pocket Chief is a private, installable, search-first general surgery reference. Owner-supplied notes become structured drafts with claim-level source support, then become searchable only after direct approval.

## Included in V1

- Responsive Clinical Atlas UI with desktop sidebar, mobile tabs, compact topic layout, system light/dark support, loading/empty/error states, and `noindex` metadata.
- One real launch topic: choledocholithiasis, built only from the supplied note packet. The other four launch slots intentionally remain empty.
- Editable taxonomy and typed content blocks for summary, prose, bullets, comparison table, flow, sequence, warning, image, and references.
- Draft, targeted revision, support validation, direct approval, immutable approved versions, restore, bookmarks, and recent-view contracts.
- Typo-tolerant approved-only search across title, aliases, headings, body, SCORE category, and tags.
- Owner-only Supabase passwordless auth, private Storage, RLS, signup allowlist, signed media, immutable version, and approval policy migration.
- OpenAI Responses API adapter with schema-constrained topic and cloze outputs, configurable `gpt-5.6-terra`, PHI rejection, route rate limits, and deterministic local fallbacks.
- AnkiMobile URL export, AnkiConnect detection, automatic UTF-8 TSV fallback, editable cloze review, duplicate hashes, and context-section/decision-flow image.
- Installable PWA shell, IndexedDB-approved content cache, saved topics, recents, stale-version invalidation, sign-out cache clearing, and portable ZIP backup.

## Local preview

Requirements: Node 20.9 or newer and pnpm 11.

```bash
cp .env.example .env.local
pnpm install
pnpm dev -- --webpack
```

The example environment enables a local demo without transmitting notes. Open `http://localhost:3000`.

## Production configuration

### Supabase

1. Create a Supabase project and run `supabase/migrations/202608120001_pocket_chief.sql`.
2. Insert the exact lowercase owner email into `public.owner_allowlist` before inviting the user.
3. In Authentication → Providers → Email, disable public signup and keep passwordless email enabled.
4. Invite only the owner email.
5. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and the server-only `POCKET_CHIEF_OWNER_EMAIL`.
6. Remove `NEXT_PUBLIC_POCKET_CHIEF_DEMO` or set it to `false` in production.

The `topic-media` bucket is private. Media must be stored below the owner UUID path; the app returns a 60-second signed URL through `/api/media/:id`.

### OpenAI

Set `OPENAI_API_KEY` only in the server environment. `POCKET_CHIEF_TOPIC_MODEL` defaults to `gpt-5.6-terra`. Topic generation uses medium reasoning; cloze generation uses low reasoning. Raw notes are not written to application logs.

### Vercel

Import the private GitHub repository, add the production environment variables above, deploy `main`, then verify the exact owner login before using private content. Do not deploy with demo mode enabled.

## Anki setup

- iPhone/iPad: review the cloze, then use **Open in AnkiMobile**.
- Desktop: keep Anki open with AnkiConnect listening on its standard local port, then use **Send to desktop Anki**.
- If AnkiConnect is unavailable, Pocket Chief automatically downloads a UTF-8 tab-separated import file.
- Deck, Cloze note type, field mapping, and tag prefix are configurable in Settings.

## Backups

Settings → **Download backup** produces a ZIP with:

- `manifest.json`
- approved topic Markdown and JSON
- supplied source metadata
- personal tags within topic JSON
- Anki drafts
- media manifest (and media binaries when configured)

## Verification

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

The production build uses webpack because Turbopack's local CSS worker requires a restricted ephemeral port in this environment.

## Remaining launch inputs

Four owner-supplied note packets are still required. For each packet, include:

- topic title and preferred aliases
- raw original/paraphrased notes
- source title, edition/chapter/page or URL where available
- SCORE category
- any diagrams or images with provenance
- personal tags

Never include patient information or copied paid question stems/explanations.
