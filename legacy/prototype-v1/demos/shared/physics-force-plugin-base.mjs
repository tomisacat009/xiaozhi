function formatNumber(value, digits = 2) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value)
    .toFixed(digits)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function buildViewport(xValues, yValues, options = {}) {
  const safeX = [...xValues, 0];
  const safeY = [...yValues, 0];
  const xMin = Math.min(...safeX);
  const xMax = Math.max(...safeX);
  const yMin = Math.min(...safeY);
  const yMax = Math.max(...safeY);
  const xPadding = Math.max((xMax - xMin) * 0.12, options.minXPadding ?? 1);
  const yPadding = Math.max((yMax - yMin) * 0.18, options.minYPadding ?? 1);

  return {
    xMin: xMin - xPadding,
    xMax: xMax + xPadding,
    yMin: yMin - yPadding,
    yMax: yMax + yPadding,
  };
}

export function buildOverweightModel({ m, g, a }) {
  const gravityForce = m * g;
  const supportForce = Math.max(0, m * (g + a));
  const normalizedSupport = gravityForce > 0 ? supportForce / gravityForce : 0;
  const stateLabel = supportForce === 0
    ? "完全失重"
    : a > 0
      ? "超重"
      : a < 0
        ? "失重"
        : "正常状态";
  const viewport = buildViewport([0, 10], [0, 10], { minXPadding: 0.6, minYPadding: 0.8 });

  return {
    derived: {
      gravityForce: Number(formatNumber(gravityForce)),
      supportForce: Number(formatNumber(supportForce)),
      apparentWeightRatio: Number(formatNumber(normalizedSupport)),
      acceleration: a,
      stateLabel,
      supportEquation: `N = m(g + a) = ${formatNumber(supportForce)}`,
      studentSummary: stateLabel === "超重"
        ? "加速度方向向上时，支持力要比重力更大，所以人会感觉更重。"
        : stateLabel === "完全失重"
          ? "自由落体时支持力降到 0，所以体感上会完全失重。"
          : stateLabel === "失重"
            ? "虽然重力没有变，但支持力减小了，所以会感觉变轻。"
            : "没有额外加速度时，支持力和重力平衡，体感就是平常的重量。",
    },
    view: {
      viewport,
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      polygons: [
        {
          points: [
            { x: 3.6, y: 1.2 },
            { x: 6.4, y: 1.2 },
            { x: 6.4, y: 1.8 },
            { x: 3.6, y: 1.8 },
          ],
          color: "#94a3b8",
          fillColor: "rgba(148,163,184,0.28)",
          lineWidth: 2,
        },
        {
          points: [
            { x: 4.25, y: 1.8 },
            { x: 5.75, y: 1.8 },
            { x: 5.75, y: 4.2 },
            { x: 4.25, y: 4.2 },
          ],
          color: "#f59e0b",
          fillColor: "rgba(245,158,11,0.2)",
          lineWidth: 2,
        },
      ],
      points: [
        { x: 5, y: 3, label: "人", color: "#f97316", radius: 5 },
      ],
      segments: [
        {
          from: { x: 5, y: 3 },
          to: { x: 5, y: 3 - 2.2 },
          color: "rgba(220,38,38,0.88)",
          lineWidth: 4,
          label: `G = ${formatNumber(gravityForce)}`,
        },
        {
          from: { x: 5, y: 1.8 },
          to: { x: 5, y: 1.8 + Math.max(0.8, normalizedSupport * 2.2) },
          color: "rgba(22,163,74,0.88)",
          lineWidth: 4,
          label: `N = ${formatNumber(supportForce)}`,
        },
        {
          from: { x: 7.4, y: 3 },
          to: { x: 7.4, y: 3 + Math.max(-1.8, Math.min(1.8, a / 4)) },
          color: "rgba(37,99,235,0.88)",
          lineWidth: 3,
          label: `a = ${formatNumber(a)}`,
        },
      ],
      labels: [
        { x: 4.1, y: 5.2, text: stateLabel, color: "rgba(19,45,74,0.92)", dx: 0, dy: 0 },
        { x: 3.6, y: 0.7, text: "电梯底板", color: "rgba(100,116,139,0.92)", dx: 0, dy: 0 },
      ],
    },
  };
}

export function buildConnectedBodiesModel({ m1, m2, f }) {
  const systemMass = m1 + m2;
  const acceleration = systemMass === 0 ? 0 : f / systemMass;
  const tension = m2 * acceleration;
  const viewport = buildViewport([0, 12], [0, 6], { minXPadding: 0.6, minYPadding: 0.6 });

  return {
    derived: {
      systemMass: Number(formatNumber(systemMass)),
      acceleration: Number(formatNumber(acceleration)),
      tension: Number(formatNumber(tension)),
      wholeEquation: `a = F / (m1 + m2) = ${formatNumber(acceleration)}`,
      localEquation: `T = m2a = ${formatNumber(tension)}`,
      studentSummary: "整体法先看两个物体一起被外力怎样拉动，隔离法再回头看连接处内部张力是多少，会比一上来就拆开轻松很多。",
    },
    view: {
      viewport,
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      polygons: [
        {
          points: [
            { x: 1.5, y: 1 },
            { x: 4, y: 1 },
            { x: 4, y: 3.2 },
            { x: 1.5, y: 3.2 },
          ],
          color: "#1d6fa5",
          fillColor: "rgba(29,111,165,0.18)",
          lineWidth: 2,
        },
        {
          points: [
            { x: 5.2, y: 1 },
            { x: 8.5, y: 1 },
            { x: 8.5, y: 3.2 },
            { x: 5.2, y: 3.2 },
          ],
          color: "#f97316",
          fillColor: "rgba(249,115,22,0.18)",
          lineWidth: 2,
        },
      ],
      points: [
        { x: 2.75, y: 2.1, label: "m1", color: "#1d6fa5", radius: 5 },
        { x: 6.85, y: 2.1, label: "m2", color: "#f97316", radius: 5 },
      ],
      segments: [
        {
          from: { x: 8.5, y: 2.1 },
          to: { x: 11, y: 2.1 },
          color: "rgba(220,38,38,0.88)",
          lineWidth: 4,
          label: `F = ${formatNumber(f)}`,
        },
        {
          from: { x: 4, y: 2.1 },
          to: { x: 5.2, y: 2.1 },
          color: "rgba(22,163,74,0.88)",
          lineWidth: 4,
          label: `T = ${formatNumber(tension)}`,
        },
        {
          from: { x: 7.2, y: 4.1 },
          to: { x: 8.9, y: 4.1 },
          color: "rgba(37,99,235,0.88)",
          lineWidth: 3,
          label: `a = ${formatNumber(acceleration)}`,
        },
      ],
      labels: [
        { x: 1.5, y: 0.45, text: `整体质量 ${formatNumber(systemMass)}`, color: "rgba(19,45,74,0.92)", dx: 0, dy: 0 },
      ],
    },
  };
}
