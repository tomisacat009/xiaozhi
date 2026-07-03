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

  it("resets params back to the definition defaults", () => {
    const store = createDemoStore({
      id: "quadratic",
      title: "二次函数",
      defaultParams: { a: 1, b: 0, c: 0 },
      presets: [],
      explanation: () => [],
    });

    store.setParam("a", 4);
    store.setParam("b", 3);
    store.reset();

    expect(store.getState().params).toEqual({ a: 1, b: 0, c: 0 });
  });

  it("applies preset params on top of the definition defaults", () => {
    const store = createDemoStore({
      id: "quadratic",
      title: "二次函数",
      defaultParams: { a: 1, b: 0, c: 0 },
      presets: [
        {
          id: "wide-open",
          label: "开口变宽",
          params: { a: 3, c: 2 },
        },
      ],
      explanation: () => [],
    });

    store.setParam("b", 5);
    store.applyPreset("wide-open");

    expect(store.getState().params).toEqual({ a: 3, b: 0, c: 2 });
  });

  it("supports select-style string params", () => {
    const store = createDemoStore({
      id: "english-clause",
      title: "从句层级",
      defaultParams: { clause: "object" },
      presets: [
        {
          id: "adverbial",
          label: "状语从句",
          params: { clause: "adverbial" },
        },
      ],
      explanation: () => [],
    });

    store.setParam("clause", "object");
    store.applyPreset("adverbial");

    expect(store.getState().params).toEqual({ clause: "adverbial" });
  });
});
