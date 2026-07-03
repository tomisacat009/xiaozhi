import test from "node:test";
import assert from "node:assert/strict";

import {
  buildDispersionColloidModel,
} from "../demos/shared/chemistry-language-plugin-base.mjs";

test("buildDispersionColloidModel distinguishes solution, colloid and suspension", () => {
  const solutionModel = buildDispersionColloidModel({ systemType: "solution", beamOn: true });
  const colloidModel = buildDispersionColloidModel({ systemType: "colloid", beamOn: true });
  const suspensionModel = buildDispersionColloidModel({ systemType: "suspension", beamOn: false });

  assert.equal(solutionModel.derived.systemType, "solution");
  assert.equal(solutionModel.derived.beamVisibility, "clear");
  assert.equal(solutionModel.derived.uniformity, "uniform");
  assert.ok(solutionModel.drawModel.points.length > 0);

  assert.equal(colloidModel.derived.systemType, "colloid");
  assert.equal(colloidModel.derived.beamVisibility, "tyndall");
  assert.match(colloidModel.derived.particleScaleRange, /nm/);
  assert.equal(colloidModel.drawModel.labels.some((label) => label.text.includes("丁达尔")), true);

  assert.equal(suspensionModel.derived.systemType, "suspension");
  assert.equal(suspensionModel.derived.settlingTrend, "obvious");
  assert.equal(suspensionModel.derived.canPassFilter, false);
  assert.ok(
    (suspensionModel.drawModel.polygons?.length ?? 0) > 0 || suspensionModel.drawModel.points.length > 0,
  );
});

