import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PlaybooksPage from "@/app/playbooks/page";
import PlaybookPage, { generateStaticParams } from "@/app/playbooks/[slug]/page";
import { listPlaybooks, listPlaybookSummaries } from "@/lib/library";
import { specialtyId } from "@/lib/library-items";

// The page mounts the real reader, whose Save and recent view write to IndexedDB; jsdom has none.
vi.mock("@/lib/offline", () => ({ recordRecentView: vi.fn(async () => undefined), isTopicSaved: vi.fn(async () => false), setPlaybookSaved: vi.fn(async () => undefined) }));

describe("playbooks index", () => {
  const specialties = () => [...new Set(listPlaybookSummaries().map(({ specialty }) => specialty))].sort((a, b) => a.localeCompare(b));

  it("is an h1 over one title-only row per playbook, under one alphabetical heading per specialty", () => {
    const { container } = render(<PlaybooksPage />);

    expect(screen.getByRole("heading", { name: "Playbooks", level: 1 })).toBeInTheDocument();
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.map((heading) => heading.firstElementChild!.textContent)).toEqual(specialties());
    for (const heading of headings) {
      const specialty = heading.firstElementChild!.textContent!;
      const expected = listPlaybookSummaries().filter((playbook) => playbook.specialty === specialty).map(({ title }) => title).sort((a, b) => a.localeCompare(b));
      const rows = within(heading.parentElement!.querySelector("ul")!).getAllByRole("link");
      expect(rows.map((row) => row.textContent), specialty).toEqual(expected);
      // The count beside a heading is silent and matches its rows.
      expect(heading.lastElementChild).toHaveAttribute("aria-hidden", "true");
      expect(heading.lastElementChild!.textContent).toBe(String(expected.length));
    }
    expect(screen.getAllByRole("listitem")).toHaveLength(listPlaybookSummaries().length);
    expect(screen.getByRole("link", { name: "Temporal Artery Biopsy" })).toHaveAttribute("href", "/playbooks/temporal-artery-biopsy");
    // No approach filter or label: approach is a search term and a header line, not a way to browse.
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.querySelector("small, .eyebrow, .page-lede")).toBeNull();
  });

  it("gives each specialty heading the anchor the playbook page links to", () => {
    render(<PlaybooksPage />);

    for (const specialty of specialties()) expect(screen.getByRole("heading", { name: specialty, level: 2 }), specialty).toHaveAttribute("id", specialtyId(specialty));
    expect(new Set(specialties().map(specialtyId)).size).toBe(specialties().length);
  });
});

describe("playbook page", () => {
  it("prerenders one route per authored playbook", () => {
    // With no server to resolve a slug, this list *is* the set of pages that exist. A playbook
    // missing from it is a 404 in production that the dev server would serve happily.
    expect(generateStaticParams()).toEqual(listPlaybooks().map((playbook) => ({ slug: playbook.slug })));
  });

  it("renders the guide under a breadcrumb: its specialty linking to its heading on the index, then its approach as plain text", async () => {
    render(await PlaybookPage({ params: Promise.resolve({ slug: "temporal-artery-biopsy" }) }));

    expect(screen.getByRole("heading", { name: "Temporal Artery Biopsy", level: 1 })).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getAllByRole("listitem").map((item) => item.textContent)).toEqual(["Vascular", "Open"]);
    // The anchor exists on the index (the heading test above pins `specialtyId`), and only the specialty is a link.
    expect(within(nav).getByRole("link", { name: "Vascular" })).toHaveAttribute("href", `/playbooks#${specialtyId("Vascular")}`);
    expect(within(nav).getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByRole("link", { name: /all playbooks/i })).not.toBeInTheDocument();
  });

  it("closes with a UTC-stable Last updated line, then the disclaimer, once", async () => {
    const { container } = render(await PlaybookPage({ params: Promise.resolve({ slug: "temporal-artery-biopsy" }) }));

    // Formatted in UTC so the printed date does not shift with the build machine's timezone.
    const end = container.querySelector(".reader-end")!;
    expect([...end.children].map((line) => line.textContent)).toEqual(["Last updated Sep 10, 2026", "Educational reference only. Not patient-specific guidance."]);
    expect(screen.getAllByText(/Educational reference only/)).toHaveLength(1);
    expect(container.lastElementChild!.lastElementChild).toBe(end);
  });

  it("offers Save and Sources but no History tab", async () => {
    render(await PlaybookPage({ params: Promise.resolve({ slug: "temporal-artery-biopsy" }) }));

    expect(screen.getByRole("tab", { name: /Sources/ })).toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: /History/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
});
