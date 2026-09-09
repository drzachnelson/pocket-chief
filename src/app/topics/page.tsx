import type { Metadata } from "next";
import { TopicsBrowser } from "@/components/topics-browser";
import { TopicsResume } from "@/components/topics-resume";
import { listTaxonomy, listTopics } from "@/lib/library";
import { buildTopicNavigation, flattenTopicNavigation } from "@/lib/topic-navigation";

export const metadata: Metadata = { title: "Topics" };

export default function TopicsPage() {
  const topics = listTopics();
  const navigation = buildTopicNavigation(listTaxonomy(), topics);
  const fallbackSlug = flattenTopicNavigation(navigation)[0]?.topic.slug;
  return (
    <>
      <div className="topics-index-heading">
        <div><p className="eyebrow">SCORE curriculum</p><h1 className="page-title">Topics</h1><p className="page-lede">Browse the SCORE hierarchy.</p></div>
        <TopicsResume fallbackSlug={fallbackSlug} approvedTopics={topics.map(({ id, slug }) => ({ id, slug }))} />
      </div>
      <TopicsBrowser navigation={navigation} />
    </>
  );
}
