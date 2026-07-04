// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getDemoDefinition } from "@/content/demos/catalog";

afterEach(() => {
  cleanup();
});

describe("math and physics visual upgrades", () => {
  it("renders upgraded formal visuals for the next batch of math and physics demos", () => {
    const targets = [
      {
        key: ["math", "sets-logic", "sets-basics"] as const,
        label: "集合关系图",
        text: "x 属于 A",
      },
      {
        key: ["math", "sets-logic", "set-operations"] as const,
        label: "集合运算韦恩图",
        text: "同时落在 A 和 B 中",
      },
      {
        key: ["math", "solid-geometry", "solid-section"] as const,
        label: "截面变化流程图",
        text: "截面通常与底面同形且相似。",
      },
      {
        key: ["math", "solid-geometry", "solid-rotation"] as const,
        label: "旋转体生成流程图",
        text: "距离轴的最远处决定半径。",
      },
      {
        key: ["physics", "force", "physics-newton-second-law"] as const,
        label: "牛顿第二定律关系图",
        text: "惯性大小会拉低加速度",
      },
      {
        key: ["physics", "force", "physics-connected-bodies"] as const,
        label: "连接体分析流程图",
        text: "先藏起绳力或接触力",
      },
      {
        key: ["physics", "force", "physics-overweight-weightlessness"] as const,
        label: "超重失重变化图",
        text: "支持力被抬高到重力之上",
      },
      {
        key: ["physics", "energy", "physics-mechanical-energy"] as const,
        label: "机械能转化图",
        text: "机械能总量保持不变",
      },
    ];

    for (const target of targets) {
      const definition = getDemoDefinition(target.key[0], target.key[1], target.key[2]);

      expect(definition).not.toBeNull();
      const view = render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);
      expect(screen.getAllByLabelText(target.label).length).toBeGreaterThan(0);
      expect(screen.getAllByText(new RegExp(target.text)).length).toBeGreaterThan(0);
      view.unmount();
    }
  });
});
