import { expect, test } from "@playwright/test";

test("search, read, save, and draft a cloze", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Search Pocket Chief").fill("choledochoithiasis");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByRole("link", { name: /Choledocholithiasis/ })).toBeVisible();
  await page.getByRole("link", { name: /Choledocholithiasis/ }).click();
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
