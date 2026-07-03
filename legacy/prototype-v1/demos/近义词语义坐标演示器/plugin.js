import { buildSynonymSemanticMapModel } from "../shared/english-roots-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildSynonymSemanticMapModel(params);
    const {
      coreAxis,
      nuanceHint,
      words,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓共同义", coreAxis, ["语义中心"], "先看它们共同在表达什么，再决定哪里不同。"),
        item("再看偏移", words.join(" / "), ["近义辨析"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前词组",
          coreAxis,
          "近义词最容易让孩子混淆，因为中文释义常常很接近，但真实使用时会在时间、力度、正式度或对象上拉开差距。",
          "如果只背中文释义，孩子做近义词辨析和阅读理解时会频繁误选。",
        ),
        card(
          "图像怎么读",
          nuanceHint,
          "中心是共同语义，周围的词表示它们各自往哪个方向偏移。坐标位置帮助孩子看见“差别在哪里”。",
          "孩子常见误区是把近义词当成可任意替换的同义词。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议每次先说共同义，再说每个词更偏向快、强、正式或对人说明哪一种感觉。",
          "当孩子能说出偏移方向，而不只是中文翻译，词汇使用会明显更准确。",
        ),
      ],
      message: "先抓共同义，再看语义偏移，近义词就不容易混了。",
    };
  },
};
