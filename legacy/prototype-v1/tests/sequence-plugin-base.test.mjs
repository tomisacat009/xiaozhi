import test from "node:test";
import assert from "node:assert/strict";

import {
  buildRecursiveSequenceModel,
  buildSequenceModel,
} from "../demos/shared/sequence-plugin-base.mjs";

test("buildSequenceModel exposes formulas, terms and dynamic viewport", () => {
  const model = buildSequenceModel({ a1: 2, d: 2, q: 2, count: 8 });

  assert.equal(model.derived.equation, "a1 = 2，d = 2，q = 2");
  assert.equal(model.derived.features.arithmeticLast, 16);
  assert.equal(model.derived.features.geometricLast, 256);
  assert.equal(model.drawModel.curves.length, 2);
  assert.equal(model.drawModel.points.some((point) => point.label === "A8"), true);
  assert.ok(model.view.viewport.yMax > 256, "expected dynamic viewport to leave headroom for the last term");
});

test("buildRecursiveSequenceModel exposes recursive formula and generated terms", () => {
  const model = buildRecursiveSequenceModel({ a1: 1, factor: 2, offset: 1, count: 5 });

  assert.equal(model.derived.equation, "a1 = 1，a(n+1) = 2a(n) + 1");
  assert.deepEqual(model.derived.features.terms, [1, 3, 7, 15, 31]);
  assert.equal(model.drawModel.curves.length, 1);
  assert.equal(model.drawModel.points.some((point) => point.label === "R5"), true);
});
