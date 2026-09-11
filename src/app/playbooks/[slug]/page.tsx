import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaybookContent } from "@/components/playbook-content";
import { buildLinkIndex } from "@/lib/inline";
import { getPlaybookBySlug, listPlaybooks, listSources, listTopics } from "@/lib/library";

const APPROACH_LABELS = { open: "Open", laparoscopic: "Laparoscopic", robotic: "Robotic", endovascular: "Endovascular" } as const;

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
  // UTC so the printed date does not shift with the build machine's timezone.
  const updatedAt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(playbook.updatedAt));
  return (
    <div className="topic-reading">
      <header className="topic-header">
        <div>
          <p className="eyebrow">{playbook.specialty} · {APPROACH_LABELS[playbook.approach]}</p>
          <h1 className="page-title">{playbook.title}</h1>
          <p className="topic-updated">Last updated {updatedAt}</p>
        </div>
      </header>
      <PlaybookContent key={playbook.id} playbook={playbook} sources={sources} linkEntries={linkEntries} />
    </div>
  );
}
