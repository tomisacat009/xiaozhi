import test from "node:test";
import assert from "node:assert/strict";

import {
  buildSetBasicsModel,
  buildSetOperationsModel,
} from "../demos/shared/set-plugin-base.mjs";

test("buildSetBasicsModel exposes belong subset and empty-set views", () => {
  const model = buildSetBasicsModel({
    mode: "math",
    sampleId: "numbers-basic",
    focusKey: "belong",
  });

  assert.equal(model.derived.modeLabel, "数学化");
  assert.equal(model.derived.sample.title, "自然数分类");
  assert.equal(model.derived.relations.belong.trueItems.includes("1"), true);
  assert.equal(model.derived.relations.notBelong.trueItems.includes("7"), true);
  assert.equal(model.derived.relations.emptySet.label, "空集也是集合");
  assert.equal(model.drawModel.polygons.length >= 2, true);
});

test("buildSetOperationsModel exposes intersection union and complement results", () => {
  const model = buildSetOperationsModel({
    mode: "math",
    operation: "intersection",
    sampleId: "numbers-overlap",
    focusKey: "intersection",
  });

  assert.equal(model.derived.operationLabel, "交集");
  assert.deepEqual(model.derived.result.values, ["3", "4"]);
  assert.equal(
    model.drawModel.regions.some((region) => region.id === "intersection" && region.active),
    true,
  );
});

test("buildSetOperationsModel uses universe for complement", () => {
  const model = buildSetOperationsModel({
    mode: "math",
    operation: "complementA",
    sampleId: "numbers-overlap",
    focusKey: "complement",
  });

  assert.deepEqual(model.derived.result.values, ["5", "6", "7", "8"]);
  assert.equal(model.derived.summaryText.includes("先看全集"), true);
  assert.equal(model.derived.universe.values.length, 8);
});
