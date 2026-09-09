# Pocket Chief

A private, installable, search-first general surgery reference. Forty-six SCORE-aligned topics, authored as source-linked content files, built into a static site that works offline on a phone.

## What it is

- A Next.js app exported to static HTML. No server, no database, no accounts, no API keys.
- The library is `src/content/` — one TypeScript file per topic, each block citing a supplied source.
- Bookmarks, reading history, and the offline copy of the atlas live in the browser's IndexedDB. They belong to the device, not to an account.
- Typo-tolerant search over titles, aliases, headings, body text, SCORE categories, and tags, running entirely in the browser.

For flashcards, hand a topic's URL to an assistant and ask it to write the cards. The app deliberately has no export of its own.

## Running it locally

Requirements: Node 20.9 or newer, and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000/pocket-chief/`. The app is mounted under `/pocket-chief` in development as well as production, because that is where GitHub Pages serves it.

To preview the real static artifact instead of the dev server:

```bash
pnpm serve
```

## Adding a topic

Authoring is a commit, not an in-app flow. Invoke the `/score-topic` skill rather than reconstructing the steps by hand. Every block goes through `sourced()` in `src/content/authoring.ts`, which derives one cited claim per rendered factual unit — hand-written claim arrays drift from rendered text and the content contract test will reject them.

## Deployment

`.github/workflows/deploy.yml` runs typecheck, lint, unit tests, and the static build on every push to `main`, then publishes `out/` to GitHub Pages. Set **Settings → Pages → Source** to **GitHub Actions** once.

A Pages site is publicly reachable by URL on Free and Pro accounts, whatever the repository's visibility. `robots.txt` and the `noindex` metadata ask crawlers to stay away; they are not access control.

## Verification

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
```

The build uses webpack because Turbopack's local CSS worker requires a restricted ephemeral port in this environment. Stop the dev server before running the e2e suite — Playwright starts its own.

## Content and licensing

The topics are original prose written from licensed reference material. The source corpora are not in this repository and are not redistributable. See `NOTICE.md`.
