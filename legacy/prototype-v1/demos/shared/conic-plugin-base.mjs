import {
  conicHorizontalLineRelation,
  ellipseStandardFeatures,
  hyperbolaStandardFeatures,
  parabolaStandardFeatures,
} from "../../assets/math-viz-core.mjs";

function formatNumber(value, digits = 2) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value)
    .toFixed(digits)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function sampleParabolaCurve(direction, a, viewport, step = 0.1) {
  const safeA = Math.max(Math.abs(a), 0.1);
  const points = [];

  if (direction === "up" || direction === "down") {
    for (let x = viewport.xMin; x <= viewport.xMax + 1e-8; x += step) {
      const y = (x * x) / (4 * safeA) * (direction === "up" ? 1 : -1);
      if (!Number.isFinite(y) || y < viewport.yMin || y > viewport.yMax) continue;
      points.push({ x: Number(x.toFixed(6)), y: Number(y.toFixed(6)) });
    }
    return points;
  }

  for (let y = viewport.yMin; y <= viewport.yMax + 1e-8; y += step) {
    const x = (y * y) / (4 * safeA) * (direction === "right" ? 1 : -1);
    if (!Number.isFinite(x) || x < viewport.xMin || x > viewport.xMax) continue;
    points.push({ x: Number(x.toFixed(6)), y: Number(y.toFixed(6)) });
  }
  return points;
}

function sampleHyperbolaBranch(orientation, side, a, b, viewport, step = 0.12) {
  const safeA = Math.max(Math.abs(a), 0.1);
  const safeB = Math.max(Math.abs(b), 0.1);
  const points = [];

  if (orientation === "vertical") {
    for (let x = viewport.xMin; x <= viewport.xMax + 1e-8; x += step) {
      const x2 = x * x;
      const y = safeA * Math.sqrt(1 + x2 / (safeB * safeB));
      const targetY = side === "top" ? y : -y;
      if (!Number.isFinite(targetY) || targetY < viewport.yMin || targetY > viewport.yMax) continue;
      points.push({ x: Number(x.toFixed(6)), y: Number(targetY.toFixed(6)) });
    }
    return points;
  }

  for (let y = viewport.yMin; y <= viewport.yMax + 1e-8; y += step) {
    const y2 = y * y;
    const x = safeA * Math.sqrt(1 + y2 / (safeB * safeB));
    const targetX = side === "right" ? x : -x;
    if (!Number.isFinite(targetX) || targetX < viewport.xMin || targetX > viewport.xMax) continue;
    points.push({ x: Number(targetX.toFixed(6)), y: Number(y.toFixed(6)) });
  }
  return points;
}

export function createConicCard(title, conclusion, observation, warning, highlight = false) {
  return {
    title,
    conclusion,
    observation,
    warning,
    highlight,
  };
}

export function buildConicTeachingItems(items) {
  return items.map((item) => ({
    title: item.title,
    value: item.value,
    badges: item.badges ?? [],
    text: item.text ?? "",
  }));
}

export function buildParabolaModel({ direction, a }, viewport) {
  const features = parabolaStandardFeatures(direction, a);
  const isVertical = direction === "up" || direction === "down";
  const directrixPoints = isVertical
    ? [
      { x: viewport.xMin, y: direction === "up" ? -features.focus.y : Math.abs(features.focus.y) },
      { x: viewport.xMax, y: direction === "up" ? -features.focus.y : Math.abs(features.focus.y) },
    ]
    : [
      { x: direction === "right" ? -features.focus.x : Math.abs(features.focus.x), y: viewport.yMin },
      { x: direction === "right" ? -features.focus.x : Math.abs(features.focus.x), y: viewport.yMax },
    ];

  return {
    derived: {
      equation: features.standardEquation,
      features,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#b45309",
          lineWidth: 4,
          points: sampleParabolaCurve(direction, a, viewport, 0.08),
        },
      ],
      lines: [
        {
          points: directrixPoints,
          color: "rgba(180,83,9,0.55)",
          lineWidth: 2,
          dashed: true,
          label: "准线",
        },
      ],
      points: [
        { x: 0, y: 0, label: "O", color: "#f97316", radius: 6 },
        { x: features.focus.x, y: features.focus.y, label: "F", color: "#92400e", radius: 6 },
      ],
      segments: [
        isVertical
          ? {
            from: { x: 0, y: viewport.yMin },
            to: { x: 0, y: viewport.yMax },
            label: "对称轴",
            dashed: true,
            color: "rgba(146,64,14,0.35)",
            lineWidth: 2,
          }
          : {
            from: { x: viewport.xMin, y: 0 },
            to: { x: viewport.xMax, y: 0 },
            label: "对称轴",
            dashed: true,
            color: "rgba(146,64,14,0.35)",
            lineWidth: 2,
          },
      ],
      labels: [
        isVertical
          ? { x: viewport.xMax - 1.5, y: directrixPoints[0].y, text: "准线", color: "rgba(146,64,14,0.88)" }
          : { x: directrixPoints[0].x, y: viewport.yMax - 0.8, text: "准线", color: "rgba(146,64,14,0.88)" },
      ],
    },
  };
}

