"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDown, CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { GlobalNavigation, GlobalNavigationFooter, useTopicsDrawer } from "@/components/app-shell";
import type { TopicNavigationCategory, TopicNavigationSection, TopicNavigationTopic } from "@/lib/topic-navigation";

const SIDEBAR_KEY = "pocket-chief-topics-sidebar-collapsed";
const FOCUSABLE = "a[href], button:not([disabled])";

function readCollapsedSidebar() {
  try { return window.localStorage?.getItem(SIDEBAR_KEY) === "true"; } catch { return false; }
}

function saveCollapsedSidebar(collapsed: boolean) {
  try { window.localStorage?.setItem(SIDEBAR_KEY, String(collapsed)); } catch { /* private browsing can deny storage */ }
}

function categoryTopics(category: TopicNavigationCategory) {
  return [category, ...category.children].flatMap((item) => item.topics);
}

function activeTopic(navigation: TopicNavigationCategory[], pathname: string) {
  return navigation.flatMap(categoryTopics).find((topic) => pathname === `/topics/${topic.slug}`);
}

function useSectionSpy(sections: TopicNavigationSection[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id); else visible.delete(entry.target.id);
      }
      const next = sections.find((section) => visible.has(section.id));
      if (next) setActive(next.id);
    }, { rootMargin: "0px 0px -70% 0px" });
    for (const section of sections) {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, [sections]);
  return active;
}

function TopicSections({ topic, onSelect }: { topic: TopicNavigationTopic; onSelect?: () => void }) {
  const activeSection = useSectionSpy(topic.sections);
  if (!topic.sections.length) return null;
  return <div className="topics-tree-sections" aria-label={`${topic.label} sections`}>
    {topic.sections.map((section) => <a key={section.id} href={`#${section.id}`} data-level={section.level} aria-current={activeSection === section.id ? "location" : undefined} onClick={onSelect}>{section.label}</a>)}
  </div>;
}

function TopicTree({ navigation, onSelect }: { navigation: TopicNavigationCategory[]; onSelect?: () => void }) {
  const pathname = usePathname();
  const currentTopic = activeTopic(navigation, pathname);
  const [expanded, setExpanded] = useState<string | null>(() => navigation.find((category) => categoryTopics(category).some((topic) => topic.slug === currentTopic?.slug))?.id ?? null);
  return <nav className="topics-tree" aria-label="Topics curriculum">
    <p>Curriculum</p>
    {navigation.map((category) => {
      const open = expanded === category.id;
      const topics = categoryTopics(category);
      return <div key={category.id} className="topics-tree-category">
        <button type="button" aria-label={category.label} aria-expanded={open} onClick={() => setExpanded(open ? null : category.id)}><CaretDown size={14} aria-hidden="true" /><span>{category.label}</span><small aria-hidden="true">{topics.length}</small></button>
        {open && <div className="topics-tree-branch">
          {category.topics.map((topic) => <TopicLink key={topic.id} topic={topic} active={topic.slug === currentTopic?.slug} onSelect={onSelect} />)}
          {category.children.map((child) => <div key={child.id} className="topics-tree-child"><p>{child.label}</p>{child.topics.map((topic) => <TopicLink key={topic.id} topic={topic} active={topic.slug === currentTopic?.slug} onSelect={onSelect} />)}</div>)}
        </div>}
      </div>;
    })}
  </nav>;
}

function TopicLink({ topic, active, onSelect }: { topic: TopicNavigationTopic; active: boolean; onSelect?: () => void }) {
  return <div className="topics-tree-topic"><Link href={`/topics/${topic.slug}`} aria-current={active ? "page" : undefined} onClick={onSelect}>{topic.label}</Link>{active && <TopicSections topic={topic} onSelect={onSelect} />}</div>;
}

function TopicsDrawer({ navigation }: { navigation: TopicNavigationCategory[] }) {
  const { close } = useTopicsDrawer();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { closeRef.current?.focus(); }, []);
  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") { event.preventDefault(); close(); return; }
    if (event.key !== "Tab" || !drawerRef.current) return;
    const nodes = [...drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    if (!nodes.length || document.activeElement !== (event.shiftKey ? nodes[0] : nodes[nodes.length - 1])) return;
    event.preventDefault();
    (event.shiftKey ? nodes[nodes.length - 1] : nodes[0]).focus();
  }
  return <div className="topics-drawer-layer"><button type="button" className="topics-drawer-backdrop" aria-label="Dismiss topics navigation" onClick={close} /><div className="topics-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby="topics-drawer-title" onKeyDown={onKeyDown}>
    <header><div><p className="eyebrow">Pocket Chief</p><h2 id="topics-drawer-title">Topics</h2></div><button ref={closeRef} type="button" className="icon-button" aria-label="Close topics navigation" onClick={close}><X size={18} aria-hidden="true" /></button></header>
    <TopicTree navigation={navigation} onSelect={close} />
  </div></div>;
}

export function TopicsWorkspace({ navigation, children }: { navigation: TopicNavigationCategory[]; children: React.ReactNode }) {
  const { setContent } = useTopicsDrawer();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(readCollapsedSidebar);
  useEffect(() => {
    setContent(<TopicsDrawer navigation={navigation} />);
    return () => setContent(null);
  }, [navigation, setContent]);
  const sidebarClass = `topics-sidebar${collapsed ? " is-collapsed" : ""}`;
  const label = collapsed ? "Expand Topics sidebar" : "Collapse Topics sidebar";
  return <>
    <aside className={sidebarClass} aria-label="Topics workspace">
      <GlobalNavigation />
      <div className="topics-sidebar-divider" />
      <TopicTree key={pathname} navigation={navigation} />
      <button type="button" className="topics-sidebar-toggle" aria-label={label} onClick={() => setCollapsed((current) => { const next = !current; saveCollapsedSidebar(next); return next; })}>{collapsed ? <CaretRight size={15} /> : <CaretLeft size={15} />}<span>{collapsed ? "Expand" : "Collapse"}</span></button>
      <GlobalNavigationFooter compact />
    </aside>
    {children}
  </>;
}
