import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { TopicContent } from "@/components/topic-content";
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
  const suppliedSources = await repository.listSources(topic.approvedVersion.sourceIds);
  const blocks = topic.approvedVersion.blocks.filter((block) => block.heading && block.type !== "references");
  const ancestry = taxonomyAncestry(topic.scoreNodeId, await repository.listTaxonomy());
  return (
    <div className="topic-layout">
      <div>
        <nav className="breadcrumbs" aria-label="Breadcrumb">{ancestry.map((node) => <Fragment key={node.id}><Link href="/topics">{node.title === "SCORE Curriculum" ? "SCORE" : node.title}</Link><span>/</span></Fragment>)}<strong>{topic.title}</strong></nav>
        <header className="topic-header"><div><p className="eyebrow">{topic.scoreCategory}</p><h1 className="page-title">{topic.title}</h1><div className="tag-row">{topic.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div></header>
        <TopicContent topic={topic} sources={suppliedSources.filter((source) => topic.approvedVersion!.sourceIds.includes(source.id))} />
      </div>
      <aside className="topic-toc"><p>On this page</p>{blocks.map((block) => <a key={block.id} href={`#${block.id}`}>{block.heading}</a>)}<div className="toc-note"><strong>Source linked</strong><span>Every factual block is tied to supplied notes.</span></div></aside>
    </div>
  );
}
