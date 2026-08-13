"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookmarkSimple,
  GearSix,
  MagnifyingGlass,
  Notebook,
  Plus,
  ShieldCheck,
} from "@phosphor-icons/react";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { OfflineHydrator } from "@/components/offline-hydrator";
import { ThemeToggle } from "@/components/theme-toggle";

const primary = [
  { href: "/", label: "Search", icon: MagnifyingGlass },
  { href: "/topics", label: "Topics", icon: Notebook },
  { href: "/saved", label: "Saved", icon: BookmarkSimple },
  { href: "/add", label: "Add", icon: Plus },
];

function NavLink({ href, label, icon: Icon, mobile = false }: (typeof primary)[number] & { mobile?: boolean }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link href={href} className={`${mobile ? "mobile-nav-link" : "side-nav-link"} ${active ? "active" : ""}`} aria-current={active ? "page" : undefined} aria-label={label}>
      <Icon size={mobile ? 21 : 18} weight={active ? "fill" : "regular"} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/auth/")) return <main id="main-content" className="auth-main">{children}</main>;
  return (
    <div className="app-frame">
      <ServiceWorkerRegistration />
      <OfflineHydrator />
      <aside className="sidebar" aria-label="Primary navigation">
        <Link className="brand" href="/" aria-label="Pocket Chief home">
          <span className="brand-mark"><span>PC</span></span>
          <span><strong>Pocket Chief</strong><small>General Surgery Atlas</small></span>
        </Link>
        <nav className="side-nav">
          {primary.map((item) => <NavLink key={item.href} {...item} />)}
        </nav>
        <div className="side-spacer" />
        <div className="privacy-note">
          <ShieldCheck size={18} weight="fill" aria-hidden="true" />
          <span><strong>Private reference</strong><small>No patient information</small></span>
        </div>
        <ThemeToggle />
        <NavLink href="/settings" label="Settings" icon={GearSix} />
        <p className="education-label">Educational reference only.<br />Not patient-specific guidance.</p>
      </aside>
      <div className="page-column">
        <header className="mobile-header">
          <div className="mobile-header-top">
            <Link className="brand compact" href="/">
              <span className="brand-mark"><span>PC</span></span>
              <span><strong>Pocket Chief</strong><small>Private surgery atlas</small></span>
            </Link>
            <div className="mobile-head-actions"><ThemeToggle compact /><Link className="icon-link" href="/settings" aria-label="Settings"><GearSix size={21} /></Link></div>
          </div>
          <form action="/" role="search" className="mobile-global-search"><MagnifyingGlass size={17} aria-hidden="true" /><input name="q" aria-label="Search surgery notes" placeholder="Search surgery notes" /></form>
        </header>
        <main id="main-content" className="main-content">{children}</main>
      </div>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {primary.map((item) => <NavLink key={item.href} {...item} mobile />)}
      </nav>
    </div>
  );
}
