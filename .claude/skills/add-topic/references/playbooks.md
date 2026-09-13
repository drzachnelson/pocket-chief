# Writing a playbook

Read this before your first one. Everything in `SKILL.md` steps 1, 3, 4, 5 and 8 applies unchanged — a playbook is `TopicBlock[]` like a topic, authored through `sourced()`, cited the same way, rendered by the same component. What follows is only what differs.

A playbook answers "how is this done, for the case I am scrubbing tomorrow." A topic answers "how is this tested." When both are true, write the playbook and point at the topic with `relatedTopicSlugs` rather than duplicating it.

## The shape

```ts
import { buildPlaybook, references, sourced } from "@/content/authoring";
import { TEMPORAL_ARTERY_BIOPSY_PLAYBOOK_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({ id: "block-tab-summary", type: "summary", heading: "At a glance", text: "…" }, SOURCE),
  // …
  references("block-tab-references", [SOURCE]),
];

export const temporalArteryBiopsyPlaybook = buildPlaybook({
  id: "…", slug: "temporal-artery-biopsy", title: "…", aliases: [],
  procedureId: "temporal_artery_biopsy",
  approach: "open",
  specialty: "Vascular",
  tags: [], sourceId: SOURCE, relatedTopicSlugs: [], blocks, reviewedAt: "…",
});
```

`buildPlaybook()` is flatter than `buildTopic()`: playbooks ship approved-only, so there is no `TopicVersion` wrapper, no draft state and no History tab. Git is the version history.

Read `src/content/playbooks/temporal-artery-biopsy.ts` end to end before writing — it is the shortest of the three and shows the block rhythm an operative guide wants (summary, a `warning` for the thing that causes harm, indications, yield, then steps).

## The three placement fields

| Field | Rule |
|---|---|
| `procedureId` | Stable `lowercase_underscore`, unique per playbook. **Attending preference notes join on this, deliberately not on the slug** (`src/lib/attending.ts:50`). The slug is therefore safe to rename later; this is not. Changing it orphans hand-written notes that live in a second IndexedDB database on Zach's device and exist nowhere in the build. |
| `approach` | One of `"open" \| "laparoscopic" \| "robotic" \| "endovascular"`. Same procedure by a different approach is a separate playbook, not a section inside one. |
| `specialty` | The service line, e.g. `"Vascular"`. Match an existing string exactly rather than coining a synonym. |

No `scoreNodeId`. No `scoreCategory`. See below.

## Two rules no test can infer from your diff

**1. A playbook never enters the SCORE taxonomy.** Do not add a node to `src/content/taxonomy.ts`, and do not register it in `src/content/index.ts`. `src/content/playbooks/index.ts` is the only registry it belongs in — the import, the re-export, and `libraryPlaybooks`.

The tripwire is two assertions: `library.test.ts` requires exactly one parentless taxonomy root, and `taxonomy.test.ts` pins the complete ordered section list. `playbooks.test.ts` states the intent behind them directly — `listTaxonomy()` must be unchanged, and no playbook may carry a `scoreNodeId`. If one of those fails while you are writing a playbook, the content is wrong and the test is right.

**2. `PlaybookContent` must never call `recordRecentView` or `setTopicSaved`.** Every reader of the saved and recent stores renders rows through `TopicCard`, which reads `scoreCategory` and links to `/topics/<slug>`. A playbook in those stores is a broken card pointing at a 404. This one is a component rule rather than a content rule, but it is the reason rule 1 exists, so it belongs here.

## Auto-links are pinned, and that is the point

Playbooks render against the **topic** link index, and topic aliases are domain-specific. A vasculitis sentence in the temporal artery guide reached the Crohn topic through "skip lesions" — a perfectly good Crohn alias that means something else entirely in giant cell arteritis.

So `playbooks.test.ts` asserts the exact set of links each playbook generates, and **a new playbook fails it until someone reviews the links**:

```
expect([...linked].sort(), playbook.slug).toEqual(expected[playbook.slug] ?? []);
```

Run the suite, read the diff the failure prints, and decide link by link. An auto-link is a clinical claim that two things are related — it is not a formatting detail.

- **Genuinely related** → add the line to the `expected` map, in sorted order.
- **Wrong** → reword the block so the phrase does not appear. Do not add it to the map and do not narrow the topic's alias, because the alias is correct in its own domain.

Three false positives have been caught this way and all three were reworded: "skip lesions" → Crohn disease, "a fast one" → the FAST exam, and "peroneal nerve" → escharotomy.

The same file also asserts a playbook does not match on **anatomy from a different operation** — the cheapest detector of copy-paste between guides. "Control the common carotid up to the inguinal ligament" survived human review in the femoropopliteal draft and only surfaced because searching "carotid" returned the leg bypass.

## Sources

Playbook sources live in the `03000` block of `src/content/sources.ts` and are allocated singly, not in hundreds:

```bash
grep -n "PLAYBOOK_SOURCE" src/content/sources.ts
```

Operative guides mix societies more often than topics do — an ACC/AHA class recommendation beside a Cochrane review inside one table. Prefer splitting the block so each has one source. Where the mixing is genuinely row by row, use `sourcedUnits()` and give each factual unit its own citation list. Blanket multi-source citation passes `supportWarnings`, which only checks non-empty and allow-listed, while quietly telling the reader both works support both statements.

## Verifying

Everything in `verify.md` applies. One step is additional, and the browser cannot substitute for it.

The deploy workflow gates on three things: `out/playbooks.json` exists and is non-empty, and **every** playbook has prerendered to `out/playbooks/<slug>/index.html`. The dev server serves routes the static export never generated, so a green preview proves nothing about the deploy.

```bash
node node_modules/next/dist/bin/next build
```

The two gates are then assertions about files, and need no server at all:

```bash
grep -o '<new-slug>' out/playbooks.json && ls out/playbooks/<new-slug>/index.html
```

To read the real artifact in a browser, serve it the way Pages does. **`serve-out.mjs` listens on port 3000** — the same port Playwright starts its own server on, so the two cannot run together:

```bash
node scripts/serve-out.mjs   # http://127.0.0.1:3000/pocket-chief/
```
