import type { Metadata } from "next";
import { PlaybooksBrowser } from "@/components/playbooks-browser";
import { listPlaybooks } from "@/lib/library";

export const metadata: Metadata = { title: "Playbooks" };

export default function PlaybooksPage() {
  return (
    <>
      <div className="topics-index-heading">
        <div><p className="eyebrow">Operative guides</p><h1 className="page-title">Playbooks</h1><p className="page-lede">How the operation goes, step by step.</p></div>
      </div>
      <PlaybooksBrowser playbooks={listPlaybooks()} />
    </>
  );
}
