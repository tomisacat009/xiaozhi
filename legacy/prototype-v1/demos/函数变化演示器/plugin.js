import {
  buildQuadraticModel,
  buildTeachingItems,
  createFunctionExplanationCard,
} from "../shared/function-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildQuadraticModel(params, view.viewport);
    const { vertex, axisX, direction } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildTeachingItems([
        {
          title: "先抓结论",
          value: direction,
          badges: [`对称轴 x = ${axisX.toFixed(2)}`],
          text: "对抛物线来说，先看开口方向，再找顶点位置。",
        },
        {
          title: "顶点位置",
          value: `(${vertex.x.toFixed(2)}, ${vertex.y.toFixed(2)})`,
          badges: ["抛物线最低点或最高点"],
          text: "顶点决定了抛物线整体停在什么位置。",
        },
      ]),
      explanationModel: [
        createFunctionExplanationCard(
          "当前函数",
          model.derived.equation,
          "a 决定开口方向和宽窄，b 和 c 会继续影响位置。",
          "不要只看 c，真正决定对称轴的是 a 和 b。",
        ),
        createFunctionExplanationCard(
          "关键观察",
          `顶点在 (${vertex.x.toFixed(2)}, ${vertex.y.toFixed(2)})`,
          `现在抛物线${direction}，对称轴是 x = ${axisX.toFixed(2)}。`,
          "对称轴左右两边的图像一定成镜面对称。",
          true,
        ),
      ],
      message: "拖动 a、b、c，观察开口、顶点和对称轴是怎样一起变化的。",
    };
  },
};
