import test from "node:test";
import assert from "node:assert/strict";

import {
  buildLabDeviceWorkflowModel,
  buildIonIdentificationModel,
} from "../demos/shared/chemistry-experiment-plugin-base.mjs";

test("buildIonIdentificationModel exposes stepwise observation and conclusion", () => {
  const model = buildIonIdentificationModel({ ionId: "chloride", strictMode: true });

  assert.equal(model.derived.ionId, "chloride");
  assert.equal(model.derived.reagent, "AgNO3");
  assert.equal(model.derived.observation.includes("白色沉淀"), true);
  assert.equal(model.derived.conclusion.includes("Cl-"), true);
  assert.equal(model.derived.interferenceTip.length > 0, true);
  assert.ok(model.drawModel.points.length >= 3);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("步骤")));
});

test("buildLabDeviceWorkflowModel exposes device roles sequence and risk tip", () => {
  const model = buildLabDeviceWorkflowModel({ sceneId: "gas-preparation", strictMode: true });

  assert.equal(model.derived.sceneId, "gas-preparation");
  assert.equal(model.derived.coreDevice, "发生装置");
  assert.equal(model.derived.sequence.join(" -> ").includes("收集"), true);
  assert.equal(model.derived.riskTip.length > 0, true);
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("步骤")));
});
