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

describe("composite function learning lab", () => {
  it("registers six common function families and the hook-function preset", () => {
    const definition = getDemoDefinition("math", "functions", "composite-functions");
    expect(definition).not.toBeNull();

    const familyControl = definition!.controls?.family;
    expect(familyControl?.kind).toBe("select");
    if (familyControl?.kind === "select") {
      expect(familyControl.options.map((option) => option.value)).toEqual([
        "hook",
        "absolute",
        "absolute-quadratic",
        "reciprocal",
        "square-root",
        "logarithm",
      ]);
    }
    expect(definition!.presets.map((preset) => preset.id)).toEqual(
      expect.arrayContaining(["hook", "hook-shift", "absolute-quadratic", "logarithm"]),
    );
  });

  it("renders the hook function with its domain, range and processing pipeline", () => {
    const definition = getDemoDefinition("math", "functions", "composite-functions");
    render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);

    expect(screen.getByRole("img", { name: "对勾函数的基本图像、变换图像与定义域限制" })).toBeInTheDocument();
    expect(screen.getByText("对勾函数：从基本函数逐步加工")).toBeInTheDocument();
    expect(screen.getByText("x ≠ 0")).toBeInTheDocument();
    expect(screen.getByText("y ≤ -2 或 y ≥ 2")).toBeInTheDocument();
    expect(screen.getByText("u = x − h = 1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "播放定义域巡游" })).toBeInTheDocument();
  });

  it("makes invalid logarithm input an explicit domain-learning state", () => {
    const definition = getDemoDefinition("math", "functions", "composite-functions");
    render(<>{definition!.renderStage?.({ family: "logarithm", amplitude: 1, horizontalShift: 1, verticalShift: 0, probeX: 1 })}</>);

    expect(screen.getByText("当前探针碰到了定义域限制。")).toBeInTheDocument();
    expect(screen.getByText("此处无定义")).toBeInTheDocument();
    expect(screen.getByText("x > 1")).toBeInTheDocument();
  });

  it("stabilizes live announcements while the probe animation runs", () => {
    const definition = getDemoDefinition("math", "functions", "composite-functions");
    const { container } = render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);
    const readouts = container.querySelector(".compositeLab__readouts");
    expect(readouts).toHaveAttribute("aria-live", "polite");

    fireEvent.click(screen.getByRole("button", { name: "播放定义域巡游" }));

    expect(screen.getByRole("button", { name: "暂停探针" })).toBeInTheDocument();
    expect(readouts).toHaveAttribute("aria-live", "off");
  });

  it("ships complete explanations for hook functions, domain limits and common mistakes", () => {
    const source = readFileSync(
      path.join(process.cwd(), "content/units/math/functions/composite-functions.mdx"),
      "utf8",
    );

    expect(source).toContain("## 重点：对勾函数 `y=x+1/x`");
    expect(source).toContain("`(-∞,-2]∪[2,+∞)`");
    expect(source).toContain("## 最容易犯的八个错误");
    expect(source).toContain("### `|f(x)|` 和 `f(|x|)` 一样吗");
    expect(source).toContain("## 一条固定分析路线");
  });
});
