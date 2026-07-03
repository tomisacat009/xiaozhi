import { buildWritingParagraphModel } from "../shared/english-roots-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildWritingParagraphModel(params);
    const {
      paragraphGoal,
      summary,
      layerLabels,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓段落目标", paragraphGoal, ["段落结构"], "先知道这一段最想完成什么表达任务，再决定怎样展开。"),
        item("再看展开层", layerLabels.join(" -> "), ["展开路径"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前段落",
          paragraphGoal,
          "很多孩子作文写不开，不是因为不会写句子，而是不知道一段话本来就应该分层长出来。",
          "如果没有段落层级意识，作文很容易变成零散句子堆积。",
        ),
        card(
          "图像怎么读",
          summary,
          "左边是主题句或问题句，中间是支撑和例子，右边是收束句。这样孩子可以直接看见一段话怎样从一个中心逐层展开。",
          "孩子常见误区是主题句刚说完，就直接换下一个点，没有把这一段写满。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议每次先写出这一段最核心的一句，再按图里的层级补两三层，段落会稳很多。",
          "当孩子能先组织段落，再润色句子，作文提升会更可持续。",
        ),
      ],
      message: "先搭段落骨架，再补句子，作文就更容易写开了。",
    };
  },
};
