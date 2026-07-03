# Xiaozhi Production Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first production-grade `Next.js + TypeScript + React + App Router` version of Xiaozhi as a responsive, SEO-friendly high-school knowledge visualization website with a reusable demo engine and a first migrated vertical slice.

**Architecture:** Replace the current static demo-site shape with one unified Next.js app. Keep content, page composition, and visualization engine as separate modules so we can ship a polished public-facing site now while preserving a clean path to future subject expansion and CMS integration.

**Tech Stack:** Next.js, React, TypeScript, MDX, SVG/Canvas rendering, Vitest, Testing Library, Playwright, pnpm, GitHub Actions

## Global Constraints

- 第一阶段将小智定义为一个内容型高中知识可视化学习网站
- 第一阶段采用：`Next.js`、`TypeScript`、`React`、`App Router`
- 本次重构不走“旧原生页面长期保留”的双轨方案，而是以统一技术栈建立新的正式工程
- 小智第一阶段必须同时兼容电脑端浏览器和手机端浏览器
- 采用 `mobile-first`
- 第一阶段不引入 CMS，先采用代码内内容源
- 结构化元数据使用 `ts` 或 frontmatter
- 长文本内容使用 `mdx`
- 演示配置使用 `ts`
- 第一阶段不纳入：重后台 CMS、完整用户体系、付费体系、教师端、运营端、复杂学习档案与长期行为分析

---

## Planned File Structure

### Create

- `package.json`
- `pnpm-lock.yaml`
- `next.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `.gitignore`
- `.npmrc`
- `README.md`
- `app/layout.tsx`
- `app/globals.css`
- `app/page.tsx`
- `app/subjects/[subjectSlug]/page.tsx`
- `app/subjects/[subjectSlug]/[moduleSlug]/page.tsx`
- `app/subjects/[subjectSlug]/[moduleSlug]/[unitSlug]/page.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `components/layout/site-header.tsx`
- `components/layout/site-footer.tsx`
- `components/layout/page-shell.tsx`
- `components/home/hero.tsx`
- `components/home/subject-grid.tsx`
- `components/content/breadcrumbs.tsx`
- `components/content/rich-content.tsx`
- `components/demo/demo-stage.tsx`
- `components/demo/demo-controls.tsx`
- `components/demo/demo-explanation.tsx`
- `components/demo/demo-shell.tsx`
- `content/subjects.ts`
- `content/modules.ts`
- `content/demos/quadratic-function.ts`
- `content/units/math/functions/quadratic-function.mdx`
- `features/subjects/subject-page.tsx`
- `features/modules/module-page.tsx`
- `features/knowledge/unit-page.tsx`
- `engine/core/types.ts`
- `engine/core/store.ts`
- `engine/core/math.ts`
- `engine/renderers/quadratic-svg.tsx`
- `lib/content/types.ts`
- `lib/content/registry.ts`
- `lib/content/loaders.ts`
- `lib/seo.ts`
- `lib/routes.ts`
- `lib/utils.ts`
- `tests/unit/content/registry.test.ts`
- `tests/unit/engine/store.test.ts`
- `tests/unit/engine/math.test.ts`
- `tests/integration/routes.test.tsx`
- `tests/e2e/home-to-demo.spec.ts`
- `.github/workflows/ci.yml`

### Modify

- `docs/superpowers/specs/2026-07-03-xiaozhi-production-rebuild-design.md`
  - Only if implementation reveals a spec wording mismatch that must be clarified inline before coding.

## Task 1: Scaffold The Production App

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `.gitignore`
- Create: `.npmrc`
- Create: `README.md`
- Create: `app/layout.tsx`
- Create: `app/globals.css`

**Interfaces:**
- Consumes: none
- Produces:
  - `RootLayout({ children }: { children: React.ReactNode }): JSX.Element`
  - `metadata: Metadata`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`

- [ ] **Step 1: Write the failing config-driven smoke tests**

```ts
// tests/integration/routes.test.tsx
import { describe, expect, it } from "vitest";
import { metadata } from "@/app/layout";

