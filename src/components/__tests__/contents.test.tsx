import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Contents, ContentsDialog, READER_TAB_EVENT } from "@/components/contents";
import type { ContentsData } from "@/lib/reader-contents";

let currentPathname = "/topics";
vi.mock("next/navigation", () => ({ usePathname: () => currentPathname }));

const branched: ContentsData = {
  corpus: "topics",
  sections: [{ id: "assessment", label: "**Assessment**", level: 2 }, { id: "detail", label: "Detail", level: 3 }],
  branches: [
    { id: "abdominal", label: "Abdominal", links: [], groups: [
      { id: "upper", label: "Upper GI", links: [{ slug: "alpha-topic", label: "Alpha topic" }] },
      { id: "lower", label: "Lower GI", links: [{ slug: "beta-topic", label: "Beta topic" }] },
    ] },
    { id: "trauma", label: "Trauma", links: [{ slug: "neck-trauma", label: "Neck trauma" }], groups: [] },
  ],
};

const playbooks: ContentsData = {
  corpus: "playbooks", sections: [],
  branches: [
    { id: "colorectal", label: "Colorectal", links: [{ slug: "anal-fissure-repair", label: "Anal fissure repair" }], groups: [] },
    { id: "vascular", label: "Vascular", links: [{ slug: "open-venous-thrombectomy", label: "Open venous thrombectomy" }, { slug: "ivc-filter", label: "IVC filter" }], groups: [] },
  ],
};

afterEach(() => { currentPathname = "/topics"; document.body.innerHTML = ""; });

