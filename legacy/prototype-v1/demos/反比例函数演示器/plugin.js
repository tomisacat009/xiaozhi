import {
  buildReciprocalModel,
  buildTeachingItems,
  createFunctionExplanationCard,
} from "../shared/function-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildReciprocalModel(params, view.viewport);
    const { features } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildTeachingItems([
        {
          title: "先抓象限",
          value: features.branchHint,
          badges: features.asymptotes,
          text: "先由 k 的正负判断图像在哪两个象限，这一步最值钱。",
        },
        {
          title: "再看变化",
          value: `k = ${params.k.toFixed(1)}`,
          badges: ["关于原点对称", "双曲线"],
          text: "|k| 变大时，曲线整体会离坐标轴更远；|k| 变小时，会更贴近坐标轴。",
        },
      ]),
      explanationModel: [
        createFunctionExplanationCard(
          "当前函数",
          model.derived.equation,
          "反比例函数最怕只背公式，不去看图像的两个分支究竟落在哪里。",
          "不要把它和一次函数那种“整条连续曲线”混在一起。",
        ),
        createFunctionExplanationCard(
          "关键观察",
          `${features.branchHint}，渐近线是 x = 0 和 y = 0`,
          "越靠近坐标轴，函数值变化越快；但图像不会真正碰到这两条坐标轴。",
          "看到 x = 0 时要立刻想到“这里不能取值”，不要把坐标轴当成普通交点。",
          true,
        ),
      ],
      message: "先看双曲线落在哪两个象限，再看 k 的大小怎样影响开口远近。",
    };
  },
};
