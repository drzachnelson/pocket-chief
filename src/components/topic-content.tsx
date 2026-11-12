"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BookmarkSimple } from "@phosphor-icons/react";
import type { SuppliedSource, Topic } from "@/lib/types";
import type { LinkIndexEntry } from "@/lib/inline";
import { isTopicReviewed, isTopicSaved, recordRecentView, setTopicReviewed, setTopicSaved } from "@/lib/offline";
import { BlockList, useBlockCollapse } from "@/components/block-list";
import { ReaderTools } from "@/components/page-toolbar";
import { SourceList } from "@/components/source-list";
import type { ContentsData } from "@/lib/reader-contents";

export interface NextTopicMetadata {
  slug: string;
  label: string;
  categoryLabel: string;
}

/** `backFallback` is where Back goes when nothing in-app is behind the page: the topic's category page. */
export function TopicContent({ topic, sources, linkEntries, contents, backFallback, nextTopic }: { topic: Topic; sources: SuppliedSource[]; linkEntries: LinkIndexEntry[]; contents: ContentsData; backFallback?: string; nextTopic?: NextTopicMetadata }) {
  const [tab, setTab] = useState("notes");
  const [saved, setSaved] = useState(false);
  const [savedReady, setSavedReady] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [reviewedReady, setReviewedReady] = useState(false);
  const [reviewSaving, setReviewSaving] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const savedTouched = useRef(false);
  const version = topic.approvedVersion!;
  const blocks = useMemo(() => version.blocks.filter((block) => block.type !== "references"), [version]);
  const showNotes = useCallback(() => setTab("notes"), []);
  const collapse = useBlockCollapse(blocks, showNotes);

  useEffect(() => {
    recordRecentView(topic).catch(() => undefined);
    // A blocked IndexedDB request neither resolves nor rejects, so awaiting it alone left
    // Save disabled forever. Racing a timeout means the button is always usable; the worst
    // case is that it opens showing "Save" on a topic already saved on this device, which
    // toggleSaved corrects on the next write.
    Promise.race([isTopicSaved(topic.id), new Promise<boolean | undefined>((resolve) => setTimeout(() => resolve(undefined), 1500))])
      .then((value) => { if (typeof value === "boolean" && !savedTouched.current) setSaved(value); }).catch(() => undefined).finally(() => setSavedReady(true));
    Promise.race([isTopicReviewed(topic.id), new Promise<boolean | undefined>((resolve) => setTimeout(() => resolve(undefined), 1500))])
      .then((value) => { if (typeof value === "boolean") setReviewed(value); }).catch(() => undefined).finally(() => setReviewedReady(true));
  }, [topic]);

  function toggleSaved() {
    savedTouched.current = true;
    const next = !saved; setSaved(next); setSaveError("");
    setTopicSaved(topic, next).catch(() => setSaveError("This device blocked private storage, so this topic was not saved."));
  }

  function toggleReviewed() {
    if (!reviewedReady || reviewSaving) return;
    const next = !reviewed;
    setReviewed(next);
    setReviewError("");
    setReviewSaving(true);
    setTopicReviewed(topic, next)
      .catch((error) => {
        setReviewed(!next);
        setReviewError(error instanceof Error ? error.message : "Could not save study progress on this device.");
      })
      .finally(() => setReviewSaving(false));
  }

  return (
    <>
      <ReaderTools corpus="topics" contents={contents} backFallback={backFallback} collapse={collapse} tab={tab} />
      <div className="topic-actions-row"><button className={`button secondary small ${saved ? "saved" : ""}`} disabled={!savedReady} onClick={toggleSaved}><BookmarkSimple size={14} weight={saved ? "fill" : "regular"} />{saved ? "Saved" : "Save"}</button>{saveError && <span className="form-message" role="alert">{saveError}</span>}</div>
      <Tabs.Root value={tab} onValueChange={setTab} className="topic-tabs">
        <Tabs.List className="tabs-list" aria-label="Topic views"><Tabs.Trigger value="notes">Notes</Tabs.Trigger><Tabs.Trigger value="sources">Sources <span aria-hidden="true">{sources.length}</span></Tabs.Trigger><Tabs.Trigger value="history">History <span aria-hidden="true">{topic.versions.length}</span></Tabs.Trigger></Tabs.List>
        <Tabs.Content value="notes"><BlockList blocks={blocks} collapse={collapse} linkEntries={linkEntries} selfSlug={topic.slug} /></Tabs.Content>
        <Tabs.Content value="sources"><SourceList sources={sources} /></Tabs.Content>
        <Tabs.Content value="history"><div className="history-list">{topic.versions.map((item) => <article key={item.id}><div><h2>Version {item.versionNumber} · {item.status}</h2><p>{item.reviewedAt ? `Reviewed ${new Date(item.reviewedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}` : "Draft in review"}</p></div></article>)}</div></Tabs.Content>
      </Tabs.Root>
      <section className="topic-progress" aria-label="Study progress">
        <div className="topic-progress-status">
          <p className="eyebrow">Study progress</p>
          <button className={`button secondary small ${reviewed ? "saved" : ""}`} type="button" aria-pressed={reviewed} disabled={!reviewedReady || reviewSaving} onClick={toggleReviewed}>Studied</button>
          {reviewError && <span className="form-message" role="alert">{reviewError}</span>}
        </div>
        <div className="topic-next">
          <p className="eyebrow">Continue studying</p>
          {nextTopic ? <Link className="topic-next-link" href={`/topics/${nextTopic.slug}`} aria-label={`Next topic: ${nextTopic.label} — ${nextTopic.categoryLabel}`}><span>Next topic</span><strong>{nextTopic.label}</strong><small>{nextTopic.categoryLabel}</small></Link> : <Link className="topic-next-link" href="/topics" aria-label="End of category: back to all topics"><span>End of category</span><strong>Back to all topics</strong></Link>}
        </div>
      </section>
    </>
  );
}
