"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ListRow } from "@/components/list-row";
import { ReadFailed } from "@/components/list-states";
import { loadHistory, useLoader } from "@/lib/library-client";
import { quietLine, resolveEntries, type LibraryItem, type RecentlyAddedDay } from "@/lib/library-items";
import type { EntryKind } from "@/lib/types";

const SHOWN = 5;

/** "Nov 9", with the year only for an earlier year. `day` is a UTC date, so the label reads the same in every zone. */
export function dayLabel(day: string, now = new Date()) {
  const date = new Date(`${day}T00:00:00Z`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: date.getUTCFullYear() === now.getUTCFullYear() ? undefined : "numeric", timeZone: "UTC" });
}

const itemRow = (item: LibraryItem) => <ListRow key={item.id} href={`/${item.kind}s/${item.slug}`} title={item.title} quiet={quietLine(item)} trailing={item.kind === "playbook" ? "Playbook" : undefined} />;

function Section({ title, link, children }: { title: string; link?: ReactNode; children: ReactNode }) {
  return <section className="section"><div className="section-heading"><h2>{title}</h2>{link}</div>{children}</section>;
}

/**
 * Home's three lists, in the 760px column under the hidden h1 (`app/page.tsx`). One read serves Recently viewed and Saved, and nothing shows until it settles, so the page does not jump when history rows arrive above it. A failed read says so once in place of those two; Recently added is build-time data and shows either way.
 */
export function HomeLists({ added }: { added: RecentlyAddedDay[] }) {
  const history = useLoader(loadHistory);
  if (history.loading) return null;
  const { data } = history; // absent when the read failed
  // A page the library has lost drops silently here; the Saved page is where it shows as "No longer available".
  const known = (entries: Array<{ id: string; kind: EntryKind }> = []) => data ? resolveEntries(entries, data.topics, data.playbooks).flatMap(({ item }) => item ? [item] : []) : [];
  const recent = known(data?.recent);
  const saved = known(data?.saved);
  return (
    <>
      {history.failed && <section className="section"><ReadFailed message="Couldn't load Saved." retrying={history.retrying} onRetry={history.retry} /></section>}
      {recent.length > 0 && <Section title="Recently viewed"><ul className="list-rows">{recent.slice(0, SHOWN).map(itemRow)}</ul></Section>}
      {saved.length > 0 && <Section title="Saved" link={saved.length > SHOWN && <Link href="/saved">All saved</Link>}><ul className="list-rows">{saved.slice(0, SHOWN).map(itemRow)}</ul></Section>}
      {added.length > 0 && (
        <Section title="Recently added">
          {added.map(({ day, items }) => (
            <div key={day}>
              <p className="date-label" id={`added-${day}`}>{dayLabel(day)}</p>
              <ul className="list-rows" aria-labelledby={`added-${day}`}>{items.map(itemRow)}</ul>
            </div>
          ))}
        </Section>
      )}
    </>
  );
}
