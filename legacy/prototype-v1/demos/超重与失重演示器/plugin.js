import { buildPhysicsMotionTeachingItems, createPhysicsMotionCard } from "../shared/physics-motion-plugin-base.mjs";
import { buildOverweightModel } from "../shared/physics-force-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildOverweightModel(params);
    const {
      gravityForce,
      supportForce,
      apparentWeightRatio,
      acceleration,
      stateLabel,
      supportEquation,
      studentSummary,
    } = model.derived;

    return {
      derived: {
        ...model.derived,
        equation: supportEquation,
      },
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildPhysicsMotionTeachingItems([
        {
          title: "先看关系",
          value: stateLabel,
          badges: [`G = ${gravityForce.toFixed(0)}`, `N = ${supportForce.toFixed(0)}`],
          text: "孩子要先判断支持力和重力谁大谁小，再去谈超重还是失重。",
        },
        {
          title: "再看加速度",
          value: `a = ${acceleration.toFixed(1)}`,
          badges: [`N/G = ${apparentWeightRatio.toFixed(2)}`],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createPhysicsMotionCard(
          "当前模型",
          supportEquation,
          "如果取向上为正，电梯加速度向上时支持力会增大；向下时支持力会减小。",
          "不要把超重理解成“重力变大”，这里重力本身并没有变。",
        ),
        createPhysicsMotionCard(
          "图像怎么读",
          `当前状态：${stateLabel}`,
          "红线是重力，绿线是支持力，蓝线是加速度方向。真正影响称重读数的是支持力而不是重力。",
          "孩子常见误区是看到“向上运动”就说超重，其实决定超重的是加速度方向，不是速度方向。",
          true,
        ),
        createPhysicsMotionCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定质量，只改加速度，把正常、超重、失重、完全失重 4 个状态连续切一遍，概念会稳很多。",
          "一旦孩子能把“支持力变化”讲清楚，这一类生活情境题就不会再绕。",
        ),
      ],
      message: "先比较支持力和重力，再去判断当前是超重、失重还是正常状态。",
    };
  },
};
