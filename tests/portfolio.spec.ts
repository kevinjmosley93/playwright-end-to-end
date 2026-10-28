import { test, expect } from "@playwright/test";

test("Portfolio has SEO Title and Description", async ({ page }) => {
  await page.goto("https://kevinjmosley.com/");
  // Check for SEO Info (Title & Description )

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Kevin J Mosley/);
  // Expect 4th child to be met description.
  await expect(page.locator("head > meta:nth-child(4)")).toHaveAttribute(
    "name",
    "description",
  );
});


