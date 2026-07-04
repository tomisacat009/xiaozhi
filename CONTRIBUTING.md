# Contributing to Xiaozhi

感谢你关注小智（Xiaozhi）。

这个项目当前的目标，是把高中阶段的重要知识点做成可视化、可交互、可持续演进的正式学习产品。我们欢迎对内容、交互、工程和文档的改进建议。

## 你可以贡献什么

- 新的知识点正文、学习目标、核心结论和学习路径
- 数学、物理、化学、英语相关的正式交互 demo
- 页面体验、移动端兼容性、可访问性优化
- 测试覆盖补充与工程质量改进
- README、项目说明和发布文档的完善

## 开发环境

建议使用：

- Node.js `>= 22`
- `pnpm` `11`

安装依赖：

```bash
pnpm install
```

启动开发环境：

```bash
pnpm dev
```

## 提交前验证

请至少运行：

```bash
pnpm lint
pnpm typecheck
pnpm test
```

如果改动涉及页面行为、路由或发布链路，建议进一步执行：

```bash
pnpm test:e2e
pnpm exec next build --webpack
```

## 内容与交互约定

- 项目名统一使用：`小智 / Xiaozhi`
- 文档与用户沟通优先使用中文
- 正文内容必须是可交付状态，不保留“迁移说明”“交互演示迁移线索”“后续重构方向”这类过程性段落
- 交互和布局必须同时考虑电脑端与手机端兼容性
- 不恢复旧原型目录或旧运行时逻辑，正式能力统一落在现有工程结构中

## 目录约定

- `content/`：正式内容源
- `engine/`：可视化引擎与渲染器
- `components/`：通用组件与 demo 外壳
- `tests/`：正式测试
- `docs/superpowers/`：本地临时目录，默认不纳入 git

## Pull Request 建议

提交 PR 时，建议说明：

- 这个改动解决了什么问题
- 涉及哪些页面、内容或 demo
- 如何验证
- 是否影响桌面端与手机端体验

## License

本项目采用 [MIT License](LICENSE)。
