import type { Metadata } from "next";
import { TopicsResume } from "@/components/topics-resume";
import { listTaxonomy, listTopics } from "@/lib/library";
import { buildTopicNavigation } from "@/lib/topic-navigation";

export const metadata: Metadata = { title: "Topics" };

export default function TopicsPage() {
  const topics = listTopics();
  const navigation = buildTopicNavigation(listTaxonomy(), topics);
  const fallbackSlug = navigation.flatMap((category) => [...category.topics, ...category.children.flatMap((section) => section.topics)])[0]?.slug;
  return (
    <div className="topics-index-heading">
      <div><p className="eyebrow">SCORE curriculum</p><h1 className="page-title">Topics</h1><p className="page-lede">Browse the SCORE hierarchy.</p></div>
      <TopicsResume fallbackSlug={fallbackSlug} approvedTopics={topics.map(({ id, slug }) => ({ id, slug }))} />
    </div>
  );
}
