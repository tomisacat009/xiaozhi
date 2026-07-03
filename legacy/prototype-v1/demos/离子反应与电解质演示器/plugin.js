import {
  createChemistryCard,
  createChemistryTeachingItems,
} from "../shared/chemistry-language-plugin-base.mjs";
import { buildIonicReactionModel } from "../shared/chemistry-reaction-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildIonicReactionModel(params);
    const {
      reactingIons,
      spectatorIons,
      resultType,
      netIonicEquation,
      studentSummary,
    } = model.derived;

    const resultLabelMap = {
      precipitate: "生成沉淀",
      water: "生成水",
      gas: "生成气体",
    };

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: createChemistryTeachingItems([
        {
          title: "先抓反应离子",
          value: reactingIons.join(" + "),
          badges: [resultLabelMap[resultType] ?? resultType],
          text: "离子反应里最重要的第一步，是把真正发生变化的粒子先盯住。",
        },
        {
          title: "再看旁观离子",
          value: spectatorIons.join(" + "),
          badges: ["可约去"],
          text: "旁观离子不是“没出现”，而是反应前后都还在溶液里，所以可以在离子方程式中约掉。",
        },
      ]),
      explanationModel: [
        createChemistryCard(
          "当前模型",
          netIonicEquation,
          "把溶液中的粒子分成“真正变化”和“仍留在溶液里”两组，离子反应的本质就会清楚很多。",
          "不要直接从分子式硬删，先想溶液里实际有哪些离子。",
        ),
        createChemistryCard(
          "图像怎么读",
          `${reactingIons.join(" + ")} -> ${resultLabelMap[resultType] ?? resultType}`,
          "左侧区域表示真正参与变化的离子，右侧区域表示旁观离子，下方生成物提示为什么这个反应能发生。",
          "沉淀、气体、水都能成为“离开原离子状态”的驱动力。",
          true,
        ),
        createChemistryCard(
          "给孩子的解释",
          studentSummary,
          "建议每次都让孩子口头回答两个问题：谁真的变了？谁只是留在旁边？",
          "如果这两个问题答不清，离子共存和离子方程式通常都会一起出错。",
        ),
      ],
      message: "先把真正变化的离子说完整，再去写离子方程式，错误会少很多。",
    };
  },
};
