"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SuppliedSource, Topic } from "@/lib/types";
import type { LinkIndexEntry } from "@/lib/inline";
import { isTopicReviewed, recordRecentView, setTopicReviewed } from "@/lib/offline";
import { BlockList, useBlockCollapse } from "@/components/block-list";
import { ReaderTools } from "@/components/page-toolbar";
import { ReaderHeader } from "@/components/reader-header";
import { SourceList } from "@/components/source-list";
import type { ContentsData } from "@/lib/reader-contents";

export interface NextTopicMetadata {
  slug: string;
  label: string;
  categoryLabel: string;
}

/** `category` is the topic's category page: where Back goes when nothing in-app is behind the page, and where the last topic of a category ends. */
export function TopicContent({ topic, sources, linkEntries, contents, breadcrumb, category, nextTopic }: { topic: Topic; sources: SuppliedSource[]; linkEntries: LinkIndexEntry[]; contents: ContentsData; breadcrumb?: ReactNode; category?: { label: string; href: string }; nextTopic?: NextTopicMetadata }) {
  const [tab, setTab] = useState("notes");
  const [reviewed, setReviewed] = useState(false);
  const [reviewedReady, setReviewedReady] = useState(false);
  const [reviewSaving, setReviewSaving] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const version = topic.approvedVersion!;
  const blocks = useMemo(() => version.blocks.filter((block) => block.type !== "references"), [version]);
  const showNotes = useCallback(() => setTab("notes"), []);
  const collapse = useBlockCollapse(blocks, showNotes);

  useEffect(() => {
    recordRecentView(topic).catch(() => undefined);
    // Same guard as Save: a blocked IndexedDB request neither resolves nor rejects, so the race keeps Studied usable.
    Promise.race([isTopicReviewed(topic.id), new Promise<boolean | undefined>((resolve) => setTimeout(() => resolve(undefined), 1500))])
      .then((value) => { if (typeof value === "boolean") setReviewed(value); }).catch(() => undefined).finally(() => setReviewedReady(true));
  }, [topic]);

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
      <ReaderTools corpus="topics" contents={contents} backFallback={category?.href} collapse={collapse} tab={tab} />
      <Tabs.Root value={tab} onValueChange={setTab} className="topic-tabs">
        <ReaderHeader item={topic} breadcrumb={breadcrumb}>
          <Tabs.List className="tabs-list" aria-label="Topic views"><Tabs.Trigger value="notes">Notes</Tabs.Trigger><Tabs.Trigger value="sources">Sources <span aria-hidden="true">{sources.length}</span></Tabs.Trigger><Tabs.Trigger value="history">History <span aria-hidden="true">{topic.versions.length}</span></Tabs.Trigger></Tabs.List>
        </ReaderHeader>
        <Tabs.Content value="notes"><BlockList blocks={blocks} collapse={collapse} linkEntries={linkEntries} selfSlug={topic.slug} /></Tabs.Content>
        <Tabs.Content value="sources"><SourceList sources={sources} /></Tabs.Content>
        <Tabs.Content value="history"><div className="history-list">{topic.versions.map((item) => <article key={item.id}><div><h2>Version {item.versionNumber} · {item.status}</h2><p>{item.reviewedAt ? `Reviewed ${new Date(item.reviewedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}` : "Draft in review"}</p></div></article>)}</div></Tabs.Content>
      </Tabs.Root>
      {/* One block below the panels, so it shows on every tab: Studied, and the way on. Last updated and the disclaimer follow it. */}
      <div className="topic-progress">
        <div>
          <button className={`button secondary small ${reviewed ? "saved" : ""}`} type="button" aria-pressed={reviewed} disabled={!reviewedReady || reviewSaving} onClick={toggleReviewed}>Studied</button>
          {reviewError && <span className="form-message" role="alert">{reviewError}</span>}
        </div>
        {nextTopic ? <Link className="topic-next-link" href={`/topics/${nextTopic.slug}`} aria-label={`Next topic: ${nextTopic.label} — ${nextTopic.categoryLabel}`}><span>Next topic</span><strong>{nextTopic.label}</strong><small>{nextTopic.categoryLabel}</small></Link> : category && <Link className="topic-next-link" href={category.href} aria-label={`End of category: back to ${category.label}`}><span>End of category</span><strong>Back to {category.label}</strong></Link>}
      </div>
    </>
  );
}
