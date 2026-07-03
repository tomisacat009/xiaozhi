import {
  buildAcceleratedMotionModel,
  buildPhysicsMotionTeachingItems,
  createPhysicsMotionCard,
} from "../shared/physics-motion-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildAcceleratedMotionModel(params);
    const {
      velocityEquation,
      currentVelocity,
      currentTime,
      displacement,
      acceleration,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildPhysicsMotionTeachingItems([
        {
          title: "先抓斜率",
          value: acceleration >= 0 ? "速度在稳定增大" : "速度在稳定减小",
          badges: [`a = ${acceleration.toFixed(1)}`, `t = ${currentTime.toFixed(1)}`],
          text: "在 v-t 图像里，直线的斜率就是加速度，所以直线越往上抬，速度增长得越快。",
        },
        {
          title: "累计位移",
          value: `s = ${displacement.toFixed(2)}`,
          badges: [`v = ${currentVelocity.toFixed(1)}`],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createPhysicsMotionCard(
          "当前模型",
          velocityEquation,
          "匀变速运动最核心的是：速度不是固定的，而是在按固定快慢持续变化。",
          "不要把“速度变了”看成混乱变化，这里变的是有规律的，规律就是加速度。",
        ),
        createPhysicsMotionCard(
          "图像怎么读",
          `当前时刻 t = ${currentTime.toFixed(2)} 时，速度 v = ${currentVelocity.toFixed(2)}`,
          "斜率表示加速度；图像与时间轴围成的面积表示从 0 到当前时刻的位移累计。",
          "孩子常见误区是只看点，不看整块面积，这样就会漏掉位移累计这层理解。",
          true,
        ),
        createPhysicsMotionCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定 v0，只改 a；再固定 a，只改 t，最容易看出“斜率”和“面积”这两层意思。",
          "如果速度从正变到负，说明物体可能先停下再反向，这时更要结合图像整体过程来读。",
        ),
      ],
      message: "先盯住当前速度点，再看下面的紫色面积，会更容易把“速度变化”和“位移累计”连起来。",
    };
  },
};
