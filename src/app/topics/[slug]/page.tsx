import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicContent } from "@/components/topic-content";
import { buildLinkIndex } from "@/lib/inline";
import { getRepository } from "@/lib/repository";
import { taxonomyAncestry } from "@/lib/taxonomy";
import { buildTopicNavigation, nextTopicInCategory } from "@/lib/topic-navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = await (await getRepository()).getTopicBySlug(slug);
  return { title: topic?.title ?? "Topic" };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repository = await getRepository();
  const topic = await repository.getTopicBySlug(slug);
  if (!topic?.approvedVersion) notFound();
  const version = topic.approvedVersion;
  const suppliedSources = await repository.listSources(version.sourceIds);
  const topics = await repository.listTopics();
  const taxonomy = await repository.listTaxonomy();
  const linkEntries = buildLinkIndex(topics);
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
