# 小智旧内容迁移台账

更新时间：2026-07-03

## 汇总

- 迁移记录总数：`150`
- 模块记录：`17`
- 单元记录：`72`
- 演示器记录：`61`

## 原则

- 保持学科主线不变。
- 允许适度重组，但不改变核心知识路线。
- 旧 demo 统一按 `rewrite-demo` 或 `archive-only` 处理，不直接复用旧运行时。

## 当前正式交互覆盖说明

以下知识点已经从“仅有旧原型记录”推进到“正式站点可体验”：

- 数学：`linear`、`reciprocal`、`exp-log`、`power`、`quadratic-function`、`sin-basic`、`sin-transform`、`cos-basic`、`tan-basic`、`line-circle`、`parabola-standard`、`ellipse-standard`、`hyperbola-standard`、`conic-overview`、`line-conic-relation`、`point-line-distance`、`solid-section`、`solid-rotation`、`sets-basics`、`set-operations`
- 物理：`physics-uniform-motion`、`physics-accelerated-motion`、`physics-projectile-motion`、`physics-force-composition`、`physics-newton-second-law`、`physics-work-energy-synthesis`
- 化学：`chemistry-material-classification`、`chemistry-mole`、`chemistry-ionic-reaction`、`chemistry-redox`、`chemistry-ion-identification`
- 英语：`english-clause-hierarchy`、`english-sentence-structure`、`english-reading-layer`、`english-tense-timeline`、`english-affix-network`、`english-logic-connector-map`、`english-word-family-atlas`、`english-word-roots`、`english-grammar-cloze-strategy`

## math

- 模块数：`6`
- 单元数：`24`
- 演示器数：`31`

