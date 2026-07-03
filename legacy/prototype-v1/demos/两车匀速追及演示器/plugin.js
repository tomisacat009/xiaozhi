import {
  buildPhysicsMotionTeachingItems,
  buildUniformChaseModel,
  createPhysicsMotionCard,
} from "../shared/physics-motion-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildUniformChaseModel(params);
    const {
      canCatchUp,
      catchUpTime,
      catchUpPosition,
      currentGap,
      currentTime,
      leadEquation,
      chaseEquation,
      studentSummary,
    } = model.derived;

    return {
      derived: {
        ...model.derived,
        equation: `${leadEquation}；${chaseEquation}`,
      },
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildPhysicsMotionTeachingItems([
        {
          title: "先抓结论",
          value: canCatchUp ? "后车可以追上前车" : "后车追不上前车",
          badges: [`t = ${currentTime.toFixed(1)}`, `间距 ${currentGap.toFixed(2)}`],
          text: "追及题先别急着列式，先判断两条位置线会不会相交。",
        },
        {
          title: "追及条件",
          value: canCatchUp
            ? `追上于 ${catchUpTime.toFixed(2)} 秒`
            : "速度差不足以消除起点差",
          badges: canCatchUp ? [`相遇位置 ${catchUpPosition.toFixed(2)}`] : ["无交点"],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createPhysicsMotionCard(
          "双车模型",
          `${leadEquation}；${chaseEquation}`,
          "一条线表示一辆车的位置随时间怎么变，两条线一起看，才会出现追及问题。",
          "不要只比速度大小，还要一起看起点差。",
        ),
        createPhysicsMotionCard(
          "图像怎么读",
          canCatchUp
            ? `两条线会在 t = ${catchUpTime.toFixed(2)} 相交，对应位置 ${catchUpPosition.toFixed(2)}`
            : "两条线没有交点，所以在这个模型里后车追不上前车。",
          "图像相交 = 同一时刻位置相同 = 现实中的追上。",
          "孩子常见误区是把“某一时刻离得近”误当成“已经追上”，真正的追上一定对应位置完全相同。",
          true,
        ),
        createPhysicsMotionCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定两车起点，只改后车速度；再固定速度，改前车起点，最容易看清起点差和速度差各自的作用。",
          "如果后车速度不比前车大，两条线就不会交叉，追及问题也就没有真正发生。",
        ),
      ],
      message: "先看两条线会不会相交，再看交点在什么时候、什么位置出现。",
    };
  },
};
