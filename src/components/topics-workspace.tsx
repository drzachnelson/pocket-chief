"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDown, CaretLeft, CaretRight, Notebook, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GlobalNavigation, GlobalNavigationFooter, useTopicsDrawer } from "@/components/app-shell";
import type { TopicNavigationCategory, TopicNavigationSection, TopicNavigationTopic } from "@/lib/topic-navigation";

const SIDEBAR_KEY = "pocket-chief-topics-sidebar-collapsed";
const SIDEBAR_EVENT = "pocket-chief-topics-sidebar-change";
const FOCUSABLE = "a[href], button:not([disabled])";

function readCollapsedSidebar() {
  try { return window.localStorage?.getItem(SIDEBAR_KEY) === "true"; } catch { return false; }
}

function saveCollapsedSidebar(collapsed: boolean) {
  try { window.localStorage?.setItem(SIDEBAR_KEY, String(collapsed)); } catch { /* private browsing can deny storage */ }
  window.dispatchEvent(new Event(SIDEBAR_EVENT));
}

function subscribeCollapsedSidebar(update: () => void) {
  window.addEventListener("storage", update);
  window.addEventListener(SIDEBAR_EVENT, update);
  return () => { window.removeEventListener("storage", update); window.removeEventListener(SIDEBAR_EVENT, update); };
}

function categoryTopics(category: TopicNavigationCategory) {
  return [category, ...category.children].flatMap((item) => item.topics);
}

// `trailingSlash: true` means usePathname() reports "/topics/<slug>/", so an exact match against the
// unslashed form silently finds nothing — collapsing the curriculum tree and dropping the in-page
// section links on every topic page. Normalise before comparing rather than assuming either shape.
function activeTopic(navigation: TopicNavigationCategory[], pathname: string) {
  const path = pathname.replace(/\/+$/, "");
  return navigation.flatMap(categoryTopics).find((topic) => path === `/topics/${topic.slug}`);
}

function activeBranch(navigation: TopicNavigationCategory[], topic?: TopicNavigationTopic) {
  const category = navigation.find((candidate) => categoryTopics(candidate).some((item) => item.id === topic?.id));
  return { categoryId: category?.id ?? null, subsectionId: category?.children.find((child) => child.topics.some((item) => item.id === topic?.id))?.id ?? null };
}

function useSectionSpy(sections: TopicNavigationSection[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    function update() {
      const marker = 112;
      const current = sections.reduce<string>((closest, section) => {
        const top = document.getElementById(section.id)?.getBoundingClientRect().top;
        return top !== undefined && top <= marker ? section.id : closest;
      }, "");
      setActive(current || sections[0]?.id || "");
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("hashchange", update); };
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
  const active = activeBranch(navigation, currentTopic);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(active.categoryId);
  const [expandedSubsections, setExpandedSubsections] = useState<Set<string>>(() => new Set(active.subsectionId ? [active.subsectionId] : []));
  return <nav className="topics-tree" aria-label="Topics curriculum">
    <p>Curriculum</p>
    {navigation.map((category) => {
      const open = expandedCategory === category.id;
      const topics = categoryTopics(category);
      return <div key={category.id} className="topics-tree-category">
        <button type="button" aria-label={category.label} aria-expanded={open} onClick={() => {
          if (open && active.categoryId === category.id) return;
          setExpandedCategory(open ? null : category.id);
          setExpandedSubsections(active.categoryId === category.id && active.subsectionId ? new Set([active.subsectionId]) : new Set());
        }}><CaretDown size={14} aria-hidden="true" /><span>{category.label}</span><small aria-hidden="true">{topics.length}</small></button>
        {open && <div className="topics-tree-branch">
          {category.topics.map((topic) => <TopicLink key={topic.id} topic={topic} active={topic.slug === currentTopic?.slug} onSelect={onSelect} />)}
          {category.children.map((child) => {
            const subsectionOpen = expandedSubsections.has(child.id);
            return <div key={child.id} className="topics-tree-child">
              <button type="button" aria-label={child.label} aria-expanded={subsectionOpen} onClick={() => {
                if (subsectionOpen && active.subsectionId === child.id) return;
                setExpandedSubsections((current) => {
                  const next = new Set(current);
                  if (subsectionOpen) next.delete(child.id); else next.add(child.id);
                  return next;
                });
              }}><CaretDown size={12} aria-hidden="true" /><span>{child.label}</span><small aria-hidden="true">{child.topics.length}</small></button>
              {subsectionOpen && child.topics.map((topic) => <TopicLink key={topic.id} topic={topic} active={topic.slug === currentTopic?.slug} onSelect={onSelect} />)}
            </div>;
          })}
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
  const { setContent, open, isOpen } = useTopicsDrawer();
  const pathname = usePathname();
  // The server snapshot keeps hydration stable; React picks up the browser preference after it
  // mounts and also follows changes from this tab or another open Pocket Chief tab.
  const collapsed = useSyncExternalStore(subscribeCollapsedSidebar, readCollapsedSidebar, () => false);
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
      {pathname !== "/topics" && <button type="button" className="topics-sidebar-browse" aria-label="Browse topics" aria-haspopup="dialog" aria-expanded={isOpen} onClick={(event) => open(event.currentTarget)}><Notebook size={18} weight="fill" aria-hidden="true" /><span>Browse</span></button>}
      <TopicTree key={pathname} navigation={navigation} />
      <button type="button" className="topics-sidebar-toggle" aria-label={label} onClick={() => saveCollapsedSidebar(!collapsed)}>{collapsed ? <CaretRight size={15} /> : <CaretLeft size={15} />}<span>{collapsed ? "Expand" : "Collapse"}</span></button>
      <GlobalNavigationFooter compact />
    </aside>
    {children}
  </>;
}
