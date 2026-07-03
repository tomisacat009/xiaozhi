import {
  createChemistryCard,
  createChemistryTeachingItems,
} from "../shared/chemistry-language-plugin-base.mjs";
import { buildSodiumTransformationModel } from "../shared/chemistry-elements-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildSodiumTransformationModel(params);
    const {
      activeSubstance,
      product,
      phenomenonSummary,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: createChemistryTeachingItems([
        {
          title: "先抓当前主角",
          value: activeSubstance,
          badges: [`产物 ${product}`],
          text: "钠这一章最怕把每个物质拆成孤岛，所以先认清当前场景的起点和终点。",
        },
        {
          title: "再挂回现象",
          value: phenomenonSummary,
          badges: ["转化链"],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createChemistryCard(
          "当前模型",
          `${activeSubstance} -> ${product}`,
          "把金属钠和几种典型含钠化合物串成一条链，孩子更容易理解它们不是独立知识点。",
          "别把 Na2O 和 Na2O2 当成同一个东西，要结合反应条件和颜色、用途区分。",
        ),
        createChemistryCard(
          "图像怎么读",
          phenomenonSummary,
          "上方节点是核心物质，箭头表示转化方向，标签提醒当前场景最值得说清的条件或生成物。",
          "如果只记“会反应”不记“怎么反应、有什么现象”，实验题和推断题都会吃亏。",
          true,
        ),
        createChemistryCard(
          "给孩子的解释",
          studentSummary,
          "建议每次都让孩子先把链条口头复述一遍，再落到某一个现象或用途，知识会更成体系。",
          "当孩子能从一个场景反推到整条链时，这一章才算真正学会。",
        ),
      ],
      message: "先看整条钠系转化链，再盯住当前场景，记忆会稳很多。",
    };
  },
};
