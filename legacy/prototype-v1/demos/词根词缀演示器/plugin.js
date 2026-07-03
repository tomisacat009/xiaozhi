import { buildWordRootModel } from "../shared/english-roots-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildWordRootModel(params);
    const {
      rootMeaning,
      words,
      familySummary,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓词根", rootMeaning, ["核心义"], "单词网络的中心不是拼写，而是词根承载的核心意义。"),
        item("再看家族", words.join(" / "), ["同根词"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前词族",
          rootMeaning,
          "词根像一个意义核心，往外连不同前缀、后缀后，就会长出一组相关但不完全相同的单词。",
          "如果只把单词一个个孤立背，遇到阅读和派生词时会很容易断掉联系。",
        ),
        card(
          "图像怎么读",
          familySummary,
          "中心节点是词根核心义，外圈节点是同根词，连线标签提示前缀或后缀怎样改变方向、角色和词性。",
          "孩子常见误区是只记前缀中文，不去看它和词根结合后怎样整体变义。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议先让孩子说出词根核心义，再用它去猜 2 到 3 个同根词的方向和大意，词汇网络会更快建立。",
          "当孩子能从一个词根顺着网络讲出几个同根词，单词记忆就开始真正结构化了。",
        ),
      ],
      message: "先抓词根核心义，再看词缀怎样拉出不同方向，单词会更容易成网。",
    };
  },
};
