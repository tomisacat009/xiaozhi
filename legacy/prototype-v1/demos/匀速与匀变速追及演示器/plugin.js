import {
  buildMixedChaseModel,
  buildPhysicsMotionTeachingItems,
  createPhysicsMotionCard,
} from "../shared/physics-motion-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildMixedChaseModel(params);
    const {
      canCatchUp,
      catchUpTime,
      catchUpPosition,
      currentGap,
      currentTime,
      chaseVelocity,
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
          title: "先看走势",
          value: canCatchUp ? "后车最终可以追上" : "当前参数下还看不到追上",
          badges: [`t = ${currentTime.toFixed(1)}`, `当前间距 ${currentGap.toFixed(2)}`],
          text: "先看一条直线和一条曲线会不会相交，再去谈列式和解方程。",
        },
        {
          title: "后车状态",
          value: `vB = ${chaseVelocity.toFixed(2)}`,
          badges: canCatchUp ? [`追上于 ${catchUpTime.toFixed(2)} s`, `相遇位置 ${catchUpPosition.toFixed(2)}`] : ["无交点"],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createPhysicsMotionCard(
          "双车模型",
          `${leadEquation}；${chaseEquation}`,
          "前车保持匀速，所以它的位置图像是一条直线；后车在加速，所以它的位置图像会弯起来。",
          "孩子常见误区是把“后车现在没追上”误解成“以后也追不上”，这类题一定要看整段走势。",
        ),
        createPhysicsMotionCard(
          "图像怎么读",
          canCatchUp
            ? `图像会在 t = ${catchUpTime.toFixed(2)} 相交，对应位置 ${catchUpPosition.toFixed(2)}`
            : "这组参数下两条位置图像没有出现交点，所以当前模型里还没有追上。",
          "直线和曲线相交，代表同一时刻位置相同；哪怕后车一开始更慢，只要后面越来越快，仍可能出现交点。",
          "不要只拿某一时刻的速度比较代替整段过程判断。",
          true,
        ),
        createPhysicsMotionCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定前车，只改后车加速度；再固定加速度，改起点差，最容易看清“起点差”和“后续加速”怎样一起决定结果。",
          "如果后车曲线始终抬不起来，就说明它虽然在加速，但增长得还不够快，短时间内仍追不上。",
        ),
      ],
      message: "先看绿线会不会和蓝线相交，再回头解释后车为什么后来能追上。",
    };
  },
};
