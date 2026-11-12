"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type Ref } from "react";
import { CaretDown, CaretUp, X } from "@phosphor-icons/react";
import { openSectionAround } from "@/components/block-list";
import { clearMatches, findMatches, paintMatches } from "@/lib/find-in-page";

export const FIND_BAR_ID = "find-bar";

// The tab being read: both reader pages mount only the active panel's content, so this is Notes, Sources or History.
const PANEL = '.topic-tabs [role="tabpanel"][data-state="active"]';

/**
 * The find bar for a reader page. The page toolbar's slot hosts it beside the toolbar, and while it is open it takes the toolbar's place.
 * It is always mounted (hidden when closed) so the Find text button's `aria-controls` has a target and the query survives a close.
 * `tab` only tells it the panel changed. Cmd or Ctrl-F is left to the browser.
 */
export function FindBar({ open, tab, inputRef, onClose }: { open: boolean; tab: string; inputRef: Ref<HTMLInputElement>; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState({ current: 0, total: 0 });
  const matches = useRef<Range[]>([]);
  // The match last shown, so a longer query keeps the reader where they are instead of returning to the first match.
  const shown = useRef<Range | null>(null);

  const show = useCallback((index: number) => {
    const range = matches.current[index];
    openSectionAround(range.startContainer);
    paintMatches(matches.current, index);
    // The parent element, not the range: a collapsed flow or a table's scroller is aimed at through it, and `nearest` keeps a wide table's own scroll.
    range.startContainer.parentElement?.scrollIntoView({ block: "center", inline: "nearest" });
    shown.current = range;
    setPosition({ current: index, total: matches.current.length });
  }, []);

  useEffect(() => {
    if (!open) { clearMatches(); return; }
    // A frame later: a tab change commits its panel after this effect runs, and a typed query paints once per frame at most.
    const frame = window.requestAnimationFrame(() => {
      const panel = document.querySelector<HTMLElement>(PANEL);
      const found = panel ? findMatches(panel, query) : [];
      matches.current = found;
      if (!found.length) { clearMatches(); shown.current = null; setPosition({ current: 0, total: 0 }); return; }
      const after = shown.current ? found.findIndex((range) => { try { return shown.current!.compareBoundaryPoints(Range.START_TO_START, range) <= 0; } catch { return false; } }) : 0;
      show(after < 0 ? 0 : after);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, query, tab, show]);
  // The tab changed, so the old match belongs to content that is gone.
  useEffect(() => { shown.current = null; }, [tab]);
  useEffect(() => clearMatches, []);

  const step = (by: 1 | -1) => { const { total } = position; if (total) show((position.current + by + total) % total); };
  // Escape closes from anywhere in the bar; Enter in the field steps, Shift-Enter steps back, as in the browser's own find.
  const onGroupKey = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); onClose(); } };
  const onFieldKey = (event: KeyboardEvent) => { if (event.key === "Enter") { event.preventDefault(); step(event.shiftKey ? -1 : 1); } };

  const { current, total } = position;
  const count = !query.trim() ? "" : total ? `${current + 1} of ${total}` : "No matches";
  return <div id={FIND_BAR_ID} className="find-bar" role="group" aria-label="Find in page" hidden={!open} onKeyDown={onGroupKey}>
    <input ref={inputRef} className="find-field" type="search" aria-label="Find in page" placeholder="Find in page" enterKeyHint="next" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={onFieldKey} />
    <span className="find-count" role="status">{count}</span>
    <button type="button" aria-label="Previous match" disabled={!total} onClick={() => step(-1)}><CaretUp size={21} /></button>
    <button type="button" aria-label="Next match" disabled={!total} onClick={() => step(1)}><CaretDown size={21} /></button>
    <button type="button" aria-label="Close find" onClick={onClose}><X size={21} /></button>
  </div>;
}
