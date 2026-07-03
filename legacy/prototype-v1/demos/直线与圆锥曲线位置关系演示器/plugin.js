import {
  buildConicLineRelationModel,
  buildConicTeachingItems,
  createConicCard,
} from "../shared/conic-plugin-base.mjs";

function familyLabel(family) {
  if (family === "ellipse") return "椭圆";
  if (family === "hyperbola") return "双曲线";
  return "抛物线";
}

export const plugin = {
  build({ params, view }) {
    const model = buildConicLineRelationModel(params, view.viewport);
    const { relationSummary, family, lineEquation } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildConicTeachingItems([
        {
          title: "先抓结果",
          value: relationSummary.relation,
          badges: [`公共点 ${relationSummary.intersectionCount} 个`, lineEquation],
          text: "位置关系题最值钱的第一步，是先数清公共点个数，而不是一上来就列方程。",
        },
        {
          title: "再看原因",
          value: familyLabel(family),
          badges: [relationSummary.compareHint],
          text: "同样是一条水平直线，换成不同圆锥曲线后，边界和内部的判定规则会不同。",
        },
      ]),
      explanationModel: [
        createConicCard(
          "当前判断",
          `${lineEquation} 与${familyLabel(family)}${relationSummary.relation}`,
          relationSummary.compareHint,
          "不要只背“相交相切相离”的名词，先让眼睛找到它到底碰到了几个公共点。",
        ),
        createConicCard(
          "关键观察",
          `当前共有 ${relationSummary.intersectionCount} 个公共点`,
          relationSummary.intersectionCount === 0
            ? "直线还在曲线外部。"
            : relationSummary.intersectionCount === 1
              ? "直线刚好碰到边界或顶点。"
              : "直线已经穿过曲线内部或切到两个分支。"
          ,
          "孩子常见误区是公式会算，但看图时不会先判断“外部/边界/内部”三种状态。",
          true,
        ),
      ],
      message: "先数公共点，再判断相离、相切还是相交，这样综合题会更稳。",
    };
  },
};
