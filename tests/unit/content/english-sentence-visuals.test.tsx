// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getDemoDefinition } from "@/content/demos/catalog";

afterEach(() => {
  cleanup();
});

describe("english sentence visuals", () => {
  it("renders example-driven sentence diagrams for key sentence units", () => {
    const targets = [
      {
        key: ["english", "sentence-structure", "english-sentence-structure"] as const,
        label: "句子成分例句拆解图",
        text: "The students",
      },
      {
        key: ["english", "sentence-structure", "english-clause-hierarchy"] as const,
        label: "从句层级例句拆解图",
        text: "I know that",
      },
      {
        key: ["english", "sentence-structure", "english-sentence-compression"] as const,
        label: "长难句压缩例句拆解图",
        text: "Although the weather was terrible",
      },
      {
        key: ["english", "sentence-structure", "english-nonfinite-structure"] as const,
        label: "非谓语结构例句拆解图",
        text: "To finish the project",
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
