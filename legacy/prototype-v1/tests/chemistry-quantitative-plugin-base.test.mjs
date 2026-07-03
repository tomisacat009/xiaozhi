import test from "node:test";
import assert from "node:assert/strict";

import {
  buildMoleRelationModel,
} from "../demos/shared/chemistry-quantitative-plugin-base.mjs";

test("buildMoleRelationModel exposes mole mass particle and gas relations around n", () => {
  const model = buildMoleRelationModel({
    amount: 2,
    molarMass: 18,
    gasMolarVolume: 22.4,
    avogadroExponent: 23,
  });

  assert.equal(model.derived.amount, 2);
  assert.equal(model.derived.mass, 36);
  assert.equal(model.derived.gasVolume, 44.8);
  assert.equal(model.derived.particleCountText, "1.20e24");
  assert.equal(model.derived.relationSummary.includes("n"), true);
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("M")));
});

