import test from "node:test";
import assert from "node:assert/strict";

import {
  buildAffixNetworkModel,
  buildGrammarClozeStrategyModel,
  buildLogicConnectorMapModel,
  buildSynonymSemanticMapModel,
  buildWordFamilyAtlasModel,
  buildWordRootModel,
  buildWritingParagraphModel,
  buildWritingUpgradeModel,
} from "../demos/shared/english-roots-plugin-base.mjs";

test("buildWordRootModel exposes root meaning and word family network", () => {
  const model = buildWordRootModel({ rootId: "spect", familyView: "network" });

  assert.equal(model.derived.rootId, "spect");
  assert.equal(model.derived.rootMeaning.includes("看"), true);
  assert.equal(model.derived.words.includes("inspect"), true);
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.labels.some((label) => label.text.includes("前缀")));
});

test("buildAffixNetworkModel exposes affix direction and derived word family", () => {
  const model = buildAffixNetworkModel({ familyId: "re-view", emphasis: "prefix" });

  assert.equal(model.derived.familyId, "re-view");
  assert.equal(model.derived.affixMeaning.includes("再次"), true);
  assert.equal(model.derived.baseMeaning.includes("看"), true);
  assert.ok(model.derived.derivedWords.includes("review"));
  assert.ok(model.drawModel.points.length >= 3);
  assert.ok(model.drawModel.labels.some((label) => label.text.includes("词性")));
});

test("buildWordFamilyAtlasModel exposes textbook word family clusters", () => {
  const model = buildWordFamilyAtlasModel({ familyId: "act", emphasis: "family" });

  assert.equal(model.derived.familyId, "act");
  assert.equal(model.derived.coreMeaning.includes("行动"), true);
  assert.ok(model.derived.familyWords.includes("active"));
  assert.ok(model.drawModel.points.length >= 5);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("同核扩展")));
});

test("buildSynonymSemanticMapModel exposes synonym spacing and usage nuance", () => {
  const model = buildSynonymSemanticMapModel({ groupId: "look", focusWord: "glance" });

  assert.equal(model.derived.groupId, "look");
  assert.equal(model.derived.coreAxis.includes("看"), true);
  assert.ok(model.derived.words.includes("glance"));
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.labels.some((label) => label.text.includes("语气")));
});

test("buildLogicConnectorMapModel exposes connector groups and discourse function", () => {
  const model = buildLogicConnectorMapModel({ groupId: "contrast", focusConnector: "however" });

  assert.equal(model.derived.groupId, "contrast");
  assert.equal(model.derived.coreFunction.includes("转折"), true);
  assert.ok(model.derived.connectors.includes("however"));
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("逻辑")));
});

test("buildWritingUpgradeModel exposes sentence upgrade path and effect labels", () => {
  const model = buildWritingUpgradeModel({ patternId: "because-upgrade", focusStage: "advanced" });

  assert.equal(model.derived.patternId, "because-upgrade");
  assert.equal(model.derived.upgradeGoal.includes("句式"), true);
  assert.ok(model.derived.stageLabels.includes("升级表达"));
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("升级")));
});

test("buildWritingParagraphModel exposes paragraph layers and sentence roles", () => {
  const model = buildWritingParagraphModel({ paragraphId: "opinion-paragraph", focusNodeId: "support-1" });

  assert.equal(model.derived.paragraphId, "opinion-paragraph");
  assert.equal(model.derived.paragraphGoal.includes("段落"), true);
  assert.ok(model.derived.layerLabels.includes("支撑句"));
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("展开")));
});

test("buildGrammarClozeStrategyModel exposes grammar cloze path and decision focus", () => {
  const model = buildGrammarClozeStrategyModel({ taskId: "verb-form", focusNodeId: "syntax" });

  assert.equal(model.derived.taskId, "verb-form");
  assert.equal(model.derived.coreGoal.includes("语法填空"), true);
  assert.ok(model.derived.stepLabels.includes("句法判断"));
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("判断")));
});
