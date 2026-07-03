import { buildNonfiniteStructureModel } from "../shared/english-sentence-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildNonfiniteStructureModel(params);
    const {
      coreRole,
      grammarHint,
      sentenceText,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓主句", coreRole, ["结构功能"], "先知道这个非谓语结构是在补哪一层信息，再看术语。"),
        item("再看挂接", grammarHint, ["挂接思维"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前句子",
          sentenceText,
          "非谓语结构最容易学乱，是因为孩子常把它和主句动作混在一起，没有先分主干和附着层。",
          "如果一看到 to do 或 doing 就直接背规则，复杂句阅读会越来越吃力。",
        ),
        card(
          "图像怎么读",
          coreRole,
          "主句节点负责骨架，非谓语节点表示附着结构，箭头说明它挂接到哪个动作上，以及在补目的、伴随还是背景。",
          "孩子常见误区是把非谓语也当成并列主干去理解。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议每次先说主句在干什么，再说这个非谓语是在解释什么，理解会比死背语法名称稳得多。",
          "当孩子能先分骨架和附着层，非谓语题和长句阅读都会更顺。",
        ),
      ],
      message: "先分主句和附着层，再看非谓语作用，复杂句会清楚很多。",
    };
  },
};
