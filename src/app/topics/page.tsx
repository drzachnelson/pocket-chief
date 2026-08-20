import type { Metadata } from "next";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { CurriculumOpenState } from "@/components/curriculum-open-state";
import { TopicCard } from "@/components/topic-card";
import { TopicsResume } from "@/components/topics-resume";
import { getRepository } from "@/lib/repository";
import { taxonomySections } from "@/lib/taxonomy";

export const metadata: Metadata = { title: "Topics" };

export const dynamic = "force-dynamic";

const updatedFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export default async function TopicsPage({ searchParams }: { searchParams: Promise<{ closed?: string }> }) {
  const [{ closed }, repository] = await Promise.all([searchParams, getRepository()]);
  const closedIds = new Set((closed ?? "").split(",").filter(Boolean));
  const [taxonomy, listedTopics, recentTopics] = await Promise.all([repository.listTaxonomy(), repository.listTopics(), repository.listRecentTopics(1)]);
  const topics = listedTopics.filter((topic) => topic.approvedVersion);
  const sections = taxonomySections(taxonomy, topics);
  const stocked = sections.filter((section) => section.topicCount > 0);
  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">Editable curriculum</p><h1 className="page-title">Topics</h1><p className="page-lede">Browse the SCORE hierarchy. Only the newest approved version is visible here and in search.</p></div><TopicsResume recentSlug={recentTopics[0]?.slug} fallbackSlug={topics[0]?.slug} /></div>
      <div className="curriculum-layout">
        <nav className="curriculum-rail" aria-label="SCORE categories">
          <p>Curriculum</p>
          {sections.map((section) => <a key={section.node.id} href={`#${section.node.slug}`} aria-label={`${section.node.title}, ${section.topicCount} approved ${section.topicCount === 1 ? "topic" : "topics"}`}><span>{section.node.title}</span><small aria-hidden="true">{section.topicCount || "—"}</small></a>)}
        </nav>
        <div className="curriculum-sections">
          {sections.map((section) => {
            const updatedLabel = section.topicCount ? updatedFormat.format(new Date(Math.max(...[...section.topics, ...section.subsections.flatMap((subsection) => subsection.topics)].map((topic) => Date.parse(topic.updatedAt))))) : null;
            return (
              <details key={section.node.id} id={section.node.slug} data-node-id={section.node.id} data-empty={section.topicCount === 0 ? "true" : undefined} className="curriculum-section" open={section.topicCount > 0 && !closedIds.has(section.node.id)}>
                <summary>
                  <span className="curriculum-disclosure" aria-hidden="true"><CaretDown size={13} weight="bold" /></span>
                  <h2>{section.node.title}</h2>
                  <span className="curriculum-section-meta">{section.topicCount ? `${section.topicCount} ${section.topicCount === 1 ? "topic" : "topics"} · ${updatedLabel}` : "Not started"}</span>
                </summary>
                {section.topics.length > 0 && <div className="curriculum-subsection"><div className="topic-grid">{section.topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div></div>}
                {section.subsections.map((subsection) => (
                  <div key={subsection.node.id} className="curriculum-subsection">
                    <h3>{subsection.node.title}</h3>
                    <div className="topic-grid">{subsection.topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>
                  </div>
                ))}
                {section.topicCount === 0 && <p className="curriculum-empty">No approved topics in this category yet.</p>}
              </details>
            );
          })}
          <div className="launch-slots"><p>Library</p><strong>{topics.length} reviewed {topics.length === 1 ? "topic" : "topics"} across {stocked.length} {stocked.length === 1 ? "category" : "categories"}</strong><small>Every topic here is source-linked and approved. Add the next SCORE packet to keep building.</small></div>
        </div>
        <CurriculumOpenState />
      </div>
    </>
  );
}
