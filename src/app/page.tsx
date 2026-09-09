import { Suspense } from "react";
import { SearchExperience } from "@/components/search-experience";

// `useSearchParams` needs a Suspense boundary to prerender: the static HTML is built without a
// query string and the client fills it in on hydration.
export default function SearchPage() {
  return <Suspense fallback={<div className="loading-stack"><div className="skeleton card" /><div className="skeleton card" /></div>}><SearchExperience /></Suspense>;
}
