import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

/** The one list row (DESIGN.md, Components): title, optional quiet line, optional trailing text, chevron. The whole row is the link. Render inside `<ul className="list-rows">`. A count passed as `trailing` should be `aria-hidden`. */
export function ListRow({ href, title, quiet, trailing }: { href: string; title: string; quiet?: string; trailing?: ReactNode }) {
  return (
    <li>
      <Link className="list-row" href={href}>
        <span className="list-row-text"><span>{title}</span>{quiet && <small>{quiet}</small>}</span>
        {trailing && <span className="list-row-trailing">{trailing}</span>}
        <CaretRight size={16} aria-hidden="true" />
      </Link>
    </li>
  );
}
