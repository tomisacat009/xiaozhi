import {
  createChemistryCard,
  createChemistryTeachingItems,
} from "../shared/chemistry-language-plugin-base.mjs";
import { buildRedoxModel } from "../shared/chemistry-reaction-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildRedoxModel(params);
    const {
      oxidizedSpecies,
      reducedSpecies,
      electronTransferCount,
      oxidizingAgent,
      reducingAgent,
      oxidationNumberChanges,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: createChemistryTeachingItems([
        {
          title: "先定电子方向",
          value: `${oxidizedSpecies} -> ${reducedSpecies}`,
          badges: [`${electronTransferCount}e-`],
          text: "先找到电子从哪里出发、到哪里结束，氧化还原的主体关系就清楚了。",
        },
        {
          title: "再定角色",
          value: `氧化剂 ${oxidizingAgent}`,
          badges: [`还原剂 ${reducingAgent}`],
          text: "得到电子的是氧化剂，失去电子的是还原剂，这一步一定要和电子方向一起判断。",
        },
      ]),
      explanationModel: [
        createChemistryCard(
          "当前模型",
          `${oxidizedSpecies} 失电子；${reducedSpecies} 得电子`,
          "把“谁被氧化、谁被还原”翻译成电子方向后，氧化剂和还原剂就不再是死记硬背的标签。",
          "别把“氧化剂被还原、还原剂被氧化”这组交叉关系记反。",
        ),
        createChemistryCard(
          "图像怎么读",
          `电子总数 ${electronTransferCount}；${oxidationNumberChanges.join("；")}`,
          "中间箭头告诉你电子流向，底部文字对应化合价升降。两个视角必须同时成立，才是真正看懂了氧化还原。",
          "孩子常见误区是只背化合价升降，不去追问电子到底怎么转移。",
          true,
        ),
        createChemistryCard(
          "给孩子的解释",
          studentSummary,
          "建议把每个样例都讲成一句完整的话：谁失去多少电子，谁得到多少电子，所以谁被氧化、谁被还原。",
          "如果一句话说不顺，往往说明氧化剂、还原剂还没有真正弄明白。",
        ),
      ],
      message: "先沿着电子箭头讲过程，再回头读化合价变化，氧化还原会顺很多。",
    };
  },
};
