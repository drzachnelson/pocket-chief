"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { BookmarkSimple } from "@phosphor-icons/react";
import { isTopicSaved, setPlaybookSaved, setTopicSaved } from "@/lib/offline";
import type { Playbook, Topic } from "@/lib/types";

const isPlaybook = (item: Topic | Playbook): item is Playbook => "procedureId" in item;

/** Save for either reader page. `isTopicSaved` is keyed by id, so it answers for a playbook too. */
function SaveButton({ item }: { item: Topic | Playbook }) {
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const touched = useRef(false);

  useEffect(() => {
    // A blocked IndexedDB request neither resolves nor rejects, so awaiting it alone left
    // Save disabled forever. Racing a timeout means the button is always usable; the worst
    // case is that it opens showing "Save" on a page already saved on this device, which
    // toggle corrects on the next write.
    Promise.race([isTopicSaved(item.id), new Promise<boolean | undefined>((resolve) => setTimeout(() => resolve(undefined), 1500))])
      .then((value) => { if (typeof value === "boolean" && !touched.current) setSaved(value); }).catch(() => undefined).finally(() => setReady(true));
  }, [item.id]);

  function toggle() {
    touched.current = true;
    const next = !saved; setSaved(next); setError("");
    (isPlaybook(item) ? setPlaybookSaved(item, next) : setTopicSaved(item, next)).catch(() => setError("This device blocked private storage, so this page was not saved."));
  }

  return <>
    <button className={`button secondary small ${saved ? "saved" : ""}`} disabled={!ready} onClick={toggle}><BookmarkSimple size={14} weight={saved ? "fill" : "regular"} />{saved ? "Saved" : "Save"}</button>
    {error && <span className="form-message" role="alert">{error}</span>}
  </>;
}

/**
 * The page header of a topic or a playbook, the same on both: the breadcrumb left and Save right, then the title, then the tabs (`children`, rendered inside the page's Tabs.Root).
 * Last updated and the disclaimer are not here; they close the page.
 */
export function ReaderHeader({ item, breadcrumb, children }: { item: Topic | Playbook; breadcrumb?: ReactNode; children: ReactNode }) {
  return <div className="page-header">
    <div className="page-header-lead">{breadcrumb}<SaveButton item={item} /></div>
    <h1 className="page-title">{item.title}</h1>
    {children}
  </div>;
}
