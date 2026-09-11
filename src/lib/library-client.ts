import { cacheApprovedTopic, cacheTaxonomy, getCachedTaxonomy, getCachedTopics } from "@/lib/offline";
import type { TaxonomyNode, Topic } from "@/lib/types";

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
 * cached rather than rendering an empty atlas — the service worker usually answers first, so this
 * path only runs on a device that has never completed a load.
 *
 * Memoized per page load: search, the offline hydrator and the saved view all ask for it.
 */
export async function loadLibrary(): Promise<Library> {
  inFlight ??= fetchLibrary()
    .then((library) => { seedCache(library); return library; })
    .catch(async () => {
      inFlight = undefined; // don't let one bad attempt poison the rest of the page session — only its own awaiters see the fallback; the next call retries the network
      return { topics: await getCachedTopics().catch(() => [] as Topic[]), taxonomy: await getCachedTaxonomy().catch(() => [] as TaxonomyNode[]) };
    });
  return inFlight;
}
