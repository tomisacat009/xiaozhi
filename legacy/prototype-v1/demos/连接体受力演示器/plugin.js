import { buildPhysicsMotionTeachingItems, createPhysicsMotionCard } from "../shared/physics-motion-plugin-base.mjs";
import { buildConnectedBodiesModel } from "../shared/physics-force-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildConnectedBodiesModel(params);
    const {
      systemMass,
      acceleration,
      tension,
      wholeEquation,
      localEquation,
      studentSummary,
    } = model.derived;

    return {
      derived: {
        ...model.derived,
        equation: `${wholeEquation}；${localEquation}`,
      },
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildPhysicsMotionTeachingItems([
        {
          title: "先看整体",
          value: `a = ${acceleration.toFixed(2)}`,
          badges: [`总质量 ${systemMass.toFixed(2)}`, `F = ${params.f.toFixed(1)}`],
          text: "先把两个物体当成一个系统，会更容易先拿到共同加速度。",
        },
        {
          title: "再看局部",
          value: `T = ${tension.toFixed(2)}`,
          badges: ["隔离后块求张力"],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createPhysicsMotionCard(
          "当前模型",
          `${wholeEquation}；${localEquation}`,
          "整体法负责先求共同加速度，隔离法负责回头求连接处内部力，两步分开会比一次全列更清楚。",
          "不要一开始就把两个物体都拆开列一堆式子，很容易把张力符号和方向弄乱。",
        ),
        createPhysicsMotionCard(
          "图像怎么读",
          `系统加速度 ${acceleration.toFixed(2)}，张力 ${tension.toFixed(2)}`,
          "红箭头是外力，绿色箭头是连接处张力，蓝箭头是系统共同加速度。看懂谁负责“拉整体”、谁负责“带后块”，思路就会稳。",
          "常见误区是知道要用整体法，却说不清为什么求张力时又必须回到隔离法。",
          true,
        ),
        createPhysicsMotionCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定外力，只改两块质量；再固定质量，只改外力，最容易看出整体加速度和张力分别受谁影响更明显。",
          "一旦孩子形成“先整体后局部”的口头流程，这类题就会顺很多。",
        ),
      ],
      message: "先整体求共同加速度，再隔离其中一块求张力，会比一上来就拆更稳。",
    };
  },
};
