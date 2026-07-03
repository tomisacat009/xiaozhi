import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const englishPage = readFileSync(
  new URL("../subjects/english.html", import.meta.url),
  "utf8",
);

const systemCss = readFileSync(
  new URL("../assets/system.css", import.meta.url),
  "utf8",
);

test("english subject page exposes quickstart routes and spotlight summary blocks", () => {
  assert.match(englishPage, /data-page="english-subject"/);
  assert.match(englishPage, /subject-intro-panel/);
  assert.match(englishPage, /spotlight-strip/);
  assert.match(englishPage, /quickstart-grid/);
  assert.match(englishPage, /先抓句子结构/);
  assert.match(englishPage, /先建词汇规律/);
  assert.match(englishPage, /href="\.\.\/modules\/english-sentence\.html"/);
  assert.match(englishPage, /href="\.\.\/modules\/english-roots\.html"/);
});

test("system css includes english subject page specific mobile reading flow rules", () => {
  assert.match(systemCss, /\.subject-intro-panel\s*\{/);
  assert.match(systemCss, /\.spotlight-strip\s*\{/);
  assert.match(systemCss, /\.quickstart-grid\s*\{/);
  assert.match(systemCss, /body\[data-page="english-subject"\]\s+\.hero\s*\{/);
  assert.match(systemCss, /@media \(max-width: 760px\)[\s\S]*body\[data-page="english-subject"\]\s+\.summary-panel\s*\{[\s\S]*order:\s*4;/);
  assert.match(systemCss, /@media \(max-width: 760px\)[\s\S]*body\[data-page="english-subject"\]\s+\.section--modules\s*\{[\s\S]*order:\s*3;/);
  assert.match(systemCss, /@media \(max-width: 760px\)[\s\S]*body\[data-page="english-subject"\]\s+\.section--units\s*\{[\s\S]*order:\s*5;/);
});
