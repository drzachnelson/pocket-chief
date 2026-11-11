import { cache } from "react";
import { libraryPlaybooks, libraryTopics, suppliedSources, taxonomy } from "@/content";
import { groupRecentlyAdded, playbookItem, topicItem, type RecentlyAddedDay } from "@/lib/library-items";
import { searchPlaybooks, searchTopics } from "@/lib/search";
import type { Playbook, PlaybookSummary, SuppliedSource, TaxonomyNode, Topic } from "@/lib/types";

// The library is the content authored in `src/content/`, read straight out of the module graph at
// build time. There is no database, no request context and no async boundary: a server component,
// a unit test and the static JSON emitter all read the same frozen objects. Callers still get
// clones, because the renderer and the offline cache both mutate what they are handed.
//
// Reads are wrapped in React's cache() so one static-generation pass shares a single clone instead
// of re-cloning the ~2.7 MB library per generated route — cache() scopes to one render pass, so the
// 47 independent page generations stay isolated from each other.

const approved = () => libraryTopics.filter((topic) => topic.approvedVersion);

export const listTopics = cache((): Topic[] => structuredClone(approved()));

export const getTopicBySlug = cache((slug: string): Topic | null => structuredClone(approved().find((topic) => topic.slug === slug) ?? null));

export const listTaxonomy = cache((): TaxonomyNode[] => structuredClone(taxonomy));

export const listSources = cache((ids?: string[]): SuppliedSource[] => structuredClone(ids ? suppliedSources.filter((source) => ids.includes(source.id)) : suppliedSources));

export function searchLibrary(query: string): Topic[] { return structuredClone(searchTopics(query, approved())); }

/** Playbooks ship approved-only, so there is no version filter to apply — unlike topics. */
export const listPlaybooks = cache((): Playbook[] => structuredClone(libraryPlaybooks));
export const getPlaybookBySlug = cache((slug: string): Playbook | null => structuredClone(libraryPlaybooks.find((playbook) => playbook.slug === slug) ?? null));
export function searchPlaybookLibrary(query: string): Playbook[] { return structuredClone(searchPlaybooks(query, libraryPlaybooks)); }

/** `{slug, title, specialty, approach}` per playbook and nothing else, so an index or a Contents list never ships a body. */
export const listPlaybookSummaries = cache((): PlaybookSummary[] => libraryPlaybooks.map(({ slug, title, specialty, approach }) => ({ slug, title, specialty, approach })));

/**
 * Home's Recently added feed: the `limit` newest topics and playbooks together, grouped by UTC
 * review day. "Added" is the review date, so a deepened topic with a new date reads as new
 * (spec gap G6: accept until re-dated topics clutter the list, then add an authored `addedAt`).
 */
export const listRecentlyAdded = cache((limit: number): RecentlyAddedDay[] => groupRecentlyAdded([
  ...approved().map((topic) => ({ item: topicItem(topic), reviewedAt: topic.approvedVersion?.reviewedAt ?? topic.updatedAt })),
  ...libraryPlaybooks.map((playbook) => ({ item: playbookItem(playbook), reviewedAt: playbook.reviewedAt })),
], limit));
