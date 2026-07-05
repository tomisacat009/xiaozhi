import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { modules } from "@/content/modules";
import { knowledgeUnits } from "@/content/units";

describe("production status and next-wave content", () => {
  it("keeps formal modules and units marked available", () => {
    expect(modules.every((entry) => entry.status === "available")).toBe(true);
    expect(knowledgeUnits.every((entry) => entry.status === "available")).toBe(true);
  });

  it("expands the next-wave thin units with concrete learning anchors", () => {
    const expectations = [
      {
        file: "content/units/physics/energy/physics-mechanical-energy.mdx",
        snippets: ["## 先判断能不能用机械能守恒", "Ek + Ep", "只有重力或弹力做功"],
      },
      {
        file: "content/units/physics/force/physics-connected-bodies.mdx",
        snippets: ["## 连接体题先这样分层", "先整体", "再隔离"],
      },
      {
        file: "content/units/physics/force/physics-overweight-weightlessness.mdx",
        snippets: ["## 先盯住支持力怎么变", "超重", "完全失重"],
      },
      {
        file: "content/units/physics/force/physics-newton-second-law.mdx",
        snippets: ["## 先把因果关系摆正", "F合 = ma", "加速度是结果"],
      },
      {
        file: "content/units/math/trigonometry/sin-basic.mdx",
        snippets: ["## 先看单位圆怎么投到图像上", "终边上的点", "一个周期是 `2π`"],
      },
      {
        file: "content/units/math/trigonometry/cos-basic.mdx",
        snippets: ["## 和正弦放在一起看最清楚", "`cos(x)` 从 1 起步", "横坐标"],
      },
      {
        file: "content/units/math/trigonometry/tan-basic.mdx",
        snippets: ["## 正切先盯住三个点", "断点", "一个周期是 `π`"],
      },
    ];

    for (const { file, snippets } of expectations) {
      const source = readFileSync(path.join(process.cwd(), file), "utf8");

      for (const snippet of snippets) {
        expect(source).toContain(snippet);
      }
    }
  });
});
