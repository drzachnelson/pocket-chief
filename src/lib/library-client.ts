import { useCallback, useEffect, useState } from "react";
import { cacheApprovedTopic, cacheTaxonomy, getCachedTaxonomy, getCachedTopics, getRecentEntries, getSavedEntries } from "@/lib/offline";
import type { Playbook, RecentEntry, SavedEntry, TaxonomyNode, Topic } from "@/lib/types";

export interface Library { topics: Topic[]; taxonomy: TaxonomyNode[] }

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

let inFlight: Promise<Library> | undefined;

async function fetchLibrary(): Promise<Library> {
  const response = await fetch(`${basePath}/library.json`);
  if (!response.ok) throw new Error("The library asset is unavailable.");
  return await response.json() as Library;
}

/**
 * Best effort, and deliberately not awaited by the caller. Seeding exists so a *later* cold
 * offline start has content; it has no bearing on the library being returned now. Awaiting it
 * meant a blocked IndexedDB open — which neither resolves nor rejects, so `.catch()` cannot
 * rescue it — left search and quick search permanently empty even though `library.json`
 * downloaded fine. Every write starts synchronously here so callers can still observe that
 * seeding was attempted.
 */
function seedCache(library: Library) {
  void Promise.all([
    cacheTaxonomy(library.taxonomy).catch(() => undefined),
    ...library.topics.map((topic) => cacheApprovedTopic(topic).catch(() => undefined)),
  ]);
}

/**
 * The shipped asset is the source of truth, and every successful load reseeds IndexedDB so a later
 * cold offline start still has content. A failed fetch falls back to whatever the device already
 * cached — the service worker usually answers first, so this path only runs on a device that has
 * never completed a load. A non-empty topic cache counts as the topics half of the library; an
 * empty one is a failure, reported by rejecting, never as an empty library that reads as "nothing
 * here". The rejection is the caller's cue to say so and offer a retry.
 *
 * Memoized per page load: search, the offline hydrator and the saved view all ask for it, and
 * concurrent callers share one attempt. A failed attempt clears the memo so the next call retries.
 */
export async function loadLibrary(): Promise<Library> {
  inFlight ??= fetchLibrary()
    .then((library) => { seedCache(library); return library; })
    .catch(async () => {
      inFlight = undefined; // don't let one bad attempt poison the rest of the page session — only its own awaiters see this outcome; the next call retries the network
      const topics = await getCachedTopics().catch(() => [] as Topic[]);
      if (!topics.length) throw new Error("The library is unavailable.");
      return { topics, taxonomy: await getCachedTaxonomy().catch(() => [] as TaxonomyNode[]) };
    });
  return inFlight;
}

export interface PlaybookLibrary { playbooks: Playbook[] }

let playbooksInFlight: Promise<PlaybookLibrary> | undefined;

/**
 * The playbook mirror of `loadLibrary`, memoized and single-flighted the same way. It is loaded
 * on demand rather than by OfflineHydrator, so a reader who never opens a playbook never pays
 * for one; the service worker precache is what makes a cold offline start work regardless.
 * There is no IndexedDB copy to fall back to, so a failed fetch rejects and clears the memo.
 */
export async function loadPlaybooks(): Promise<PlaybookLibrary> {
  playbooksInFlight ??= (async () => {
    const response = await fetch(`${basePath}/playbooks.json`);
    if (!response.ok) throw new Error("The playbooks asset is unavailable.");
    return await response.json() as PlaybookLibrary;
  })().catch((error) => {
    playbooksInFlight = undefined; // same reasoning as loadLibrary: the next call retries
    throw error;
  });
  return playbooksInFlight;
}

export interface Corpora extends Library, PlaybookLibrary {}

/** Topics and playbooks together, or a rejection. A half-loaded library would call every entry of the missing half "gone" or every search "no matches". */
export async function loadCorpora(): Promise<Corpora> {
  const [library, { playbooks }] = await Promise.all([loadLibrary(), loadPlaybooks()]);
  return { ...library, playbooks };
}

export interface History extends Corpora { saved: SavedEntry[]; recent: RecentEntry[] }

/** The one read behind Home's history sections and the Saved page: both corpora plus what this device saved and viewed. */
export async function loadHistory(): Promise<History> {
  const [corpora, saved, recent] = await Promise.all([loadCorpora(), getSavedEntries(), getRecentEntries()]);
  return { ...corpora, saved, recent };
}

export type Loader<T> = { retrying: boolean; retry: () => void } & (
  | { loading: true; failed: false; ready: false; data?: undefined }
  | { loading: false; failed: true; ready: false; data?: undefined }
  | { loading: false; failed: false; ready: true; data: T }
);

type LoaderState<T> = { status: "loading" } | { status: "failed"; retrying: boolean } | { status: "ready"; data: T };

/**
 * Runs a read once on mount and reports where it stands. `read` must be a module-level function
 * (it re-runs when its identity changes). `retry` re-runs it in place: a failed read stays
 * `failed` with `retrying` true until the new attempt settles, so the message and its button do
 * not flicker away and back. Nothing is `ready` until the whole read has resolved.
 */
export function useLoader<T>(read: () => Promise<T>): Loader<T> {
  const [state, setState] = useState<LoaderState<T>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let live = true; // a result that lands after unmount, or after a newer attempt began, is dropped
    read().then((data) => { if (live) setState({ status: "ready", data }); }, () => { if (live) setState({ status: "failed", retrying: false }); });
    return () => { live = false; };
  }, [read, attempt]);
  const retry = useCallback(() => {
    setState((current) => current.status === "failed" ? { status: "failed", retrying: true } : current);
    setAttempt((count) => count + 1);
  }, []);
  if (state.status === "ready") return { loading: false, failed: false, ready: true, data: state.data, retrying: false, retry };
  if (state.status === "failed") return { loading: false, failed: true, ready: false, retrying: state.retrying, retry };
  return { loading: true, failed: false, ready: false, retrying: false, retry };
}
