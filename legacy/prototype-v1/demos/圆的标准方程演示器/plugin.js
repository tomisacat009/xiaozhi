import {
  buildCircleStandardModel,
  buildGeometryTeachingItems,
  createGeometryCard,
} from "../shared/analytic-geometry-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildCircleStandardModel(params);
    const { features, centerText } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildGeometryTeachingItems([
        {
          title: "先抓本质",
          value: "圆心 + 半径",
          badges: [`C${centerText}`, `r = ${features.radius}`],
          text: "看到标准方程时，先别急着化简，先把圆心和半径直接读出来。",
        },
        {
          title: "速读提示",
          value: `r² = ${features.radiusSquared}`,
          badges: ["整体平移", "整体放缩"],
          text: "方程右边的数不是半径本身，而是半径的平方。",
        },
      ]),
      explanationModel: [
        createGeometryCard(
          "当前方程",
          model.derived.equation,
          "先从圆心和半径去读方程，再回头看符号，不容易混淆。",
          "不要把括号里的正负号直接当成圆心坐标本身。",
        ),
        createGeometryCard(
          "关键观察",
          `圆心 C${centerText}，半径 r = ${features.radius}`,
          "圆心变了，整张图就是整体平移；半径变了，圆就整体变大或变小。",
          "孩子常见误区是把右边常数直接看成半径，记得提醒它对应的是 r²。",
          true,
        ),
      ],
      message: "先盯图上的圆心和半径，再看方程怎样跟着同步变化。",
    };
  },
};
