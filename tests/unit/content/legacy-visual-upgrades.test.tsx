// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getDemoDefinition } from "@/content/demos/catalog";

afterEach(() => {
  cleanup();
});

describe("legacy visual upgrades", () => {
  it("renders upgraded visuals for legacy english and chemistry demos", () => {
    const targets = [
      {
        key: ["english", "roots-vocabulary-network", "english-word-roots"] as const,
        label: "词根词缀网络图",
        text: "spectator",
      },
      {
        key: ["english", "roots-vocabulary-network", "english-affix-network"] as const,
        label: "前后缀作用网络图",
        text: "unhappy",
      },
      {
        key: ["english", "sentence-structure", "english-reading-layer"] as const,
        label: "阅读信息分层图",
        text: "because students can test changes directly",
      },
      {
        key: ["english", "roots-vocabulary-network", "english-writing-paragraph-workshop"] as const,
        label: "段落展开例句图",
        text: "To learn effectively",
      },
      {
        key: ["english", "roots-vocabulary-network", "english-grammar-cloze-strategy"] as const,
        label: "语法填空决策图",
        text: "When he arrived",
      },
      {
        key: ["chemistry", "experiments", "chemistry-lab-devices"] as const,
        label: "实验装置流程图",
        text: "试管口略向下",
      },
    ];

    for (const target of targets) {
      const definition = getDemoDefinition(
        target.key[0],
        target.key[1],
        target.key[2],
      );

      expect(definition).not.toBeNull();
      render(<>{definition!.renderStage?.(definition!.defaultParams)}</>);
      expect(screen.getByLabelText(target.label)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(target.text))).toBeInTheDocument();
    }
  });
});
