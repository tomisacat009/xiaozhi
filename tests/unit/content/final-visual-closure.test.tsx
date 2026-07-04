// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getDemoDefinition } from "@/content/demos/catalog";

afterEach(() => {
  cleanup();
});

describe("final visual closure", () => {
  it("renders upgraded visuals for remaining priority english and physics demos", () => {
    const targets = [
      {
        key: ["english", "sentence-structure", "english-tense-timeline"] as const,
        label: "时态时间轴图",
        text: "三年前动作已经开始。",
      },
      {
        key: ["english", "roots-vocabulary-network", "english-logic-connector-map"] as const,
        label: "逻辑连接词网络图",
        text: "逻辑先于词面。",
      },
      {
        key: ["english", "roots-vocabulary-network", "english-synonym-semantic-map"] as const,
        label: "近义词语义坐标图",
        text: "情绪更强，也更正式。",
      },
      {
        key: ["physics", "force", "physics-friction"] as const,
        label: "摩擦力状态图",
        text: "没到临界前不必直接写成 μN。",
      },
      {
        key: ["physics", "force", "physics-incline-motion"] as const,
        label: "斜面受力分析图",
        text: "这样支持力会自然落在法向上。",
      },
      {
        key: ["physics", "energy", "physics-work-power"] as const,
        label: "功与功率过程图",
        text: "功和功率千万别混成一个概念。",
      },
      {
        key: ["physics", "energy", "physics-kinetic-energy"] as const,
        label: "动能定理变化图",
        text: "这就是动能定理最直接的抓手。",
      },
    ];

    for (const target of targets) {
      const definition = getDemoDefinition(target.key[0], target.key[1], target.key[2]);

      expect(definition).not.toBeNull();
      const view = render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);
      expect(screen.getByLabelText(target.label)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(target.text))).toBeInTheDocument();
      view.unmount();
    }
  });
});
