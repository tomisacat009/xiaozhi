import test from "node:test";
import assert from "node:assert/strict";

import {
  buildAcceleratedMotionModel,
  buildFreeFallModel,
  buildMotionGraphModel,
  buildMixedChaseModel,
  buildProjectileMotionModel,
  buildUniformChaseModel,
  buildUniformMotionModel,
} from "../demos/shared/physics-motion-plugin-base.mjs";

test("buildUniformMotionModel exposes linear position-time relation and current point", () => {
  const model = buildUniformMotionModel({ v: 2, s0: 1, t: 3 });

  assert.equal(model.derived.equation, "s = 1 + 2t");
  assert.equal(model.derived.currentPosition, 7);
  assert.equal(model.derived.currentTime, 3);
  assert.equal(model.derived.currentVelocity, 2);
  assert.equal(model.drawModel.curves.length, 1);
  assert.equal(model.drawModel.points.some((point) => point.label === "当前时刻"), true);
  assert.ok(model.view.viewport.xMax >= 6, "expected viewport to cover the observation time with headroom");
});

test("buildAcceleratedMotionModel exposes velocity-time line and displacement area", () => {
  const model = buildAcceleratedMotionModel({ v0: 1, a: 2, t: 3 });

  assert.equal(model.derived.velocityEquation, "v = 1 + 2t");
  assert.equal(model.derived.currentVelocity, 7);
  assert.equal(model.derived.displacement, 12);
  assert.equal(model.drawModel.curves.length, 1);
  assert.equal(model.drawModel.polygons.length, 1);
  assert.equal(model.drawModel.points.some((point) => point.label === "当前速度"), true);
  assert.ok(model.view.viewport.yMax > 7, "expected viewport to leave headroom above the current velocity");
});

test("buildUniformChaseModel exposes catch-up time and meeting point when the rear car is faster", () => {
  const model = buildUniformChaseModel({
    leadStart: 6,
    leadSpeed: 1,
    chaseStart: 0,
    chaseSpeed: 3,
    t: 2,
  });

  assert.equal(model.derived.canCatchUp, true);
  assert.equal(model.derived.catchUpTime, 3);
  assert.equal(model.derived.catchUpPosition, 9);
  assert.equal(model.drawModel.points.some((point) => point.label === "追上时刻"), true);
});

test("buildUniformChaseModel reports no catch-up when the rear car is not faster", () => {
  const model = buildUniformChaseModel({
    leadStart: 6,
    leadSpeed: 2,
    chaseStart: 0,
    chaseSpeed: 2,
    t: 2,
  });

  assert.equal(model.derived.canCatchUp, false);
  assert.equal(model.derived.catchUpTime, null);
  assert.equal(model.derived.currentGap, 6);
  assert.equal(model.drawModel.points.some((point) => point.label === "追上时刻"), false);
});

test("buildMixedChaseModel exposes catch-up when the accelerating rear car eventually overtakes", () => {
  const model = buildMixedChaseModel({
    leadStart: 8,
    leadSpeed: 2,
    chaseStart: 0,
    chaseInitialSpeed: 0,
    chaseAcceleration: 2,
    t: 3,
  });

  assert.equal(model.derived.canCatchUp, true);
  assert.ok(model.derived.catchUpTime > 0);
  assert.equal(model.drawModel.curves.length, 2);
  assert.equal(model.drawModel.points.some((point) => point.label === "追上时刻"), true);
});

test("buildFreeFallModel exposes velocity, displacement and current height", () => {
  const model = buildFreeFallModel({
    g: 9.8,
    h0: 80,
    t: 2,
  });

  assert.equal(model.derived.currentVelocity, 19.6);
  assert.equal(model.derived.displacement, 19.6);
  assert.equal(model.derived.currentHeight, 60.4);
  assert.equal(model.drawModel.curves.length, 1);
  assert.equal(model.drawModel.points.some((point) => point.label === "当前速度"), true);
});

test("buildProjectileMotionModel exposes horizontal and vertical motion with landing info", () => {
  const model = buildProjectileMotionModel({
    v0x: 6,
    h0: 20,
    g: 10,
    t: 1,
  });

  assert.equal(model.derived.currentX, 6);
  assert.equal(model.derived.currentY, 15);
  assert.equal(model.derived.currentVy, 10);
  assert.equal(model.derived.timeToGround, 2);
  assert.equal(model.derived.range, 12);
  assert.equal(model.drawModel.curves.length, 1);
  assert.equal(model.drawModel.points.some((point) => point.label === "落地点"), true);
});

test("buildMotionGraphModel exposes synchronized s-t and v-t readings", () => {
  const model = buildMotionGraphModel({
    v0: 2,
    a: 1,
    t: 3,
  });

  assert.equal(model.derived.currentVelocity, 5);
  assert.equal(model.derived.displacement, 10.5);
  assert.equal(model.drawModel.curves.length, 2);
  assert.equal(model.drawModel.points.some((point) => point.label === "s-t 当前"), true);
  assert.equal(model.drawModel.points.some((point) => point.label === "v-t 当前"), true);
});
