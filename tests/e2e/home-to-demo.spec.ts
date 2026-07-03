import { expect, test } from "@playwright/test";

test("user can navigate from home page to the quadratic demo", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /数学/i }).click();
  await page.getByRole("link", { name: /函数/i }).click();
  await page.getByRole("link", { name: /二次函数/i }).click();
  await expect(page.getByRole("slider", { name: "a" })).toBeVisible();
});
