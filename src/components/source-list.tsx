import type { SuppliedSource } from "@/lib/types";

/** The Sources tab of a topic or a playbook. */
export function SourceList({ sources }: { sources: SuppliedSource[] }) {
  return <div className="source-list">{sources.map((source, index) => <article key={source.id}><span>{index + 1}</span><div><h2>{source.title}</h2><p>{source.citation}</p>{source.details && <small>{source.details}</small>}</div></article>)}</div>;
}
