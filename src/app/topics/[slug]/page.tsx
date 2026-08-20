import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicContent } from "@/components/topic-content";
import { buildLinkIndex } from "@/lib/inline";
import { getRepository } from "@/lib/repository";
import { taxonomyAncestry } from "@/lib/taxonomy";

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
  const linkEntries = buildLinkIndex(await repository.listTopics());
  const ancestry = taxonomyAncestry(topic.scoreNodeId, await repository.listTaxonomy());
  const scorePath = ancestry.map((node) => node.title === "SCORE Curriculum" ? "SCORE" : node.title).join(" · ");
  const updatedAt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(topic.updatedAt));
  return (
    <div className="topic-reading">
      <header className="topic-header"><div><p className="eyebrow">{scorePath}</p><h1 className="page-title">{topic.title}</h1><p className="topic-updated">Last updated {updatedAt}</p></div></header>
      <TopicContent topic={topic} sources={suppliedSources.filter((source) => version.sourceIds.includes(source.id))} linkEntries={linkEntries} />
    </div>
  );
}
