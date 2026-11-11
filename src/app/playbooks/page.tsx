import type { Metadata } from "next";
import { ListRow } from "@/components/list-row";
import { listPlaybookSummaries } from "@/lib/library";
import { specialtyId } from "@/lib/library-items";

export const metadata: Metadata = { title: "Playbooks" };

/** Specialties alphabetical, titles alphabetical inside each: the order Contents uses too. Approach is not a group or a filter, so every row is just its title. */
export default function PlaybooksPage() {
  const bySpecialty = new Map<string, ReturnType<typeof listPlaybookSummaries>>();
  for (const playbook of [...listPlaybookSummaries()].sort((a, b) => a.title.localeCompare(b.title))) bySpecialty.set(playbook.specialty, [...bySpecialty.get(playbook.specialty) ?? [], playbook]);
  return (
    <div className="list-page">
      <h1 className="page-title">Playbooks</h1>
      {[...bySpecialty].sort(([a], [b]) => a.localeCompare(b)).map(([specialty, playbooks]) => (
        <section key={specialty}>
          <h2 className="list-heading" id={specialtyId(specialty)}><span>{specialty}</span><span aria-hidden="true">{playbooks.length}</span></h2>
          <ul className="list-rows">{playbooks.map(({ slug, title }) => <ListRow key={slug} href={`/playbooks/${slug}`} title={title} />)}</ul>
        </section>
      ))}
    </div>
  );
}
