import { expect, test } from "@playwright/test";
import JSZip from "jszip";

// The demo store lives on `globalThis`, so every test in a run shares one set of
// bookmarks even though each gets a fresh browser context. Without this, a topic
// bookmarked by an earlier test is hydrated back into the next test's IndexedDB and
// its Save button starts out reading "Saved offline".
test.beforeEach(async ({ page }) => {
  const bookmarked = await page.request.get("/api/bookmarks");
  if (!bookmarked.ok()) return;
  const { topics = [] } = await bookmarked.json() as { topics?: Array<{ id: string }> };
  for (const topic of topics) await page.request.post("/api/bookmarks", { data: { topicId: topic.id, saved: false } });
});

test("search, read, save, and draft a cloze", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Search Pocket Chief").fill("choledochoithiasis");
  await page.getByRole("button", { name: "Search" }).click();
  const result = page.locator(".topic-grid").getByRole("link", { name: /Choledocholithiasis/ });
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.getByRole("heading", { name: "Transcystic decision flow" })).toBeVisible();
  await page.getByRole("button", { name: "Save", exact: true }).click();
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

test("edits made while the draft is still saving are not lost on close", async ({ page }) => {
  await page.route("**/api/anki/drafts", async (route) => {
    if (route.request().method() === "POST") await new Promise((resolve) => setTimeout(resolve, 800));
    await route.continue();
  });
  await page.goto("/");
  await page.getByLabel("Search Pocket Chief").fill("choledochoithiasis");
  await page.getByRole("button", { name: "Search" }).click();
  const result = page.locator(".topic-grid").getByRole("link", { name: /Choledocholithiasis/ });
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.getByRole("heading", { name: "Transcystic decision flow" })).toBeVisible();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("button", { name: "Saved offline" })).toBeVisible();
  await page.getByRole("button", { name: /Make Anki card from Repositioning may help/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const reviewedText = `{{c1::Repositioning}} may help reposition proximal stones for retrieval (race, ${test.info().project.name}).`;
  await page.getByLabel("Cloze text").fill(reviewedText);
  await page.waitForTimeout(1000);
  await expect(page.getByLabel("Cloze text")).toHaveValue(reviewedText);
  const updateResponse = page.waitForResponse((response) => response.request().method() === "PATCH" && response.url().includes("/api/anki/drafts/"));
  await page.getByRole("button", { name: "Close" }).click();
  const saved = await updateResponse;
  expect(saved.status()).toBe(200);
  expect((await saved.json()).draft.clozeText).toBe(reviewedText);
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

test("topics resumes a visited guide and excludes an empty curriculum branch", async ({ page }, testInfo) => {
  await page.goto("/topics/choledocholithiasis");
  await expect(page.getByRole("heading", { name: "Choledocholithiasis" })).toBeVisible();
  await page.waitForFunction(async () => {
    if (!(await indexedDB.databases()).some((database) => database.name === "pocket-chief-private")) return false;
    return new Promise<boolean>((resolve, reject) => {
    const request = indexedDB.open("pocket-chief-private");
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains("recent")) { database.close(); resolve(false); return; }
      const recent = database.transaction("recent").objectStore("recent").get("00000000-0000-4000-8000-000000000101");
      recent.onerror = () => { database.close(); reject(recent.error); };
      recent.onsuccess = () => { database.close(); resolve(recent.result?.slug === "choledocholithiasis"); };
    };
    });
  });
  const emptyCategory = `Empty curriculum ${testInfo.project.name}`;
  await page.goto("/settings");
  await page.getByLabel("Add category").fill(emptyCategory);
  await page.getByRole("button", { name: "Add category" }).click();
  await page.goto("/topics");

  await expect(page.getByRole("link", { name: "Resume topic" })).toHaveAttribute("href", "/topics/choledocholithiasis");
  await expect(page.getByRole("button", { name: emptyCategory })).toHaveCount(0);
  await expect(page.getByText("Reviewed", { exact: true })).toHaveCount(0);
});

