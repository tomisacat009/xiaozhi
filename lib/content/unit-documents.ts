import type { KnowledgeUnitMeta } from "@/lib/content/types";

const processSectionHeadings = [
  "## 迁移说明",
  "## 交互演示迁移线索",
  "## 后续重构方向",
];

export function stripProcessSections(source: string) {
  const lines = source.split("\n");
  const sanitized: string[] = [];
  let skipping = false;

  for (const line of lines) {
    const trimmed = line.trim();
    const startsProcessSection = processSectionHeadings.includes(trimmed);
    const startsPeerSection = /^##\s+/.test(trimmed);

    if (startsProcessSection) {
      skipping = true;
      continue;
    }

    if (skipping && startsPeerSection) {
      skipping = false;
    }

    if (!skipping) {
      sanitized.push(line);
    }
  }

  return sanitized.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function buildFallbackUnitBody(unitMeta: KnowledgeUnitMeta, moduleTitle: string) {
  const learningGoals = unitMeta.learningGoals
    .map((goal) => `- ${goal}`)
    .join("\n");
  const takeaways = unitMeta.coreTakeaways
    .map((takeaway) => `- ${takeaway}`)
    .join("\n");

  return [
    "## 这个知识点在解决什么",
    "",
    learningGoals || `- 建立对“${unitMeta.title}”的整体理解`,
    "",
    "## 单元定位",
    "",
    `${unitMeta.title} 属于「${moduleTitle}」模块，重点是把概念、关系和变化规律重新连回可观察的学习过程。`,
    `${unitMeta.summary} 学习时建议先理解图形或结构变化，再回到公式、结论和题型应用。`,
    "",
    "## 学完后要带走什么",
    "",
    takeaways || `- 能用自己的话说明 ${unitMeta.title} 的核心规律`,
  ].join("\n");
}
