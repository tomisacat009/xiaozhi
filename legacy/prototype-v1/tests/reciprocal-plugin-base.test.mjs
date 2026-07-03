import test from "node:test";
import assert from "node:assert/strict";

import { buildReciprocalModel } from "../demos/shared/function-plugin-base.mjs";

test("buildReciprocalModel splits curve into two branches and exposes asymptotes", () => {
  const model = buildReciprocalModel({ k: 2 }, {
    xMin: -6,
    xMax: 6,
    yMin: -6,
    yMax: 6,
  });

  assert.equal(model.derived.equation, "y = 2/x");
  assert.equal(model.derived.features.branchHint, "图像在第一、三象限");
  assert.equal(model.drawModel.curves.length, 2);
  assert.equal(model.drawModel.segments.some((segment) => segment.label === "x = 0"), true);
});
