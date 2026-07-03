Status: DONE_WITH_CONCERNS

Files changed
- `app/globals.css`
- `app/subjects/[subjectSlug]/page.tsx`
- `app/subjects/[subjectSlug]/[moduleSlug]/page.tsx`
- `app/subjects/[subjectSlug]/[moduleSlug]/[unitSlug]/page.tsx`
- `components/content/breadcrumbs.tsx`
- `components/content/rich-content.tsx`
- `content/units/math/functions/quadratic-function.mdx`
- `features/knowledge/unit-page.tsx`
- `features/modules/module-page.tsx`
- `features/subjects/subject-page.tsx`
- `lib/seo.ts`
- `next-env.d.ts`
- `tests/integration/routes.test.tsx`
- `tsconfig.json`

Commands run
- `sed -n '1,260p' /Users/lilei/New/Xiaozhi/.superpowers/sdd/task-4-brief.md`
- `git status --short`
- `rg -n "getAllSubjects|getSubjectBySlug|getModulesBySubject|buildUnitPath|generateMetadata|Metadata|mdx|breadcrumbs|rich-content" /Users/lilei/New/Xiaozhi`
- `sed -n '1,220p' lib/content/loaders.ts`
- `sed -n '1,220p' lib/content/types.ts`
- `sed -n '1,220p' lib/routes.ts`
- `sed -n '1,220p' app/page.tsx`
- `sed -n '1,220p' app/layout.tsx`
- `sed -n '1,220p' tests/integration/routes.test.tsx`
- `sed -n '407,540p' docs/superpowers/plans/2026-07-03-xiaozhi-production-rebuild-plan.md`
- `sed -n '1,240p' package.json`
- `sed -n '1,220p' next.config.*`
- `sed -n '1,260p' lib/content/registry.ts`
- `sed -n '1,220p' content/subjects.ts`
- `sed -n '1,260p' content/modules.ts`
- `CI=true pnpm vitest tests/integration/routes.test.tsx`
- `CI=true pnpm typecheck`
- `CI=true pnpm build`

Test results
- `CI=true pnpm vitest tests/integration/routes.test.tsx`
  - First red run failed as expected because the new route pages did not exist yet.
  - Final run passed: `5 passed`.
- `CI=true pnpm typecheck`
  - Passed.
- `CI=true pnpm build`
  - Initial sandboxed run failed with Turbopack `binding to a port` permission error.
  - Rerun outside the sandbox passed and generated:
    - `/subjects/math`
    - `/subjects/math/functions`
    - `/subjects/math/functions/quadratic-function`

Commits created
- Planned commit message: `feat: add subject module and unit pages`
- Exact hash is returned to the controller response after commit creation.

Concerns
- `.mdx` is currently used as a content source plus a constrained server-side rich-text parser, not full MDX JSX execution. This matches Task 4's "basic rich text rendering" scope but leaves advanced MDX semantics for a later task if needed.
- `next build` required a non-sandbox rerun in this environment because Turbopack could not bind a port inside the sandbox.
