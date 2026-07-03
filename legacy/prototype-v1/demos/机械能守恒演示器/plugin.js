import { buildPhysicsMotionTeachingItems, createPhysicsMotionCard } from "../shared/physics-motion-plugin-base.mjs";
import { buildMechanicalEnergyModel } from "../shared/physics-energy-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildMechanicalEnergyModel(params);
    const {
      potentialEnergy,
      kineticEnergy,
      totalEnergy,
      currentHeight,
      speed,
      studentSummary,
    } = model.derived;

    return {
      derived: {
        ...model.derived,
        equation: `Ep + Ek = ${totalEnergy.toFixed(2)}`,
      },
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildPhysicsMotionTeachingItems([
        {
          title: "先看总量",
          value: `E总 = ${totalEnergy.toFixed(2)}`,
          badges: [`h = ${currentHeight.toFixed(2)}`, `v = ${speed.toFixed(2)}`],
          text: "机械能守恒题里最重要的是先稳住“总量不变”这个视角。",
        },
        {
          title: "再看转化",
          value: `Ep ${potentialEnergy.toFixed(2)} / Ek ${kineticEnergy.toFixed(2)}`,
          badges: ["势能减少 = 动能增加"],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createPhysicsMotionCard(
          "当前模型",
          `Ep + Ek = ${totalEnergy.toFixed(2)}`,
          "高度越低，势能越小；而势能减少掉的那一部分，会在没有额外耗散时补到动能里。",
          "不要把“守恒”理解成每一项都不变，真正不变的是总机械能。",
        ),
        createPhysicsMotionCard(
          "图像怎么读",
          `当前位置 h = ${currentHeight.toFixed(2)}，当前速度 v = ${speed.toFixed(2)}`,
          "左边看高度变化，右边看三根能量条。蓝条降多少，橙条就补多少，而绿条总是保持不变。",
          "孩子常见误区是只会列式，却说不清每一条能量条为什么这样变。",
          true,
        ),
        createPhysicsMotionCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定总高度，只拖当前位置，让孩子先口头说出哪一部分在减、哪一部分在增，再回头写式子。",
          "当孩子能把能量条讲顺，机械能守恒题的判断速度会明显提高。",
        ),
      ],
      message: "先看总机械能有没有变，再看势能减少的那部分是不是正好补给了动能。",
    };
  },
};
