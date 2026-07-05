// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getDemoDefinition } from "@/content/demos/catalog";
import { english3500WordBank } from "@/content/english-3500-word-bank";
import { getAllUnits, getModulesBySubject, getSubjectBySlug } from "@/lib/content/loaders";

afterEach(() => {
  cleanup();
});

describe("english 3500 framework", () => {
  it("registers an independent english 3500 module with formal learning units", () => {
    const subject = getSubjectBySlug("english");

    expect(subject).not.toBeNull();

    const modules = getModulesBySubject(subject!.id);
    const moduleEntry = modules.find((entry) => entry.slug === "high-school-3500-words");

    expect(moduleEntry).not.toBeUndefined();
    expect(moduleEntry?.title).toBe("高中英语 3500 词背诵体系");

    const unitSlugs = getAllUnits()
      .filter((unit) => unit.moduleId === moduleEntry?.id)
      .map((unit) => unit.slug);

    expect(unitSlugs).toEqual([
      "english-3500-overview",
      "english-3500-core-high-frequency",
      "english-3500-root-affix",
      "english-3500-confusing-words",
      "english-3500-polysemy",
      "english-3500-collocations",
      "english-3500-theme-vocabulary",
      "english-3500-grade-one-roadmap",
    ]);
  });

  it("keeps the 3500-word framework totals and starter decks coherent", () => {
    expect(english3500WordBank.totalWords).toBe(3500);
    expect(english3500WordBank.categories).toHaveLength(6);
    expect(
      english3500WordBank.categories.reduce((sum, category) => sum + category.targetWordCount, 0),
    ).toBe(3500);
    expect(english3500WordBank.groups.length).toBeGreaterThanOrEqual(12);
    expect(
      english3500WordBank.groups.some((group) => group.words.some((word) => word.word === "develop")),
    ).toBe(true);
  });

  it("renders dedicated overview and roadmap demos for the 3500-word module", () => {
    const overview = getDemoDefinition("english", "high-school-3500-words", "english-3500-overview");
    const roadmap = getDemoDefinition(
      "english",
      "high-school-3500-words",
      "english-3500-grade-one-roadmap",
    );

    expect(overview).not.toBeNull();
    expect(roadmap).not.toBeNull();

    render(<>{overview!.renderStage?.(overview!.defaultParams)}</>);
    expect(screen.getByText(/3500 词总框架/)).toBeInTheDocument();
    cleanup();

    render(<>{roadmap!.renderStage?.(roadmap!.defaultParams)}</>);
    expect(screen.getByText(/高一上学期路线/)).toBeInTheDocument();
  });
});
