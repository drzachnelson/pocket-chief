import { expect, test } from "@playwright/test";

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
  await page.getByRole("button", { name: "Save notes only" }).click();
  await expect(page).toHaveURL(/\/drafts\//);
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
