# 小智 Xiaozhi

面向高中的知识可视化学习网站，使用 Next.js + TypeScript + React App Router 搭建。

## 仓库结构

- 生产工程代码位于根目录下的 `app/`、`components/`、`content/`、`engine/`、`features/`、`lib/` 等目录。
- 当前生产站点已经接入 `4` 个学科、`17` 个模块、`72` 个知识点页面，以及桌面端/手机端都可访问的迁移骨架。
- 旧版静态原型已归档到 `legacy/prototype-v1/`，不再参与当前生产工程的开发、构建与测试。
- 旧原型的去留说明见 `docs/legacy-prototype-disposition.md`。

## 开发

```bash
pnpm install
pnpm dev
```

## 验证

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## 端到端验证

```bash
pnpm test:e2e
```

当前 `pnpm test` 仅覆盖这次 `Next.js` 正式脚手架新增的最小 smoke / integration 验证，不包含旧原型目录中的历史测试资产。`pnpm test:e2e` 使用 Playwright 桌面端与移动端项目验证首页到知识点演示页的关键链路。

## 当前状态

- 新站已经成为唯一正式运行入口。
- 旧原型保留在 `legacy/prototype-v1/`，仅作为历史参考和迁移素材，不再承担运行职责。
- 目前已完成内容台账、全量路由骨架、知识点正文迁移与学习路径接入；后续可继续把高价值知识点逐步升级为更完整的正式交互 demo。
