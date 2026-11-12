"use client";

import { useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo } from "react";
import { ListRow } from "@/components/list-row";
import { FailedRead, LoadingRows } from "@/components/read-states";
import { loadSearchIndex, useLoader } from "@/lib/library-client";
import { hitHref, hitLine, searchIndex } from "@/lib/search";

/**
 * The results page body: every match for `?q=`, in quick-results order, under a count. It reads the
 * query on the client (a static export has no request), so the page wraps it in its own Suspense
 * boundary. The shared field in the shell keeps the address in step by `replaceState` as the reader types.
 * Nothing but the failure message and the count is a live region, and the count appears only once the
 * whole index has arrived: a half-loaded index would call a real match "No matches".
 */
export function SearchResults() {
  // Deferred: scoring and drawing up to 159 rows is the one heavy step per keystroke, and at a 6x CPU slowdown it ran to about 90ms. Deferring lets the field echo the key first and drops a pass the next key overtakes.
  const query = useDeferredValue((useSearchParams().get("q") ?? "").trim());
  const index = useLoader(loadSearchIndex);
  const hits = useMemo(() => index.ready && query ? searchIndex(index.data, query) : [], [index.data, index.ready, query]);
  if (!query) return null; // the field is right above; the index still loads so the first keystroke finds it ready
  if (index.failed) return <FailedRead message="Search isn't available." retrying={index.retrying} retry={index.retry} />;
  if (index.loading) return <LoadingRows />;
  if (!hits.length) return (
    <>
      <p className="search-empty" role="status">No matches</p>
      <ul className="list-rows"><ListRow href="/topics" title="Browse topics" /><ListRow href="/playbooks" title="Browse playbooks" /></ul>
    </>
  );
  return (
    <>
      <p className="search-count" role="status">{hits.length} {hits.length === 1 ? "result" : "results"}</p>
      <ul className="list-rows">{hits.map((hit) => <ListRow key={hit.item.id} href={hitHref(hit)} title={hit.item.title} quiet={hitLine(hit)} trailing={hit.item.kind === "playbook" ? "Playbook" : undefined} />)}</ul>
    </>
  );
}
