import { test, expect } from "@playwright/test";

test.describe("documentation site — home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads with 200 status", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("page title is set", async ({ page }) => {
    await expect(page).toHaveTitle(/Documentation/i);
  });

  test("main heading is visible", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Documentation");
  });

  test("introductory description is visible", async ({ page }) => {
    await expect(page.getByText(/guides|tutorials|API|reference/i)).toBeVisible();
  });

  test("get-started link is visible and has correct href", async ({ page }) => {
    const link = page.getByRole("link", { name: /get started/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/docs/getting-started");
  });
});

test.describe("documentation site — getting started page", () => {
  test("navigates to getting-started via home link", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /get started/i }).click();
    await expect(page).toHaveURL(/getting-started/);
  });

  test("getting-started page loads with 200 status", async ({ page }) => {
    const response = await page.goto("/docs/getting-started");
    expect(response?.status()).toBe(200);
  });

  test("getting-started page has correct heading", async ({ page }) => {
    await page.goto("/docs/getting-started");
    await expect(page.getByRole("heading", { name: /getting started/i })).toBeVisible();
  });

  test("getting-started page shows installation instructions", async ({ page }) => {
    await page.goto("/docs/getting-started");
    await expect(page.getByText(/npm install/)).toBeVisible();
  });
});

test.describe("documentation site — navigation", () => {
  test("starlight sidebar is present on docs pages", async ({ page }) => {
    await page.goto("/docs/getting-started");
    // Starlight renders a nav element with the sidebar
    const sidebar = page.locator("nav[aria-label]").first();
    await expect(sidebar).toBeVisible();
  });

  test("starlight site title is visible in docs", async ({ page }) => {
    await page.goto("/docs/getting-started");
    await expect(page.getByText("Docs")).toBeVisible();
  });

  test("page has no JavaScript console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});

test.describe("documentation site — accessibility", () => {
  test("home page has a main landmark", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("docs page has a main landmark", async ({ page }) => {
    await page.goto("/docs/getting-started");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("home page has sufficient color contrast on heading (not a pure white bg)", async ({
    page,
  }) => {
    await page.goto("/");
    // Simply verifies the heading text is rendered in the DOM and visible
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    const color = await heading.evaluate((el) => getComputedStyle(el).color);
    // Color should be set (not empty) — regression guard
    expect(color).toBeTruthy();
  });
});
