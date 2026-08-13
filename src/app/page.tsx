import Link from "next/link";
import { ClockCounterClockwise, Notebook, Plus } from "@phosphor-icons/react/dist/ssr";
import { SearchForm } from "@/components/search-form";
import { TopicCard } from "@/components/topic-card";
import { RecentTopics } from "@/components/recent-topics";
import { getRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const repository = await getRepository();
  const reviewed = (await repository.listTopics()).filter((topic) => topic.approvedVersion);
  const recent = await repository.listRecentTopics();
  const results = q ? await repository.searchTopics(q) : reviewed;
  const sectionCount = reviewed.reduce((count, topic) => count + (topic.approvedVersion?.blocks.filter((block) => block.type !== "references").length ?? 0), 0);
  return (
    <>
      <section className="search-hero">
        <p className="eyebrow">Private clinical atlas</p>
        <h1 className="page-title">The answer you need,<br />before the next case.</h1>
        <p className="page-lede">Search reviewed general surgery notes, decision flows, procedures, and high-yield board pearls.</p>
        <SearchForm defaultValue={q} />
        <p className="search-hint">Titles, aliases, headings, SCORE categories, body text, and tags · typo tolerant</p>
      </section>

      {q ? (
        <section className="section" aria-live="polite">
          <div className="section-heading"><h2>{results.length} {results.length === 1 ? "result" : "results"} for “{q}”</h2><Link href="/">Clear search</Link></div>
          {results.length ? <div className="topic-grid">{results.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div> : (
            <div className="empty-state"><span className="empty-icon"><Notebook size={22} /></span><h2>No reviewed topic matches yet</h2><p>Try an alias or shorter term. Drafts stay out of search until you approve every supported claim.</p><Link className="button" href="/add"><Plus size={15} />Add source notes</Link></div>
          )}
        </section>
      ) : (
        <>
          <div className="metric-strip" aria-label="Library summary">
            <div className="metric"><strong>{reviewed.length}</strong><span>Reviewed {reviewed.length === 1 ? "topic" : "topics"}</span></div>
            <div className="metric"><strong>{sectionCount}</strong><span>Structured sections</span></div>
            <div className="metric"><strong>Offline</strong><span>Ready after first visit</span></div>
          </div>
          <section className="section">
            <div className="section-heading"><h2>Recently reviewed</h2><Link href="/topics">Browse curriculum</Link></div>
            <RecentTopics fallback={recent.length ? recent : reviewed} />
          </section>
          <section className="section">
            <div className="section-heading"><h2>Continue building</h2><span>4 launch packets remaining</span></div>
            <div className="topic-grid">
              <Link href="/add" className="topic-card"><span className="topic-icon"><Plus size={19} /></span><span><h3>Add the next topic packet</h3><p>Paste notes and attach source details</p></span><span className="topic-card-meta">Online only</span></Link>
              <Link href="/saved" className="topic-card"><span className="topic-icon"><ClockCounterClockwise size={19} /></span><span><h3>Return to saved topics</h3><p>Private bookmarks available offline</p></span><span className="topic-card-meta">0 saved</span></Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
