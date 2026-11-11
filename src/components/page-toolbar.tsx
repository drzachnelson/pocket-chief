"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type Ref } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowsInLineVertical, ArrowsOutLineVertical, ListBullets, Notebook, Steps } from "@phosphor-icons/react";
import type { BlockCollapse } from "@/components/block-list";
import { ContentsDialog, READER_TAB_EVENT } from "@/components/contents";
import { hasAppHistory } from "@/lib/app-history";
import type { ContentsData } from "@/lib/reader-contents";

const INDEX = { topics: { href: "/topics", label: "Topics", icon: Notebook }, playbooks: { href: "/playbooks", label: "Playbooks", icon: Steps } } as const;

/** The one expand control for a reader page. Its name flips, so it carries no pressed state. */
export function ExpandToggle({ collapse, disabled }: { collapse: BlockCollapse; disabled?: boolean }) {
  const Icon = collapse.allOpen ? ArrowsInLineVertical : ArrowsOutLineVertical;
  return <button type="button" disabled={disabled} onClick={collapse.toggleAll}><Icon size={21} /><span>{collapse.allOpen ? "Collapse all" : "Expand all"}</span></button>;
}

/** The page toolbar for a topic or a playbook. CSS decides which slots show: phone all, tablet without the index link, laptop without Contents either (the sidebar carries both). */
export function PageToolbar({ corpus, backFallback, collapse, notesShown, contentsRef, onOpenContents }: { corpus: ContentsData["corpus"]; backFallback: string; collapse: BlockCollapse; notesShown: boolean; contentsRef: Ref<HTMLButtonElement>; onOpenContents: () => void }) {
  const router = useRouter();
  const index = INDEX[corpus];
  const IndexIcon = index.icon;
  return <div className="page-toolbar" role="group" aria-label="Page tools">
    {/* Never dead: with nothing in-app behind the page, Back goes to where the page belongs. */}
    <button type="button" onClick={() => { if (hasAppHistory()) window.history.back(); else router.push(backFallback); }}><ArrowLeft size={21} /><span>Back</span></button>
    <Link className="toolbar-index" href={index.href}><IndexIcon size={21} /><span>{index.label}</span></Link>
    <button type="button" className="toolbar-contents" ref={contentsRef} aria-haspopup="dialog" onClick={onOpenContents}><ListBullets size={21} /><span>Contents</span></button>
    {collapse.collapsibleIds.length > 0 && <ExpandToggle collapse={collapse} disabled={!notesShown} />}
  </div>;
}

const subscribe = () => () => undefined;

/**
 * What a reader page owns outside its own column: the toolbar, which the shell hosts in its top row (the slot exists once the page
 * has hydrated), and the Contents dialog. The laptop's inline Contents is a separate, server-rendered copy in the sidebar.
 */
export function ReaderTools({ corpus, contents, backFallback, collapse, notesShown }: { corpus: ContentsData["corpus"]; contents: ContentsData; backFallback?: string; collapse: BlockCollapse; notesShown: boolean }) {
  const slot = useSyncExternalStore(subscribe, () => document.getElementById("shell-toolbar"), () => null);
  const [open, setOpen] = useState(false);
  const contentsRef = useRef<HTMLButtonElement>(null);
  // The sidebar's Contents marks sections by what is on the page, so it has to hear that Notes came or went. The tab panel unmounts a render after this commit, hence the frame.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => window.dispatchEvent(new Event(READER_TAB_EVENT)));
    return () => window.cancelAnimationFrame(frame);
  }, [notesShown]);
  return <>
    {slot && createPortal(<PageToolbar corpus={corpus} backFallback={backFallback ?? INDEX[corpus].href} collapse={collapse} notesShown={notesShown} contentsRef={contentsRef} onOpenContents={() => setOpen(true)} />, slot)}
    {open && <ContentsDialog data={contents} onClose={() => { setOpen(false); contentsRef.current?.focus(); }} />}
  </>;
}
