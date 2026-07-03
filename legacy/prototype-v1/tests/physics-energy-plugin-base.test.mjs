import test from "node:test";
import assert from "node:assert/strict";

import {
  buildMechanicalEnergyModel,
  buildWorkEnergySynthesisModel,
} from "../demos/shared/physics-energy-plugin-base.mjs";

test("buildMechanicalEnergyModel exposes potential kinetic and total energy", () => {
  const model = buildMechanicalEnergyModel({
    m: 2,
    g: 10,
    h0: 10,
    h: 6,
  });

  assert.equal(model.derived.potentialEnergy, 120);
  assert.equal(model.derived.kineticEnergy, 80);
  assert.equal(model.derived.totalEnergy, 200);
  assert.equal(model.derived.speed, 8.94);
  assert.equal(model.drawModel.polygons.length, 3);
  assert.equal(model.drawModel.points.some((point) => point.label === "当前位置"), true);
});

test("buildWorkEnergySynthesisModel exposes work comparison and method recommendation", () => {
  const model = buildWorkEnergySynthesisModel({
    workByForce: 120,
    frictionLoss: 30,
    initialKinetic: 20,
  });

  assert.equal(model.derived.netWork, 90);
  assert.equal(model.derived.finalKinetic, 110);
  assert.equal(model.derived.recommendedMethod, "动能定理优先");
  assert.equal(model.drawModel.polygons.length, 4);
});
