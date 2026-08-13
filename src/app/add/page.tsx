import type { Metadata } from "next";
import { AddNoteForm } from "@/components/add-note-form";

export const metadata: Metadata = { title: "Add topic" };

export default function AddPage() {
  return <><div className="page-heading"><div><p className="eyebrow">Source-first drafting</p><h1 className="page-title">Add a topic</h1><p className="page-lede">Turn your notes into a structured draft. Nothing becomes searchable until you directly approve it.</p></div></div><AddNoteForm /></>;
}
