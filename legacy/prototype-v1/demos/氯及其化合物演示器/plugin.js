import {
  createChemistryCard,
  createChemistryTeachingItems,
} from "../shared/chemistry-language-plugin-base.mjs";
import { buildChlorineTransformationModel } from "../shared/chemistry-elements-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildChlorineTransformationModel(params);
    const {
      activeSubstance,
      bleachingAgent,
      keySpecies,
      phenomenonSummary,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: createChemistryTeachingItems([
        {
          title: "先抓当前物质",
          value: activeSubstance,
          badges: [`关键链 ${keySpecies.join(" / ")}`],
          text: "氯这一章很容易把“氯气、盐酸、次氯酸、次氯酸盐”混在一起，所以第一步必须先认清当前主角。",
        },
        {
          title: "再抓漂白主角",
          value: bleachingAgent,
          badges: ["漂白核心"],
          text: phenomenonSummary,
        },
      ]),
      explanationModel: [
        createChemistryCard(
          "当前模型",
          `${activeSubstance} 场景下，漂白核心是 ${bleachingAgent}`,
          "把氯气本身、氯水中的各组分和漂白液里的有效成分区分开，孩子才不容易做题时乱指主角。",
          "最常见误区就是把 Cl2 直接当成漂白主角，而忽略 HClO 才是关键。",
        ),
        createChemistryCard(
          "图像怎么读",
          keySpecies.join(" -> "),
          "节点表示当前场景里的关键物质，箭头表示形成或转化路径，右下角标签专门提醒漂白和杀菌这一层用途。",
          "如果只记用途不记物质来源，一遇到氯水成分判断题就容易失分。",
          true,
        ),
        createChemistryCard(
          "给孩子的解释",
          studentSummary,
          "建议先让孩子只回答“谁在真正漂白”，再倒推它是怎样形成的，这样链路会比正向硬背更稳。",
          "当孩子能把物质、现象、用途倒着讲回来，说明这章开始真正打通了。",
        ),
      ],
      message: "先看清漂白主角是谁，再回到含氯物质转化链，氯这一章就会顺很多。",
    };
  },
};
