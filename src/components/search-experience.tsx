"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookmarkSimple, ClockCounterClockwise, Notebook, Steps } from "@phosphor-icons/react";
import { RecentTopics } from "@/components/recent-topics";
import { FavoriteTopics } from "@/components/favorite-topics";
import { loadLibrary, loadPlaybooks } from "@/lib/library-client";
import type { Playbook, Topic } from "@/lib/types";

// Home as it stands until the Home slice replaces it. The shared field lives in the shell and the results
// are the /search page (`search-results.tsx`), so this body no longer draws a field or reads `?q=`.
export function SearchExperience() {
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [playbooks, setPlaybooks] = useState<Playbook[] | null>(null);
  // Two independent loads with independent states: one asset failing must not blank the other.
  useEffect(() => { loadLibrary().then((library) => setTopics(library.topics)).catch(() => setTopics([])); }, []);
  useEffect(() => { loadPlaybooks().then((library) => setPlaybooks(library.playbooks)).catch(() => setPlaybooks([])); }, []);
  const reviewed = topics ?? [];
  const guides = playbooks ?? [];
  const sectionsCovered = new Set(reviewed.map((topic) => topic.scoreNodeId)).size;
  return (
    <>
      <h1 className="visually-hidden">Pocket Chief</h1>
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
  );
}
