import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { ReaderEnd } from "@/components/reader-end";
import { TopicContent } from "@/components/topic-content";
import { buildLinkIndex } from "@/lib/inline";
import { getTopicBySlug, listSources, listTaxonomy, listTopics } from "@/lib/library";
import { categoryHref } from "@/lib/library-items";
import { curriculumRootSlug, taxonomyAncestry } from "@/lib/taxonomy";
import { topicContents } from "@/lib/reader-contents";
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
  // Category, then group when the topic sits in one. The curriculum root is a container and never shown.
  const [category, group] = taxonomyAncestry(topic.scoreNodeId, taxonomy).filter((node) => node.slug !== curriculumRootSlug);
  const next = nextTopicInCategory(buildTopicNavigation(taxonomy, topics), topic.slug);
  const categoryLink = category && { label: category.title, href: categoryHref(category.slug) };
  const crumbs = categoryLink ? [categoryLink, ...(group ? [{ label: group.title, href: `${categoryLink.href}#${group.slug}` }] : [])] : [];
  return (
    <div className="topic-reading">
      <TopicContent key={topic.id} topic={topic} sources={suppliedSources} linkEntries={linkEntries} contents={topicContents(slug)!} breadcrumb={<Breadcrumb items={crumbs} />} category={categoryLink} nextTopic={next && { slug: next.topic.slug, label: next.topic.label, categoryLabel: next.categoryLabel }} />
      <ReaderEnd updatedAt={topic.updatedAt} />
    </div>
  );
}