| 类型 | 旧标题 | 目标模块 | 目标单元 slug | 动作 | 优先级 |
| --- | --- | --- | --- | --- | --- |
| module | 解析几何 | analytic-geometry | - | migrate-as-is | high |
| module | 函数与图像 | functions | - | migrate-as-is | high |
| module | 数列与递推模型 | sequences | - | migrate-as-is | high |
| module | 集合与逻辑 | sets-logic | - | migrate-as-is | high |
| module | 立体几何 | solid-geometry | - | migrate-as-is | high |
| module | 三角函数与周期模型 | trigonometry | - | migrate-as-is | high |
| unit | 圆的标准方程与图像 | analytic-geometry | circle-standard | migrate-as-is | medium |
| unit | 圆锥曲线总览与对比 | analytic-geometry | conic-overview | migrate-as-is | medium |
| unit | 椭圆标准方程与长短轴变化 | analytic-geometry | ellipse-standard | migrate-as-is | medium |
| unit | 双曲线标准方程与渐近线变化 | analytic-geometry | hyperbola-standard | migrate-as-is | medium |
| unit | 直线与圆的位置关系 | analytic-geometry | line-circle | migrate-as-is | high |
| unit | 直线与圆锥曲线位置关系 | analytic-geometry | line-conic-relation | migrate-as-is | medium |
| unit | 抛物线标准方程与开口变化 | analytic-geometry | parabola-standard | migrate-as-is | medium |
| unit | 点到直线距离的图形理解 | analytic-geometry | point-line-distance | migrate-as-is | medium |
| unit | 指数函数与对数函数对比 | functions | exp-log | migrate-as-is | high |
| unit | 一次函数变化 | functions | linear | migrate-as-is | high |
| unit | 幂函数与图像变化 | functions | power | migrate-as-is | medium |
| unit | 二次函数变化 | functions | quadratic | migrate-as-is | high |
| unit | 反比例函数变化 | functions | reciprocal | migrate-as-is | medium |
| unit | 函数平移与伸缩总复习 | functions | transform-review | migrate-as-is | medium |
| unit | 递推数列生成过程 | sequences | sequence-recursive | migrate-as-is | medium |
| unit | 等差与等比数列生成过程 | sequences | sequences-basic | migrate-as-is | high |
| unit | 集合运算与韦恩图 | sets-logic | set-operations | migrate-as-is | high |
| unit | 集合基础概念 | sets-logic | sets-basics | migrate-as-is | high |
| unit | 旋转体生成过程 | solid-geometry | solid-rotation | migrate-as-is | medium |
| unit | 立体几何体与截面变化 | solid-geometry | solid-section | migrate-as-is | high |
| unit | 余弦函数基础图像 | trigonometry | cos-basic | migrate-as-is | medium |
| unit | sin(x) 基础图像 | trigonometry | sin-basic | migrate-as-is | high |
| unit | 三角函数参数变化 | trigonometry | sin-transform | migrate-as-is | high |
| unit | 正切函数与间断感知 | trigonometry | tan-basic | migrate-as-is | medium |
| demo | 圆的标准方程演示器 | analytic-geometry | circle-standard | rewrite-demo | medium |
| demo | 圆锥曲线总览演示器 | analytic-geometry | conic-overview | rewrite-demo | medium |
| demo | 椭圆标准方程演示器 | analytic-geometry | ellipse-standard | rewrite-demo | medium |
| demo | 双曲线标准方程演示器 | analytic-geometry | hyperbola-standard | rewrite-demo | medium |
| demo | 直线与圆演示器 | analytic-geometry | line-circle | rewrite-demo | high |
| demo | 直线与圆锥曲线位置关系演示器 | analytic-geometry | line-conic-relation | rewrite-demo | medium |
| demo | 抛物线标准方程演示器 | analytic-geometry | parabola-standard | rewrite-demo | medium |
| demo | 点到直线距离演示器 | analytic-geometry | point-line-distance | rewrite-demo | medium |
| demo | sin函数演示器 | functions | - | archive-only | medium |
| demo | 写作升级工坊演示器 | functions | - | archive-only | medium |
| demo | 函数变换演示器 | functions | - | archive-only | medium |
| demo | 前后缀网络演示器 | functions | - | archive-only | medium |
| demo | 实验装置演示器 | functions | - | archive-only | medium |
| demo | 指数与对数演示器 | functions | - | archive-only | medium |
| demo | 立体截面演示器 | functions | - | archive-only | medium |
| demo | 等差等比数列演示器 | functions | - | archive-only | medium |
| demo | 词根词缀演示器 | functions | - | archive-only | medium |
| demo | 长难句压缩演示器 | functions | - | archive-only | medium |
| demo | 阅读分层演示器 | functions | - | archive-only | medium |
| demo | 高频词族网络演示器 | functions | - | archive-only | medium |
| demo | 一次函数演示器 | functions | linear | rewrite-demo | high |
| demo | 幂函数演示器 | functions | power | rewrite-demo | medium |
| demo | 函数变化演示器 | functions | quadratic | rewrite-demo | high |
| demo | 反比例函数演示器 | functions | reciprocal | rewrite-demo | medium |
| demo | 递推数列演示器 | sequences | sequence-recursive | rewrite-demo | medium |
| demo | 集合运算与韦恩图演示器 | sets-logic | set-operations | rewrite-demo | high |
| demo | 集合基础概念演示器 | sets-logic | sets-basics | rewrite-demo | high |
| demo | 旋转体生成演示器 | solid-geometry | solid-rotation | rewrite-demo | medium |
| demo | 余弦函数演示器 | trigonometry | cos-basic | rewrite-demo | medium |
| demo | 三角函数参数演示器 | trigonometry | sin-transform | rewrite-demo | high |
| demo | 正切函数演示器 | trigonometry | tan-basic | rewrite-demo | medium |

## physics

- 模块数：`5`
- 单元数：`22`
- 演示器数：`11`

