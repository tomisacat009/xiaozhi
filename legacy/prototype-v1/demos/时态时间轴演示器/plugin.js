import { buildTenseTimelineModel } from "../shared/english-sentence-plugin-base.mjs";

function card(title, conclusion, observation, warning, highlight = false) {
  return { title, conclusion, observation, warning, highlight };
}

function item(title, value, badges, text) {
  return { title, value, badges, text };
}

export const plugin = {
  build({ params }) {
    const model = buildTenseTimelineModel(params);
    const {
      coreMeaning,
      timeHint,
      sentenceText,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: [
        item("先抓时间关系", coreMeaning, ["时态核心"], "先说清动作在时间轴上哪里，再去记名称和形式。"),
        item("再看当前关注点", timeHint, ["时间轴思维"], studentSummary),
      ],
      explanationModel: [
        card(
          "当前句子",
          sentenceText,
          "时态最容易学乱，是因为孩子常常只看到动词形式变化，没有看到它在表达什么时间关系。",
          "如果只背规则，不放回时间轴，时态题和阅读中的时间判断都会很不稳定。",
        ),
        card(
          "图像怎么读",
          coreMeaning,
          "时间轴上的节点表示动作起点、观察点和现在结果，不同箭头表示动作推进、结果保留或过程展开。",
          "孩子常见误区是把过去发生过和现在仍有影响混成一类。",
          true,
        ),
        card(
          "给孩子的解释",
          studentSummary,
          "建议每次先用中文说出时间关系，再回去看动词形式，理解会比硬背规则稳得多。",
          "当孩子能先画出时间线，再选时态，准确率会提升很明显。",
        ),
      ],
      message: "先看时间轴，再记时态名称，时态就不容易混了。",
    };
  },
};
