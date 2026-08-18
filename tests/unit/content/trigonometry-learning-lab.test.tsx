// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getDemoDefinition } from "@/content/demos/catalog";

afterEach(() => {
  cleanup();
});

describe("trigonometry learning lab", () => {
  it("connects the unit circle and function graph for every trigonometry unit", () => {
    const targets = [
      { slug: "sin-basic", label: "正弦：追踪圆上点的高度：单位圆与函数图像同步变化" },
      { slug: "cos-basic", label: "余弦：追踪圆上点的横坐标：单位圆与函数图像同步变化" },
      { slug: "tan-basic", label: "正切：比较纵坐标与横坐标：单位圆与函数图像同步变化" },
      { slug: "sin-transform", label: "参数实验：圆周运动怎样变成波形：单位圆与函数图像同步变化" },
    ];

    for (const target of targets) {
      const definition = getDemoDefinition("math", "trigonometry", target.slug);
      expect(definition).not.toBeNull();

      const view = render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);
      expect(screen.getByRole("img", { name: target.label })).toBeInTheDocument();
      expect(screen.getByText("单位圆 × 函数图像")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "播放一圈" })).toBeInTheDocument();
      view.unmount();
    }
  });

  it("explains that tangent is undefined at a breakpoint instead of calling it infinity", () => {
    const definition = getDemoDefinition("math", "trigonometry", "tan-basic");
    expect(definition).not.toBeNull();

    render(<>{definition!.renderStage?.({ ...definition!.defaultParams, angleDeg: 90 })}</>);

    expect(screen.getAllByText("无定义").length).toBeGreaterThan(0);
    expect(screen.getByText(/这里不是“函数值特别大”/)).toBeInTheDocument();
    expect(screen.getByText(/分母不能为 0/)).toBeInTheDocument();
  });

  it("shows the four parameter roles and keeps a controllable observation position", () => {
    const definition = getDemoDefinition("math", "trigonometry", "sin-transform");
    expect(definition).not.toBeNull();
    expect(definition!.controls).toHaveProperty("angleDeg");
    expect(definition!.presets.map((preset) => preset.id)).toEqual(
      expect.arrayContaining(["amplitude", "reflection", "period", "phase", "offset"]),
    );

    render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);

    expect(screen.getByText("A 管纵向")).toBeInTheDocument();
    expect(screen.getByText("ω 管横向")).toBeInTheDocument();
    expect(screen.getByText("φ 管起点")).toBeInTheDocument();
    expect(screen.getByText("d 管中线")).toBeInTheDocument();
  });
});
