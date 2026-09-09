import { cache } from "react";
import { demoTopics, suppliedSources, taxonomy } from "@/content";
import { searchTopics } from "@/lib/search";
import type { SuppliedSource, TaxonomyNode, Topic } from "@/lib/types";

// The library is the content authored in `src/content/`, read straight out of the module graph at
// build time. There is no database, no request context and no async boundary: a server component,
// a unit test and the static JSON emitter all read the same frozen objects. Callers still get
// clones, because the renderer and the offline cache both mutate what they are handed.
//
// Reads are wrapped in React's cache() so one static-generation pass shares a single clone instead
// of re-cloning the ~2.7 MB library per generated route — cache() scopes to one render pass, so the
// 47 independent page generations stay isolated from each other.

const approved = () => demoTopics.filter((topic) => topic.approvedVersion);

export const listTopics = cache((): Topic[] => structuredClone(approved()));

export const getTopicBySlug = cache((slug: string): Topic | null => structuredClone(approved().find((topic) => topic.slug === slug) ?? null));

export const listTaxonomy = cache((): TaxonomyNode[] => structuredClone(taxonomy));

export const listSources = cache((ids?: string[]): SuppliedSource[] => structuredClone(ids ? suppliedSources.filter((source) => ids.includes(source.id)) : suppliedSources));

export function searchLibrary(query: string): Topic[] { return structuredClone(searchTopics(query, approved())); }
