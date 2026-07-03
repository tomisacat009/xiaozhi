import { buildPhysicsMotionTeachingItems, createPhysicsMotionCard } from "../shared/physics-motion-plugin-base.mjs";
import { buildWorkEnergySynthesisModel } from "../shared/physics-energy-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildWorkEnergySynthesisModel(params);
    const {
      netWork,
      finalKinetic,
      recommendedMethod,
      studentSummary,
    } = model.derived;

    return {
      derived: {
        ...model.derived,
        equation: `W净 = ${netWork.toFixed(2)}；Ek末 = ${finalKinetic.toFixed(2)}`,
      },
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildPhysicsMotionTeachingItems([
        {
          title: "先看净功",
          value: `W净 = ${netWork.toFixed(2)}`,
          badges: [`Ek末 = ${finalKinetic.toFixed(2)}`],
          text: "综合题先把做功和损失分清楚，再回到动能变化，通常会比直接套模板更稳。",
        },
        {
          title: "再选方法",
          value: recommendedMethod,
          badges: [`W外 ${params.workByForce.toFixed(0)}`, `W损 ${params.frictionLoss.toFixed(0)}`],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createPhysicsMotionCard(
          "当前模型",
          `W净 = ${netWork.toFixed(2)}；Ek末 = ${finalKinetic.toFixed(2)}`,
          "外力做功会推动动能增加，摩擦损失会吃掉一部分变化，所以真正作用到动能上的，是二者相减后的净功。",
          "不要一看到“能量”就机械地套守恒，先判断有没有耗散，方法才不会选错。",
        ),
        createPhysicsMotionCard(
          "图像怎么读",
          `当前推荐：${recommendedMethod}`,
          "蓝条和红条先决定净功，紫条和绿条再帮助孩子看见“初动能怎样变成末动能”。这会比只盯公式更容易形成方法判断。",
          "孩子常见误区是既看不出损失项的重要性，也说不清为什么有些题不能直接机械能守恒。",
          true,
        ),
        createPhysicsMotionCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定初动能，只改损失项；再固定损失项，只改外力做功，最容易看出“推荐方法”为什么会变化。",
          "当孩子先学会选方法，再去算综合题，效率会高很多。",
        ),
      ],
      message: "先看有没有明显耗散，再看净功怎样推动动能变化，综合题的方法选择就会清楚很多。",
    };
  },
};
