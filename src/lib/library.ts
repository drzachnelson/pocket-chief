import { demoTopics, suppliedSources, taxonomy } from "@/content";
import { searchTopics } from "@/lib/search";
import type { SuppliedSource, TaxonomyNode, Topic } from "@/lib/types";

// The library is the content authored in `src/content/`, read straight out of the module graph at
// build time. There is no database, no request context and no async boundary: a server component,
// a unit test and the static JSON emitter all read the same frozen objects. Callers still get
// clones, because the renderer and the offline cache both mutate what they are handed.

const approved = () => demoTopics.filter((topic) => topic.approvedVersion);

export function listTopics(): Topic[] { return structuredClone(approved()); }

export function getTopicBySlug(slug: string): Topic | null { return structuredClone(approved().find((topic) => topic.slug === slug) ?? null); }

export function listTaxonomy(): TaxonomyNode[] { return structuredClone(taxonomy); }

export function listSources(ids?: string[]): SuppliedSource[] { return structuredClone(ids ? suppliedSources.filter((source) => ids.includes(source.id)) : suppliedSources); }

export function searchLibrary(query: string): Topic[] { return structuredClone(searchTopics(query, approved())); }
