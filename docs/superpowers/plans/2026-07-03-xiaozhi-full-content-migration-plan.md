# Xiaozhi Full Content Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all legacy Xiaozhi subjects, modules, knowledge units, and high-value demos into the production Next.js site while standardizing content models, naming, routing, compatibility, and testing.

**Architecture:** Treat `legacy/prototype-v1/` as the authoritative migration source, but never as runtime code. First build a typed migration manifest and complete site skeleton, then migrate structured content in batches, and only then rewrite high-value demos into the current TypeScript demo engine.

**Tech Stack:** Next.js, React, TypeScript, MDX, Vitest, Playwright, pnpm

## Global Constraints

- 采用 `迁移同时重构`，不做原样搬运
- 采用 `允许适度重组`，但不改变学科主线
- 小智必须同时兼容电脑端浏览器和手机端浏览器
- 旧原型只作为迁移输入，不再作为正式运行入口
- 学科、模块、路径等结构化元数据使用 `ts`
- 知识点正文使用 `mdx`
- demo 配置使用 `ts`
- 每一批迁移都必须可访问、可测试、可继续扩展
- 不引入 CMS、用户体系、付费体系、教师端、运营端

---

## Planned File Structure

### Create

- `docs/content-migration-inventory.md`
- `content/migration-manifest.ts`
- `content/learning-paths/index.ts`
- `content/units/math/**`
- `content/units/physics/**`
- `content/units/chemistry/**`
- `content/units/english/**`
- `content/demos/*.ts`
- `tests/unit/content/migration-manifest.test.ts`
- `tests/integration/content-routes.test.tsx`
- `tests/e2e/migrated-content-smoke.spec.ts`

### Modify

- `content/subjects.ts`
- `content/modules.ts`
- `lib/content/types.ts`
- `lib/content/registry.ts`
- `lib/content/loaders.ts`
- `lib/routes.ts`
- `features/subjects/subject-page.tsx`
- `features/modules/module-page.tsx`
- `features/knowledge/unit-page.tsx`
- `components/demo/*`
- `engine/core/*`
- `README.md`
- `docs/legacy-prototype-disposition.md`

## Task 1: Build The Full Migration Inventory

**Files:**
- Create: `docs/content-migration-inventory.md`
- Create: `content/migration-manifest.ts`
- Test: `tests/unit/content/migration-manifest.test.ts`

**Interfaces:**
- Produces:
  - `type MigrationManifestRecord`
  - `migrationManifest: MigrationManifestRecord[]`
  - `getManifestBySubject(subjectId: string): MigrationManifestRecord[]`

- [ ] Enumerate every legacy module file under `legacy/prototype-v1/modules/`.
- [ ] Enumerate every legacy demo directory under `legacy/prototype-v1/demos/`, excluding `shared/`.
- [ ] Group records by subject: `math`, `physics`, `chemistry`, `english`.
- [ ] For each record, assign `targetModule`, `targetUnitSlug`, `action`, `priority`, and `status: "planned"`.
- [ ] Document merge/split decisions in `docs/content-migration-inventory.md`.
- [ ] Add a unit test asserting that the manifest includes all four subjects and at least one record for every legacy module page.
- [ ] Run: `pnpm test -- tests/unit/content/migration-manifest.test.ts`
- [ ] Commit:

```bash
git add docs/content-migration-inventory.md content/migration-manifest.ts tests/unit/content/migration-manifest.test.ts
git commit -m "docs: add xiaozhi content migration inventory"
```

## Task 2: Expand The Production Content Model

**Files:**
- Modify: `lib/content/types.ts`
- Modify: `lib/content/registry.ts`
- Modify: `lib/content/loaders.ts`
- Modify: `content/subjects.ts`
- Modify: `content/modules.ts`
- Test: `tests/unit/content/registry.test.ts`

**Interfaces:**
- Consumes:
  - `migrationManifest: MigrationManifestRecord[]`
- Produces:
  - `type KnowledgeUnitMeta`
  - `type LearningPath`
  - `getAllUnits(): KnowledgeUnitMeta[]`
  - `getUnitsByModuleRoute(subjectSlug: string, moduleSlug: string): KnowledgeUnitMeta[]`
  - `getUnitByRoute(subjectSlug: string, moduleSlug: string, unitSlug: string): KnowledgeUnitMeta | null`

- [ ] Add typed fields for `difficulty`, `status`, `keywords`, `demoIds`, `learningGoals`, `relatedUnits`, and `migrationSource`.
- [ ] Add all legacy modules into `content/modules.ts`, preserving subject ownership and normalized slugs.
- [ ] Add initial metadata records for all knowledge units represented in the manifest.
- [ ] Keep existing production `quadratic-function` metadata valid during the expansion.
- [ ] Update registry tests so they assert full-subject module coverage instead of the current minimal smoke state.
- [ ] Run: `pnpm test -- tests/unit/content/registry.test.ts`
- [ ] Run: `pnpm typecheck`
- [ ] Commit:

