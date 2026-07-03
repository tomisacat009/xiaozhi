import { describe, expect, it } from "vitest";

import {
  getManifestByLegacyType,
  getManifestBySubject,
  migrationManifest,
} from "@/content/migration-manifest";

describe("migration manifest", () => {
  it("covers all four subjects", () => {
    expect(
      (["math", "physics", "chemistry", "english"] as const).map(
        (subjectId) => getManifestBySubject(subjectId).length > 0,
      ),
    ).toEqual([true, true, true, true]);
  });

  it("contains a module record for every legacy module page", () => {
    const modulePaths = getManifestByLegacyType("module").map(
      (record) => record.legacyPath,
    );

    expect(modulePaths).toHaveLength(17);
    expect(new Set(modulePaths).size).toBe(17);
    expect(modulePaths).toContain(
      "legacy/prototype-v1/modules/functions.html",
    );
    expect(modulePaths).toContain(
      "legacy/prototype-v1/modules/physics-motion.html",
    );
    expect(modulePaths).toContain(
      "legacy/prototype-v1/modules/chemistry-language.html",
    );
    expect(modulePaths).toContain(
      "legacy/prototype-v1/modules/english-sentence.html",
    );
  });

  it("tracks all legacy demo directories except shared", () => {
    const demoPaths = getManifestByLegacyType("demo").map(
      (record) => record.legacyPath,
    );

    expect(demoPaths).toHaveLength(61);
    expect(demoPaths.some((path) => path.endsWith("/shared"))).toBe(false);
  });

  it("starts every record in planned state", () => {
    expect(
      migrationManifest.every((record) => record.status === "planned"),
    ).toBe(true);
  });
});
