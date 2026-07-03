import test from "node:test";
import assert from "node:assert/strict";

import {
  buildClauseHierarchyModel,
  buildListeningCaptureModel,
  buildNonfiniteStructureModel,
  buildReadingQuestionMapModel,
  buildReadingLayerModel,
  buildSentenceCompressionModel,
  buildSentenceStructureModel,
  buildTenseTimelineModel,
} from "../demos/shared/english-sentence-plugin-base.mjs";

test("buildSentenceStructureModel exposes sentence roles and dependency links", () => {
  const model = buildSentenceStructureModel({ sentenceId: "simple-main", focusNodeId: "predicate" });

  assert.equal(model.derived.sentenceId, "simple-main");
  assert.equal(model.derived.coreRole, "谓语");
  assert.equal(model.derived.sentenceText.includes("opened"), true);
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("修饰")));
});

test("buildClauseHierarchyModel exposes clause role and attachment hierarchy", () => {
  const model = buildClauseHierarchyModel({ clauseId: "noun-clause", focusClause: "object-clause" });

  assert.equal(model.derived.clauseId, "noun-clause");
  assert.equal(model.derived.mainFunction, "宾语从句");
  assert.equal(model.derived.guideQuestion.includes("什么"), true);
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("充当")));
});

test("buildSentenceCompressionModel exposes long-sentence trunk and compression layers", () => {
  const model = buildSentenceCompressionModel({ sentenceId: "although-researchers", focusLayer: "main-trunk" });

  assert.equal(model.derived.sentenceId, "although-researchers");
  assert.equal(model.derived.mainTrunk.includes("students can still improve"), true);
  assert.equal(model.derived.compressionHint.includes("先砍修饰"), true);
  assert.ok(model.drawModel.points.length >= 5);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("主干")));
});

test("buildReadingLayerModel exposes reading layers and information priority", () => {
  const model = buildReadingLayerModel({ passageId: "solar-school", emphasis: "main-idea" });

  assert.equal(model.derived.passageId, "solar-school");
  assert.equal(model.derived.mainIdea.includes("solar"), true);
  assert.equal(model.derived.readingHint.includes("主旨"), true);
  assert.ok(model.drawModel.points.length >= 5);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("支撑")));
});

test("buildTenseTimelineModel exposes tense positions and time clues", () => {
  const model = buildTenseTimelineModel({ tenseId: "present-perfect", focusPoint: "now-result" });

  assert.equal(model.derived.tenseId, "present-perfect");
  assert.equal(model.derived.coreMeaning.includes("过去"), true);
  assert.equal(model.derived.timeHint.includes("时间轴"), true);
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("延续")));
});

test("buildNonfiniteStructureModel exposes nonfinite role and attachment path", () => {
  const model = buildNonfiniteStructureModel({ patternId: "to-learn-purpose", focusNodeId: "infinitive" });

  assert.equal(model.derived.patternId, "to-learn-purpose");
  assert.equal(model.derived.coreRole.includes("目的"), true);
  assert.equal(model.derived.grammarHint.includes("非谓语"), true);
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("挂接")));
});

test("buildReadingQuestionMapModel exposes question path and evidence anchor", () => {
  const model = buildReadingQuestionMapModel({ questionId: "main-idea", focusNodeId: "evidence" });

  assert.equal(model.derived.questionId, "main-idea");
  assert.equal(model.derived.coreStrategy.includes("主旨"), true);
  assert.equal(model.derived.solveHint.includes("题干"), true);
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("定位")));
});

test("buildListeningCaptureModel exposes listening sequence and note anchor", () => {
  const model = buildListeningCaptureModel({ sceneId: "campus-radio", focusNodeId: "keywords" });

  assert.equal(model.derived.sceneId, "campus-radio");
  assert.equal(model.derived.coreTask.includes("听力"), true);
  assert.equal(model.derived.strategyHint.includes("先抓"), true);
  assert.ok(model.drawModel.points.length >= 4);
  assert.ok(model.drawModel.segments.some((segment) => segment.label?.includes("记录")));
});
