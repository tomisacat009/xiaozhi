const CLASSIFICATION_SAMPLES = {
  "sodium-carbonate": {
    sampleLabel: "Na2CO3",
    classificationPath: ["纯净物", "化合物", "盐"],
    transformationHint: "盐可以和酸发生反应，重新回到“类别 + 转化”双视角理解。",
    note: "孩子容易把分类表当死记表格，其实每个类别都还连着典型转化。",
  },
  oxygen: {
    sampleLabel: "O2",
    classificationPath: ["纯净物", "单质", "非金属单质"],
    transformationHint: "单质常常是很多转化链的起点，适合和氧化还原一起联看。",
    note: "先知道对象是什么，再去谈它能怎么反应，会比直接背性质更稳。",
  },
  air: {
    sampleLabel: "空气",
    classificationPath: ["混合物", "均一混合物"],
    transformationHint: "混合物常常需要先分离、再谈其中某一种物质的性质。",
    note: "混合物和纯净物的区分，是化学语言起步最需要打牢的一层。",
  },
};

export function buildMaterialClassificationModel({ sampleId = "sodium-carbonate", viewMode = "tree" } = {}) {
  const sample = CLASSIFICATION_SAMPLES[sampleId] ?? CLASSIFICATION_SAMPLES["sodium-carbonate"];
  const baseX = [1.8, 4.6, 7.4, 10.2];
  const labels = [sample.sampleLabel, ...sample.classificationPath];

  return {
    derived: {
      sampleId,
      viewMode,
      sampleLabel: sample.sampleLabel,
      classificationPath: sample.classificationPath,
      transformationHint: sample.transformationHint,
      equation: `${sample.sampleLabel}：${sample.classificationPath.join(" -> ")}`,
      studentSummary: sample.note,
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: labels.map((label, index) => ({
        x: baseX[index],
        y: index === 0 ? 5.4 : 6.1,
        radius: 14,
        color: index === 0 ? "rgba(34, 197, 94, 0.84)" : "rgba(59, 130, 246, 0.84)",
        label,
      })),
      segments: [
        { from: { x: 2.6, y: 5.6 }, to: { x: 3.8, y: 5.9 }, color: "rgba(59,130,246,0.92)", lineWidth: 3, label: "分类 1" },
        { from: { x: 5.4, y: 6.1 }, to: { x: 6.6, y: 6.1 }, color: "rgba(59,130,246,0.92)", lineWidth: 3, label: "分类 2" },
        { from: { x: 8.2, y: 6.1 }, to: { x: 9.4, y: 6.1 }, color: "rgba(59,130,246,0.92)", lineWidth: 3, label: "分类 3" },
      ],
      labels: [
        { x: 1.1, y: 2.0, text: sample.transformationHint, color: "rgba(71, 85, 105, 0.92)" },
        { x: 1.1, y: 0.8, text: sample.note, color: "rgba(100, 116, 139, 0.92)" },
      ],
    },
  };
}