test("canonical topic navigation keeps the workspace, active path, anchors, and exact update date", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Desktop workspace navigation only");
  await page.goto("/topics");
  await page.getByRole("button", { name: "Alimentary Tract" }).click();
  await page.getByRole("link", { name: "Choledocholithiasis", exact: true }).click();

  await expect(page).toHaveURL(/\/topics\/choledocholithiasis$/);
  await expect(page.getByLabel("Topics workspace")).toBeVisible();
  const curriculum = page.getByRole("navigation", { name: "Topics curriculum" });
  await expect(curriculum.getByRole("button", { name: "Alimentary Tract" })).toHaveAttribute("aria-expanded", "true");
  await expect(curriculum.getByRole("link", { name: "Choledocholithiasis", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.getByText("Last updated Aug 12, 2026", { exact: true })).toBeVisible();

  await curriculum.getByRole("link", { name: "Choose the route" }).click();
  await expect(page).toHaveURL(/#block-comparison$/);
  await expect(page.locator("#block-comparison")).toBeInViewport();
  await expect(curriculum.getByRole("link", { name: "Choose the route" })).toHaveAttribute("aria-current", "location");
});

test("desktop rail collapse persists after reload and captures both desktop states", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Desktop rail only");
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/topics/choledocholithiasis");
  await expect(page.getByRole("heading", { name: "Choledocholithiasis" })).toBeVisible();
  const rail = page.getByLabel("Topics workspace");
  await expect(rail).not.toHaveClass(/is-collapsed/);
  await page.screenshot({ path: "output/playwright/topics-desktop-expanded.png", fullPage: true });

  await page.getByRole("button", { name: "Collapse Topics sidebar" }).click();
  await expect(rail).toHaveClass(/is-collapsed/);
  await page.screenshot({ path: "output/playwright/topics-desktop-slim-rail.png", fullPage: true });
  await page.reload();
  await expect(page.getByLabel("Topics workspace")).toHaveClass(/is-collapsed/);
});

test("mobile Topics drawer traps focus, restores it, and closes after topic or section selection", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chrome", "Mobile drawer only");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/topics/choledocholithiasis");
  const trigger = page.getByRole("button", { name: "Topics" });
  await trigger.click();
  const drawer = page.getByRole("dialog", { name: "Topics" });
  const close = drawer.getByRole("button", { name: "Close topics navigation" });
  await expect(close).toBeFocused();
  await page.screenshot({ path: "output/playwright/topics-phone-drawer.png", fullPage: true });

  const focusable = drawer.locator("a[href], button:not([disabled])");
  await page.keyboard.press("Shift+Tab");
  await expect(focusable.last()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(drawer).toHaveCount(0);
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.getByLabel("Dismiss topics navigation").click({ position: { x: 2, y: 2 } });
  await expect(drawer).toHaveCount(0);
  await expect(trigger).toBeFocused();

  await trigger.click();
  await drawer.getByRole("link", { name: "Choose the route" }).click();
  await expect(page).toHaveURL(/#block-comparison$/);
  await expect(drawer).toHaveCount(0);

  await trigger.click();
  await drawer.getByRole("link", { name: "Choledocholithiasis", exact: true }).click();
  await expect(page).toHaveURL(/\/topics\/choledocholithiasis$/);
  await expect(drawer).toHaveCount(0);
});

test("a previously visited Topics guide remains readable offline in its workspace", async ({ page }) => {
  await page.goto("/topics/choledocholithiasis");
  await page.waitForFunction(async () => {
    await navigator.serviceWorker.ready;
    return Boolean(navigator.serviceWorker.controller);
  });
  // Reload under worker control so the dynamic guide and its persistent workspace are cached.
  await page.reload();
  await expect(page.getByRole("heading", { name: "Choledocholithiasis" })).toBeVisible();

  await page.context().setOffline(true);
  try {
    await page.goto("/topics/choledocholithiasis", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Choledocholithiasis" })).toBeVisible();
    await expect(page.getByLabel("Topics workspace")).toBeAttached();
    await expect(page.getByRole("button", { name: "Topics" })).toBeVisible();
  } finally {
    await page.context().setOffline(false);
  }
});
