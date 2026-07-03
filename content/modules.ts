import type { Module } from "@/lib/content/types";

export const modules: Module[] = [
  {
    "id": "math-functions",
    "subjectId": "math",
    "slug": "functions",
    "title": "函数与图像",
    "summary": "用参数拖动、图像变化和示例切换，帮助孩子把函数表达式和图像性质对应起来。",
    "highlights": [
      "一次函数",
      "二次函数",
      "反比例函数",
      "幂函数",
      "函数变换"
    ],
    "order": 1,
    "status": "migrating"
  },
  {
    "id": "math-trigonometry",
    "subjectId": "math",
    "slug": "trigonometry",
    "title": "三角函数与周期模型",
    "summary": "把单位圆、函数值、图像和周期现象串起来，让三角函数不再只是公式。",
    "highlights": [
      "sin(x) 图像",
      "cos(x) 图像",
      "tan(x) 间断",
      "振幅与周期"
    ],
    "order": 2,
    "status": "migrating"
  },
  {
    "id": "math-sequences",
    "subjectId": "math",
    "slug": "sequences",
    "title": "数列与递推模型",
    "summary": "用逐项生成和图像对比，让等差、等比和递推变化过程可视化。",
    "highlights": [
      "等差数列",
      "等比数列",
      "递推生成"
    ],
    "order": 3,
    "status": "migrating"
  },
  {
    "id": "math-analytic-geometry",
    "subjectId": "math",
    "slug": "analytic-geometry",
    "title": "解析几何",
    "summary": "把直线、圆和曲线的方程变化，直接映射成位置和形状变化。",
    "highlights": [
      "圆的标准方程",
      "直线与圆",
      "点到直线距离",
      "抛物线",
      "椭圆",
      "双曲线",
      "圆锥曲线总览",
      "直线与圆锥曲线"
    ],
    "order": 4,
    "status": "migrating"
  },
  {
    "id": "math-solid-geometry",
    "subjectId": "math",
    "slug": "solid-geometry",
    "title": "立体几何",
    "summary": "通过旋转、截面和视角切换，降低空间想象的门槛。",
    "highlights": [
      "几何体旋转",
      "截面变化",
      "空间关系"
    ],
    "order": 5,
    "status": "migrating"
  },
  {
    "id": "math-sets-logic",
    "subjectId": "math",
    "slug": "sets-logic",
    "title": "集合与逻辑",
    "summary": "先把高中数学里的集合语言讲清楚，再把交并补和韦恩图变成可以直接看懂的空间关系。",
    "highlights": [
      "集合基础概念",
      "交并补",
      "韦恩图",
      "子集与真子集"
    ],
    "order": 6,
    "status": "migrating"
  },
  {
    "id": "physics-motion",
    "subjectId": "physics",
    "slug": "motion",
    "title": "运动与图像",
    "summary": "先把位移、速度、时间和图像之间的关系讲清楚，再把追及、自由落体和平抛运动都拉回过程理解。",
    "highlights": [
      "位移-时间图像",
      "速度-时间图像",
      "追及问题",
      "自由落体",
      "平抛运动"
    ],
    "order": 1,
    "status": "migrating"
  },
  {
    "id": "physics-force",
    "subjectId": "physics",
    "slug": "force",
    "title": "力与受力分析",
    "summary": "把受力、合力和运动状态变化连起来，再把平衡、摩擦、斜面、连接体和超重失重都讲成因果过程。",
    "highlights": [
      "受力分析",
      "力的合成",
      "摩擦力",
      "斜面",
      "连接体",
      "牛顿第二定律"
    ],
    "order": 2,
    "status": "migrating"
  },
  {
    "id": "physics-electricity",
    "subjectId": "physics",
    "slug": "electricity",
    "title": "电学与电路",
    "summary": "把电流、电压、电阻和串并联规律放到同一个结构里，帮助孩子减少纯符号记忆。",
    "highlights": [
      "串联与并联",
      "欧姆定律",
      "电路比较",
      "变量联动"
    ],
    "order": 3,
    "status": "migrating"
  },
  {
    "id": "physics-energy",
    "subjectId": "physics",
    "slug": "energy",
    "title": "功与能量",
    "summary": "把做功、能量变化和速度变化重新连回同一个过程，让孩子看懂功能量法为什么能统领高一综合题。",
    "highlights": [
      "功与功率",
      "动能定理",
      "机械能守恒",
      "能量转化",
      "综合应用"
    ],
    "order": 4,
    "status": "migrating"
  },
  {
    "id": "physics-wave",
    "subjectId": "physics",
    "slug": "wave",
    "title": "振动与波动",
    "summary": "用图像和过程视角把振动、周期、波的传播和相位关系整理成容易复盘的学习入口。",
    "highlights": [
      "简谐振动",
      "周期",
      "波的传播",
      "相位差"
    ],
    "order": 5,
    "status": "migrating"
  },
  {
    "id": "chemistry-chemical-language",
    "subjectId": "chemistry",
    "slug": "chemical-language",
    "title": "化学语言与定量基础",
    "summary": "把物质分类、分散系和物质的量这些最基础但最容易抽象化的化学语言重新讲成可以看懂的结构关系。",
    "highlights": [
      "物质分类",
      "分散系",
      "胶体",
      "物质的量"
    ],
    "order": 1,
    "status": "migrating"
  },
  {
    "id": "chemistry-reaction-principles",
    "subjectId": "chemistry",
    "slug": "reaction-principles",
    "title": "反应原理与粒子变化",
    "summary": "把离子反应、氧化还原和电子转移放回粒子层面，帮助孩子看懂反应不只是写方程式。",
    "highlights": [
      "离子反应",
      "电解质",
      "氧化还原",
      "电子转移"
    ],
    "order": 2,
    "status": "migrating"
  },
  {
    "id": "chemistry-elements-compounds",
    "subjectId": "chemistry",
    "slug": "elements-compounds",
    "title": "元素化合物",
    "summary": "把钠、氯、铁及其化合物的结构、转化与现象整理成链路，帮助孩子不再零散记忆。",
    "highlights": [
      "钠及其化合物",
      "氯及其化合物",
      "铁及其化合物",
      "转化关系"
    ],
    "order": 3,
    "status": "migrating"
  },
  {
    "id": "chemistry-experiments",
    "subjectId": "chemistry",
    "slug": "experiments",
    "title": "化学实验与现象",
    "summary": "把实验装置、操作步骤、离子检验和现象解释放回同一页面里，帮助孩子建立实验过程感。",
    "highlights": [
      "实验装置",
      "操作步骤",
      "离子检验",
      "现象解释"
    ],
    "order": 4,
    "status": "migrating"
  },
  {
    "id": "english-sentence-structure",
    "subjectId": "english",
    "slug": "sentence-structure",
    "title": "句子结构与语法拆解",
    "summary": "把主谓宾、定状补、从句层级、长难句压缩、阅读信息分层、时态时间轴、非谓语结构、阅读题型路径和听力抓点流程讲成结构树与依附链，帮助孩子真正看懂句子、语篇和做题路径在怎样组织信息。",
    "highlights": [
      "主谓宾",
      "阅读分层",
      "听力抓点",
      "题型路径"
    ],
    "order": 1,
    "status": "migrating"
  },
  {
    "id": "english-roots-vocabulary-network",
    "subjectId": "english",
    "slug": "roots-vocabulary-network",
    "title": "词根词缀与词汇网络",
    "summary": "把词根、前缀、后缀、同根词、教材高频词族、近义词语义坐标、逻辑连接词网络、语法填空策略、写作句型升级路径和段落展开结构重新组织成表达网络，帮助孩子从结构角度记词、造句和解题。",
    "highlights": [
      "词根归类",
      "逻辑连接",
      "语法填空",
      "段落展开"
    ],
    "order": 2,
    "status": "migrating"
  }
];
