import { describe, expect, it } from "vitest";

import { getAllUnits } from "@/lib/content/loaders";

describe("content metadata completeness", () => {
  it("keeps every unit populated with learning goals and core takeaways", () => {
    const incompleteUnits = getAllUnits().filter(
      (unit) => unit.learningGoals.length === 0 || unit.coreTakeaways.length === 0,
    );

    expect(incompleteUnits).toEqual([]);
  });
});
