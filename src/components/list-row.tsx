import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

/**
 * The one list row (DESIGN.md, Components): title, optional quiet line, optional trailing text, chevron. The whole row is the link. Render inside `<ul className="list-rows">`. A count passed as `trailing` should be `aria-hidden`.
 * `action` is a control that takes the chevron's place (Saved's bookmark toggle). It sits outside the link, so the title area alone is the link. A row with no `href` is static and muted: the page it named is gone.
 */
export function ListRow({ href, title, quiet, trailing, action }: { href?: string; title: string; quiet?: string; trailing?: ReactNode; action?: ReactNode }) {
  const body = <><span className="list-row-text"><span>{title}</span>{quiet && <small>{quiet}</small>}</span>{trailing && <span className="list-row-trailing">{trailing}</span>}</>;
  return (
    <li className={action ? "list-row-split" : undefined}>
      {href ? <Link className="list-row" href={href}>{body}{!action && <CaretRight size={16} aria-hidden="true" />}</Link> : <div className="list-row list-row-static">{body}</div>}
      {action}
    </li>
  );
}
