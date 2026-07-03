import { buildWritingUpgradeModel } from "../shared/english-roots-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildWritingUpgradeModel(params);
    const {
      upgradeGoal,
      summary,
      stageLabels,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓升级目标", upgradeGoal, ["表达升级"], "先知道这次升级想解决什么问题，再看具体改法。"),
        item("再看升级路径", stageLabels.join(" -> "), ["路径观察"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前样例",
          upgradeGoal,
          "很多孩子写作停在“句子没错”，但不知道怎样继续写得更清楚、更自然、更像书面表达。",
          "如果只背范文，不看升级路径，模仿会很散，也很难迁移到自己的句子里。",
        ),
        card(
          "图像怎么读",
          summary,
          "左边是基础表达，中间是结构改造节点，右边是升级表达和效果。这样孩子能直接看见“改了什么，为什么更好”。",
          "孩子常见误区是以为升级就是把句子写更长或换难词。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议先让孩子说出基础句的问题，再按图里的路径做一处升级，写作提升会更稳。",
          "当孩子能看懂句式升级路径，作文训练会更有抓手。",
        ),
      ],
      message: "先看结构怎么升级，再看句子怎么变好，写作提升会更稳。",
    };
  },
};
