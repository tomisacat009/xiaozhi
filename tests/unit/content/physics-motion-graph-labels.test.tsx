// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getDemoDefinition } from "@/content/demos/catalog";

afterEach(() => {
  cleanup();
});

describe("physics motion graph labels", () => {
  it("renders clear s-t and v-t axis labels across motion-related demos", () => {
    const targets = [
      {
        key: ["physics", "motion", "physics-uniform-motion"] as const,
        labels: [/横轴：t（时间）/, /纵轴：s（位移）/],
      },
      {
        key: ["physics", "motion", "physics-accelerated-motion"] as const,
        labels: [/横轴：t（时间）/, /纵轴：v（速度）/],
      },
      {
        key: ["physics", "motion", "physics-free-fall"] as const,
        labels: [/横轴：t（时间）/, /纵轴：v（速度）/, /纵轴：s（位移）/],
      },
      {
        key: ["physics", "motion", "physics-uniform-chase"] as const,
        labels: [/横轴：t（时间）/, /纵轴：s（位移）/],
      },
      {
        key: ["physics", "motion", "physics-mixed-chase"] as const,
        labels: [/横轴：t（时间）/, /纵轴：s（位移）/],
      },
      {
        key: ["physics", "motion", "physics-motion-graphs"] as const,
        labels: [/横轴：t（时间）/, /纵轴：s（位移）/, /纵轴：v（速度）/],
      },
    ];

    for (const target of targets) {
      const definition = getDemoDefinition(target.key[0], target.key[1], target.key[2]);

      expect(definition).not.toBeNull();
      const view = render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);

      for (const label of target.labels) {
        expect(screen.getAllByText(label).length).toBeGreaterThan(0);
      }

      view.unmount();
    }
  });
});
