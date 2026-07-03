import {
  createChemistryCard,
  createChemistryTeachingItems,
} from "../shared/chemistry-language-plugin-base.mjs";
import { buildMoleRelationModel } from "../shared/chemistry-quantitative-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildMoleRelationModel(params);
    const {
      amount,
      mass,
      gasVolume,
      particleCountText,
      relationSummary,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: createChemistryTeachingItems([
        {
          title: "先抓中心量",
          value: `n = ${amount.toFixed(2)} mol`,
          badges: ["桥梁量"],
          text: "物质的量不是单独多出来的新量，而是连接微观与宏观的统一桥梁。",
        },
        {
          title: "再看三条路",
          value: `m=${mass.toFixed(2)} g`,
          badges: [`V=${gasVolume.toFixed(2)} L`, `N=${particleCountText}`],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createChemistryCard(
          "当前模型",
          relationSummary,
          "质量、微粒数、气体体积看起来在做三套不同题，其实都绕不开中间的 n。",
          "别把每一种换算都背成独立公式，要看出它们都在围绕同一个中心量展开。",
        ),
        createChemistryCard(
          "图像怎么读",
          `m = ${mass.toFixed(2)} g；V = ${gasVolume.toFixed(2)} L；N = ${particleCountText}`,
          "三条箭头分别提示乘以摩尔质量、阿伏加德罗常数和气体摩尔体积，帮助孩子建立“从 n 出发”的统一视角。",
          "22.4 L/mol 只对应标准状况，教学时要顺带提醒条件意识。",
          true,
        ),
        createChemistryCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定一种物质，只改 n；再固定 n，切换 M 或 Vm，更容易看出哪些量是对象属性，哪些量是题目状态。",
          "一旦孩子把“对象属性”和“过程条件”混在一起，换算题就会越做越乱。",
        ),
      ],
      message: "先把 n 看成化学里的“中转站”，换算链就能一口气讲顺。",
    };
  },
};
