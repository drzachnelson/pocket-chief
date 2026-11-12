import Link from "next/link";

export interface Crumb { label: string; href?: string }

/** Where a reader page sits. A crumb with an `href` is a link; one without is plain text (a playbook's approach). No item is marked current: the page's own title follows in the h1. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return <nav aria-label="Breadcrumb"><ol className="breadcrumb">{items.map(({ label, href }) => <li key={label}>{href ? <Link href={href}>{label}</Link> : label}</li>)}</ol></nav>;
}
