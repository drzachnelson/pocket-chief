"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import { BookmarkSimple, GearSix, MagnifyingGlass, Notebook, ShieldCheck } from "@phosphor-icons/react";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { OfflineHydrator } from "@/components/offline-hydrator";
import { ThemeToggle } from "@/components/theme-toggle";

export const primaryNavigation = [
  { href: "/", label: "Search", icon: MagnifyingGlass },
  { href: "/topics", label: "Topics", icon: Notebook },
  { href: "/saved", label: "Saved", icon: BookmarkSimple },
];

interface TopicsDrawerState {
  open: (trigger: HTMLElement) => void;
  close: () => void;
  isOpen: boolean;
  setContent: (content: React.ReactNode | null) => void;
}

const TopicsDrawerContext = createContext<TopicsDrawerState | null>(null);

/** Lets the persistent Topics workspace provide the mobile drawer used by the shared bottom nav. */
export function useTopicsDrawer() {
  const drawer = useContext(TopicsDrawerContext);
  if (!drawer) throw new Error("useTopicsDrawer must be used inside AppShell");
  return drawer;
}

function TopicsDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };
  const registerContent = useCallback((next: React.ReactNode | null) => {
    setContent(next);
    if (!next) { setOpen(false); triggerRef.current = null; }
  }, []);
  const value = { isOpen, close, setContent: registerContent, open: (trigger: HTMLElement) => { triggerRef.current = trigger; setOpen(true); } };
  return <TopicsDrawerContext.Provider value={value}>{children}{isOpen ? content : null}</TopicsDrawerContext.Provider>;
}

function NavLink({ href, label, icon: Icon, mobile = false }: (typeof primaryNavigation)[number] & { mobile?: boolean }) {
  const pathname = usePathname();
  const drawer = useContext(TopicsDrawerContext);
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  const className = `${mobile ? "mobile-nav-link" : "side-nav-link"} ${active ? "active" : ""}`;
  if (mobile && href === "/topics" && active) {
    return <button type="button" className={className} aria-label={label} aria-current="page" aria-haspopup="dialog" aria-expanded={drawer?.isOpen ?? false} onClick={(event) => drawer?.open(event.currentTarget)}><Icon size={21} weight="fill" aria-hidden="true" /><span>{label}</span></button>;
  }
  return <Link href={href} className={className} aria-current={active ? "page" : undefined} aria-label={label}>
    <Icon size={mobile ? 21 : 18} weight={active ? "fill" : "regular"} aria-hidden="true" />
    <span>{label}</span>
  </Link>;
}

/** Shared brand/header treatment, used by the standard shell and the Topics workspace route. */
export function MobileHeader() {
  return <header className="mobile-header">
    <div className="mobile-header-top">
      <Link className="brand compact" href="/"><span className="brand-mark"><span>PC</span></span><span><strong>Pocket Chief</strong><small>Private surgery atlas</small></span></Link>
      <div className="mobile-head-actions"><ThemeToggle compact /><Link className="icon-link" href="/settings" aria-label="Settings"><GearSix size={21} /></Link></div>
    </div>
    <form action="/" role="search" className="mobile-global-search"><MagnifyingGlass size={17} aria-hidden="true" /><input name="q" aria-label="Search surgery notes" placeholder="Search surgery notes" /></form>
  </header>;
}

/** Shared primary mobile navigation; its active Topics control opens the workspace drawer. */
export function MobileNavigation() {
  return <nav className="mobile-nav" aria-label="Mobile navigation">{primaryNavigation.map((item) => <NavLink key={item.href} {...item} mobile />)}</nav>;
}

/** Reusable global navigation content for the standard sidebar and the Topics workspace sidebar. */
export function GlobalNavigation() {
  return <>
    <Link className="brand" href="/" aria-label="Pocket Chief home"><span className="brand-mark"><span>PC</span></span><span><strong>Pocket Chief</strong><small>General Surgery Atlas</small></span></Link>
    <nav className="side-nav" aria-label="Primary navigation">{primaryNavigation.map((item) => <NavLink key={item.href} {...item} />)}</nav>
  </>;
}

export function GlobalNavigationFooter({ compact = false }: { compact?: boolean }) {
  return <>
    <div className="side-spacer" />
    {!compact && <div className="privacy-note"><ShieldCheck size={18} weight="fill" aria-hidden="true" /><span><strong>Private reference</strong><small>No patient information</small></span></div>}
    <ThemeToggle />
    <NavLink href="/settings" label="Settings" icon={GearSix} />
    <p className="education-label">Educational reference only.<br />Not patient-specific guidance.</p>
  </>;
}

function StandardShell({ children }: { children: React.ReactNode }) {
  return <div className="app-frame"><aside className="sidebar"><GlobalNavigation /><GlobalNavigationFooter /></aside><div className="page-column"><MobileHeader /><main id="main-content" className="main-content">{children}</main></div><MobileNavigation /></div>;
}

function TopicsRouteShell({ children }: { children: React.ReactNode }) {
  return <div className="app-frame topics-app-frame"><div className="page-column topics-page-column"><MobileHeader /><main id="main-content" className="main-content topics-main-content">{children}</main></div><MobileNavigation /></div>;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <TopicsDrawerProvider><ServiceWorkerRegistration /><OfflineHydrator />{pathname.startsWith("/topics") ? <TopicsRouteShell>{children}</TopicsRouteShell> : <StandardShell>{children}</StandardShell>}</TopicsDrawerProvider>;
}
