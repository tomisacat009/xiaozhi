import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { resolveCanvasHeight } from "../assets/engine/canvas-engine.mjs";

const systemCss = readFileSync(
  new URL("../assets/system.css", import.meta.url),
  "utf8",
);

const demoShellCss = readFileSync(
  new URL("../assets/engine/demo-shell.css", import.meta.url),
  "utf8",
);

test("resolveCanvasHeight keeps desktop demos at their configured height", () => {
  assert.equal(resolveCanvasHeight(680, 1440), 680);
});

test("resolveCanvasHeight compresses tablet and mobile demos", () => {
  assert.equal(resolveCanvasHeight(680, 820), 520);
  assert.equal(resolveCanvasHeight(680, 390), 374);
});

test("system.css includes mobile rules for stacked metadata and tighter shell spacing", () => {
  assert.match(systemCss, /@media \(max-width: 760px\)[\s\S]*\.shell\s*\{[\s\S]*padding:\s*18px 14px 36px;/);
  assert.match(systemCss, /@media \(max-width: 760px\)[\s\S]*\.meta-row\s*\{[\s\S]*flex-direction:\s*column;[\s\S]*align-items:\s*flex-start;/);
  assert.match(systemCss, /@media \(max-width: 760px\)[\s\S]*\.cta-button\s*\{[\s\S]*width:\s*100%;[\s\S]*text-align:\s*center;/);
  assert.match(systemCss, /@media \(max-width: 760px\)[\s\S]*h1\s*\{[\s\S]*font-size:\s*clamp\(1\.76rem,\s*9vw,\s*2\.5rem\);[\s\S]*line-height:\s*1\.05;/);
  assert.match(systemCss, /@media \(max-width: 760px\)[\s\S]*\.home-link\s*\{[\s\S]*padding:\s*10px 0;/);
});

test("demo-shell.css includes mobile rules for full-width actions and compact panels", () => {
  assert.match(demoShellCss, /@media \(max-width: 920px\)[\s\S]*\.demo-page-shell\s*\{[\s\S]*padding:\s*20px 14px 28px;/);
  assert.match(demoShellCss, /@media \(max-width: 920px\)[\s\S]*\.demo-primary-button,\s*[\s\S]*\.demo-secondary-button\s*\{[\s\S]*width:\s*100%;/);
  assert.match(demoShellCss, /@media \(max-width: 920px\)[\s\S]*\.demo-section-title-wrap,\s*[\s\S]*\.demo-slider-header,\s*[\s\S]*\.demo-graph-header\s*\{[\s\S]*flex-direction:\s*column;[\s\S]*align-items:\s*flex-start;/);
  assert.match(demoShellCss, /@media \(max-width: 920px\)[\s\S]*\.demo-sample-strip\s*\{[\s\S]*display:\s*grid;[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(demoShellCss, /@media \(max-width: 920px\)[\s\S]*\.demo-chip,\s*[\s\S]*\.demo-primary-button,\s*[\s\S]*\.demo-secondary-button\s*\{[\s\S]*min-height:\s*44px;/);
});
