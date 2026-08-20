"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookmarkSimple, MagnifyingGlass } from "@phosphor-icons/react";
import { getSavedTopics, setTopicSaved } from "@/lib/offline";
import type { Topic } from "@/lib/types";
import { TopicCard } from "@/components/topic-card";

export function SavedLibrary() {
  const [topics, setTopics] = useState<Topic[] | null>(null);
  useEffect(() => {
    getSavedTopics().then(setTopics).catch(() => setTopics([]));
    fetch("/api/bookmarks", { cache: "no-store" }).then(async (response) => response.ok ? response.json() as Promise<{ topics: Topic[] }> : null).then(async (value) => {
      if (!value) return;
      await Promise.all(value.topics.map((topic) => setTopicSaved(topic, true)));
      setTopics(value.topics);
    }).catch(() => undefined);
  }, []);
  if (topics === null) return <div className="loading-stack"><div className="skeleton card" /><div className="skeleton card" /></div>;
  if (topics.length) return <div className="topic-grid">{topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>;
  return <div className="empty-state"><span className="empty-icon"><BookmarkSimple size={23} /></span><h2>No saved topics yet</h2><p>Use the bookmark on any topic. Saved topics sync privately and remain cached on this device.</p><Link className="button" href="/"><MagnifyingGlass size={15} />Find a topic</Link></div>;
}
