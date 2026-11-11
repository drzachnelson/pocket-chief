// `trailingSlash: true` makes usePathname() report "/topics/" and "/topics/<slug>/" on the static export, so a
// comparison against the unslashed form finds nothing. Every pathname comparison in the shell goes through this.
export const normalizePath = (pathname: string) => pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

/** A topic or playbook page: the pages that carry Contents. The index pages carry navigation only. */
export const isReaderPath = (pathname: string) => /^\/(?:topics|playbooks)\/[^/]+$/.test(normalizePath(pathname));
