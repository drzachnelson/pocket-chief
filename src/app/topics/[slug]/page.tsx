import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicContent } from "@/components/topic-content";
import { buildLinkIndex } from "@/lib/inline";
import { getTopicBySlug, listSources, listTaxonomy, listTopics } from "@/lib/library";
import { taxonomyAncestry } from "@/lib/taxonomy";
import { buildTopicNavigation, nextTopicInCategory } from "@/lib/topic-navigation";

/** One prerendered HTML file per authored topic; the export has no server to resolve a slug. */
export function generateStaticParams() {
  return listTopics().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getTopicBySlug(slug)?.title ?? "Topic" };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic?.approvedVersion) notFound();
  const version = topic.approvedVersion;
  const suppliedSources = listSources(version.sourceIds);
  const topics = listTopics();
  const linkEntries = buildLinkIndex(topics);
  const taxonomy = listTaxonomy();
  const ancestry = taxonomyAncestry(topic.scoreNodeId, taxonomy);
  const next = nextTopicInCategory(buildTopicNavigation(taxonomy, topics), topic.slug);
  const scorePath = ancestry.map((node) => node.title === "SCORE Curriculum" ? "SCORE" : node.title).join(" · ");
  const updatedAt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(topic.updatedAt));
  return (
    <div className="topic-reading">
      <header className="topic-header"><div><p className="eyebrow">{scorePath}</p><h1 className="page-title">{topic.title}</h1><p className="topic-updated">Last updated {updatedAt}</p></div></header>
      <TopicContent key={topic.id} topic={topic} sources={suppliedSources.filter((source) => version.sourceIds.includes(source.id))} linkEntries={linkEntries} nextTopic={next && { slug: next.topic.slug, label: next.topic.label, categoryLabel: next.categoryLabel }} />
    </div>
  );
}
