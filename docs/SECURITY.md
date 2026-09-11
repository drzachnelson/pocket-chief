# Security

Pocket Chief is a static site. It has no server, no database, no accounts, and no secrets — there is nothing to authenticate against and no credential to leak.

**What that means in practice**

- Almost everything the app knows ships in the build: the 49 authored topics, the 3 operative playbooks and the SCORE taxonomy. Anyone who can load the site can read all of it.
- Bookmarks and reading history are stored in the visitor's own browser (IndexedDB), as is the Topics sidebar state (`localStorage`). None of it leaves the device or is readable by anyone else.
- **Attending preferences are the one thing that never enters the build.** They name real surgeons, so they live only in the browser, in their own database (`pocket-chief-attendings`) separate from everything else. They are never fetched, never published and never synced — the JSON export in Settings is the only backup that exists.
- The app makes no outbound requests at all beyond fetching its own static assets from the origin it was served from. There is no analytics, no telemetry, no third-party script, and no API to call.

**What it does not mean**

- GitHub Pages serves publicly on Free and Pro accounts, regardless of repository visibility. `robots.txt` and `<meta name="robots" content="noindex">` ask crawlers not to index the site; neither restricts access. Treat everything in `src/content/` as published.
- Response headers cannot be set on Pages. The `X-Robots-Tag`, `Referrer-Policy` and `Cross-Origin-Opener-Policy` headers the hosted app used to send are gone.

**Why attending preferences use a second database**

The bundle deployed before this feature calls `deleteDB("pocket-chief-private")` unconditionally when a reader clears offline data. A tab opened before a later deploy keeps running that code, so anything in that database can be destroyed by a version of the app that can no longer be changed. Everything else in there is rebuildable from the shipped bundle; hand-written preferences are not.

**Content rules that still apply**

Never commit patient information, and never commit copied paid question stems or explanations. The licensed reference corpora under `Pocket Chief Resources/` are gitignored and must stay that way.

Two mechanical guards back this up rather than relying on discipline alone. `src/lib/__tests__/content-privacy.test.ts` asserts that nothing under `src/content/` imports the attending types and that no stored attending record appears in `out/` after a build. Notes are screened by `detectLikelyPHI()` (`src/lib/safety.ts`) before they are written or imported, and a refused note keeps its text and shows the reason rather than being silently altered.
