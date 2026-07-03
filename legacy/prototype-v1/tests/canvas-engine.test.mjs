import test from "node:test";
import assert from "node:assert/strict";

import { renderCanvas } from "../assets/engine/canvas-engine.mjs";

function createMockContext() {
  const operations = [];
  const ctx = {
    operations,
    save() { operations.push(["save"]); },
    restore() { operations.push(["restore"]); },
    beginPath() { operations.push(["beginPath"]); },
    closePath() { operations.push(["closePath"]); },
    moveTo(x, y) { operations.push(["moveTo", x, y]); },
    lineTo(x, y) { operations.push(["lineTo", x, y]); },
    stroke() { operations.push(["stroke"]); },
    fill() { operations.push(["fill"]); },
    arc(x, y, radius, start, end) { operations.push(["arc", x, y, radius, start, end]); },
    ellipse(x, y, radiusX, radiusY, rotation, start, end) { operations.push(["ellipse", x, y, radiusX, radiusY, rotation, start, end]); },
    fillText(text, x, y) { operations.push(["fillText", text, x, y]); },
    clearRect(x, y, width, height) { operations.push(["clearRect", x, y, width, height]); },
    setLineDash(pattern) { operations.push(["setLineDash", pattern]); },
    set strokeStyle(value) { operations.push(["strokeStyle", value]); },
    set fillStyle(value) { operations.push(["fillStyle", value]); },
    set lineWidth(value) { operations.push(["lineWidth", value]); },
    set font(value) { operations.push(["font", value]); },
  };
  return ctx;
}

test("renderCanvas draws circles from drawModel.circles", () => {
  const ctx = createMockContext();
  const canvas = { clientWidth: 400, clientHeight: 300 };
  const view = {
    viewport: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
    showGrid: false,
  };

  renderCanvas(ctx, canvas, view, {
    circles: [
      { center: { x: 1, y: -1 }, radius: 2, color: "#8b5cf6", lineWidth: 4 },
    ],
  });

  const arcCall = ctx.operations.find((item) => item[0] === "arc");
  assert.ok(arcCall, "expected circle arc to be rendered");
  assert.ok(Math.abs(arcCall[1] - 240) < 1e-8, "expected circle center x to map into canvas");
  assert.ok(Math.abs(arcCall[2] - 180) < 1e-8, "expected circle center y to map into canvas");
  assert.ok(arcCall[3] > 0, "expected circle radius to be positive");
});

test("renderCanvas draws infinite lines from drawModel.lines", () => {
  const ctx = createMockContext();
  const canvas = { clientWidth: 400, clientHeight: 300 };
  const view = {
    viewport: { xMin: -4, xMax: 4, yMin: -3, yMax: 3 },
    showGrid: false,
  };

  renderCanvas(ctx, canvas, view, {
    lines: [
      {
        points: [
          { x: -4, y: -1 },
          { x: 4, y: 3 },
        ],
        color: "#1d6fa5",
        lineWidth: 3,
      },
    ],
  });

  const lineMoves = ctx.operations.filter((item) => item[0] === "lineTo");
  assert.ok(lineMoves.length >= 3, "expected infinite line to add one extra drawn segment");
});

test("renderCanvas draws polygons from drawModel.polygons", () => {
  const ctx = createMockContext();
  const canvas = { clientWidth: 400, clientHeight: 300 };
  const view = {
    viewport: { xMin: 0, xMax: 10, yMin: 0, yMax: 10 },
    showGrid: false,
  };

  renderCanvas(ctx, canvas, view, {
    polygons: [
      {
        points: [
          { x: 1, y: 1 },
          { x: 4, y: 1 },
          { x: 4, y: 3 },
          { x: 1, y: 3 },
        ],
        color: "#e57b49",
        fillColor: "rgba(229,123,73,0.28)",
        lineWidth: 3,
      },
    ],
  });

  const closePathCall = ctx.operations.find((item) => item[0] === "closePath");
  const fillCall = ctx.operations.find((item) => item[0] === "fill");
  assert.ok(closePathCall, "expected polygon path to be closed");
  assert.ok(fillCall, "expected polygon to be filled");
});

test("renderCanvas draws ellipses from drawModel.ellipses", () => {
  const ctx = createMockContext();
  const canvas = { clientWidth: 400, clientHeight: 300 };
  const view = {
    viewport: { xMin: 0, xMax: 10, yMin: 0, yMax: 10 },
    showGrid: false,
    showAxes: false,
  };

  renderCanvas(ctx, canvas, view, {
    ellipses: [
      {
        center: { x: 5, y: 5 },
        radiusX: 2,
        radiusY: 1,
        color: "#8f6f3b",
        fillColor: "rgba(229,123,73,0.2)",
        lineWidth: 3,
      },
    ],
  });

  const ellipseCall = ctx.operations.find((item) => item[0] === "ellipse");
  assert.ok(ellipseCall, "expected ellipse to be rendered");
  assert.ok(ellipseCall[3] > ellipseCall[4], "expected radiusX to be larger than radiusY after scaling");
});
