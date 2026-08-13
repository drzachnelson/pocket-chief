import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TopicContent } from "@/components/topic-content";
import { demoTopics, suppliedSources } from "@/lib/seed";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = demoTopics.find((item) => item.slug === slug);
  return { title: topic?.title ?? "Topic" };
}

export function generateStaticParams() { return demoTopics.map(({ slug }) => ({ slug })); }

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = demoTopics.find((item) => item.slug === slug);
  if (!topic?.approvedVersion) notFound();
  const blocks = topic.approvedVersion.blocks.filter((block) => block.heading && block.type !== "references");
  return (
    <div className="topic-layout">
      <div>
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/topics">SCORE</Link><span>/</span><Link href="/topics">Biliary Tract</Link><span>/</span><strong>{topic.title}</strong></nav>
        <header className="topic-header"><div><p className="eyebrow">{topic.scoreCategory}</p><h1 className="page-title">{topic.title}</h1><div className="tag-row">{topic.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div></header>
        <TopicContent topic={topic} sources={suppliedSources.filter((source) => topic.approvedVersion!.sourceIds.includes(source.id))} />
      </div>
      <aside className="topic-toc"><p>On this page</p>{blocks.map((block) => <a key={block.id} href={`#${block.id}`}>{block.heading}</a>)}<div className="toc-note"><strong>Source linked</strong><span>Every factual block is tied to supplied notes.</span></div></aside>
    </div>
  );
}
