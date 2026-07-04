// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { DemoShell } from "@/components/demo/demo-shell";

afterEach(() => {
  cleanup();
});

describe("DemoShell", () => {
  it("keeps user params when rerendered with an equivalent definition that has the same id", () => {
    const definition = {
      id: "quadratic",
      title: "二次函数",
      defaultParams: { a: 1, b: 0, c: 0 },
      presets: [],
      explanation: () => [],
    };

    const { rerender } = render(<DemoShell definition={definition} />);

    fireEvent.change(screen.getByLabelText("a"), {
      target: { value: "2" },
    });

    expect(screen.getByLabelText("a")).toHaveProperty("value", "2");

    rerender(
      <DemoShell
        definition={{
          ...definition,
          defaultParams: { a: 1, b: 0, c: 0 },
          presets: [],
          explanation: () => [],
        }}
      />,
    );

    expect(screen.getByLabelText("a")).toHaveProperty("value", "2");
  });

  it("renders select controls for string-based demos", () => {
    render(
      <DemoShell
        definition={{
          id: "english-clause",
          title: "从句层级",
          defaultParams: { clause: "object" },
          presets: [],
          controls: {
            clause: {
              kind: "select",
              label: "从句类型",
              options: [
                { label: "宾语从句", value: "object" },
                { label: "状语从句", value: "adverbial" },
              ],
            },
          },
          explanation: () => [],
        }}
      />,
    );

    expect(screen.getByLabelText("从句类型").tagName).toBe("SELECT");
  });

  it("uses delivery-ready Chinese shell copy for the demo experience", () => {
    render(
      <DemoShell
        definition={{
          id: "physics-friction",
          title: "摩擦力状态图",
          defaultParams: { mode: "static" },
          presets: [],
          controls: {
            mode: {
              kind: "select",
              label: "摩擦状态",
              options: [
                { label: "静摩擦", value: "static" },
                { label: "滑动摩擦", value: "sliding" },
              ],
            },
          },
          explanation: () => ["先判断是否滑动。"],
        }}
      />,
    );

    expect(screen.getByText("交互演示")).toBeInTheDocument();
    expect(screen.getByText("参数控制")).toBeInTheDocument();
    expect(screen.getByText("观察提示")).toBeInTheDocument();
    expect(screen.getByText("图形观察区")).toBeInTheDocument();
  });
});
