import {
  buildConicOverviewModel,
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
    const model = buildConicOverviewModel(params, view.viewport);
    const { comparison, family, title } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildConicTeachingItems([
        {
          title: "当前类型",
          value: title,
          badges: [comparison.equationRule],
          text: "先不急着算，先判断这是抛物线、椭圆还是双曲线，后面的性质才不会串。",
        },
        {
          title: "最该比较",
          value: comparison.focusRule,
          badges: [comparison.closureRule],
          text: "圆锥曲线复习最容易乱的，是三类曲线的焦点数量、闭合性和图像结构混在一起。",
        },
      ]),
      explanationModel: [
        createConicCard(
          "当前家族",
          familyLabel(family),
          comparison.equationRule,
          "不要一看到平方项就机械套公式，先问自己：是相加还是相减，还是只有一个平方项。",
        ),
        createConicCard(
          "统一比较",
          comparison.focusRule,
          comparison.closureRule,
          "如果孩子做题时总把椭圆和双曲线搞混，先让他只盯“闭合/不闭合”和“有没有渐近线”这两件事。",
          true,
        ),
      ],
      message: "先在三类曲线之间切换，形成一眼辨认它们的整体感觉。",
    };
  },
};
