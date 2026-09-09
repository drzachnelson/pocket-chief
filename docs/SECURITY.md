# Security

Pocket Chief is a static site. It has no server, no database, no accounts, and no secrets — there is nothing to authenticate against and no credential to leak.

**What that means in practice**

- Everything the app knows ships in the build: the 46 authored topics and the SCORE taxonomy. Anyone who can load the site can read all of it.
- Bookmarks and reading history are stored in the visitor's own browser (IndexedDB), as is the Topics sidebar state (`localStorage`). None of it leaves the device or is readable by anyone else.
- The app makes no outbound requests at all beyond fetching its own static assets from the origin it was served from. There is no analytics, no telemetry, no third-party script, and no API to call.

**What it does not mean**

- GitHub Pages serves publicly on Free and Pro accounts, regardless of repository visibility. `robots.txt` and `<meta name="robots" content="noindex">` ask crawlers not to index the site; neither restricts access. Treat everything in `src/content/` as published.
- Response headers cannot be set on Pages. The `X-Robots-Tag`, `Referrer-Policy` and `Cross-Origin-Opener-Policy` headers the hosted app used to send are gone.

**Content rules that still apply**

Never commit patient information, and never commit copied paid question stems or explanations. The licensed reference corpora under `Pocket Chief Resources/` are gitignored and must stay that way.
