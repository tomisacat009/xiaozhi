// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DemoShell } from "@/components/demo/demo-shell";

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
});
