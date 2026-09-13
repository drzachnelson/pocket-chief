# Verifying new content

The static gate is in `SKILL.md` step 7. This is everything after it. It applies to both corpora; where a playbook needs more, `playbooks.md` says so.

## In a worktree, build the one thing git does not carry

A fresh worktree has no `node_modules`, which is gitignored. Without it `tsc` cannot resolve anything.

**There is no `.env.local` step any more.** The app builds and runs with no secrets — every read happens in the browser against content compiled into the bundle. If you find an older note about writing `POCKET_CHIEF_DEMO=true` or `POCKET_CHIEF_OWNER_EMAIL`, neither variable exists anywhere in the repo; they belonged to the Supabase era and the static migration deleted the code that read them. `.env.example` holds two build-time knobs and no credentials.

```bash
cp -Rc "/Users/dada/Documents/Cowork OS/Pocket Chief/node_modules" node_modules
```

`cp -Rc` is an APFS clone — copy-on-write, so 600 MB lands in about eight seconds. **Do not symlink `node_modules` instead.** It satisfies `tsc`, `eslint`, and `vitest`, then Turbopack panics with `Symlink [project]/node_modules is invalid, it points out of the filesystem root` and the dev server dies at startup.

**Check the source tree is materialized first.** The vault is in iCloud-synced Documents, and iCloud evicts `node_modules` wholesale. An evicted file keeps its directory entry but carries the `dataless` flag, and reading one blocks forever at 0% CPU with no output and no error — a clone of an evicted tree inherits the problem.

```bash
find "/Users/dada/Documents/Cowork OS/Pocket Chief/node_modules" -type f -flags +dataless | wc -l
```

Zero is healthy. Anything else means recover the source tree before cloning it: `rm -rf node_modules` (unlink does not materialize, so it is fast) then `npx --yes pnpm@11.19.0 install`. The pnpm store lives outside iCloud, so the reinstall needs no network and takes about ten seconds.

## Start the preview

`preview_start` with `{name: "pocket-chief"}`. It resolves `.claude/launch.json` against the **primary working directory**, not the vault root — a session rooted at `Pocket Chief` reads `Pocket Chief/.claude/launch.json` with its project-relative `runtimeArgs`, and never sees the vault-root file, whose paths are vault-relative. Both exist and neither is redundant. If the preview reports no launch.json, work out which one the session can actually see before adding a third.

The app is mounted under `basePath`, in development as well as CI, so the preview opens at **`http://localhost:3210/pocket-chief/`** — not at the server root.

## Beat the ghost

Next 16 refuses a second `next dev` for this directory on any port, so a server another chat left running blocks you entirely — **and keeps serving its cached library**, which looks exactly like your new content failing to register. Confirm what the server actually holds before you believe anything the browser shows:

```bash
curl -s localhost:3210/pocket-chief/library.json  | grep -o '<new-slug>'
curl -s localhost:3210/pocket-chief/playbooks.json | grep -o '<new-slug>'
```

**Keep the `/pocket-chief` prefix.** These are `force-static` route handlers rendered under `basePath`; without the prefix you get a 404 from a perfectly healthy server, which reads as a ghost that is not there. That mistake is the reason this section exists.

No slug with the prefix present means the ghost, not a bug in your content. Ask Zach to stop the other session's server rather than killing the process yourself.

## Count, don't look

Read the DOM rather than the screenshot wherever a number can settle it:

- `document.querySelectorAll('.flow-start, .flow-card').length` against the authored node count catches a node the layout silently dropped.
- Counting `Supported` in the article text catches a claim mismatch faster than reading for it.

When the Browser pane is hidden, layout metrics collapse: `document.body.innerText` returns almost nothing and `scrollTo` does nothing, while `querySelectorAll` and `textContent` keep working. An apparently empty page is that quirk far more often than a real failure — confirm with `curl` before debugging it.

## Audit what auto-linking produced

Plain text auto-links against every other topic's aliases, so new content silently inherits every over-broad alias in the library. List what the page actually linked:

```js
[...document.querySelectorAll('article a[href*="/topics/"]')].map(a => a.textContent.trim() + ' -> ' + a.getAttribute('href'))
```

Every destination should be somewhere a reader would want to land. A wrong one on a **topic** means another topic claimed a phrase too generic for it — narrow that alias at its source. A wrong one on a **playbook** is handled differently and the test catches it first; see `playbooks.md`.

## The pass

For each new or revised topic:

- Every block reads **Supported**.
- Flows draw every branch, and the node count matches.
- Tables render every row, with no dropped cell from a duplicate key.
- `/topics` groups the topic under the right section, and a new section appears in the jump rail.
- Search finds it by title and by each alias — including any cross-reference alias added in step 2.
- Spot-check light theme and a narrow viewport.

For a revised topic, also confirm the old slug still resolves and its bookmark survives.

For a playbook, the same block-level pass, plus: it appears on `/playbooks`, it is **absent** from `/topics` and from the taxonomy jump rail, and saving or viewing it does not put a row in Saved or Recent. Then the artifact check in `playbooks.md`.

## E2E last

**Stop the preview server first.** Playwright starts its own dev server on port 3000, and with one already running `config.webServer` fails with exit code 1 and aborts the whole run. `scripts/serve-out.mjs` also uses port 3000, so stop that too if you ran the playbook artifact check.

```bash
node node_modules/@playwright/test/cli.js test
```
