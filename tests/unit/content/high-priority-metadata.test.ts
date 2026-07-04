import { describe, expect, it } from "vitest";

import { getAllUnits } from "@/lib/content/loaders";

describe("high-priority physics metadata", () => {
  it("keeps the priority visual units structurally complete", () => {
    const targets = new Set([
      "physics-force-composition",
      "physics-force-balance",
      "physics-series-parallel",
      "physics-ohms-law",
      "physics-vibration",
      "physics-wave-propagation",
    ]);

    const units = getAllUnits().filter((unit) => targets.has(unit.slug));

    expect(units).toHaveLength(targets.size);

    for (const unit of units) {
      expect(unit.learningGoals.length).toBeGreaterThan(0);
      expect(unit.coreTakeaways.length).toBeGreaterThan(0);
      expect(unit.relatedUnits.length).toBeGreaterThan(0);
      expect(unit.demoIds.length).toBeGreaterThan(0);
    }
  });
});
