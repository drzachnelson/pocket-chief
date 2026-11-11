# Security

Pocket Chief is a static site. It has no server, no database, no accounts, and no secrets — there is nothing to authenticate against and no credential to leak.

**What that means in practice**

- Almost everything the app knows ships in the build: the 49 authored topics, the 3 operative playbooks and the SCORE taxonomy. Anyone who can load the site can read all of it.
- Bookmarks and reading history are stored in the visitor's own browser (IndexedDB), as is the theme choice (`localStorage`). None of it leaves the device or is readable by anyone else.
- Nothing private is ever built into the site. An earlier version let the owner keep device-only attending notes in the browser database `pocket-chief-attendings`; that feature was removed on 2026-11-11. The app never opens, reads, migrates or deletes that database, so any notes still on a device stay there until site data is cleared.
- The app makes no outbound requests at all beyond fetching its own static assets from the origin it was served from. There is no analytics, no telemetry, no third-party script, and no API to call.

**What it does not mean**

- GitHub Pages serves publicly on Free and Pro accounts, regardless of repository visibility. `robots.txt` and `<meta name="robots" content="noindex">` ask crawlers not to index the site; neither restricts access. Treat everything in `src/content/` as published.
- Response headers cannot be set on Pages. The `X-Robots-Tag`, `Referrer-Policy` and `Cross-Origin-Opener-Policy` headers the hosted app used to send are gone.

**Content rules that still apply**

Never commit patient information, and never commit copied paid question stems or explanations. The licensed reference corpora under `Pocket Chief Resources/` are gitignored and must stay that way.

A mechanical guard backs this up rather than relying on discipline alone. `src/lib/__tests__/content-privacy.test.ts` asserts that no shipped source file names the old attending database, that the published library payloads carry no attending fields, and that no stored attending record or database name appears in `out/` after a build.
