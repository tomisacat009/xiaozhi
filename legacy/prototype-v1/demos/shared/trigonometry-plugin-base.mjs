import {
  cosineAngleGuide,
  cosineKeyPoints,
  cosineValue,
  formatEquationParts,
  sampleCurve,
  sineAngleGuide,
  sineKeyPoints,
  sineTransformFeatures,
  sineValue,
  tangentAsymptotes,
  tangentFeatures,
  tangentValue,
} from "../../assets/math-viz-core.mjs";

function formatNumber(value, digits = 2) {
  return Number(value).toFixed(digits).replace(/\.00$/, "");
}

function formatFactor(value, symbol = "", hideOne = false) {
  if (Math.abs(value) < 1e-8) return "0";
  const absValue = Math.abs(value);
  const coeff = Math.abs(absValue - 1) < 1e-8 && (symbol || hideOne) ? "" : formatNumber(absValue, 2);
  return `${value < 0 ? "-" : ""}${coeff}${symbol}`;
}

function formatOuterShift(value) {
  if (Math.abs(value) < 1e-8) return "";
  return `${value >= 0 ? "+" : "-"} ${formatNumber(Math.abs(value), 2)}`;
}

function formatInnerShift(value) {
  if (Math.abs(value) < 1e-8) return "";
  return `${value >= 0 ? "+" : "-"} ${formatPiText(Math.abs(value))}`;
}

export function formatPiText(value) {
  const ratio = value / Math.PI;
  if (Math.abs(ratio) < 1e-8) return "0";
  return `${ratio.toFixed(2)}π`;
}

function buildKeyPointLabels(points) {
  return points.map((point, index) => ({
    x: point.x,
    y: point.y,
    label: ["起点", "关键点", "关键点", "关键点", "终点"][index] ?? "关键点",
    color: index === 0 ? "#f97316" : "#1d4ed8",
  }));
}

export function buildSineBasicModel({ angle }, viewport) {
  const guide = sineAngleGuide(angle);
  const point = { x: angle, y: sineValue(1, 1, 0, 0, angle) };
  const keyPoints = sineKeyPoints({ amplitude: 1, omega: 1, phase: 0, offset: 0 });

  return {
    derived: {
      equation: "y = sin(x)",
      guide,
      point,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#5368d8",
          lineWidth: 4,
          points: sampleCurve((x) => sineValue(1, 1, 0, 0, x), viewport, 0.04),
        },
      ],
      points: [
        ...buildKeyPointLabels(keyPoints),
        { x: point.x, y: point.y, label: `当前角 ${formatPiText(angle)}`, color: "#ff7a59", radius: 6 },
      ],
    },
  };
}

export function buildCosineBasicModel({ angle }, viewport) {
  const guide = cosineAngleGuide(angle);
  const point = { x: angle, y: cosineValue(1, 1, 0, 0, angle) };
  const keyPoints = cosineKeyPoints({ amplitude: 1, omega: 1, phase: 0, offset: 0 });

  return {
    derived: {
      equation: "y = cos(x)",
      guide,
      point,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#8b5cf6",
          lineWidth: 4,
          points: sampleCurve((x) => cosineValue(1, 1, 0, 0, x), viewport, 0.04),
        },
      ],
      points: [
        ...buildKeyPointLabels(keyPoints),
        { x: point.x, y: point.y, label: `当前角 ${formatPiText(angle)}`, color: "#ff7a59", radius: 6 },
      ],
    },
  };
}

export function buildSineTransformModel(params, viewport) {
  const features = sineTransformFeatures(
    params.amplitude,
    params.omega,
    params.phase,
    params.offset,
  );

  const inner = formatEquationParts([
    formatFactor(params.omega, "x", true),
    formatInnerShift(params.phase),
  ]);

  return {
    derived: {
      equation: formatEquationParts([
        "y =",
        `${formatFactor(params.amplitude, "", true)}sin(${inner})`,
        formatOuterShift(params.offset),
      ]),
      features,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "rgba(99,107,138,0.78)",
          lineWidth: 3,
          points: sampleCurve((x) => sineValue(1, 1, 0, 0, x), viewport, 0.04),
        },
        {
          type: "polyline",
          color: "#5368d8",
          lineWidth: 4,
          points: sampleCurve((x) => sineValue(params.amplitude, params.omega, params.phase, params.offset, x), viewport, 0.04),
        },
      ],
      segments: [
        {
          from: { x: viewport.xMin, y: params.offset },
          to: { x: viewport.xMax, y: params.offset },
          label: `中线 y = ${formatNumber(params.offset, 2)}`,
          dashed: true,
          color: "rgba(255,159,104,0.85)",
        },
      ],
    },
  };
}

function buildTangentCurves(params, viewport) {
  const asymptotes = tangentAsymptotes(params, viewport.xMin, viewport.xMax);
  const xStops = [viewport.xMin, ...asymptotes, viewport.xMax];
  const curves = [];

  for (let index = 0; index < xStops.length - 1; index += 1) {
    const left = xStops[index];
    const right = xStops[index + 1];
    const start = index === 0 ? left : left + 0.03;
    const end = index === xStops.length - 2 ? right : right - 0.03;
    if (end <= start) continue;
    const points = sampleCurve((x) => tangentValue(params.omega, params.phase, params.offset, x), {
      ...viewport,
      xMin: start,
      xMax: end,
    }, 0.02).filter((point) => point.y <= viewport.yMax && point.y >= viewport.yMin);
    if (points.length) {
      curves.push({
        type: "polyline",
        color: "#dc2626",
        lineWidth: 4,
        points,
      });
    }
  }

  return {
    asymptotes,
    curves,
  };
}

export function buildTangentModel(params, viewport) {
  const features = tangentFeatures(params.omega, params.phase, params.offset);
  const tangentParts = buildTangentCurves(params, viewport);
  const inner = formatEquationParts([
    formatFactor(params.omega, "x", true),
    formatInnerShift(params.phase),
  ]);

  return {
    derived: {
      equation: formatEquationParts([
        `y = tan(${inner})`,
        formatOuterShift(params.offset),
      ]),
      features,
      asymptotes: tangentParts.asymptotes,
    },
    drawModel: {
      curves: tangentParts.curves,
      segments: [
        ...tangentParts.asymptotes.map((x) => ({
          from: { x, y: viewport.yMin },
          to: { x, y: viewport.yMax },
          label: "渐近线",
          dashed: true,
          color: "rgba(234,88,12,0.78)",
        })),
        {
          from: { x: viewport.xMin, y: params.offset },
          to: { x: viewport.xMax, y: params.offset },
          label: "平移后中线",
          dashed: true,
          color: "rgba(59,130,246,0.62)",
        },
      ],
    },
  };
}
