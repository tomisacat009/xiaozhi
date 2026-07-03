import test from "node:test";
import assert from "node:assert/strict";

import {
  buildIonicReactionModel,
  buildRedoxModel,
} from "../demos/shared/chemistry-reaction-plugin-base.mjs";

test("buildIonicReactionModel exposes reacting ions, spectator ions and result type", () => {
  const precipitateModel = buildIonicReactionModel({ sceneId: "barium-sulfate", beamOn: true });
  const waterModel = buildIonicReactionModel({ sceneId: "acid-base", beamOn: false });

  assert.equal(precipitateModel.derived.sceneId, "barium-sulfate");
  assert.equal(precipitateModel.derived.resultType, "precipitate");
  assert.deepEqual(precipitateModel.derived.reactingIons, ["Ba2+", "SO4^2-"]);
  assert.deepEqual(precipitateModel.derived.spectatorIons, ["Na+", "Cl-"]);
  assert.ok(precipitateModel.drawModel.points.length > 0);

  assert.equal(waterModel.derived.resultType, "water");
  assert.deepEqual(waterModel.derived.reactingIons, ["H+", "OH-"]);
  assert.equal(waterModel.drawModel.labels.some((label) => label.text.includes("旁观")), true);
});

test("buildRedoxModel exposes oxidation, reduction and electron transfer", () => {
  const model = buildRedoxModel({ reactionId: "iron-oxidation", electronView: "balanced" });

  assert.equal(model.derived.reactionId, "iron-oxidation");
  assert.equal(model.derived.oxidizedSpecies, "Fe2+");
  assert.equal(model.derived.reducedSpecies, "Cl2");
  assert.equal(model.derived.electronTransferCount, 2);
  assert.equal(model.derived.oxidizingAgent, "Cl2");
  assert.equal(model.derived.reducingAgent, "Fe2+");
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("e-")));
  assert.equal(model.drawModel.labels.some((label) => label.text.includes("化合价")), true);
});
