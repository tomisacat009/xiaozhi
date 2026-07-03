Status: DONE_WITH_CONCERNS

Files changed
- `vitest.config.ts`
- `lib/content/types.ts`
- `lib/content/registry.ts`
- `lib/content/loaders.ts`
- `lib/routes.ts`
- `content/subjects.ts`
- `content/modules.ts`
- `tests/unit/content/registry.test.ts`

Commands run
- `sed -n '1,220p' /Users/lilei/New/Xiaozhi/.superpowers/sdd/task-2-brief.md`
- `git status --short`
- `git rev-parse --short HEAD`
- `sed -n '1,240p' package.json`
- `sed -n '1,240p' tsconfig.json`
- `sed -n '1,240p' vitest.config.ts`
- `sed -n '1,240p' tests/integration/routes.test.tsx`
- `sed -n '1,240p' app/layout.tsx`
- `rg -n "math|physics|chemistry|english|functions|quadratic-function|subjects/" app tests --glob '!tests/unit/**'`
- `find . -maxdepth 2 -type d | sort`
- `CI=true pnpm vitest tests/unit/content/registry.test.ts`
- `CI=true node_modules/.bin/vitest tests/unit/content/registry.test.ts`
- `CI=true node_modules/.bin/vitest run`
- `CI=true pnpm test`

Test results
- `CI=true node_modules/.bin/vitest tests/unit/content/registry.test.ts`: PASS, `1` file / `3` tests passed.
- `CI=true node_modules/.bin/vitest run`: PASS, `2` files / `4` tests passed.
- `CI=true pnpm test`: not reliable in this environment. `pnpm` triggered an install/build approval flow and then repeatedly failed to resolve `registry.npm.taobao.org` with `ENOTFOUND`, so it could not serve as completion evidence.

Commits created
- `feat: add xiaozhi content registry and route helpers`

Concerns
- The task brief did not list `vitest.config.ts`, but it had to be updated so the required `tests/unit/content/registry.test.ts` would actually be discovered by Vitest.
- `pnpm test` is environment-sensitive here because it attempts dependency restoration before running tests. The primary verification evidence is therefore the direct Vitest runs above.
