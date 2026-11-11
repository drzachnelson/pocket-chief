import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppShell } from "@/components/app-shell";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

afterEach(() => { pathname = "/"; });

function renderShell(path: string) {
  pathname = path;
  return render(<AppShell><p>Content</p></AppShell>);
}

// The tab bar (phone) and the sidebar (tablet, laptop) are both in the DOM; CSS shows one. Both are named Primary.
const primaryNavs = () => screen.getAllByRole("navigation", { name: "Primary" });
const names = (links: HTMLElement[]) => links.map((link) => link.textContent);
const currentNames = (nav: HTMLElement) => names(within(nav).getAllByRole("link").filter((link) => link.hasAttribute("aria-current")));

describe("AppShell navigation", () => {
  it("offers Home, Topics, Playbooks and Saved as plain links in the tab bar and the sidebar", () => {
    renderShell("/topics/neck-trauma/");
    expect(primaryNavs()).toHaveLength(2);
    for (const nav of primaryNavs()) expect(names(within(nav).getAllByRole("link"))).toEqual(["Home", "Topics", "Playbooks", "Saved"]);
    expect(screen.queryByRole("button", { name: /browse topics/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^search$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /add/i })).not.toBeInTheDocument();
  });

  // `trailingSlash: true` makes the real usePathname() report "/topics/" and "/topics/<slug>/", so every
  // route is exercised in both shapes. The suite used to mock the unslashed form only.
  it.each([
    ["/", "Home", "page"], ["/topics", "Topics", "page"], ["/topics/", "Topics", "page"],
    ["/topics/neck-trauma", "Topics", "true"], ["/topics/neck-trauma/", "Topics", "true"],
    ["/playbooks", "Playbooks", "page"], ["/playbooks/", "Playbooks", "page"], ["/playbooks/temporal-artery-biopsy/", "Playbooks", "true"],
    ["/saved", "Saved", "page"], ["/saved/", "Saved", "page"],
  ])("on %s marks %s current as %s and nothing else", (path, label, state) => {
    renderShell(path);
    for (const nav of primaryNavs()) {
      expect(currentNames(nav)).toEqual([label]);
      expect(within(nav).getByRole("link", { name: label })).toHaveAttribute("aria-current", state);
    }
  });

  it.each(["/settings", "/settings/"])("on %s marks both Settings links current and no primary link", (path) => {
    renderShell(path);
    for (const nav of primaryNavs()) expect(currentNames(nav)).toEqual([]);
    const settings = screen.getAllByRole("link", { name: "Settings" });
    expect(settings).toHaveLength(2);
    for (const link of settings) expect(link).toHaveAttribute("aria-current", "page");
  });

  it("carries Settings on the phone header row and as the sidebar foot, and nothing else in the foot", () => {
    const { container } = renderShell("/topics/neck-trauma/");
    expect(within(container.querySelector<HTMLElement>(".top-row")!).getByRole("link", { name: "Settings" })).toHaveAttribute("href", "/settings");
    const foot = container.querySelector<HTMLElement>(".side-foot")!;
    expect(names(within(foot).getAllByRole("link"))).toEqual(["Settings"]);
    expect(foot.children).toHaveLength(1);
  });

  it.each(["/topics", "/topics/neck-trauma/", "/settings/"])("carries no theme control on %s; the choice lives in Settings", (path) => {
    renderShell(path);
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /theme/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Settings" }).length).toBeGreaterThan(0);
  });

  it("links the mark and name to Home from the header row and the mark alone from the rail", () => {
    const { container } = renderShell("/saved/");
    const header = within(container.querySelector<HTMLElement>(".top-row")!).getByRole("link", { name: "Pocket Chief" });
    const rail = within(container.querySelector<HTMLElement>(".sidebar")!).getByRole("link", { name: "Pocket Chief home" });
    for (const link of [header, rail]) expect(link).toHaveAttribute("href", "/");
    expect(container.querySelectorAll(".brand-mark[aria-hidden='true']")).toHaveLength(2);
  });
});

describe("AppShell structure", () => {
  it.each(["/", "/topics/", "/topics/neck-trauma/", "/playbooks/temporal-artery-biopsy/", "/saved/", "/settings/"])("has one main, one search and no aside, banner or footer on %s", (path) => {
    renderShell(path);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(within(main).getByText("Content")).toBeInTheDocument();
    expect(screen.getAllByRole("search")).toHaveLength(1);
    for (const role of ["banner", "contentinfo", "complementary"]) expect(screen.queryByRole(role), role).not.toBeInTheDocument();
  });

  it("keeps the current compact field in the search slot", () => {
    renderShell("/saved/");
    const form = screen.getByRole("search");
    expect(within(form).getByRole("textbox", { name: "Search surgery notes" })).toHaveAttribute("name", "q");
    expect(form).toHaveAttribute("action", "/");
  });

  // The slot is where the reader-chrome slice puts Contents. It is empty here on purpose.
  it.each(["/topics/neck-trauma", "/topics/neck-trauma/", "/playbooks/temporal-artery-biopsy/"])("holds an empty Contents slot in the sidebar on %s", (path) => {
    const { container } = renderShell(path);
    const slot = container.querySelector("#shell-contents");
    expect(slot).toBeEmptyDOMElement();
    expect(container.querySelector(".sidebar")).toContainElement(slot as HTMLElement);
    expect(screen.queryByRole("navigation", { name: "Contents" })).not.toBeInTheDocument();
  });

  it.each(["/", "/topics", "/topics/", "/playbooks/", "/saved/", "/settings/"])("has no Contents slot on %s", (path) => {
    const { container } = renderShell(path);
    expect(container.querySelector("#shell-contents")).toBeNull();
  });

  it("no longer carries the privacy note, the education line or a collapse control", () => {
    const { container } = renderShell("/topics/neck-trauma/");
    expect(container).not.toHaveTextContent(/private reference|no patient information|educational reference/i);
    expect(screen.queryByRole("button", { name: /sidebar|collapse|expand/i })).not.toBeInTheDocument();
    expect(container.querySelector(".topics-sidebar")).toBeNull();
  });
});
