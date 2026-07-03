import { describe, expect, it } from "vitest";

import { createDemoStore } from "@/engine/core/store";

describe("demo store", () => {
  it("merges default params and updates a single control", () => {
    const store = createDemoStore({
      id: "quadratic",
      title: "二次函数",
      defaultParams: { a: 1, b: 0, c: 0 },
      presets: [],
      explanation: () => [],
    });

    store.setParam("a", 2);

    expect(store.getState().params).toEqual({ a: 2, b: 0, c: 0 });
  });
});
