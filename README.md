# 小智 Xiaozhi

小智（Xiaozhi）是一个面向高中学习场景的知识可视化网站。它的目标不是只给出结论，而是把一个知识点背后的结构、变化规律和底层原理，用图形化、可交互的方式讲透。

当前仓库已经从早期演示原型，迁移到一套可持续演进的 `Next.js + TypeScript + React` 生产级前端工程，并同时兼容电脑端浏览器和手机端浏览器访问。

## 项目定位

- 面向人群：高中生
- 核心价值：把抽象知识点讲成“能看见、能操作、能建立结构理解”的学习体验
- 内容方向：数学、物理、化学、英语
- 产品方法：正文内容 + 图形结构 + 交互 demo + 学习路径

更完整的项目说明见 [docs/project-overview.md](/Users/lilei/New/Xiaozhi/docs/project-overview.md)。

## 当前进度

当前正式站点已经完成这些基础建设：

- 接入 `4` 个学科
- 接入 `17` 个模块
- 接入 `72` 个知识点页面
- 建立学习路径与全量内容路由
- 完成旧原型内容的正文迁移
- 建立统一 demo 引擎与注册表
- 已接入一批正式交互 demo 与轻交互知识结构板

当前已重点覆盖的正式交互方向包括：

- 数学：一次函数、二次函数、反比例函数、指数与对数、幂函数、三角函数参数、正切间断、圆锥曲线基础、点线距离、集合、立体几何等
- 物理：匀速、匀变速、平抛、力的合成、牛顿第二定律、功能关系
- 化学：物质分类、物质的量、离子反应、氧化还原、离子检验
- 英语：从句层级、句子结构、词根词缀、词族网络、逻辑连接词、时态时间轴、语法填空决策流、阅读分层

旧版原型已经归档到 `legacy/prototype-v1/`，只保留为迁移参考，不再参与正式运行。

## 目录结构

```text
app/                    Next.js App Router 页面
components/             通用组件与 demo 组件
content/                学科、模块、知识点、demo 注册内容
engine/                 demo 引擎与图形渲染能力
features/               页面级组合逻辑
lib/                    内容加载、路由与基础工具
tests/                  unit / integration / e2e 测试
legacy/prototype-v1/    已归档旧原型，仅作迁移参考
docs/                   设计、计划、迁移台账、项目文档
```

## 本地开发

```bash
pnpm install
pnpm dev
```

默认开发地址：

- 首页：`http://localhost:3000`
- 学科页示例：`/subjects/math`
- 知识点页示例：`/subjects/math/functions/quadratic-function`

## 常用脚本

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm exec next build --webpack
```

说明：

- 在当前环境里，生产构建建议使用 `pnpm exec next build --webpack`
- `next build` 之后，Next 可能会自动改写 `tsconfig.json` 和 `next-env.d.ts`，提交前需要确认没有把 `.next` 相关类型漂移带进仓库

## 测试与质量

当前仓库已经接入：

- `Vitest`：单元测试与集成测试
- `Playwright`：桌面端与移动端关键路径验证
- `ESLint`：代码规范检查
- `TypeScript`：静态类型检查

建议在提交前至少执行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm exec next build --webpack
```

## 迁移策略

这个仓库不是把旧原型“原样接回运行时”，而是采用：

- `迁移同时重构`
- `允许适度重组`
- `旧原型只作为输入，不作为正式运行入口`

相关资料：

- 迁移设计：[docs/superpowers/specs/2026-07-03-xiaozhi-full-content-migration-design.md](/Users/lilei/New/Xiaozhi/docs/superpowers/specs/2026-07-03-xiaozhi-full-content-migration-design.md)
- 迁移计划：[docs/superpowers/plans/2026-07-03-xiaozhi-full-content-migration-plan.md](/Users/lilei/New/Xiaozhi/docs/superpowers/plans/2026-07-03-xiaozhi-full-content-migration-plan.md)
- 迁移台账：[docs/content-migration-inventory.md](/Users/lilei/New/Xiaozhi/docs/content-migration-inventory.md)
- 旧原型去留说明：[docs/legacy-prototype-disposition.md](/Users/lilei/New/Xiaozhi/docs/legacy-prototype-disposition.md)

## GitHub 发布建议

如果你准备把这个仓库持续维护在 GitHub 上，建议按这个顺序整理：

1. 检查 `README`、截图、项目简介是否完整
2. 确认主分支可以通过 `lint`、`typecheck`、`test`、`e2e`、`build`
3. 补充仓库描述、topics、首页链接
4. 再进行公开发布或后续迭代

完整清单见 [docs/github-release-checklist.md](/Users/lilei/New/Xiaozhi/docs/github-release-checklist.md)。

## 下一阶段

后续可以继续推进这几类工作：

- 把剩余未覆盖的知识点逐步升级成正式交互 demo
- 深化知识点正文与学习路径编排
- 补充更多移动端交互与可视化细节优化
- 增强截图、项目文档、对外展示材料

## 仓库说明

- 仓库地址：[tomisacat009/xiaozhi](https://github.com/tomisacat009/xiaozhi)
- 当前项目名：`小智 / Xiaozhi`
- 当前仓库仍为前端主工程，未引入 CMS、用户体系、付费体系、教师端或运营端
