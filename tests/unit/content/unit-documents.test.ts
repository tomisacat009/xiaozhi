import { describe, expect, it } from "vitest";

import {
  buildFallbackUnitBody,
  stripProcessSections,
} from "@/lib/content/unit-documents";
import { getAllUnits } from "@/lib/content/loaders";

describe("unit document helpers", () => {
  it("removes migration process sections from markdown bodies", () => {
    const source = [
      "## 单元定位",
      "",
      "这是正式内容。",
      "",
      "## 迁移说明",
      "",
      "- 当前迁移状态：迁移中",
      "",
      "## 交互演示迁移线索",
      "",
      "- 旧页面入口：进入当前演示器",
      "",
      "## 学习建议",
      "",
      "回到图像变化本身。",
    ].join("\n");

    expect(stripProcessSections(source)).toBe(
      ["## 单元定位", "", "这是正式内容。", "", "## 学习建议", "", "回到图像变化本身。"].join(
        "\n",
      ),
    );
  });

  it("builds a student-facing fallback body without migration wording", () => {
    const unit = getAllUnits().find((entry) => entry.slug === "physics-uniform-motion");

    expect(unit).toBeTruthy();

    const body = buildFallbackUnitBody(unit!, "运动与图像");

    expect(body).toContain("## 这个知识点在解决什么");
    expect(body).toContain("## 学完后要带走什么");
    expect(body).not.toContain("迁移");
    expect(body).not.toContain("旧原型");
  });
});
