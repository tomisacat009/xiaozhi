import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.resolve(__dirname, "../assets/content.js");

async function loadContent() {
  const source = await fs.readFile(contentPath, "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context);
  return context.window.MathVizContent;
}

test("content includes four subjects in the top-level index after english expansion", async () => {
  const content = await loadContent();

  assert.equal(content.subjects.length, 4);
  assert.deepEqual(
    Array.from(content.subjects, (subject) => subject.id),
    ["math", "physics", "chemistry", "english"],
  );
  assert.equal(content.subjects[0].href, "subjects/math.html");
});

test("content includes subject page summaries for math physics chemistry and english", async () => {
  const content = await loadContent();

  assert.ok(content.subjectPages.math);
  assert.ok(content.subjectPages.physics);
  assert.ok(content.subjectPages.chemistry);
  assert.ok(content.subjectPages.english);
  assert.equal(content.subjectPages.math.homeHref, "../index.html");
  assert.equal(content.subjectPages.physics.status, "第一批已上线");
  assert.equal(content.subjectPages.chemistry.status, "第一批全部完成");
  assert.equal(content.subjectPages.english.status, "第八批已补充");
});

test("content includes a first-batch physics subject collection", async () => {
  const content = await loadContent();

  assert.ok(content.subjectCollections);
  assert.ok(content.subjectCollections.physics);
  assert.equal(content.subjectCollections.physics.modules.length, 5);
  assert.equal(content.subjectCollections.physics.mvpUnits.length, 22);
  assert.equal(content.subjectCollections.physics.learningPaths.length, 6);
  assert.equal(
    content.subjectCollections.physics.modules.some((module) => module.id === "physics-energy"),
    true,
  );
  assert.equal(
    content.subjectCollections.physics.mvpUnits.some((unit) => unit.id === "physics-mechanical-energy"),
    true,
  );
  assert.equal(
    content.subjectCollections.physics.mvpUnits.some((unit) => unit.id === "physics-projectile-motion"),
    true,
  );
  assert.equal(
    content.subjectCollections.physics.mvpUnits.some((unit) => unit.id === "physics-overweight-weightlessness"),
    true,
  );
});

test("content includes a first-batch chemistry subject collection", async () => {
  const content = await loadContent();

  assert.ok(content.subjectCollections.chemistry);
  assert.equal(content.subjectCollections.chemistry.modules.length, 4);
  assert.equal(content.subjectCollections.chemistry.mvpUnits.length, 10);
  assert.equal(content.subjectCollections.chemistry.learningPaths.length, 4);
  assert.equal(
    content.subjectCollections.chemistry.modules.some((module) => module.id === "chemistry-language"),
    true,
  );
  assert.equal(
    content.subjectCollections.chemistry.mvpUnits.some((unit) => unit.id === "chemistry-redox"),
    true,
  );
});

test("content includes a first-batch english subject collection", async () => {
  const content = await loadContent();

  assert.ok(content.subjectCollections.english);
  assert.equal(content.subjectCollections.english.modules.length, 2);
  assert.equal(content.subjectCollections.english.mvpUnits.length, 16);
  assert.equal(content.subjectCollections.english.learningPaths.length, 16);
  assert.equal(
    content.subjectCollections.english.modules.some((module) => module.id === "english-sentence"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-word-roots"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-clause-hierarchy"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-affix-network"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-sentence-compression"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-word-family-atlas"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-reading-layer"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-synonym-semantic-map"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-tense-timeline"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-logic-connector-map"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-nonfinite-structure"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-writing-upgrade-workshop"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-reading-question-map"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-writing-paragraph-workshop"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-listening-capture"),
    true,
  );
  assert.equal(
    content.subjectCollections.english.mvpUnits.some((unit) => unit.id === "english-grammar-cloze-strategy"),
    true,
  );
});
