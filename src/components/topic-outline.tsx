"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ListBullets, X } from "@phosphor-icons/react";

/** One reading-outline entry. `level` mirrors `headingLevel()` — 3 marks a `↳` subsection. */
export interface OutlineSection { id: string; heading: string; level: 2 | 3 }

const FOCUSABLE = "a[href], button:not([disabled])";
const formatReviewed = (value: string) => { const date = new Date(value); return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); };

/**
 * Highlights the topmost section that has reached the upper 30% of the viewport. The bottom
 * inset is what stops a section from claiming the outline the instant it scrolls into view,
 * and the `order` scan is what keeps the choice deterministic when several overlap.
 */
function useScrollSpy(sections: OutlineSection[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const order = sections.map((section) => section.id);
    const visible = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) { if (entry.isIntersecting) visible.add(entry.target.id); else visible.delete(entry.target.id); }
      const topmost = order.find((id) => visible.has(id));
      // Falling back to the previous value keeps the marker parked on the last section the
      // reader passed rather than blanking out between sections.
      if (topmost) setActive(topmost);
    }, { rootMargin: "0px 0px -70% 0px" });
    for (const id of order) { const node = document.getElementById(id); if (node) observer.observe(node); }
    return () => observer.disconnect();
  }, [sections]);
  return active;
}

function OutlineLink({ section, active, onSelect }: { section: OutlineSection; active: boolean; onSelect?: () => void }) {
  return <a href={`#${section.id}`} data-level={String(section.level)} className={active ? "is-active" : undefined} aria-current={active ? "location" : undefined} onClick={onSelect}>{section.heading}</a>;
}

/** Desktop (≥980px) outline. Replaces the static aside that used to live in the topic page. */
export function TopicOutline({ sections }: { sections: OutlineSection[] }) {
  const active = useScrollSpy(sections);
  return (
    <aside className="topic-toc" aria-label="On this page">
      <p>On this page</p>
      {sections.map((section) => <OutlineLink key={section.id} section={section} active={section.id === active} />)}
      <div className="toc-note"><strong>Source linked</strong><span>Every factual block is tied to supplied notes.</span></div>
    </aside>
  );
}

/**
 * Mounted on `document.body` so the sheet clears the topic grid's stacking context and can sit
 * over the fixed mobile nav. It only ever renders after a click, so there is nothing to hydrate.
 */
function OutlineSheet({ sections, title, reviewedAt, onSelect, onDismiss }: { sections: OutlineSection[]; title: string; reviewedAt?: string; onSelect: () => void; onDismiss: () => void }) {
  const active = useScrollSpy(sections);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reviewed = reviewedAt ? formatReviewed(reviewedAt) : "";
  useEffect(() => { closeRef.current?.focus(); }, []);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") { event.preventDefault(); onDismiss(); return; }
    if (event.key !== "Tab" || !sheetRef.current) return;
    const nodes = [...sheetRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    // Only the two ends need handling; everything between them tabs natively.
    if (nodes.length === 0 || document.activeElement !== (event.shiftKey ? nodes[0] : nodes[nodes.length - 1])) return;
    event.preventDefault();
    (event.shiftKey ? nodes[nodes.length - 1] : nodes[0]).focus();
  }

  return createPortal(
    <div className="outline-sheet" role="dialog" aria-modal="true" aria-labelledby="outline-sheet-title" ref={sheetRef} onKeyDown={onKeyDown}>
      <div className="outline-sheet-head">
        <div><p className="eyebrow">On this page</p><h2 id="outline-sheet-title">{title}</h2></div>
        <button ref={closeRef} type="button" className="icon-button" onClick={onDismiss} aria-label="Close outline"><X size={18} aria-hidden="true" /></button>
      </div>
      <nav className="outline-sheet-list" aria-label="Section outline">
        {sections.map((section) => <OutlineLink key={section.id} section={section} active={section.id === active} onSelect={onSelect} />)}
      </nav>
      <p className="outline-sheet-foot">{reviewed ? `Reviewed ${reviewed}` : "Review date not recorded"}</p>
    </div>,
    document.body,
  );
}

/**
 * Mobile (<980px) entry point, rendered inside the topic header. Below 980px `.topic-toc` is
 * hidden, so without this the reader has no way to move between sections at all.
 */
export function TopicOutlineTrigger({ sections, title, reviewedAt }: { sections: OutlineSection[]; title: string; reviewedAt?: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  if (sections.length === 0) return null;
  // Choosing an entry hands focus to the anchor target, so only a dismissal restores the trigger.
  return (
    <>
      <button ref={triggerRef} type="button" className="outline-trigger" aria-label="Section outline" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}><ListBullets size={16} weight="bold" aria-hidden="true" /><span>Outline</span></button>
      {open && <OutlineSheet sections={sections} title={title} reviewedAt={reviewedAt} onSelect={() => setOpen(false)} onDismiss={() => { setOpen(false); triggerRef.current?.focus(); }} />}
    </>
  );
}
