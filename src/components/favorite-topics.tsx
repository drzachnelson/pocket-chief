"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookmarkSimple, Notebook } from "@phosphor-icons/react";
import { getSavedTopics } from "@/lib/offline";
import type { Topic } from "@/lib/types";
import { TopicCard } from "@/components/topic-card";

// Bookmarks live only on this device now, so IndexedDB is the whole story: there is no server copy
// to reconcile against and no ordering rule to protect.
export function FavoriteTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  useEffect(() => { getSavedTopics().then(setTopics).catch(() => undefined); }, []);
  if (topics.length) return <div className="topic-grid">{topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>;
  return <div className="empty-state compact"><span className="empty-icon"><BookmarkSimple size={22} /></span><h2>No favorites saved yet</h2><p>Bookmark any topic while reading to pin it here for quick access.</p><Link className="button" href="/topics"><Notebook size={15} />Browse topics</Link></div>;
}
