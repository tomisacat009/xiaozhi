import {
  expLogFeatures,
  exponentialValue,
  formatEquationParts,
  linearFeatures,
  linearTeachingNotes,
  linearValue,
  logarithmValue,
  reciprocalFeatures,
  reciprocalValue,
  powerCurvePoints,
  powerFeatures,
  powerValue,
  quadraticValue,
  sampleCurve,
  transformFeatures,
  transformValue,
} from "../../assets/math-viz-core.mjs";

function formatNumber(value, digits = 2) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value).toFixed(digits).replace(/\.00$/, "");
}

function formatCompactNumber(value) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value)
    .toFixed(6)
    .replace(/\.0+$/, "")
    .replace(/(\.\d*?)0+$/, "$1");
}

function formatSignedTerm(value, symbol = "", options = {}) {
  const { hideOne = false } = options;
  if (Math.abs(value) < 1e-8) return "";
  const absValue = Math.abs(value);
  const coeff = hideOne && Math.abs(absValue - 1) < 1e-8 ? "" : formatNumber(absValue);
  const absText = `${coeff}${symbol}`;
  return `${value >= 0 ? "+" : "-"} ${absText}`;
}

function formatLeadingTerm(value, symbol = "", options = {}) {
  const { hideOne = false } = options;
  if (Math.abs(value) < 1e-8) return "";
  const absValue = Math.abs(value);
  const coeff = hideOne && Math.abs(absValue - 1) < 1e-8 ? "" : formatNumber(absValue);
  const sign = value < 0 ? "-" : "";
  return `${sign}${coeff}${symbol}`;
}

function wrapShift(value) {
  if (Math.abs(value) < 1e-8) return "x";
  return value >= 0
    ? `(x - ${formatNumber(value)})`
    : `(x + ${formatNumber(Math.abs(value))})`;
}

function buildTransformEquation(params, features) {
  const inner = wrapShift(params.horizontalShift);
  const scaledInner = Math.abs(params.horizontalScale - 1) < 1e-8
    ? inner
    : `${formatNumber(params.horizontalScale)}${inner}`;
  const outerShift = Math.abs(params.verticalShift) < 1e-8
    ? ""
    : ` ${params.verticalShift >= 0 ? "+" : "-"} ${formatNumber(Math.abs(params.verticalShift))}`;

  if (params.baseType === "absolute") {
    const outer = Math.abs(params.verticalScale - 1) < 1e-8
      ? ""
      : `${formatNumber(params.verticalScale)} `;
    return `y = ${outer}|${scaledInner}|${outerShift}`.trim();
  }

  if (params.baseType === "sine") {
    const outer = Math.abs(params.verticalScale - 1) < 1e-8
      ? ""
      : `${formatNumber(params.verticalScale)}`;
    return `y = ${outer}sin(${scaledInner})${outerShift}`.replace("= sin", "= sin").trim();
  }

  const outer = Math.abs(params.verticalScale - 1) < 1e-8
    ? ""
    : `${formatNumber(params.verticalScale)}`;
  return `y = ${outer}${scaledInner}^2${outerShift}`.trim();
}

export function createFunctionExplanationCard(title, conclusion, observation, warning, highlight = false) {
  return {
    title,
    conclusion,
    observation,
    warning,
    highlight,
  };
}

export function buildTeachingItems(items) {
  return items.map((item) => ({
    title: item.title,
    value: item.value,
    badges: item.badges ?? [],
    text: item.text ?? "",
  }));
}

export function buildLinearModel({ k, b }, viewport) {
  const yIntercept = { x: 0, y: b, label: "y轴交点", color: "#ff7a59" };
  const features = linearFeatures(k, b);
  const points = [yIntercept];
  if (features.xIntercept !== null) {
    points.push({ x: features.xIntercept, y: 0, label: "x轴交点", color: "#16324f" });
  }

  let equation = `y = ${formatNumber(b)}`;
  if (Math.abs(k) >= 1e-8) {
    const leading = formatLeadingTerm(k, "x", { hideOne: true });
    const tail = formatSignedTerm(b);
    equation = formatEquationParts(["y =", leading, tail]);
  }

  return {
    derived: {
      equation,
      features,
      notes: linearTeachingNotes(k, b),
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#1d6fa5",
          lineWidth: 4,
          points: sampleCurve((x) => linearValue(k, b, x), viewport, 0.2),
        },
      ],
      points,
    },
  };
}

