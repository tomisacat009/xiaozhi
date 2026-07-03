# GitHub 发布清单

## 发布前必查

- `README.md` 已更新为当前正式状态
- 项目名称统一为 `小智 / Xiaozhi`
- 仓库描述与定位清晰
- 旧原型目录说明清楚，不会让访问者误以为它仍是正式运行入口

## 代码质量检查

在发布或推送主分支前，建议完整执行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm exec next build --webpack
```

## 特别注意

### Next 构建后的类型漂移

`pnpm exec next build --webpack` 之后，Next 可能会自动修改：

- `tsconfig.json`
- `next-env.d.ts`

提交前检查以下内容不要残留在 Git 变更里：

- `.next/types/**/*.ts`
- `.next/dev/types/**/*.ts`
- `import "./.next/types/routes.d.ts";`

## GitHub 仓库页面建议

建议在 GitHub 仓库设置中补齐：

- Description：一句话说明小智是什么
- Website：如果后续有线上地址可补上
- Topics：`nextjs`、`typescript`、`education`、`high-school`、`interactive-learning`、`visualization`

## 建议的 README 重点

对外展示时，README 最重要的信息顺序建议是：

1. 小智是什么
2. 它解决什么问题
3. 当前完成到什么程度
4. 怎么运行
5. 怎么验证
6. 旧原型与正式站点的关系

## 发布前资产建议

如果你准备把仓库做得更适合公开展示，建议继续补：

- 首页截图
- 典型知识点页截图
- 1 到 2 个交互 demo 动图或录屏
- 一页式项目定位说明

## 建议的首次公开版本说明

首次公开时，可以把版本描述为：

> `v0.x` 阶段：完成从演示原型到生产级前端工程的结构迁移，建立正式内容路由、学习路径、统一 demo 引擎，并接入一批关键知识点交互能力。

## 推送前最后检查

- `git status` 干净
- 构建漂移已恢复
- 没有把本地临时文件、截图缓存、`.next` 相关产物误提交
- commit message 可读、分层清楚
