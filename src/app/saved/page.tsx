import type { Metadata } from "next";
import { SavedLibrary } from "@/components/saved-library";

export const metadata: Metadata = { title: "Saved" };

export default function SavedPage() {
  return (
    <div className="list-page">
      <h1 className="page-title">Saved</h1>
      <SavedLibrary />
    </div>
  );
}
