import { buildGrammarClozeStrategyModel } from "../shared/english-roots-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildGrammarClozeStrategyModel(params);
    const {
      coreGoal,
      summary,
      stepLabels,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓核心目标", coreGoal, ["解题路径"], "先看这一题到底要你判断什么，再去落具体答案。"),
        item("再走决策步骤", stepLabels.join(" -> "), ["步骤判断"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前题型",
          coreGoal,
          "语法填空最容易做乱，是因为孩子常常一眼就想填答案，却跳过了句法和词性判断。",
          "如果没有固定决策步骤，遇到稍复杂的空格就很容易凭感觉误判。",
        ),
        card(
          "图像怎么读",
          summary,
          "左边是空格位置，中间是句法和词性判断，右边才是具体形式选择和答案。这样孩子能看见每一步为什么存在。",
          "孩子常见误区是只会记答案，不会复述出自己是怎么判断出来的。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议每次先口头说出空格功能，再说自己为什么选这个词形，做题会越来越稳。",
          "当孩子能把判断过程说出来，语法填空正确率会更持续地提升。",
        ),
      ],
      message: "先定空格功能，再选词形形式，语法填空就不容易乱猜了。",
    };
  },
};
