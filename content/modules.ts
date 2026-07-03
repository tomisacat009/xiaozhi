import type { Module } from "@/lib/content/types";

export const modules: Module[] = [
  {
    id: "math-functions",
    subjectId: "math",
    slug: "functions",
    title: "函数",
    summary: "覆盖函数概念、图像变化与典型模型识别。",
    highlights: ["一次函数", "二次函数", "函数图像"],
    order: 1,
  },
  {
    id: "physics-motion",
    subjectId: "physics",
    slug: "motion",
    title: "运动学",
    summary: "建立位移、速度、加速度之间的统一理解。",
    highlights: ["匀速运动", "匀变速运动", "运动图像"],
    order: 1,
  },
  {
    id: "chemistry-language",
    subjectId: "chemistry",
    slug: "chemical-language",
    title: "化学用语",
    summary: "梳理化学式、离子方程式与反应表达规范。",
    highlights: ["化学式", "离子方程式", "化学方程式"],
    order: 1,
  },
  {
    id: "english-sentence",
    subjectId: "english",
    slug: "sentence-structure",
    title: "句子结构",
    summary: "帮助学生快速识别句子主干与修饰层次。",
    highlights: ["句子成分", "长难句分析", "从句层级"],
    order: 1,
  },
];
