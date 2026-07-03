import test from "node:test";
import assert from "node:assert/strict";

import {
  buildConicLineRelationModel,
  buildConicOverviewModel,
  buildEllipseModel,
  buildHyperbolaModel,
  buildParabolaModel,
} from "../demos/shared/conic-plugin-base.mjs";

test("buildParabolaModel exposes focus directrix and guide line", () => {
  const model = buildParabolaModel({ direction: "up", a: 2 }, {
    xMin: -8,
    xMax: 8,
    yMin: -6,
    yMax: 10,
  });

  assert.equal(model.derived.equation, "x^2 = 8y");
  assert.equal(model.derived.features.directrix, "y = -2");
  assert.equal(model.drawModel.curves.length, 1);
  assert.equal(model.drawModel.lines.some((line) => line.label === "准线"), true);
});

test("buildEllipseModel exposes focus vertices and ellipse layer", () => {
  const model = buildEllipseModel({ orientation: "horizontal", a: 5, b: 3 });

  assert.equal(model.derived.equation, "x^2/25 + y^2/9 = 1");
  assert.equal(model.derived.features.eccentricity, 0.8);
  assert.equal(model.drawModel.ellipses.length, 1);
  assert.equal(model.drawModel.points.some((point) => point.label === "F1"), true);
});

test("buildHyperbolaModel exposes asymptotes and split branches", () => {
  const model = buildHyperbolaModel({ orientation: "horizontal", a: 4, b: 3 }, {
    xMin: -10,
    xMax: 10,
    yMin: -8,
    yMax: 8,
  });

  assert.equal(model.derived.equation, "x^2/16 - y^2/9 = 1");
  assert.equal(model.derived.features.eccentricity, 1.25);
  assert.equal(model.drawModel.curves.length, 2);
  assert.equal(model.drawModel.lines.some((line) => line.label === "渐近线"), true);
  assert.equal(model.drawModel.points.some((point) => point.label === "F1"), true);
});

test("buildConicOverviewModel switches families and exposes comparison hints", () => {
  const hyperbola = buildConicOverviewModel({
    family: "hyperbola",
    a: 4,
    b: 3,
  }, {
    xMin: -10,
    xMax: 10,
    yMin: -8,
    yMax: 8,
  });

  assert.equal(hyperbola.derived.family, "hyperbola");
  assert.equal(hyperbola.derived.title, "双曲线");
  assert.equal(hyperbola.derived.equation, "x^2/16 - y^2/9 = 1");
  assert.equal(hyperbola.derived.comparison.focusRule, "双曲线有两个焦点和两条渐近线");
  assert.equal(hyperbola.drawModel.curves.length, 2);

  const ellipse = buildConicOverviewModel({
    family: "ellipse",
    a: 5,
    b: 3,
  }, {
    xMin: -10,
    xMax: 10,
    yMin: -8,
    yMax: 8,
  });

  assert.equal(ellipse.derived.family, "ellipse");
  assert.equal(ellipse.derived.title, "椭圆");
  assert.equal(ellipse.drawModel.ellipses.length, 1);
  assert.equal(ellipse.derived.comparison.closureRule, "椭圆是闭合曲线");
});

test("buildConicLineRelationModel exposes horizontal line relation and intersection markers", () => {
  const model = buildConicLineRelationModel({
    family: "ellipse",
    lineY: 0,
    a: 5,
    b: 3,
  }, {
    xMin: -10,
    xMax: 10,
    yMin: -8,
    yMax: 8,
  });

  assert.equal(model.derived.family, "ellipse");
  assert.equal(model.derived.relationSummary.relation, "相交");
  assert.equal(model.derived.relationSummary.intersectionCount, 2);
  assert.equal(model.drawModel.lines.some((line) => line.label === "y = 0"), true);
  assert.equal(model.drawModel.points.some((point) => point.label === "P1"), true);
});
