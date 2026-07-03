import {
  buildPowerModel,
  buildTeachingItems,
  createFunctionExplanationCard,
} from "../shared/function-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildPowerModel(params, view.viewport);
    const { features } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildTeachingItems([
        {
          title: "指数类别",
          value: `p = ${params.exponent.toFixed(1)}`,
          badges: [features.symmetry],
          text: features.studentSummary,
        },
        {
          title: "定义域提醒",
          value: features.domainHint,
          badges: [features.graphHint],
          text: "看图像之前，先判断哪些 x 值可以代入。",
        },
      ]),
      explanationModel: [
        createFunctionExplanationCard(
          "当前函数",
          model.derived.equation,
          "幂函数最怕把所有指数一股脑混在一起，所以一定要先分类。",
          "分数指数时，负数部分通常先不要急着带进去。",
        ),
        createFunctionExplanationCard(
          "关键观察",
          features.symmetry,
          features.graphHint,
          features.domainHint,
          true,
        ),
      ],
      message: "先比较奇次、偶次和分数指数三类图像，不要一开始就盯细节。",
    };
  },
};
