import type { Metadata } from "next";
import { ListRow } from "@/components/list-row";
import { listCategories } from "@/lib/categories";
import { categoryHref } from "@/lib/library-items";

export const metadata: Metadata = { title: "Topics" };

export default function TopicsPage() {
  return (
    <div className="list-page">
      <h1 className="page-title">Topics</h1>
      <ul className="list-rows">
        {listCategories().map(({ node, topicCount }) => <ListRow key={node.id} href={categoryHref(node.slug)} title={node.title} trailing={<span aria-hidden="true">{topicCount}</span>} />)}
      </ul>
    </div>
  );
}
