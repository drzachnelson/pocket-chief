import type { Metadata } from "next";
import { TopicCard } from "@/components/topic-card";
import { getRepository } from "@/lib/repository";
import { taxonomyDepth } from "@/lib/taxonomy";

export const metadata: Metadata = { title: "Topics" };

export const dynamic = "force-dynamic";

export default async function TopicsPage() {
  const repository = await getRepository();
  const taxonomy = await repository.listTaxonomy();
  const topics = (await repository.listTopics()).filter((topic) => topic.approvedVersion);
  const sections = taxonomy
    .map((node) => ({ node, topics: topics.filter((topic) => topic.scoreNodeId === node.id) }))
    .filter((section) => section.topics.length > 0)
    .map((section) => ({
      ...section,
      updatedLabel: new Date(Math.max(...section.topics.map((topic) => Date.parse(topic.updatedAt)))).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
    }));
  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">Editable curriculum</p><h1 className="page-title">Topics</h1><p className="page-lede">Browse the SCORE hierarchy. Only the newest approved version is visible here and in search.</p></div></div>
      <div className="curriculum-layout">
        <aside className="curriculum-tree" aria-label="SCORE curriculum">
          {taxonomy.map((node) => <div key={node.id} className={`tree-node depth-${Math.min(taxonomyDepth(node.id, taxonomy), 2)}`}><span>{node.title}</span><small>{topics.filter((topic) => topic.scoreNodeId === node.id).length || ""}</small></div>)}
        </aside>
        <section>
          {sections.map((section) => (
            <div key={section.node.id}>
              <div className="section-heading"><h2>{section.node.title}</h2><span>Last updated {section.updatedLabel}</span></div>
              <div className={`topic-grid${section.topics.length === 1 ? " single" : ""}`}>{section.topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>
            </div>
          ))}
          <div className="launch-slots"><p>Library</p><strong>{topics.length} reviewed {topics.length === 1 ? "topic" : "topics"} across {sections.length} {sections.length === 1 ? "section" : "sections"}</strong><small>Every topic here is source-linked and approved. Add the next SCORE packet to keep building.</small></div>
        </section>
      </div>
    </>
  );
}
