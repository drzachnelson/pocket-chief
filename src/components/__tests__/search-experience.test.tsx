import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchExperience } from "@/components/search-experience";
import { loadLibrary, loadPlaybooks } from "@/lib/library-client";
import { getRecentTopics, getSavedTopics } from "@/lib/offline";
import type { Library } from "@/lib/library-client";
import type { Topic } from "@/lib/types";

vi.mock("@/lib/library-client", () => ({ loadLibrary: vi.fn(), loadPlaybooks: vi.fn() }));
vi.mock("@/lib/offline", () => ({ getRecentTopics: vi.fn(), getSavedTopics: vi.fn() }));

const readLibrary = vi.mocked(loadLibrary);
const readPlaybooks = vi.mocked(loadPlaybooks);
const readRecent = vi.mocked(getRecentTopics);
const readSaved = vi.mocked(getSavedTopics);

function topic(id: string, title: string, scoreNodeId: string): Topic {
  return {
    id,
    slug: id,
    title,
    aliases: [],
    scoreCategory: `${scoreNodeId} category`,
    scoreNodeId,
    tags: [],
    updatedAt: "2026-08-19T00:00:00.000Z",
    approvedVersion: { id: `${id}-v1`, topicId: id, versionNumber: 1, status: "approved", blocks: [], sourceIds: [], scoreNodeId, tags: [], warnings: [], createdAt: "2026-08-19T00:00:00.000Z" },
    versions: [],
  };
}

const choledocholithiasis = topic("choledocholithiasis", "Choledocholithiasis", "biliary");
const appendicitis = topic("appendicitis", "Appendicitis", "acute-care");

beforeEach(() => {
  readLibrary.mockResolvedValue({ topics: [], taxonomy: [] });
  readPlaybooks.mockResolvedValue({ playbooks: [] });
  readRecent.mockResolvedValue([]);
  readSaved.mockResolvedValue([]);
});

afterEach(() => { vi.clearAllMocks(); });

describe("SearchExperience (Home)", () => {
  it("replaces the removed /add flow with a Library section pointing at /topics and /saved", async () => {
    readLibrary.mockResolvedValue({ topics: [choledocholithiasis, appendicitis], taxonomy: [] });
    render(<SearchExperience />);
    expect(await screen.findByText("2 topics")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Library" })).toBeInTheDocument();
    expect(screen.getByText("2 SCORE sections covered")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse the score curriculum/i })).toHaveAttribute("href", "/topics");
    expect(screen.getByRole("link", { name: /return to saved topics/i })).toHaveAttribute("href", "/saved");
    expect(screen.queryByRole("link", { name: /add the next topic packet/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Continue building" })).not.toBeInTheDocument();
  });

  it("renders a zero-topic library before loadLibrary resolves", () => {
    readLibrary.mockReturnValue(new Promise<Library>(() => {}));
    render(<SearchExperience />);
    expect(screen.getByText("0 topics")).toBeInTheDocument();
    expect(screen.getByText("0 SCORE sections covered")).toBeInTheDocument();
  });

  it("draws no search field of its own and no results: the shell holds the one field and /search the results", () => {
    render(<SearchExperience />);
    expect(screen.queryByRole("search")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByText(/private clinical atlas|titles, aliases|clear search/i)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Pocket Chief" })).toBeInTheDocument();
  });
});
