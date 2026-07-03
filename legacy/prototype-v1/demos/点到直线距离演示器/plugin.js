import {
  buildGeometryTeachingItems,
  buildPointLineDistanceModel,
  createGeometryCard,
} from "../shared/analytic-geometry-plugin-base.mjs";

function formatPointText(point) {
  return `(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`;
}

export const plugin = {
  build({ params, view }) {
    const model = buildPointLineDistanceModel(params, view.viewport);
    const { distanceResult, lineEquation } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildGeometryTeachingItems([
        {
          title: "先抓结论",
          value: "垂线段最短",
          badges: [`d = ${distanceResult.distance.toFixed(2)}`, "垂足 H"],
          text: "如果孩子先看懂图上的垂线段，公式反而更容易理解。",
        },
        {
          title: "速读提示",
          value: lineEquation,
          badges: [`P(${params.x0.toFixed(1)}, ${params.y0.toFixed(1)})`],
          text: "点怎么动、直线怎么转，最短线段的终点都会落在垂足上。",
        },
      ]),
      explanationModel: [
        createGeometryCard(
          "当前距离",
          distanceResult.distance.toFixed(2),
          distanceResult.shortestHint,
          "不是任意一条连线都最短，只有垂线段才对应点到直线的距离。",
        ),
        createGeometryCard(
          "关键观察",
          `垂足 H${formatPointText(distanceResult.foot)}`,
          "点移动时，垂足和最短线段都会跟着变化，但“垂直”这个性质不会变。",
          "如果孩子只会背公式，建议先让他只盯住 P 到 H 这条橙色线段。",
          true,
        ),
      ],
      message: "先看垂足怎么移动，再看距离数值怎样跟着变长或变短。",
    };
  },
};
