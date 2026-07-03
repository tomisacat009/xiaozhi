import { describe, expect, it } from "vitest";

import { sampleQuadratic } from "@/engine/core/math";

describe("sampleQuadratic", () => {
  it("returns the origin point for y = x^2 when x is zero", () => {
    expect(
      sampleQuadratic(1, 0, 0).some((point) => point.x === 0 && point.y === 0),
    ).toBe(true);
  });
});
