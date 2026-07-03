import { buildAffixNetworkModel } from "../shared/english-roots-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildAffixNetworkModel(params);
    const {
      affixMeaning,
      baseMeaning,
      derivedWords,
      familySummary,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓词缀", affixMeaning, ["方向变化"], "词缀最重要的作用，是把原来词根的意义往某个方向拉开。"),
        item("再抓词根", baseMeaning, ["核心义", ...derivedWords.slice(0, 2)], studentSummary),
      ],
      explanationModel: [
        card(
          "当前词族",
          `${affixMeaning} + ${baseMeaning}`,
          "单词不是整体硬背的黑盒，而是由词根和词缀组合起来的结构体。",
          "如果只记成品单词，不拆构件，词汇扩展会非常吃力。",
        ),
        card(
          "图像怎么读",
          familySummary,
          "左边是词缀作用，中间是词根核心义，右边是组合后的派生词。这样孩子可以直接看到“一个构件变化，会带来哪一类意义变化”。",
          "孩子常见误区是记了前缀中文义，却不会把它和具体词根组合起来理解。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议先让孩子拆词，再猜词义，最后再回看完整单词，记忆会比直接背中文稳得多。",
          "当孩子能从构件推大意，单词记忆就开始真正变得有规律了。",
        ),
      ],
      message: "先拆词根和词缀，再回看整词，单词规律会开始清晰起来。",
    };
  },
};
