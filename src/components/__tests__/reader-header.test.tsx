import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ReaderHeader } from "@/components/reader-header";
import { isTopicSaved, setPlaybookSaved, setTopicSaved } from "@/lib/offline";
import type { Playbook, Topic } from "@/lib/types";

vi.mock("@/lib/offline", () => ({ isTopicSaved: vi.fn(), setTopicSaved: vi.fn(), setPlaybookSaved: vi.fn() }));

const topic: Topic = { id: "t1", slug: "thyroid-nodule", title: "Thyroid Nodule", aliases: [], scoreNodeId: "n", scoreCategory: "SCORE · Endocrine", tags: [], approvedVersion: null, versions: [], updatedAt: "2026-11-01T00:00:00.000Z" };
const playbook: Playbook = { id: "p1", slug: "thyroidectomy", title: "Thyroidectomy", aliases: [], procedureId: "thyroidectomy", approach: "open", specialty: "Endocrine", tags: [], blocks: [], sourceIds: [], warnings: [], reviewedAt: "2026-11-01T00:00:00.000Z", updatedAt: "2026-11-01T00:00:00.000Z" };

function deferredWrite() {
  let resolve!: () => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<void>((done, fail) => { resolve = done; reject = fail; });
  return { promise, resolve, reject };
}

beforeEach(() => vi.mocked(isTopicSaved).mockResolvedValue(false));
afterEach(() => vi.resetAllMocks());

describe.each([
  { kind: "topic", item: topic, write: vi.mocked(setTopicSaved) },
  { kind: "playbook", item: playbook, write: vi.mocked(setPlaybookSaved) },
])("ReaderHeader $kind save", ({ item, write }) => {
  it.each([false, true])("keeps the stored state %s until the write commits and ignores pending clicks", async (initiallySaved) => {
    vi.mocked(isTopicSaved).mockResolvedValue(initiallySaved);
    const pending = deferredWrite();
    write.mockReturnValue(pending.promise);
    render(<ReaderHeader item={item}>{null}</ReaderHeader>);
    const button = screen.getByRole("button");
    await waitFor(() => expect(button).toBeEnabled());

    fireEvent.click(button);
    expect(button).toHaveTextContent(initiallySaved ? /^Saved$/ : /^Save$/);
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(write).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenCalledWith(item, !initiallySaved);

    await act(async () => pending.resolve());
    expect(button).toHaveTextContent(initiallySaved ? /^Save$/ : /^Saved$/);
    expect(button).toBeEnabled();
  });

  it.each([false, true])("preserves stored state %s and reports a failed write, allowing retry", async (initiallySaved) => {
    vi.mocked(isTopicSaved).mockResolvedValue(initiallySaved);
    const pending = deferredWrite();
    write.mockReturnValueOnce(pending.promise).mockResolvedValueOnce(undefined);
    render(<ReaderHeader item={item}>{null}</ReaderHeader>);
    const button = screen.getByRole("button");
    await waitFor(() => expect(button).toBeEnabled());
    fireEvent.click(button);

    await act(async () => pending.reject(new Error("blocked")));
    expect(button).toHaveTextContent(initiallySaved ? /^Saved$/ : /^Save$/);
    expect(button).toBeEnabled();
    expect(screen.getByRole("alert")).toHaveTextContent("This device blocked private storage, so this page was not saved.");

    fireEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent(initiallySaved ? /^Save$/ : /^Saved$/));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(write).toHaveBeenLastCalledWith(item, !initiallySaved);
  });
});
