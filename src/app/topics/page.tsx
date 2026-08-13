import type { Metadata } from "next";
import { TopicCard } from "@/components/topic-card";
import { demoTopics, taxonomy } from "@/lib/seed";

export const metadata: Metadata = { title: "Topics" };

export default function TopicsPage() {
  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">Editable curriculum</p><h1 className="page-title">Topics</h1><p className="page-lede">Browse the SCORE hierarchy. Only the newest approved version is visible here and in search.</p></div></div>
      <div className="curriculum-layout">
        <aside className="curriculum-tree" aria-label="SCORE curriculum">
          {taxonomy.map((node, index) => <div key={node.id} className={`tree-node depth-${index}`}><span>{node.title}</span><small>{node.id === "biliary" ? "1 reviewed" : ""}</small></div>)}
        </aside>
        <section>
          <div className="section-heading"><h2>Biliary Tract</h2><span>Last updated Aug 12</span></div>
          <div className="topic-grid single">{demoTopics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>
          <div className="launch-slots"><p>Launch library</p><strong>1 of 5 packets received</strong><div className="progress-track"><span style={{ width: "20%" }} /></div><small>The remaining four topic slots will be populated from your next source packets.</small></div>
        </section>
      </div>
    </>
  );
}
