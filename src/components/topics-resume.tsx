"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRecentTopics } from "@/lib/offline";

export interface TopicsResumeProps {
  recentSlug?: string;
  fallbackSlug?: string;
}

/** Resolves a resume destination on-device before falling back to server metadata. */
export function TopicsResume({ recentSlug, fallbackSlug }: TopicsResumeProps) {
  const [resumeSlug, setResumeSlug] = useState<string | null>();

  useEffect(() => {
    let active = true;
    getRecentTopics()
      .then((recent) => {
        if (!active) return;
        setResumeSlug(recent.find((topic) => topic.approvedVersion)?.slug ?? recentSlug ?? fallbackSlug ?? null);
      })
      .catch(() => {
        if (active) setResumeSlug(recentSlug ?? fallbackSlug ?? null);
      });
    return () => { active = false; };
  }, [fallbackSlug, recentSlug]);

  if (resumeSlug === undefined) return <section className="topics-resume" aria-label="Resume topic" />;

  return (
    <section className="topics-resume" aria-label="Resume topic">
      {resumeSlug ? <Link href={`/topics/${resumeSlug}`}>Resume topic</Link> : <p>No topic ready to resume.</p>}
    </section>
  );
}
