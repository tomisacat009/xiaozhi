import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("english sentence copy", () => {
  it("keeps migrated sentence units student-facing in source content", () => {
    const files = [
      "content/units/english/sentence-structure/english-sentence-structure.mdx",
      "content/units/english/sentence-structure/english-clause-hierarchy.mdx",
      "content/units/english/sentence-structure/english-sentence-compression.mdx",
      "content/units/english/sentence-structure/english-nonfinite-structure.mdx",
    ];

    for (const relativePath of files) {
      const source = readFileSync(path.join(process.cwd(), relativePath), "utf8");

      expect(source).not.toContain("已上线");
      expect(source).not.toContain("进入当前演示器");
      expect(source).not.toContain("后续重构方向");
      expect(source).not.toContain("交互演示迁移线索");
    }
  });
});
