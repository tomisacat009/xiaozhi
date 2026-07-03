import {
  createChemistryCard,
  createChemistryTeachingItems,
} from "../shared/chemistry-language-plugin-base.mjs";
import { buildIronTransformationModel } from "../shared/chemistry-elements-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildIronTransformationModel(params);
    const {
      activeSpecies,
      targetSpecies,
      colorHint,
      identificationHint,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: createChemistryTeachingItems([
        {
          title: "先抓价态变化",
          value: `${activeSpecies} -> ${targetSpecies}`,
          badges: ["铁系主线"],
          text: "铁、亚铁、铁离子的题，本质上是在追踪它现在处在哪个价态、下一步会往哪边变。",
        },
        {
          title: "再挂颜色检验",
          value: colorHint,
          badges: ["颜色线索", "检验线索"],
          text: identificationHint,
        },
      ]),
      explanationModel: [
        createChemistryCard(
          "当前模型",
          `${activeSpecies} -> ${targetSpecies}`,
          "把价态变化放在最中间，再把颜色和检验挂上去，孩子就不容易只剩零散结论。",
          "铁这一章最常见的错误，就是只记“浅绿色”“血红色”，却忘了它们对应的是谁。",
        ),
        createChemistryCard(
          "图像怎么读",
          colorHint,
          "三个节点分别对应铁单质、亚铁、铁离子，箭头提示当前场景的变化方向，顶部和底部分别补颜色线索与检验线索。",
          "如果只会背 KSCN 检验 Fe3+，却不会把它放回价态变化链，综合题还是会卡住。",
          true,
        ),
        createChemistryCard(
          "给孩子的解释",
          studentSummary,
          "建议每次都讲成一句完整的话：现在是谁、颜色怎样、为什么会变、怎么检验。",
          "当孩子能把铁系三者来回讲顺，这一章的推断题就会轻松很多。",
        ),
      ],
      message: "先沿着铁的价态链走，再挂上颜色和检验，整章会更成体系。",
    };
  },
};
