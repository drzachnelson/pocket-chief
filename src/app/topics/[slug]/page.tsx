import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
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
  return (
    <div className="topic-reading">
      <nav className="breadcrumbs" aria-label="Breadcrumb">{ancestry.map((node) => <Fragment key={node.id}><Link href="/topics">{node.title === "SCORE Curriculum" ? "SCORE" : node.title}</Link><span>/</span></Fragment>)}<strong>{topic.title}</strong></nav>
      <header className="topic-header"><div><p className="eyebrow">{topic.scoreCategory}</p><h1 className="page-title">{topic.title}</h1><div className="tag-row">{topic.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div></header>
      <TopicContent topic={topic} sources={suppliedSources.filter((source) => version.sourceIds.includes(source.id))} linkEntries={linkEntries} />
    </div>
  );
}
