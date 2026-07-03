# 旧原型文件去留说明

更新时间：2026-07-03

## 结论

本次不直接删除旧原型，而是统一归档到 `legacy/prototype-v1/`。

原因：

- 旧原型里仍然保留了大量可迁移的教学文案、知识结构拆分和交互逻辑。
- 当前生产工程已经切换到全新的 `Next.js` 架构，继续把旧文件放在仓库根目录会干扰日常开发与测试判断。
- 先归档再按主题迁移，风险比“先删后补”更低。

当前补充说明：

- 新站已经成为唯一正式运行入口。
- 旧原型继续保留，但角色已经明确变成“归档参考资产”。
- 正式站点中的 `4` 个学科、`17` 个模块和 `72` 个知识点骨架已经完成迁移接入。

## 分类结果

### 1. 保留为迁移参考

- `legacy/prototype-v1/assets/content.js`
  - 保存了早期学科结构、模块层级与单元摘要，可作为内容迁移时的盘点底稿。
- `legacy/prototype-v1/assets/math-viz-core.mjs`
  - 含较多数学与几何推导辅助函数，适合迁移时逐个甄别并重写到现行 TypeScript 引擎。
- `legacy/prototype-v1/demos/shared/`
  - 保存多学科演示器的共享教学卡片、模型构造与图形组织方式，参考价值较高。
- `legacy/prototype-v1/demos/*`
  - 每个演示器目录都保留了一套“参数 -> 图形 -> 讲解”的旧实现，可作为后续专题迁移素材。
- `legacy/prototype-v1/modules/`、`legacy/prototype-v1/subjects/`、`legacy/prototype-v1/index.html`
  - 保留旧版信息架构、文案语气和页面层级，便于对照内容迁移进度。

### 2. 保留但退出主开发流

- `legacy/prototype-v1/assets/system.css`
- `legacy/prototype-v1/assets/system.js`
- `legacy/prototype-v1/assets/engine/`
- `legacy/prototype-v1/tests/`

说明：

- 这些文件代表旧原型的运行壳和测试方式，仍可作为历史参考。
- 它们不再作为当前生产工程的样式、引擎或测试来源。
- 后续若要复用其思想，应迁移到现行 `engine/`、`components/`、`tests/unit` 或 `tests/integration` 中，而不是直接重新接线。
- 当前正式站点已经不再依赖这些目录运行。

### 3. 已清理的无效文件

- `legacy/prototype-v1/demos/.DS_Store`

说明：

- 这是无业务价值的系统缓存文件，应从仓库中移除。

## 迁移建议

后续继续生产化时，建议按以下优先级消化这批归档资产：

1. 优先迁移高频、高价值的单元教学表达，而不是整套旧页面结构。
2. 优先抽取可复用的“知识模型”和“讲解卡片结构”，不要直接搬运旧 DOM 组织。
3. 历史测试只保留为参考案例，真正继续使用的断言应重写到现行测试体系里。
4. 当某个归档目录已经完全失去参考价值，再单独做一次删除提交，保持变更可追踪。
