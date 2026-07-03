import { buildReadingQuestionMapModel } from "../shared/english-sentence-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildReadingQuestionMapModel(params);
    const {
      questionText,
      coreStrategy,
      solveHint,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓题型", coreStrategy, ["题型路径"], "先知道题目在问什么，再决定回原文时该找哪一层信息。"),
        item("再走步骤", solveHint, ["解题流程"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前题目",
          questionText,
          "阅读题最容易做乱，是因为孩子常常还没分题型，就已经开始凭感觉找答案了。",
          "如果主旨题和细节题混着做，定位和排除的路径会非常不稳定。",
        ),
        card(
          "图像怎么读",
          coreStrategy,
          "左边是题干识别，中间是回原文定位，右边是证据和干扰项处理。不同题型的路径重点不同。",
          "孩子常见误区是明明在做主旨题，却一直盯着细节句不放。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议每次先口头说出题型，再按图里的路径一步步走，做题会更稳。",
          "当孩子能先分题型，阅读正确率和速度都会更容易提升。",
        ),
      ],
      message: "先分题型，再走对应路径，阅读题就不容易乱了。",
    };
  },
};
