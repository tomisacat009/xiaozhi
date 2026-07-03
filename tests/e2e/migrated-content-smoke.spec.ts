import { expect, test } from "@playwright/test";

test("migrated content smoke", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /物理/i }).click();
  await page.getByRole("link", { name: /运动与图像/i }).click();
  await page.waitForURL("**/subjects/physics/motion");
  await page
    .getByRole("link", { name: /匀速直线运动与图像/i })
    .click();
  await page.waitForURL("**/subjects/physics/motion/physics-uniform-motion");
  await expect(page.getByRole("heading", { name: "匀速直线运动与图像" })).toBeVisible();
  await expect(page.getByText("迁移说明")).toBeVisible();
});
