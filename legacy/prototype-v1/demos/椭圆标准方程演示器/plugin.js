import {
  buildConicTeachingItems,
  buildEllipseModel,
  createConicCard,
} from "../shared/conic-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildEllipseModel(params);
    const { features } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildConicTeachingItems([
        {
          title: "先抓结构",
          value: features.orientation === "horizontal" ? "长轴在 x 轴上" : "长轴在 y 轴上",
          badges: [`a = ${features.semiMajorAxis}`, `b = ${features.semiMinorAxis}`],
          text: "标准方程里，分母更大的那一项，对应的就是长轴方向。",
        },
        {
          title: "再看焦点",
          value: `e = ${features.eccentricity.toFixed(2)}`,
          badges: ["F1、F2", "中心在原点"],
          text: "a 和 b 越接近，离心率越小，图像就越接近圆；差距越大，椭圆就越扁。",
        },
      ]),
      explanationModel: [
        createConicCard(
          "当前方程",
          model.derived.equation,
          "读椭圆方程时，第一眼先别算，先找哪一个分母更大，这样长轴方向立刻就定了。",
          "不要把 a 和 b 机械记成“前面那个、后面那个”，要记成“长轴对应 a”。",
        ),
        createConicCard(
          "关键观察",
          features.orientation === "horizontal"
            ? `焦点在 x 轴上，F1(${features.focusLeft.x.toFixed(1)}, 0)，F2(${features.focusRight.x.toFixed(1)}, 0)`
            : `焦点在 y 轴上，F1(0, ${features.focusBottom.y.toFixed(1)})，F2(0, ${features.focusTop.y.toFixed(1)})`,
          "图像越扁，两个焦点离中心越远；图像越圆，两个焦点越往中间收。",
          "孩子常见误区是只会套 c² = a² - b²，却不理解焦点为什么会移动。",
          true,
        ),
      ],
      message: "先看长轴方向，再看 a、b 变化怎样带动焦点和离心率一起变化。",
    };
  },
};
