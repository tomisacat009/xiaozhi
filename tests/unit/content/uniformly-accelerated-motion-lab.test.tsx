// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getDemoDefinition } from "@/content/demos/catalog";

beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", vi.fn(() => 1));
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("uniformly accelerated motion learning lab", () => {
  it("registers complete motion controls and representative scenarios", () => {
    const definition = getDemoDefinition("physics", "motion", "physics-accelerated-motion");
    expect(definition).not.toBeNull();
    expect(definition!.controls).toHaveProperty("s0");
    expect(definition!.controls).toHaveProperty("v0");
    expect(definition!.controls).toHaveProperty("a");
    expect(definition!.controls).toHaveProperty("t");
    expect(definition!.controls).toHaveProperty("interval");
    expect(definition!.presets.map((preset) => preset.id)).toEqual(
      expect.arrayContaining(["from-rest", "decelerate", "turn-around", "reverse-speed-up", "uniform", "half-second"]),
    );
  });

  it("renders the ticker tape and three synchronized motion graphs", () => {
    const definition = getDemoDefinition("physics", "motion", "physics-accelerated-motion");
    render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);

    expect(screen.getByRole("img", { name: "相等时间间隔的位置点、分段位移和当前运动物体" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "匀变速直线运动 x-t 位置时间图像" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "匀变速直线运动 v-t 速度时间图像" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "匀变速直线运动 a-t 加速度时间图像" })).toBeInTheDocument();
    expect(screen.getByText(/切线斜率 = 当前速度/)).toBeInTheDocument();
    expect(screen.getByText("水平线表示加速度恒定")).toBeInTheDocument();
  });

  it("shows the 1:3:5 displacement pattern and constant successive difference", () => {
    const definition = getDemoDefinition("physics", "motion", "physics-accelerated-motion");
    const { container } = render(<>{definition!.renderStage?.({ s0: 0, v0: 0, a: 2, t: 3, interval: 1 })}</>);
    const intervalValues = Array.from(
      container.querySelectorAll(".acceleratedLab__intervalScroller strong"),
      (element) => element.textContent,
    );

    expect(intervalValues).toEqual(expect.arrayContaining(["Δx1 = 1 m", "Δx2 = 3 m", "Δx3 = 5 m"]));
    expect(screen.getByText("固定差值：a(Δt)² = 2 m")).toBeInTheDocument();
    expect(screen.getByText("从静止开始时，各段位移之比为 1:3:5:7…")).toBeInTheDocument();
  });

  it("explains a stop and reversal without equating negative acceleration with deceleration", () => {
    const definition = getDemoDefinition("physics", "motion", "physics-accelerated-motion");
    render(<>{definition!.renderStage?.({ s0: 0, v0: 4, a: -2, t: 3, interval: 1 })}</>);

    expect(screen.getByText("这个模型会在 t = 2 s 暂停并反向。")).toBeInTheDocument();
    expect(screen.getByText(/不能把“加速度为负”直接等同于“减速”/)).toBeInTheDocument();
    expect(screen.getByText("加速：速度与加速度同向")).toBeInTheDocument();
  });

  it("stabilizes live values while animation is playing", () => {
    const definition = getDemoDefinition("physics", "motion", "physics-accelerated-motion");
    const { container } = render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);
    const stateStrip = container.querySelector(".acceleratedLab__stateStrip");
    expect(stateStrip).toHaveAttribute("aria-live", "polite");

    fireEvent.click(screen.getByRole("button", { name: "播放全过程" }));

    expect(screen.getByRole("button", { name: "暂停运动" })).toBeInTheDocument();
    expect(stateStrip).toHaveAttribute("aria-live", "off");
  });

  it("ships detailed formulas, graph interpretation, common mistakes and questions", () => {
    const source = readFileSync(
      path.join(process.cwd(), "content/units/physics/motion/physics-accelerated-motion.mdx"),
      "utf8",
    );

    expect(source).toContain("## 五条核心公式来自同一个过程");
    expect(source).toContain("`Δx_(n+1)-Δx_n = a(Δt)²`");
    expect(source).toContain("`1²:2²:3²:4² = 1:4:9:16`");
    expect(source).toContain("## 最容易犯的十个错误");
    expect(source).toContain("### 加速度为 0，物体一定静止吗");
    expect(source).toContain("## 刹车问题");
  });
});
