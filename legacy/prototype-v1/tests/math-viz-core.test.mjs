import test from "node:test";
import assert from "node:assert/strict";

import {
  arithmeticSequenceValue,
  circleStandardFeatures,
  circleDistanceSummary,
  circleRadiusSegment,
  cosineAngleGuide,
  cosineKeyPoints,
  cosineValue,
  conicHorizontalLineRelation,
  expLogFeatures,
  exponentialValue,
  formatEquationParts,
  formatSignedNumber,
  geometricSequenceValue,
  hyperbolaStandardFeatures,
  lineCircleRelation,
  lineDisplayEquation,
  lineTwoPointsFromViewport,
  linearFeatures,
  linearTeachingNotes,
  linearValue,
  logarithmValue,
  pointLineDistance,
  reciprocalFeatures,
  reciprocalValue,
  powerCurvePoints,
  powerFeatures,
  powerValue,
  ellipseStandardFeatures,
  parabolaStandardFeatures,
  sampleCurve,
  sequenceComparisonFeatures,
  recursiveSequenceTerms,
  sequenceTerms,
  sineKeyPoints,
  sineAngleGuide,
  sineTransformFeatures,
  sineValue,
  solidSectionFeatures,
  solidRotationFeatures,
  tangentAsymptotes,
  tangentFeatures,
  tangentValue,
  transformFeatures,
  transformValue,
} from "../assets/math-viz-core.mjs";

test("linearValue returns y = kx + b", () => {
  assert.equal(linearValue(2, -1, 3), 5);
});

test("exponentialValue returns a^x", () => {
  assert.equal(exponentialValue(2, 3), 8);
});

test("logarithmValue returns log base a of x", () => {
  assert.ok(Math.abs(logarithmValue(2, 8) - 3) < 1e-8);
});

test("arithmeticSequenceValue returns a_n = a1 + (n-1)d", () => {
  assert.equal(arithmeticSequenceValue(3, 2, 5), 11);
});

test("geometricSequenceValue returns a_n = a1 * q^(n-1)", () => {
  assert.equal(geometricSequenceValue(3, 2, 4), 24);
});

test("sequenceTerms generates arithmetic and geometric first terms", () => {
  const series = sequenceTerms(2, 3, 2, 4);
  assert.deepEqual(series.arithmetic, [2, 5, 8, 11]);
  assert.deepEqual(series.geometric, [2, 4, 8, 16]);
});

test("sequenceComparisonFeatures summarizes last term and growth style", () => {
  const features = sequenceComparisonFeatures(2, 3, 2, 5);
  assert.equal(features.arithmeticLast, 14);
  assert.equal(features.geometricLast, 32);
  assert.equal(features.arithmeticStyle, "线性增长");
  assert.equal(features.geometricStyle, "倍增增长");
});

test("recursiveSequenceTerms generates terms from a(n+1) = p*a(n) + q", () => {
  const result = recursiveSequenceTerms(1, 2, 1, 5);
  assert.deepEqual(result.terms, [1, 3, 7, 15, 31]);
  assert.equal(result.lastTerm, 31);
  assert.equal(result.growthHint, "增长很快");
});

test("lineCircleRelation identifies secant tangent and separate cases", () => {
  const secant = lineCircleRelation(0, 0, 0, 0, 2);
  assert.equal(secant.relation, "相交");
  assert.equal(secant.intersectionCount, 2);
  assert.deepEqual(secant.points, [{ x: -2, y: 0 }, { x: 2, y: 0 }]);

  const tangent = lineCircleRelation(0, 2, 0, 0, 2);
  assert.equal(tangent.relation, "相切");
  assert.equal(tangent.intersectionCount, 1);
  assert.deepEqual(tangent.points, [{ x: 0, y: 2 }]);

  const separate = lineCircleRelation(0, 3, 0, 0, 2);
  assert.equal(separate.relation, "相离");
  assert.equal(separate.intersectionCount, 0);
});

test("lineTwoPointsFromViewport returns two drawable points", () => {
  const points = lineTwoPointsFromViewport(1, 0, {
    xMin: -4,
    xMax: 4,
    yMin: -4,
    yMax: 4,
  });
  assert.equal(points.length, 2);
  assert.deepEqual(points[0], { x: -4, y: -4 });
  assert.deepEqual(points[1], { x: 4, y: 4 });
});

test("circleRadiusSegment returns center and radius endpoint", () => {
  const segment = circleRadiusSegment(2, -1, 3);
  assert.deepEqual(segment.from, { x: 2, y: -1 });
  assert.deepEqual(segment.to, { x: 5, y: -1 });
});

