import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingRows } from "@/components/read-states";
import { SearchResults } from "@/components/search-results";

export const metadata: Metadata = { title: "Search" };

// `useSearchParams` needs its own Suspense boundary to prerender: the static HTML is built without a
// query and the client reads `?q=` on hydration. The shared field is in the shell, outside this boundary.
export default function SearchPage() {
  return (
    <div className="list-page">
      <h1 className="visually-hidden">Search results</h1>
      <Suspense fallback={<LoadingRows />}><SearchResults /></Suspense>
    </div>
  );
}
