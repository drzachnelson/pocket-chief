# Verifying new content

The static gate is in `SKILL.md` step 7. This is everything after it.

## In a worktree, build the two things git does not carry

A fresh worktree has no `node_modules` and no `.env.local`, both gitignored. Without them `tsc` cannot resolve anything and the server answers every API call with `CONFIGURATION_REQUIRED`.

```bash
cp -Rc "/Users/dada/Documents/Cowork OS/Pocket Chief/node_modules" node_modules
printf 'POCKET_CHIEF_DEMO=true\nPOCKET_CHIEF_OWNER_EMAIL=zachpnw@gmail.com\n' > .env.local
```

`cp -Rc` is an APFS clone — copy-on-write, so 600 MB lands in about eight seconds. **Do not symlink `node_modules` instead.** It satisfies `tsc`, `eslint`, and `vitest`, then Turbopack panics with `Symlink [project]/node_modules is invalid, it points out of the filesystem root` and the dev server dies at startup.

## Start the preview

`preview_start` with `{name: "pocket-chief"}`. It resolves `.claude/launch.json` against the **primary working directory**, not the vault root — a session rooted at `Pocket Chief` reads `Pocket Chief/.claude/launch.json` with its project-relative `runtimeArgs`, and never sees the vault-root file, whose paths are vault-relative. Both exist and neither is redundant. If the preview reports no launch.json, work out which one the session can actually see before adding a third.

## Beat the ghost

Next 16 refuses a second `next dev` for this directory on any port, so a server another chat left running blocks you entirely — **and keeps serving its cached library**, which looks exactly like your new topic failing to register. Confirm what the server actually holds before you believe anything the browser shows:

```bash
curl -s localhost:3210/api/library | grep -o '<new-slug>'
```

No slug means the ghost, not a bug in your content. Ask Zach to stop the other session's server rather than killing the process yourself.

## Count, don't look

Read the DOM rather than the screenshot wherever a number can settle it:

- `document.querySelectorAll('.flow-start, .flow-card').length` against the authored node count catches a node the layout silently dropped.
- Counting `Supported` in the article text catches a claim mismatch faster than reading for it.

When the Browser pane is hidden, layout metrics collapse: `document.body.innerText` returns almost nothing and `scrollTo` does nothing, while `querySelectorAll` and `textContent` keep working. An apparently empty page is that quirk far more often than a real failure — confirm with `curl` before debugging it.

## Audit what auto-linking produced

Plain text auto-links against every other topic's aliases, so a new topic silently inherits every over-broad alias in the library. List what the page actually linked:

```js
[...document.querySelectorAll('article a[href*="/topics/"]')].map(a => a.textContent.trim() + ' -> ' + a.getAttribute('href'))
```

Every destination should be somewhere a reader would want to land. A wrong one means another topic claimed a phrase too generic for it — narrow that alias at its source.

## The pass

For each new or revised topic:

- Every block reads **Supported**.
- Flows draw every branch, and the node count matches.
- Tables render every row, with no dropped cell from a duplicate key.
- `/topics` groups the topic under the right section, and a new section appears in the jump rail.
- Search finds it by title and by each alias — including any cross-reference alias added in step 2.
- Spot-check light theme and a narrow viewport.

For a revised topic, also confirm the old slug still resolves and its bookmark survives.

## E2E last

**Stop the preview server first.** Playwright starts its own dev server on port 3000 with `POCKET_CHIEF_DEMO=true`, and with one already running `config.webServer` fails with exit code 1 and aborts the whole run.

```bash
node node_modules/@playwright/test/cli.js test
```
