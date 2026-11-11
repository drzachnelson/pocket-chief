"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { BookmarkSimple, GearSix, House, IconContext, MagnifyingGlass, Notebook, Steps } from "@phosphor-icons/react";
import { BrandMark } from "@/components/brand-mark";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { OfflineHydrator } from "@/components/offline-hydrator";
import { markNavigated } from "@/lib/app-history";
import { isReaderPath, normalizePath } from "@/lib/pathname";

// Next prefixes basePath onto <Link> and router navigations, but NOT onto a plain <form action>.
// Left as "/" the header search submits to the origin root, outside the mount point, and 404s.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Every icon in the app is decorative (the control or text beside it carries the name), so the client icons are hidden from assistive tech in one place. The `dist/ssr` icons do not read this context and take the attribute directly.
const decorativeIcons = { "aria-hidden": true } as const;

export const primaryNavigation = [
  { href: "/", label: "Home", icon: House },
  { href: "/topics", label: "Topics", icon: Notebook },
  { href: "/playbooks", label: "Playbooks", icon: Steps },
  { href: "/saved", label: "Saved", icon: BookmarkSimple },
];

/** "page" on the link's own page, "true" on a page inside it (a topic is inside Topics), nothing elsewhere. */
function currentState(pathname: string, href: string) {
  const path = normalizePath(pathname);
  if (path === href) return "page";
  return href !== "/" && path.startsWith(`${href}/`) ? "true" : undefined;
}

function NavLink({ href, label, icon: Icon, className }: { href: string; label: string; icon: typeof House; className: string }) {
  const current = currentState(usePathname(), href);
  return <Link href={href} className={`${className}${current ? " active" : ""}`} aria-current={current}><Icon size={21} weight={current ? "fill" : "regular"} /><span>{label}</span></Link>;
}

function PrimaryNavigation({ className, linkClassName }: { className: string; linkClassName: string }) {
  return <nav className={className} aria-label="Primary">{primaryNavigation.map((item) => <NavLink key={item.href} {...item} className={linkClassName} />)}</nav>;
}

// The name shows on the phone header row and on the laptop sidebar; the tablet rail hides it, so the sidebar link keeps a label.
function Brand({ className, label }: { className: string; label?: string }) {
  return <Link className={`brand ${className}`} href="/" aria-label={label}><BrandMark /><strong>Pocket Chief</strong></Link>;
}

/**
 * One shell for every route. By width it is arranged three ways:
 * - phone: the header row on top (mark and name, search, Settings) and the tab bar at the bottom; the sidebar is hidden;
 * - tablet: the sidebar is a labelled rail, and the top row holds the search field;
 * - laptop: the full sidebar, with Contents between navigation and the Settings foot on reader pages.
 * Landmarks: nav "Primary" (once visible; the tab bar and the sidebar are never shown together), search, main. No aside, banner or footer.
 * On a reader page the sidebar holds `contents` (server-rendered by the `@contents` route) and the top row's `#shell-toolbar` slot receives the page toolbar,
 * which on a phone replaces the tab bar.
 */
export function AppShell({ children, contents }: { children: React.ReactNode; contents?: React.ReactNode }) {
  const pathname = usePathname();
  const reader = isReaderPath(pathname);
  const firstPath = useRef(pathname);
  useEffect(() => { if (pathname !== firstPath.current) markNavigated(); }, [pathname]);
  return <IconContext.Provider value={decorativeIcons}><ServiceWorkerRegistration /><OfflineHydrator />
    <div className={reader ? "app-frame is-reader" : "app-frame"}>
      <div className="sidebar">
        <Brand className="side-brand" label="Pocket Chief home" />
        <PrimaryNavigation className="side-nav" linkClassName="side-nav-link" />
        {reader && <div className="side-contents">{contents}</div>}
        <div className="side-foot"><NavLink href="/settings" label="Settings" icon={GearSix} className="side-nav-link" /></div>
      </div>
      <div className="page-column">
        <div className="mobile-header"><div className="top-row">
          <Brand className="header-brand" />
          {/* Search slot: the compact field as it stands, until the shared search field replaces it. */}
          <form action={`${basePath}/`} role="search" className="mobile-global-search"><MagnifyingGlass size={17} /><input name="q" aria-label="Search surgery notes" placeholder="Search surgery notes" /></form>
          <Link className="icon-link header-settings" href="/settings" aria-label="Settings" aria-current={currentState(pathname, "/settings")}><GearSix size={21} /></Link>
          <div className="page-tools" id="shell-toolbar" />
        </div></div>
        <main id="main-content" tabIndex={-1} className="main-content">{children}</main>
      </div>
      <PrimaryNavigation className="mobile-nav" linkClassName="mobile-nav-link" />
    </div>
  </IconContext.Provider>;
}
