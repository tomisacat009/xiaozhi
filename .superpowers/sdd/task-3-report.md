Status: DONE_WITH_CONCERNS

Files changed
- `app/page.tsx`
- `app/globals.css`
- `components/layout/site-header.tsx`
- `components/layout/site-footer.tsx`
- `components/layout/page-shell.tsx`
- `components/home/hero.tsx`
- `components/home/subject-grid.tsx`
- `tests/integration/routes.test.tsx`
- `tests/setup.ts`
- `vitest.config.ts`
- `package.json`
- `pnpm-lock.yaml`
- `tsconfig.json`
- `next-env.d.ts`

Commands run
- `git status --short`
- `rg --files /Users/lilei/New/Xiaozhi | rg '^(.*(app|components|lib|tests).*)$'`
- `sed -n '1,220p' app/layout.tsx`
- `sed -n '1,260p' app/globals.css`
- `sed -n '1,220p' lib/content/loaders.ts`
- `sed -n '1,240p' lib/content/types.ts`
- `sed -n '1,260p' tests/integration/routes.test.tsx`
- `cat package.json`
- `sed -n '1,260p' lib/content/registry.ts`
- `ls`
- `rg -n "@testing-library|jsdom|vitest" -S .`
- `cat vitest.config.ts`
- `rg -n "@testing-library/react|jsdom" pnpm-lock.yaml package.json`
- `ls content && rg -n "slug: \\\"(math|physics)\\\"|nameZh:" content -S`
- `sed -n '1,220p' content/subjects.ts`
- `git show --stat --oneline c69b5ef`
- `pnpm vitest tests/integration/routes.test.tsx`
- `CI=true pnpm vitest tests/integration/routes.test.tsx`
- `sed -n '320,410p' docs/superpowers/plans/2026-07-03-xiaozhi-production-rebuild-plan.md`
- `test -d node_modules/@testing-library/react && echo present || echo missing`
- `test -d node_modules/jsdom && echo present || echo missing`
- `CI=true pnpm add -D @testing-library/react @testing-library/jest-dom jsdom`
- `CI=true pnpm vitest tests/integration/routes.test.tsx`
- `CI=true pnpm build`
- `git status --short`
- `cat tsconfig.json`
- `sed -n '1,220p' tests/integration/routes.test.tsx`
- `git diff -- next-env.d.ts`
- `git diff -- tsconfig.json`
- `git diff -- package.json vitest.config.ts app/globals.css app/page.tsx components/layout/site-header.tsx components/layout/site-footer.tsx components/layout/page-shell.tsx components/home/hero.tsx components/home/subject-grid.tsx tests/integration/routes.test.tsx tests/setup.ts`
- `CI=true pnpm typecheck`

Test results
- `CI=true pnpm vitest tests/integration/routes.test.tsx`: PASS, `2` tests passed.
- `CI=true pnpm build`: PASS, homepage `/` statically generated.
- `CI=true pnpm typecheck`: PASS.

Commits created
- One commit prepared with the required message: `feat: add xiaozhi responsive homepage shell`

Concerns
- Task brief assumed `@testing-library/react` and `jsdom` were already available, but the current workspace did not include them. I added the minimal dev dependencies and Vitest setup needed to execute the required integration test.
- `next build` auto-updated `tsconfig.json` and `next-env.d.ts` for Next.js route typing. These changes are included because they were introduced by the required build verification step.

---

Reviewer fix follow-up

Files changed
- `tests/integration/routes.test.tsx`
- `tests/unit/content/registry.test.ts`
- `vitest.config.ts`
- `next-env.d.ts`
- `tsconfig.json`
- `tests/setup.ts` (removed)

Commands run
- `git status --short`
- `sed -n '1,220p' next-env.d.ts`
- `cat tsconfig.json`
- `cat vitest.config.ts`
- `sed -n '1,260p' tests/integration/routes.test.tsx`
- `sed -n '1,240p' content/subjects.ts`
- `sed -n '1,260p' .superpowers/sdd/task-3-report.md`
- `sed -n '1,260p' tests/unit/content/registry.test.ts`
- `ls -a`
- `CI=true pnpm vitest tests/unit/content/registry.test.ts tests/integration/routes.test.tsx`
- `mv .next /private/tmp/xiaozhi-task3-next-backup`
- `CI=true pnpm typecheck`
- `mv /private/tmp/xiaozhi-task3-next-backup .next`
- `CI=true pnpm vitest tests/unit/content/registry.test.ts tests/integration/routes.test.tsx`
- `mv .next /private/tmp/xiaozhi-task3-next-backup-2`
- `CI=true pnpm typecheck`
- `mv /private/tmp/xiaozhi-task3-next-backup-2 .next`
- `CI=true pnpm build`
- `git diff -- tsconfig.json next-env.d.ts`
- `git status --short`
- `sed -n '1,80p' next-env.d.ts`
- `cat tsconfig.json`
- `cat vitest.config.ts`
- `cat next.config.ts`
- `git diff HEAD -- next-env.d.ts tsconfig.json`
- `CI=true pnpm vitest tests/unit/content/registry.test.ts tests/integration/routes.test.tsx`
- `mv .next /private/tmp/xiaozhi-task3-next-backup-3`
- `CI=true pnpm typecheck`
- `mv /private/tmp/xiaozhi-task3-next-backup-3 .next`

Test results
- Red check: `CI=true pnpm vitest tests/unit/content/registry.test.ts tests/integration/routes.test.tsx` failed as expected before the config fix because unit tests were incorrectly running under global `jsdom`.
- Green check: `CI=true pnpm vitest tests/unit/content/registry.test.ts tests/integration/routes.test.tsx` passed with `12` tests after scoping `jsdom` to the homepage integration file and expanding homepage assertions to all four subjects.
- Clean-checkout guard: `CI=true pnpm typecheck` passed twice with `.next` temporarily moved out of the workspace, confirming `tsc --noEmit` no longer depends on generated `.next` type files being present.
- Regression check: `CI=true pnpm build` passed, but Next.js 16 reintroduced generated `.next` type references into tracked files during the build; the final commit removes those auto-written lines again to satisfy the reviewer requirement.

Concerns
- `next build` currently auto-rewrites `next-env.d.ts` and `tsconfig.json` to add `.next` route/dev type references. The final commit intentionally removes those lines after verification so checkout state stays independent from prior `next build`/`next dev` runs.
