import { TopicsWorkspace } from "@/components/topics-workspace";
import { getRepository } from "@/lib/repository";
import { buildTopicNavigation } from "@/lib/topic-navigation";

export const dynamic = "force-dynamic";

/** Server-builds the lightweight curriculum navigation once for every persistent Topics route. */
export default async function TopicsLayout({ children }: { children: React.ReactNode }) {
  const repository = await getRepository();
  const [taxonomy, topics] = await Promise.all([repository.listTaxonomy(), repository.listTopics()]);
  return <TopicsWorkspace navigation={buildTopicNavigation(taxonomy, topics)}>{children}</TopicsWorkspace>;
}
