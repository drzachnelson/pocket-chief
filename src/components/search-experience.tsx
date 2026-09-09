"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookmarkSimple, ClockCounterClockwise, Notebook } from "@phosphor-icons/react";
import { SearchForm } from "@/components/search-form";
import { TopicCard } from "@/components/topic-card";
import { RecentTopics } from "@/components/recent-topics";
import { FavoriteTopics } from "@/components/favorite-topics";
import { loadLibrary } from "@/lib/library-client";
import { searchTopics } from "@/lib/search";
import type { Topic } from "@/lib/types";

export function SearchExperience() {
  const query = useSearchParams().get("q") ?? "";
  const [topics, setTopics] = useState<Topic[] | null>(null);
  useEffect(() => { loadLibrary().then((library) => setTopics(library.topics)).catch(() => setTopics([])); }, []);
  const reviewed = topics ?? [];
  const results = query ? searchTopics(query, reviewed) : reviewed;
  const sectionsCovered = new Set(reviewed.map((topic) => topic.scoreNodeId)).size;
  return (
    <>
      <section className="search-hero">
        <p className="eyebrow">Private clinical atlas</p>
        <h1 className="visually-hidden">Pocket Chief</h1>
        <p className="page-lede">Search general surgery notes, decision flows, procedures, and high-yield board pearls.</p>
        <SearchForm defaultValue={query} />
        <p className="search-hint">Titles, aliases, headings, SCORE categories, body text, and tags · typo tolerant</p>
      </section>

      {query ? (
        <section className="section" aria-live="polite">
          <div className="section-heading"><h2>{results.length} {results.length === 1 ? "result" : "results"} for “{query}”</h2><Link href="/">Clear search</Link></div>
          {results.length ? <div className="topic-grid">{results.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div> : (
            <div className="empty-state"><span className="empty-icon"><Notebook size={22} /></span><h2>No topic matches yet</h2><p>Try an alias or shorter term.</p><Link className="button" href="/topics"><Notebook size={15} />Browse the curriculum</Link></div>
          )}
        </section>
      ) : (
        <>
          <section className="section">
            <div className="section-heading"><h2>Recently viewed</h2><Link href="/topics">Browse curriculum</Link></div>
            <RecentTopics fallback={reviewed.slice(0, 6)} />
          </section>
          <section className="section">
            <div className="section-heading"><h2>Favorites</h2><Link href="/saved">View all saved</Link></div>
            <FavoriteTopics />
          </section>
          <section className="section">
            <div className="section-heading"><h2>Library</h2><span>{sectionsCovered} SCORE {sectionsCovered === 1 ? "section" : "sections"} covered</span></div>
            <div className="topic-grid">
              <Link href="/topics" className="topic-card"><span className="topic-icon"><Notebook size={19} /></span><span><h3>Browse the SCORE curriculum</h3><p>Every reviewed topic, by section</p></span><span className="topic-card-meta">{reviewed.length} topics</span></Link>
              <Link href="/saved" className="topic-card"><span className="topic-icon"><ClockCounterClockwise size={19} /></span><span><h3>Return to saved topics</h3><p>Private bookmarks available offline</p></span><span className="topic-card-meta"><BookmarkSimple size={14} /> On this device</span></Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
