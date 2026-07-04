import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("high-priority physics copy", () => {
  it("keeps the priority unit source copy student-facing", () => {
    const files = [
      "content/units/physics/electricity/physics-series-parallel.mdx",
      "content/units/physics/electricity/physics-ohms-law.mdx",
      "content/units/physics/wave/physics-vibration.mdx",
      "content/units/physics/wave/physics-wave-propagation.mdx",
      "content/units/physics/force/physics-force-balance.mdx",
    ];

    for (const relativePath of files) {
      const source = readFileSync(path.join(process.cwd(), relativePath), "utf8");

      expect(source).not.toContain("后面可以");
      expect(source).not.toContain("可做成");
      expect(source).not.toContain("已上线");
      expect(source).not.toContain("进入当前演示器");
    }
  });
});
