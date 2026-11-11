import { Contents } from "@/components/contents";
import { topicContents, topicSlugs } from "@/lib/reader-contents";

// The laptop sidebar's Contents for a topic page, rendered at build time into the page's HTML. The shell hides the slot below 1080px and on every other route.
export const generateStaticParams = topicSlugs;

export default async function TopicContents({ params }: { params: Promise<{ slug: string }> }) {
  const data = topicContents((await params).slug);
  return data && <Contents data={data} />;
}
