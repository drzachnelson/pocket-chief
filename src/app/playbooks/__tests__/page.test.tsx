import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PlaybooksPage from "@/app/playbooks/page";
import PlaybookPage, { generateStaticParams } from "@/app/playbooks/[slug]/page";
import { listPlaybooks } from "@/lib/library";

describe("playbooks index", () => {
  it("groups the guides by specialty", () => {
    render(<PlaybooksPage />);
    expect(screen.getByRole("heading", { name: "Playbooks", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Vascular", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Temporal Artery Biopsy/ })).toHaveAttribute("href", "/playbooks/temporal-artery-biopsy");
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
