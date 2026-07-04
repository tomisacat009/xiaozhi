import { describe, expect, it } from "vitest";

import { getAllUnits } from "@/lib/content/loaders";

describe("english sentence metadata", () => {
  it("keeps the key sentence-structure units structurally complete", () => {
    const targets = new Set([
      "english-sentence-structure",
      "english-clause-hierarchy",
      "english-sentence-compression",
      "english-nonfinite-structure",
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
