import type { Metadata } from "next";
import { TopicsBrowser } from "@/components/topics-browser";
import { TopicsResume } from "@/components/topics-resume";
import { getRepository } from "@/lib/repository";
import { buildTopicNavigation, flattenTopicNavigation } from "@/lib/topic-navigation";

export const metadata: Metadata = { title: "Topics" };

export const dynamic = "force-dynamic";

export default async function TopicsPage() {
  const repository = await getRepository();
  const [taxonomy, listedTopics, recentTopics] = await Promise.all([repository.listTaxonomy(), repository.listTopics(), repository.listRecentTopics(1)]);
  const topics = listedTopics.filter((topic) => topic.approvedVersion);
  const navigation = buildTopicNavigation(taxonomy, topics);
  const fallbackSlug = flattenTopicNavigation(navigation)[0]?.topic.slug;
  return (
    <>
      <div className="topics-index-heading">
        <div><p className="eyebrow">SCORE curriculum</p><h1 className="page-title">Topics</h1><p className="page-lede">Browse the SCORE hierarchy.</p></div>
        <TopicsResume recentSlug={recentTopics[0]?.slug} fallbackSlug={fallbackSlug} approvedTopics={topics.map(({ id, slug }) => ({ id, slug }))} />
      </div>
      <TopicsBrowser navigation={navigation} />
    </>
  );
}
