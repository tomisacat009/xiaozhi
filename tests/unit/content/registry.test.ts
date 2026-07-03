import { describe, expect, it } from "vitest";

import {
  getAllSubjects,
  getAllModules,
  getModulesBySubject,
  getSubjectBySlug,
} from "@/lib/content/loaders";
import { validateContentRegistry } from "@/lib/content/registry";
import { buildUnitPath } from "@/lib/routes";

describe("content registry", () => {
  it("returns the four existing subjects", () => {
    expect(getAllSubjects().map((subject) => subject.slug)).toEqual([
      "math",
      "physics",
      "chemistry",
      "english",
    ]);
  });

  it("builds semantic unit paths", () => {
    expect(
      buildUnitPath({
        subjectSlug: "math",
        moduleSlug: "functions",
        unitSlug: "quadratic-function",
      }),
    ).toBe("/subjects/math/functions/quadratic-function");
  });

  it("loads modules by subject", () => {
    const subject = getSubjectBySlug("math");
    expect(subject?.nameZh).toBe("数学");
    expect(getModulesBySubject(subject!.id).length).toBeGreaterThan(0);
  });

  it("returns null for an unknown subject slug", () => {
    expect(getSubjectBySlug("biology")).toBeNull();
  });

  it("returns an empty array for an unknown subject id", () => {
    expect(getModulesBySubject("biology")).toEqual([]);
  });

  it("returns cloned subject records so callers cannot mutate the registry", () => {
    const firstRead = getAllSubjects();
    firstRead[0].nameZh = "被污染";

    expect(getAllSubjects()[0].nameZh).toBe("数学");
  });

  it("returns cloned module records so callers cannot mutate the registry", () => {
    const firstRead = getAllModules();
    firstRead[0].highlights.push("被污染");

    expect(getAllModules()[0].highlights).toEqual([
      "一次函数",
      "二次函数",
      "函数图像",
    ]);
  });

  it("fails when subject slugs are duplicated", () => {
    expect(() =>
      validateContentRegistry({
        subjects: [
          {
            id: "math",
            slug: "math",
            nameZh: "数学",
            nameEn: "Mathematics",
            summary: "summary",
            theme: "sunrise",
          },
          {
            id: "advanced-math",
            slug: "math",
            nameZh: "高数",
            nameEn: "Advanced Mathematics",
            summary: "summary",
            theme: "marine",
          },
        ],
        modules: [],
      }),
    ).toThrow(/Duplicate subject slug: math/);
  });

  it("fails when a module references an unknown subject", () => {
    expect(() =>
      validateContentRegistry({
        subjects: [
          {
            id: "math",
            slug: "math",
            nameZh: "数学",
            nameEn: "Mathematics",
            summary: "summary",
            theme: "sunrise",
          },
        ],
        modules: [
          {
            id: "orphan-module",
            subjectId: "physics",
            slug: "motion",
            title: "运动学",
            summary: "summary",
            highlights: [],
            order: 1,
          },
        ],
      }),
    ).toThrow(/Unknown module subjectId: physics/);
  });
});
