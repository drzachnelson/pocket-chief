import type { Metadata } from "next";
import { SavedLibrary } from "@/components/saved-library";

export const metadata: Metadata = { title: "Saved" };

export default function SavedPage() {
  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">Private library</p><h1 className="page-title">Saved</h1><p className="page-lede">Bookmarked topics are cached on this device for fast offline access.</p></div></div>
      <SavedLibrary />
    </>
  );
}
