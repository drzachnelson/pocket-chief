import { beforeEach, describe, expect, it } from "vitest";
import { GET as search } from "@/app/api/search/route";
import { POST as createDraft } from "@/app/api/topics/drafts/route";
import { resetDemoStore } from "@/lib/store";

describe("authenticated API contracts in demo mode", () => {
  beforeEach(() => resetDemoStore());

  it("returns only approved search results", async () => {
    const response = await search(new Request("http://localhost/api/search?q=cbd"));
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.results[0].slug).toBe("choledocholithiasis");
  });

  it("rejects suspected PHI before drafting", async () => {
    const request = new Request("http://localhost/api/topics/drafts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test", rawNotes: "Patient John Smith MRN 12345678", imageIds: [], sourceMetadata: [{ title: "Notes", kind: "user_notes" }], scoreNodeId: "biliary", tags: [] }),
    });
    const response = await createDraft(request);
    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ code: "PHI_SUSPECTED" });
  });
});