```bash
git add lib/content/types.ts lib/content/registry.ts lib/content/loaders.ts content/subjects.ts content/modules.ts tests/unit/content/registry.test.ts
git commit -m "feat: expand xiaozhi content model for full migration"
```

## Task 3: Complete The Structural Site Skeleton

**Files:**
- Modify: `features/subjects/subject-page.tsx`
- Modify: `features/modules/module-page.tsx`
- Modify: `features/knowledge/unit-page.tsx`
- Modify: `lib/routes.ts`
- Test: `tests/integration/content-routes.test.tsx`
- Test: `tests/e2e/migrated-content-smoke.spec.ts`

**Interfaces:**
- Consumes:
  - `getAllUnits()`
  - `getUnitsByModuleRoute(...)`
  - `getUnitByRoute(...)`
- Produces:
  - accessible routes for all planned subject/module/unit combinations
  - visible content states: `available`, `migrating`, `planned`

- [ ] Make every subject page list all mapped production modules.
- [ ] Make every module page list all mapped units, even when demo migration is incomplete.
- [ ] Add a formal “迁移中 / 内容建设中” state to unit pages.
- [ ] Ensure breadcrumb and route helpers support the expanded inventory.
- [ ] Add integration tests that assert all registered units produce routable pages.
- [ ] Add a Playwright smoke test that opens one subject, one module, and one `status: "migrating"` unit on both desktop and mobile projects.
- [ ] Run: `pnpm test -- tests/integration/content-routes.test.tsx`
- [ ] Run: `pnpm test:e2e --grep "migrated content smoke"`
- [ ] Commit:

```bash
git add features/subjects/subject-page.tsx features/modules/module-page.tsx features/knowledge/unit-page.tsx lib/routes.ts tests/integration/content-routes.test.tsx tests/e2e/migrated-content-smoke.spec.ts
git commit -m "feat: expose full xiaozhi migration skeleton"
```

## Task 4: Migrate Math Content First

**Files:**
- Create: `content/units/math/**`
- Modify: `content/demos/*.ts`
- Modify: `engine/core/*`
- Test: `tests/unit/engine/*.test.ts`
- Test: `tests/e2e/home-to-demo.spec.ts`

**Interfaces:**
- Consumes:
  - `KnowledgeUnitMeta`
  - current demo shell APIs
- Produces:
  - migrated math units for functions, trigonometry, sequences, analytic geometry, solid geometry, sets
  - rewritten math demos in TypeScript

- [ ] Migrate math units in this order: `functions`, `trigonometry`, `sequences`, `analytic-geometry`, `solid-geometry`, `sets-logic`.
- [ ] Keep `quadratic-function` as the reference implementation and normalize neighboring math units to the same content/demos conventions.
- [ ] Rewrite reusable logic from `legacy/prototype-v1/assets/math-viz-core.mjs` into `engine/core/` instead of importing legacy `.mjs`.
- [ ] Migrate old shared conic and function demo ideas into production `DemoDefinition` files.
- [ ] Add or extend unit tests for newly rewritten math helper functions.
- [ ] Run: `pnpm test`
- [ ] Run: `pnpm build`
- [ ] Commit per math batch, for example:

```bash
git add content/units/math content/demos engine/core tests/unit/engine tests/e2e/home-to-demo.spec.ts
git commit -m "feat: migrate xiaozhi math content batch 1"
```

## Task 5: Migrate Physics Content Second

**Files:**
- Create: `content/units/physics/**`
- Create or Modify: `content/demos/physics-*.ts`
- Modify: `engine/core/*`
- Test: `tests/unit/engine/*.test.ts`
- Test: `tests/e2e/migrated-content-smoke.spec.ts`

**Interfaces:**
- Produces:
  - migrated physics modules: `motion`, `force`, `electricity`, `energy`, `wave`
  - formal demo definitions for high-value motion and force units

- [ ] Register all physics modules and units from the manifest.
- [ ] Migrate content pages first, then upgrade demos for the highest-value units: `uniform-motion`, `accelerated-motion`, `projectile-motion`, `force-composition`, `newton-second-law`, `work-energy-synthesis`.
- [ ] Rebuild process visuals in a mobile-safe layout rather than reusing old canvas shell markup.
- [ ] Verify physics unit pages remain readable when demo areas collapse below the fold on narrow screens.
- [ ] Run: `pnpm test`
- [ ] Run: `pnpm test:e2e`
- [ ] Commit:

```bash
git add content/units/physics content/demos engine/core tests
git commit -m "feat: migrate xiaozhi physics content"
```

## Task 6: Migrate Chemistry Content Third

**Files:**
- Create: `content/units/chemistry/**`
- Create or Modify: `content/demos/chemistry-*.ts`
- Modify: `features/knowledge/unit-page.tsx`
- Test: `tests/integration/content-routes.test.tsx`

**Interfaces:**
- Produces:
  - migrated chemistry modules: `chemical-language`, `reaction-principles`, `elements`, `experiment`
  - content-first unit pages with optional light interaction

