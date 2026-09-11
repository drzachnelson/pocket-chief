"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookmarkSimple, CaretDown, CaretUp } from "@phosphor-icons/react";
import type { SuppliedSource, Topic } from "@/lib/types";
import type { LinkIndexEntry } from "@/lib/inline";
import { isTopicReviewed, isTopicSaved, recordRecentView, setTopicReviewed, setTopicSaved } from "@/lib/offline";
import { BlockList, useBlockCollapse } from "@/components/block-list";

export interface NextTopicMetadata {
  slug: string;
  label: string;
  categoryLabel: string;
}

export function TopicContent({ topic, sources, linkEntries, nextTopic }: { topic: Topic; sources: SuppliedSource[]; linkEntries: LinkIndexEntry[]; nextTopic?: NextTopicMetadata }) {
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
  const collapse = useBlockCollapse(blocks);

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
    setTopicSaved(topic, next).catch(() => setSaveError("This device blocked private storage, so the bookmark was not kept."));
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
        setReviewError(error instanceof Error ? error.message : "Could not save reviewed status on this device.");
      })
      .finally(() => setReviewSaving(false));
  }

  return (
    <>
      <div className="topic-actions-row"><button className={`button secondary small ${saved ? "saved" : ""}`} disabled={!savedReady} onClick={toggleSaved}><BookmarkSimple size={14} weight={saved ? "fill" : "regular"} />{saved ? "Saved offline" : "Save"}</button>{collapse.collapsibleIds.length > 0 && <button className="expand-toggle" onClick={collapse.toggleAll}>{collapse.allOpen ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}{collapse.allOpen ? "Close all" : "Open all"}</button>}{saveError && <span className="form-message" role="alert">{saveError}</span>}</div>
      <Tabs.Root defaultValue="notes" className="topic-tabs">
        <Tabs.List className="tabs-list" aria-label="Topic views"><Tabs.Trigger value="notes">Notes</Tabs.Trigger><Tabs.Trigger value="sources">Sources <span>{sources.length}</span></Tabs.Trigger><Tabs.Trigger value="history">History <span>{topic.versions.length}</span></Tabs.Trigger></Tabs.List>
        <Tabs.Content value="notes"><BlockList blocks={blocks} collapse={collapse} linkEntries={linkEntries} selfSlug={topic.slug} /></Tabs.Content>
        <Tabs.Content value="sources"><div className="source-list">{sources.map((source, index) => <article key={source.id}><span>{index + 1}</span><div><h2>{source.title}</h2><p>{source.citation}</p>{source.details && <small>{source.details}</small>}</div></article>)}</div></Tabs.Content>
        <Tabs.Content value="history"><div className="history-list">{topic.versions.map((item) => <article key={item.id}><span className="status-dot" /><div><h2>Version {item.versionNumber} · {item.status}</h2><p>{item.reviewedAt ? `Reviewed ${new Date(item.reviewedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : "Draft in review"}</p></div></article>)}</div></Tabs.Content>
      </Tabs.Root>
      <section className="topic-progress" aria-label="Study progress">
        <div className="topic-progress-status">
          <p className="eyebrow">Study progress</p>
          <p className="topic-review-status" role="status">{reviewed ? "Reviewed on this device" : "Not reviewed on this device"}</p>
          <button className={`button secondary small ${reviewed ? "saved" : ""}`} type="button" aria-pressed={reviewed} disabled={!reviewedReady || reviewSaving} onClick={toggleReviewed}>{reviewSaving ? "Saving…" : reviewed ? "Mark not reviewed" : "Mark reviewed"}</button>
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
