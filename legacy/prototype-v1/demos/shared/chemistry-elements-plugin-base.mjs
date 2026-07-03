function point(label, x, y, color) {
  return { label, x, y, radius: 14, color };
}

const SODIUM_SCENES = {
  "sodium-water": {
    activeSubstance: "Na",
    product: "NaOH",
    phenomenonSummary: "浮在水面、熔成小球、四处游动，并放出 H2。",
    stepLabel: "与水反应",
    linkLabel: "生成 H2",
    note: "钠很活泼，和水反应时既有明显现象，也能顺着产物继续讲到碱性。",
  },
  "sodium-oxygen": {
    activeSubstance: "Na",
    product: "Na2O2",
    phenomenonSummary: "在空气或氧气中燃烧，生成淡黄色过氧化钠。",
    stepLabel: "燃烧",
    linkLabel: "O2 参与",
    note: "讲钠时不要把 Na2O 和 Na2O2 混成一个产物，要结合条件区分。",
  },
  "peroxide-carbon-dioxide": {
    activeSubstance: "Na2O2",
    product: "Na2CO3",
    phenomenonSummary: "过氧化钠吸收 CO2，并放出 O2，是呼吸面具相关题的核心链路。",
    stepLabel: "吸收 CO2",
    linkLabel: "放出 O2",
    note: "这个场景很适合把“性质、现象、用途”串成一条线。",
  },
};

const CHLORINE_SCENES = {
  "chlorine-hydrogen": {
    activeSubstance: "Cl2",
    keySpecies: ["Cl2", "HCl"],
    bleachingAgent: "无",
    phenomenonSummary: "点燃时与 H2 剧烈反应，生成 HCl 白雾。",
    note: "先把氯气的强氧化性和刺激性建立起来，再讲后续含氯物质。",
  },
  "chlorine-water": {
    activeSubstance: "Cl2",
    keySpecies: ["Cl2", "HCl", "HClO"],
    bleachingAgent: "HClO",
    phenomenonSummary: "氯气溶于水形成盐酸和次氯酸，真正起漂白和杀菌作用的是 HClO。",
    note: "漂白作用的主角不是 Cl2 本身，而是水中形成的 HClO。",
  },
  bleach: {
    activeSubstance: "NaClO",
    keySpecies: ["NaClO", "HClO"],
    bleachingAgent: "HClO",
    phenomenonSummary: "漂白液在酸性环境下更容易体现漂白性，但也伴随安全风险。",
    note: "把家庭漂白液和课堂上的 HClO 联系起来，孩子更容易真正理解用途来源。",
  },
};

const IRON_SCENES = {
  "ferrous-to-ferric": {
    activeSpecies: "Fe2+",
    targetSpecies: "Fe3+",
    colorHint: "Fe2+ 常见为浅绿色，Fe3+ 常见为黄色或棕黄色。",
    identificationHint: "Fe3+ 可用 KSCN 检验，出现血红色。",
    actionLabel: "氧化",
    note: "铁、亚铁、铁离子三者的变化链，最好和颜色与检验一起记。",
  },
  "ferric-to-ferrous": {
    activeSpecies: "Fe3+",
    targetSpecies: "Fe2+",
    colorHint: "Fe3+ 被还原后重新回到浅绿色亚铁状态。",
    identificationHint: "还原剂参与时，要盯住价态降低这条主线。",
    actionLabel: "还原",
    note: "铁离子题目常常不是孤立反应，而是来回切换价态的综合链。",
  },
  "iron-metal-to-ferrous": {
    activeSpecies: "Fe",
    targetSpecies: "Fe2+",
    colorHint: "金属铁与酸反应时常生成浅绿色亚铁盐溶液。",
    identificationHint: "先区分铁单质和离子，再去看后续价态变化。",
    actionLabel: "溶解成盐",
    note: "把铁单质也放进链条里，孩子更容易形成完整认知。",
  },
};

