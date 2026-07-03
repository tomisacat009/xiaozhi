import test from "node:test";
import assert from "node:assert/strict";

import {
  buildMaterialClassificationModel,
} from "../demos/shared/chemistry-classification-plugin-base.mjs";

test("buildMaterialClassificationModel exposes classification path and transformation link", () => {
  const model = buildMaterialClassificationModel({ sampleId: "sodium-carbonate", viewMode: "tree" });

  assert.equal(model.derived.sampleId, "sodium-carbonate");
  assert.deepEqual(model.derived.classificationPath, ["纯净物", "化合物", "盐"]);
  assert.equal(model.derived.sampleLabel, "Na2CO3");
  assert.equal(model.derived.transformationHint.includes("酸"), true);
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("分类")));
});

