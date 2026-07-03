import {
  buildConicTeachingItems,
  buildHyperbolaModel,
  createConicCard,
} from "../shared/conic-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildHyperbolaModel(params, view.viewport);
    const { features } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildConicTeachingItems([
        {
          title: "先抓方向",
          value: features.orientation === "horizontal" ? "实轴在 x 轴上" : "实轴在 y 轴上",
          badges: [`a = ${features.semiTransverseAxis}`, `b = ${features.semiConjugateAxis}`],
          text: "标准方程里，减号前面的那一项就对应双曲线开口的方向，这一步最关键。",
        },
        {
          title: "再看结构",
          value: `e = ${features.eccentricity.toFixed(2)}`,
          badges: features.asymptotes,
          text: "双曲线一定有两条渐近线，越远离中心，图像就会越贴近渐近线。",
        },
      ]),
      explanationModel: [
        createConicCard(
          "当前方程",
          model.derived.equation,
          "读双曲线方程时，第一眼先找减号在谁前面，这样开口方向立刻就定了。",
          "不要把椭圆的“两个加号”思维直接套到双曲线上。",
        ),
        createConicCard(
          "关键观察",
          features.orientation === "horizontal"
            ? `焦点在 x 轴上，F1(${features.focusLeft.x.toFixed(1)}, 0)，F2(${features.focusRight.x.toFixed(1)}, 0)`
            : `焦点在 y 轴上，F1(0, ${features.focusBottom.y.toFixed(1)})，F2(0, ${features.focusTop.y.toFixed(1)})`,
          `两条渐近线分别是 ${features.asymptotes[0]} 和 ${features.asymptotes[1]}，图像会越来越靠近它们。`,
          "孩子常见误区是只记焦点和顶点，不去看渐近线，所以一到图像判断题就容易乱。",
          true,
        ),
      ],
      message: "先抓住减号决定方向，再盯住渐近线和两个分支的相对位置。",
    };
  },
};
