import {
  buildSolidRotationModel,
  buildSolidTeachingItems,
  createSolidCard,
} from "../shared/solid-geometry-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildSolidRotationModel(params);
    const { features, solidName } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildSolidTeachingItems([
        {
          title: "先抓对应",
          value: `${solidName}`,
          badges: [`半径 ${features.radius}`, `高 ${features.height}`],
          text: "立体几何里很多旋转体题，本质上都是先认出“平面图形绕轴旋转以后会变成什么”。",
        },
        {
          title: "再看规律",
          value: features.summary,
          badges: ["旋转轴", "生成立体"],
          text: "先让孩子说清楚“谁在转、绕哪条边转、转完得到什么”，空间感觉会更稳。",
        },
      ]),
      explanationModel: [
        createSolidCard(
          "当前旋转体",
          `${solidName}`,
          features.summary,
          "不要只背结论，最好把平面图形和旋转轴一起看，否则很容易忘。",
        ),
        createSolidCard(
          "关键观察",
          `平面图形一转，生成 ${solidName}`,
          "从二维图形到三维立体的过渡，是立体几何里特别值得用图像建立直觉的一步。",
          "孩子常见误区是把圆柱、圆锥、球的来源分开硬记，没有把它们都看成“旋转生成”的结果。",
          true,
        ),
      ],
      message: "先说清楚“哪一个平面图形绕哪条轴转”，再看它生成的立体。",
    };
  },
};
