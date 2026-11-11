"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDown, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useTopicsDrawer } from "@/components/app-shell";
import { normalizePath } from "@/lib/pathname";
import type { TopicNavigationCategory, TopicNavigationSection, TopicNavigationTopic } from "@/lib/topic-navigation";

const FOCUSABLE = "a[href], button:not([disabled])";

function categoryTopics(category: TopicNavigationCategory) {
  return [category, ...category.children].flatMap((item) => item.topics);
}

// usePathname() reports "/topics/<slug>/" on the static export, so the comparison goes through normalizePath.
function activeTopic(navigation: TopicNavigationCategory[], pathname: string) {
  const path = normalizePath(pathname);
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

export function TopicTree({ navigation, onSelect }: { navigation: TopicNavigationCategory[]; onSelect?: () => void }) {
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

// The drawer's only job here is to receive the tree. The persistent sidebar tree, its collapse and the Browse button
// went with the second shell; the reader-chrome slice turns this file into the Contents component.
export function TopicsWorkspace({ navigation, children }: { navigation: TopicNavigationCategory[]; children: React.ReactNode }) {
  const { setContent } = useTopicsDrawer();
  useEffect(() => {
    setContent(<TopicsDrawer navigation={navigation} />);
    return () => setContent(null);
  }, [navigation, setContent]);
  return <>{children}</>;
}
