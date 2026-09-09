"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRecentTopics } from "@/lib/offline";

export interface TopicsResumeProps {
  fallbackSlug?: string;
  approvedTopics: Array<{ id: string; slug: string }>;
}

/** Resolves a resume destination from this device's history, then the curriculum's first topic. */
export function TopicsResume({ fallbackSlug, approvedTopics }: TopicsResumeProps) {
  const [resumeSlug, setResumeSlug] = useState<string | null>();

  useEffect(() => {
    let active = true;
    getRecentTopics()
      .then((recent) => {
        if (!active) return;
        const currentSlugById = new Map(approvedTopics.map((topic) => [topic.id, topic.slug]));
        const resumeFromDevice = recent.map((topic) => currentSlugById.get(topic.id)).find(Boolean);
        setResumeSlug(resumeFromDevice ?? fallbackSlug ?? null);
      })
      .catch(() => { if (active) setResumeSlug(fallbackSlug ?? null); });
    return () => { active = false; };
  }, [approvedTopics, fallbackSlug]);

  if (resumeSlug === undefined) return <section className="topics-resume" aria-label="Resume topic" />;

  return (
    <section className="topics-resume" aria-label="Resume topic">
      {resumeSlug ? <Link className="button secondary" href={`/topics/${resumeSlug}`}>Resume topic</Link> : <p>No topic ready to resume.</p>}
    </section>
  );
}
