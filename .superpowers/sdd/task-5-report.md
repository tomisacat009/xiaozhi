# Task 5 Report

1. Status: DONE

2. Files changed
- `engine/core/types.ts`
- `engine/core/store.ts`
- `engine/core/math.ts`
- `components/demo/demo-stage.tsx`
- `components/demo/demo-controls.tsx`
- `components/demo/demo-explanation.tsx`
- `components/demo/demo-shell.tsx`
- `tests/unit/engine/store.test.ts`
- `tests/unit/engine/math.test.ts`
- `tests/unit/engine/demo-shell.test.tsx`

3. Commands run
- `pnpm vitest tests/unit/engine/store.test.ts tests/unit/engine/math.test.ts`
- `CI=true pnpm vitest tests/unit/engine/store.test.ts tests/unit/engine/math.test.ts`
- `CI=true pnpm typecheck`
- `CI=true pnpm vitest tests/unit/engine/store.test.ts tests/unit/engine/demo-shell.test.tsx`
- `CI=true pnpm vitest tests/unit/engine/store.test.ts tests/unit/engine/demo-shell.test.tsx tests/unit/engine/math.test.ts`
- `CI=true pnpm typecheck`

4. Test results
- Initial red step: `CI=true pnpm vitest tests/unit/engine/store.test.ts tests/unit/engine/math.test.ts` failed as expected because `@/engine/core/store` and `@/engine/core/math` did not exist yet.
- Green step: `CI=true pnpm vitest tests/unit/engine/store.test.ts tests/unit/engine/math.test.ts` passed with `2 passed (2)`.
- Compile verification: `CI=true pnpm typecheck` passed with `tsc --noEmit`.
- Reviewer fix red step: `CI=true pnpm vitest tests/unit/engine/store.test.ts tests/unit/engine/demo-shell.test.tsx` failed as expected because `DemoShell` recreated the store when rerendered with an equivalent `definition` object and reset param `a` from `2` back to `1`.
- Reviewer fix green step: `CI=true pnpm vitest tests/unit/engine/store.test.ts tests/unit/engine/demo-shell.test.tsx tests/unit/engine/math.test.ts` passed with `5 passed (5)`.
- Reviewer fix compile verification: `CI=true pnpm typecheck` passed with `tsc --noEmit`.

5. Commits created
- `feat: add reusable xiaozhi demo engine core`
- `fix: preserve demo shell state across stable definitions`

6. Concerns
- None.
