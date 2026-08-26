import Link from "next/link";
import { Notebook } from "@phosphor-icons/react/dist/ssr";
import { SearchForm } from "@/components/search-form";
import { TopicCard } from "@/components/topic-card";
import { RecentTopics } from "@/components/recent-topics";
import { FavoriteTopics } from "@/components/favorite-topics";
import { getRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const repository = await getRepository();
  const reviewed = (await repository.listTopics()).filter((topic) => topic.approvedVersion);
  const recent = await repository.listRecentTopics();
  const results = q ? await repository.searchTopics(q) : reviewed;
  const favorites = await repository.listBookmarkedTopics();
  return (
    <>
      <section className="search-hero">
        <p className="eyebrow">Private clinical atlas</p>
        <h1 className="visually-hidden">Pocket Chief</h1>
        <p className="page-lede">Search general surgery notes, decision flows, procedures, and high-yield board pearls.</p>
        <SearchForm defaultValue={q} />
        <p className="search-hint">Titles, aliases, headings, SCORE categories, body text, and tags · typo tolerant</p>
      </section>

      {q ? (
        <section className="section" aria-live="polite">
          <div className="section-heading"><h2>{results.length} {results.length === 1 ? "result" : "results"} for “{q}”</h2><Link href="/">Clear search</Link></div>
          {results.length ? <div className="topic-grid">{results.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div> : (
            <div className="empty-state"><span className="empty-icon"><Notebook size={22} /></span><h2>No topic matches yet</h2><p>Try an alias or shorter term, or browse the SCORE curriculum.</p><Link className="button" href="/topics">Browse SCORE topics</Link></div>
          )}
        </section>
      ) : (
        <>
          <section className="section">
            <div className="section-heading"><h2>Recently viewed</h2><Link href="/topics">Browse curriculum</Link></div>
            <RecentTopics fallback={recent.length ? recent : reviewed.slice(0, 6)} />
          </section>
          <section className="section">
            <div className="section-heading"><h2>Favorites</h2><Link href="/saved">View all saved</Link></div>
            <FavoriteTopics fallback={favorites} />
          </section>
        </>
      )}
    </>
  );
}
