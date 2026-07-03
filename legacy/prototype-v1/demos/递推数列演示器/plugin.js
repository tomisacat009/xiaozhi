import {
  buildRecursiveSequenceModel,
  buildSequenceTeachingItems,
  createSequenceCard,
} from "../shared/sequence-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildRecursiveSequenceModel(params);
    const { features, recursiveRule } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildSequenceTeachingItems([
        {
          title: "先抓规则",
          value: recursiveRule,
          badges: [`第 ${params.count} 项`, `${features.growthHint}`],
          text: "递推数列的重点不是直接看第 n 项，而是先看“前一项怎样推到后一项”。",
        },
        {
          title: "再看结果",
          value: `a${params.count} = ${features.lastTerm}`,
          badges: [`首项 ${params.a1}`, `乘数 ${params.factor.toFixed(1)}`, `常数 ${params.offset.toFixed(1)}`],
          text: "当乘数大于 1 时，后面往往容易越长越快；当乘数小于 1 时，增长节奏会明显放缓。",
        },
      ]),
      explanationModel: [
        createSequenceCard(
          "当前递推",
          model.derived.equation,
          "递推数列最适合用“生成过程”去理解，因为每一项都依赖上一项。",
          "不要把递推数列和等差等比数列完全割裂开，它们本质上都是按固定规则一项项生成。",
        ),
        createSequenceCard(
          "关键观察",
          features.growthHint,
          `从 a1 = ${params.a1} 开始，推到第 ${params.count} 项得到 ${features.lastTerm}。`,
          "孩子常见误区是只会机械代数值，却说不清这一串数为什么会越长越快或慢慢稳定。",
          true,
        ),
      ],
      message: "先看“前一项怎样推出后一项”，再看后面的点列变化，会更容易形成递推感觉。",
    };
  },
};
