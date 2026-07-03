import {
  createChemistryCard,
  createChemistryTeachingItems,
} from "../shared/chemistry-language-plugin-base.mjs";
import { buildLabDeviceWorkflowModel } from "../shared/chemistry-experiment-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    const model = buildLabDeviceWorkflowModel(params);
    const {
      coreDevice,
      sequence,
      riskTip,
      studentSummary,
    } = model.derived;

    return {
      derived: model.derived,
      view: model.view,
      drawModel: model.drawModel,
      teachingModel: createChemistryTeachingItems([
        {
          title: "先认核心装置",
          value: coreDevice,
          badges: ["当前场景"],
          text: "实验基础最重要的第一步，不是背名字，而是知道每个装置在当前流程里负责什么。",
        },
        {
          title: "再走步骤链",
          value: sequence.join(" -> "),
          badges: ["流程意识"],
          text: studentSummary,
        },
      ]),
      explanationModel: [
        createChemistryCard(
          "当前模型",
          `${coreDevice}：${sequence.join(" -> ")}`,
          "把装置分工和步骤顺序放在一起，孩子才会明白为什么“图会认、题不会做”其实是因为流程感没建立起来。",
          "实验题最怕只认图形，不去追问每一步为什么排在这个位置。",
        ),
        createChemistryCard(
          "图像怎么读",
          riskTip,
          "每个节点代表一步关键操作，箭头表示顺序，顶部提醒核心装置，底部提醒最容易出错的风险点。",
          "如果只背“注意事项”，不把它挂回流程节点，出错原因依然会模糊。",
          true,
        ),
        createChemistryCard(
          "给孩子的解释",
          studentSummary,
          "建议每次都让孩子先口头复述流程，再指出哪一步最容易错、错了会怎样，实验题的过程感会提升得很快。",
          "当孩子能自己解释顺序而不是只会背顺序，实验装置这一块才算真正懂了。",
        ),
      ],
      message: "先把实验讲成一条流程，再去认装置和风险点，装置题会更容易拿分。",
    };
  },
};
