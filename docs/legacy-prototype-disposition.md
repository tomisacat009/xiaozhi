# 旧原型目录清理说明

更新时间：2026-07-04

## 结论

旧原型目录已经从当前仓库中彻底删除，不再保留运行文件或归档副本。

原因：

- 内容迁移、结构迁移和多轮清理已经完成，继续保留旧原型只会制造误导。
- 当前生产工程已经切换到全新的 `Next.js` 架构，仓库应只保留正式代码和过程文档。
- 后续开发将以 AI Agent 协作和现行测试体系为主，不再需要旧运行壳和旧测试目录。

当前补充说明：

- 新站已经成为唯一正式运行入口。
- 仓库中的历史参考改由 `docs/` 下的设计、计划和清理说明承担。
- 正式站点中的 `4` 个学科、`17` 个模块和 `72` 个知识点骨架已经完成迁移接入。

## 本次清理范围

本次已经删除：

- `legacy/prototype-v1/assets/`
- `legacy/prototype-v1/demos/`
- `legacy/prototype-v1/modules/`
- `legacy/prototype-v1/subjects/`
- `legacy/prototype-v1/tests/`
- `legacy/prototype-v1/index.html`
- `legacy/prototype-v1/README.md`

说明：

- 对应信息已经迁移到正式内容源、正式 demo 引擎和当前测试体系。
- 历史上下文主要保留在 `docs/project-overview.md`、`docs/content-migration-inventory.md` 以及当前仓库中的正式项目文档中。

## 后续原则

1. 仓库只保留正式运行所需代码、测试和项目文档。
2. 历史迁移记录统一放在 `docs/`，不再保留并行的旧运行时目录。
3. 如果未来需要记录 AI Agent 过程文件，统一放在本地 `docs/superpowers/` 下，并保持不纳入 git。
