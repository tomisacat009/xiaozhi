import { buildListeningCaptureModel } from "../shared/english-sentence-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildListeningCaptureModel(params);
    const {
      coreTask,
      strategyHint,
      audioHint,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓听力任务", coreTask, ["抓点路径"], "先知道要优先抓哪一类信息，再决定听的时候怎么记。"),
        item("再走捕捉顺序", strategyHint, ["信息顺序"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前听力",
          audioHint,
          "听力最容易失控，是因为孩子常常一开始就试图完整听懂每一个词，结果关键信息反而漏掉。",
          "如果没有稳定的抓点顺序，数字、时间、地点这些信息会特别容易丢。",
        ),
        card(
          "图像怎么读",
          coreTask,
          "左边是场景判断，中间是关键词和数字信息，右边是速记结果。这样孩子能先抓住最值钱的信息。",
          "孩子常见误区是听到数字才着急记，但前面的场景和关键词已经错过了。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议每次先说出场景，再记人物、主题和数字，听力会稳很多。",
          "当孩子能先抓点再补细节，听力焦虑会明显下降。",
        ),
      ],
      message: "先抓场景和关键词，再补数字和细节，听力会更稳。",
    };
  },
};
