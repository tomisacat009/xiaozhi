import { buildClauseHierarchyModel } from "../shared/english-sentence-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildClauseHierarchyModel(params);
    const {
      sentenceText,
      mainFunction,
      guideQuestion,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓功能", mainFunction, ["从句作用"], "不要先记名字，先看它在整句里相当于什么。"),
        item("再看判断问题", guideQuestion, ["功能提问"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前句子",
          sentenceText,
          "从句本身可以很长，但它在整句里通常只是在充当一个功能块，比如宾语、定语或状语。",
          "如果只看连接词，很容易把不同从句混成一团。",
        ),
        card(
          "图像怎么读",
          `当前焦点：${mainFunction}`,
          "主句节点负责骨架，从句节点表示补充结构，箭头表示它挂接到主句中的哪个位置，连接词单独标出来帮助孩子看清引导关系。",
          "孩子常见误区是从句名称背得很多，但不知道为什么它叫这个名字。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议每次都先问“它在回答主句里的哪个问题”，再说名称，判断会更稳。",
          "当孩子能先说作用再说术语，长难句理解会提升很明显。",
        ),
      ],
      message: "先问从句起什么作用，再看它挂在哪里，判断会容易很多。",
    };
  },
};
