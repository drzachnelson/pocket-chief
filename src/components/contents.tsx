"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDown, X } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";
import { stripMarkup } from "@/lib/inline";
import { normalizePath } from "@/lib/pathname";
import type { ContentsBranch, ContentsData, ContentsGroup, ContentsSection } from "@/lib/reader-contents";

/** Fired on window when the reader page changes tab. The sidebar copy of Contents lives outside the page's React tree, so this is how it re-checks which sections are on screen. */
export const READER_TAB_EVENT = "pocket-chief:reader-tab";

// A section is current only while its block is on the page. Sources and History unmount Notes, so nothing is marked there.
function useSectionSpy(sections: ContentsSection[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    function update() {
      const present = sections.filter((section) => document.getElementById(section.id));
      const current = present.reduce<string>((closest, section) => document.getElementById(section.id)!.getBoundingClientRect().top <= 112 ? section.id : closest, "");
      setActive(present.length ? current || present[0].id : "");
    }
    update();
    const events = ["scroll", "hashchange", READER_TAB_EVENT];
    for (const type of events) window.addEventListener(type, update, { passive: true });
    return () => { for (const type of events) window.removeEventListener(type, update); };
  }, [sections]);
  return active;
}

const groupHasLink = (group: ContentsGroup, slug: string) => group.links.some((link) => link.slug === slug);

// usePathname() reports "/topics/<slug>/" on the static export, so the comparison goes through normalizePath.
function currentSlug(pathname: string, corpus: ContentsData["corpus"]) {
  const path = normalizePath(pathname);
  return path.startsWith(`/${corpus}/`) ? path.slice(corpus.length + 2) : "";
}

function ContentsTree({ corpus, branches, slug, onSelect }: { corpus: ContentsData["corpus"]; branches: ContentsBranch[]; slug: string; onSelect?: () => void }) {
  const current = branches.find((branch) => [branch, ...branch.groups].some((group) => groupHasLink(group, slug)));
  const currentGroup = current?.groups.find((group) => groupHasLink(group, slug));
  // The parent remounts this on a category change, so what the reader opened by hand never outlives the page it was opened on.
  const [picked, setPicked] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<ReadonlySet<string>>(new Set());
  const openId = picked ?? current?.id ?? null;
  const links = (group: ContentsGroup) => group.links.map((link) => <li key={link.slug}><Link href={`/${corpus}/${link.slug}`} aria-current={link.slug === slug ? "page" : undefined} onClick={onSelect}>{stripMarkup(link.label)}</Link></li>);
  return <div className="contents-tree">{branches.map((branch) => {
    const open = openId === branch.id;
    const active = open && current?.id === branch.id;
    return <div key={branch.id} className="contents-category">
      <button type="button" aria-expanded={open} aria-disabled={active || undefined} onClick={() => { if (!active) setPicked(open ? "" : branch.id); }}><CaretDown size={14} /><span>{stripMarkup(branch.label)}</span><small aria-hidden="true">{[branch, ...branch.groups].reduce((total, group) => total + group.links.length, 0)}</small></button>
      {open && <ul className="contents-branch">
        {links(branch)}
        {branch.groups.map((group) => {
          const groupOpen = openGroups.has(group.id) || group.id === currentGroup?.id;
          const groupActive = group.id === currentGroup?.id;
          return <li key={group.id} className="contents-group">
            <button type="button" aria-expanded={groupOpen} aria-disabled={groupActive || undefined} onClick={() => { if (!groupActive) setOpenGroups((set) => { const next = new Set(set); if (next.has(group.id)) next.delete(group.id); else next.add(group.id); return next; }); }}><CaretDown size={12} /><span>{stripMarkup(group.label)}</span><small aria-hidden="true">{group.links.length}</small></button>
            {groupOpen && <ul>{links(group)}</ul>}
          </li>;
        })}
      </ul>}
    </div>;
  })}</div>;
}

/**
 * One component for both corpora: the page's own sections, then the other pages of its corpus (a category accordion for topics,
 * a specialty accordion for playbooks). Inline in the laptop sidebar and inside the dialog below 1080px. Both labels are plain text.
 */
export function Contents({ data, onSelect }: { data: ContentsData; onSelect?: () => void }) {
  const slug = currentSlug(usePathname(), data.corpus);
  const active = useSectionSpy(data.sections);
  const navRef = useRef<HTMLElement>(null);
  const id = useId();
  const current = data.branches.find((branch) => [branch, ...branch.groups].some((group) => groupHasLink(group, slug)));
  // The marked section follows the page as it scrolls, so it has to stay inside the sidebar's own scroll area.
  useEffect(() => { navRef.current?.querySelector('[aria-current="location"]')?.scrollIntoView?.({ block: "nearest" }); }, [active]);
  return <nav className="contents-nav" aria-label="Contents" ref={navRef}>
    {data.sections.length > 0 && <div role="group" aria-labelledby={`${id}-page`}>
      <p id={`${id}-page`}>On this page</p>
      <ul className="contents-sections">{data.sections.map((section) => <li key={section.id}><a href={`#${section.id}`} data-level={section.level} aria-current={active === section.id ? "location" : undefined} onClick={onSelect}>{stripMarkup(section.label)}</a></li>)}</ul>
    </div>}
    <div role="group" aria-labelledby={`${id}-corpus`}>
      <p id={`${id}-corpus`}>{data.corpus === "topics" ? "Topics" : "Playbooks"}</p>
      <ContentsTree key={current?.id ?? ""} corpus={data.corpus} branches={data.branches} slug={slug} onSelect={onSelect} />
    </div>
  </nav>;
}

/** Contents below 1080px: a native modal dialog, a bottom sheet on a phone and a side panel on a tablet. Mounted only while open. */
export function ContentsDialog({ data, onClose }: { data: ContentsData; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const swipeFrom = useRef<number | null>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  const close = () => ref.current?.close();
  // Escape and close() both end in the native close event; the scrim is the dialog's own ::backdrop, so a click that targets the dialog itself landed on it.
  return <dialog ref={ref} className="contents-dialog" aria-labelledby="contents-title" onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
    <header onTouchStart={(event) => { swipeFrom.current = event.touches[0].clientY; }} onTouchEnd={(event) => { if (swipeFrom.current !== null && event.changedTouches[0].clientY - swipeFrom.current > 64) close(); swipeFrom.current = null; }}>
      <h2 id="contents-title">Contents</h2>
      <button type="button" className="icon-button" aria-label="Close contents" onClick={close}><X size={18} /></button>
    </header>
    <div className="contents-scroll"><Contents data={data} onSelect={close} /></div>
  </dialog>;
}