export function buildQuadraticModel({ a, b, c }, viewport) {
  const axisX = Math.abs(a) < 1e-8 ? 0 : -b / (2 * a);
  const vertex = { x: axisX, y: quadraticValue(a, b, c, axisX) };
  const firstTerm = Math.abs(a) < 1e-8 ? "" : formatLeadingTerm(a, "x^2", { hideOne: true });
  const secondTerm = formatSignedTerm(b, "x", { hideOne: true });
  const thirdTerm = formatSignedTerm(c);
  const equation = formatEquationParts(["y =", firstTerm || "0", secondTerm, thirdTerm]);

  return {
    derived: {
      equation,
      vertex,
      axisX,
      direction: a >= 0 ? "开口向上" : "开口向下",
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#14532d",
          lineWidth: 4,
          points: sampleCurve((x) => quadraticValue(a, b, c, x), viewport, 0.1),
        },
      ],
      points: [
        { x: vertex.x, y: vertex.y, label: "顶点", color: "#f97316" },
      ],
      segments: [
        {
          from: { x: axisX, y: viewport.yMin },
          to: { x: axisX, y: viewport.yMax },
          label: "对称轴",
          dashed: true,
          color: "rgba(249,115,22,0.86)",
        },
      ],
    },
  };
}

export function buildPowerModel({ exponent }, viewport) {
  const features = powerFeatures(exponent);
  return {
    derived: {
      equation: `y = x^${formatNumber(exponent, 2)}`,
      features,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#7c3aed",
          lineWidth: 4,
          points: powerCurvePoints(exponent, viewport.xMin, viewport.xMax, 0.05),
        },
      ],
    },
  };
}

export function buildReciprocalModel({ k }, viewport) {
  const features = reciprocalFeatures(k);
  const equation = `y = ${formatCompactNumber(k)}/x`;
  const leftBranch = sampleCurve((x) => reciprocalValue(k, x), {
    ...viewport,
    xMax: Math.min(viewport.xMax, -0.2),
  }, 0.05).filter((point) => point.y >= viewport.yMin && point.y <= viewport.yMax);
  const rightBranch = sampleCurve((x) => reciprocalValue(k, x), {
    ...viewport,
    xMin: Math.max(viewport.xMin, 0.2),
  }, 0.05).filter((point) => point.y >= viewport.yMin && point.y <= viewport.yMax);

  return {
    derived: {
      equation,
      features,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#0f766e",
          lineWidth: 4,
          points: leftBranch,
        },
        {
          type: "polyline",
          color: "#0f766e",
          lineWidth: 4,
          points: rightBranch,
        },
      ],
      points: [
        { x: 1, y: reciprocalValue(k, 1), label: "P(1,k)", color: "#f97316" },
        { x: -1, y: reciprocalValue(k, -1), label: "Q(-1,-k)", color: "#f97316" },
      ],
      segments: [
        {
          from: { x: 0, y: viewport.yMin },
          to: { x: 0, y: viewport.yMax },
          label: "x = 0",
          dashed: true,
          color: "rgba(15,118,110,0.55)",
          lineWidth: 2,
        },
        {
          from: { x: viewport.xMin, y: 0 },
          to: { x: viewport.xMax, y: 0 },
          label: "y = 0",
          dashed: true,
          color: "rgba(15,118,110,0.55)",
          lineWidth: 2,
        },
      ],
    },
  };
}

export function buildExpLogModel({ base }, viewport) {
  return {
    derived: {
      equation: `a = ${formatNumber(base, 2)}`,
      features: expLogFeatures(base),
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#3667c8",
          lineWidth: 4,
          points: sampleCurve((x) => exponentialValue(base, x), viewport, 0.05).filter((point) => point.y <= viewport.yMax && point.y >= viewport.yMin),
        },
        {
          type: "polyline",
          color: "#f08a4b",
          lineWidth: 4,
          points: sampleCurve((x) => (x <= 0 ? Number.NaN : logarithmValue(base, x)), viewport, 0.05).filter((point) => point.y <= viewport.yMax && point.y >= viewport.yMin),
        },
      ],
      points: [
        { x: 0, y: 1, label: "(0,1)", color: "#3667c8" },
        { x: 1, y: 0, label: "(1,0)", color: "#f08a4b" },
      ],
      segments: [
        {
          from: { x: viewport.xMin, y: viewport.xMin },
          to: { x: viewport.xMax, y: viewport.xMax },
          label: "y = x",
          dashed: true,
          color: "rgba(47,157,143,0.78)",
        },
      ],
    },
  };
}

export function buildTransformModel(params, viewport) {
  const features = transformFeatures(params);
  const equation = buildTransformEquation(params, features);

  return {
    derived: {
      equation,
      features,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "rgba(99,107,138,0.78)",
          lineWidth: 3,
          points: sampleCurve((x) => transformValue(params.baseType, x, {
            horizontalShift: 0,
            verticalShift: 0,
            horizontalScale: 1,
            verticalScale: 1,
          }), viewport, 0.05),
        },
        {
          type: "polyline",
          color: "#e11d48",
          lineWidth: 4,
          points: sampleCurve((x) => transformValue(params.baseType, x, params), viewport, 0.05),
        },
      ],
    },
  };
}

export function functionFormulaValue(kind, params, x) {
  if (kind === "linear") return linearValue(params.k, params.b, x);
  if (kind === "quadratic") return quadraticValue(params.a, params.b, params.c, x);
  if (kind === "power") return powerValue(params.exponent, x);
  return transformValue(params.baseType, x, params);
}