export function buildSodiumTransformationModel({ sceneId = "sodium-water" } = {}) {
  const scene = SODIUM_SCENES[sceneId] ?? SODIUM_SCENES["sodium-water"];
  const chainPoints = [
    point("Na", 1.8, 5.4, "rgba(234, 179, 8, 0.88)"),
    point("Na2O", 4.5, 6.2, "rgba(249, 115, 22, 0.84)"),
    point("Na2O2", 7.2, 6.2, "rgba(244, 114, 182, 0.84)"),
    point("NaOH", 10, 5.4, "rgba(59, 130, 246, 0.84)"),
  ];

  return {
    derived: {
      sceneId,
      activeSubstance: scene.activeSubstance,
      product: scene.product,
      phenomenonSummary: scene.phenomenonSummary,
      equation: `${scene.activeSubstance} -> ${scene.product}`,
      studentSummary: scene.note,
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: chainPoints,
      segments: [
        { from: { x: 2.6, y: 5.7 }, to: { x: 3.7, y: 6.0 }, color: "rgba(249,115,22,0.92)", lineWidth: 3, label: "O2" },
        { from: { x: 5.3, y: 6.2 }, to: { x: 6.4, y: 6.2 }, color: "rgba(244,114,182,0.92)", lineWidth: 3, label: "过量 O2" },
        { from: { x: 8.1, y: 6.0 }, to: { x: 9.1, y: 5.6 }, color: "rgba(59,130,246,0.92)", lineWidth: 3, label: scene.linkLabel },
      ],
      labels: [
        { x: 1, y: 7.2, text: `当前场景：${scene.stepLabel}`, color: "rgba(71, 85, 105, 0.96)" },
        { x: 1.1, y: 1.1, text: scene.phenomenonSummary, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

export function buildChlorineTransformationModel({ sceneId = "chlorine-water" } = {}) {
  const scene = CHLORINE_SCENES[sceneId] ?? CHLORINE_SCENES["chlorine-water"];
  return {
    derived: {
      sceneId,
      activeSubstance: scene.activeSubstance,
      keySpecies: scene.keySpecies,
      bleachingAgent: scene.bleachingAgent,
      phenomenonSummary: scene.phenomenonSummary,
      equation: scene.keySpecies.join(" -> "),
      studentSummary: scene.note,
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: [
        point(scene.keySpecies[0], 2.2, 5.6, "rgba(34, 197, 94, 0.84)"),
        point(scene.keySpecies[1] ?? "HCl", 6, 6.3, "rgba(249, 115, 22, 0.84)"),
        point(scene.keySpecies[2] ?? scene.bleachingAgent, 9.5, 5.6, "rgba(59, 130, 246, 0.84)"),
      ],
      segments: [
        { from: { x: 3.2, y: 5.8 }, to: { x: 5, y: 6.1 }, color: "rgba(249,115,22,0.92)", lineWidth: 3, label: "与 H2 / H2O 反应" },
        { from: { x: 6.9, y: 6.0 }, to: { x: 8.5, y: 5.8 }, color: "rgba(59,130,246,0.92)", lineWidth: 3, label: "形成漂白性物质" },
      ],
      labels: [
        { x: 1.1, y: 7.1, text: `漂白核心：${scene.bleachingAgent}`, color: "rgba(30,64,175,0.96)" },
        { x: 1.1, y: 1.0, text: scene.phenomenonSummary, color: "rgba(71, 85, 105, 0.92)" },
        { x: 7.8, y: 4.2, text: "漂白 / 杀菌", color: "rgba(29, 78, 216, 0.96)" },
      ],
    },
  };
}

export function buildIronTransformationModel({ sceneId = "ferrous-to-ferric" } = {}) {
  const scene = IRON_SCENES[sceneId] ?? IRON_SCENES["ferrous-to-ferric"];
  return {
    derived: {
      sceneId,
      activeSpecies: scene.activeSpecies,
      targetSpecies: scene.targetSpecies,
      colorHint: scene.colorHint,
      identificationHint: scene.identificationHint,
      equation: `${scene.activeSpecies} -> ${scene.targetSpecies}`,
      studentSummary: scene.note,
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: [
        point("Fe", 2.0, 5.6, "rgba(107, 114, 128, 0.84)"),
        point("Fe2+", 5.7, 5.6, "rgba(74, 222, 128, 0.84)"),
        point("Fe3+", 9.4, 5.6, "rgba(250, 204, 21, 0.84)"),
      ],
      segments: [
        { from: { x: 2.9, y: 5.6 }, to: { x: 4.8, y: 5.6 }, color: "rgba(74,222,128,0.92)", lineWidth: 3, label: "成亚铁" },
        { from: { x: 6.6, y: 5.6 }, to: { x: 8.5, y: 5.6 }, color: "rgba(250,204,21,0.92)", lineWidth: 3, label: scene.actionLabel },
      ],
      labels: [
        { x: 1.0, y: 7.0, text: scene.colorHint, color: "rgba(71, 85, 105, 0.96)" },
        { x: 1.0, y: 1.0, text: scene.identificationHint, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}
