// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDemoDefinition } from "@/content/demos/catalog";

describe("high-priority visual demos", () => {
  it("renders chart-based demos for the priority physics units", () => {
    const targets = [
      {
        key: ["physics", "force", "physics-force-balance"] as const,
        ariaLabel: "共点力平衡图",
      },
      {
        key: ["physics", "electricity", "physics-series-parallel"] as const,
        ariaLabel: "串联与并联电路对比图",
      },
      {
        key: ["physics", "wave", "physics-vibration"] as const,
        ariaLabel: "简谐振动图像",
      },
      {
        key: ["physics", "wave", "physics-wave-propagation"] as const,
        ariaLabel: "波的传播图像",
      },
    ];

    for (const target of targets) {
      const definition = getDemoDefinition(
        target.key[0],
        target.key[1],
        target.key[2],
      );

      expect(definition).not.toBeNull();
      render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);
      expect(screen.getByRole("img", { name: target.ariaLabel })).toBeInTheDocument();
    }
  });
});
