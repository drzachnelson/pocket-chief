import { cacheApprovedTopic, cacheTaxonomy, getCachedTopics } from "@/lib/offline";
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
 * The shipped asset is the source of truth, and every successful load reseeds IndexedDB so a later
 * cold offline start still has content. A failed fetch falls back to whatever the device already
 * cached rather than rendering an empty atlas — the service worker usually answers first, so this
 * path only runs on a device that has never completed a load.
 *
 * Memoized per page load: search, the offline hydrator and the saved view all ask for it.
 */
export async function loadLibrary(): Promise<Library> {
  inFlight ??= fetchLibrary()
    .then(async (library) => {
      await cacheTaxonomy(library.taxonomy).catch(() => undefined);
      await Promise.all(library.topics.map((topic) => cacheApprovedTopic(topic).catch(() => undefined)));
      return library;
    })
    .catch(async () => ({ topics: await getCachedTopics().catch(() => [] as Topic[]), taxonomy: [] as TaxonomyNode[] }));
  return inFlight;
}
