import test from "node:test";
import assert from "node:assert/strict";

import {
  buildCircleStandardModel,
  buildLineCircleModel,
  buildPointLineDistanceModel,
} from "../demos/shared/analytic-geometry-plugin-base.mjs";

test("buildCircleStandardModel exposes circle equation and radius segment", () => {
  const model = buildCircleStandardModel({ h: 2, k: -1, r: 3 }, {
    xMin: -8,
    xMax: 8,
    yMin: -8,
    yMax: 8,
  });

  assert.equal(model.derived.equation, "(x - 2)^2 + (y + 1)^2 = 9");
  assert.equal(model.drawModel.circles.length, 1);
  assert.equal(model.drawModel.segments[0].label, "r = 3");
});

test("buildPointLineDistanceModel exposes point, foot and shortest segment", () => {
  const model = buildPointLineDistanceModel({ x0: 0, y0: 3, k: 1, b: 0 }, {
    xMin: -6,
    xMax: 6,
    yMin: -6,
    yMax: 6,
  });

  assert.equal(model.derived.equation, "P(0, 3)，y = x");
  assert.deepEqual(model.derived.distanceResult.foot, { x: 1.5, y: 1.5 });
  assert.equal(model.drawModel.lines.length, 1);
  assert.equal(model.drawModel.segments[0].label, "d = 2.12");
});

test("buildLineCircleModel exposes relation summary and intersection markers", () => {
  const model = buildLineCircleModel({ k: 0, b: 3, cx: 0, cy: 0, r: 3 }, {
    xMin: -6,
    xMax: 6,
    yMin: -6,
    yMax: 6,
  });

  assert.equal(model.derived.relationSummary.relation, "相切");
  assert.equal(model.derived.relationSummary.compareHint, "距离等于半径，所以是相切");
  assert.equal(model.drawModel.circles.length, 1);
  assert.equal(model.drawModel.lines.length, 1);
  assert.equal(model.drawModel.points.some((point) => point.label === "P1"), true);
});
