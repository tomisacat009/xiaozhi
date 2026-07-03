import {
  buildConicTeachingItems,
  buildParabolaModel,
  createConicCard,
} from "../shared/conic-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildParabolaModel(params, view.viewport);
    const { features } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildConicTeachingItems([
        {
          title: "先抓读法",
          value: features.directionLabel,
          badges: [features.axis, features.directrix],
          text: "先看谁平方，再判断是沿 x 轴方向开口还是沿 y 轴方向开口。",
        },
        {
          title: "关键要素",
          value: `F(${features.focus.x.toFixed(1)}, ${features.focus.y.toFixed(1)})`,
          badges: ["顶点在原点", `a = ${params.a.toFixed(1)}`],
          text: "参数 a 决定焦点和准线离顶点的距离，所以 a 一变，图像张口程度也会一起变。",
        },
      ]),
      explanationModel: [
        createConicCard(
          "当前方程",
          model.derived.equation,
          "抛物线最值钱的一步，是把“标准方程里的字母位置”立刻翻译成开口方向。",
          "不要把 x² = 4ay 和 y² = 4ax 的方向判断弄反。",
        ),
        createConicCard(
          "关键观察",
          `焦点 F(${features.focus.x.toFixed(1)}, ${features.focus.y.toFixed(1)})，准线 ${features.directrix}`,
          "焦点在开口这一侧，准线在另一侧；顶点刚好夹在中间，这是最该形成的图像感觉。",
          "只背焦点公式但不盯图，会导致遇到方向切换时马上出错。",
          true,
        ),
      ],
      message: "先看开口方向，再盯焦点和准线，不要只盯方程符号。",
    };
  },
};
