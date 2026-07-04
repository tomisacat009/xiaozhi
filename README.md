# 小智 Xiaozhi

[![CI](https://github.com/tomisacat009/xiaozhi/actions/workflows/ci.yml/badge.svg)](https://github.com/tomisacat009/xiaozhi/actions/workflows/ci.yml)

小智（Xiaozhi）是一个面向高中学习场景的知识可视化与交互式学习项目。

它关注的不是只给出题目答案，而是把一个知识点背后的结构关系、变化规律和底层原理，用图形化、可交互的方式讲清楚，让学生从“记结论”走向“真正理解”。

当前仓库已经从早期演示原型演进为一套正式的 `Next.js + TypeScript + React` 前端工程，并明确兼容电脑端浏览器与手机端浏览器访问。

## Why Xiaozhi

- 面向高中阶段的核心学科：数学、物理、化学、英语
- 用图形结构、参数变化和交互演示帮助学生建立底层理解
- 把正文内容、知识结构和 demo 引擎放在同一套可持续迭代的工程里
- 不依赖旧原型运行时，全部内容都在正式站点内重构和沉淀

## Current Scope

当前正式站点已经接入：

- `4` 个学科
- `17` 个模块
- `72` 个知识点页面
- 学习路径、知识点正文、统一 demo 外壳与多种正式渲染器

当前已重点覆盖的正式交互方向包括：

- 数学：一次函数、二次函数、反比例函数、指数与对数、幂函数、三角函数参数、正切间断、圆锥曲线基础、点线距离、集合、立体几何
- 物理：匀速、匀变速、平抛、力的合成、牛顿第二定律、功能关系、连接体、超重失重
- 化学：物质分类、物质的量、离子反应、氧化还原、离子检验
- 英语：从句层级、句子结构、词根词缀、词族网络、逻辑连接词、时态时间轴、语法填空决策流、阅读分层

## Tech Stack

- `Next.js` 16
- `React` 19
- `TypeScript`
- `Vitest`
- `Playwright`
- `ESLint`

## Project Structure

```text
app/                    Next.js App Router 页面入口
components/             通用组件与 demo 壳层组件
content/                学科、模块、知识点、学习路径、demo 注册内容
engine/                 demo 引擎与图形/结构渲染器
features/               页面级组合逻辑
lib/                    内容加载、路由、类型与基础工具
tests/                  unit / integration / e2e 测试
docs/                   项目说明、发布清单、迁移台账与过程文档
```

## Quick Start

### Requirements

- Node.js `>= 22`
- `pnpm` `11`

### Install

```bash
pnpm install
```

### Run Locally

```bash
pnpm dev
```

默认开发地址：

- 首页：`http://localhost:3000`
- 学科页示例：`/subjects/math`
- 知识点页示例：`/subjects/math/functions/quadratic-function`

## Available Scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm exec next build --webpack
```

说明：

- 在当前工程里，生产构建建议使用 `pnpm exec next build --webpack`
- `next build` 之后，Next 可能会自动改写 `tsconfig.json` 和 `next-env.d.ts`，提交前建议确认没有把构建漂移误带进 git

## Quality Checklist

在推送主分支或发布前，建议至少执行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm exec next build --webpack
```

## Documentation

- 项目概览：[docs/project-overview.md](docs/project-overview.md)
- GitHub 发布清单：[docs/github-release-checklist.md](docs/github-release-checklist.md)
- 内容迁移台账：[docs/content-migration-inventory.md](docs/content-migration-inventory.md)
- 旧原型清理说明：[docs/legacy-prototype-disposition.md](docs/legacy-prototype-disposition.md)

## Contributing

欢迎对以下方向提出 issue 或提交 PR：

- 新知识点的结构化正文与学习路径完善
- 数学 / 物理 / 化学 / 英语的正式可视化 demo 增补
- 桌面端与移动端的交互体验优化
- 测试覆盖、可访问性、文档质量与工程可维护性提升

开始贡献前，建议先阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

## Roadmap

下一阶段重点包括：

- 继续把剩余知识点升级为正式交互 demo
- 深化知识点正文中的误区提示、结构图和题型连接
- 补充更多 GitHub 展示素材，例如截图、录屏和示例链路
- 继续增强移动端交互与内容浏览体验

## Repository

- GitHub: [tomisacat009/xiaozhi](https://github.com/tomisacat009/xiaozhi)
- Project Name: `小智 / Xiaozhi`

## License

本项目采用 [MIT License](LICENSE)。
