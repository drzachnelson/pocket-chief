"use client";

import { useEffect } from "react";
import { cacheApprovedTopic, cacheTaxonomy } from "@/lib/offline";
import type { TaxonomyNode, Topic } from "@/lib/types";

export function OfflineHydrator() {
  useEffect(() => {
    fetch("/api/library", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return;
        const library = await response.json() as { topics: Topic[]; taxonomy: TaxonomyNode[] };
        await cacheTaxonomy(library.taxonomy);
        await Promise.all(library.topics.map(cacheApprovedTopic));
      })
      .catch(() => undefined);
  }, []);
  return null;
}
