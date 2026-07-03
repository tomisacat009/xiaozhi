function formatNumber(value, digits = 2) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value)
    .toFixed(digits)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function ratio(value, total) {
  if (Math.abs(total) < 1e-8) return 0;
  return value / total;
}

function barPolygon(centerX, width, heightRatio, color, fillColor) {
  return {
    points: [
      { x: centerX - width / 2, y: 0 },
      { x: centerX + width / 2, y: 0 },
      { x: centerX + width / 2, y: heightRatio },
      { x: centerX - width / 2, y: heightRatio },
    ],
    color,
    fillColor,
    lineWidth: 2,
  };
}

export function buildMechanicalEnergyModel({ m, g, h0, h }) {
  const clampedHeight = Math.max(0, Math.min(h, h0));
  const totalEnergy = m * g * h0;
  const potentialEnergy = m * g * clampedHeight;
  const kineticEnergy = totalEnergy - potentialEnergy;
  const speed = Math.sqrt(Math.max(0, (2 * kineticEnergy) / m));

  return {
    derived: {
      totalEnergy: Number(formatNumber(totalEnergy)),
      potentialEnergy: Number(formatNumber(potentialEnergy)),
      kineticEnergy: Number(formatNumber(kineticEnergy)),
      currentHeight: Number(formatNumber(clampedHeight)),
      speed: Number(formatNumber(speed)),
      studentSummary: "机械能守恒不是每一项都不变，而是势能减少多少，动能就补上多少，所以总机械能保持不变。",
    },
    view: {
      viewport: {
        xMin: -0.6,
        xMax: 8.6,
        yMin: -0.12,
        yMax: 1.28,
      },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      polygons: [
        barPolygon(4.4, 1, ratio(potentialEnergy, totalEnergy), "#2563eb", "rgba(37,99,235,0.2)"),
        barPolygon(5.9, 1, ratio(kineticEnergy, totalEnergy), "#f97316", "rgba(249,115,22,0.2)"),
        barPolygon(7.4, 1, 1, "#16a34a", "rgba(22,163,74,0.2)"),
      ],
      segments: [
        {
          from: { x: 1.5, y: 0 },
          to: { x: 1.5, y: 1 },
          color: "rgba(100,116,139,0.88)",
          lineWidth: 4,
        },
      ],
      points: [
        { x: 1.5, y: ratio(clampedHeight, h0), label: "当前位置", color: "#8b5cf6", radius: 6 },
      ],
      labels: [
        { x: 0.3, y: 1.05, text: `起点高度 ${formatNumber(h0)}`, color: "rgba(19,45,74,0.92)", dx: 0, dy: 0 },
        { x: 0.3, y: ratio(clampedHeight, h0), text: `h = ${formatNumber(clampedHeight)}`, color: "rgba(139,92,246,0.92)", dx: -4, dy: -8 },
        { x: 3.9, y: ratio(potentialEnergy, totalEnergy) + 0.06, text: `Ep ${formatNumber(potentialEnergy)}`, color: "rgba(37,99,235,0.92)", dx: 0, dy: 0 },
        { x: 5.35, y: ratio(kineticEnergy, totalEnergy) + 0.06, text: `Ek ${formatNumber(kineticEnergy)}`, color: "rgba(249,115,22,0.92)", dx: 0, dy: 0 },
        { x: 6.9, y: 1.06, text: `E总 ${formatNumber(totalEnergy)}`, color: "rgba(22,163,74,0.92)", dx: 0, dy: 0 },
      ],
    },
  };
}

export function buildWorkEnergySynthesisModel({ workByForce, frictionLoss, initialKinetic }) {
  const netWork = workByForce - frictionLoss;
  const finalKinetic = initialKinetic + netWork;
  const recommendedMethod = frictionLoss === 0 ? "机械能守恒优先" : "动能定理优先";
  const scale = Math.max(1, workByForce, frictionLoss, initialKinetic, finalKinetic);

  return {
    derived: {
      netWork: Number(formatNumber(netWork)),
      finalKinetic: Number(formatNumber(finalKinetic)),
      recommendedMethod,
      studentSummary: frictionLoss === 0
        ? "如果没有明显摩擦或非保守力耗散，机械能守恒通常更顺；一旦存在额外做功或损失，就更适合回到动能定理。"
        : "存在摩擦或额外耗散时，先算合外力总做功，再连到动能变化，往往比硬套守恒更稳。",
    },
    view: {
      viewport: {
        xMin: -0.5,
        xMax: 9.5,
        yMin: -0.12,
        yMax: 1.28,
      },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      polygons: [
        barPolygon(1.6, 1, ratio(workByForce, scale), "#2563eb", "rgba(37,99,235,0.2)"),
        barPolygon(3.3, 1, ratio(frictionLoss, scale), "#dc2626", "rgba(220,38,38,0.2)"),
        barPolygon(5, 1, ratio(initialKinetic, scale), "#8b5cf6", "rgba(139,92,246,0.2)"),
        barPolygon(6.7, 1, ratio(Math.max(0, finalKinetic), scale), "#16a34a", "rgba(22,163,74,0.2)"),
      ],
      labels: [
        { x: 1.1, y: ratio(workByForce, scale) + 0.06, text: `外力功 ${formatNumber(workByForce)}`, color: "rgba(37,99,235,0.92)", dx: 0, dy: 0 },
        { x: 2.75, y: ratio(frictionLoss, scale) + 0.06, text: `摩擦损失 ${formatNumber(frictionLoss)}`, color: "rgba(220,38,38,0.92)", dx: 0, dy: 0 },
        { x: 4.45, y: ratio(initialKinetic, scale) + 0.06, text: `初动能 ${formatNumber(initialKinetic)}`, color: "rgba(139,92,246,0.92)", dx: 0, dy: 0 },
        { x: 6.15, y: ratio(Math.max(0, finalKinetic), scale) + 0.06, text: `末动能 ${formatNumber(finalKinetic)}`, color: "rgba(22,163,74,0.92)", dx: 0, dy: 0 },
        { x: 0.6, y: 1.08, text: `推荐：${recommendedMethod}`, color: "rgba(19,45,74,0.92)", dx: 0, dy: 0 },
      ],
    },
  };
}
