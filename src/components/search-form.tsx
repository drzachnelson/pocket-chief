"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { loadLibrary } from "@/lib/library-client";
import { searchTopics } from "@/lib/search";
import type { Topic } from "@/lib/types";

// Next prefixes basePath onto <Link> and router navigations, but NOT onto a plain <form action>.
// Left as "/" this submits to the origin root, outside the mount point, and 404s in production.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue);
  const [cached, setCached] = useState<Topic[]>([]);
  const [offlineSearch, setOfflineSearch] = useState(false);
  // Resync the field when navigation changes the query prop. Adjusted during
  // render rather than in an effect, so there is no second render pass.
  const [lastDefault, setLastDefault] = useState(defaultValue);
  if (defaultValue !== lastDefault) { setLastDefault(defaultValue); setQuery(defaultValue); }
  useEffect(() => { loadLibrary().then((library) => setCached(library.topics)).catch(() => undefined); }, []);
  const quick = query.trim().length >= 2 ? searchTopics(query, cached).slice(0, 4) : [];
  return (
    <div className="search-field-wrap">
      <form className="search-field" action={`${basePath}/`} role="search" onSubmit={(event) => { if (!navigator.onLine) { event.preventDefault(); setOfflineSearch(true); } }}>
        <MagnifyingGlass size={20} aria-hidden="true" />
        <input name="q" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search Pocket Chief" placeholder="Search stones, procedures, classifications…" autoComplete="off" />
        <button className="button" type="submit">Search</button>
      </form>
      {quick.length > 0 && <div className="offline-results" aria-label="Cached search results">{quick.map((topic) => <Link key={topic.id} href={`/topics/${topic.slug}`}><span>{topic.title}</span><small>Available offline</small></Link>)}</div>}
      {offlineSearch && quick.length === 0 && <p className="search-hint" role="status">No cached topic matches this offline search.</p>}
    </div>
  );
}
