# Design

## Color

Restrained. Cool slate neutrals, one cobalt accent for actions, links and current selection (a small share of any surface). Green, red and amber appear only in callouts, flow-step glyphs (green and amber) and the Unsupported symbol (amber), and only when they mean something. Light and dark follow the device; both pass the same contrast checks, including the dark-mode primary button, which currently fails at 2.93:1.

## Typography

Geist, one family. Fixed scale, sentence case, no tracked capitals.

| Role | Size, weight | Used for |
| :--- | :--- | :--- |
| `title` | 24px, 600, line 1.2, -.02em | h1 of every page. Fixed, same at every width. |
| `heading` | 18px, 600, line 1.25, -.01em | Block h2 on topic and playbook pages, except callout titles. |
| `subheading` | 15px, 600 | h3, list headings (Home sections, Topics groups, Playbooks specialties), callout titles; counts in `caption`. |
| `body` | 15px, 400, line 1.5 | Paragraphs, bullets, row titles, nav items, sheet rows, failed-read and empty sentences (muted), the "Pocket Chief" name (600). |
| `field` | 16px, 400 | Inputs at every width (iOS zoom). |
| `small` | 13px | Nested bullets, table cells and heads (heads 600), quiet row line, Contents tree rows and part headings (600), tab labels (600), buttons (600), "All saved" link (500), flow box text. |
| `caption` | 12px, muted, 400 | Home date labels, counts, trailing "Playbook", source index numbers, field hints, disclaimer line, Last updated, flow branch conditions, labels under bar and toolbar icons (500). |

- Weights are 400, 500 (nav, tab and bar labels) and 600 only.
- Tracking is -.02em on `title`, -.01em on `heading` and 0 elsewhere.
- No `text-transform` anywhere. Floor of 12px at every width. Every heading sets its weight.
- Touch targets are 44px under 1080px or with a coarse pointer, and 36px at 1080px and up with a fine pointer. A list row is 44px at every width (about 56px with a quiet line). Laptop sidebar rows are the exception: navigation 36px, Contents category rows 32px, section links 28px, all 13px.

## Components

- Callouts: tinted fill, an icon and a full 1px border. No side stripes.
- Lists: hairline rows, not tile cards.
- No backdrop blur or glass.
- The shell shows the C-and-scalpel mark and the name only.
- Support marks: none on supported blocks. A symbol marks "Unsupported".
