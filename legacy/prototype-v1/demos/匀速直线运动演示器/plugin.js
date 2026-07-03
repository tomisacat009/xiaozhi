import {
  buildPhysicsMotionTeachingItems,
  buildUniformMotionModel,
  createPhysicsMotionCard,
} from "../shared/physics-motion-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildUniformMotionModel(params);
    const {
      equation,
      currentPosition,
      currentTime,
      currentVelocity,
      startPosition,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildPhysicsMotionTeachingItems([
        {
          title: "先抓图像",
          value: currentVelocity >= 0 ? "直线向右上方倾斜" : "直线向右下方倾斜",
          badges: [`v = ${currentVelocity.toFixed(1)}`, `t = ${currentTime.toFixed(1)}`],
          text: "匀速运动里，图像斜率不变，所以整条图就是一条直线。",
        },
        {
          title: "当前位置",
          value: `s = ${currentPosition.toFixed(2)}`,
          badges: [`s0 = ${startPosition.toFixed(1)}`],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createPhysicsMotionCard(
          "当前模型",
          equation,
          "匀速运动最核心的关系是：位置随时间按固定快慢稳定变化。",
          "不要把“位置在变”误解成“速度也在变”，这里只是位置在累积变化。",
        ),
        createPhysicsMotionCard(
          "图像怎么读",
          `当前时刻 t = ${currentTime.toFixed(2)} 时，位置 s = ${currentPosition.toFixed(2)}`,
          "斜率表示速度；图像起点表示初始位置。",
          "如果只改初始位置 s0，直线会整体平移，但斜率不会变。",
          true,
        ),
        createPhysicsMotionCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定 t，只改 v；再固定 v，只改 s0，最容易看清两类变化的差别。",
          "孩子常见误区是把“起点变了”和“运动快慢变了”混成一件事，这个演示器就是用来拆开它们。",
        ),
      ],
      message: "先观察当前点，再顺着虚线回到时间轴和位置轴，会更容易把图像读明白。",
    };
  },
};
