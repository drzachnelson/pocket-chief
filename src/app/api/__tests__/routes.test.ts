import { beforeEach, describe, expect, it } from "vitest";
import { GET as search } from "@/app/api/search/route";
import { POST as createDraft } from "@/app/api/topics/drafts/route";
import { POST as approveDraft } from "@/app/api/topics/drafts/[id]/approve/route";
import { PATCH as updateBlock } from "@/app/api/topics/drafts/[id]/blocks/[blockId]/route";
import { POST as restoreVersion } from "@/app/api/topics/versions/[id]/restore/route";
import { POST as createCloze } from "@/app/api/anki/drafts/route";
import { PATCH as updateCloze } from "@/app/api/anki/drafts/[id]/route";
import { getRepository } from "@/lib/repository";
import { POST as createTaxonomy, PATCH as updateTaxonomy } from "@/app/api/taxonomy/route";
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

  it("rejects suspected PHI in titles and source metadata before drafting", async () => {
    for (const body of [
      { title: "John Smith", rawNotes: "Educational notes.", sourceMetadata: [{ title: "Owner notes", kind: "user_notes" }] },
      { title: "Educational Review", rawNotes: "Educational notes.", sourceMetadata: [{ title: "Owner notes", kind: "user_notes", details: "MRN 12345678" }] },
    ]) {
      const response = await createDraft(new Request("http://localhost/api/topics/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, imageIds: [], scoreNodeId: "biliary", tags: [] }),
      }));
      expect(response.status).toBe(422);
      expect(await response.json()).toMatchObject({ code: "PHI_SUSPECTED" });
    }
  });

  it("creates a real topic, keeps its draft out of search, approves it, and restores with the next version", async () => {
    const created = await createDraft(new Request("http://localhost/api/topics/drafts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Acute Wound Care", rawNotes: "Educational wound principles from owner notes.", imageIds: [], sourceMetadata: [{ title: "Owner notes", kind: "user_notes" }], scoreNodeId: "biliary", tags: ["wound"], mode: "notes_only" }),
    }));
    const payload = await created.json();
    expect(created.status).toBe(201);
    expect(payload.topic.title).toBe("Acute Wound Care");
    expect((await (await search(new Request("http://localhost/api/search?q=acute+wound"))).json()).results).toEqual([]);

    const block = payload.draft.blocks[0];
    block.claims = [{ ...block.claims[0], text: block.text, citationIds: [payload.draft.sourceIds[0]], status: "cited" }];
    const attested = await updateBlock(new Request("http://localhost", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ block, supportAttestation: true }) }), { params: Promise.resolve({ id: payload.draft.id, blockId: block.id }) });
    expect(attested.status).toBe(200);

    const approved = await approveDraft(new Request("http://localhost", { method: "POST" }), { params: Promise.resolve({ id: payload.draft.id }) });
    expect(approved.status).toBe(200);
    const approvedPayload = await approved.json();
    expect((await (await search(new Request("http://localhost/api/search?q=acute+wound"))).json()).results[0].title).toBe("Acute Wound Care");

    const restored = await restoreVersion(new Request("http://localhost", { method: "POST" }), { params: Promise.resolve({ id: approvedPayload.version.id }) });
    expect(restored.status).toBe(201);
    expect((await restored.json()).draft.versionNumber).toBe(2);
  });

  it("does not approve a forged citation ID", async () => {
    const created = await createDraft(new Request("http://localhost/api/topics/drafts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Citation Guard", rawNotes: "Educational statement from owner notes.", imageIds: [], sourceMetadata: [{ title: "Owner notes", kind: "user_notes" }], scoreNodeId: "biliary", tags: [], mode: "notes_only" }),
    }));
    const payload = await created.json();
    const block = payload.draft.blocks[0];
    block.claims[0].citationIds = ["invented-source"];
    const updated = await updateBlock(new Request("http://localhost", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ block, supportAttestation: true }) }), { params: Promise.resolve({ id: payload.draft.id, blockId: block.id }) });
    expect(updated.status).toBe(200);
    expect((await updated.json()).draft.warnings[0]).toMatch(/Needs support/);
    const approved = await approveDraft(new Request("http://localhost", { method: "POST" }), { params: Promise.resolve({ id: payload.draft.id }) });
    expect(approved.status).toBe(409);
  });

  it("rejects cited block updates without explicit owner support attestation", async () => {
    const created = await createDraft(new Request("http://localhost/api/topics/drafts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: "Attestation Guard", rawNotes: "Educational statement.", imageIds: [], sourceMetadata: [{ title: "Owner notes", kind: "user_notes" }], scoreNodeId: "biliary", tags: [], mode: "notes_only" }) }));
    const payload = await created.json();
    const block = payload.draft.blocks[0];
    block.claims[0] = { ...block.claims[0], citationIds: [payload.draft.sourceIds[0]], status: "cited" };
    const response = await updateBlock(new Request("http://localhost", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ block }) }), { params: Promise.resolve({ id: payload.draft.id, blockId: block.id }) });
    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ code: "SUPPORT_ATTESTATION_REQUIRED" });
  });

  it("persists the owner's reviewed Anki edit for later backup", async () => {
    const created = await createCloze(new Request("http://localhost/api/anki/drafts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selection: "Completion imaging documents duct clearance.", topicId: "topic-choledocholithiasis", sourceBlockIds: ["block-sequence"], contextImageRef: "context.svg", tags: ["biliary"] }),
    }));
    const payload = await created.json();
    const reviewedText = "{{c1::Completion imaging}} documents duct clearance.";
    const updated = await updateCloze(new Request("http://localhost", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ clozeText: reviewedText }) }), { params: Promise.resolve({ id: payload.draft.id }) });

    expect(updated.status).toBe(200);
    expect((await (await getRepository()).listCards())[0].clozeText).toBe(reviewedText);
  });

  it("reuses an existing duplicate Anki draft instead of dead-ending export", async () => {
    const body = { selection: "Completion imaging documents duct clearance.", topicId: "topic-choledocholithiasis", sourceBlockIds: ["block-sequence"], contextImageRef: "context.svg", tags: ["biliary"] };
    const first = await createCloze(new Request("http://localhost/api/anki/drafts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));
    const second = await createCloze(new Request("http://localhost/api/anki/drafts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));
    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect((await second.json()).draft.id).toBe((await first.json()).draft.id);
    expect((await (await getRepository()).listCards())).toHaveLength(1);
  });

  it("creates and edits owner taxonomy nodes", async () => {
    const created = await createTaxonomy(new Request("http://localhost/api/taxonomy", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: "Vascular Surgery", parentId: null, order: 4 }) }));
    const payload = await created.json();
    expect(created.status).toBe(201);
    const updated = await updateTaxonomy(new Request("http://localhost/api/taxonomy", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: payload.node.id, title: "Vascular", parentId: null, order: 4 }) }));
    expect(updated.status).toBe(200);
    expect((await updated.json()).node.title).toBe("Vascular");
  });
});
