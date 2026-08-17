"use client";

import Link from "next/link";
import { Fragment } from "react";
import type { InlineSegment } from "@/lib/inline";

/**
 * Renders the structured output of `parseInline()`. Bold and link compose, so a segment
 * carrying both nests the emphasis inside the anchor and the whole run underlines as one.
 *
 * Segments are positional runs of a single string that is re-parsed whole on every render,
 * so the array index is a stable key. There is deliberately no `dangerouslySetInnerHTML`
 * anywhere on this path: the parser hands back structure, and structure is what React gets.
 */
export function InlineText({ segments }: { segments: InlineSegment[] }) {
  return <>{segments.map((part, index) => {
    const body = part.bold ? <strong className="inline-term">{part.text}</strong> : part.text;
    return part.slug
      ? <Link key={index} className="inline-link" href={`/topics/${part.slug}`}>{body}</Link>
      : <Fragment key={index}>{body}</Fragment>;
  })}</>;
}
