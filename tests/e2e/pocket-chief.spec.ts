import { expect, test } from "@playwright/test";
import JSZip from "jszip";

test("search, read, save, and draft a cloze", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Search Pocket Chief").fill("choledochoithiasis");
  await page.getByRole("button", { name: "Search" }).click();
  const result = page.locator(".topic-grid").getByRole("link", { name: /Choledocholithiasis/ });
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.getByRole("heading", { name: "Transcystic decision flow" })).toBeVisible();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("button", { name: "Saved offline" })).toBeVisible();
  await page.getByRole("button", { name: /Make Anki card from Age alone/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByLabel("Cloze text")).toHaveValue(/\{\{c1::Age alone}}/);
  const reviewedText = `{{c1::Age alone}} is not an age-based contraindication to exploration (${test.info().project.name}).`;
  await page.getByLabel("Cloze text").fill(reviewedText);
  const updateResponse = page.waitForResponse((response) => response.request().method() === "PATCH" && response.url().includes("/api/anki/drafts/"));
  await page.getByRole("button", { name: "Close" }).click();
  const saved = await updateResponse;
  expect(saved.status()).toBe(200);
  expect((await saved.json()).draft.clozeText).toBe(reviewedText);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  const backup = await page.request.get("/api/backup");
  const zip = await JSZip.loadAsync(await backup.body());
  const cards = JSON.parse(await zip.file("anki-drafts.json")!.async("string")) as Array<{ clozeText: string }>;
  expect(cards.some((card) => card.clozeText === reviewedText)).toBe(true);
});

test("mobile navigation exposes four primary destinations", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation.getByRole("link", { name: "Search" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Topics" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Saved" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Add" })).toBeVisible();
});

test("creates, revises, approves, finds, and restores a source-bound topic", async ({ page }, testInfo) => {
  const title = `Operative Wound Review ${testInfo.project.name}`;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  await page.goto("/add");
  await page.getByLabel("Topic title").fill(title);
  await page.getByLabel("Source notes").fill("Educational wound care principles from the owner supplied study packet.");
  await page.getByLabel("Source details").fill("Personal study notes, section one");
  await page.getByLabel("Personal tags").fill("wound, operative");
  await page.getByRole("button", { name: "Save notes only" }).click();
  await expect(page).toHaveURL(/\/drafts\//);
  await page.getByLabel("I confirmed the selected source supports every statement shown in this block.").check();
  await page.getByRole("button", { name: "Confirm & link every statement" }).click();
  await expect(page.getByText("Ready for approval")).toBeVisible();

  await page.getByLabel("Ask AI to restructure this draft").fill("Focus the draft on operative wound principles.");
  await page.getByRole("button", { name: "Revise draft" }).click();
  await expect(page.getByRole("heading", { name: "Owner notes" })).toBeVisible();
  await page.getByRole("button", { name: /Approve & publish/ }).click();
  await expect(page).toHaveURL(new RegExp(`/topics/${slug}$`));

  await page.goto(`/?q=${encodeURIComponent("wound reviw")}`);
  const result = page.locator(".topic-grid").getByRole("link", { name: new RegExp(title) });
  await expect(result).toBeVisible();
  await result.click();
  await page.getByRole("tab", { name: /History/ }).click();
  await page.getByRole("button", { name: "Restore as draft" }).click();
  await expect(page).toHaveURL(/\/drafts\//);
  await expect(page.getByText(/Private draft · Version/)).toBeVisible();
});

test("requires explicit owner confirmation before linking every statement", async ({ page }, testInfo) => {
  const title = `Citation Confirmation ${testInfo.project.name}`;
  const created = await page.request.post("/api/topics/drafts", {
    data: { title, rawNotes: "A supported educational statement.", imageIds: [], sourceMetadata: [{ title: "Owner notes", kind: "user_notes" }], scoreNodeId: "biliary", tags: [], mode: "notes_only" },
  });
  const payload = await created.json();
  const block = payload.draft.blocks[0];
  block.claims[0].text = "A different generic claim.";
  await page.request.patch(`/api/topics/drafts/${payload.draft.id}/blocks/${block.id}`, { data: { block, supportAttestation: true } });

  await page.goto(`/drafts/${payload.draft.id}`);
  await expect(page.getByText(/support issue/)).toBeVisible();
  const link = page.getByRole("button", { name: "Confirm & link every statement" });
  await expect(link).toBeDisabled();
  await page.getByLabel("I confirmed the selected source supports every statement shown in this block.").check();
  await expect(link).toBeEnabled();
  await link.click();
  await expect(page.getByText("Ready for approval")).toBeVisible();
});

test("adds and edits the owner's SCORE organization", async ({ page }, testInfo) => {
  const title = `Vascular ${testInfo.project.name}`;
  await page.goto("/settings");
  await page.getByLabel("Add category").fill(title);
  await page.getByRole("button", { name: "Add category" }).click();
  await expect(page.getByRole("button", { name: new RegExp(title) })).toBeVisible();
  await page.getByRole("button", { name: new RegExp(title) }).click();
  await page.getByLabel("Edit category").fill(`${title} Updated`);
  await page.getByRole("button", { name: "Save category" }).click();
  await expect(page.getByRole("button", { name: new RegExp(`${title} Updated`) })).toBeVisible();
});
