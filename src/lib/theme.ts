export type Theme = "light" | "dark";

export const THEME_KEY = "pocket-chief-theme";
const QUERY = "(prefers-color-scheme: dark)";

/** Runs blocking in <head> so a stored override is on <html> before first paint. The CSS follows the device on its own, so no override means no attribute. */
export const themeInitScript = `try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());
const media = () => typeof matchMedia === "function" ? matchMedia(QUERY) : null;
const deviceTheme = (): Theme => media()?.matches ? "dark" : "light";

/** The theme in effect: <html data-theme> when an override is set, else the device. The DOM is the one source, so any number of mounted toggles agree and a blocked localStorage still works for the session. */
export function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  return set === "light" || set === "dark" ? set : deviceTheme();
}

/** Choosing the theme the device already has is not an override, so it clears the stored one and the app follows the device again. */
export function applyTheme(next: Theme) {
  const root = document.documentElement;
  const override = next !== deviceTheme();
  if (override) root.dataset.theme = next; else delete root.dataset.theme;
  try { if (override) localStorage.setItem(THEME_KEY, next); else localStorage.removeItem(THEME_KEY); } catch { /* private mode or blocked storage: the choice holds for this page load */ }
  notify();
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  const query = media();
  query?.addEventListener("change", notify);
  return () => { listeners.delete(listener); query?.removeEventListener("change", notify); };
}
