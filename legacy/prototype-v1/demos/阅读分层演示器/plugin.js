import { buildReadingLayerModel } from "../shared/english-sentence-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildReadingLayerModel(params);
    const {
      passageTitle,
      mainIdea,
      readingHint,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓主旨", mainIdea, ["中心信息"], "先保住整篇最核心的意思，再决定哪些句子只是支撑。"),
        item("再分层读", readingHint, ["层级阅读"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前短文",
          passageTitle,
          "短文里的信息并不在同一层，有的句子在说中心，有的在解释原因，有的只是举例或给数据。",
          "如果把所有句子都看成一样重要，孩子很容易读完很多字却抓不到重点。",
        ),
        card(
          "图像怎么读",
          mainIdea,
          "中心节点是整篇短文最想传达的主旨，下一层是理由或做法，再往下才是细节、结果和例子。",
          "孩子常见误区是把细节句当成中心句，导致主旨判断漂移。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议每次先用一句中文复述主旨，再用两三条分支说出支撑信息，阅读题会更稳。",
          "当孩子能先分层再读题，做题速度和正确率都会更好。",
        ),
      ],
      message: "先抓主旨，再分支撑层，文章理解会清楚很多。",
    };
  },
};
