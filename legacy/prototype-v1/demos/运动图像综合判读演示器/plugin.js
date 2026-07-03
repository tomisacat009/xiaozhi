import {
  buildMotionGraphModel,
  buildPhysicsMotionTeachingItems,
  createPhysicsMotionCard,
} from "../shared/physics-motion-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildMotionGraphModel(params);
    const {
      currentTime,
      currentVelocity,
      displacement,
      studentSummary,
    } = model.derived;

    return {
      derived: {
        ...model.derived,
        equation: `s = ${params.v0.toFixed(1)}t + 0.5×${params.a.toFixed(1)}t²；v = ${params.v0.toFixed(1)} + ${params.a.toFixed(1)}t`,
      },
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildPhysicsMotionTeachingItems([
        {
          title: "先分工",
          value: "s-t 读位置，v-t 读速度",
          badges: [`t = ${currentTime.toFixed(1)}`, `v = ${currentVelocity.toFixed(2)}`],
          text: "图像综合题最怕两张图的含义混掉，所以第一步一定是先分清谁在说什么。",
        },
        {
          title: "再翻译过程",
          value: `s = ${displacement.toFixed(2)}`,
          badges: [`当前速度 ${currentVelocity.toFixed(2)}`],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createPhysicsMotionCard(
          "当前模型",
          `s = ${params.v0.toFixed(1)}t + 0.5×${params.a.toFixed(1)}t²；v = ${params.v0.toFixed(1)} + ${params.a.toFixed(1)}t`,
          "同一个运动过程可以同时投影成 s-t 图像和 v-t 图像，但两张图回答的问题并不一样。",
          "不要因为两条线都在“上升”，就误以为它们表达的是同一种物理变化。",
        ),
        createPhysicsMotionCard(
          "图像怎么读",
          `当前时刻的位移是 ${displacement.toFixed(2)}，速度是 ${currentVelocity.toFixed(2)}`,
          "蓝色点对应 s-t 当前状态，紫色点对应 v-t 当前状态。把同一时刻在两张图上同时找出来，孩子会更容易建立翻译能力。",
          "常见误区是把 s-t 的斜率、v-t 的高度和现实快慢混成一件事。",
          true,
        ),
        createPhysicsMotionCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定初速度，只改加速度；再固定加速度，只改时刻，最容易看清“哪一张图在变形、哪一张图在读状态”。",
          "当孩子能把两张图口头讲清楚，综合图像题的错误率会明显下降。",
        ),
      ],
      message: "先说清 s-t 和 v-t 各自负责什么，再读同一时刻的两个点，图像综合题就会顺很多。",
    };
  },
};
