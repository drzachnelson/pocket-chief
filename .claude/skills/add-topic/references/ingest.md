# Getting a packet into reviewable markdown

Read only the section for the format you were handed. Whatever the format, the output is one markdown file you read end to end before authoring anything.

## Word documents

```bash
python3 .claude/skills/add-topic/scripts/docx-to-md.py <packet.docx> > packet.md
```

`python-docx` is installed; the `markitdown` CLI on PATH is missing its docx extra and will fail. Naive text extraction (unzipping and stripping tags) loses two things silently, which is why the script exists:

- **Tables flatten** to one cell per line with no row boundary, so a five-column comparison table reads as a bullet list and gets authored as one.
- **Footnote markers like `[12]` sit inside hyperlink runs**, so they disappear along with the mapping from a statement to the reference backing it. Those markers are what let you attribute a block to a specific guideline in step 4.

Two artifacts survive extraction and are yours to clean:

- **Literal `<strong>` tags** inside table cells, where the author pasted HTML into Word. Convert to `**bold**` rather than deleting — the emphasis is deliberate.
- **Swallowed `<` signs**, from the same paste. Word ate `<` as a tag opener, so a threshold silently loses its comparator: `<50% of the circumference` becomes `50% of the circumference`, which inverts the rule, and `pH <7.2, base deficit >14` collapses to `pH −14`. Both occurred in the first document ingested. **Read every numeric threshold as suspect** — a bare number where a comparator belongs is corruption, not a claim. Reconstruct it from the literature, and record the substitution in the source's `details`.
- **`[N]` markers throughout the body.** Use them to attribute blocks to sources, then strip them from block text.

## PDFs

Read the file directly with the Read tool and its `pages` parameter — 20 pages a request, and required past 10 pages. For a scanned PDF, the text is OCR: reconstruct garbled sentences from sense, never quote a mangled line, and treat transposed digits as suspect until a second source agrees.

## Pasted text

Web pages, AI-search answers, and chat exports arrive with syntax the app cannot render. Before review, strip inline citation chips and superscripts, convert `<strong>`/`<em>` to `**`/`*`, and remove markdown links to other sites — the app has no such routes and they render as dead text. Keep the numbered reference list if one came along; it is the source registry for step 4.

A pasted answer is the format most likely to arrive truncated, because a scroll-copy stops wherever the scroll did. Apply the whole-packet check hard here.

## SCORE and Fiser corpora on disk

Three reference sets live in `Pocket Chief Resources/`. Read the relevant ones before asking for a packet — often the material is already here.

| Resource | What it is | Use it for |
|---|---|---|
| `score-module-outline.md` | The SCORE curriculum outline, by module | Taxonomy placement. Find the topic here and derive the section from its module and its Diseases/Conditions vs Operations/Procedures split. |
| `score-modules/` | 433 SCORE module texts as markdown, front matter carrying title, `surgicalcore.org` URL, and retrieval date. Filenames are `SCORE_<Topic_Name>_<hash>.md` | The primary source for most topics. |
| `absite-8e/` | Fiser *ABSITE Review*, 8th edition, one file per chapter with page markers | The board-answer cross-reference: keyed numbers, organisms, eponyms, classic pearls. |

The corpora are gitignored, so a worktree checkout holds only `score-module-outline.md`. Reach the rest at `/Users/dada/Documents/Cowork OS/Pocket Chief/Pocket Chief Resources/`.

The ABSITE files are OCR of scanned pages: sentences are sometimes garbled and numbers occasionally transpose. Where Fiser contradicts a SCORE module or a current guideline, prefer the guideline and write the split.

## NotebookLM packets

A block starting with `# PACKET:` follows the contract in `Pocket Chief Resources/notebooklm/packet-contract.md`. Read that file before ingesting your first one. Prompt A already settled the splits, merges, and taxonomy placement, so skip the negotiation in step 2 and go straight to the clinical review.

- `## BLOCK <type> [S1] — <heading>` maps to one `sourced(block, SOURCE)` call, in file order. Resolve `[S1]` through `## SOURCES`.
- `## FLAGS` is where your review starts, not where it ends. `Beyond sources:` needs Zach's sign-off and a note in the source's `details`; `Out of date:` and `Inconsistent:` need your own judgment.
- `SECTION: SCORE › A › B` converts to `scoreCategory: "SCORE · A · B"`. Verify it against the taxonomy ancestry rather than trusting the packet.
- Ends in `CONTINUED` means it is not whole. Ask for the rest.

The contract's hard constraints are the ones `content-contract.test.ts` enforces, but the packet is a model's draft — verify rather than assume, particularly that each flow has exactly one node with no incoming edge.
