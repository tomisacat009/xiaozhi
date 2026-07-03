import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { config as listeningConfig } from "../demos/听力信息捕捉演示器/config.js";

const demoShellSource = readFileSync(
  new URL("../assets/engine/demo-shell.mjs", import.meta.url),
  "utf8",
);

const demoShellCss = readFileSync(
  new URL("../assets/engine/demo-shell.css", import.meta.url),
  "utf8",
);

test("listening demo config exposes hero badges and quick guide steps", () => {
  assert.equal(Array.isArray(listeningConfig.heroBadges), true);
  assert.equal(listeningConfig.heroBadges.length >= 3, true);
  assert.equal(Array.isArray(listeningConfig.quickGuide), true);
  assert.equal(listeningConfig.quickGuide.length >= 3, true);
});

test("demo shell supports optional hero badges and quick guide rendering", () => {
  assert.match(demoShellSource, /demo-hero-badges/);
  assert.match(demoShellSource, /demo-quick-guide/);
  assert.match(demoShellSource, /config\.heroBadges/);
  assert.match(demoShellSource, /config\.quickGuide/);
});

test("demo shell css includes mobile friendly hero badges and quick guide layout", () => {
  assert.match(demoShellCss, /\.demo-hero-badges\s*\{/);
  assert.match(demoShellCss, /\.demo-quick-guide\s*\{/);
  assert.match(demoShellCss, /\.demo-quick-step\s*\{/);
  assert.match(demoShellCss, /@media \(max-width: 920px\)[\s\S]*\.demo-hero-badges\s*\{[\s\S]*display:\s*grid;/);
});
