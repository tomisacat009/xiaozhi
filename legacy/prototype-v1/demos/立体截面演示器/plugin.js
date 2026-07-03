import {
  buildSolidSectionModel,
  buildSolidStudentSummary,
  buildSolidTeachingItems,
  createSolidCard,
} from "../shared/solid-geometry-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildSolidSectionModel(params);
    const { features, solidLabel } = model.derived;
    const studentSummary = buildSolidStudentSummary(features);

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildSolidTeachingItems([
        {
          title: "先抓规律",
          value: features.areaTrend === "保持不变" ? "柱体类截面大小保持不变" : "锥体类截面会逐渐缩小",
          badges: [features.shape, `面积 ${features.area.toFixed(2)}`, features.areaTrend],
          text: studentSummary,
        },
        {
          title: "速读提示",
          value: solidLabel,
          badges: [`截面位置 ${params.sliceRatio.toFixed(2)}`],
          text: "先看截面大小会不会变，再看截面形状是什么，孩子更容易建立空间直觉。",
        },
      ]),
      explanationModel: [
        createSolidCard(
          "当前截面",
          `${features.shape} · 面积 ${features.area.toFixed(2)}`,
          "这里先只看“平行于底面的截面”，先把最基础也最稳定的空间感觉建立起来。",
          "不要一上来就做复杂斜切，先把最基础的规律看熟。",
        ),
        createSolidCard(
          "关键性质",
          features.areaTrend,
          features.areaTrend === "保持不变"
            ? "这类几何体往上切，平行底面的截面大小不会变。"
            : "这类几何体往上切，平行底面的截面会逐渐缩小。",
          "柱体类和锥体类最核心的差别就在这里。",
        ),
        createSolidCard(
          "给孩子的解释",
          studentSummary,
          "建议先对比四棱柱和四棱锥，再对比圆柱和圆锥，孩子会更容易自己总结规律。",
          "如果只背结论，遇到变式题很容易又丢掉空间感觉。",
          true,
        ),
      ],
      message: "先切换几何体类型，再拖截面位置，会最容易看出“保持不变”和“逐渐缩小”的区别。",
    };
  },
};
