// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getDemoDefinition } from "@/content/demos/catalog";
import { english3500WordBank } from "@/content/english-3500-word-bank";
import { getAllUnits, getModulesBySubject, getSubjectBySlug } from "@/lib/content/loaders";

afterEach(() => {
  window.localStorage.clear();
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
      "english-3500-full-bank",
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
    expect(english3500WordBank.allWords).toHaveLength(3500);
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
    const fullBank = getDemoDefinition(
      "english",
      "high-school-3500-words",
      "english-3500-full-bank",
    );
    const roadmap = getDemoDefinition(
      "english",
      "high-school-3500-words",
      "english-3500-grade-one-roadmap",
    );

    expect(overview).not.toBeNull();
    expect(fullBank).not.toBeNull();
    expect(roadmap).not.toBeNull();

    render(<>{overview!.renderStage?.(overview!.defaultParams)}</>);
    expect(screen.getByText(/3500 词总框架/)).toBeInTheDocument();
    cleanup();

    render(<>{fullBank!.renderStage?.(fullBank!.defaultParams)}</>);
    expect(screen.getByRole("searchbox", { name: /搜索单词/ })).toBeInTheDocument();
    expect(screen.getByText(/3500 词已整理入库/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /只看高频重点/ })).toBeInTheDocument();
    expect(screen.getByText(/推荐背诵顺序/)).toBeInTheDocument();
    expect(screen.getByText(/覆盖分布/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /按地基期筛选/ })).toBeInTheDocument();
    expect(screen.getByText(/记忆提醒/)).toBeInTheDocument();
    cleanup();

    render(<>{roadmap!.renderStage?.(roadmap!.defaultParams)}</>);
    expect(screen.getByText(/高一上学期路线/)).toBeInTheDocument();
  });

  it("supports visible stage selection state in the full bank explorer", () => {
    const fullBank = getDemoDefinition(
      "english",
      "high-school-3500-words",
      "english-3500-full-bank",
    );

    expect(fullBank).not.toBeNull();

    render(<>{fullBank!.renderStage?.(fullBank!.defaultParams)}</>);

    const stageButton = screen.getByRole("button", { name: /按地基期筛选/ });

    fireEvent.click(stageButton);

    expect(stageButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/当前已切到 地基期/)).toBeInTheDocument();
  });

  it("renders a memory workbench for study packs and recall mode", () => {
    const fullBank = getDemoDefinition(
      "english",
      "high-school-3500-words",
      "english-3500-full-bank",
    );

    expect(fullBank).not.toBeNull();

    render(<>{fullBank!.renderStage?.(fullBank!.defaultParams)}</>);

    expect(screen.getByText(/今日背诵包/)).toBeInTheDocument();
    expect(screen.getByText(/复习节奏建议/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /进入回忆模式/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /进入回忆模式/ }));

    expect(screen.getByText(/先回忆：这个词的核心义是什么/)).toBeInTheDocument();
    expect(screen.queryAllByText(/^发展；形成$/)).toHaveLength(0);

    fireEvent.click(screen.getByRole("button", { name: /显示答案/ }));

    expect(screen.getAllByText(/^发展；形成$/).length).toBeGreaterThan(0);
  });

  it("supports day-based review entry, quiz prompts, and difficult-word recovery", () => {
    const fullBank = getDemoDefinition(
      "english",
      "high-school-3500-words",
      "english-3500-full-bank",
    );

    expect(fullBank).not.toBeNull();

    render(<>{fullBank!.renderStage?.(fullBank!.defaultParams)}</>);

    fireEvent.click(screen.getByRole("button", { name: /第 2 天：回看昨天/ }));

    expect(screen.getByText(/第 2 天复习入口/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /切换到自测模式/ }));

    expect(screen.getByText(/看到中文先说英文/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /加入错词回收/ }));

    expect(screen.getByRole("heading", { name: /错词回收/ })).toBeInTheDocument();
    expect(screen.getAllByText(/develop/).length).toBeGreaterThan(0);
    expect(screen.getByText(/搭配提醒/)).toBeInTheDocument();
    expect(screen.getByText(/回想例句/)).toBeInTheDocument();
    expect(screen.getByText(/易混对照：/)).toBeInTheDocument();
  });

  it("tracks mastery progress and supports quick drills for difficult words", () => {
    const fullBank = getDemoDefinition(
      "english",
      "high-school-3500-words",
      "english-3500-full-bank",
    );

    expect(fullBank).not.toBeNull();

    render(<>{fullBank!.renderStage?.(fullBank!.defaultParams)}</>);

    fireEvent.click(screen.getByRole("button", { name: /已掌握/ }));
    fireEvent.click(screen.getByRole("button", { name: /加入错词回收/ }));

    expect(screen.getByText(/已掌握 1 词/)).toBeInTheDocument();
    expect(screen.getByText(/错词 1 词/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /开始错词快测/ }));

    expect(screen.getByText(/错词快测/)).toBeInTheDocument();
    expect(screen.getByText(/请先说出这个词的英文/)).toBeInTheDocument();
    expect(screen.getAllByText(/^发展；形成$/).length).toBeGreaterThan(0);
  });

  it("supports a three-stage daily review queue", () => {
    const fullBank = getDemoDefinition(
      "english",
      "high-school-3500-words",
      "english-3500-full-bank",
    );

    expect(fullBank).not.toBeNull();

    render(<>{fullBank!.renderStage?.(fullBank!.defaultParams)}</>);

    fireEvent.click(screen.getByRole("button", { name: /加入今日任务/ }));

    expect(screen.getByRole("button", { name: /已加入今日任务/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("heading", { name: "待处理" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /今天已完成/ }));

    expect(screen.getByRole("button", { name: /今天已完成/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("heading", { name: "今日完成" })).toBeInTheDocument();
    expect(screen.getByText(/回想例句/)).toBeInTheDocument();
    expect(screen.getByText(/易混对照：/)).toBeInTheDocument();
    expect(screen.getAllByText(/improve/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/develop/).length).toBeGreaterThan(0);
  });

  it("restores mastery, difficult words, and study day from local storage", async () => {
    const fullBank = getDemoDefinition(
      "english",
      "high-school-3500-words",
      "english-3500-full-bank",
    );

    expect(fullBank).not.toBeNull();

    const { unmount } = render(<>{fullBank!.renderStage?.(fullBank!.defaultParams)}</>);

    fireEvent.click(screen.getByRole("button", { name: /标记为已掌握/ }));
    fireEvent.click(screen.getByRole("button", { name: /加入错词回收/ }));
    fireEvent.click(screen.getByRole("button", { name: /加入今日任务/ }));
    fireEvent.click(screen.getByRole("button", { name: /今天已完成/ }));
    fireEvent.click(screen.getByRole("button", { name: /第 3 天：易混纠错/ }));

    unmount();

    render(<>{fullBank!.renderStage?.(fullBank!.defaultParams)}</>);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "已掌握" })).toHaveAttribute("aria-pressed", "true");
      expect(screen.getByRole("button", { name: "已加入错词回收" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      expect(screen.getByText(/已掌握 1 词/)).toBeInTheDocument();
      expect(screen.getByText(/错词 1 词/)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "已加入今日任务" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      expect(screen.getByRole("button", { name: "今天已完成" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      expect(screen.getByText(/第 3 天复习入口/)).toBeInTheDocument();
    });
  });
});