test("circleDistanceSummary aligns distance, radius and relation", () => {
  const result = circleDistanceSummary(0, 3, 0, 0, 3);
  assert.equal(result.relation, "相切");
  assert.equal(result.distance, 3);
  assert.equal(result.compareHint, "距离等于半径，所以是相切");
});

test("lineDisplayEquation formats slope intercept text for students", () => {
  assert.equal(lineDisplayEquation(1, 0), "y = x");
  assert.equal(lineDisplayEquation(-1, 2), "y = -x + 2");
  assert.equal(lineDisplayEquation(0, -3), "y = -3");
});

test("solidSectionFeatures summarizes prism, pyramid, cylinder and cone sections", () => {
  const prism = solidSectionFeatures("prism", 4, 6, 0.5);
  assert.equal(prism.shape, "正方形");
  assert.equal(prism.sectionSize, 4);
  assert.equal(prism.area, 16);

  const pyramid = solidSectionFeatures("pyramid", 4, 6, 0.5);
  assert.equal(pyramid.shape, "正方形");
  assert.equal(pyramid.sectionSize, 2);
  assert.equal(pyramid.area, 4);

  const cylinder = solidSectionFeatures("cylinder", 2, 6, 0.5);
  assert.equal(cylinder.shape, "圆");
  assert.equal(cylinder.sectionRadius, 2);
  assert.ok(Math.abs(cylinder.area - Math.PI * 4) < 1e-8);

  const cone = solidSectionFeatures("cone", 2, 6, 0.5);
  assert.equal(cone.shape, "圆");
  assert.equal(cone.sectionRadius, 1);
  assert.ok(Math.abs(cone.area - Math.PI) < 1e-8);
});

test("solidRotationFeatures maps profile types to rotated solids", () => {
  const cylinder = solidRotationFeatures("rectangle", 4, 6);
  assert.equal(cylinder.solidName, "圆柱");
  assert.equal(cylinder.radius, 4);
  assert.equal(cylinder.height, 6);

  const cone = solidRotationFeatures("triangle", 4, 6);
  assert.equal(cone.solidName, "圆锥");

  const sphere = solidRotationFeatures("semicircle", 4, 0);
  assert.equal(sphere.solidName, "球");
  assert.equal(sphere.radius, 4);
});

test("expLogFeatures summarizes growth and inverse anchors", () => {
  const growth = expLogFeatures(2);
  assert.equal(growth.expTrend, "增长");
  assert.equal(growth.logTrend, "增长");
  assert.deepEqual(growth.expAnchor, { x: 0, y: 1 });
  assert.deepEqual(growth.logAnchor, { x: 1, y: 0 });

  const decay = expLogFeatures(0.5);
  assert.equal(decay.expTrend, "衰减");
  assert.equal(decay.logTrend, "衰减");
});

test("linearFeatures returns y-intercept and trend labels", () => {
  const features = linearFeatures(-1.5, 4);
  assert.equal(features.yIntercept, 4);
  assert.equal(features.trend, "下降");
  assert.equal(features.steepness, "较陡");
});

test("linearTeachingNotes identifies constant and proportional cases", () => {
  const constantLine = linearTeachingNotes(0, 3);
  assert.equal(constantLine.relationType, "常数函数");
  assert.equal(constantLine.passesOrigin, false);
  assert.ok(constantLine.specialCases.includes("水平线"));

  const proportional = linearTeachingNotes(2, 0);
  assert.equal(proportional.relationType, "正比例函数");
  assert.equal(proportional.passesOrigin, true);
  assert.ok(proportional.specialCases.includes("过原点"));
});

test("reciprocalValue and reciprocalFeatures describe branch and asymptotes", () => {
  assert.equal(reciprocalValue(2, 4), 0.5);
  assert.equal(reciprocalValue(-2, 4), -0.5);

  const positive = reciprocalFeatures(2);
  assert.equal(positive.branchHint, "图像在第一、三象限");
  assert.equal(positive.asymptotes[0], "x = 0");
  assert.equal(positive.asymptotes[1], "y = 0");

  const negative = reciprocalFeatures(-2);
  assert.equal(negative.branchHint, "图像在第二、四象限");
});

test("sineValue supports amplitude, omega, phase and offset", () => {
  const result = sineValue(2, 1, 0, 1, Math.PI / 2);
  assert.ok(Math.abs(result - 3) < 1e-8);
});

test("sineKeyPoints returns five key points in one period", () => {
  const points = sineKeyPoints({ amplitude: 1, omega: 1, phase: 0, offset: 0 });
  assert.equal(points.length, 5);
  assert.ok(Math.abs(points[0].x - 0) < 1e-8);
  assert.ok(Math.abs(points[1].x - Math.PI / 2) < 1e-8);
  assert.ok(Math.abs(points[4].x - Math.PI * 2) < 1e-8);
});

