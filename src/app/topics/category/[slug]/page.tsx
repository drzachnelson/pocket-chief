import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListRow } from "@/components/list-row";
import { listCategories } from "@/lib/categories";
import type { Topic } from "@/lib/types";

/** One prerendered page per category with topics; the export has no server to resolve a slug. */
export function generateStaticParams() {
  return listCategories().map(({ node }) => ({ slug: node.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: listCategories().find(({ node }) => node.slug === slug)?.node.title ?? "Topics" };
}

const rows = (topics: Topic[]) => <ul className="list-rows">{topics.map(({ id, slug, title }) => <ListRow key={id} href={`/topics/${slug}`} title={title} />)}</ul>;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = listCategories().find(({ node }) => node.slug === slug);
  if (!category) notFound();
  return (
    <div className="list-page">
      <h1 className="page-title">{category.node.title}</h1>
      {/* Topics filed straight under the category come first, with no heading. */}
      {category.topics.length > 0 && rows(category.topics)}
      {category.subsections.map(({ node, topics }) => (
        <section key={node.id}>
          <h2 className="list-heading" id={node.slug}><span>{node.title}</span><span aria-hidden="true">{topics.length}</span></h2>
          {rows(topics)}
        </section>
      ))}
    </div>
  );
}
