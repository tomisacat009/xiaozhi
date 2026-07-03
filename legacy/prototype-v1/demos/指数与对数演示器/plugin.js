import {
  buildExpLogModel,
  buildTeachingItems,
  createFunctionExplanationCard,
} from "../shared/function-plugin-base.mjs";

function normalizeBase(base) {
  if (Math.abs(base - 1) < 0.05) return base > 1 ? 1.05 : 0.95;
  return base;
}

export const plugin = {
  build({ params, view }) {
    const safeBase = normalizeBase(params.base);
    const model = buildExpLogModel({ base: safeBase }, view.viewport);
    const { features } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildTeachingItems([
        {
          title: "先看底数",
          value: safeBase > 1 ? "a > 1" : "0 < a < 1",
          badges: [features.expTrend, features.logTrend],
          text: "底数在 1 的右边还是左边，直接决定指数和对数是增长还是衰减。",
        },
        {
          title: "互逆关系",
          value: features.inverseHint,
          badges: ["指数过 (0,1)", "对数过 (1,0)"],
          text: "交换横纵坐标以后，一条曲线上的点会落到另一条曲线上。",
        },
      ]),
      explanationModel: [
        createFunctionExplanationCard(
          "当前模型",
          `y = ${safeBase.toFixed(2)}^x 与 y = log_${safeBase.toFixed(2)} x`,
          "指数函数一定过 (0,1)，对数函数一定过 (1,0)。",
          "底数 a 不能等于 1，否则对数函数没有意义。",
        ),
        createFunctionExplanationCard(
          "关键趋势",
          `指数：${features.expTrend}，对数：${features.logTrend}`,
          "先判断底数，再判断增长还是衰减，会比死背性质轻松很多。",
          "指数函数和对数函数必须成对理解，不能拆开背。",
          true,
        ),
      ],
      message: "先盯住底数 a，再看指数和对数在同一张图里的对应关系。",
    };
  },
};
