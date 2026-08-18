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

describe("exponential and logarithm learning lab", () => {
  it("renders the inverse-function mirror with paired exponential and logarithm points", () => {
    const definition = getDemoDefinition("math", "functions", "exp-log");
    expect(definition).not.toBeNull();

    render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);

    expect(screen.getByRole("img", { name: "指数曲线、对数曲线与 y 等于 x 的镜像关系" })).toBeInTheDocument();
    expect(screen.getByText("把输入输出交换，再沿 y = x 折叠")).toBeInTheDocument();
    expect(screen.getByText("P(x, aˣ)")).toBeInTheDocument();
    expect(screen.getByText("Q(aˣ, x)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "播放输入变化" })).toBeInTheDocument();
  });

  it("turns base one into an explicit error-learning scenario", () => {
    const definition = getDemoDefinition("math", "functions", "exp-log");
    expect(definition).not.toBeNull();

    render(<>{definition!.renderStage?.({ base: 1, inputX: 1 })}</>);

    expect(screen.getByText("a = 1 是一个必须排除的底数。")).toBeInTheDocument();
    expect(screen.getByText(/函数不可逆/)).toBeInTheDocument();
    expect(screen.getByText("不可作为对数底数")).toBeInTheDocument();
  });

  it("provides controls, presets and delivery-ready concept coverage", () => {
    const definition = getDemoDefinition("math", "functions", "exp-log");
    expect(definition).not.toBeNull();
    expect(definition!.controls).toHaveProperty("base");
    expect(definition!.controls).toHaveProperty("inputX");
    expect(definition!.presets.map((preset) => preset.id)).toEqual(
      expect.arrayContaining(["grow", "decay", "fraction", "invalid"]),
    );

    const source = readFileSync(
      path.join(process.cwd(), "content/units/math/functions/exp-log.mdx"),
      "utf8",
    );

    expect(source).toContain("## 对数到底在问什么");
    expect(source).toContain("log_a N=b ⇔ a^b=N");
    expect(source).toContain("## 最容易犯的六个错误");
    expect(source).toContain("### 图像关于 `y=x` 对称是否意味着两函数相等");
  });

  it("stabilizes live announcements while the inverse animation is running", () => {
    const definition = getDemoDefinition("math", "functions", "exp-log");
    expect(definition).not.toBeNull();

    const { container } = render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);
    const readouts = container.querySelector(".expLogLab__readouts");
    expect(readouts).toHaveAttribute("aria-live", "polite");

    fireEvent.click(screen.getByRole("button", { name: "播放输入变化" }));

    expect(screen.getByRole("button", { name: "暂停追踪" })).toBeInTheDocument();
    expect(readouts).toHaveAttribute("aria-live", "off");
  });
});
