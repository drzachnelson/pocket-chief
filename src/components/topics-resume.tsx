"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRecentTopics } from "@/lib/offline";

export interface TopicsResumeProps {
  recentSlug?: string;
  fallbackSlug?: string;
  approvedTopics: Array<{ id: string; slug: string }>;
}

/** Resolves a resume destination on-device before falling back to server metadata. */
export function TopicsResume({ recentSlug, fallbackSlug, approvedTopics }: TopicsResumeProps) {
  const [resumeSlug, setResumeSlug] = useState<string | null>();

  useEffect(() => {
    let active = true;
    getRecentTopics()
      .then((recent) => {
        if (!active) return;
        const currentSlugById = new Map(approvedTopics.map((topic) => [topic.id, topic.slug]));
        const resumeFromDevice = recent.map((topic) => currentSlugById.get(topic.id)).find(Boolean);
        setResumeSlug(resumeFromDevice ?? recentSlug ?? fallbackSlug ?? null);
      })
      .catch(() => {
        if (active) setResumeSlug(recentSlug ?? fallbackSlug ?? null);
      });
    return () => { active = false; };
  }, [approvedTopics, fallbackSlug, recentSlug]);

  if (resumeSlug === undefined) return <section className="topics-resume" aria-label="Resume topic" />;

  return (
    <section className="topics-resume" aria-label="Resume topic">
      {resumeSlug ? <Link className="button secondary" href={`/topics/${resumeSlug}`}>Resume topic</Link> : <p>No topic ready to resume.</p>}
    </section>
  );
}
