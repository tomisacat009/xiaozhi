import { buildWordFamilyAtlasModel } from "../shared/english-roots-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildWordFamilyAtlasModel(params);
    const {
      coreMeaning,
      familyWords,
      familySummary,
      tips,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓核心义", coreMeaning, ["词族中心"], "先知道这一组词本来围着什么意义在转，记忆才会稳。"),
        item("再看家族词", familyWords.slice(0, 4).join(" / "), ["高频扩展"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前词族",
          coreMeaning,
          "教材里很多看似无关的词，其实都围着同一个核心义，只是被不同前后缀拉成了不同分支。",
          "如果每个单词都单独背，记忆成本会越来越高，复现也不稳定。",
        ),
        card(
          "图像怎么读",
          familySummary,
          "中心节点是核心义，周围分支表示动作、状态、结果或互动场景等常见扩展。这样孩子更容易看见“为什么这些词会放在一起”。",
          "孩子常见误区是认识单个单词，但说不出它和同族词有什么关系。",
          true,
        ),
        card(
          "给孩子的解释",
          tips,
          "建议先让孩子猜同族词的大意，再去确认精确中文，这样更容易形成迁移能力。",
          "当孩子能说出一个词族的核心义，词汇量增长会明显更有秩序。",
        ),
      ],
      message: "先记词族的核心义，再记单词，记忆会更成体系。",
    };
  },
};
