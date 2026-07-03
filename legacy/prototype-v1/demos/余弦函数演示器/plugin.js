import { createFunctionExplanationCard, buildTeachingItems } from "../shared/function-plugin-base.mjs";
import { buildCosineBasicModel, formatPiText } from "../shared/trigonometry-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildCosineBasicModel(params, view.viewport);
    const { guide, point } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildTeachingItems([
        {
          title: "当前角度",
          value: formatPiText(params.angle),
          badges: [guide.quadrant, `符号：${guide.valueSign}`],
          text: guide.keyAngleLabel ? `这是关键角 ${guide.keyAngleLabel}，对应 ${guide.pointType}。` : "先看象限，再判断余弦值的正负。",
        },
      ]),
      explanationModel: [
        createFunctionExplanationCard(
          "当前函数",
          "y = cos(x)",
          `现在对应点大约是 (${point.x.toFixed(2)}, ${point.y.toFixed(2)})。`,
          "余弦函数和正弦函数的关键区别之一，是起点不同。",
        ),
        createFunctionExplanationCard(
          "关键观察",
          guide.pointType,
          guide.keyAngleLabel ? `当前靠近 ${guide.keyAngleLabel} 这个关键位置。` : `当前在${guide.quadrant}，余弦值符号是${guide.valueSign}。`,
          "记住 0、π/2、π、3π/2、2π 这五点，图像会立刻清晰很多。",
          true,
        ),
      ],
      message: "先认起点和关键角，再去看余弦曲线的整体波形。",
    };
  },
};