describe("root app metadata", () => {
  it("defines the Xiaozhi Chinese and English brand", () => {
    expect(metadata.title).toBe("小智 Xiaozhi");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/routes.test.tsx`
Expected: FAIL with module resolution or missing file errors because the Next.js app has not been scaffolded yet.

- [ ] **Step 3: Write the minimal production scaffold**

```json
{
  "name": "xiaozhi",
  "private": true,
  "packageManager": "pnpm@11.7.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "小智 Xiaozhi",
  description: "面向高中的知识可视化学习网站",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/integration/routes.test.tsx`
Expected: PASS with one passing metadata test.

- [ ] **Step 5: Verify the full scaffold**

Run: `pnpm lint`
Expected: PASS

Run: `pnpm typecheck`
Expected: PASS

Run: `pnpm build`
Expected: PASS and Next.js emits a production build.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs .gitignore .npmrc README.md app/layout.tsx app/globals.css tests/integration/routes.test.tsx
git commit -m "feat: scaffold xiaozhi nextjs production app"
```

## Task 2: Establish Content Models And Route Helpers

**Files:**
- Create: `lib/content/types.ts`
- Create: `lib/content/registry.ts`
- Create: `lib/content/loaders.ts`
- Create: `lib/routes.ts`
- Create: `content/subjects.ts`
- Create: `content/modules.ts`
- Test: `tests/unit/content/registry.test.ts`

**Interfaces:**
- Consumes:
  - `RootLayout({ children }: { children: React.ReactNode }): JSX.Element`
- Produces:
  - `type Subject`
  - `type Module`
  - `type KnowledgeUnitMeta`
  - `getAllSubjects(): Subject[]`
  - `getSubjectBySlug(subjectSlug: string): Subject | null`
  - `getModulesBySubject(subjectId: string): Module[]`
  - `buildUnitPath(input: { subjectSlug: string; moduleSlug: string; unitSlug: string }): string`

- [ ] **Step 1: Write the failing registry tests**

```ts
// tests/unit/content/registry.test.ts
import { describe, expect, it } from "vitest";
import { getAllSubjects, getSubjectBySlug, getModulesBySubject } from "@/lib/content/loaders";
import { buildUnitPath } from "@/lib/routes";

describe("content registry", () => {
  it("returns the four existing subjects", () => {
    expect(getAllSubjects().map((subject) => subject.slug)).toEqual([
      "math",
      "physics",
      "chemistry",
      "english",
    ]);
  });

  it("builds semantic unit paths", () => {
    expect(
      buildUnitPath({
        subjectSlug: "math",
        moduleSlug: "functions",
        unitSlug: "quadratic-function",
      }),
    ).toBe("/subjects/math/functions/quadratic-function");
  });

  it("loads modules by subject", () => {
    const subject = getSubjectBySlug("math");
    expect(subject?.nameZh).toBe("数学");
    expect(getModulesBySubject(subject!.id).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/unit/content/registry.test.ts`
Expected: FAIL because the registry and route helpers do not exist yet.

- [ ] **Step 3: Write the typed content registry**

```ts
// lib/content/types.ts
export type Subject = {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  summary: string;
  theme: "sunrise" | "marine" | "leaf" | "plum";
};

export type Module = {
  id: string;
  subjectId: string;
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  order: number;
};
```

```ts
// lib/routes.ts
export function buildUnitPath(input: {
  subjectSlug: string;
  moduleSlug: string;
  unitSlug: string;
}) {
  return `/subjects/${input.subjectSlug}/${input.moduleSlug}/${input.unitSlug}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/unit/content/registry.test.ts`
Expected: PASS with all registry and route helper tests green.

- [ ] **Step 5: Run broader validation**

Run: `pnpm test`
Expected: PASS for scaffold and content-registry tests.

- [ ] **Step 6: Commit**

```bash
git add lib/content/types.ts lib/content/registry.ts lib/content/loaders.ts lib/routes.ts content/subjects.ts content/modules.ts tests/unit/content/registry.test.ts
git commit -m "feat: add xiaozhi content registry and route helpers"
```

## Task 3: Build The Site Shell And Responsive Home Page

**Files:**
- Create: `app/page.tsx`
- Create: `components/layout/site-header.tsx`
- Create: `components/layout/site-footer.tsx`
- Create: `components/layout/page-shell.tsx`
- Create: `components/home/hero.tsx`
- Create: `components/home/subject-grid.tsx`
- Modify: `app/globals.css`
- Test: `tests/integration/routes.test.tsx`

**Interfaces:**
- Consumes:
  - `getAllSubjects(): Subject[]`
- Produces:
  - `PageShell(props: { children: React.ReactNode }): JSX.Element`
  - `Hero(): JSX.Element`
  - `SubjectGrid(props: { subjects: Subject[] }): JSX.Element`
  - `HomePage(): JSX.Element`

- [ ] **Step 1: Extend the failing integration tests for home rendering**

```ts
// tests/integration/routes.test.tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

it("renders the homepage with all subject entries", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { name: "小智 Xiaozhi" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /数学/i })).toHaveAttribute("href", "/subjects/math");
  expect(screen.getByRole("link", { name: /物理/i })).toHaveAttribute("href", "/subjects/physics");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/routes.test.tsx`
Expected: FAIL because the homepage and shell components are missing.

- [ ] **Step 3: Implement the responsive home page**

```tsx
// app/page.tsx
import { Hero } from "@/components/home/hero";
import { SubjectGrid } from "@/components/home/subject-grid";
import { PageShell } from "@/components/layout/page-shell";
import { getAllSubjects } from "@/lib/content/loaders";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <SubjectGrid subjects={getAllSubjects()} />
    </PageShell>
  );
}
```

```tsx
// components/home/subject-grid.tsx
import Link from "next/link";
import type { Subject } from "@/lib/content/types";

export function SubjectGrid({ subjects }: { subjects: Subject[] }) {
  return (
    <section className="subjectGrid">
      {subjects.map((subject) => (
        <Link key={subject.id} href={`/subjects/${subject.slug}`} className="subjectCard">
          <h2>{subject.nameZh}</h2>
          <p>{subject.summary}</p>
        </Link>
      ))}
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/integration/routes.test.tsx`
Expected: PASS with homepage metadata and subject-link assertions passing.

- [ ] **Step 5: Verify responsive CSS and build**

Run: `pnpm build`
Expected: PASS with the homepage statically generated.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx components/layout/site-header.tsx components/layout/site-footer.tsx components/layout/page-shell.tsx components/home/hero.tsx components/home/subject-grid.tsx app/globals.css tests/integration/routes.test.tsx
git commit -m "feat: add xiaozhi responsive homepage shell"
```

## Task 4: Add Subject, Module, And Unit Pages With SEO Metadata

**Files:**
- Create: `app/subjects/[subjectSlug]/page.tsx`
- Create: `app/subjects/[subjectSlug]/[moduleSlug]/page.tsx`
- Create: `app/subjects/[subjectSlug]/[moduleSlug]/[unitSlug]/page.tsx`
- Create: `components/content/breadcrumbs.tsx`
- Create: `components/content/rich-content.tsx`
- Create: `features/subjects/subject-page.tsx`
- Create: `features/modules/module-page.tsx`
- Create: `features/knowledge/unit-page.tsx`
- Create: `lib/seo.ts`
- Create: `content/units/math/functions/quadratic-function.mdx`
- Test: `tests/integration/routes.test.tsx`

**Interfaces:**
- Consumes:
  - `getSubjectBySlug(subjectSlug: string): Subject | null`
  - `getModulesBySubject(subjectId: string): Module[]`
  - `buildUnitPath(input: { subjectSlug: string; moduleSlug: string; unitSlug: string }): string`
- Produces:
  - `generateMetadata(...): Promise<Metadata>`
  - `SubjectPageView(props: { subjectSlug: string }): JSX.Element`
  - `ModulePageView(props: { subjectSlug: string; moduleSlug: string }): JSX.Element`
  - `UnitPageView(props: { subjectSlug: string; moduleSlug: string; unitSlug: string }): JSX.Element`

- [ ] **Step 1: Write failing route-page tests**

```ts
// tests/integration/routes.test.tsx
import SubjectPage from "@/app/subjects/[subjectSlug]/page";
import ModulePage from "@/app/subjects/[subjectSlug]/[moduleSlug]/page";
import UnitPage from "@/app/subjects/[subjectSlug]/[moduleSlug]/[unitSlug]/page";

it("renders a subject page", async () => {
  const view = await SubjectPage({ params: Promise.resolve({ subjectSlug: "math" }) });
  render(view);
  expect(screen.getByRole("heading", { name: "数学" })).toBeInTheDocument();
});

it("renders a unit page with breadcrumb trail", async () => {
  const view = await UnitPage({
    params: Promise.resolve({
      subjectSlug: "math",
      moduleSlug: "functions",
      unitSlug: "quadratic-function",
    }),
  });

  render(view);
  expect(screen.getByText("二次函数")).toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: "面包屑" })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/routes.test.tsx`
Expected: FAIL because the subject, module, and unit pages do not exist yet.

- [ ] **Step 3: Implement semantic pages and metadata**

```tsx
// app/subjects/[subjectSlug]/[moduleSlug]/[unitSlug]/page.tsx
import { UnitPageView } from "@/features/knowledge/unit-page";

export default async function UnitPage({
  params,
}: {
  params: Promise<{ subjectSlug: string; moduleSlug: string; unitSlug: string }>;
}) {
  const resolved = await params;
  return <UnitPageView {...resolved} />;
}
```

```ts
// lib/seo.ts
export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    title: `${input.title} | 小智 Xiaozhi`,
    description: input.description,
    alternates: {
      canonical: input.path,
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/integration/routes.test.tsx`
Expected: PASS with subject and unit page assertions passing.

- [ ] **Step 5: Verify static generation and metadata wiring**

Run: `pnpm build`
Expected: PASS and route generation succeeds for `/subjects/math`, `/subjects/math/functions`, and `/subjects/math/functions/quadratic-function`.

- [ ] **Step 6: Commit**

```bash
git add app/subjects/[subjectSlug]/page.tsx app/subjects/[subjectSlug]/[moduleSlug]/page.tsx app/subjects/[subjectSlug]/[moduleSlug]/[unitSlug]/page.tsx components/content/breadcrumbs.tsx components/content/rich-content.tsx features/subjects/subject-page.tsx features/modules/module-page.tsx features/knowledge/unit-page.tsx lib/seo.ts content/units/math/functions/quadratic-function.mdx tests/integration/routes.test.tsx
git commit -m "feat: add subject module and unit pages"
```

## Task 5: Build The Reusable Demo Engine Core

**Files:**
- Create: `engine/core/types.ts`
- Create: `engine/core/store.ts`
- Create: `engine/core/math.ts`
- Create: `components/demo/demo-stage.tsx`
- Create: `components/demo/demo-controls.tsx`
- Create: `components/demo/demo-explanation.tsx`
- Create: `components/demo/demo-shell.tsx`
- Test: `tests/unit/engine/store.test.ts`
- Test: `tests/unit/engine/math.test.ts`

**Interfaces:**
- Consumes:
  - `UnitPageView(props: { subjectSlug: string; moduleSlug: string; unitSlug: string }): JSX.Element`
- Produces:
  - `type DemoDefinition<TParams extends Record<string, number>>`
  - `createDemoStore<TParams>(definition: DemoDefinition<TParams>): DemoStore<TParams>`
  - `sampleQuadratic(a: number, b: number, c: number): Array<{ x: number; y: number }>`
  - `DemoShell<TParams>(props: { definition: DemoDefinition<TParams> }): JSX.Element`

- [ ] **Step 1: Write the failing engine tests**

```ts
// tests/unit/engine/store.test.ts
import { describe, expect, it } from "vitest";
import { createDemoStore } from "@/engine/core/store";

describe("demo store", () => {
  it("merges default params and updates a single control", () => {
    const store = createDemoStore({
      id: "quadratic",
      defaultParams: { a: 1, b: 0, c: 0 },
      presets: [],
    });

    store.setParam("a", 2);
    expect(store.getState().params).toEqual({ a: 2, b: 0, c: 0 });
  });
});
```

```ts
// tests/unit/engine/math.test.ts
import { describe, expect, it } from "vitest";
import { sampleQuadratic } from "@/engine/core/math";

describe("sampleQuadratic", () => {
  it("returns the origin point for y = x^2 when x is zero", () => {
    expect(sampleQuadratic(1, 0, 0).some((point) => point.x === 0 && point.y === 0)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/unit/engine/store.test.ts tests/unit/engine/math.test.ts`
Expected: FAIL because the engine core does not exist yet.

- [ ] **Step 3: Implement the minimal reusable engine**

```ts
// engine/core/types.ts
export type DemoDefinition<TParams extends Record<string, number>> = {
  id: string;
  title: string;
  defaultParams: TParams;
  presets: Array<{ id: string; label: string; params: Partial<TParams> }>;
  explanation: (params: TParams) => string[];
};
```

```ts
// engine/core/store.ts
export function createDemoStore<TParams extends Record<string, number>>(
  definition: DemoDefinition<TParams>,
) {
  let state = { params: { ...definition.defaultParams } };

  return {
    getState: () => state,
    setParam<K extends keyof TParams>(key: K, value: TParams[K]) {
      state = { params: { ...state.params, [key]: value } };
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/unit/engine/store.test.ts tests/unit/engine/math.test.ts`
Expected: PASS with green store and quadratic sampling tests.

- [ ] **Step 5: Verify the engine shell compiles**

Run: `pnpm typecheck`
Expected: PASS after wiring `DemoShell`, `DemoStage`, `DemoControls`, and `DemoExplanation` to the engine types.

- [ ] **Step 6: Commit**

```bash
git add engine/core/types.ts engine/core/store.ts engine/core/math.ts components/demo/demo-stage.tsx components/demo/demo-controls.tsx components/demo/demo-explanation.tsx components/demo/demo-shell.tsx tests/unit/engine/store.test.ts tests/unit/engine/math.test.ts
git commit -m "feat: add reusable xiaozhi demo engine core"
```

## Task 6: Migrate The First Knowledge Demo Vertical Slice

**Files:**
- Create: `content/demos/quadratic-function.ts`
- Create: `engine/renderers/quadratic-svg.tsx`
- Modify: `features/knowledge/unit-page.tsx`
- Modify: `content/units/math/functions/quadratic-function.mdx`
- Test: `tests/integration/routes.test.tsx`
- Test: `tests/e2e/home-to-demo.spec.ts`

**Interfaces:**
- Consumes:
  - `DemoShell<TParams>(props: { definition: DemoDefinition<TParams> }): JSX.Element`
  - `sampleQuadratic(a: number, b: number, c: number): Array<{ x: number; y: number }>`
- Produces:
  - `quadraticFunctionDemo: DemoDefinition<{ a: number; b: number; c: number }>`
  - `QuadraticSvg(props: { points: Array<{ x: number; y: number }> }): JSX.Element`

- [ ] **Step 1: Write the failing demo integration and e2e tests**

```ts
// tests/integration/routes.test.tsx
it("renders the quadratic demo controls on the unit page", async () => {
  const view = await UnitPage({
    params: Promise.resolve({
      subjectSlug: "math",
      moduleSlug: "functions",
      unitSlug: "quadratic-function",
    }),
  });

  render(view);
  expect(screen.getByRole("slider", { name: "a" })).toBeInTheDocument();
  expect(screen.getByText("开口方向与顶点变化")).toBeInTheDocument();
});
```

```ts
// tests/e2e/home-to-demo.spec.ts
import { test, expect } from "@playwright/test";

test("user can navigate from home page to the quadratic demo", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /数学/i }).click();
  await page.getByRole("link", { name: /函数/i }).click();
  await page.getByRole("link", { name: /二次函数/i }).click();
  await expect(page.getByRole("slider", { name: "a" })).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/routes.test.tsx`
Expected: FAIL because the unit page does not yet mount a demo.

Run: `pnpm playwright test tests/e2e/home-to-demo.spec.ts`
Expected: FAIL because the navigation and demo UI are incomplete.

- [ ] **Step 3: Implement the first migrated demo**

```ts
// content/demos/quadratic-function.ts
export const quadraticFunctionDemo = {
  id: "quadratic-function",
  title: "二次函数图像变化",
  defaultParams: { a: 1, b: 0, c: 0 },
  presets: [
    { id: "base", label: "基础抛物线", params: { a: 1, b: 0, c: 0 } },
    { id: "flip", label: "开口向下", params: { a: -1, b: 0, c: 0 } },
  ],
  explanation(params: { a: number; b: number; c: number }) {
    return [
      params.a > 0 ? "抛物线开口向上" : "抛物线开口向下",
      "开口方向与顶点变化",
    ];
  },
} as const;
```

```tsx
// engine/renderers/quadratic-svg.tsx
export function QuadraticSvg({
  points,
}: {
  points: Array<{ x: number; y: number }>;
}) {
  const d = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  return (
    <svg viewBox="-10 -10 20 20" aria-label="二次函数图像">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="0.15" />
    </svg>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/integration/routes.test.tsx`
Expected: PASS with demo controls rendered on the unit page.

Run: `pnpm playwright test tests/e2e/home-to-demo.spec.ts`
Expected: PASS with desktop and mobile projects if both are configured.

- [ ] **Step 5: Verify responsive behavior manually and in build**

Run: `pnpm build`
Expected: PASS

Run: `pnpm test:e2e --project=Mobile`
Expected: PASS with the demo shell remaining usable on a phone viewport.

- [ ] **Step 6: Commit**

```bash
git add content/demos/quadratic-function.ts engine/renderers/quadratic-svg.tsx features/knowledge/unit-page.tsx content/units/math/functions/quadratic-function.mdx tests/integration/routes.test.tsx tests/e2e/home-to-demo.spec.ts
git commit -m "feat: migrate quadratic function demo vertical slice"
```

## Task 7: Add SEO Artifacts, CI, And Delivery Guardrails

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `.github/workflows/ci.yml`
- Modify: `README.md`
- Test: `tests/integration/routes.test.tsx`

**Interfaces:**
- Consumes:
  - `getAllSubjects(): Subject[]`
  - `buildUnitPath(input: { subjectSlug: string; moduleSlug: string; unitSlug: string }): string`
- Produces:
  - `default function sitemap(): MetadataRoute.Sitemap`
  - `default function robots(): MetadataRoute.Robots`
  - CI job running `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`

- [ ] **Step 1: Write the failing SEO and CI smoke tests**

```ts
// tests/integration/routes.test.tsx
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

it("includes subject and unit routes in the sitemap", async () => {
  const entries = await sitemap();
  expect(entries.some((entry) => entry.url.endsWith("/subjects/math"))).toBe(true);
  expect(entries.some((entry) => entry.url.endsWith("/subjects/math/functions/quadratic-function"))).toBe(true);
});

it("allows crawling public pages", () => {
  expect(robots().rules).toEqual([{ userAgent: "*", allow: "/" }]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/routes.test.tsx`
Expected: FAIL because sitemap and robots files do not exist yet.

- [ ] **Step 3: Implement delivery guardrails**

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
  };
}
```

```yaml
# .github/workflows/ci.yml
name: ci

on:
  pull_request:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest tests/integration/routes.test.tsx`
Expected: PASS with sitemap and robots assertions green.

- [ ] **Step 5: Verify full pipeline locally**

Run: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
Expected: PASS locally before opening a PR.

- [ ] **Step 6: Commit**

```bash
git add app/sitemap.ts app/robots.ts .github/workflows/ci.yml README.md tests/integration/routes.test.tsx
git commit -m "feat: add seo artifacts and ci pipeline"
```

## Self-Review

### Spec coverage

- 正式的网站前台架构: Task 1, Task 3, Task 4
- 首页、学科页、模块页、知识点页、交互演示页: Task 3, Task 4, Task 6
- 统一的内容模型与路由体系: Task 2, Task 4
- 全新的 React 化交互演示引擎: Task 5, Task 6
- 电脑端与手机端浏览器兼容的响应式体验: Task 3, Task 6
- 基础 SEO 能力: Task 4, Task 7
- 自动化测试体系: Task 1 through Task 7
- CI/CD 与 GitHub 协作底座: Task 7
- 可部署、可持续发布的工程结构: Task 1, Task 7
- 第一阶段不引入 CMS，先采用代码内内容源: Task 2, Task 4, Task 6

No uncovered spec requirement remains for the first implementation slice. The plan intentionally defers full multi-subject content migration and any non-goal platform subsystems.

### Placeholder scan

- No `TODO`, `TBD`, or deferred placeholder text remains in task steps.
- Every code-changing step includes concrete file content or signatures.
- Every verification step includes an exact command and expected outcome.

### Type consistency

- `buildUnitPath()` is introduced in Task 2 and reused consistently in Tasks 4 and 7.
- `DemoDefinition<TParams>` is introduced in Task 5 and consumed consistently in Task 6.
- `UnitPageView(props: { subjectSlug: string; moduleSlug: string; unitSlug: string })` is introduced in Task 4 and reused consistently in Task 5 and Task 6.
