function formatNumber(value, digits = 1) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value)
    .toFixed(digits)
    .replace(/\.0$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function chipPoints(labels, x, y, color) {
  return labels.map((label, index) => ({
    x: x + (index % 2) * 1.2,
    y: y - Math.floor(index / 2) * 1.2,
    radius: 12,
    color,
    label,
  }));
}

const IONIC_SCENES = {
  "barium-sulfate": {
    label: "BaCl2 + Na2SO4",
    resultType: "precipitate",
    reactingIons: ["Ba2+", "SO4^2-"],
    spectatorIons: ["Na+", "Cl-"],
    products: ["BaSO4↓"],
    note: "真正结合并离开溶液的是 Ba2+ 和 SO4^2-，旁观离子继续留在溶液里。",
  },
  "acid-base": {
    label: "HCl + NaOH",
    resultType: "water",
    reactingIons: ["H+", "OH-"],
    spectatorIons: ["Na+", "Cl-"],
    products: ["H2O"],
    note: "酸碱中和的实质是 H+ 与 OH- 结合成水，Na+、Cl- 只是留在旁边。",
  },
  "carbonate-acid": {
    label: "Na2CO3 + HCl",
    resultType: "gas",
    reactingIons: ["2H+", "CO3^2-"],
    spectatorIons: ["Na+", "Cl-"],
    products: ["CO2↑", "H2O"],
    note: "碳酸根遇到酸会先生成不稳定的 H2CO3，再分解成 CO2 和 H2O。",
  },
};

const REDOX_SCENES = {
  "iron-oxidation": {
    label: "2Fe2+ + Cl2 -> 2Fe3+ + 2Cl-",
    oxidizedSpecies: "Fe2+",
    reducedSpecies: "Cl2",
    electronTransferCount: 2,
    oxidationNumberChanges: ["Fe: +2 -> +3", "Cl: 0 -> -1"],
    oxidizingAgent: "Cl2",
    reducingAgent: "Fe2+",
    note: "Fe2+ 失电子被氧化，Cl2 得电子被还原，两边电子总数守恒。",
  },
  "copper-hydrogen": {
    label: "CuO + H2 -> Cu + H2O",
    oxidizedSpecies: "H2",
    reducedSpecies: "CuO",
    electronTransferCount: 2,
    oxidationNumberChanges: ["H: 0 -> +1", "Cu: +2 -> 0"],
    oxidizingAgent: "CuO",
    reducingAgent: "H2",
    note: "氢气失电子，氧化铜里的铜得电子，适合帮助孩子看“谁得氧/失氧”与电子转移的统一。",
  },
};

export function buildIonicReactionModel({ sceneId = "barium-sulfate", beamOn = true } = {}) {
  const scene = IONIC_SCENES[sceneId] ?? IONIC_SCENES["barium-sulfate"];
  const leftPoints = chipPoints(scene.reactingIons, 1.8, 6.3, "rgba(59, 130, 246, 0.84)");
  const rightPoints = chipPoints(scene.spectatorIons, 8.5, 6.3, "rgba(148, 163, 184, 0.84)");
  const productPoints = chipPoints(scene.products, 5.2, scene.resultType === "precipitate" ? 2.4 : 4.2, "rgba(249, 115, 22, 0.88)");

  return {
    derived: {
      sceneId,
      equation: `${scene.label}；离子实质：${scene.reactingIons.join(" + ")} -> ${scene.products.join(" + ")}`,
      resultType: scene.resultType,
      reactingIons: scene.reactingIons,
      spectatorIons: scene.spectatorIons,
      netIonicEquation: `${scene.reactingIons.join(" + ")} -> ${scene.products.join(" + ")}`,
      studentSummary: scene.note,
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      polygons: [
        {
          points: [
            { x: 0.8, y: 4.8 },
            { x: 4.6, y: 4.8 },
            { x: 4.6, y: 7.2 },
            { x: 0.8, y: 7.2 },
          ],
          color: "rgba(59,130,246,0.36)",
          fillColor: "rgba(59,130,246,0.12)",
          lineWidth: 2,
        },
        {
          points: [
            { x: 7.7, y: 4.8 },
            { x: 11.2, y: 4.8 },
            { x: 11.2, y: 7.2 },
            { x: 7.7, y: 7.2 },
          ],
          color: "rgba(148,163,184,0.36)",
          fillColor: "rgba(148,163,184,0.12)",
          lineWidth: 2,
        },
      ],
      points: [...leftPoints, ...rightPoints, ...productPoints],
      segments: [
        {
          from: { x: 4.9, y: 6 },
          to: { x: 7.2, y: 6 },
          color: beamOn ? "rgba(14, 165, 233, 0.88)" : "rgba(148, 163, 184, 0.5)",
          lineWidth: 4,
          label: "混合",
        },
      ],
      labels: [
        { x: 1.1, y: 7.6, text: "参与反应的离子", color: "rgba(30, 64, 175, 0.95)" },
        { x: 8, y: 7.6, text: "旁观离子", color: "rgba(71, 85, 105, 0.95)" },
        { x: 4.2, y: scene.resultType === "precipitate" ? 1.1 : 3.1, text: `生成结果：${scene.products.join(" + ")}`, color: "rgba(194, 65, 12, 0.95)" },
        { x: 0.9, y: 0.5, text: scene.note, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

export function buildRedoxModel({ reactionId = "iron-oxidation", electronView = "balanced" } = {}) {
  const scene = REDOX_SCENES[reactionId] ?? REDOX_SCENES["iron-oxidation"];
  const electronLabel = electronView === "step"
    ? `分步转移 ${scene.electronTransferCount}e-`
    : `总转移 ${scene.electronTransferCount}e-`;

  return {
    derived: {
      reactionId,
      equation: scene.label,
      oxidizedSpecies: scene.oxidizedSpecies,
      reducedSpecies: scene.reducedSpecies,
      electronTransferCount: scene.electronTransferCount,
      oxidationNumberChanges: scene.oxidationNumberChanges,
      oxidizingAgent: scene.oxidizingAgent,
      reducingAgent: scene.reducingAgent,
      studentSummary: scene.note,
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      polygons: [
        {
          points: [
            { x: 1.1, y: 4.6 },
            { x: 4.4, y: 4.6 },
            { x: 4.4, y: 6.9 },
            { x: 1.1, y: 6.9 },
          ],
          color: "rgba(220, 38, 38, 0.35)",
          fillColor: "rgba(254, 202, 202, 0.2)",
          lineWidth: 2,
        },
        {
          points: [
            { x: 7.2, y: 4.6 },
            { x: 10.6, y: 4.6 },
            { x: 10.6, y: 6.9 },
            { x: 7.2, y: 6.9 },
          ],
          color: "rgba(37, 99, 235, 0.35)",
          fillColor: "rgba(191, 219, 254, 0.2)",
          lineWidth: 2,
        },
      ],
      points: [
        { x: 2.7, y: 5.8, radius: 15, color: "rgba(239, 68, 68, 0.84)", label: scene.oxidizedSpecies },
        { x: 8.9, y: 5.8, radius: 15, color: "rgba(59, 130, 246, 0.84)", label: scene.reducedSpecies },
      ],
      segments: [
        {
          from: { x: 3.8, y: 5.8 },
          to: { x: 7.2, y: 5.8 },
          color: "rgba(234, 179, 8, 0.92)",
          lineWidth: 4,
          label: electronLabel,
        },
      ],
      labels: [
        { x: 1.2, y: 7.4, text: `被氧化：${scene.oxidizedSpecies}`, color: "rgba(153, 27, 27, 0.96)" },
        { x: 7.2, y: 7.4, text: `被还原：${scene.reducedSpecies}`, color: "rgba(30, 64, 175, 0.96)" },
        { x: 1.2, y: 3.4, text: `化合价变化：${scene.oxidationNumberChanges[0]}`, color: "rgba(127, 29, 29, 0.92)" },
        { x: 7.2, y: 3.4, text: `化合价变化：${scene.oxidationNumberChanges[1]}`, color: "rgba(30, 64, 175, 0.92)" },
        { x: 1.1, y: 0.8, text: scene.note, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}
