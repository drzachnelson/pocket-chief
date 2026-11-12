"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { ChangeEvent, FocusEvent, FormEvent, KeyboardEvent } from "react";
import { CaretRight, MagnifyingGlass, X } from "@phosphor-icons/react";
import { FailedRead } from "@/components/read-states";
import { loadSearchIndex, useLoader } from "@/lib/library-client";
import { normalizePath } from "@/lib/pathname";
import { hitHref, hitLine, searchIndex } from "@/lib/search";

// Next prefixes basePath onto <Link> and router navigations, but NOT onto a plain <form action>.
// Left as "/search/" the form would submit to the origin root without JavaScript, outside the mount point, and 404.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const QUICK_ROWS = 6;
const MIN_CHARS = 2; // one letter matches half the library; the matcher is for words

const idle = () => new Promise<never>(() => undefined); // keeps the loader waiting until the reader first touches the field
const noSubscription = () => () => undefined;
const addressQuery = () => new URLSearchParams(window.location.search).get("q") ?? "";
const noAddress = () => "";

/**
 * The one search field, in the shell's search slot on every page: the header row on a phone, the top row from 760px.
 * It sits outside any Suspense boundary so the static HTML holds it, which is why it does not call `useSearchParams`:
 * on the results page it reads the address through `useSyncExternalStore` and writes it with `replaceState`, and the
 * results page reads `?q=` under its own boundary.
 *
 * Quick results are the ARIA combobox pattern over the prebuilt index: focus stays in the input, `aria-activedescendant`
 * names the highlighted row, Up and Down move through the rows and back to none, Enter opens the highlighted row or, with
 * none, the results page, and Escape closes the panel and leaves focus here. The index is not fetched until the field is
 * first focused, so reading a page pays nothing for search. The results page lists every match as you type, so the panel
 * stays out of its way there.
 */
export function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const onResults = normalizePath(pathname) === "/search";
  const listId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [typed, setTyped] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [wanted, setWanted] = useState(false);
  // A new page starts a new field, adjusted during render so there is no second pass. Arriving on the results page keeps what
  // was typed: Enter pushes the address, and the address is not in the location yet while this render runs.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); setOpen(false); setActive(-1); if (!onResults) setTyped(null); }
  const address = useSyncExternalStore(noSubscription, addressQuery, noAddress);
  const query = typed ?? (onResults ? address : "");
  const index = useLoader(wanted ? loadSearchIndex : idle);
  const long = query.trim().length >= MIN_CHARS;
  // Not on the results page: its own list scores the same query, and scoring it twice per keystroke doubled the cost there.
  // Scored from a deferred copy of the query so the field echoes the key before the panel catches up; a key typed meanwhile drops the stale pass.
  const scored = useDeferredValue(query);
  const hits = useMemo(() => index.ready && long && !onResults ? searchIndex(index.data, scored).slice(0, QUICK_ROWS) : [], [index.data, index.ready, long, onResults, scored]);
  const showRows = open && !onResults && hits.length > 0;
  const showFailed = open && !onResults && long && index.failed;

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      // Shift is allowed: "/" is Shift-7 on some layouts, and `key` already tells it from "?".
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented) return;
      if ((event.target as Element | null)?.closest?.("input, textarea, select, [contenteditable]:not([contenteditable='false'])")) return;
      input.current?.focus();
      if (document.activeElement === input.current) event.preventDefault(); // an inert field (a modal is open) keeps the key
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const mirror = (value: string) => { if (onResults) window.history.replaceState(null, "", `?q=${encodeURIComponent(value)}`); };
  function change(event: ChangeEvent<HTMLInputElement>) {
    setTyped(event.target.value); setOpen(true); setActive(-1); mirror(event.target.value);
  }
  function clear() { setTyped(""); setOpen(false); setActive(-1); mirror(""); input.current?.focus(); }
  function submit(event: FormEvent) {
    event.preventDefault();
    setOpen(false);
    if (query.trim() && !onResults) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }
  function keyDown(event: KeyboardEvent<HTMLInputElement>) {
    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && hits.length && !onResults) {
      event.preventDefault();
      if (!open) setOpen(true);
      else setActive((now) => (now + 1 + (event.key === "ArrowDown" ? 1 : -1) + hits.length + 1) % (hits.length + 1) - 1);
    } else if (event.key === "Escape" && (showRows || showFailed)) {
      event.preventDefault(); setOpen(false); setActive(-1);
    } else if (event.key === "Enter" && showRows && active >= 0) {
      event.preventDefault(); setOpen(false); router.push(hitHref(hits[active]));
    }
  }
  function focus() { setWanted(true); setOpen(true); }
  function blur(event: FocusEvent<HTMLFormElement>) { if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setActive(-1); } }

  return (
    <form className="search-box" role="search" action={`${basePath}/search/`} onSubmit={submit} onFocus={focus} onBlur={blur}>
      <div className="search-input">
        <MagnifyingGlass size={17} aria-hidden="true" />
        <input
          ref={input} name="q" type="search" role="combobox" value={query} onChange={change} onKeyDown={keyDown}
          aria-label="Search" placeholder="Search" aria-expanded={showRows} aria-controls={showRows ? listId : undefined} aria-autocomplete="list" aria-activedescendant={showRows && active >= 0 ? `${listId}-${active}` : undefined}
          enterKeyHint="search" autoComplete="off" autoCapitalize="none" spellCheck={false}
        />
        {query && <button className="search-clear" type="button" aria-label="Clear" onClick={clear}><X size={16} aria-hidden="true" /></button>}
      </div>
      {(showRows || showFailed) && (
        // Pressing inside the panel must not blur the field, or the panel would close before the click lands.
        <div className="quick-results" onMouseDown={(event) => event.preventDefault()}>
          {showFailed ? <FailedRead message="Search isn't available." retrying={index.retrying} retry={index.retry} /> : (
            <ul className="list-rows" role="listbox" id={listId} aria-label="Quick results">
              {hits.map((hit, row) => (
                <li key={hit.item.id} role="option" id={`${listId}-${row}`} aria-selected={row === active}>
                  <Link className="list-row" href={hitHref(hit)} tabIndex={-1} onClick={() => setOpen(false)}>
                    <span className="list-row-text"><span>{hit.item.title}</span><small>{hitLine(hit)}</small></span>
                    {hit.item.kind === "playbook" && <span className="list-row-trailing">Playbook</span>}
                    <CaretRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