| 类型 | 旧标题 | 目标模块 | 目标单元 slug | 动作 | 优先级 |
| --- | --- | --- | --- | --- | --- |
| module | 电学与电路 | electricity | - | migrate-as-is | high |
| module | 功与能量 | energy | - | migrate-as-is | high |
| module | 力与受力分析 | force | - | migrate-as-is | high |
| module | 运动与图像 | motion | - | migrate-as-is | high |
| module | 振动与波动 | wave | - | migrate-as-is | high |
| unit | 欧姆定律与伏安关系 | electricity | physics-ohms-law | migrate-as-is | medium |
| unit | 串联与并联电路对比 | electricity | physics-series-parallel | migrate-as-is | medium |
| unit | 动能定理 | energy | physics-kinetic-energy | migrate-as-is | medium |
| unit | 机械能守恒 | energy | physics-mechanical-energy | migrate-as-is | medium |
| unit | 功能量综合应用 | energy | physics-work-energy-synthesis | migrate-as-is | medium |
| unit | 功与功率 | energy | physics-work-power | migrate-as-is | medium |
| unit | 连接体受力与整体隔离 | force | physics-connected-bodies | migrate-as-is | medium |
| unit | 共点力平衡与受力平衡 | force | physics-force-balance | migrate-as-is | medium |
| unit | 力的合成与分解 | force | physics-force-composition | migrate-as-is | high |
| unit | 摩擦力与临界状态 | force | physics-friction | migrate-as-is | medium |
| unit | 斜面受力与运动 | force | physics-incline-motion | migrate-as-is | medium |
| unit | 牛顿第二定律的变量关系 | force | physics-newton-second-law | migrate-as-is | high |
| unit | 超重与失重 | force | physics-overweight-weightlessness | migrate-as-is | medium |
| unit | 匀变速直线运动与图像 | motion | physics-accelerated-motion | migrate-as-is | high |
| unit | 自由落体 | motion | physics-free-fall | migrate-as-is | medium |
| unit | 匀速与匀变速追及 | motion | physics-mixed-chase | migrate-as-is | medium |
| unit | 运动图像综合判读 | motion | physics-motion-graphs | migrate-as-is | medium |
| unit | 平抛运动 | motion | physics-projectile-motion | migrate-as-is | medium |
| unit | 两车匀速追及 | motion | physics-uniform-chase | migrate-as-is | medium |
| unit | 匀速直线运动与图像 | motion | physics-uniform-motion | migrate-as-is | high |
| unit | 简谐振动的周期与图像 | wave | physics-vibration | migrate-as-is | medium |
| unit | 波的传播与相位感知 | wave | physics-wave-propagation | migrate-as-is | medium |
| demo | 机械能守恒演示器 | energy | physics-mechanical-energy | rewrite-demo | medium |
| demo | 功能量综合应用演示器 | energy | physics-work-energy-synthesis | rewrite-demo | medium |
| demo | 连接体受力演示器 | force | physics-connected-bodies | rewrite-demo | medium |
| demo | 超重与失重演示器 | force | physics-overweight-weightlessness | rewrite-demo | medium |
| demo | 匀变速直线运动演示器 | motion | physics-accelerated-motion | rewrite-demo | high |
| demo | 自由落体演示器 | motion | physics-free-fall | rewrite-demo | medium |
| demo | 匀速与匀变速追及演示器 | motion | physics-mixed-chase | rewrite-demo | medium |
| demo | 运动图像综合判读演示器 | motion | physics-motion-graphs | rewrite-demo | medium |
| demo | 平抛运动演示器 | motion | physics-projectile-motion | rewrite-demo | medium |
| demo | 两车匀速追及演示器 | motion | physics-uniform-chase | rewrite-demo | medium |
| demo | 匀速直线运动演示器 | motion | physics-uniform-motion | rewrite-demo | high |

## chemistry

- 模块数：`4`
- 单元数：`10`
- 演示器数：`9`

| 类型 | 旧标题 | 目标模块 | 目标单元 slug | 动作 | 优先级 |
| --- | --- | --- | --- | --- | --- |
| module | 化学语言与定量基础 | chemical-language | - | migrate-as-is | high |
| module | 元素化合物 | elements-compounds | - | migrate-as-is | high |
| module | 化学实验与现象 | experiments | - | migrate-as-is | high |
| module | 反应原理与粒子变化 | reaction-principles | - | migrate-as-is | high |
| unit | 分散系与胶体 | chemical-language | chemistry-dispersion-colloid | migrate-as-is | medium |
| unit | 物质分类与转化关系 | chemical-language | chemistry-material-classification | migrate-as-is | high |
| unit | 物质的量与微粒关系 | chemical-language | chemistry-mole | migrate-as-is | high |
| unit | 氯及其化合物 | elements-compounds | chemistry-chlorine | migrate-as-is | medium |
| unit | 铁及其化合物 | elements-compounds | chemistry-iron | migrate-as-is | medium |
| unit | 钠及其化合物 | elements-compounds | chemistry-sodium | migrate-as-is | medium |
| unit | 离子检验与实验现象 | experiments | chemistry-ion-identification | migrate-as-is | medium |
| unit | 化学实验基础与装置 | experiments | chemistry-lab-devices | migrate-as-is | medium |
| unit | 离子反应与电解质 | reaction-principles | chemistry-ionic-reaction | migrate-as-is | high |
| unit | 氧化还原反应与电子转移 | reaction-principles | chemistry-redox | migrate-as-is | high |
| demo | 分散系与胶体演示器 | chemical-language | chemistry-dispersion-colloid | rewrite-demo | medium |
| demo | 物质分类演示器 | chemical-language | chemistry-material-classification | rewrite-demo | high |
| demo | 物质的量演示器 | chemical-language | chemistry-mole | rewrite-demo | high |
| demo | 氯及其化合物演示器 | elements-compounds | chemistry-chlorine | rewrite-demo | medium |
| demo | 铁及其化合物演示器 | elements-compounds | chemistry-iron | rewrite-demo | medium |
| demo | 钠及其化合物演示器 | elements-compounds | chemistry-sodium | rewrite-demo | medium |
| demo | 离子检验演示器 | experiments | chemistry-ion-identification | rewrite-demo | medium |
| demo | 离子反应与电解质演示器 | reaction-principles | chemistry-ionic-reaction | rewrite-demo | high |
| demo | 氧化还原反应演示器 | reaction-principles | chemistry-redox | rewrite-demo | high |

