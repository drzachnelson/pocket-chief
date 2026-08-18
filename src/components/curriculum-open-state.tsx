"use client";

import { useEffect } from "react";

// The sections are server-rendered <details>, so collapse state has to live in the URL or the
// back button drops it — and "open a topic, come back, open the next one in the same category"
// is the whole browse loop. `history.replaceState` keeps the write shallow; `router.replace`
// would re-run this force-dynamic page on every toggle. The param lists the CLOSED ids, so the
// default of everything-open keeps the common URL clean.
//
// Writing the URL is only half of it: a client-side <Link> back into /topics is served from the
// App Router cache, whose payload predates the replaceState and has every section open again.
// So the URL is also read back onto the DOM on mount and on popstate — the param, not the
// cached markup, is the source of truth.
export function CurriculumOpenState() {
  useEffect(() => {
    const container = document.querySelector<HTMLElement>(".curriculum-sections");
    if (!container) return;
    const sections = () => Array.from(container.querySelectorAll<HTMLDetailsElement>("details[data-node-id]"));

    function syncUrl() {
      const closed = sections().filter((section) => !section.open).map((section) => section.dataset.nodeId!);
      const url = new URL(window.location.href);
      if (closed.length) url.searchParams.set("closed", closed.join(",")); else url.searchParams.delete("closed");
      if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
    }

    function applyUrl() {
      const closed = new Set((new URL(window.location.href).searchParams.get("closed") ?? "").split(",").filter(Boolean));
      for (const section of sections()) {
        const shouldBeOpen = !closed.has(section.dataset.nodeId!) && section.dataset.empty !== "true";
        if (section.open !== shouldBeOpen) section.open = shouldBeOpen;
      }
    }

    // A jump link that lands on a collapsed section is a broken jump link, so the rail forces
    // its target open. `toggle` does not bubble but does run through the capture phase.
    function openHashTarget() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = container!.querySelector<HTMLDetailsElement>(`details[id="${CSS.escape(id)}"]`);
      if (!target || target.dataset.empty === "true") return;
      target.open = true;
      // Opening reflows everything below the target, so the browser's own hash scroll lands in
      // the wrong place. Re-scroll once the section has its real height — instantly, because a
      // smooth scroll would be chasing a box that is still growing.
      requestAnimationFrame(() => requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "instant" })));
    }

    function restore() { applyUrl(); openHashTarget(); }

    container.addEventListener("toggle", syncUrl, true);
    window.addEventListener("hashchange", openHashTarget);
    window.addEventListener("popstate", restore);
    restore();
    return () => {
      container.removeEventListener("toggle", syncUrl, true);
      window.removeEventListener("hashchange", openHashTarget);
      window.removeEventListener("popstate", restore);
    };
  }, []);
  return null;
}
