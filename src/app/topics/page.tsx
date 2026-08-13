import type { Metadata } from "next";
import { TopicCard } from "@/components/topic-card";
import { getRepository } from "@/lib/repository";

export const metadata: Metadata = { title: "Topics" };

export const dynamic = "force-dynamic";

export default async function TopicsPage() {
  const repository = await getRepository();
  const taxonomy = await repository.listTaxonomy();
  const topics = (await repository.listTopics()).filter((topic) => topic.approvedVersion);
  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">Editable curriculum</p><h1 className="page-title">Topics</h1><p className="page-lede">Browse the SCORE hierarchy. Only the newest approved version is visible here and in search.</p></div></div>
      <div className="curriculum-layout">
        <aside className="curriculum-tree" aria-label="SCORE curriculum">
          {taxonomy.map((node, index) => <div key={node.id} className={`tree-node depth-${Math.min(index, 2)}`}><span>{node.title}</span><small>{topics.filter((topic) => topic.scoreNodeId === node.id).length || ""}</small></div>)}
        </aside>
        <section>
          <div className="section-heading"><h2>Biliary Tract</h2><span>Last updated Aug 12</span></div>
          <div className="topic-grid single">{topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>
          <div className="launch-slots"><p>Launch library</p><strong>{Math.min(topics.length, 5)} of 5 packets received</strong><div className="progress-track"><span style={{ width: `${Math.min(topics.length / 5, 1) * 100}%` }} /></div><small>The remaining {Math.max(5 - topics.length, 0)} topic slots will be populated from your next source packets.</small></div>
        </section>
      </div>
    </>
  );
}
