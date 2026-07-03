import { createFunctionExplanationCard, buildTeachingItems } from "../shared/function-plugin-base.mjs";
import {
  buildSineTransformModel,
  formatPiText,
} from "../shared/trigonometry-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildSineTransformModel(params, view.viewport);
    const { features } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildTeachingItems([
        {
          title: "振幅与周期",
          value: `A = ${features.amplitude.toFixed(2)}`,
          badges: [`周期 ${features.period.toFixed(2)}`],
          text: "A 决定波峰波谷离中线有多远，ω 决定一个周期有多长。",
        },
        {
          title: "平移信息",
          value: `相位平移 ${formatPiText(features.phaseShift)}`,
          badges: [`中线 y = ${features.verticalShift.toFixed(2)}`],
          text: "φ 改左右，d 改上下，这两类变化最容易混。",
        },
      ]),
      explanationModel: [
        createFunctionExplanationCard(
          "当前模型",
          model.derived.equation,
          "先拆参数，再看整体波形，三角函数会轻松很多。",
          "相位平移和周期变化不要一起硬背，最好分开看。",
        ),
        createFunctionExplanationCard(
          "值域变化",
          `${features.range[0].toFixed(2)} 到 ${features.range[1].toFixed(2)}`,
          `中线是 y = ${features.verticalShift.toFixed(2)}，振幅是 ${features.amplitude.toFixed(2)}。`,
          "中线变了以后，最大值和最小值会一起平移。",
          true,
        ),
      ],
      message: "先拆参数，再合起来看整体波形，三角函数就不会乱。",
    };
  },
};