test("sineAngleGuide returns quadrant and key-angle hints", () => {
  const peak = sineAngleGuide(Math.PI / 2);
  assert.equal(peak.quadrant, "第一象限");
  assert.equal(peak.keyAngleLabel, "π/2");
  assert.equal(peak.pointType, "波峰");
  assert.equal(peak.valueSign, "正");

  const thirdQuadrant = sineAngleGuide((5 * Math.PI) / 4);
  assert.equal(thirdQuadrant.quadrant, "第三象限");
  assert.equal(thirdQuadrant.valueSign, "负");
});

test("sineTransformFeatures summarizes amplitude period and shifts", () => {
  const features = sineTransformFeatures(3, 2, -Math.PI / 2, 1);
  assert.equal(features.amplitude, 3);
  assert.ok(Math.abs(features.period - Math.PI) < 1e-8);
  assert.ok(Math.abs(features.phaseShift - Math.PI / 4) < 1e-8);
  assert.equal(features.verticalShift, 1);
  assert.deepEqual(features.range, [-2, 4]);
});

test("formatSignedNumber keeps sign formatting stable", () => {
  assert.equal(formatSignedNumber(2), "+2.00");
  assert.equal(formatSignedNumber(-3.5), "-3.50");
  assert.equal(formatSignedNumber(0), "+0.00");
});

test("powerValue and powerCurvePoints support typical high-school exponents", () => {
  assert.equal(powerValue(2, -3), 9);
  assert.equal(powerValue(3, -2), -8);
  assert.equal(powerValue(0.5, 9), 3);

  const fractionalPoints = powerCurvePoints(0.5, -2, 4, 1);
  assert.deepEqual(fractionalPoints.map((point) => point.x), [0, 1, 2, 3, 4]);
});

test("powerFeatures distinguishes odd even and fractional exponents", () => {
  assert.equal(powerFeatures(2).symmetry, "关于 y 轴对称");
  assert.equal(powerFeatures(3).symmetry, "关于原点对称");
  assert.equal(powerFeatures(0.5).domainHint, "只看 x ≥ 0 的部分");
});

test("sampleCurve skips non-finite points and keeps finite segments", () => {
  const points = sampleCurve((x) => (x === 0 ? Number.NaN : 1 / x), {
    xMin: -2,
    xMax: 2,
    yMin: -10,
    yMax: 10,
  }, 1);

  assert.equal(points.some((point) => Number.isNaN(point.y)), false);
  assert.ok(points.length >= 3);
});

test("formatEquationParts joins math fragments for display", () => {
  assert.equal(formatEquationParts(["y", "=", "2x", "+", "1"]), "y = 2x + 1");
});

test("transformValue and transformFeatures summarize shifts and scales", () => {
  const value = transformValue("quadratic", 3, {
    horizontalShift: 1,
    verticalShift: -2,
    horizontalScale: 1,
    verticalScale: 2,
  });
  assert.equal(value, 6);

  const features = transformFeatures({
    baseType: "absolute",
    horizontalShift: 2,
    verticalShift: -1,
    horizontalScale: 0.5,
    verticalScale: 3,
  });
  assert.equal(features.baseLabel, "|x|");
  assert.equal(features.horizontalMove, "向右平移 2.00");
  assert.equal(features.verticalMove, "向下平移 1.00");
});

test("cosineValue and cosineKeyPoints describe standard cosine", () => {
  assert.ok(Math.abs(cosineValue(1, 1, 0, 0, 0) - 1) < 1e-8);
  const points = cosineKeyPoints({ amplitude: 1, omega: 1, phase: 0, offset: 0 });
  assert.equal(points.length, 5);
  assert.ok(Math.abs(points[0].y - 1) < 1e-8);
  assert.ok(Math.abs(points[2].y + 1) < 1e-8);
});

test("cosineAngleGuide returns key-angle and sign hints", () => {
  const start = cosineAngleGuide(0);
  assert.equal(start.keyAngleLabel, "0");
  assert.equal(start.pointType, "波峰");
  assert.equal(start.valueSign, "正");

  const trough = cosineAngleGuide(Math.PI);
  assert.equal(trough.keyAngleLabel, "π");
  assert.equal(trough.pointType, "波谷");
});

