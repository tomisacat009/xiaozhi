import {
  buildSequenceModel,
  buildSequenceStudentSummary,
  buildSequenceTeachingItems,
  createSequenceCard,
} from "../shared/sequence-plugin-base.mjs";

function primaryObservation(features) {
  if (features.geometricStyle === "倍增增长" && features.geometricLast > features.arithmeticLast) {
    return "等比数列在后面拉开得更快";
  }
  if (features.geometricStyle === "指数衰减") {
    return "等比数列在逐项缩小";
  }
  if (features.arithmeticStyle === "线性递减") {
    return "等差数列在稳定下降";
  }
  return "等差看固定差，等比看固定倍";
}

export const plugin = {
  build({ params }) {
    const model = buildSequenceModel(params);
    const { features, arithmeticFormula, geometricFormula } = model.derived;
    const studentSummary = buildSequenceStudentSummary(features);

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildSequenceTeachingItems([
        {
          title: "先抓差别",
          value: primaryObservation(features),
          badges: [
            `第 ${params.count} 项`,
            `等差 ${features.arithmeticLast.toFixed(1)}`,
            `等比 ${features.geometricLast.toFixed(1)}`,
          ],
          text: studentSummary,
        },
        {
          title: "速读提示",
          value: `d = ${params.d.toFixed(1)}，q = ${params.q.toFixed(1)}`,
          badges: [features.arithmeticStyle, features.geometricStyle],
          text: "等差重点看相邻两项的差是否固定，等比重点看相邻两项的倍数是否固定。",
        },
      ]),
      explanationModel: [
        createSequenceCard(
          "当前模型",
          arithmeticFormula,
          "等差数列是每一步加同样多，等比数列是每一步乘同样倍数。",
          "先别急着背公式，先看清“逐项怎么长出来”。",
        ),
        createSequenceCard(
          "对照公式",
          geometricFormula,
          `第 ${params.count} 项里，等差到 ${features.arithmeticLast.toFixed(2)}，等比到 ${features.geometricLast.toFixed(2)}。`,
          "如果公比小于 1，等比数列会衰减，不会一直变大。",
        ),
        createSequenceCard(
          "给孩子的解释",
          studentSummary,
          "建议先盯住后几项，因为线性增长和指数增长的差别通常会在后面更明显。",
          "孩子常见误区是把“固定差”和“固定倍”混成一件事，这里正好可以对照拆开。",
          true,
        ),
      ],
      message: "先固定首项和项数，再只改 d 或 q，会最容易看出两类数列的根本差别。",
    };
  },
};
