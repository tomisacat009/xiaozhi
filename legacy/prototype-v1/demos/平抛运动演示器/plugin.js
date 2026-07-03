import {
  buildPhysicsMotionTeachingItems,
  buildProjectileMotionModel,
  createPhysicsMotionCard,
} from "../shared/physics-motion-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildProjectileMotionModel(params);
    const {
      currentTime,
      currentX,
      currentY,
      currentVy,
      currentSpeed,
      timeToGround,
      range,
      studentSummary,
    } = model.derived;

    return {
      derived: {
        ...model.derived,
        equation: `x = ${params.v0x.toFixed(1)}t；y = ${params.h0.toFixed(1)} - 0.5×${params.g.toFixed(1)}t²`,
      },
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: buildPhysicsMotionTeachingItems([
        {
          title: "先分方向",
          value: "水平匀速 + 竖直下落",
          badges: [`t = ${currentTime.toFixed(2)}`, `x = ${currentX.toFixed(2)}`],
          text: "平抛最容易错的地方，是把两个方向混成一个整体去背公式。",
        },
        {
          title: "再看结果",
          value: `y = ${currentY.toFixed(2)}`,
          badges: [`vy = ${currentVy.toFixed(2)}`, `v = ${currentSpeed.toFixed(2)}`],
          text: studentSummary,
        },
        {
          title: "落地信息",
          value: `飞行 ${timeToGround.toFixed(2)} s`,
          badges: [`射程 ${range.toFixed(2)}`],
          text: "先看会在空中待多久，再看水平会跑多远，孩子会更容易把两个方向重新对上。",
        },
      ]),
      explanationModel: [
        createPhysicsMotionCard(
          "当前模型",
          `x = ${params.v0x.toFixed(1)}t；y = ${params.h0.toFixed(1)} - 0.5×${params.g.toFixed(1)}t²`,
          "平抛在水平方向没有加速度，所以位移按固定快慢增加；竖直方向则和自由落体完全一样。",
          "不要试图直接从整条曲线去猜规律，先拆开方向再看会轻松很多。",
        ),
        createPhysicsMotionCard(
          "图像怎么读",
          `当前时刻 x = ${currentX.toFixed(2)}，y = ${currentY.toFixed(2)}`,
          "当前点往下投影是水平位移，往左投影是当前高度。两个投影一起读，才是真正的“同一时刻状态”。",
          "孩子常见误区是只看轨迹弯不弯，却说不出横向和竖向分别怎么变。",
          true,
        ),
        createPhysicsMotionCard(
          "给孩子的解释",
          studentSummary,
          "建议先固定高度，只改水平初速度；再固定初速度，只改高度，最容易看清“射程为什么变”和“轨迹为什么变”。",
          "一旦孩子能把两个方向各自说顺，平抛题的公式就不再是死记。",
        ),
      ],
      message: "先分别说出水平和竖直方向在做什么，再回头看整条轨迹，就不容易乱。",
    };
  },
};
