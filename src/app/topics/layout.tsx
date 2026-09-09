import { TopicsWorkspace } from "@/components/topics-workspace";
import { listTaxonomy, listTopics } from "@/lib/library";
import { buildTopicNavigation } from "@/lib/topic-navigation";

/** Build-time curriculum navigation, prerendered into every Topics route. */
export default function TopicsLayout({ children }: { children: React.ReactNode }) {
  return <TopicsWorkspace navigation={buildTopicNavigation(listTaxonomy(), listTopics())}>{children}</TopicsWorkspace>;
}
