import {
  createChemistryCard,
  createChemistryTeachingItems,
} from "../shared/chemistry-language-plugin-base.mjs";
import { buildMaterialClassificationModel } from "../shared/chemistry-classification-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildMaterialClassificationModel(params);
    const {
      sampleLabel,
      classificationPath,
      transformationHint,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: createChemistryTeachingItems([
        {
          title: "先抓对象",
          value: sampleLabel,
          badges: ["当前样例"],
          text: "高一化学起步最重要的一件事，就是先确认自己在讨论的究竟是哪一类对象。",
        },
        {
          title: "再走分类链",
          value: classificationPath.join(" -> "),
          badges: ["化学语言"],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createChemistryCard(
          "当前模型",
          `${sampleLabel}：${classificationPath.join(" -> ")}`,
          "把具体物质挂回分类链，孩子会更容易看懂化学语言为什么不是一堆散名词。",
          "别让孩子只会背“酸碱盐”，却不知道具体物质应该放在哪一层。",
        ),
        createChemistryCard(
          "图像怎么读",
          transformationHint,
          "左起第一个节点是具体样例，后面节点依次表示它所属的更高层分类，底部文字则提醒分类还会继续连到典型转化。",
          "如果分类和转化完全分开学，后面元素化合物和反应题都会更容易断层。",
          true,
        ),
        createChemistryCard(
          "给孩子的解释",
          studentSummary,
          "建议每次都先说“它是什么”，再说“它会怎样变”，这样化学语言底座会更稳。",
          "当孩子能从一个物质顺着分类往上走，再从类别顺着反应往下走，说明起步已经打通。",
        ),
      ],
      message: "先让每个物质找到自己的分类位置，后面的性质和反应会更容易讲通。",
    };
  },
};
