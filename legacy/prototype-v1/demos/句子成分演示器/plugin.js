import { buildSentenceStructureModel } from "../shared/english-sentence-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildSentenceStructureModel(params);
    const {
      sentenceText,
      coreRole,
      focusSummary,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先看主干", coreRole, ["结构入口"], "无论句子长短，先找主干都是最稳的第一步。"),
        item("再看作用", focusSummary, ["成分功能"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前句子",
          sentenceText,
          "句子不是一串平铺的单词，而是由主干和修饰层层组织起来的信息结构。",
          "如果一上来逐词翻译，很容易在长句里迷路。",
        ),
        card(
          "图像怎么读",
          `当前焦点：${coreRole}`,
          "节点表示成分，箭头表示依附或主干关系。先沿主干读，再看旁边修饰挂在哪里，句子层级会更清楚。",
          "孩子常见误区是只记术语，不知道这些术语在真实句子里对应什么。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议每次都让孩子先用中文说出“谁做了什么”，再补充修饰细节，结构感会提升得很快。",
          "当主干和修饰关系能口头复述出来，阅读和语法题都会更顺。",
        ),
      ],
      message: "先找句子骨架，再看修饰挂在哪里，英语长句就会轻很多。",
    };
  },
};
