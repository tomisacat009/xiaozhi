import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

function collectMdxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return collectMdxFiles(fullPath);
    }

    return fullPath.endsWith(".mdx") ? [fullPath] : [];
  });
}

describe("formal content cleanliness", () => {
  it("keeps production unit documents free from migration-process sections", () => {
    const root = path.join(process.cwd(), "content/units");
    const files = collectMdxFiles(root);
    const blockedHeadings = ["## 迁移说明", "## 交互演示迁移线索", "## 后续重构方向"];

    for (const file of files) {
      const source = readFileSync(file, "utf8");

      for (const heading of blockedHeadings) {
        expect(source).not.toContain(heading);
      }
    }
  });
});
