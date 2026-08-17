"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookmarkSimple, Notebook } from "@phosphor-icons/react";
import { getSavedTopics, setTopicSaved } from "@/lib/offline";
import type { Topic } from "@/lib/types";
import { TopicCard } from "@/components/topic-card";

// The page already resolved the owner's bookmarks on the server, so `fallback` is the source of truth
// whenever we are online: the local read only serves a cached page offline, and otherwise exists to retire
// entries un-bookmarked on another device. Ordering is deterministic — local never overwrites server data.
export function FavoriteTopics({ fallback = [] }: { fallback?: Topic[] }) {
  const [topics, setTopics] = useState<Topic[]>(fallback);
  useEffect(() => {
    let active = true;
    const offline = typeof navigator !== "undefined" && navigator.onLine === false;
    getSavedTopics().then(async (saved) => {
      if (!active) return;
      if (offline) { setTopics(saved); return; }
      setTopics(fallback);
      const bookmarked = new Set(fallback.map((topic) => topic.id));
      await Promise.all([...fallback.map((topic) => setTopicSaved(topic, true)), ...saved.filter((topic) => !bookmarked.has(topic.id)).map((topic) => setTopicSaved(topic, false))]);
    }).catch(() => undefined);
    return () => { active = false; };
  }, [fallback]);
  if (topics.length) return <div className="topic-grid">{topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>;
  return <div className="empty-state compact"><span className="empty-icon"><BookmarkSimple size={22} /></span><h2>No favorites saved yet</h2><p>Bookmark any topic while reading to pin it here for quick access.</p><Link className="button" href="/topics"><Notebook size={15} />Browse topics</Link></div>;
}
