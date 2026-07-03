import test from "node:test";
import assert from "node:assert/strict";

import {
  buildSolidRotationModel,
  buildSolidSectionModel,
} from "../demos/shared/solid-geometry-plugin-base.mjs";

test("buildSolidSectionModel exposes prism scene and preview layers", () => {
  const model = buildSolidSectionModel({
    solidType: "prism",
    size: 4,
    height: 6,
    sliceRatio: 0.3,
  });

  assert.equal(model.derived.equation, "四棱柱 · 底面尺寸 4 · 高 6 · 截面位置 0.3");
  assert.equal(model.derived.features.shape, "正方形");
  assert.equal(model.drawModel.polygons.length >= 1, true);
  assert.equal(model.view.showAxes, false);
  assert.equal(model.view.showGrid, false);
});

test("buildSolidSectionModel exposes cylinder ellipse preview", () => {
  const model = buildSolidSectionModel({
    solidType: "cylinder",
    size: 4,
    height: 6,
    sliceRatio: 0.5,
  });

  assert.equal(model.derived.features.shape, "圆");
  assert.equal(model.drawModel.ellipses.length >= 2, true);
  assert.equal(model.drawModel.circles.length, 1);
});

test("buildSolidRotationModel exposes profile and rotated solid preview", () => {
  const model = buildSolidRotationModel({
    profileType: "triangle",
    radius: 4,
    height: 6,
  });

  assert.equal(model.derived.solidName, "圆锥");
  assert.equal(model.derived.features.solidName, "圆锥");
  assert.equal(model.drawModel.polygons.length >= 1, true);
  assert.equal(model.drawModel.ellipses.length >= 1, true);
  assert.equal(model.view.showAxes, false);
});
