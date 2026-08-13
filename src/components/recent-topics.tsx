"use client";

import { useEffect, useState } from "react";
import { TopicCard } from "@/components/topic-card";
import { getRecentTopics } from "@/lib/offline";
import type { Topic } from "@/lib/types";

export function RecentTopics({ fallback }: { fallback: Topic[] }) {
  const [topics, setTopics] = useState(fallback);
  useEffect(() => { getRecentTopics().then((recent) => { if (recent.length) setTopics(recent); }).catch(() => undefined); }, []);
  return <div className="topic-grid">{topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>;
}
