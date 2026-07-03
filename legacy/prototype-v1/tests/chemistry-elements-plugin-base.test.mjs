import test from "node:test";
import assert from "node:assert/strict";

import {
  buildChlorineTransformationModel,
  buildIronTransformationModel,
  buildSodiumTransformationModel,
} from "../demos/shared/chemistry-elements-plugin-base.mjs";

test("buildSodiumTransformationModel exposes transformation chain and phenomenon for active stage", () => {
  const model = buildSodiumTransformationModel({ sceneId: "sodium-water" });

  assert.equal(model.derived.sceneId, "sodium-water");
  assert.equal(model.derived.activeSubstance, "Na");
  assert.equal(model.derived.product, "NaOH");
  assert.equal(model.derived.phenomenonSummary.includes("浮"), true);
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("H2")));
});

test("buildChlorineTransformationModel exposes bleaching path and active substance", () => {
  const model = buildChlorineTransformationModel({ sceneId: "chlorine-water" });

  assert.equal(model.derived.sceneId, "chlorine-water");
  assert.equal(model.derived.activeSubstance, "Cl2");
  assert.equal(model.derived.keySpecies.includes("HClO"), true);
  assert.equal(model.derived.bleachingAgent, "HClO");
  assert.ok(model.drawModel.labels.some((label) => label.text.includes("漂白")));
});

test("buildIronTransformationModel exposes valence conversion and identification clue", () => {
  const model = buildIronTransformationModel({ sceneId: "ferrous-to-ferric" });

  assert.equal(model.derived.sceneId, "ferrous-to-ferric");
  assert.equal(model.derived.activeSpecies, "Fe2+");
  assert.equal(model.derived.targetSpecies, "Fe3+");
  assert.equal(model.derived.colorHint.includes("浅绿色"), true);
  assert.equal(model.derived.identificationHint.includes("KSCN"), true);
  assert.ok(model.drawModel.points.length >= 3);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("氧化")));
});
