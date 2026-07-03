import {
  buildFreeFallModel,
  buildPhysicsMotionTeachingItems,
  createPhysicsMotionCard,
} from "../shared/physics-motion-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildFreeFallModel(params);
    const {
      velocityEquation,
      currentVelocity,
      currentTime,
      displacement,
      currentHeight,
      gravity,
      studentSummary,
    } = model.derived;

    return {
      derived: {
        ...model.derived,
        equation: velocityEquation,
      },
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildPhysicsMotionTeachingItems([
        {
          title: "先看斜率",
          value: `g = ${gravity.toFixed(1)}`,
          badges: [`t = ${currentTime.toFixed(1)}`, `v = ${currentVelocity.toFixed(2)}`],
          text: "自由落体的 v-t 图像是一条过原点的直线，斜率就是重力加速度。",
        },
        {
          title: "再看位移",
          value: `下落 ${displacement.toFixed(2)}`,
          badges: [`剩余高度 ${currentHeight.toFixed(2)}`],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createPhysicsMotionCard(
          "当前模型",
          velocityEquation,
          "自由落体不是“突然掉下去”，而是在重力作用下速度一秒一秒稳定增大。",
          "不要把重力加速度理解成额外速度，它决定的是速度变化得有多快。",
        ),
        createPhysicsMotionCard(
          "图像怎么读",
          `当前时刻 t = ${currentTime.toFixed(2)} 时，速度 v = ${currentVelocity.toFixed(2)}，剩余高度 ${currentHeight.toFixed(2)}`,
          "图像下方的面积表示从开始下落到当前时刻已经积累的位移，所以高度会随面积增加而减少。",
          "孩子常见误区是只盯着速度数值，不去看“已经掉了多少”这一层。",
          true,
        ),
        createPhysicsMotionCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定高度，只改 g；再固定 g，只改 t，最容易看出“斜率”和“面积”在自由落体里分别意味着什么。",
          "如果面积已经超过初始高度，就说明参数超出了真实下落过程，讲题时要提醒孩子结合落地时刻判断。",
        ),
      ],
      message: "先看绿色直线的斜率，再看下方三角形面积，会更容易把速度和高度变化连起来。",
    };
  },
};