export function buildEllipseModel({ orientation, a, b }) {
  const features = ellipseStandardFeatures(orientation, a, b);
  const isHorizontal = features.orientation === "horizontal";
  const majorAxis = features.semiMajorAxis;
  const minorAxis = features.semiMinorAxis;
  const focusA = isHorizontal ? features.focusLeft : features.focusBottom;
  const focusB = isHorizontal ? features.focusRight : features.focusTop;

  return {
    derived: {
      equation: features.standardEquation,
      features,
    },
    drawModel: {
      ellipses: [
        {
          center: { x: 0, y: 0 },
          radiusX: isHorizontal ? majorAxis : minorAxis,
          radiusY: isHorizontal ? minorAxis : majorAxis,
          color: "#7c3aed",
          lineWidth: 4,
          fillColor: "rgba(124,58,237,0.08)",
        },
      ],
      points: [
        { x: focusA.x, y: focusA.y, label: "F1", color: "#7c3aed", radius: 6 },
        { x: focusB.x, y: focusB.y, label: "F2", color: "#7c3aed", radius: 6 },
        ...(isHorizontal
          ? [
            { x: -majorAxis, y: 0, label: "A1", color: "#f97316", radius: 5 },
            { x: majorAxis, y: 0, label: "A2", color: "#f97316", radius: 5 },
            { x: 0, y: minorAxis, label: "B1", color: "#0f766e", radius: 5 },
            { x: 0, y: -minorAxis, label: "B2", color: "#0f766e", radius: 5 },
          ]
          : [
            { x: 0, y: -majorAxis, label: "A1", color: "#f97316", radius: 5 },
            { x: 0, y: majorAxis, label: "A2", color: "#f97316", radius: 5 },
            { x: minorAxis, y: 0, label: "B1", color: "#0f766e", radius: 5 },
            { x: -minorAxis, y: 0, label: "B2", color: "#0f766e", radius: 5 },
          ]),
      ],
      segments: [
        isHorizontal
          ? {
            from: { x: -majorAxis, y: 0 },
            to: { x: majorAxis, y: 0 },
            label: `长轴 = ${formatNumber(majorAxis * 2)}`,
            dashed: true,
            color: "rgba(249,115,22,0.5)",
            lineWidth: 2,
          }
          : {
            from: { x: 0, y: -majorAxis },
            to: { x: 0, y: majorAxis },
            label: `长轴 = ${formatNumber(majorAxis * 2)}`,
            dashed: true,
            color: "rgba(249,115,22,0.5)",
            lineWidth: 2,
          },
        isHorizontal
          ? {
            from: { x: 0, y: -minorAxis },
            to: { x: 0, y: minorAxis },
            label: `短轴 = ${formatNumber(minorAxis * 2)}`,
            dashed: true,
            color: "rgba(15,118,110,0.5)",
            lineWidth: 2,
          }
          : {
            from: { x: -minorAxis, y: 0 },
            to: { x: minorAxis, y: 0 },
            label: `短轴 = ${formatNumber(minorAxis * 2)}`,
            dashed: true,
            color: "rgba(15,118,110,0.5)",
            lineWidth: 2,
          },
      ],
    },
  };
}

