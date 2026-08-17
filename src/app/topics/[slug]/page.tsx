import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { TopicContent } from "@/components/topic-content";
import { TopicOutline, TopicOutlineTrigger } from "@/components/topic-outline";
import { buildLinkIndex, headingLevel } from "@/lib/inline";
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
  // `↳ ` only ever means "subsection", so the outline reads the level off the heading exactly the
  // way the renderer does rather than keeping a second notion of nesting.
  const sections = version.blocks.filter((block) => block.heading && block.type !== "references").map((block) => { const { level, text } = headingLevel(block.heading!); return { id: block.id, heading: text, level }; });
  // Built here rather than in the client: the whole library is already on the server, and the
  // index is a plain array precisely so it survives the RSC boundary.
  const linkEntries = buildLinkIndex(await repository.listTopics());
  const ancestry = taxonomyAncestry(topic.scoreNodeId, await repository.listTaxonomy());
  return (
    <div className="topic-layout">
      <div>
        <nav className="breadcrumbs" aria-label="Breadcrumb">{ancestry.map((node) => <Fragment key={node.id}><Link href="/topics">{node.title === "SCORE Curriculum" ? "SCORE" : node.title}</Link><span>/</span></Fragment>)}<strong>{topic.title}</strong></nav>
        <header className="topic-header"><div><p className="eyebrow">{topic.scoreCategory}</p><h1 className="page-title">{topic.title}</h1><div className="tag-row">{topic.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div><TopicOutlineTrigger sections={sections} title={topic.title} reviewedAt={version.reviewedAt} /></header>
        <TopicContent topic={topic} sources={suppliedSources.filter((source) => version.sourceIds.includes(source.id))} linkEntries={linkEntries} />
      </div>
      <TopicOutline sections={sections} />
    </div>
  );
}