- [ ] Register chemistry module names and slugs in a consistent English scheme while preserving Chinese titles in UI.
- [ ] Migrate all first-wave chemistry units as structured content pages.
- [ ] Only rewrite demos where interaction materially improves understanding, such as `mole`, `ionic-reaction`, `redox`, and `ion-identification`.
- [ ] Prefer diagrammatic explanation cards and step flows when chemistry interaction does not need continuous dragging.
- [ ] Run: `pnpm test -- tests/integration/content-routes.test.tsx`
- [ ] Run: `pnpm build`
- [ ] Commit:

```bash
git add content/units/chemistry content/demos features/knowledge/unit-page.tsx tests/integration/content-routes.test.tsx
git commit -m "feat: migrate xiaozhi chemistry content"
```

## Task 7: Migrate English Content Fourth

**Files:**
- Create: `content/units/english/**`
- Create or Modify: `content/demos/english-*.ts`
- Modify: `components/content/*`
- Test: `tests/integration/content-routes.test.tsx`

**Interfaces:**
- Produces:
  - migrated English modules: `sentence-structure`, `roots-and-vocabulary-network`
  - content pages mixing structured explanation, cards, and lightweight interaction

- [ ] Register all English units from sentence structure, reading, listening, roots, affixes, writing, and grammar-cloze themes.
- [ ] Use lightweight interaction patterns where appropriate instead of forcing every English unit into graph dragging.
- [ ] Normalize overlapping units so reading, listening, and writing keep clear module placement.
- [ ] Verify long text sections remain readable and navigable on mobile screens.
- [ ] Run: `pnpm test`
- [ ] Run: `pnpm build`
- [ ] Commit:

```bash
git add content/units/english content/demos components/content tests
git commit -m "feat: migrate xiaozhi english content"
```

## Task 8: Finish Learning Paths, Related Content, And SEO

**Files:**
- Create: `content/learning-paths/index.ts`
- Modify: `features/subjects/subject-page.tsx`
- Modify: `features/modules/module-page.tsx`
- Modify: `features/knowledge/unit-page.tsx`
- Modify: `app/sitemap.ts`
- Test: `tests/integration/routes.test.tsx`

**Interfaces:**
- Produces:
  - `getLearningPathsBySubject(subjectId: string): LearningPath[]`
  - subject and module pages with recommended learning sequences

- [ ] Port the useful learning-path structure from the legacy content source into typed production data.
- [ ] Add related-unit navigation and next-step recommendations to knowledge pages.
- [ ] Expand sitemap generation to include all migrated units.
- [ ] Verify metadata coverage for subjects, modules, and units.
- [ ] Run: `pnpm test -- tests/integration/routes.test.tsx`
- [ ] Run: `pnpm build`
- [ ] Commit:

```bash
git add content/learning-paths/index.ts features/subjects/subject-page.tsx features/modules/module-page.tsx features/knowledge/unit-page.tsx app/sitemap.ts tests/integration/routes.test.tsx
git commit -m "feat: add xiaozhi learning paths and seo coverage"
```

## Task 9: Retire Legacy Runtime Responsibilities

**Files:**
- Modify: `README.md`
- Modify: `docs/legacy-prototype-disposition.md`
- Modify: `legacy/prototype-v1/README.md`

**Interfaces:**
- Produces:
  - documentation that declares the production site as the only supported runtime
  - updated legacy archive rules

- [ ] Update repository docs to state that legacy assets are now archival-only.
- [ ] Mark which legacy demos have been fully migrated and which remain archived for reference.
- [ ] Keep the archive readable for historical comparison, but remove any ambiguity about runtime ownership.
- [ ] Run: `pnpm lint`
- [ ] Commit:

```bash
git add README.md docs/legacy-prototype-disposition.md legacy/prototype-v1/README.md
git commit -m "docs: finalize xiaozhi legacy runtime retirement"
```

## Task 10: Final Verification And Cleanup

**Files:**
- Modify: any touched migration files from prior tasks
- Test: `tests/unit/**`
- Test: `tests/integration/**`
- Test: `tests/e2e/**`

**Interfaces:**
- Consumes: all prior migration outputs
- Produces: a fully verified production content site

- [ ] Run the full verification suite:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

- [ ] Verify at least one migrated subject and one migrated unit per subject on desktop and mobile.
- [ ] Reconcile manifest statuses from `planned` to `migrated`, `merged`, or `archived`.
- [ ] Update `docs/content-migration-inventory.md` with final migration status.
- [ ] Commit:

```bash
git add docs/content-migration-inventory.md content/migration-manifest.ts content README.md tests
git commit -m "chore: complete xiaozhi full content migration"
```

## Self-Review

- Spec coverage: this plan covers inventory, content model expansion, site skeleton completion, four subject migration waves, learning paths, SEO, legacy retirement, and final verification.
- Placeholder scan: all tasks name concrete files, concrete deliverables, and concrete commands.
- Type consistency: manifest, content model, unit metadata, and route helper names remain stable across tasks.
