import {
  circleDistanceSummary,
  circleRadiusSegment,
  circleStandardFeatures,
  lineDisplayEquation,
  lineTwoPointsFromViewport,
  pointLineDistance,
} from "../../assets/math-viz-core.mjs";

function formatNumber(value, digits = 2) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value)
    .toFixed(digits)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function formatPoint(x, y) {
  return `(${formatNumber(x)}, ${formatNumber(y)})`;
}

function buildIntersectionPoints(points) {
  return points.map((point, index) => ({
    x: point.x,
    y: point.y,
    label: `P${index + 1}`,
    color: "#f08a4b",
    radius: 6,
  }));
}

export function createGeometryCard(title, conclusion, observation, warning, highlight = false) {
  return {
    title,
    conclusion,
    observation,
    warning,
    highlight,
  };
}

export function buildGeometryTeachingItems(items) {
  return items.map((item) => ({
    title: item.title,
    value: item.value,
    badges: item.badges ?? [],
    text: item.text ?? "",
  }));
}

export function buildLineCircleStudentSummary(relationSummary) {
  if (relationSummary.relation === "相交") {
    return "距离比半径短，所以直线会穿过圆，图上会看到两个公共点。";
  }

  if (relationSummary.relation === "相切") {
    return "距离和半径一样长，所以直线只会轻轻碰到圆一次。";
  }

  return "距离已经大于半径，所以直线还没碰到圆，自然没有公共点。";
}

export function buildCircleStandardModel({ h, k, r }) {
  const features = circleStandardFeatures(h, k, r);
  const radiusSegment = circleRadiusSegment(features.center.x, features.center.y, features.radius);

  return {
    derived: {
      equation: features.standardEquation,
      features,
      centerText: formatPoint(features.center.x, features.center.y),
    },
    drawModel: {
      circles: [
        {
          center: features.center,
          radius: features.radius,
          color: "#2b7a78",
          lineWidth: 4,
        },
      ],
      points: [
        { x: features.center.x, y: features.center.y, label: "C", color: "#ef8354", radius: 6 },
        { x: radiusSegment.to.x, y: radiusSegment.to.y, label: "R", color: "#f08a4b", radius: 5 },
      ],
      segments: [
        {
          from: radiusSegment.from,
          to: radiusSegment.to,
          label: `r = ${formatNumber(features.radius)}`,
          dashed: true,
          color: "rgba(239,131,84,0.82)",
          lineWidth: 3,
        },
      ],
    },
  };
}

export function buildPointLineDistanceModel({ x0, y0, k, b }, viewport) {
  const distanceResult = pointLineDistance(x0, y0, k, b);
  const lineEquation = lineDisplayEquation(k, b);

  return {
    derived: {
      equation: `P${formatPoint(x0, y0)}，${lineEquation}`,
      lineEquation,
      distanceResult,
    },
    drawModel: {
      lines: [
        {
          points: lineTwoPointsFromViewport(k, b, viewport),
          color: "#2b7a78",
          lineWidth: 4,
        },
      ],
      points: [
        { x: x0, y: y0, label: "P", color: "#ef8354", radius: 7 },
        { x: distanceResult.foot.x, y: distanceResult.foot.y, label: "H", color: "#ef8354", radius: 6 },
      ],
      segments: [
        {
          from: { x: x0, y: y0 },
          to: distanceResult.foot,
          label: `d = ${distanceResult.distance.toFixed(2)}`,
          dashed: true,
          color: "rgba(239,131,84,0.82)",
          lineWidth: 3,
        },
      ],
    },
  };
}

export function buildLineCircleModel({ k, b, cx, cy, r }, viewport) {
  const relationSummary = circleDistanceSummary(k, b, cx, cy, r);
  const distanceResult = pointLineDistance(cx, cy, k, b);
  const circleFeatures = circleStandardFeatures(cx, cy, r);
  const radiusSegment = circleRadiusSegment(circleFeatures.center.x, circleFeatures.center.y, circleFeatures.radius);
  const lineEquation = lineDisplayEquation(k, b);

  return {
    derived: {
      equation: `${lineEquation}，C${formatPoint(cx, cy)}，r = ${formatNumber(circleFeatures.radius)}`,
      lineEquation,
      circleEquation: circleFeatures.standardEquation,
      circleFeatures,
      distanceResult,
      relationSummary,
    },
    drawModel: {
      lines: [
        {
          points: lineTwoPointsFromViewport(k, b, viewport),
          color: "#4e78c8",
          lineWidth: 4,
        },
      ],
      circles: [
        {
          center: circleFeatures.center,
          radius: circleFeatures.radius,
          color: "#8b5cf6",
          lineWidth: 4,
        },
      ],
      points: [
        { x: circleFeatures.center.x, y: circleFeatures.center.y, label: "C", color: "#8b5cf6", radius: 6 },
        { x: distanceResult.foot.x, y: distanceResult.foot.y, label: "H", color: "#f59e0b", radius: 5 },
        ...buildIntersectionPoints(relationSummary.points),
      ],
      segments: [
        {
          from: { x: circleFeatures.center.x, y: circleFeatures.center.y },
          to: distanceResult.foot,
          label: `d = ${relationSummary.distance.toFixed(2)}`,
          dashed: true,
          color: "rgba(249,115,22,0.85)",
          lineWidth: 3,
        },
        {
          from: radiusSegment.from,
          to: radiusSegment.to,
          label: `r = ${formatNumber(circleFeatures.radius)}`,
          dashed: true,
          color: "rgba(139,92,246,0.76)",
          lineWidth: 3,
        },
      ],
    },
  };
}
