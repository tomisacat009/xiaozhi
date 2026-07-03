# 小智 Xiaozhi

面向高中的知识可视化学习网站，使用 Next.js + TypeScript + React App Router 搭建。

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
