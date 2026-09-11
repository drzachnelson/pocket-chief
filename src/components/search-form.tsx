"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { loadLibrary, loadPlaybooks } from "@/lib/library-client";
import { searchPlaybooks, searchTopics } from "@/lib/search";
import type { Playbook, Topic } from "@/lib/types";

// Next prefixes basePath onto <Link> and router navigations, but NOT onto a plain <form action>.
// Left as "/" this submits to the origin root, outside the mount point, and 404s in production.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue);
  const [cached, setCached] = useState<Topic[]>([]);
  const [cachedPlaybooks, setCachedPlaybooks] = useState<Playbook[]>([]);
  const [offlineSearch, setOfflineSearch] = useState(false);
  // Resync the field when navigation changes the query prop. Adjusted during
  // render rather than in an effect, so there is no second render pass.
  const [lastDefault, setLastDefault] = useState(defaultValue);
  if (defaultValue !== lastDefault) { setLastDefault(defaultValue); setQuery(defaultValue); }
  useEffect(() => { loadLibrary().then((library) => setCached(library.topics)).catch(() => undefined); }, []);
  useEffect(() => { loadPlaybooks().then((library) => setCachedPlaybooks(library.playbooks)).catch(() => undefined); }, []);
  // Quick results mix both corpora, so an offline search for an operation finds its guide. Each
  // carries its own href, which is why they are shaped into a common list rather than ranked as
  // one — the two scorers run over different identity fields.
  const ready = query.trim().length >= 2;
  const quick = [
    ...(ready ? searchTopics(query, cached).slice(0, 3).map((topic) => ({ id: topic.id, title: topic.title, href: `/topics/${topic.slug}` })) : []),
    ...(ready ? searchPlaybooks(query, cachedPlaybooks).slice(0, 2).map((playbook) => ({ id: playbook.id, title: playbook.title, href: `/playbooks/${playbook.slug}` })) : []),
  ];
  return (
    <div className="search-field-wrap">
      <form className="search-field" action={`${basePath}/`} role="search" onSubmit={(event) => { if (!navigator.onLine) { event.preventDefault(); setOfflineSearch(true); } }}>
        <MagnifyingGlass size={20} aria-hidden="true" />
        <input name="q" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search Pocket Chief" placeholder="Search stones, procedures, classifications…" autoComplete="off" />
        <button className="button" type="submit">Search</button>
      </form>
      {quick.length > 0 && <div className="offline-results" aria-label="Cached search results">{quick.map((entry) => <Link key={entry.id} href={entry.href}><span>{entry.title}</span><small>Available offline</small></Link>)}</div>}
      {offlineSearch && quick.length === 0 && <p className="search-hint" role="status">Nothing cached on this device matches that search.</p>}
    </div>
  );
}
