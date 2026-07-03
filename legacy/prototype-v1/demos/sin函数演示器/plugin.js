import { createFunctionExplanationCard, buildTeachingItems } from "../shared/function-plugin-base.mjs";
import { buildSineBasicModel, formatPiText } from "../shared/trigonometry-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildSineBasicModel(params, view.viewport);
    const { guide, point } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildTeachingItems([
        {
          title: "当前角度",
          value: formatPiText(params.angle),
          badges: [guide.quadrant, `符号：${guide.valueSign}`],
          text: guide.keyAngleLabel ? `这是关键角 ${guide.keyAngleLabel}，对应 ${guide.pointType}。` : "先看它落在哪个象限，再判断正弦值的符号。",
        },
      ]),
      explanationModel: [
        createFunctionExplanationCard(
          "当前函数",
          "y = sin(x)",
          `现在对应点大约是 (${point.x.toFixed(2)}, ${point.y.toFixed(2)})。`,
          "正弦值看的是纵坐标，不要和余弦函数的横坐标混在一起。",
        ),
        createFunctionExplanationCard(
          "关键观察",
          guide.pointType,
          guide.keyAngleLabel ? `当前靠近 ${guide.keyAngleLabel} 这个关键位置。` : `当前在${guide.quadrant}，正弦值符号是${guide.valueSign}。`,
          "先把五个关键位置记熟，细节会自然顺下来。",
          true,
        ),
      ],
      message: "先认关键角，再观察普通位置上的正弦值怎样连续变化。",
    };
  },
};
