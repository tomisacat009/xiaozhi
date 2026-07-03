// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ModulePage from "@/app/subjects/[subjectSlug]/[moduleSlug]/page";
import UnitPage from "@/app/subjects/[subjectSlug]/[moduleSlug]/[unitSlug]/page";
import { getAllUnits, getUnitsByModuleRoute } from "@/lib/content/loaders";
import { getAllUnitEntries } from "@/features/knowledge/unit-page";

afterEach(() => {
  cleanup();
});

describe("expanded content routes", () => {
  it("generates static unit entries for the full migrated skeleton", () => {
    expect(getAllUnits()).toHaveLength(72);
    expect(getAllUnitEntries()).toHaveLength(72);
  });

  it("lists full module unit entries for migrated modules", async () => {
    const mathUnits = getUnitsByModuleRoute("math", "functions");
    expect(mathUnits).toHaveLength(6);

    const view = await ModulePage({
      params: Promise.resolve({
        subjectSlug: "physics",
        moduleSlug: "motion",
      }),
    });

    render(view);

    expect(
      screen.getByRole("heading", { name: "运动与图像", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("已可体验").length).toBeGreaterThan(0);
  });

  it("renders a migrating unit page without requiring mdx content", async () => {
    const view = await UnitPage({
      params: Promise.resolve({
        subjectSlug: "physics",
        moduleSlug: "motion",
        unitSlug: "physics-uniform-motion",
      }),
    });

    render(view);

    expect(
      screen.getByRole("heading", { name: "匀速直线运动与图像", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "匀速直线运动", level: 2 }).length).toBeGreaterThan(0);
    expect(screen.getByRole("slider", { name: "速度 v" })).toBeInTheDocument();
    expect(screen.getByText(/位置公式是 s =/)).toBeInTheDocument();
  });
});