test("tangentValue and tangent features expose period and asymptotes", () => {
  assert.ok(Math.abs(tangentValue(1, 0, 0, Math.PI / 4) - 1) < 1e-8);
  const features = tangentFeatures(1, 0, 0);
  assert.ok(Math.abs(features.period - Math.PI) < 1e-8);
  assert.equal(features.rangeHint, "没有最大值和最小值");

  const asymptotes = tangentAsymptotes({ omega: 1, phase: 0 }, -Math.PI, Math.PI);
  assert.deepEqual(asymptotes, [-Math.PI / 2, Math.PI / 2]);
});

test("circleStandardFeatures maps center radius and equation", () => {
  const features = circleStandardFeatures(2, -1, 3);
  assert.deepEqual(features.center, { x: 2, y: -1 });
  assert.equal(features.radius, 3);
  assert.equal(features.standardEquation, "(x - 2)^2 + (y + 1)^2 = 9");
});

test("parabolaStandardFeatures maps direction focus and directrix", () => {
  const upward = parabolaStandardFeatures("up", 2);
  assert.equal(upward.standardEquation, "x^2 = 8y");
  assert.deepEqual(upward.focus, { x: 0, y: 2 });
  assert.equal(upward.directrix, "y = -2");

  const leftward = parabolaStandardFeatures("left", 3);
  assert.equal(leftward.standardEquation, "y^2 = -12x");
  assert.deepEqual(leftward.focus, { x: -3, y: 0 });
  assert.equal(leftward.directrix, "x = 3");
});

test("ellipseStandardFeatures maps semi-axes focus and eccentricity", () => {
  const features = ellipseStandardFeatures("horizontal", 5, 3);
  assert.equal(features.standardEquation, "x^2/25 + y^2/9 = 1");
  assert.deepEqual(features.focusLeft, { x: -4, y: 0 });
  assert.deepEqual(features.focusRight, { x: 4, y: 0 });
  assert.equal(features.eccentricity, 0.8);
});

test("hyperbolaStandardFeatures maps asymptotes focus and eccentricity", () => {
  const horizontal = hyperbolaStandardFeatures("horizontal", 4, 3);
  assert.equal(horizontal.standardEquation, "x^2/16 - y^2/9 = 1");
  assert.deepEqual(horizontal.focusLeft, { x: -5, y: 0 });
  assert.deepEqual(horizontal.focusRight, { x: 5, y: 0 });
  assert.equal(horizontal.eccentricity, 1.25);
  assert.deepEqual(horizontal.asymptotes, ["y = 0.75x", "y = -0.75x"]);

  const vertical = hyperbolaStandardFeatures("vertical", 4, 3);
  assert.equal(vertical.standardEquation, "y^2/16 - x^2/9 = 1");
  assert.deepEqual(vertical.focusTop, { x: 0, y: 5 });
  assert.deepEqual(vertical.focusBottom, { x: 0, y: -5 });
  assert.deepEqual(vertical.asymptotes, ["y = 1.33x", "y = -1.33x"]);
});

test("conicHorizontalLineRelation classifies parabola ellipse and hyperbola with intersections", () => {
  const parabola = conicHorizontalLineRelation("parabola", 1, { a: 1.5 });
  assert.equal(parabola.relation, "相交");
  assert.equal(parabola.intersectionCount, 2);
  assert.ok(Math.abs(parabola.points[0].x + 2.44949) < 1e-5);
  assert.ok(Math.abs(parabola.points[1].x - 2.44949) < 1e-5);

  const ellipse = conicHorizontalLineRelation("ellipse", 3, { a: 5, b: 3 });
  assert.equal(ellipse.relation, "相切");
  assert.equal(ellipse.intersectionCount, 1);
  assert.deepEqual(ellipse.points, [{ x: 0, y: 3 }]);

  const hyperbolaSeparate = conicHorizontalLineRelation("hyperbola", 2, { a: 4, b: 3 });
  assert.equal(hyperbolaSeparate.relation, "相离");
  assert.equal(hyperbolaSeparate.intersectionCount, 0);

  const hyperbolaSecant = conicHorizontalLineRelation("hyperbola", 5, { a: 4, b: 3 });
  assert.equal(hyperbolaSecant.relation, "相交");
  assert.equal(hyperbolaSecant.intersectionCount, 2);
  assert.ok(Math.abs(hyperbolaSecant.points[1].x - 2.25) < 1e-8);
});

test("pointLineDistance returns distance foot and shortest segment hint", () => {
  const result = pointLineDistance(0, 3, 1, 0);
  assert.ok(Math.abs(result.distance - 2.12132) < 1e-5);
  assert.ok(Math.abs(result.foot.x - 1.5) < 1e-8);
  assert.ok(Math.abs(result.foot.y - 1.5) < 1e-8);
  assert.equal(result.shortestHint, "最短距离一定沿着垂线段");
});
