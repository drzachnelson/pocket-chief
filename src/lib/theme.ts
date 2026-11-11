export type ThemeChoice = "system" | "light" | "dark";

export const THEME_KEY = "pocket-chief-theme";

/** Runs blocking in <head> so a stored override is on <html> before first paint. The CSS follows the device on its own, so no override means no attribute. */
export const themeInitScript = `try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const listeners = new Set<() => void>();

/** The reader's choice: <html data-theme> when an override is set, else "system". The DOM is the one source, so a blocked localStorage still works for the session. The device theme is the CSS's job, so nothing here listens to it. */
export function themeChoice(): ThemeChoice {
  const set = document.documentElement.dataset.theme;
  return set === "light" || set === "dark" ? set : "system";
}

/** Light and dark are overrides and stay put when the device changes. System clears the stored one so the app follows the device again. */
export function setThemeChoice(next: ThemeChoice) {
  const root = document.documentElement;
  if (next === "system") delete root.dataset.theme; else root.dataset.theme = next;
  try { if (next === "system") localStorage.removeItem(THEME_KEY); else localStorage.setItem(THEME_KEY, next); } catch { /* private mode or blocked storage: the choice holds for this page load */ }
  listeners.forEach((listener) => listener());
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
