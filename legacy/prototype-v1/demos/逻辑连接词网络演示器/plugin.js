import { buildLogicConnectorMapModel } from "../shared/english-roots-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildLogicConnectorMapModel(params);
    const {
      coreFunction,
      summary,
      connectors,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓逻辑", coreFunction, ["关系中心"], "先知道这里在表达什么逻辑，再决定用哪个连接词。"),
        item("再选连接词", connectors.join(" / "), ["高频连接"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前逻辑组",
          coreFunction,
          "连接词最容易学乱，是因为孩子常常把它们当作中文替换词，而不是逻辑关系标签。",
          "如果不先判断逻辑关系，阅读和完形里很容易因为“词看着熟”就选错。",
        ),
        card(
          "图像怎么读",
          summary,
          "中心节点表示逻辑关系本身，周围分支表示不同场景下更常见的连接词选择。",
          "孩子常见误区是把 however、but、although 当成完全一样的词。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议每次先用中文说出逻辑关系，再从图里找更匹配的连接词，辨析会更准。",
          "当孩子能先判断逻辑，再选连接词，阅读、完形和写作都会一起变稳。",
        ),
      ],
      message: "先判断逻辑关系，再选连接词，连接词就不容易乱了。",
    };
  },
};
