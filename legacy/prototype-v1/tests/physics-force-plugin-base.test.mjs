import test from "node:test";
import assert from "node:assert/strict";

import {
  buildConnectedBodiesModel,
  buildOverweightModel,
} from "../demos/shared/physics-force-plugin-base.mjs";

test("buildOverweightModel exposes support force and overweight state", () => {
  const model = buildOverweightModel({
    m: 50,
    g: 10,
    a: 2,
  });

  assert.equal(model.derived.gravityForce, 500);
  assert.equal(model.derived.supportForce, 600);
  assert.equal(model.derived.stateLabel, "超重");
  assert.equal(model.drawModel.segments.length >= 3, true);
  assert.equal(model.drawModel.points.some((point) => point.label === "人"), true);
});

test("buildOverweightModel exposes weightlessness when support force is zero", () => {
  const model = buildOverweightModel({
    m: 50,
    g: 10,
    a: -10,
  });

  assert.equal(model.derived.supportForce, 0);
  assert.equal(model.derived.stateLabel, "完全失重");
});

test("buildConnectedBodiesModel exposes system acceleration and tension", () => {
  const model = buildConnectedBodiesModel({
    m1: 2,
    m2: 3,
    f: 20,
  });

  assert.equal(model.derived.acceleration, 4);
  assert.equal(model.derived.tension, 12);
  assert.equal(model.derived.systemMass, 5);
  assert.equal(model.drawModel.polygons.length >= 2, true);
  assert.equal(model.drawModel.segments.some((segment) => segment.label?.includes("F")), true);
});
