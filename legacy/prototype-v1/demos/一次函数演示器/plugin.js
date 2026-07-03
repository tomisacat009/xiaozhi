import {
  buildLinearModel,
  buildTeachingItems,
  createFunctionExplanationCard,
} from "../shared/function-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildLinearModel(params, view.viewport);
    const { features, notes } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildTeachingItems([
        {
          title: "先抓结论",
          value: notes.relationType,
          badges: notes.specialCases,
          text: notes.studentSummary,
        },
        {
          title: "趋势判断",
          value: features.trend,
          badges: [features.steepness],
          text: "先看斜率的正负，再看它的绝对值大小。",
        },
      ]),
      explanationModel: [
        createFunctionExplanationCard(
          "当前函数",
          model.derived.equation,
          "一次函数最值得先盯住两个参数：斜率 k 和截距 b。",
          "不要把截距变化误看成斜率变化。",
        ),
        createFunctionExplanationCard(
          "关键性质",
          `变化趋势：${features.trend}，y 轴交点：${features.yIntercept.toFixed(2)}`,
          "k 决定直线的方向和陡缓，b 决定和 y 轴相交的位置。",
          "当 k = 0 时，它不再倾斜，而是一条水平线。",
          true,
        ),
      ],
      message: "拖动 k 和 b，观察直线的倾斜方向与上下平移。",
    };
  },
};