describe("Contents", () => {
  // `trailingSlash: true` makes the real usePathname() report "/topics/alpha-topic/". This suite
  // once mocked only the unslashed form, which is why it stayed green while the live
  // tree silently stopped expanding on every topic page.
  it.each([["without a trailing slash", "/topics/alpha-topic"], ["with a trailing slash", "/topics/alpha-topic/"]])(
    "opens the category of the current topic and marks it %s", (_label, pathname) => {
      currentPathname = pathname;
      render(<Contents data={branched} />);

      expect(screen.getByRole("link", { name: "Alpha topic" })).toHaveAttribute("aria-current", "page");
      expect(screen.queryByRole("link", { name: "Beta topic" })).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "Neck trauma" })).not.toBeInTheDocument();
    },
  );

  it("is one navigation named Contents with plain-text part labels, not headings, and silent counts", () => {
    currentPathname = "/topics/alpha-topic";
    render(<Contents data={branched} />);

    const nav = screen.getByRole("navigation", { name: "Contents" });
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(within(nav).getByRole("group", { name: "On this page" })).toBeInTheDocument();
    expect(within(nav).getByRole("group", { name: "Topics" })).toBeInTheDocument();
    // The count is aria-hidden, so it is not part of the button's name.
    expect(within(nav).getByRole("button", { name: "Trauma" })).toBeInTheDocument();
    expect(within(nav).getByRole("button", { name: "Trauma" }).querySelector("small")).toHaveAttribute("aria-hidden", "true");
  });

  it("links each section with its markup stripped", () => {
    render(<Contents data={branched} />);
    const link = screen.getByRole("link", { name: "Assessment" });
    expect(link).toHaveAttribute("href", "#assessment");
    expect(screen.getByRole("link", { name: "Detail" })).toHaveAttribute("data-level", "3");
  });

  it("keeps inactive groups closed until selected, and the current group cannot be collapsed", () => {
    currentPathname = "/topics/alpha-topic/";
    render(<Contents data={branched} />);

    expect(screen.getByRole("button", { name: "Upper GI" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "Abdominal" })).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(screen.getByRole("button", { name: "Upper GI" }));
    expect(screen.getByRole("link", { name: "Alpha topic" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Lower GI" }));
    expect(screen.getByRole("link", { name: "Beta topic" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Lower GI" }));
    expect(screen.queryByRole("link", { name: "Beta topic" })).not.toBeInTheDocument();
  });

  it("opens one category at a time", () => {
    currentPathname = "/topics/alpha-topic/";
    render(<Contents data={branched} />);

    fireEvent.click(screen.getByRole("button", { name: "Trauma" }));
    expect(screen.getByRole("link", { name: "Neck trauma" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Alpha topic" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abdominal" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: "Abdominal" })).not.toHaveAttribute("aria-disabled");
  });

  it("follows the reader to a topic in another category", () => {
    currentPathname = "/topics/alpha-topic";
    const view = render(<Contents data={branched} />);
    currentPathname = "/topics/neck-trauma";
    view.rerender(<Contents data={branched} />);

    expect(screen.getByRole("link", { name: "Neck trauma" })).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Alpha topic" })).not.toBeInTheDocument();
  });

  it("lists playbooks by specialty with the open playbook's specialty expanded and the playbook marked", () => {
    currentPathname = "/playbooks/open-venous-thrombectomy/";
    render(<Contents data={playbooks} />);

    expect(screen.getByRole("group", { name: "Playbooks" })).toBeInTheDocument();
    expect(screen.queryByRole("group", { name: "On this page" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Vascular" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Open venous thrombectomy" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Open venous thrombectomy" })).toHaveAttribute("href", "/playbooks/open-venous-thrombectomy");
    expect(screen.getByRole("button", { name: "Colorectal" })).toHaveAttribute("aria-expanded", "false");
  });

  describe("current section", () => {
    // jsdom has no layout, so each block reports where the page would have put it: the first is at the marker, the second is still below the fold.
    const mountSections = () => { for (const [id, top] of [["assessment", 10], ["detail", 500]] as const) { const block = document.createElement("section"); block.id = id; block.getBoundingClientRect = () => ({ top }) as DOMRect; document.body.append(block); } };

    it("marks the section the page is at, and nothing once the blocks leave the page", () => {
      mountSections();
      render(<Contents data={branched} />);
      expect(screen.getByRole("link", { name: "Assessment" })).toHaveAttribute("aria-current", "location");

      // Sources and History unmount Notes. The reader page announces the change, because this list may live outside its tree.
      document.getElementById("assessment")!.remove();
      document.getElementById("detail")!.remove();
      act(() => { window.dispatchEvent(new Event(READER_TAB_EVENT)); });
      expect(screen.getAllByRole("link").filter((link) => link.hasAttribute("aria-current") && link.getAttribute("aria-current") === "location")).toEqual([]);
    });
  });
});

describe("ContentsDialog", () => {
  it("is a modal dialog titled Contents that holds the same navigation", () => {
    currentPathname = "/topics/alpha-topic";
    render(<ContentsDialog data={branched} onClose={() => undefined} />);

    const dialog = screen.getByRole("dialog", { name: "Contents" });
    expect(dialog).toHaveAttribute("open");
    expect(within(dialog).getByRole("heading", { level: 2, name: "Contents" })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Alpha topic" })).toBeInTheDocument();
  });

  it("closes from its close button", () => {
    const onClose = vi.fn();
    render(<ContentsDialog data={branched} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Close contents" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when a section or topic link is tapped, so the page can scroll or navigate", () => {
    const onClose = vi.fn();
    render(<ContentsDialog data={branched} onClose={onClose} />);
    fireEvent.click(screen.getByRole("link", { name: "Assessment" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes from its scrim: a click that targets the dialog itself landed on the ::backdrop, one inside it did not", () => {
    const onClose = vi.fn();
    render(<ContentsDialog data={branched} onClose={onClose} />);
    fireEvent.click(screen.getByRole("heading", { name: "Contents" }));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes on a downward swipe of its header and not on a short one", () => {
    const onClose = vi.fn();
    render(<ContentsDialog data={branched} onClose={onClose} />);
    const header = screen.getByRole("heading", { name: "Contents" }).parentElement!;

    fireEvent.touchStart(header, { touches: [{ clientY: 100 }] });
    fireEvent.touchEnd(header, { changedTouches: [{ clientY: 130 }] });
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.touchStart(header, { touches: [{ clientY: 100 }] });
    fireEvent.touchEnd(header, { changedTouches: [{ clientY: 190 }] });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
