"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Steps } from "@phosphor-icons/react";
import type { Playbook } from "@/lib/types";

const APPROACH_LABELS = { open: "Open", laparoscopic: "Laparoscopic", robotic: "Robotic", endovascular: "Endovascular" } as const;

/**
 * Grouped by specialty, then filtered by approach — the axis you actually browse by when you
 * know what case is on tomorrow's list.
 *
 * Deliberately simpler than TopicsBrowser: no curriculum tree, no persistent rail, no scroll
 * spy. Those exist because 49 topics sit in a three-tier SCORE hierarchy. A few dozen playbooks
 * do not earn that machinery; revisit past roughly twenty.
 */
export function PlaybooksBrowser({ playbooks }: { playbooks: Playbook[] }) {
  const [approach, setApproach] = useState<"all" | Playbook["approach"]>("all");

  const approaches = useMemo(() => [...new Set(playbooks.map((playbook) => playbook.approach))].sort(), [playbooks]);
  const groups = useMemo(() => {
    const visible = approach === "all" ? playbooks : playbooks.filter((playbook) => playbook.approach === approach);
    const bySpecialty = new Map<string, Playbook[]>();
    for (const playbook of visible) bySpecialty.set(playbook.specialty, [...bySpecialty.get(playbook.specialty) ?? [], playbook]);
    return [...bySpecialty.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([specialty, items]) => [specialty, [...items].sort((a, b) => a.title.localeCompare(b.title))] as const);
  }, [playbooks, approach]);

  return (
    <>
      {approaches.length > 1 && (
        <div className="topics-browser-toolbar" role="group" aria-label="Filter by approach">
          <button type="button" className={`button small ${approach === "all" ? "" : "secondary"}`} aria-pressed={approach === "all"} onClick={() => setApproach("all")}>All</button>
          {approaches.map((value) => (
            <button key={value} type="button" className={`button small ${approach === value ? "" : "secondary"}`} aria-pressed={approach === value} onClick={() => setApproach(value)}>{APPROACH_LABELS[value]}</button>
          ))}
        </div>
      )}
      {groups.length === 0 ? (
        <div className="empty-state compact"><span className="empty-icon"><Steps size={22} /></span><h2>No playbooks with that approach</h2><p>Clear the filter to see everything written so far.</p></div>
      ) : groups.map(([specialty, items]) => (
        <section className="section" key={specialty}>
          <div className="section-heading"><h2>{specialty}</h2><span>{items.length} {items.length === 1 ? "playbook" : "playbooks"}</span></div>
          <div className="topic-grid">
            {items.map((playbook) => (
              <Link className="topic-card" key={playbook.id} href={`/playbooks/${playbook.slug}`}>
                <span className="callout-icon"><Steps size={17} /></span>
                <div>
                  <h3>{playbook.title}</h3>
                  <p>{playbook.aliases[0] ?? playbook.specialty}</p>
                </div>
                <span className="review-count">{APPROACH_LABELS[playbook.approach]}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
