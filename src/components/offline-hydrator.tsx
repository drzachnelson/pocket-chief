"use client";

import { useEffect } from "react";
import { cacheApprovedTopic, cacheTaxonomy } from "@/lib/offline";
import { demoTopics, taxonomy } from "@/lib/seed";

export function OfflineHydrator() {
  useEffect(() => { cacheTaxonomy(taxonomy).catch(() => undefined); Promise.all(demoTopics.map(cacheApprovedTopic)).catch(() => undefined); }, []);
  return null;
}
