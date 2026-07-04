import { describe, expect, it } from "vitest";

import { getAllUnits } from "@/lib/content/loaders";

describe("legacy demo metadata", () => {
  it("keeps migrated demo-first units structurally complete", () => {
    const targets = new Set([
      "chemistry-lab-devices",
      "english-word-roots",
      "english-affix-network",
      "english-word-family-atlas",
      "english-reading-layer",
      "english-writing-upgrade-workshop",
      "english-writing-paragraph-workshop",
      "english-grammar-cloze-strategy",
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
