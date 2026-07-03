function formatNumber(value, digits = 1) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value)
    .toFixed(digits)
    .replace(/\.0$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function buildViewport() {
  return {
    xMin: -1,
    xMax: 13,
    yMin: -1,
    yMax: 9,
  };
}

function particleLayout(count, yBase, spread, radius, color, labelPrefix) {
  return Array.from({ length: count }, (_, index) => {
    const column = index % 6;
    const row = Math.floor(index / 6);
    return {
      x: 2.4 + column * spread + (row % 2 === 0 ? 0 : spread * 0.35),
      y: yBase - row * 1.05,
      radius,
      color,
      label: index < 2 ? `${labelPrefix}${index + 1}` : undefined,
    };
  });
}

const DISPERSION_SCENES = {
  solution: {
    label: "溶液",
    particleScaleRange: "< 1 nm",
    particleRadius: 0.09,
    particleCount: 18,
    uniformity: "uniform",
    beamVisibility: "clear",
    settlingTrend: "none",
    canPassFilter: true,
    note: "粒子极小且均匀分散，光路通常看不出来。",
  },
  colloid: {
    label: "胶体",
    particleScaleRange: "1-100 nm",
    particleRadius: 0.16,
    particleCount: 18,
    uniformity: "semi-uniform",
    beamVisibility: "tyndall",
    settlingTrend: "weak",
    canPassFilter: true,
    note: "胶体粒子比真溶液大，能让光路被看见，这就是丁达尔效应。",
  },
  suspension: {
    label: "浊液",
    particleScaleRange: "> 100 nm",
    particleRadius: 0.26,
    particleCount: 12,
    uniformity: "non-uniform",
    beamVisibility: "blocked",
    settlingTrend: "obvious",
    canPassFilter: false,
    note: "粒子明显更大，静置后容易下沉，也更容易被过滤分离。",
  },
};

export function createChemistryTeachingItems(items) {
  return items.map((item) => ({
    title: item.title,
    value: item.value,
    badges: item.badges ?? [],
    text: item.text ?? "",
  }));
}

export function createChemistryCard(title, conclusion, observation, warning, highlight = false) {
  return {
    title,
    conclusion,
    observation,
    warning,
    highlight,
  };
}

export function buildDispersionColloidModel({ systemType = "colloid", beamOn = true } = {}) {
  const scene = DISPERSION_SCENES[systemType] ?? DISPERSION_SCENES.colloid;
  const points = particleLayout(
    scene.particleCount,
    systemType === "suspension" ? 5.8 : 6.3,
    systemType === "solution" ? 1.15 : 1.22,
    systemType === "solution" ? 4 : systemType === "colloid" ? 5.5 : 8,
    systemType === "solution" ? "rgba(39, 174, 96, 0.82)" : systemType === "colloid" ? "rgba(242, 153, 74, 0.82)" : "rgba(231, 111, 81, 0.82)",
    scene.label,
  );

  const beamColor = !beamOn
    ? "rgba(148, 163, 184, 0.35)"
    : scene.beamVisibility === "tyndall"
      ? "rgba(255, 214, 102, 0.95)"
      : scene.beamVisibility === "blocked"
        ? "rgba(255, 183, 77, 0.72)"
        : "rgba(255, 245, 200, 0.28)";

  const polygons = [
    {
      points: [
        { x: 1.5, y: 1 },
        { x: 11.2, y: 1 },
        { x: 11.2, y: 7.5 },
        { x: 1.5, y: 7.5 },
      ],
      color: "rgba(28, 126, 214, 0.42)",
      fillColor: "rgba(125, 211, 252, 0.14)",
      lineWidth: 2,
    },
  ];

  if (systemType === "suspension") {
    polygons.push({
      points: [
        { x: 1.8, y: 1.2 },
        { x: 10.9, y: 1.2 },
        { x: 10.1, y: 2.1 },
        { x: 2.6, y: 2.1 },
      ],
      color: "rgba(180, 83, 9, 0.2)",
      fillColor: "rgba(217, 119, 6, 0.22)",
      lineWidth: 1,
    });
  }

  const labels = [
    { x: 1.7, y: 8.2, text: `${scene.label} · 粒子尺度 ${scene.particleScaleRange}`, color: "rgba(15, 23, 42, 0.92)", dx: 0, dy: 0 },
    { x: 2, y: 0.3, text: scene.note, color: "rgba(71, 85, 105, 0.92)", dx: 0, dy: 0 },
  ];

  if (beamOn && scene.beamVisibility === "tyndall") {
    labels.push({ x: 8.9, y: 6.6, text: "丁达尔效应：光路可见", color: "rgba(202, 138, 4, 0.98)", dx: 0, dy: 0 });
  }
  if (beamOn && scene.beamVisibility === "blocked") {
    labels.push({ x: 8.6, y: 6.3, text: "粒子大，光束更易被散射/遮挡", color: "rgba(180, 83, 9, 0.98)", dx: 0, dy: 0 });
  }
  if (beamOn && scene.beamVisibility === "clear") {
    labels.push({ x: 8.9, y: 6.6, text: "光路基本看不出来", color: "rgba(100, 116, 139, 0.98)", dx: 0, dy: 0 });
  }

  return {
    derived: {
      systemType,
      systemLabel: scene.label,
      particleScaleRange: scene.particleScaleRange,
      particleCount: scene.particleCount,
      beamVisibility: scene.beamVisibility,
      uniformity: scene.uniformity,
      settlingTrend: scene.settlingTrend,
      canPassFilter: scene.canPassFilter,
      observationSummary: scene.note,
      equation: `${scene.label}：粒子尺度 ${scene.particleScaleRange}；${scene.canPassFilter ? "可通过普通滤纸" : "难通过普通滤纸"}`,
    },
    view: {
      viewport: buildViewport(),
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      polygons,
      points,
      segments: [
        {
          from: { x: 0.4, y: 6.6 },
          to: { x: 10.8, y: scene.beamVisibility === "blocked" ? 5.8 : 6.6 },
          color: beamColor,
          lineWidth: scene.beamVisibility === "clear" ? 5 : 8,
          label: beamOn ? "入射光束" : "光束关闭",
        },
      ],
      labels,
    },
  };
}
