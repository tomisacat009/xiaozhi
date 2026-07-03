import {
  createChemistryCard,
  createChemistryTeachingItems,
} from "../shared/chemistry-language-plugin-base.mjs";
import { buildIonIdentificationModel } from "../shared/chemistry-experiment-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildIonIdentificationModel(params);
    const {
      reagent,
      auxiliary,
      observation,
      conclusion,
      interferenceTip,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: createChemistryTeachingItems([
        {
          title: "先说试剂条件",
          value: reagent,
          badges: [auxiliary],
          text: "离子检验不是随便滴一种试剂就结束，很多题目的关键就在条件是否说全。",
        },
        {
          title: "再说现象结论",
          value: observation,
          badges: [conclusion],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createChemistryCard(
          "当前模型",
          `${reagent} + 条件 -> 现象 -> 结论`,
          "把离子检验拆成连续判断链后，孩子会更容易明白为什么同样是“白色沉淀”，却不能直接下结论。",
          "实验题最怕只背终点，不去看中间为什么需要酸化、加热或排除干扰。",
        ),
        createChemistryCard(
          "图像怎么读",
          observation,
          "左边是加入的试剂和辅助条件，中间是观察到的现象，右边是得出的结论，底部则提醒排除干扰这一层逻辑。",
          "如果只会说现象，不会说“为什么这个现象能说明问题”，判断链就还没建立起来。",
          true,
        ),
        createChemistryCard(
          "给孩子的解释",
          interferenceTip,
          "建议让孩子把每一个离子检验都说成一句完整的话：在什么条件下，加什么，看见什么，所以说明什么。",
          "只背“白色沉淀”“刺激性气味”这类碎片，遇到综合实验题会非常吃力。",
        ),
      ],
      message: "把离子检验讲成一条判断链，而不是一串现象名词，实验题会明显更稳。",
    };
  },
};
