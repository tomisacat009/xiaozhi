import {
  buildTeachingItems,
  buildTransformModel,
  createFunctionExplanationCard,
} from "../shared/function-plugin-base.mjs";

export const plugin = {
  build({ params, view }) {
    const model = buildTransformModel(params, view.viewport);
    const { features } = model.derived;

    return {
      derived: model.derived,
      drawModel: model.drawModel,
      teachingModel: buildTeachingItems([
        {
          title: "底函数",
          value: features.baseLabel,
          badges: [features.horizontalMove, features.verticalMove],
          text: "先辨认原函数是什么，再看平移与伸缩。",
        },
        {
          title: "伸缩提醒",
          value: features.verticalScaleHint,
          badges: [features.horizontalScaleHint],
          text: "函数外乘系数看纵向，函数里乘系数看横向。",
        },
      ]),
      explanationModel: [
        createFunctionExplanationCard(
          "当前变换",
          model.derived.equation,
          `底函数是 ${features.baseLabel}，${features.horizontalMove}，${features.verticalMove}。`,
          "左右平移一定先盯括号里的正负号。",
        ),
        createFunctionExplanationCard(
          "易错提醒",
          features.horizontalScaleHint,
          "横向变换和纵向变换看上去都像拉伸，但它们作用位置完全不同。",
          "不要把 y = f(x + 2) 看成向右平移 2。",
          true,
        ),
      ],
      message: "先认底函数，再判断平移方向，最后再说伸缩。",
    };
  },
};
