import {
  buildDispersionColloidModel,
  createChemistryCard,
  createChemistryTeachingItems,
} from "../shared/chemistry-language-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildDispersionColloidModel(params);
    const {
      systemLabel,
      particleScaleRange,
      beamVisibility,
      canPassFilter,
      settlingTrend,
      observationSummary,
    } = model.derived;

    const beamTextMap = {
      clear: "光路不明显",
      tyndall: "出现丁达尔效应",
      blocked: "光束被强烈散射/遮挡",
    };

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: createChemistryTeachingItems([
        {
          title: "先看粒子尺度",
          value: particleScaleRange,
          badges: [systemLabel],
          text: "从真溶液到浊液，最核心的主线不是名称，而是分散质粒子的尺度逐步变大。",
        },
        {
          title: "再看光路",
          value: beamTextMap[beamVisibility],
          badges: [canPassFilter ? "可过滤纸" : "难过滤纸", `沉降 ${settlingTrend}`],
          text: observationSummary,
        },
      ]),
      explanationModel: [
        createChemistryCard(
          "当前体系",
          `${systemLabel} · 粒子尺度 ${particleScaleRange}`,
          "把宏观现象还原成粒子大小差异，孩子就不会把“溶了没有”当成唯一判断标准。",
          "胶体和浊液都不是“真溶液”，但它们的粒子尺度和稳定性并不一样。",
        ),
        createChemistryCard(
          "图像怎么读",
          beamTextMap[beamVisibility],
          "有光束时，胶体最适合演示丁达尔效应；浊液更适合说明沉降和过滤；真溶液则适合作为对照组。",
          "别把“光路可见”机械记成胶体定义，要回到粒子对光的散射这层原因。",
          true,
        ),
        createChemistryCard(
          "给孩子的解释",
          observationSummary,
          "建议先让孩子只比较三件事：粒子大小、是否容易沉降、光路是否明显，知识结构会更稳。",
          "如果只背结论而不做三者联动，对胶体题和实验题都容易混淆。",
        ),
      ],
      message: "先比较三类体系，再开关光束，孩子会更容易自己说出“为什么胶体能看到光路”。",
    };
  },
};
