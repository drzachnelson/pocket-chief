import type { Metadata } from "next";
import { AddNoteForm } from "@/components/add-note-form";
import { getRepository } from "@/lib/repository";

export const metadata: Metadata = { title: "Add topic" };

export const dynamic = "force-dynamic";

export default async function AddPage() {
  const taxonomy = await (await getRepository()).listTaxonomy();
  return <><div className="page-heading"><div><p className="eyebrow">Source-first drafting</p><h1 className="page-title">Add a topic</h1><p className="page-lede">Turn your notes into a structured draft. Nothing becomes searchable until you directly approve it.</p></div></div><AddNoteForm taxonomy={taxonomy} /></>;
}
