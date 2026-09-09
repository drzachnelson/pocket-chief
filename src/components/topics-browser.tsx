"use client";

import Link from "next/link";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { flattenTopicNavigation, type FlattenedTopicNavigationEntry, type TopicNavigationCategory, type TopicNavigationTopic } from "@/lib/topic-navigation";

type TopicView = "curriculum" | "all";

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim();
}

function topicMatches(entry: FlattenedTopicNavigationEntry, query: string) {
  if (!query) return true;
  const haystack = [
    entry.topic.label,
    entry.categoryLabel,
    entry.subsectionLabel,
    ...(entry.topic.searchTerms ?? []),
  ].filter((value): value is string => Boolean(value)).map(normalize).join(" ");
  return haystack.includes(query);
}

function uniqueEntries(entries: FlattenedTopicNavigationEntry[]) {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    const key = entry.topic.id || entry.topic.slug;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function topicId(topic: TopicNavigationTopic) {
  return topic.id || topic.slug;
}

function safeId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]+/g, "-");
}

function TopicLink({ entry }: { entry: FlattenedTopicNavigationEntry }) {
  return (
    <li className="topics-browser-item">
      <Link className="topics-browser-topic" href={`/topics/${entry.topic.slug}`}>
        <span>{entry.topic.label}</span>
      </Link>
    </li>
  );
}

function TopicCount({ count }: { count: number }) {
  return <span className="topics-browser-count" aria-hidden="true">{count}</span>;
}

function TopicList({ entries, heading, id }: { entries: FlattenedTopicNavigationEntry[]; heading?: string; id?: string }) {
  if (!entries.length) return null;
  return (
    <section className={`topics-browser-subsection${heading ? "" : " is-direct"}`} {...(heading && id ? { "aria-labelledby": id } : {})}>
      {heading && id && <div className="topics-browser-subsection-heading">
        <h3 id={id}>{heading}</h3>
        <TopicCount count={entries.length} />
      </div>}
      <ul className="topics-browser-list">
        {entries.map((entry) => <TopicLink key={entry.topic.id || entry.topic.slug} entry={entry} />)}
      </ul>
    </section>
  );
}

function CurriculumView({ navigation, matchingIds }: { navigation: TopicNavigationCategory[]; matchingIds: Set<string> }) {
  const categories = navigation.map((category) => {
    const direct = category.topics.filter((topic) => matchingIds.has(topicId(topic))).map((topic) => ({ topic, categoryLabel: category.label, categoryId: category.id }));
    const children = category.children.map((child) => ({
      child,
      topics: child.topics.filter((topic) => matchingIds.has(topicId(topic))).map((topic) => ({
        topic,
        categoryLabel: category.label,
        subsectionLabel: child.label,
        categoryId: category.id,
        subsectionId: child.id,
      })),
    })).filter(({ topics }) => topics.length > 0);
    return { category, direct, children, count: direct.length + children.reduce((sum, child) => sum + child.topics.length, 0) };
  }).filter((category) => category.count > 0);

  return (
    <div className="topics-browser-curriculum" aria-label="SCORE curriculum topics">
      {categories.map(({ category, direct, children, count }) => {
        const categoryId = `topics-category-${safeId(category.id)}`;
        return (
          <section className="topics-browser-category" key={category.id} aria-labelledby={categoryId}>
            <div className="topics-browser-category-heading">
              <h2 id={categoryId}>{category.label}</h2>
              <TopicCount count={count} />
            </div>
            <TopicList entries={direct} />
            {children.map(({ child, topics }) => <TopicList key={child.id} entries={topics} heading={child.label} id={`${categoryId}-${safeId(child.id)}`} />)}
          </section>
        );
      })}
    </div>
  );
}

function AllTopicsView({ entries }: { entries: FlattenedTopicNavigationEntry[] }) {
  const alphabetical = [...entries].sort((a, b) => a.topic.label.localeCompare(b.topic.label));
  return (
    <section className="topics-browser-all" aria-labelledby="topics-all-heading">
      <div className="topics-browser-category-heading">
        <h2 id="topics-all-heading">All topics</h2>
        <TopicCount count={alphabetical.length} />
      </div>
      <ul className="topics-browser-list topics-browser-alphabetical-list">
        {alphabetical.map((entry) => (
          <li className="topics-browser-item" key={entry.topic.id || entry.topic.slug}>
            <Link className="topics-browser-topic" href={`/topics/${entry.topic.slug}`}>
              <span>{entry.topic.label}</span>
              <span className="topics-browser-topic-context" aria-hidden="true">{entry.categoryLabel}{entry.subsectionLabel ? ` · ${entry.subsectionLabel}` : ""}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TopicsBrowser({ navigation }: { navigation: TopicNavigationCategory[] }) {
  const [view, setView] = useState<TopicView>("curriculum");
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query);
  const entries = useMemo(() => uniqueEntries(flattenTopicNavigation(navigation)), [navigation]);
  const matchingEntries = useMemo(() => entries.filter((entry) => topicMatches(entry, normalizedQuery)), [entries, normalizedQuery]);
  const matchingIds = useMemo(() => new Set(matchingEntries.map((entry) => topicId(entry.topic))), [matchingEntries]);

  return (
    <section className="topics-browser" aria-labelledby="topics-browser-heading">
      <div className="topics-browser-toolbar">
        <div>
          <p className="eyebrow">Topic library</p>
          <h2 className="topics-browser-heading" id="topics-browser-heading">Find a topic</h2>
        </div>
        <div className="topics-browser-view-control" role="group" aria-label="Topic view">
          <button type="button" className={view === "curriculum" ? "is-active" : undefined} aria-pressed={view === "curriculum"} onClick={() => setView("curriculum")}>Curriculum</button>
          <button type="button" className={view === "all" ? "is-active" : undefined} aria-pressed={view === "all"} onClick={() => setView("all")}>All topics</button>
        </div>
      </div>

      <div className="topics-browser-search">
        <label htmlFor="topics-browser-search-input">Search topics</label>
        <div className="topics-browser-search-field">
          <MagnifyingGlass size={17} aria-hidden="true" />
          <input id="topics-browser-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, aliases, tags, or sections" />
          {query && <button type="button" className="topics-browser-clear" aria-label="Clear topic search" onClick={() => setQuery("")}><X size={15} aria-hidden="true" /></button>}
        </div>
        <p className="topics-browser-result-count" aria-live="polite">{matchingEntries.length} {matchingEntries.length === 1 ? "topic" : "topics"}</p>
      </div>

      {matchingEntries.length ? (
        view === "curriculum" ? <CurriculumView navigation={navigation} matchingIds={matchingIds} /> : <AllTopicsView entries={matchingEntries} />
      ) : (
        <div className="empty-state topics-browser-empty" role="status">
          <h2>No topics found</h2>
          <p>{query ? <>No topics match “{query}”. Try another term.</> : "There are no approved topics to browse yet."}</p>
          {query && <button type="button" className="button secondary" onClick={() => setQuery("")}>Clear search</button>}
        </div>
      )}
    </section>
  );
}
