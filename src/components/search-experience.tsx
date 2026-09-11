"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookmarkSimple, ClockCounterClockwise, Notebook, Steps } from "@phosphor-icons/react";
import { SearchForm } from "@/components/search-form";
import { TopicCard } from "@/components/topic-card";
import { RecentTopics } from "@/components/recent-topics";
import { FavoriteTopics } from "@/components/favorite-topics";
import { loadLibrary, loadPlaybooks } from "@/lib/library-client";
import { searchPlaybooks, searchTopics } from "@/lib/search";
import type { Playbook, Topic } from "@/lib/types";

export function SearchExperience() {
  const query = useSearchParams().get("q") ?? "";
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [playbooks, setPlaybooks] = useState<Playbook[] | null>(null);
  // Two independent loads with independent states. One asset failing must not blank the other,
  // and "no matches" must not be announced until both have settled.
  useEffect(() => { loadLibrary().then((library) => setTopics(library.topics)).catch(() => setTopics([])); }, []);
  useEffect(() => { loadPlaybooks().then((library) => setPlaybooks(library.playbooks)).catch(() => setPlaybooks([])); }, []);
  const reviewed = topics ?? [];
  const guides = playbooks ?? [];
  const results = query ? searchTopics(query, reviewed) : reviewed;
  const playbookResults = query ? searchPlaybooks(query, guides) : guides;
  const settled = topics !== null && playbooks !== null;
  const total = results.length + playbookResults.length;
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
          <div className="section-heading"><h2>{total} {total === 1 ? "result" : "results"} for “{query}”</h2><Link href="/">Clear search</Link></div>
          {results.length > 0 && (
            <>
              <div className="section-heading"><h2>Topics</h2><span>{results.length}</span></div>
              <div className="topic-grid">{results.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>
            </>
          )}
          {playbookResults.length > 0 && (
            <>
              <div className="section-heading"><h2>Playbooks</h2><span>{playbookResults.length}</span></div>
              <div className="topic-grid">
                {playbookResults.map((playbook) => (
                  <Link className="topic-card" key={playbook.id} href={`/playbooks/${playbook.slug}`}>
                    <span className="topic-icon"><Steps size={19} /></span>
                    <div><h3>{playbook.title}</h3><p>{playbook.specialty}</p></div>
                    <span className="topic-card-meta">Playbook</span>
                  </Link>
                ))}
              </div>
            </>
          )}
          {settled && total === 0 && (
            <div className="empty-state"><span className="empty-icon"><Notebook size={22} /></span><h2>No matches yet</h2><p>Try an alias or shorter term.</p><Link className="button" href="/topics"><Notebook size={15} />Browse the curriculum</Link></div>
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
              <Link href="/playbooks" className="topic-card"><span className="topic-icon"><Steps size={19} /></span><span><h3>Open a procedure playbook</h3><p>How the operation goes, step by step</p></span><span className="topic-card-meta">{guides.length} playbooks</span></Link>
              <Link href="/saved" className="topic-card"><span className="topic-icon"><ClockCounterClockwise size={19} /></span><span><h3>Return to saved topics</h3><p>Private bookmarks available offline</p></span><span className="topic-card-meta"><BookmarkSimple size={14} /> On this device</span></Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
