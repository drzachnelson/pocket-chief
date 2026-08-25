#!/usr/bin/env python3
"""Convert a .docx packet to markdown, preserving tables and citation markers.

Naive text extraction breaks a packet in two ways that are invisible afterwards:
a Word table flattens to one cell per line with no row boundary, so a comparison
table silently reads as a bullet list; and footnote-style markers like [12] often
sit inside hyperlink runs, so they vanish along with the mapping from a statement
to the reference that backs it. This walks the body in document order and reads
hyperlink runs, so both survive.

    python3 docx-to-md.py <packet.docx> [> packet.md]

Requires python-docx. Bold runs become **bold**; nothing else is normalized, so
the review pass sees the packet as written.
"""
import sys

from docx import Document
from docx.table import Table

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def run_segment(run):
    text = "".join(node.text or "" for node in run.iter() if node.tag == f"{W}t")
    return text, run.find(f"{W}rPr/{W}b") is not None


def para_to_md(p):
    segments = []
    for child in p.iterchildren():
        if child.tag == f"{W}r":
            segments.append(run_segment(child))
        elif child.tag == f"{W}hyperlink":
            segments.extend(run_segment(r) for r in child.iterchildren(f"{W}r"))

    # Word splits a bolded phrase across many runs. Emitting one **...** pair per
    # run yields "**a** **b** **c**"; coalescing first yields "**a b c**".
    merged = []
    for text, bold in segments:
        if not text:
            continue
        if merged and merged[-1][1] == bold:
            merged[-1][0] += text
        else:
            merged.append([text, bold])

    out = []
    for text, bold in merged:
        if bold and text.strip():
            lead = text[: len(text) - len(text.lstrip())]
            trail = text[len(text.rstrip()) :]
            out.append(f"{lead}**{text.strip()}**{trail}")
        else:
            out.append(text)
    return "".join(out).strip()


def para_style(p):
    style = p.find(f"{W}pPr/{W}pStyle")
    return style.get(f"{W}val", "") if style is not None else ""


def cell_to_md(cell):
    parts = [para_to_md(p._p) for p in cell.paragraphs]
    return " ".join(part for part in parts if part).replace("|", "\\|")


def table_to_md(table):
    rows = [[cell_to_md(c) for c in row.cells] for row in table.rows]
    if not rows:
        return ""
    width = max(len(r) for r in rows)
    rows = [r + [""] * (width - len(r)) for r in rows]
    header = "| " + " | ".join(rows[0]) + " |"
    rule = "| " + " | ".join(["---"] * width) + " |"
    return "\n".join([header, rule] + ["| " + " | ".join(r) + " |" for r in rows[1:]])


def main(path):
    doc = Document(path)
    for child in doc.element.body.iterchildren():
        tag = child.tag.split("}")[-1]
        if tag == "p":
            text = para_to_md(child)
            style = para_style(child)
            if not text:
                print()
            elif style.startswith("Heading"):
                level = "".join(ch for ch in style if ch.isdigit()) or "1"
                print(f"\n{'#' * int(level)} {text}\n")
            elif "List" in style:
                print(f"- {text}")
            else:
                print(text)
        elif tag == "tbl":
            print(f"\n{table_to_md(Table(child, doc))}\n")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
