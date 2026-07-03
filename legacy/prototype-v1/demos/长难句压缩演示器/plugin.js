import { buildSentenceCompressionModel } from "../shared/english-sentence-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildSentenceCompressionModel(params);
    const {
      sentenceText,
      mainTrunk,
      compressionHint,
      readingGoal,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先保主干", mainTrunk, ["压缩核心"], "先把句子压回主语、谓语、宾语，阅读焦虑会先降下来。"),
        item("再挂附着层", compressionHint, ["操作步骤"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前句子",
          sentenceText,
          "长难句里最先需要保住的，不是每个单词，而是主句到底在说谁做了什么。",
          "如果一开始就把所有从句和修饰都同等对待，孩子很容易读到一半就迷路。",
        ),
        card(
          "图像怎么读",
          mainTrunk,
          "中间的主干节点是句子的骨架，上下左右的节点表示让步、条件、时间或超长主语这些附着层，箭头表示它们是怎样挂回主干的。",
          "很多孩子会把附着层当成主干，导致整句重点判断失真。",
          true,
        ),
        card(
          "给孩子的解释",
          readingGoal,
          "建议每次先用中文或极简英文复述主干，再回去补背景和条件，长句理解会稳定很多。",
          "当孩子能先压缩再展开，阅读题和语法题都会一起受益。",
        ),
      ],
      message: "先保主干，再回挂修饰，长难句就会从“乱”变成“分层”。",
    };
  },
};
