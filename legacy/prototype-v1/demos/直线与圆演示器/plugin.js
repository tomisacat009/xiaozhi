import {
  buildGeometryTeachingItems,
  buildLineCircleModel,
  buildLineCircleStudentSummary,
  createGeometryCard,
} from "../shared/analytic-geometry-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildLineCircleModel(params, view.viewport);
    const { relationSummary, circleEquation, lineEquation, circleFeatures } = model.derived;
    const studentSummary = buildLineCircleStudentSummary(relationSummary);

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildGeometryTeachingItems([
        {
          title: "先抓结论",
          value: relationSummary.relation,
          badges: [
            `d = ${relationSummary.distance.toFixed(2)}`,
            `r = ${circleFeatures.radius}`,
            `${relationSummary.intersectionCount} 个公共点`,
          ],
          text: studentSummary,
        },
        {
          title: "速读提示",
          value: lineEquation,
          badges: [circleEquation],
          text: "判断顺序最稳：先看圆心到直线的距离，再和半径比较，最后再回头看交点个数。",
        },
      ]),
      explanationModel: [
        createGeometryCard(
          "当前关系",
          relationSummary.relation,
          studentSummary,
          "不要一上来只盯判别式，把公式重新翻译成距离关系会更好懂。",
        ),
        createGeometryCard(
          "判定核心",
          relationSummary.compareHint,
          `当前有 ${relationSummary.intersectionCount} 个公共点，圆的方程是 ${circleEquation}。`,
          "相交、相切、相离本质上就是“距离”和“半径”的三种比较结果。",
          true,
        ),
      ],
      message: "先看圆心到直线的距离怎么变，再观察交点个数怎样跟着切换。",
    };
  },
};
