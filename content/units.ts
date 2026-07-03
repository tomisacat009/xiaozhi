import type { KnowledgeUnitMeta } from "@/lib/content/types";

export const knowledgeUnits: KnowledgeUnitMeta[] = [
  {
    "id": "math-quadratic",
    "subjectId": "math",
    "moduleId": "math-functions",
    "slug": "quadratic",
    "title": "二次函数变化",
    "titleEn": null,
    "summary": "看懂 a、b、c 与顶点式参数如何共同改变图像、顶点、对称轴和开口。",
    "order": 1,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [
      "参数与图像联动",
      "一般式和顶点式切换",
      "顶点与对称轴理解"
    ],
    "coreTakeaways": [],
    "keywords": [
      "二次函数变化",
      "functions"
    ],
    "relatedUnits": [],
    "demoIds": [
      "函数变化演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-quadratic.html"
  },
  {
    "id": "math-linear",
    "subjectId": "math",
    "moduleId": "math-functions",
    "slug": "linear",
    "title": "一次函数变化",
    "titleEn": null,
    "summary": "理解斜率与截距，建立参数变化驱动图像变化的第一层感觉。",
    "order": 2,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "一次函数变化",
      "functions"
    ],
    "relatedUnits": [],
    "demoIds": [
      "一次函数演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-linear.html"
  },
  {
    "id": "math-reciprocal",
    "subjectId": "math",
    "moduleId": "math-functions",
    "slug": "reciprocal",
    "title": "反比例函数变化",
    "titleEn": null,
    "summary": "把象限、渐近线和双曲线开口变化放到一张图里，建立反比例函数的整体感觉。",
    "order": 3,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "反比例函数变化",
      "functions"
    ],
    "relatedUnits": [],
    "demoIds": [
      "反比例函数演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-reciprocal.html"
  },
  {
    "id": "math-exp-log",
    "subjectId": "math",
    "moduleId": "math-functions",
    "slug": "exp-log",
    "title": "指数函数与对数函数对比",
    "titleEn": null,
    "summary": "看懂底数变化、增长速度和互逆关系。",
    "order": 4,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "指数函数与对数函数对比",
      "functions"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-exp-log.html"
  },
  {
    "id": "math-power",
    "subjectId": "math",
    "moduleId": "math-functions",
    "slug": "power",
    "title": "幂函数与图像变化",
    "titleEn": null,
    "summary": "对比奇次幂、偶次幂和分数指数，建立幂函数图像的第一层整体感。",
    "order": 5,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "幂函数与图像变化",
      "functions"
    ],
    "relatedUnits": [],
    "demoIds": [
      "幂函数演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-power.html"
  },
  {
    "id": "math-transform-review",
    "subjectId": "math",
    "moduleId": "math-functions",
    "slug": "transform-review",
    "title": "函数平移与伸缩总复习",
    "titleEn": null,
    "summary": "把上下平移、左右平移和伸缩变化放到一张图里统一理解。",
    "order": 6,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "函数平移与伸缩总复习",
      "functions"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-transform-review.html"
  },
  {
    "id": "math-sin-basic",
    "subjectId": "math",
    "moduleId": "math-trigonometry",
    "slug": "sin-basic",
    "title": "sin(x) 基础图像",
    "titleEn": null,
    "summary": "把单位圆上的点、正弦值和图像生成过程连起来。",
    "order": 7,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "sin(x) 基础图像",
      "trigonometry"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-sin-basic.html"
  },
  {
    "id": "math-sin-transform",
    "subjectId": "math",
    "moduleId": "math-trigonometry",
    "slug": "sin-transform",
    "title": "三角函数参数变化",
    "titleEn": null,
    "summary": "看懂振幅、周期、相位和平移变化。",
    "order": 8,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "三角函数参数变化",
      "trigonometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "三角函数参数演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-sin-transform.html"
  },
  {
    "id": "math-cos-basic",
    "subjectId": "math",
    "moduleId": "math-trigonometry",
    "slug": "cos-basic",
    "title": "余弦函数基础图像",
    "titleEn": null,
    "summary": "把单位圆横坐标和余弦图像连起来，看清它与正弦函数的差异。",
    "order": 9,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "余弦函数基础图像",
      "trigonometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "余弦函数演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-cos-basic.html"
  },
  {
    "id": "math-tan-basic",
    "subjectId": "math",
    "moduleId": "math-trigonometry",
    "slug": "tan-basic",
    "title": "正切函数与间断感知",
    "titleEn": null,
    "summary": "直观看到渐近线、间断点和正切函数的周期变化。",
    "order": 10,
    "difficulty": "进阶",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "正切函数与间断感知",
      "trigonometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "正切函数演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-tan-basic.html"
  },
  {
    "id": "math-sequences-basic",
    "subjectId": "math",
    "moduleId": "math-sequences",
    "slug": "sequences-basic",
    "title": "等差与等比数列生成过程",
    "titleEn": null,
    "summary": "用逐项生成展示线性增长和指数增长的差别。",
    "order": 11,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "等差与等比数列生成过程",
      "sequences"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-sequences-basic.html"
  },
  {
    "id": "math-sequence-recursive",
    "subjectId": "math",
    "moduleId": "math-sequences",
    "slug": "sequence-recursive",
    "title": "递推数列生成过程",
    "titleEn": null,
    "summary": "把后一项由前一项推出来的过程直接画出来，帮助孩子形成递推数列的生成感。",
    "order": 12,
    "difficulty": "进阶",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "递推数列生成过程",
      "sequences"
    ],
    "relatedUnits": [],
    "demoIds": [
      "递推数列演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-sequence-recursive.html"
  },
  {
    "id": "math-line-circle",
    "subjectId": "math",
    "moduleId": "math-analytic-geometry",
    "slug": "line-circle",
    "title": "直线与圆的位置关系",
    "titleEn": null,
    "summary": "把相交、相切、相离和方程条件连接起来。",
    "order": 13,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "直线与圆的位置关系",
      "analytic-geometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "直线与圆演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-line-circle.html"
  },
  {
    "id": "math-circle-standard",
    "subjectId": "math",
    "moduleId": "math-analytic-geometry",
    "slug": "circle-standard",
    "title": "圆的标准方程与图像",
    "titleEn": null,
    "summary": "让圆心、半径和标准方程同步变化，建立方程到图像的直接映射。",
    "order": 14,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "圆的标准方程与图像",
      "analytic-geometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "圆的标准方程演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-circle-standard.html"
  },
  {
    "id": "math-parabola-standard",
    "subjectId": "math",
    "moduleId": "math-analytic-geometry",
    "slug": "parabola-standard",
    "title": "抛物线标准方程与开口变化",
    "titleEn": null,
    "summary": "把开口方向、焦点、准线和标准方程同步展示，帮助孩子形成抛物线的图像语言。",
    "order": 15,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "抛物线标准方程与开口变化",
      "analytic-geometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "抛物线标准方程演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-parabola-standard.html"
  },
  {
    "id": "math-ellipse-standard",
    "subjectId": "math",
    "moduleId": "math-analytic-geometry",
    "slug": "ellipse-standard",
    "title": "椭圆标准方程与长短轴变化",
    "titleEn": null,
    "summary": "把长轴、短轴、焦点和离心率一起联动，帮助孩子形成椭圆整体结构感。",
    "order": 16,
    "difficulty": "进阶",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "椭圆标准方程与长短轴变化",
      "analytic-geometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "椭圆标准方程演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-ellipse-standard.html"
  },
  {
    "id": "math-hyperbola-standard",
    "subjectId": "math",
    "moduleId": "math-analytic-geometry",
    "slug": "hyperbola-standard",
    "title": "双曲线标准方程与渐近线变化",
    "titleEn": null,
    "summary": "把开口方向、焦点、渐近线和标准方程同步展示，帮助孩子形成双曲线的整体图像语言。",
    "order": 17,
    "difficulty": "进阶",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "双曲线标准方程与渐近线变化",
      "analytic-geometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "双曲线标准方程演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-hyperbola-standard.html"
  },
  {
    "id": "math-conic-overview",
    "subjectId": "math",
    "moduleId": "math-analytic-geometry",
    "slug": "conic-overview",
    "title": "圆锥曲线总览与对比",
    "titleEn": null,
    "summary": "把抛物线、椭圆、双曲线放到同一套视角里统一比较，帮助孩子搭建圆锥曲线整体框架。",
    "order": 18,
    "difficulty": "进阶",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "圆锥曲线总览与对比",
      "analytic-geometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "圆锥曲线总览演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-conic-overview.html"
  },
  {
    "id": "math-line-conic-relation",
    "subjectId": "math",
    "moduleId": "math-analytic-geometry",
    "slug": "line-conic-relation",
    "title": "直线与圆锥曲线位置关系",
    "titleEn": null,
    "summary": "用一条水平直线统一比较它与抛物线、椭圆、双曲线的相离、相切、相交变化。",
    "order": 19,
    "difficulty": "进阶",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "直线与圆锥曲线位置关系",
      "analytic-geometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "直线与圆锥曲线位置关系演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-line-conic-relation.html"
  },
  {
    "id": "math-point-line-distance",
    "subjectId": "math",
    "moduleId": "math-analytic-geometry",
    "slug": "point-line-distance",
    "title": "点到直线距离的图形理解",
    "titleEn": null,
    "summary": "用垂足和最短线段把距离公式背后的图形意义讲清楚。",
    "order": 20,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "点到直线距离的图形理解",
      "analytic-geometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "点到直线距离演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-point-line-distance.html"
  },
  {
    "id": "math-solid-section",
    "subjectId": "math",
    "moduleId": "math-solid-geometry",
    "slug": "solid-section",
    "title": "立体几何体与截面变化",
    "titleEn": null,
    "summary": "通过空间旋转和切割，帮助孩子建立几何体的内部想象。",
    "order": 21,
    "difficulty": "进阶",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "立体几何体与截面变化",
      "solid-geometry"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-solid-section.html"
  },
  {
    "id": "math-solid-rotation",
    "subjectId": "math",
    "moduleId": "math-solid-geometry",
    "slug": "solid-rotation",
    "title": "旋转体生成过程",
    "titleEn": null,
    "summary": "把平面图形旋转生成圆柱、圆锥、球的过程直接展示出来，帮助孩子建立二维到三维的过渡直觉。",
    "order": 22,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "旋转体生成过程",
      "solid-geometry"
    ],
    "relatedUnits": [],
    "demoIds": [
      "旋转体生成演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-solid-rotation.html"
  },
  {
    "id": "math-sets-basics",
    "subjectId": "math",
    "moduleId": "math-sets-logic",
    "slug": "sets-basics",
    "title": "集合基础概念",
    "titleEn": null,
    "summary": "用对象归类和集合框高亮，把元素、属于、不属于、子集、真子集和空集先看懂。",
    "order": 23,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "集合基础概念",
      "sets-logic"
    ],
    "relatedUnits": [],
    "demoIds": [
      "集合基础概念演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-sets-basics.html"
  },
  {
    "id": "math-set-operations",
    "subjectId": "math",
    "moduleId": "math-sets-logic",
    "slug": "set-operations",
    "title": "集合运算与韦恩图",
    "titleEn": null,
    "summary": "把交集、并集、补集和韦恩图区域一一对应起来，先建立图像直觉再过渡到符号表达。",
    "order": 24,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "集合运算与韦恩图",
      "sets-logic"
    ],
    "relatedUnits": [],
    "demoIds": [
      "集合运算与韦恩图演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-set-operations.html"
  },
  {
    "id": "physics-physics-uniform-motion",
    "subjectId": "physics",
    "moduleId": "physics-motion",
    "slug": "physics-uniform-motion",
    "title": "匀速直线运动与图像",
    "titleEn": null,
    "summary": "把位移、速度和时间放回同一张图里，帮助孩子建立匀速运动的最基础过程感。",
    "order": 1,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "匀速直线运动与图像",
      "motion"
    ],
    "relatedUnits": [],
    "demoIds": [
      "匀速直线运动演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-uniform-motion.html"
  },
  {
    "id": "physics-physics-accelerated-motion",
    "subjectId": "physics",
    "moduleId": "physics-motion",
    "slug": "physics-accelerated-motion",
    "title": "匀变速直线运动与图像",
    "titleEn": null,
    "summary": "把速度变化、斜率含义和位移积累连起来，帮助孩子看懂匀变速运动不是“多一个公式”。",
    "order": 2,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "匀变速直线运动与图像",
      "motion"
    ],
    "relatedUnits": [],
    "demoIds": [
      "匀变速直线运动演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-accelerated-motion.html"
  },
  {
    "id": "physics-physics-uniform-chase",
    "subjectId": "physics",
    "moduleId": "physics-motion",
    "slug": "physics-uniform-chase",
    "title": "两车匀速追及",
    "titleEn": null,
    "summary": "把前车、后车、起点差和速度差放回同一张图里，让孩子真正看懂什么时候追上、为什么追上。",
    "order": 3,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "两车匀速追及",
      "motion"
    ],
    "relatedUnits": [],
    "demoIds": [
      "两车匀速追及演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-uniform-chase.html"
  },
  {
    "id": "physics-physics-mixed-chase",
    "subjectId": "physics",
    "moduleId": "physics-motion",
    "slug": "physics-mixed-chase",
    "title": "匀速与匀变速追及",
    "titleEn": null,
    "summary": "把前车匀速与后车加速放回同一张图像里，让孩子看懂后车为什么可能“先慢后追上”。",
    "order": 4,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "匀速与匀变速追及",
      "motion"
    ],
    "relatedUnits": [],
    "demoIds": [
      "匀速与匀变速追及演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-mixed-chase.html"
  },
  {
    "id": "physics-physics-free-fall",
    "subjectId": "physics",
    "moduleId": "physics-motion",
    "slug": "physics-free-fall",
    "title": "自由落体",
    "titleEn": null,
    "summary": "把速度变化、位移累计和剩余高度统一到同一张图里，帮助孩子把自由落体看成连续过程。",
    "order": 5,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "自由落体",
      "motion"
    ],
    "relatedUnits": [],
    "demoIds": [
      "自由落体演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-free-fall.html"
  },
  {
    "id": "physics-physics-projectile-motion",
    "subjectId": "physics",
    "moduleId": "physics-motion",
    "slug": "physics-projectile-motion",
    "title": "平抛运动",
    "titleEn": null,
    "summary": "把水平方向匀速、竖直方向自由落体和合成轨迹放回同一视角，帮助孩子看懂平抛不是“两套公式硬拼”。",
    "order": 6,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "平抛运动",
      "motion"
    ],
    "relatedUnits": [],
    "demoIds": [
      "平抛运动演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-projectile-motion.html"
  },
  {
    "id": "physics-physics-motion-graphs",
    "subjectId": "physics",
    "moduleId": "physics-motion",
    "slug": "physics-motion-graphs",
    "title": "运动图像综合判读",
    "titleEn": null,
    "summary": "把 s-t 图像、v-t 图像和现实运动过程重新对应起来，帮助孩子减少“看图不会讲过程”的断层。",
    "order": 7,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "运动图像综合判读",
      "motion"
    ],
    "relatedUnits": [],
    "demoIds": [
      "运动图像综合判读演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-motion-graphs.html"
  },
  {
    "id": "physics-physics-force-composition",
    "subjectId": "physics",
    "moduleId": "physics-force",
    "slug": "physics-force-composition",
    "title": "力的合成与分解",
    "titleEn": null,
    "summary": "把多个力的方向与大小重新变成图形叠加关系，减少纯向量符号带来的抽象感。",
    "order": 8,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "力的合成与分解",
      "force"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-force-composition.html"
  },
  {
    "id": "physics-physics-newton-second-law",
    "subjectId": "physics",
    "moduleId": "physics-force",
    "slug": "physics-newton-second-law",
    "title": "牛顿第二定律的变量关系",
    "titleEn": null,
    "summary": "把合力、质量、加速度三者如何联动说清楚，帮助孩子建立最关键的因果框架。",
    "order": 9,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "牛顿第二定律的变量关系",
      "force"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-newton-second-law.html"
  },
  {
    "id": "physics-physics-force-balance",
    "subjectId": "physics",
    "moduleId": "physics-force",
    "slug": "physics-force-balance",
    "title": "共点力平衡与受力平衡",
    "titleEn": null,
    "summary": "把多个力的方向与大小重新放回同一张受力图里，让孩子看懂“平衡”到底意味着什么。",
    "order": 10,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "共点力平衡与受力平衡",
      "force"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-force-balance.html"
  },
  {
    "id": "physics-physics-friction",
    "subjectId": "physics",
    "moduleId": "physics-force",
    "slug": "physics-friction",
    "title": "摩擦力与临界状态",
    "titleEn": null,
    "summary": "把静摩擦、滑动摩擦和临界将动未动放回同一过程里，降低“总记不住方向和大小”的门槛。",
    "order": 11,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "摩擦力与临界状态",
      "force"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-friction.html"
  },
  {
    "id": "physics-physics-incline-motion",
    "subjectId": "physics",
    "moduleId": "physics-force",
    "slug": "physics-incline-motion",
    "title": "斜面受力与运动",
    "titleEn": null,
    "summary": "把重力分解、支持力、摩擦力和沿斜面运动结果放回一张图里，帮助孩子把斜面题重新讲顺。",
    "order": 12,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "斜面受力与运动",
      "force"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-incline-motion.html"
  },
  {
    "id": "physics-physics-connected-bodies",
    "subjectId": "physics",
    "moduleId": "physics-force",
    "slug": "physics-connected-bodies",
    "title": "连接体受力与整体隔离",
    "titleEn": null,
    "summary": "把整体法与隔离法放回同一组连接体场景里，帮助孩子看懂什么时候该一起看、什么时候该拆开看。",
    "order": 13,
    "difficulty": "进阶",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "连接体受力与整体隔离",
      "force"
    ],
    "relatedUnits": [],
    "demoIds": [
      "连接体受力演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-connected-bodies.html"
  },
  {
    "id": "physics-physics-overweight-weightlessness",
    "subjectId": "physics",
    "moduleId": "physics-force",
    "slug": "physics-overweight-weightlessness",
    "title": "超重与失重",
    "titleEn": null,
    "summary": "把支持力变化、加速度方向和体感变化重新连起来，帮助孩子真正理解“重力没变，为什么感觉变了”。",
    "order": 14,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "超重与失重",
      "force"
    ],
    "relatedUnits": [],
    "demoIds": [
      "超重与失重演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-overweight-weightlessness.html"
  },
  {
    "id": "physics-physics-work-power",
    "subjectId": "physics",
    "moduleId": "physics-energy",
    "slug": "physics-work-power",
    "title": "功与功率",
    "titleEn": null,
    "summary": "把力、位移、时间和能量转移关系放回同一过程里，帮助孩子理解“做功不是单纯乘法”。",
    "order": 15,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "功与功率",
      "energy"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-work-power.html"
  },
  {
    "id": "physics-physics-kinetic-energy",
    "subjectId": "physics",
    "moduleId": "physics-energy",
    "slug": "physics-kinetic-energy",
    "title": "动能定理",
    "titleEn": null,
    "summary": "把合外力做功和速度变化重新连起来，让孩子看懂动能定理为什么能跨过复杂受力过程。",
    "order": 16,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "动能定理",
      "energy"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-kinetic-energy.html"
  },
  {
    "id": "physics-physics-mechanical-energy",
    "subjectId": "physics",
    "moduleId": "physics-energy",
    "slug": "physics-mechanical-energy",
    "title": "机械能守恒",
    "titleEn": null,
    "summary": "把重力势能、动能和转化过程放回同一视角，帮助孩子理解“守恒”不是一句口号。",
    "order": 17,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "机械能守恒",
      "energy"
    ],
    "relatedUnits": [],
    "demoIds": [
      "机械能守恒演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-mechanical-energy.html"
  },
  {
    "id": "physics-physics-work-energy-synthesis",
    "subjectId": "physics",
    "moduleId": "physics-energy",
    "slug": "physics-work-energy-synthesis",
    "title": "功能量综合应用",
    "titleEn": null,
    "summary": "把功、动能定理、机械能守恒放到同一框架里比较，帮助孩子判断综合题该优先选哪种能量方法。",
    "order": 18,
    "difficulty": "进阶",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "功能量综合应用",
      "energy"
    ],
    "relatedUnits": [],
    "demoIds": [
      "功能量综合应用演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-work-energy-synthesis.html"
  },
  {
    "id": "physics-physics-series-parallel",
    "subjectId": "physics",
    "moduleId": "physics-electricity",
    "slug": "physics-series-parallel",
    "title": "串联与并联电路对比",
    "titleEn": null,
    "summary": "把电流、电压、电阻在串并联里的分配差异放在同一视角中比较。",
    "order": 19,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "串联与并联电路对比",
      "electricity"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-series-parallel.html"
  },
  {
    "id": "physics-physics-ohms-law",
    "subjectId": "physics",
    "moduleId": "physics-electricity",
    "slug": "physics-ohms-law",
    "title": "欧姆定律与伏安关系",
    "titleEn": null,
    "summary": "把电压、电流、电阻之间的定量关系拉回到图像和变化过程里理解。",
    "order": 20,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "欧姆定律与伏安关系",
      "electricity"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-ohms-law.html"
  },
  {
    "id": "physics-physics-vibration",
    "subjectId": "physics",
    "moduleId": "physics-wave",
    "slug": "physics-vibration",
    "title": "简谐振动的周期与图像",
    "titleEn": null,
    "summary": "帮助孩子把位移、振幅、周期和往返过程对应起来，而不是只记定义。",
    "order": 21,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "简谐振动的周期与图像",
      "wave"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-vibration.html"
  },
  {
    "id": "physics-physics-wave-propagation",
    "subjectId": "physics",
    "moduleId": "physics-wave",
    "slug": "physics-wave-propagation",
    "title": "波的传播与相位感知",
    "titleEn": null,
    "summary": "把波峰、波谷、传播方向和相位差放回动态过程里，降低“看图不会读”的门槛。",
    "order": 22,
    "difficulty": "进阶",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "波的传播与相位感知",
      "wave"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-physics-wave-propagation.html"
  },
  {
    "id": "chemistry-chemistry-material-classification",
    "subjectId": "chemistry",
    "moduleId": "chemistry-chemical-language",
    "slug": "chemistry-material-classification",
    "title": "物质分类与转化关系",
    "titleEn": null,
    "summary": "把纯净物、混合物、单质、化合物、酸碱盐等分类重新变成结构图和转化图，帮助孩子建立化学语言底座。",
    "order": 1,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "物质分类与转化关系",
      "chemical-language"
    ],
    "relatedUnits": [],
    "demoIds": [
      "物质分类演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-chemistry-material-classification.html"
  },
  {
    "id": "chemistry-chemistry-dispersion-colloid",
    "subjectId": "chemistry",
    "moduleId": "chemistry-chemical-language",
    "slug": "chemistry-dispersion-colloid",
    "title": "分散系与胶体",
    "titleEn": null,
    "summary": "把溶液、浊液、胶体及其微粒尺度差异重新放回同一视角里，帮助孩子看懂“为什么看起来像但本质不同”。",
    "order": 2,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "分散系与胶体",
      "chemical-language"
    ],
    "relatedUnits": [],
    "demoIds": [
      "分散系与胶体演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-chemistry-dispersion-colloid.html"
  },
  {
    "id": "chemistry-chemistry-mole",
    "subjectId": "chemistry",
    "moduleId": "chemistry-chemical-language",
    "slug": "chemistry-mole",
    "title": "物质的量与微粒关系",
    "titleEn": null,
    "summary": "把物质的量、微粒数、质量、气体体积这些量重新连成一张关系网，帮助孩子减少机械套算。",
    "order": 3,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "物质的量与微粒关系",
      "chemical-language"
    ],
    "relatedUnits": [],
    "demoIds": [
      "物质的量演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-chemistry-mole.html"
  },
  {
    "id": "chemistry-chemistry-ionic-reaction",
    "subjectId": "chemistry",
    "moduleId": "chemistry-reaction-principles",
    "slug": "chemistry-ionic-reaction",
    "title": "离子反应与电解质",
    "titleEn": null,
    "summary": "把电解质、离子拆分、离子共存和反应实质重新放回粒子层面理解。",
    "order": 4,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "离子反应与电解质",
      "reaction-principles"
    ],
    "relatedUnits": [],
    "demoIds": [
      "离子反应与电解质演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-chemistry-ionic-reaction.html"
  },
  {
    "id": "chemistry-chemistry-redox",
    "subjectId": "chemistry",
    "moduleId": "chemistry-reaction-principles",
    "slug": "chemistry-redox",
    "title": "氧化还原反应与电子转移",
    "titleEn": null,
    "summary": "把化合价变化、电子得失和氧化剂还原剂关系放回同一过程图里，帮助孩子看懂“谁变了、怎么变”。",
    "order": 5,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "氧化还原反应与电子转移",
      "reaction-principles"
    ],
    "relatedUnits": [],
    "demoIds": [
      "氧化还原反应演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-chemistry-redox.html"
  },
  {
    "id": "chemistry-chemistry-sodium",
    "subjectId": "chemistry",
    "moduleId": "chemistry-elements-compounds",
    "slug": "chemistry-sodium",
    "title": "钠及其化合物",
    "titleEn": null,
    "summary": "把金属钠、氧化钠、过氧化钠、氢氧化钠之间的转化、现象和用途串成一条主线。",
    "order": 6,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "钠及其化合物",
      "elements-compounds"
    ],
    "relatedUnits": [],
    "demoIds": [
      "钠及其化合物演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-chemistry-sodium.html"
  },
  {
    "id": "chemistry-chemistry-chlorine",
    "subjectId": "chemistry",
    "moduleId": "chemistry-elements-compounds",
    "slug": "chemistry-chlorine",
    "title": "氯及其化合物",
    "titleEn": null,
    "summary": "把氯气、盐酸、次氯酸和漂白作用等内容重新连成现象与微观变化对应链路。",
    "order": 7,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "氯及其化合物",
      "elements-compounds"
    ],
    "relatedUnits": [],
    "demoIds": [
      "氯及其化合物演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-chemistry-chlorine.html"
  },
  {
    "id": "chemistry-chemistry-iron",
    "subjectId": "chemistry",
    "moduleId": "chemistry-elements-compounds",
    "slug": "chemistry-iron",
    "title": "铁及其化合物",
    "titleEn": null,
    "summary": "把铁、亚铁、铁离子的颜色、转化和检验重新放到同一张关系图中，降低零散记忆负担。",
    "order": 8,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "铁及其化合物",
      "elements-compounds"
    ],
    "relatedUnits": [],
    "demoIds": [
      "铁及其化合物演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-chemistry-iron.html"
  },
  {
    "id": "chemistry-chemistry-lab-devices",
    "subjectId": "chemistry",
    "moduleId": "chemistry-experiments",
    "slug": "chemistry-lab-devices",
    "title": "化学实验基础与装置",
    "titleEn": null,
    "summary": "把常见仪器、实验装置、操作顺序和注意事项放回同一流程图中，帮助孩子建立实验过程感。",
    "order": 9,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "化学实验基础与装置",
      "experiments"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-chemistry-lab-devices.html"
  },
  {
    "id": "chemistry-chemistry-ion-identification",
    "subjectId": "chemistry",
    "moduleId": "chemistry-experiments",
    "slug": "chemistry-ion-identification",
    "title": "离子检验与实验现象",
    "titleEn": null,
    "summary": "把常见离子检验步骤、现象和结论放回同一张判断链路中，帮助孩子看懂“现象为什么能说明问题”。",
    "order": 10,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "离子检验与实验现象",
      "experiments"
    ],
    "relatedUnits": [],
    "demoIds": [
      "离子检验演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-chemistry-ion-identification.html"
  },
  {
    "id": "english-english-sentence-structure",
    "subjectId": "english",
    "moduleId": "english-sentence-structure",
    "slug": "english-sentence-structure",
    "title": "句子成分结构拆解",
    "titleEn": null,
    "summary": "把句子的主干、修饰成分和层级关系拆成可观察结构，帮助孩子真正理解每个成分在句子里做什么。",
    "order": 1,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "句子成分结构拆解",
      "sentence-structure"
    ],
    "relatedUnits": [],
    "demoIds": [
      "句子成分演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-sentence-structure.html"
  },
  {
    "id": "english-english-word-roots",
    "subjectId": "english",
    "moduleId": "english-roots-vocabulary-network",
    "slug": "english-word-roots",
    "title": "词根归类与词义扩展",
    "titleEn": null,
    "summary": "把高频词根、前后缀和同根词串成网络，帮助孩子从“记一个词”升级为“连一组词”。",
    "order": 2,
    "difficulty": "基础",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "词根归类与词义扩展",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-word-roots.html"
  },
  {
    "id": "english-english-clause-hierarchy",
    "subjectId": "english",
    "moduleId": "english-sentence-structure",
    "slug": "english-clause-hierarchy",
    "title": "从句层级拆解",
    "titleEn": null,
    "summary": "把主句、从句、连接词和句法作用拆成层级结构，帮助孩子看懂“这个从句在整句里到底相当于什么”。",
    "order": 3,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "从句层级拆解",
      "sentence-structure"
    ],
    "relatedUnits": [],
    "demoIds": [
      "从句层级演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-clause-hierarchy.html"
  },
  {
    "id": "english-english-affix-network",
    "subjectId": "english",
    "moduleId": "english-roots-vocabulary-network",
    "slug": "english-affix-network",
    "title": "前后缀变义网络",
    "titleEn": null,
    "summary": "把前缀、后缀与词根的组合变化做成可观察网络，帮助孩子看懂单词为什么会沿不同方向变义或变词性。",
    "order": 4,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "前后缀变义网络",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-affix-network.html"
  },
  {
    "id": "english-english-sentence-compression",
    "subjectId": "english",
    "moduleId": "english-sentence-structure",
    "slug": "english-sentence-compression",
    "title": "长难句主干压缩",
    "titleEn": null,
    "summary": "把让步、条件、时间和超长主语拆成附着层，帮助孩子先抓主干，再回挂修饰结构。",
    "order": 5,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "长难句主干压缩",
      "sentence-structure"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-sentence-compression.html"
  },
  {
    "id": "english-english-word-family-atlas",
    "subjectId": "english",
    "moduleId": "english-roots-vocabulary-network",
    "slug": "english-word-family-atlas",
    "title": "高频教材词族网络",
    "titleEn": null,
    "summary": "把 act、form 这类教材高频词族做成核心义扩展图，帮助孩子把零散单词重新归到同一词义家族。",
    "order": 6,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "高频教材词族网络",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-word-family-atlas.html"
  },
  {
    "id": "english-english-reading-layer",
    "subjectId": "english",
    "moduleId": "english-sentence-structure",
    "slug": "english-reading-layer",
    "title": "阅读信息分层",
    "titleEn": null,
    "summary": "把主旨、理由、细节和例子拆成信息层级，帮助孩子读文章时先抓重点，再处理支撑信息。",
    "order": 7,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "阅读信息分层",
      "sentence-structure"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-reading-layer.html"
  },
  {
    "id": "english-english-synonym-semantic-map",
    "subjectId": "english",
    "moduleId": "english-roots-vocabulary-network",
    "slug": "english-synonym-semantic-map",
    "title": "近义词语义坐标图",
    "titleEn": null,
    "summary": "把近义词放进语气、时间、力度与对象差异的坐标里，帮助孩子真正看懂它们为什么“像但不一样”。",
    "order": 8,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "近义词语义坐标图",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [],
    "demoIds": [
      "近义词语义坐标演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-synonym-semantic-map.html"
  },
  {
    "id": "english-english-tense-timeline",
    "subjectId": "english",
    "moduleId": "english-sentence-structure",
    "slug": "english-tense-timeline",
    "title": "语法时态时间轴",
    "titleEn": null,
    "summary": "把时态放回时间轴，帮助孩子看懂动作发生在哪里、关注点停在什么时候。",
    "order": 9,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "语法时态时间轴",
      "sentence-structure"
    ],
    "relatedUnits": [],
    "demoIds": [
      "时态时间轴演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-tense-timeline.html"
  },
  {
    "id": "english-english-logic-connector-map",
    "subjectId": "english",
    "moduleId": "english-roots-vocabulary-network",
    "slug": "english-logic-connector-map",
    "title": "逻辑连接词网络",
    "titleEn": null,
    "summary": "把转折、因果等高频逻辑连接词做成关系网，帮助孩子写作和阅读时先抓逻辑再选词。",
    "order": 10,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "逻辑连接词网络",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [],
    "demoIds": [
      "逻辑连接词网络演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-logic-connector-map.html"
  },
  {
    "id": "english-english-nonfinite-structure",
    "subjectId": "english",
    "moduleId": "english-sentence-structure",
    "slug": "english-nonfinite-structure",
    "title": "非谓语结构关系图",
    "titleEn": null,
    "summary": "把不定式、分词这些非谓语结构放回主句挂接关系里，帮助孩子看懂它是在补目的、伴随还是背景。",
    "order": 11,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "非谓语结构关系图",
      "sentence-structure"
    ],
    "relatedUnits": [],
    "demoIds": [
      "非谓语结构演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-nonfinite-structure.html"
  },
  {
    "id": "english-english-writing-upgrade-workshop",
    "subjectId": "english",
    "moduleId": "english-roots-vocabulary-network",
    "slug": "english-writing-upgrade-workshop",
    "title": "写作句型升级工坊",
    "titleEn": null,
    "summary": "把基础句一步步升级为更清楚、更自然的书面表达，帮助孩子从会写走向写得更好。",
    "order": 12,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "写作句型升级工坊",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [],
    "demoIds": [],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-writing-upgrade-workshop.html"
  },
  {
    "id": "english-english-reading-question-map",
    "subjectId": "english",
    "moduleId": "english-sentence-structure",
    "slug": "english-reading-question-map",
    "title": "阅读题型拆解演示器",
    "titleEn": null,
    "summary": "把主旨题、细节题的解题路径拆成步骤图，帮助孩子先分题型再走定位和排除流程。",
    "order": 13,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "阅读题型拆解演示器",
      "sentence-structure"
    ],
    "relatedUnits": [],
    "demoIds": [
      "阅读题型拆解演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-reading-question-map.html"
  },
  {
    "id": "english-english-writing-paragraph-workshop",
    "subjectId": "english",
    "moduleId": "english-roots-vocabulary-network",
    "slug": "english-writing-paragraph-workshop",
    "title": "作文段落展开工坊",
    "titleEn": null,
    "summary": "把一段话拆成主题句、支撑句、例子句和收束句，帮助孩子从会写句子走向会展开段落。",
    "order": 14,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "作文段落展开工坊",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [],
    "demoIds": [
      "段落展开工坊演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-writing-paragraph-workshop.html"
  },
  {
    "id": "english-english-listening-capture",
    "subjectId": "english",
    "moduleId": "english-sentence-structure",
    "slug": "english-listening-capture",
    "title": "听力信息捕捉流程图",
    "titleEn": null,
    "summary": "把听力里的场景判断、关键词、数字信息和速记路径拆成流程图，帮助孩子先抓点再补细节。",
    "order": 15,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "听力信息捕捉流程图",
      "sentence-structure"
    ],
    "relatedUnits": [],
    "demoIds": [
      "听力信息捕捉演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-listening-capture.html"
  },
  {
    "id": "english-english-grammar-cloze-strategy",
    "subjectId": "english",
    "moduleId": "english-roots-vocabulary-network",
    "slug": "english-grammar-cloze-strategy",
    "title": "语法填空策略演示器",
    "titleEn": null,
    "summary": "把语法填空里的词性判断、句法分析和时态语态决策拆成步骤图，帮助孩子稳定做题路径。",
    "order": 16,
    "difficulty": "中等",
    "status": "migrating",
    "learningGoals": [],
    "coreTakeaways": [],
    "keywords": [
      "语法填空策略演示器",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [],
    "demoIds": [
      "语法填空策略演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-grammar-cloze-strategy.html"
  }
];