## english

- 模块数：`2`
- 单元数：`16`
- 演示器数：`10`

| 类型 | 旧标题 | 目标模块 | 目标单元 slug | 动作 | 优先级 |
| --- | --- | --- | --- | --- | --- |
| module | 词根词缀与词汇网络 | roots-vocabulary-network | - | migrate-as-is | high |
| module | 句子结构与语法拆解 | sentence-structure | - | migrate-as-is | high |
| unit | 前后缀变义网络 | roots-vocabulary-network | english-affix-network | migrate-as-is | medium |
| unit | 语法填空策略演示器 | roots-vocabulary-network | english-grammar-cloze-strategy | migrate-as-is | medium |
| unit | 逻辑连接词网络 | roots-vocabulary-network | english-logic-connector-map | migrate-as-is | medium |
| unit | 近义词语义坐标图 | roots-vocabulary-network | english-synonym-semantic-map | migrate-as-is | medium |
| unit | 高频教材词族网络 | roots-vocabulary-network | english-word-family-atlas | migrate-as-is | medium |
| unit | 词根归类与词义扩展 | roots-vocabulary-network | english-word-roots | migrate-as-is | high |
| unit | 作文段落展开工坊 | roots-vocabulary-network | english-writing-paragraph-workshop | migrate-as-is | medium |
| unit | 写作句型升级工坊 | roots-vocabulary-network | english-writing-upgrade-workshop | migrate-as-is | medium |
| unit | 从句层级拆解 | sentence-structure | english-clause-hierarchy | migrate-as-is | medium |
| unit | 听力信息捕捉流程图 | sentence-structure | english-listening-capture | migrate-as-is | medium |
| unit | 非谓语结构关系图 | sentence-structure | english-nonfinite-structure | migrate-as-is | medium |
| unit | 阅读信息分层 | sentence-structure | english-reading-layer | migrate-as-is | medium |
| unit | 阅读题型拆解演示器 | sentence-structure | english-reading-question-map | migrate-as-is | medium |
| unit | 长难句主干压缩 | sentence-structure | english-sentence-compression | migrate-as-is | medium |
| unit | 句子成分结构拆解 | sentence-structure | english-sentence-structure | migrate-as-is | high |
| unit | 语法时态时间轴 | sentence-structure | english-tense-timeline | migrate-as-is | medium |
| demo | 语法填空策略演示器 | roots-vocabulary-network | english-grammar-cloze-strategy | rewrite-demo | medium |
| demo | 逻辑连接词网络演示器 | roots-vocabulary-network | english-logic-connector-map | rewrite-demo | medium |
| demo | 近义词语义坐标演示器 | roots-vocabulary-network | english-synonym-semantic-map | rewrite-demo | medium |
| demo | 段落展开工坊演示器 | roots-vocabulary-network | english-writing-paragraph-workshop | rewrite-demo | medium |
| demo | 从句层级演示器 | sentence-structure | english-clause-hierarchy | rewrite-demo | medium |
| demo | 听力信息捕捉演示器 | sentence-structure | english-listening-capture | rewrite-demo | medium |
| demo | 非谓语结构演示器 | sentence-structure | english-nonfinite-structure | rewrite-demo | medium |
| demo | 阅读题型拆解演示器 | sentence-structure | english-reading-question-map | rewrite-demo | medium |
| demo | 句子成分演示器 | sentence-structure | english-sentence-structure | rewrite-demo | high |
| demo | 时态时间轴演示器 | sentence-structure | english-tense-timeline | rewrite-demo | medium |
