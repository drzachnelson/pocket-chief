import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PlaybooksPage from "@/app/playbooks/page";
import PlaybookPage, { generateStaticParams } from "@/app/playbooks/[slug]/page";
import { listPlaybooks, listPlaybookSummaries } from "@/lib/library";
import { specialtyId } from "@/lib/library-items";

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

  it("renders the guide with its specialty, approach and a UTC-stable date", async () => {
    render(await PlaybookPage({ params: Promise.resolve({ slug: "temporal-artery-biopsy" }) }));

    expect(screen.getByRole("heading", { name: "Temporal Artery Biopsy", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Vascular · Open")).toBeInTheDocument();
    // Formatted in UTC so the printed date does not shift with the build machine's timezone.
    expect(screen.getByText("Last updated Sep 10, 2026")).toBeInTheDocument();
  });

  it("offers Sources but neither History nor Save", async () => {
    render(await PlaybookPage({ params: Promise.resolve({ slug: "temporal-artery-biopsy" }) }));

    expect(screen.getByRole("tab", { name: /Sources/ })).toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: /History/ })).not.toBeInTheDocument();
    // Save writes a Topic-shaped row into the `saved` store, which every reader of that store
    // renders through TopicCard — a broken card linking to /topics/<playbook slug>.
    expect(screen.queryByRole("button", { name: "Save" })).not.toBeInTheDocument();
  });
});
