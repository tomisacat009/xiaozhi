import { describe, expect, it } from "vitest";

import { getAllUnits } from "@/lib/content/loaders";

describe("final closure metadata", () => {
  it("keeps the final closure units structurally complete", () => {
    const targets = new Set([
      "english-tense-timeline",
      "english-logic-connector-map",
      "english-synonym-semantic-map",
      "physics-friction",
      "physics-incline-motion",
      "physics-work-power",
      "physics-kinetic-energy",
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
