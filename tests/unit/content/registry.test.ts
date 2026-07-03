import { describe, expect, it } from "vitest";

import {
  getAllSubjects,
  getModulesBySubject,
  getSubjectBySlug,
} from "@/lib/content/loaders";
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
});
