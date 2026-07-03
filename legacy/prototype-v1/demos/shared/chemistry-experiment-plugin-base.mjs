const ION_SCENES = {
  chloride: {
    reagent: "AgNO3",
    auxiliary: "稀硝酸",
    observation: "出现白色沉淀，且加稀硝酸后现象仍可保留。",
    conclusion: "原溶液中含有 Cl-。",
    interferenceTip: "先酸化是为了排除 CO3^2- 等也会和 Ag+ 形成沉淀的干扰。",
  },
  sulfate: {
    reagent: "BaCl2",
    auxiliary: "稀盐酸",
    observation: "出现白色沉淀，且加酸后不消失。",
    conclusion: "原溶液中含有 SO4^2-。",
    interferenceTip: "要注意先排除 CO3^2-、SO3^2- 这类也能与 Ba2+ 形成沉淀的离子。",
  },
  ammonium: {
    reagent: "NaOH",
    auxiliary: "加热",
    observation: "产生刺激性气味气体，可使湿润红色石蕊试纸变蓝。",
    conclusion: "原溶液中含有 NH4+。",
    interferenceTip: "氨气检验一定要把“加碱”和“加热”条件说全。",
  },
};

const LAB_SCENES = {
  "gas-preparation": {
    coreDevice: "发生装置",
    sequence: ["组装", "检漏", "加药品", "收集", "验满"],
    riskTip: "先检漏再加药品，否则后面的现象判断都会失真。",
    note: "气体制备题最怕只认图形，不知道每一步为什么排在那个位置。",
  },
  filtration: {
    coreDevice: "过滤装置",
    sequence: ["折滤纸", "贴壁倾倒", "引流", "保留残渣/滤液"],
    riskTip: "液面不能高于滤纸边缘，否则会影响过滤效果。",
    note: "过滤看起来简单，但顺序和细节经常决定是否成功。",
  },
  titration: {
    coreDevice: "滴定装置",
    sequence: ["查零点", "装液", "读数", "滴定", "终点判断"],
    riskTip: "读数和终点判断都容易出误差，必须和装置功能一起看。",
    note: "滴定题本质上是“装置职责 + 步骤顺序 + 误差来源”的综合题。",
  },
};

export function buildIonIdentificationModel({ ionId = "chloride", strictMode = true } = {}) {
  const scene = ION_SCENES[ionId] ?? ION_SCENES.chloride;

  return {
    derived: {
      ionId,
      reagent: scene.reagent,
      auxiliary: scene.auxiliary,
      observation: scene.observation,
      conclusion: scene.conclusion,
      interferenceTip: strictMode ? scene.interferenceTip : "先看现象，再补条件排除。",
      equation: `${scene.reagent} + 待测液 -> 观察现象 -> 得出结论`,
      studentSummary: "离子检验不是背答案，而是沿着“试剂-现象-排除-结论”的链路做判断。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: [
        { x: 2, y: 5.8, radius: 14, color: "rgba(59, 130, 246, 0.84)", label: `试剂 ${scene.reagent}` },
        { x: 6, y: 5.8, radius: 14, color: "rgba(249, 115, 22, 0.84)", label: "观察现象" },
        { x: 10, y: 5.8, radius: 14, color: "rgba(34, 197, 94, 0.84)", label: "得出结论" },
      ],
      segments: [
        { from: { x: 3, y: 5.8 }, to: { x: 5, y: 5.8 }, color: "rgba(59,130,246,0.92)", lineWidth: 3, label: "步骤 1" },
        { from: { x: 7, y: 5.8 }, to: { x: 9, y: 5.8 }, color: "rgba(34,197,94,0.92)", lineWidth: 3, label: "步骤 2" },
      ],
      labels: [
        { x: 1.2, y: 7.1, text: `辅助条件：${scene.auxiliary}`, color: "rgba(71, 85, 105, 0.96)" },
        { x: 4.2, y: 3.8, text: scene.observation, color: "rgba(194, 65, 12, 0.96)" },
        { x: 8.2, y: 3.1, text: scene.conclusion, color: "rgba(22, 101, 52, 0.96)" },
        { x: 1.1, y: 1.0, text: strictMode ? scene.interferenceTip : "当前为简化模式，适合先熟悉主判断链。", color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

export function buildLabDeviceWorkflowModel({ sceneId = "gas-preparation", strictMode = true } = {}) {
  const scene = LAB_SCENES[sceneId] ?? LAB_SCENES["gas-preparation"];
  const points = scene.sequence.map((label, index) => ({
    x: 1.6 + index * 2.0,
    y: 5.5 - (index % 2) * 0.7,
    radius: 13,
    color: index === 0 ? "rgba(59, 130, 246, 0.84)" : "rgba(34, 197, 94, 0.84)",
    label,
  }));

  return {
    derived: {
      sceneId,
      coreDevice: scene.coreDevice,
      sequence: scene.sequence,
      riskTip: scene.riskTip,
      equation: `${scene.coreDevice}：${scene.sequence.join(" -> ")}`,
      studentSummary: strictMode ? scene.note : "先熟悉装置分工，再回到完整步骤链。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points,
      segments: scene.sequence.slice(0, -1).map((_, index) => ({
        from: { x: 2.2 + index * 2.0, y: 5.3 - (index % 2) * 0.35 },
        to: { x: 3.0 + index * 2.0, y: 5.3 - ((index + 1) % 2) * 0.35 },
        color: "rgba(59,130,246,0.92)",
        lineWidth: 3,
        label: `步骤 ${index + 1}`,
      })),
      labels: [
        { x: 1.0, y: 7.0, text: `核心装置：${scene.coreDevice}`, color: "rgba(71, 85, 105, 0.96)" },
        { x: 1.0, y: 1.0, text: strictMode ? scene.riskTip : "当前为简化模式，先熟悉装置与步骤对应。", color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}
