import type { KnowledgeUnitMeta } from "@/lib/content/types";

export const knowledgeUnits: KnowledgeUnitMeta[] = [
  {
    "id": "math-quadratic-function",
    "subjectId": "math",
    "moduleId": "math-functions",
    "slug": "quadratic-function",
    "title": "二次函数",
    "titleEn": null,
    "summary": "理解二次函数的解析式、图像特征与解题观察角度。",
    "order": 1,
    "difficulty": "基础",
    "status": "available",
    "learningGoals": [
      "参数与图像联动",
      "一般式和顶点式切换",
      "顶点与对称轴理解"
    ],
    "coreTakeaways": [
      "二次函数图像判断要同时看开口、顶点和对称轴",
      "解析式变形的目的，是把图像特征更快读出来",
      "参数变化会同时牵动位置变化和形态变化"
    ],
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
    "status": "available",
    "learningGoals": [
      "能看懂斜率如何控制直线的倾斜方向与陡峭程度",
      "能看懂截距变化如何带动图像上下平移",
      "能把解析式变化和图像变化一一对应起来"
    ],
    "coreTakeaways": [
      "一次函数的核心参数只有斜率和截距",
      "图像的倾斜变化和位置变化都能追溯到参数变化",
      "先判断增减方向，再观察与坐标轴的交点位置"
    ],
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
    "status": "available",
    "learningGoals": [
      "能判断 k 的正负如何决定图像所在象限",
      "能理解 |k| 变化如何影响曲线离坐标轴的远近",
      "能借助渐近线理解图像为什么不会碰到坐标轴"
    ],
    "coreTakeaways": [
      "反比例函数图像同时受符号和大小两层因素影响",
      "坐标轴既是参考边界，也是理解渐近趋势的关键",
      "看图像时要同时关注象限、远近和变化趋势"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分指数函数和对数函数各自的增长变化特点",
      "能理解底数变化如何影响图像陡缓与位置",
      "能把互为反函数的关系重新连回图像对称性"
    ],
    "coreTakeaways": [
      "指数函数看增长速度，对数函数看反向刻画过程",
      "底数大于 1 和介于 0 到 1 之间时，图像变化方向相反",
      "互逆关系常通过 y = x 这条对称轴来理解"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分奇次幂、偶次幂和分数指数函数的图像差异",
      "能理解指数大小如何影响图像开口和弯曲程度",
      "能把定义域和值域变化和图像形态对应起来"
    ],
    "coreTakeaways": [
      "奇偶性是观察幂函数图像的第一把钥匙",
      "指数不同，图像在原点附近和远离原点时的变化节奏也不同",
      "先分类型，再谈图像性质，会比死记结论更稳"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分上下平移、左右平移和伸缩变化的图像效果",
      "能判断参数写在括号内外时各自控制什么",
      "能把多个变换按顺序还原回原函数"
    ],
    "coreTakeaways": [
      "函数变换最容易错在方向判断和先后顺序",
      "括号外通常管整体升降，括号内常对应自变量方向变化",
      "把复杂变换拆成一步一步的简单变换最稳"
    ],
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
    "status": "available",
    "learningGoals": [
      "能把单位圆上的点和正弦函数值对应起来",
      "能看懂正弦图像如何由圆周运动生成",
      "能判断周期、最大值和最小值在图像中的位置"
    ],
    "coreTakeaways": [
      "正弦图像不是孤立曲线，而是单位圆投影的展开结果",
      "一个完整周期对应角度转过一整圈",
      "先抓周期和振幅，再看局部位置变化"
    ],
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
    "status": "available",
    "learningGoals": [
      "能判断振幅、周期、相位和平移各自带来的图像变化",
      "能把参数写法和图像拉伸压缩效果一一对应",
      "能读出三角函数模型对应的现实周期现象"
    ],
    "coreTakeaways": [
      "振幅控制高低起伏，周期控制横向疏密",
      "相位变化本质上是整体左右移动",
      "参数再多，也是在同一条基本曲线上的变换"
    ],
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
    "status": "available",
    "learningGoals": [
      "能把单位圆横坐标和余弦函数值对应起来",
      "能区分余弦图像与正弦图像的相位差关系",
      "能从图像上判断最值点和周期位置"
    ],
    "coreTakeaways": [
      "余弦函数和正弦函数本质上是同一家族的相位平移",
      "最大值通常出现在起点附近，这是它和正弦图像最直观的差别",
      "理解横坐标投影比单纯记图像更牢"
    ],
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
    "status": "available",
    "learningGoals": [
      "能识别正切函数的间断点和渐近线位置",
      "能理解周期变化与定义域限制之间的关系",
      "能把正切值理解为正弦与余弦比值带来的变化结果"
    ],
    "coreTakeaways": [
      "正切函数最关键的特征是间断，而不是连续起伏",
      "渐近线附近的剧烈变化是读图重点",
      "看正切图像时要先定位不能取值的位置"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分等差数列和等比数列的生成规律",
      "能用逐项变化理解线性增长和倍数增长差别",
      "能从前几项特征反推常见数列类型"
    ],
    "coreTakeaways": [
      "等差看固定差值，等比看固定比值",
      "线性增长和指数增长的后期变化速度差异很大",
      "数列理解先抓生成规律，再谈通项公式"
    ],
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
    "status": "available",
    "learningGoals": [
      "能理解后一项如何由前一项或前几项生成",
      "能从递推过程判断数列的变化趋势",
      "能把递推关系和图像或表格变化联系起来"
    ],
    "coreTakeaways": [
      "递推数列的核心是过程依赖，不是单独某一项",
      "看懂生成步骤往往比直接求通项更重要",
      "前几项的局部规律常能暴露整体变化方向"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分直线与圆的相交、相切、相离三种位置关系",
      "能把位置关系与方程判别条件对应起来",
      "能借助圆心到直线距离理解判别本质"
    ],
    "coreTakeaways": [
      "位置关系判断本质上是在比较距离和半径",
      "相切是最值得单独盯住的临界状态",
      "图像直觉建立后，代数判别会自然很多"
    ],
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
    "status": "available",
    "learningGoals": [
      "能从标准方程快速读出圆心和半径",
      "能理解圆心平移如何带动图像整体移动",
      "能把方程结构和图像位置直接对应起来"
    ],
    "coreTakeaways": [
      "圆的标准方程最重要的信息只有圆心和半径",
      "图像变化本质上是位置变化和大小变化",
      "配方的意义就是把几何信息从方程里读出来"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分抛物线四种开口方向及对应标准式",
      "能理解焦点、准线与开口方向之间的关系",
      "能用标准方程读出图像的核心几何信息"
    ],
    "coreTakeaways": [
      "抛物线的关键不是长得像 U，而是焦点和准线的对应关系",
      "参数控制的是开口方向和张开程度",
      "先认标准式属于哪一类，再谈具体位置"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分椭圆长轴、短轴与焦点的位置关系",
      "能理解 a、b、c 之间的约束关系",
      "能从标准方程判断椭圆开口方向和扁平程度"
    ],
    "coreTakeaways": [
      "椭圆是两个方向拉伸程度不同的封闭曲线",
      "长轴方向决定焦点排列方向",
      "离心率越大，图像通常越扁长"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分双曲线的实轴方向和开口方向",
      "能理解渐近线在图像判断中的作用",
      "能把标准方程中的参数与焦点、离心率对应起来"
    ],
    "coreTakeaways": [
      "双曲线的核心抓手是两支开口和渐近线结构",
      "渐近线不是配角，而是判断图像走向的主线",
      "先分清横开口还是纵开口，再谈其它性质"
    ],
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
    "status": "available",
    "learningGoals": [
      "能从整体上区分抛物线、椭圆、双曲线的图像与方程特点",
      "能用统一视角比较焦点、开口和离心率差异",
      "能减少圆锥曲线之间概念混淆"
    ],
    "coreTakeaways": [
      "圆锥曲线的学习重点是比较与归类，不是孤立背诵",
      "不同曲线的方程形式都在服务几何结构表达",
      "搭起总框架后，单个题型会更容易定位"
    ],
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
    "status": "available",
    "learningGoals": [
      "能比较直线与不同圆锥曲线的位置关系变化",
      "能理解交点个数变化和判别式之间的联系",
      "能从图像上先判断大致情形，再回到方程分析"
    ],
    "coreTakeaways": [
      "直线和曲线的位置关系本质上是交点变化问题",
      "相切依然是最关键的临界状态",
      "先看图像趋势，再做代数运算更不容易迷失"
    ],
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
    "status": "available",
    "learningGoals": [
      "能理解点到直线距离为什么要看垂线段",
      "能把距离公式和几何最短路径对应起来",
      "能在图像中找到垂足并解释公式来源"
    ],
    "coreTakeaways": [
      "最短距离一定沿垂线方向取得",
      "公式不是孤立结果，而是图形关系的代数表达",
      "图像理解会让距离题少掉很多机械记忆"
    ],
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
    "status": "available",
    "learningGoals": [
      "能判断常见立体切割后可能出现的截面形状",
      "能借助旋转和视角切换建立空间想象",
      "能把平面图形和立体结构对应起来"
    ],
    "coreTakeaways": [
      "截面题难点常在空间想象，而不在公式",
      "先确定切割方向，再想象边界线怎样形成",
      "把立体拆成多个熟悉平面会更容易理解"
    ],
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
    "status": "available",
    "learningGoals": [
      "能理解平面图形旋转后如何生成常见旋转体",
      "能把旋转轴位置和生成图形形态对应起来",
      "能从二维截面反推三维结构"
    ],
    "coreTakeaways": [
      "旋转体是平面图形围绕轴运动留下的轨迹结果",
      "旋转轴换了，最终立体结构也会明显变化",
      "二维到三维的过渡要抓住轴和边界线"
    ],
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
    "status": "available",
    "learningGoals": [
      "能理解元素、集合、子集、真子集和空集的含义",
      "能区分属于关系和包含关系",
      "能用图示表达集合之间的基本结构"
    ],
    "coreTakeaways": [
      "集合语言是在给对象分类和组织关系",
      "元素和集合不是同一层级，符号也不能混用",
      "图示一旦看懂，符号表达会顺很多"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分交集、并集、补集各自表示的区域含义",
      "能把符号运算和韦恩图区域一一对应起来",
      "能通过图形判断集合运算结果"
    ],
    "coreTakeaways": [
      "集合运算先看区域重叠关系，再写符号",
      "韦恩图是理解交并补最直接的视觉工具",
      "先图后式，能显著减少集合题混乱"
    ],
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
    "status": "available",
    "learningGoals": [
      "能把位移、速度和时间的关系放回同一运动过程理解",
      "能从图像上判断匀速运动的快慢和位置变化",
      "能区分运动状态不变和位置持续变化这两层含义"
    ],
    "coreTakeaways": [
      "匀速不代表静止，而是速度大小和方向保持不变",
      "位移随时间均匀变化，是图像判断的核心特征",
      "先理解过程，再写公式，运动题会更稳"
    ],
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
    "status": "available",
    "learningGoals": [
      "能理解速度均匀变化意味着什么",
      "能从 v-t 图像斜率和面积中读出加速度与位移",
      "能区分匀速运动和匀变速运动的图像特征"
    ],
    "coreTakeaways": [
      "匀变速的核心不是公式多，而是速度变化有固定节奏",
      "v-t 图像里斜率看加速度，面积看位移",
      "图像语言一旦建立，公式关系就更容易串起来"
    ],
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
    "status": "available",
    "learningGoals": [
      "能用起点差和速度差解释追及条件",
      "能判断什么时候两车会相遇或永远追不上",
      "能把追及过程转换成位移比较问题"
    ],
    "coreTakeaways": [
      "追及问题先盯住相对距离怎么变",
      "匀速追及的关键量是速度差",
      "把复杂叙述压成“谁离谁还差多少”最有效"
    ],
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
    "status": "available",
    "learningGoals": [
      "能理解加速一方为什么前期可能仍追不上",
      "能把匀速和匀变速对象放进同一时间轴比较",
      "能判断相遇条件与临界时刻"
    ],
    "coreTakeaways": [
      "混合追及的核心是相对距离先增后减还是持续减小",
      "加速度改变的是追及节奏，不是立刻改变结果",
      "先建时间过程图，再列式会更清楚"
    ],
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
    "status": "available",
    "learningGoals": [
      "能理解自由落体是仅受重力作用的理想模型",
      "能把速度增加和位移累积联系起来",
      "能从时间、速度、下落高度三者中建立对应关系"
    ],
    "coreTakeaways": [
      "自由落体本质上是初速度为零的匀加速直线运动",
      "下落越久，速度越大，位移增加也越快",
      "先把它看成过程，再谈公式更容易理解"
    ],
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
    "status": "available",
    "learningGoals": [
      "能把平抛运动拆成水平和竖直两个独立过程",
      "能理解合成轨迹为什么是曲线",
      "能从时间桥梁把两方向运动重新合起来"
    ],
    "coreTakeaways": [
      "平抛最关键的是“水平方向匀速，竖直方向自由落体”",
      "两个方向相互独立，但共享同一个时间",
      "先分解再合成，是分析平抛题的稳定步骤"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分 s-t 图像和 v-t 图像各自在表达什么",
      "能从图像斜率、面积和拐点判断运动过程",
      "能把抽象图线重新翻译成现实运动描述"
    ],
    "coreTakeaways": [
      "看运动图像时先判断横纵坐标分别代表什么",
      "同样是上升或下降，放在不同图像里含义完全不同",
      "图像题本质上是在做过程还原"
    ],
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
    "status": "available",
    "learningGoals": [
      "理解两个力怎样合成为一个等效结果",
      "区分合成与分解本质上是同一个力学对象的不同观察方式",
      "把平行四边形法则重新连回图形直觉"
    ],
    "coreTakeaways": [
      "夹角越小，两个力越同向，合力通常越大",
      "合成先看方向关系，再谈大小计算",
      "分解不是变出新力，而是为了顺着更合适的方向分析"
    ],
    "keywords": [
      "力的合成与分解",
      "force"
    ],
    "relatedUnits": [
      "physics-force-balance",
      "physics-incline-motion"
    ],
    "demoIds": [
      "力的合成示意图"
    ],
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
    "status": "available",
    "learningGoals": [
      "能理解合力、质量、加速度三者之间的因果关系",
      "能判断哪个量变化会直接改变加速度大小",
      "能把牛顿第二定律重新连回真实受力场景"
    ],
    "coreTakeaways": [
      "加速度由合力和质量共同决定，不由单个力孤立决定",
      "同样的合力作用在不同质量上，运动变化程度不同",
      "列式前先认清对象受到的是合外力"
    ],
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
    "status": "available",
    "learningGoals": [
      "区分“合力为零”和“没有受力”",
      "按方向分别判断平衡条件",
      "把受力图重新连回运动状态判断"
    ],
    "coreTakeaways": [
      "平衡的核心是每个方向上的合力都被抵消",
      "静止和平衡、匀速和平衡都可能同时成立",
      "先画受力图再列方程，比直接套结论更稳"
    ],
    "keywords": [
      "共点力平衡与受力平衡",
      "force"
    ],
    "relatedUnits": [
      "physics-force-composition",
      "physics-newton-second-law"
    ],
    "demoIds": [
      "共点力平衡图"
    ],
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
    "status": "available",
    "learningGoals": [
      "能根据相对运动趋势判断摩擦力方向",
      "能区分静摩擦、滑动摩擦和临界状态",
      "能避免把所有摩擦力都机械写成 μN"
    ],
    "coreTakeaways": [
      "摩擦力判断先看状态，再看大小",
      "静摩擦会跟着需要变化，直到最大静摩擦",
      "临界状态是摩擦力题最关键的分界点"
    ],
    "keywords": [
      "摩擦力与临界状态",
      "force"
    ],
    "relatedUnits": [
      "physics-force-balance",
      "physics-incline-motion",
      "physics-newton-second-law"
    ],
    "demoIds": [
      "physics-friction"
    ],
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
    "status": "available",
    "learningGoals": [
      "能用沿斜面和垂直斜面方向稳定分解重力",
      "能分清支持力、摩擦力和沿面运动方程的分工",
      "能用统一模板分析常见斜面题"
    ],
    "coreTakeaways": [
      "斜面题先选坐标，再分解重力",
      "沿面方向管运动，法向方向常管支持力",
      "图像理顺之后，列式才不容易乱"
    ],
    "keywords": [
      "斜面受力与运动",
      "force"
    ],
    "relatedUnits": [
      "physics-friction",
      "physics-force-balance",
      "physics-newton-second-law"
    ],
    "demoIds": [
      "physics-incline-motion"
    ],
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
    "status": "available",
    "learningGoals": [
      "能判断什么时候该先整体分析，什么时候该隔离分析",
      "能把共同加速度和内部拉力分步骤求解",
      "能理解整体法与隔离法是在不同层级看同一系统"
    ],
    "coreTakeaways": [
      "连接体题先整体，常比一开始逐个拆更稳",
      "整体法适合求公共结果，隔离法适合追回内部相互作用力",
      "对象边界一旦选对，题目会简单很多"
    ],
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
    "status": "available",
    "learningGoals": [
      "能把支持力变化和超重失重现象联系起来",
      "能根据加速度方向判断是超重还是失重",
      "能解释为什么重力不变但体感会变化"
    ],
    "coreTakeaways": [
      "超重和失重变化的是支持力，不是重力本身",
      "判断状态时要盯住加速度方向和支持力大小",
      "完全失重的关键特征是支持力降到零"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分做功总量和做功快慢",
      "能把力、位移、时间和能量转移过程对应起来",
      "能避免把功和功率混成一个概念"
    ],
    "coreTakeaways": [
      "功描述总能量转移，功率描述转移快慢",
      "同样的功并不代表功率相同",
      "过程理解比单纯套公式更重要"
    ],
    "keywords": [
      "功与功率",
      "energy"
    ],
    "relatedUnits": [
      "physics-kinetic-energy",
      "physics-mechanical-energy",
      "physics-work-energy-synthesis"
    ],
    "demoIds": [
      "physics-work-power"
    ],
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
    "status": "available",
    "learningGoals": [
      "能把合外力做功和动能改变量直接对应起来",
      "能理解动能定理为什么适合跨过程求解",
      "能在受力法和能量法之间做切换"
    ],
    "coreTakeaways": [
      "动能定理把复杂过程整体映射到速度变化上",
      "正功增动能，负功减动能",
      "综合题里常能用它绕开中间繁杂细节"
    ],
    "keywords": [
      "动能定理",
      "energy"
    ],
    "relatedUnits": [
      "physics-work-power",
      "physics-mechanical-energy",
      "physics-work-energy-synthesis"
    ],
    "demoIds": [
      "physics-kinetic-energy"
    ],
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
    "status": "available",
    "learningGoals": [
      "能判断什么时候可以使用机械能守恒",
      "能把动能和势能的转化过程看成内部换账",
      "能区分守恒条件和机械能变化原因"
    ],
    "coreTakeaways": [
      "机械能守恒的前提是只有重力或弹力等保守力做功",
      "能量并不是不变，而是在不同形式之间转化",
      "先判条件，再套守恒，能避免机械误用"
    ],
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
    "status": "available",
    "learningGoals": [
      "能比较功、动能定理和机械能守恒各自适用的题型",
      "能根据过程复杂度选择更省力的能量方法",
      "能把多种能量思路整理到同一框架下"
    ],
    "coreTakeaways": [
      "能量方法的优势在于跨过程、压缩中间细节",
      "选方法的关键是看题目给了什么、要什么、过程是否复杂",
      "综合题里常常不是公式不会，而是方法选错"
    ],
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
    "status": "available",
    "learningGoals": [
      "区分串联和并联的结构差异",
      "理解结构如何决定电流和电压分配",
      "减少只背规律不懂来源的断层"
    ],
    "coreTakeaways": [
      "串联先抓一条通路，并联先抓多条支路",
      "串联电流相等，并联各支路电压相等",
      "结构看清后，分压与分流规律会自然很多"
    ],
    "keywords": [
      "串联与并联电路对比",
      "electricity"
    ],
    "relatedUnits": [
      "physics-ohms-law"
    ],
    "demoIds": [
      "串联与并联电路对比图"
    ],
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
    "status": "available",
    "learningGoals": [
      "理解 U、I、R 的比例关系",
      "从图像上读出电阻变化对斜率的影响",
      "把公式变形重新连回物理意义"
    ],
    "coreTakeaways": [
      "电压固定时，电阻越大电流越小",
      "I-U 图像过原点，斜率大小反映电阻影响",
      "欧姆定律不是只为计算，更是变量关系模型"
    ],
    "keywords": [
      "欧姆定律与伏安关系",
      "electricity"
    ],
    "relatedUnits": [
      "physics-series-parallel"
    ],
    "demoIds": [
      "欧姆定律图像"
    ],
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
    "status": "available",
    "learningGoals": [
      "把位移图像和真实往返过程对应起来",
      "理解振幅和周期分别描述什么",
      "从图像上判断物体此刻处于什么状态"
    ],
    "coreTakeaways": [
      "一个周期对应一次完整往返",
      "振幅决定离平衡位置最远能到哪",
      "读振动图像时要同时关注位移大小和变化方向"
    ],
    "keywords": [
      "简谐振动的周期与图像",
      "wave"
    ],
    "relatedUnits": [
      "physics-wave-propagation",
      "physics-motion-graphs"
    ],
    "demoIds": [
      "简谐振动图像"
    ],
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
    "status": "available",
    "learningGoals": [
      "区分波形传播和质点振动",
      "理解同一时刻不同位置的相位差",
      "从波形快照上判断传播特征"
    ],
    "coreTakeaways": [
      "波传播的是扰动和能量，不是介质整体搬走",
      "相位差需要结合位置差和波长一起理解",
      "先分清“波在走”还是“点在振”，读图才不容易错"
    ],
    "keywords": [
      "波的传播与相位感知",
      "wave"
    ],
    "relatedUnits": [
      "physics-vibration",
      "physics-motion-graphs"
    ],
    "demoIds": [
      "波的传播图像"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分纯净物、混合物、单质、化合物等基本类别",
      "能把酸碱盐等常见化学语言放回分类结构理解",
      "能用分类关系解释常见物质之间的转化路径"
    ],
    "coreTakeaways": [
      "化学分类不是背名词，而是在搭建物质关系地图",
      "先分大类，再分小类，结构会更清晰",
      "转化关系理解好了，后续元素化合物会轻松很多"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分溶液、胶体和浊液的微粒尺度差异",
      "能理解丁达尔效应为什么能帮助判断胶体",
      "能把宏观现象和微观分散状态联系起来"
    ],
    "coreTakeaways": [
      "分散系的关键差别在微粒大小和分散状态",
      "胶体之所以特别，是因为它介于溶液和浊液之间",
      "现象判断要回到微观粒子层面解释"
    ],
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
    "status": "available",
    "learningGoals": [
      "能在物质的量、微粒数、质量和体积之间完成换算",
      "能理解摩尔作为“计数桥梁”的作用",
      "能把各种公式放回同一张数量关系网理解"
    ],
    "coreTakeaways": [
      "物质的量不是新物质，而是连接微观和宏观的计量单位",
      "阿伏伽德罗常数是把“多少个粒子”转成“多少摩尔”的桥",
      "先找量纲和已知未知关系，比套公式更稳"
    ],
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
    "id": "chemistry-chemistry-nuclear-charge-electron-arrangement",
    "subjectId": "chemistry",
    "moduleId": "chemistry-chemical-language",
    "slug": "chemistry-nuclear-charge-electron-arrangement",
    "title": "核电荷数与核外电子排布",
    "titleEn": null,
    "summary": "把核电荷数、质子数、电子数和电子层排布放进同一张示意图里，帮助孩子真正看懂原子结构的底层规律。",
    "order": 4,
    "difficulty": "中等",
    "status": "available",
    "learningGoals": [
      "能说清核电荷数、质子数和原子序数之间的对应关系",
      "能判断中性原子的电子数并写出前二十号元素的常见电子层排布",
      "能从最外层电子数出发理解主族元素化学性质的相似性"
    ],
    "coreTakeaways": [
      "核电荷数本质上反映原子核对核外电子的吸引核心，它的数值等于质子数",
      "中性原子里电子总数等于核电荷数，但电子必须按层分布而不是随意堆放",
      "最外层电子数常常决定元素在化学反应中更容易失去电子还是得到电子"
    ],
    "keywords": [
      "核电荷数与核外电子排布",
      "chemical-language"
    ],
    "relatedUnits": [],
    "demoIds": [
      "核电荷数与电子排布演示器"
    ],
    "migrationSource": "production/original-content"
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
    "status": "available",
    "learningGoals": [
      "能判断物质在水中是否电离以及电离后形成什么粒子",
      "能理解离子反应为什么要写成离子方程式",
      "能从粒子层面判断离子共存和反应实质"
    ],
    "coreTakeaways": [
      "离子反应的核心不是改写形式，而是看真正参与变化的粒子",
      "电解质与非电解质的区别关键在是否电离",
      "会写离子方程式前，先认清哪些粒子真的在场"
    ],
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
    "status": "available",
    "learningGoals": [
      "能根据化合价变化判断氧化和还原",
      "能从电子得失过程识别氧化剂和还原剂",
      "能把宏观反应和微观电子转移对应起来"
    ],
    "coreTakeaways": [
      "氧化还原反应的本质是电子转移",
      "谁得电子谁被还原，谁失电子谁被氧化",
      "盯住化合价变化，会比背结论更可靠"
    ],
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
    "status": "available",
    "learningGoals": [
      "能说清金属钠及其常见化合物之间的转化关系",
      "能把实验现象与钠元素活泼性的本质联系起来",
      "能区分氧化钠与过氧化钠的性质差异"
    ],
    "coreTakeaways": [
      "钠元素线索的主轴是活泼金属性和连续转化关系",
      "相似名称背后常有明显不同的组成和性质",
      "现象题和推断题都要回到转化链理解"
    ],
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
    "status": "available",
    "learningGoals": [
      "能理清氯气、盐酸、次氯酸和含氯漂白物之间的关系",
      "能解释氯及其化合物的典型实验现象",
      "能把氧化性、漂白性和消毒性区分开来"
    ],
    "coreTakeaways": [
      "氯这一专题的核心是同一元素在不同化合态下的性质变化",
      "漂白与消毒常相关，但背后机理不能混成一件事",
      "抓住转化链，氯专题会比零散背结论更清楚"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分铁、亚铁、铁离子的常见颜色和转化关系",
      "能根据实验现象判断价态变化方向",
      "能把检验方法和离子性质对应起来"
    ],
    "coreTakeaways": [
      "铁专题最重要的是二价铁和三价铁之间的相互转化",
      "颜色和沉淀现象常是判断价态的直观入口",
      "推断题本质上是在追踪元素价态怎样变化"
    ],
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
    "status": "available",
    "learningGoals": [
      "能根据实验目的判断装置选择依据",
      "能按流程说清气体收集、过滤和加热的关键步骤",
      "能把安全细节和操作后果对应起来"
    ],
    "coreTakeaways": [
      "实验题先看流程，再看仪器名称",
      "装置选择必须和物质性质、实验目标对应",
      "细节失误往往就是实验失分点"
    ],
    "keywords": [
      "化学实验基础与装置",
      "experiments"
    ],
    "relatedUnits": [
      "chemistry-ion-identification",
      "chemistry-ionic-reaction",
      "chemistry-dispersion-colloid"
    ],
    "demoIds": [
      "chemistry-lab-devices"
    ],
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
    "status": "available",
    "learningGoals": [
      "能根据实验步骤判断常见离子的检验思路",
      "能把现象、试剂和结论连成完整判断链",
      "能解释为什么某些现象能够证明某种离子存在"
    ],
    "coreTakeaways": [
      "离子检验不是背现象，而是理解试剂和粒子怎样反应",
      "同一种现象可能对应不同原因，必须结合步骤判断",
      "实验题做稳的关键是过程链条完整"
    ],
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
    "status": "available",
    "learningGoals": [
      "能先找出句子的主语、谓语和核心宾语或表语",
      "能把修饰成分和主干成分分层观察",
      "能用典型例句解释不同句型骨架的差异"
    ],
    "coreTakeaways": [
      "句子理解先抓主干，再看修饰",
      "语法术语的价值在于帮助看清结构功能",
      "句型越长越需要先压回最短可成立句"
    ],
    "keywords": [
      "句子成分结构拆解",
      "sentence-structure"
    ],
    "relatedUnits": [
      "english-clause-hierarchy",
      "english-sentence-compression",
      "english-nonfinite-structure"
    ],
    "demoIds": [
      "english-sentence-structure"
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
    "status": "available",
    "learningGoals": [
      "能从词根判断一组单词的大致共同含义",
      "能结合前后缀解释词义为什么发生变化",
      "能把零散单词归回同一个词义家族"
    ],
    "coreTakeaways": [
      "词根是词义扩展的核心锚点",
      "前后缀负责推动方向、词性和场景变化",
      "背词效率提升来自网络化理解而不是单点记忆"
    ],
    "keywords": [
      "词根归类与词义扩展",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [
      "english-affix-network",
      "english-word-family-atlas",
      "english-synonym-semantic-map"
    ],
    "demoIds": [
      "english-word-roots"
    ],
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
    "status": "available",
    "learningGoals": [
      "能判断一个从句在整句中充当什么成分",
      "能根据连接词识别从句和主句之间的关系",
      "能把主句和从句拆成清晰的层级结构"
    ],
    "coreTakeaways": [
      "从句首先是整句中的一个功能块",
      "连接词的意义要结合句法作用一起看",
      "主句仍然承担整句的核心事件"
    ],
    "keywords": [
      "从句层级拆解",
      "sentence-structure"
    ],
    "relatedUnits": [
      "english-sentence-structure",
      "english-sentence-compression",
      "english-reading-layer"
    ],
    "demoIds": [
      "english-clause-hierarchy"
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
    "status": "available",
    "learningGoals": [
      "能看懂常见前后缀如何改变词义方向",
      "能判断词缀变化带来的词性变化",
      "能把前后缀与具体例词连成规律"
    ],
    "coreTakeaways": [
      "词缀不是碎片，而是词义变化的方向提示",
      "判断派生词时要先看原词，再看附加变化",
      "词缀规律能帮助阅读和完形中的快速猜词"
    ],
    "keywords": [
      "前后缀变义网络",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [
      "english-word-roots",
      "english-word-family-atlas",
      "english-grammar-cloze-strategy"
    ],
    "demoIds": [
      "english-affix-network"
    ],
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
    "status": "available",
    "learningGoals": [
      "能把长难句先压缩成最短主干",
      "能识别让步、条件、时间等外挂修饰层",
      "能按顺序把复杂修饰重新挂回主干"
    ],
    "coreTakeaways": [
      "长句拆解的第一步永远是保留主干",
      "复杂信息可以分层处理，不必一次看完",
      "逻辑词常常决定从句和主句的关系"
    ],
    "keywords": [
      "长难句主干压缩",
      "sentence-structure"
    ],
    "relatedUnits": [
      "english-sentence-structure",
      "english-clause-hierarchy",
      "english-nonfinite-structure"
    ],
    "demoIds": [
      "english-sentence-compression"
    ],
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
    "status": "available",
    "learningGoals": [
      "能把同一核心义扩展成不同词性的高频词族",
      "能在做词形转换题时快速定位所需词性",
      "能借词族关系扩大教材高频词储备"
    ],
    "coreTakeaways": [
      "词族记忆比单词孤立记忆更稳",
      "动作、人物、性质、结果常能围绕同一核心义展开",
      "词形转换本质上是在词族里选对位置"
    ],
    "keywords": [
      "高频教材词族网络",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [
      "english-word-roots",
      "english-affix-network",
      "english-writing-upgrade-workshop"
    ],
    "demoIds": [
      "english-word-family-atlas"
    ],
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
    "status": "available",
    "learningGoals": [
      "能把主旨、论据、细节和例子分层阅读",
      "能根据题型回到对应的信息层定位",
      "能避免把局部细节误判成全文中心"
    ],
    "coreTakeaways": [
      "阅读不是逐词平推，而是先抓信息骨架",
      "主旨层和细节层承担完全不同的任务",
      "做题时先分层，再定位，效率更高"
    ],
    "keywords": [
      "阅读信息分层",
      "sentence-structure"
    ],
    "relatedUnits": [
      "english-reading-question-map",
      "english-sentence-compression",
      "english-clause-hierarchy"
    ],
    "demoIds": [
      "english-reading-layer"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分近义词在强度、语气和正式程度上的差异",
      "能避免把中文相近的词机械互换",
      "能借语义层级提高词汇辨析准确率"
    ],
    "coreTakeaways": [
      "近义词的核心差别常在语气和场景",
      "词义像不等于可以无条件互换",
      "把词放进语义坐标里更容易看出边界"
    ],
    "keywords": [
      "近义词语义坐标图",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [
      "english-word-roots",
      "english-word-family-atlas",
      "english-writing-upgrade-workshop"
    ],
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
    "status": "available",
    "learningGoals": [
      "能把时态判断重新放回时间关系理解",
      "能区分动作发生点、持续段和当前观察点",
      "能结合时间轴理解典型时态差别"
    ],
    "coreTakeaways": [
      "时态的本质是时间关系，而不是词尾变化",
      "一般过去看过去节点，现在完成看过去到现在的连接",
      "先看时间线，再选语法形式"
    ],
    "keywords": [
      "语法时态时间轴",
      "sentence-structure"
    ],
    "relatedUnits": [
      "english-sentence-structure",
      "english-reading-layer",
      "english-grammar-cloze-strategy"
    ],
    "demoIds": [
      "english-tense-timeline"
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
    "status": "available",
    "learningGoals": [
      "能先判断逻辑关系，再选连接词",
      "能区分转折、因果和递进类连接词的分工",
      "能把阅读、完形和写作中的连接词统一理解"
    ],
    "coreTakeaways": [
      "连接词题首先在考逻辑，不只是背词",
      "because 和 therefore 的方向完全不同",
      "先定关系，再落词，错误会少很多"
    ],
    "keywords": [
      "逻辑连接词网络",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [
      "english-reading-question-map",
      "english-writing-upgrade-workshop",
      "english-grammar-cloze-strategy"
    ],
    "demoIds": [
      "english-logic-connector-map"
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
    "status": "available",
    "learningGoals": [
      "能判断非谓语是在句中补什么功能",
      "能检查非谓语和逻辑主语之间的主动被动关系",
      "能结合例句区分 doing、done、to do 的常见用法"
    ],
    "coreTakeaways": [
      "非谓语要放回整句里判断功能",
      "逻辑主语和时间关系比形式记忆更关键",
      "不定式、分词本质上都是主句的补充层"
    ],
    "keywords": [
      "非谓语结构关系图",
      "sentence-structure"
    ],
    "relatedUnits": [
      "english-sentence-structure",
      "english-clause-hierarchy",
      "english-sentence-compression"
    ],
    "demoIds": [
      "english-nonfinite-structure"
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
    "status": "available",
    "learningGoals": [
      "能把基础句逐步升级成更有层次的表达",
      "能根据逻辑关系选择合适连接与句式变化",
      "能避免为了复杂而复杂的写作升级"
    ],
    "coreTakeaways": [
      "好表达先清楚，再谈高级",
      "句型变化必须服务观点推进",
      "逻辑连接往往比生词堆砌更重要"
    ],
    "keywords": [
      "写作句型升级工坊",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [
      "english-writing-paragraph-workshop",
      "english-logic-connector-map",
      "english-word-family-atlas"
    ],
    "demoIds": [
      "english-writing-upgrade-workshop"
    ],
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
    "status": "available",
    "learningGoals": [
      "能区分主旨题、细节题、推断题等常见阅读题型",
      "能按题型选择对应的定位和排除路径",
      "能把做题步骤固定成可复用流程"
    ],
    "coreTakeaways": [
      "阅读题先分题型，再决定读法和找法",
      "主旨题盯结构，细节题盯定位，推断题盯依据",
      "流程稳定后，错误会比单纯刷题更快下降"
    ],
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
    "status": "available",
    "learningGoals": [
      "能按主题句、支撑句、例证句和收束句展开段落",
      "能避免段落只堆句子却没有中心",
      "能把单句表达推进到完整段落组织"
    ],
    "coreTakeaways": [
      "主题句是整段展开的锚点",
      "例子和解释都必须围绕主旨服务",
      "段落写作本质上是结构组织能力"
    ],
    "keywords": [
      "作文段落展开工坊",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [
      "english-writing-upgrade-workshop",
      "english-logic-connector-map",
      "english-reading-layer"
    ],
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
    "status": "available",
    "learningGoals": [
      "能先抓场景词、人物关系和关键词再补细节",
      "能识别数字、时间、地点等高价值听力信息",
      "能把速记内容和题目选项快速对应起来"
    ],
    "coreTakeaways": [
      "听力先抓点，再补句，不必企图一次全听全懂",
      "高频信息位通常决定选项差异",
      "稳定的捕捉顺序能显著提升听力抗压能力"
    ],
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
    "status": "available",
    "learningGoals": [
      "能先判断空格考查的是词性、结构还是逻辑连接",
      "能按顺序完成谓语、非谓语和连接词空的判断",
      "能把做题过程固定成可复用的决策路径"
    ],
    "coreTakeaways": [
      "语法填空先判结构，再选形式",
      "非谓语判断核心是逻辑主语和句法功能",
      "稳定流程比凭语感更可靠"
    ],
    "keywords": [
      "语法填空策略演示器",
      "roots-vocabulary-network"
    ],
    "relatedUnits": [
      "english-nonfinite-structure",
      "english-affix-network",
      "english-word-roots"
    ],
    "demoIds": [
      "语法填空策略演示器"
    ],
    "migrationSource": "legacy/prototype-v1/modules/unit-english-grammar-cloze-strategy.html"
  },
  {
    "id": "english-english-3500-overview",
    "subjectId": "english",
    "moduleId": "english-high-school-3500-words",
    "slug": "english-3500-overview",
    "title": "3500 词总览与分类地图",
    "titleEn": null,
    "summary": "先把 3500 词整体拆成 6 大记忆区，帮助高一孩子从一上来就建立“不是乱背，是按规律背”的整体感。",
    "order": 1,
    "difficulty": "基础",
    "status": "available",
    "learningGoals": [
      "能看懂 3500 词为什么要按记忆规律而不是按字母顺序来背",
      "能区分高频核心词、词根词缀词和固定词块各自承担的任务",
      "能建立高一阶段的整体背词路线图"
    ],
    "coreTakeaways": [
      "背词先建框架，再逐组推进，会比平铺词表更稳",
      "3500 词不是一个整块，而是几个不同记忆任务的组合",
      "高一先抓高频核心词和常用词块，效率最高"
    ],
    "keywords": [
      "3500 词总览与分类地图",
      "high-school-3500-words"
    ],
    "relatedUnits": [
      "english-3500-full-bank",
      "english-3500-core-high-frequency",
      "english-3500-root-affix",
      "english-3500-grade-one-roadmap"
    ],
    "demoIds": [
      "english-3500-overview"
    ],
    "migrationSource": "product/english-3500-framework/overview"
  },
  {
    "id": "english-english-3500-full-bank",
    "subjectId": "english",
    "moduleId": "english-high-school-3500-words",
    "slug": "english-3500-full-bank",
    "title": "3500 词全量词库",
    "titleEn": null,
    "summary": "把高中常见 3500 词整理成一个可搜索、可分类、可筛选的正式词库入口，适合高一同步课内和月考复习。",
    "order": 2,
    "difficulty": "基础",
    "status": "available",
    "learningGoals": [
      "能通过搜索、分类和筛选快速定位要背的单词",
      "能把高频重点词和整合索引词放到同一个词库里统一管理",
      "能把 3500 词从散乱词表转成可执行的背诵入口"
    ],
    "coreTakeaways": [
      "先有全量词库入口，再谈分组记忆和复习节奏，效率会高很多",
      "高频重点词适合精记，整合索引词适合先做场景挂接和重复曝光",
      "搜索、筛选和分类是背 3500 词时最重要的三个底层工具"
    ],
    "keywords": [
      "3500 词全量词库",
      "high-school-3500-words"
    ],
    "relatedUnits": [
      "english-3500-overview",
      "english-3500-core-high-frequency",
      "english-3500-grade-one-roadmap"
    ],
    "demoIds": [
      "english-3500-full-bank"
    ],
    "migrationSource": "product/english-3500-framework/full-bank"
  },
  {
    "id": "english-english-3500-core-high-frequency",
    "subjectId": "english",
    "moduleId": "english-high-school-3500-words",
    "slug": "english-3500-core-high-frequency",
    "title": "高频核心词起步",
    "titleEn": null,
    "summary": "先解决课本、月考和完形里最常见的一批基础词，让孩子在高一阶段先做到“见词不慌”。",
    "order": 3,
    "difficulty": "基础",
    "status": "available",
    "learningGoals": [
      "能优先识别高一最常见的动作词、校园词和逻辑词",
      "能把高频词和常见搭配一起背，而不是只记一个中文义",
      "能把高频词作为后续阅读和写作的最基础底盘"
    ],
    "coreTakeaways": [
      "高频核心词是高一背词的地基，不宜跳过",
      "同一个高频词往往要连搭配和场景一起记",
      "高频词熟练后，月考阅读和完形压力会明显下降"
    ],
    "keywords": [
      "高频核心词起步",
      "high-school-3500-words"
    ],
    "relatedUnits": [
      "english-3500-overview",
      "english-3500-collocations",
      "english-3500-grade-one-roadmap"
    ],
    "demoIds": [
      "english-3500-core-high-frequency"
    ],
    "migrationSource": "product/english-3500-framework/core-high-frequency"
  },
  {
    "id": "english-english-3500-root-affix",
    "subjectId": "english",
    "moduleId": "english-high-school-3500-words",
    "slug": "english-3500-root-affix",
    "title": "词根词缀扩展路线",
    "titleEn": null,
    "summary": "把能长出一串词的词根词缀拉成网络，让孩子从记一个词升级为记一个家族。",
    "order": 4,
    "difficulty": "中等",
    "status": "available",
    "learningGoals": [
      "能从 act、form、spect、struct 等高频词根看出共同词义",
      "能用 un-、re- 这类词缀判断词义方向变化",
      "能把零散词重新归回同一个词义家族"
    ],
    "coreTakeaways": [
      "词根是核心义，词缀负责推动方向和词性",
      "从词族入手，背词速度和猜词能力都会提升",
      "词根词缀最适合放在高频词之后做第二层扩展"
    ],
    "keywords": [
      "词根词缀扩展路线",
      "high-school-3500-words"
    ],
    "relatedUnits": [
      "english-3500-overview",
      "english-word-roots",
      "english-affix-network"
    ],
    "demoIds": [
      "english-3500-root-affix"
    ],
    "migrationSource": "product/english-3500-framework/root-affix"
  },
  {
    "id": "english-english-3500-confusing-words",
    "subjectId": "english",
    "moduleId": "english-high-school-3500-words",
    "slug": "english-3500-confusing-words",
    "title": "近义易混词辨析",
    "titleEn": null,
    "summary": "把 say、speak、talk、tell 这类高频混淆组拆开，帮助孩子减少“明明见过却总做错”的情况。",
    "order": 5,
    "difficulty": "中等",
    "status": "available",
    "learningGoals": [
      "能区分表达类、问题类等高频近义易混词的核心差别",
      "能把近义词辨析和常见搭配、句子位置联系起来",
      "能在完形和单选里减少凭感觉乱选的情况"
    ],
    "coreTakeaways": [
      "近义词题先看关系和位置，再看中文意思",
      "同样一个中文义，英语里常常对应不同使用场景",
      "辨析训练最怕一组塞太多，应该小组高频反复"
    ],
    "keywords": [
      "近义易混词辨析",
      "high-school-3500-words"
    ],
    "relatedUnits": [
      "english-3500-polysemy",
      "english-synonym-semantic-map",
      "english-3500-grade-one-roadmap"
    ],
    "demoIds": [
      "english-3500-confusing-words"
    ],
    "migrationSource": "product/english-3500-framework/confusing-words"
  },
  {
    "id": "english-english-3500-polysemy",
    "subjectId": "english",
    "moduleId": "english-high-school-3500-words",
    "slug": "english-3500-polysemy",
    "title": "一词多义词地图",
    "titleEn": null,
    "summary": "把 develop、record、mean 这类多义词拆成分支图，帮助孩子在阅读里更快切换到正确义项。",
    "order": 6,
    "difficulty": "中等",
    "status": "available",
    "learningGoals": [
      "能看懂多义词不是多个孤立意思，而是围绕核心义展开",
      "能在阅读语境里判断当前应该调用哪一个义项",
      "能减少“这个词我认识但句子还是看不懂”的情况"
    ],
    "coreTakeaways": [
      "多义词最稳的记法是核心义 + 场景分支",
      "阅读里真正考的是语境切换，不是孤立词义记忆",
      "高频多义词值得单独拆出来反复练"
    ],
    "keywords": [
      "一词多义词地图",
      "high-school-3500-words"
    ],
    "relatedUnits": [
      "english-3500-confusing-words",
      "english-3500-overview",
      "english-3500-grade-one-roadmap"
    ],
    "demoIds": [
      "english-3500-polysemy"
    ],
    "migrationSource": "product/english-3500-framework/polysemy"
  },
  {
    "id": "english-english-3500-collocations",
    "subjectId": "english",
    "moduleId": "english-high-school-3500-words",
    "slug": "english-3500-collocations",
    "title": "固定搭配与词块",
    "titleEn": null,
    "summary": "把高一最值得先掌握的学习表达、人际关系和写作逻辑块整理成可背、可用的整块表达。",
    "order": 7,
    "difficulty": "基础",
    "status": "available",
    "learningGoals": [
      "能把 hand in、take notes、make progress 这类高频词块整块记住",
      "能在写作和阅读里快速识别常用逻辑表达块",
      "能从“会认单词”进一步走向“会用表达”"
    ],
    "coreTakeaways": [
      "真正实用的背词，必须把词块一起带上",
      "高频词块能显著降低写作起句和阅读识别难度",
      "词块比单词更接近真实语言使用"
    ],
    "keywords": [
      "固定搭配与词块",
      "high-school-3500-words"
    ],
    "relatedUnits": [
      "english-3500-core-high-frequency",
      "english-3500-theme-vocabulary",
      "english-logic-connector-map"
    ],
    "demoIds": [
      "english-3500-collocations"
    ],
    "migrationSource": "product/english-3500-framework/collocations"
  },
  {
    "id": "english-english-3500-theme-vocabulary",
    "subjectId": "english",
    "moduleId": "english-high-school-3500-words",
    "slug": "english-3500-theme-vocabulary",
    "title": "主题场景词网络",
    "titleEn": null,
    "summary": "把学校生活、科技方法等高频主题场景拉成词域网络，帮助孩子在读文章前先建立语义预判。",
    "order": 8,
    "difficulty": "基础",
    "status": "available",
    "learningGoals": [
      "能按学校、科技、环境、人物品质等主题组织高频词",
      "能在进入阅读前先预判一篇文章会出现哪些词域",
      "能把零散词回收到更稳定的场景网里"
    ],
    "coreTakeaways": [
      "主题词能提高阅读中的预判能力",
      "同一主题下的词更容易在脑子里连成场景",
      "场景词适合和高频词、词块穿插复习"
    ],
    "keywords": [
      "主题场景词网络",
      "high-school-3500-words"
    ],
    "relatedUnits": [
      "english-3500-core-high-frequency",
      "english-3500-collocations",
      "english-3500-grade-one-roadmap"
    ],
    "demoIds": [
      "english-3500-theme-vocabulary"
    ],
    "migrationSource": "product/english-3500-framework/theme-vocabulary"
  },
  {
    "id": "english-english-3500-grade-one-roadmap",
    "subjectId": "english",
    "moduleId": "english-high-school-3500-words",
    "slug": "english-3500-grade-one-roadmap",
    "title": "高一上学期背诵路线",
    "titleEn": null,
    "summary": "把高一上学期该先背什么、后背什么、每个阶段大概背多少词整理成一条可执行路线。",
    "order": 9,
    "difficulty": "基础",
    "status": "available",
    "learningGoals": [
      "能看懂高一上学期四个背词阶段分别解决什么问题",
      "能把 3500 词拆成高一阶段真正能执行的小步路线",
      "能建立复习节奏，而不是只顾每天背新词"
    ],
    "coreTakeaways": [
      "高一背词最怕平铺和断复习，路线比总量更重要",
      "先地基、再扩展、再纠错、再表达，是更稳的顺序",
      "真正记住单词，靠的是分组和复现，而不是一次性猛背"
    ],
    "keywords": [
      "高一上学期背诵路线",
      "high-school-3500-words"
    ],
    "relatedUnits": [
      "english-3500-overview",
      "english-3500-core-high-frequency",
      "english-3500-confusing-words"
    ],
    "demoIds": [
      "english-3500-grade-one-roadmap"
    ],
    "migrationSource": "product/english-3500-framework/grade-one-roadmap"
  }
];
