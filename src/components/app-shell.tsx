"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import { BookmarkSimple, GearSix, House, IconContext, MagnifyingGlass, Notebook, Steps } from "@phosphor-icons/react";
import { BrandMark } from "@/components/brand-mark";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { OfflineHydrator } from "@/components/offline-hydrator";
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

interface TopicsDrawerState {
  open: (trigger: HTMLElement) => void;
  close: () => void;
  isOpen: boolean;
  setContent: (content: React.ReactNode | null) => void;
}

const TopicsDrawerContext = createContext<TopicsDrawerState | null>(null);

// The Topics drawer has no trigger since this shell dropped the Topics button and the Browse button. It stays until
// the reader-chrome slice replaces it with the Contents dialog and deletes this provider and its registration handshake.
export function useTopicsDrawer() {
  const drawer = useContext(TopicsDrawerContext);
  if (!drawer) throw new Error("useTopicsDrawer must be used inside AppShell");
  return drawer;
}

function TopicsDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const [shownFor, setShownFor] = useState(pathname);
  // The drawer belongs to a route, so leaving the route is what closes it. Deregistering the content
  // must NOT: the trigger ships in the root layout while the content comes from the /topics segment
  // layout, and React commits those separately, so a tap can legitimately arrive before any content
  // exists. Closing from registerContent discarded that tap — React remounts the registering effect,
  // and its cleanup landed after the tap but before the drawer had ever rendered. Resetting here
  // instead keeps that window open while still closing on the navigation that actually ends it.
  if (shownFor !== pathname) { setShownFor(pathname); setOpen(false); }
  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };
  const registerContent = useCallback((next: React.ReactNode | null) => setContent(next), []);
  const value = { isOpen, close, setContent: registerContent, open: (trigger: HTMLElement) => { triggerRef.current = trigger; setOpen(true); } };
  return <TopicsDrawerContext.Provider value={value}>{children}{isOpen ? content : null}</TopicsDrawerContext.Provider>;
}

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
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <IconContext.Provider value={decorativeIcons}><TopicsDrawerProvider><ServiceWorkerRegistration /><OfflineHydrator />
    <div className="app-frame">
      <div className="sidebar">
        <Brand className="side-brand" label="Pocket Chief home" />
        <PrimaryNavigation className="side-nav" linkClassName="side-nav-link" />
        {isReaderPath(pathname) && <div className="side-contents" id="shell-contents" />}
        <div className="side-foot"><NavLink href="/settings" label="Settings" icon={GearSix} className="side-nav-link" /></div>
      </div>
      <div className="page-column">
        <div className="mobile-header"><div className="top-row">
          <Brand className="header-brand" />
          {/* Search slot: the compact field as it stands, until the shared search field replaces it. */}
          <form action={`${basePath}/`} role="search" className="mobile-global-search"><MagnifyingGlass size={17} /><input name="q" aria-label="Search surgery notes" placeholder="Search surgery notes" /></form>
          <Link className="icon-link header-settings" href="/settings" aria-label="Settings" aria-current={currentState(pathname, "/settings")}><GearSix size={21} /></Link>
        </div></div>
        <main id="main-content" tabIndex={-1} className="main-content">{children}</main>
      </div>
      <PrimaryNavigation className="mobile-nav" linkClassName="mobile-nav-link" />
    </div>
  </TopicsDrawerProvider></IconContext.Provider>;
}
