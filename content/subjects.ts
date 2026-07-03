import type { Subject } from "@/lib/content/types";

export const subjects: Subject[] = [
  {
    id: "math",
    slug: "math",
    nameZh: "数学",
    nameEn: "Mathematics",
    summary: "围绕函数、几何与数列建立可视化认知框架。",
    theme: "sunrise",
  },
  {
    id: "physics",
    slug: "physics",
    nameZh: "物理",
    nameEn: "Physics",
    summary: "把运动、受力与能量规律拆解为可推演的模型。",
    theme: "marine",
  },
  {
    id: "chemistry",
    slug: "chemistry",
    nameZh: "化学",
    nameEn: "Chemistry",
    summary: "从物质结构到反应规律，串联核心概念网络。",
    theme: "leaf",
  },
  {
    id: "english",
    slug: "english",
    nameZh: "英语",
    nameEn: "English",
    summary: "聚焦词汇规律、句法结构与真实语篇理解。",
    theme: "plum",
  },
];
