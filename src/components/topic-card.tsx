import Link from "next/link";
import { ArrowRight, FirstAidKit } from "@phosphor-icons/react/dist/ssr";
import type { Topic } from "@/lib/types";

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link href={`/topics/${topic.slug}`} className="topic-card">
      <span className="topic-icon"><FirstAidKit size={19} weight="duotone" /></span>
      <span>
        <h3>{topic.title}</h3>
        <p>{topic.scoreCategory}</p>
      </span>
      <span className="topic-card-meta">
        <span className="status-pill"><span className="status-dot" />Reviewed</span>
        <ArrowRight size={14} aria-hidden="true" />
      </span>
    </Link>
  );
}
