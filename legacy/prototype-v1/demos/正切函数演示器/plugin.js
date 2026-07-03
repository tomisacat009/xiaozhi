import { createFunctionExplanationCard, buildTeachingItems } from "../shared/function-plugin-base.mjs";
import { buildTangentModel, formatPiText } from "../shared/trigonometry-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildTangentModel(params, view.viewport);
    const { features, asymptotes } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildTeachingItems([
        {
          title: "周期观察",
          value: `周期 ${features.period.toFixed(2)}`,
          badges: [`相位平移 ${formatPiText(features.phaseShift)}`],
          text: "ω 变大时，图像会更密；φ 改变时，整组分段会一起左右移动。",
        },
        {
          title: "渐近线提醒",
          value: `${asymptotes.length} 条可见渐近线`,
          badges: ["靠近时越来越陡"],
          text: "函数值会越来越大或越来越小，但不会真的碰到渐近线。",
        },
      ]),
      explanationModel: [
        createFunctionExplanationCard(
          "当前函数",
          model.derived.equation,
          "正切函数没有最大值和最小值，最重要的抓手是周期和渐近线。",
          "看到断开不要慌，这是函数本身就没有定义的地方。",
        ),
        createFunctionExplanationCard(
          "关键观察",
          `可见渐近线：${asymptotes.length} 条`,
          features.asymptoteHint,
          "渐近线不是图像的一部分，只是提醒你那里不能取值。",
          true,
        ),
      ],
      message: "先认渐近线，再看每一段曲线怎样上升。",
    };
  },
};
