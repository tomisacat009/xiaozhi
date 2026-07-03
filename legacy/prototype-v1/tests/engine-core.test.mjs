import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizeConfig,
  createDemoState,
  buildPresetState,
  interpolateParams,
} from "../assets/engine/demo-registry.mjs";

test("normalizeConfig merges control defaults into params", () => {
  const config = normalizeConfig({
    controls: [
      { key: "a", default: 1 },
      { key: "b", default: -2 },
    ],
  });

  assert.deepEqual(config.defaultParams, { a: 1, b: -2 });
});

test("normalizeConfig allows extra default params outside controls", () => {
  const config = normalizeConfig({
    controls: [{ key: "size", default: 4 }],
    defaultParams: { solidType: "prism" },
  });

  assert.deepEqual(config.defaultParams, { size: 4, solidType: "prism" });
});

test("buildPresetState overrides default params and viewport", () => {
  const config = normalizeConfig({
    controls: [{ key: "k", default: 1 }],
    viewport: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
  });

  const state = buildPresetState(config, {
    params: { k: 3 },
    viewport: { xMin: -4, xMax: 4, yMin: -8, yMax: 8 },
  });

  assert.equal(state.params.k, 3);
  assert.equal(state.view.viewport.xMin, -4);
});

test("createDemoState produces stable top-level buckets", () => {
  const state = createDemoState(
    normalizeConfig({
      controls: [{ key: "phase", default: 0 }],
    }),
  );

  assert.deepEqual(Object.keys(state), ["params", "derived", "view", "animation", "ui"]);
  assert.equal(state.params.phase, 0);
});

test("interpolateParams only lerps numeric fields", () => {
  const next = interpolateParams(
    { a: 1, label: "start" },
    { a: 3, label: "end" },
    0.5,
  );

  assert.equal(next.a, 2);
  assert.equal(next.label, "end");
});