export function buildHyperbolaModel({ orientation, a, b }, viewport) {
  const features = hyperbolaStandardFeatures(orientation, a, b);
  const isHorizontal = features.orientation === "horizontal";
  const focusA = isHorizontal ? features.focusLeft : features.focusBottom;
  const focusB = isHorizontal ? features.focusRight : features.focusTop;
  const branchA = sampleHyperbolaBranch(features.orientation, isHorizontal ? "left" : "bottom", a, b, viewport);
  const branchB = sampleHyperbolaBranch(features.orientation, isHorizontal ? "right" : "top", a, b, viewport);
  const slope = isHorizontal
    ? features.semiConjugateAxis / features.semiTransverseAxis
    : features.semiTransverseAxis / features.semiConjugateAxis;
  const lineFromSlope = (signedSlope) => ([
    { x: viewport.xMin, y: signedSlope * viewport.xMin },
    { x: viewport.xMax, y: signedSlope * viewport.xMax },
  ]);

  return {
    derived: {
      equation: features.standardEquation,
      features,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#0f4c81",
          lineWidth: 4,
          points: branchA,
        },
        {
          type: "polyline",
          color: "#0f4c81",
          lineWidth: 4,
          points: branchB,
        },
      ],
      lines: [
        {
          points: lineFromSlope(slope),
          color: "rgba(15,76,129,0.45)",
          lineWidth: 2,
          dashed: true,
          label: "渐近线",
        },
        {
          points: lineFromSlope(-slope),
          color: "rgba(15,76,129,0.45)",
          lineWidth: 2,
          dashed: true,
          label: "渐近线",
        },
      ],
      points: [
        { x: focusA.x, y: focusA.y, label: "F1", color: "#0f4c81", radius: 6 },
        { x: focusB.x, y: focusB.y, label: "F2", color: "#0f4c81", radius: 6 },
        ...features.vertices.map((point, index) => ({
          x: point.x,
          y: point.y,
          label: `A${index + 1}`,
          color: "#f97316",
          radius: 5,
        })),
      ],
      segments: [
        isHorizontal
          ? {
            from: { x: -features.semiTransverseAxis, y: 0 },
            to: { x: features.semiTransverseAxis, y: 0 },
            label: `实轴 = ${formatNumber(features.semiTransverseAxis * 2)}`,
            dashed: true,
            color: "rgba(249,115,22,0.45)",
            lineWidth: 2,
          }
          : {
            from: { x: 0, y: -features.semiTransverseAxis },
            to: { x: 0, y: features.semiTransverseAxis },
            label: `实轴 = ${formatNumber(features.semiTransverseAxis * 2)}`,
            dashed: true,
            color: "rgba(249,115,22,0.45)",
            lineWidth: 2,
          },
      ],
    },
  };
}

export function buildConicOverviewModel({ family, a, b }, viewport) {
  if (family === "ellipse") {
    const model = buildEllipseModel({ orientation: "horizontal", a, b });
    return {
      ...model,
      derived: {
        ...model.derived,
        family: "ellipse",
        title: "椭圆",
        comparison: {
          focusRule: "椭圆有两个焦点，但没有渐近线",
          closureRule: "椭圆是闭合曲线",
          equationRule: "标准方程是两个平方项相加等于 1",
        },
      },
    };
  }

  if (family === "hyperbola") {
    const model = buildHyperbolaModel({ orientation: "horizontal", a, b }, viewport);
    return {
      ...model,
      derived: {
        ...model.derived,
        family: "hyperbola",
        title: "双曲线",
        comparison: {
          focusRule: "双曲线有两个焦点和两条渐近线",
          closureRule: "双曲线不是闭合曲线，而是两支分开的曲线",
          equationRule: "标准方程是两个平方项相减等于 1",
        },
      },
    };
  }

  const model = buildParabolaModel({ direction: "up", a }, viewport);
  return {
    ...model,
    derived: {
      ...model.derived,
      family: "parabola",
      title: "抛物线",
      comparison: {
        focusRule: "抛物线只有一个焦点和一条准线",
        closureRule: "抛物线不是闭合曲线，只有一个连续分支",
        equationRule: "标准方程里只有一个字母平方",
      },
    },
  };
}

export function buildConicLineRelationModel({ family, lineY, a, b }, viewport) {
  const relationSummary = conicHorizontalLineRelation(family, lineY, { a, b });
  let baseModel;
  let title = "抛物线";

  if (family === "ellipse") {
    title = "椭圆";
    baseModel = buildEllipseModel({ orientation: "horizontal", a, b });
  } else if (family === "hyperbola") {
    title = "双曲线";
    baseModel = buildHyperbolaModel({ orientation: "vertical", a, b }, viewport);
  } else {
    baseModel = buildParabolaModel({ direction: "up", a }, viewport);
  }

  return {
    derived: {
      family: family ?? "parabola",
      title,
      equation: baseModel.derived.equation,
      features: baseModel.derived.features,
      relationSummary,
      lineEquation: `y = ${formatNumber(lineY)}`,
    },
    drawModel: {
      ...baseModel.drawModel,
      lines: [
        ...(baseModel.drawModel.lines ?? []),
        {
          points: [
            { x: viewport.xMin, y: lineY },
            { x: viewport.xMax, y: lineY },
          ],
          color: "#1d6fa5",
          lineWidth: 3,
          dashed: true,
          label: `y = ${formatNumber(lineY)}`,
        },
      ],
      points: [
        ...(baseModel.drawModel.points ?? []),
        ...relationSummary.points.map((point, index) => ({
          x: point.x,
          y: point.y,
          label: `P${index + 1}`,
          color: "#f08a4b",
          radius: 6,
        })),
      ],
    },
  };
}
