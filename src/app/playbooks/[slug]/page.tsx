import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { PlaybookContent } from "@/components/playbook-content";
import { ReaderEnd } from "@/components/reader-end";
import { buildLinkIndex } from "@/lib/inline";
import { getPlaybookBySlug, listPlaybooks, listSources, listTopics } from "@/lib/library";
import { specialtyId } from "@/lib/library-items";
import { playbookContents } from "@/lib/reader-contents";
import { APPROACH_LABELS } from "@/lib/types";

/** One prerendered HTML file per playbook; the export has no server to resolve a slug. */
export function generateStaticParams() {
  return listPlaybooks().map((playbook) => ({ slug: playbook.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getPlaybookBySlug(slug)?.title ?? "Playbook" };
}

export default async function PlaybookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const playbook = getPlaybookBySlug(slug);
  if (!playbook) notFound();
  const sources = listSources(playbook.sourceIds);
  // Topics only. `InlineText` hardcodes /topics/<slug>, so a playbook cross-links *into* the
  // curriculum — the useful direction — and linking back out needs an href on LinkIndexEntry.
  const linkEntries = buildLinkIndex(listTopics());
  return (
    <div className="topic-reading">
      <PlaybookContent key={playbook.id} playbook={playbook} sources={sources} linkEntries={linkEntries} contents={playbookContents(slug)!} breadcrumb={<Breadcrumb items={[{ label: playbook.specialty, href: `/playbooks#${specialtyId(playbook.specialty)}` }, { label: APPROACH_LABELS[playbook.approach] }]} />} />
      <ReaderEnd updatedAt={playbook.updatedAt} />
    </div>
  );
}
