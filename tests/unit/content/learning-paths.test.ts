import { describe, expect, it } from "vitest";

import { learningPaths } from "@/content/learning-paths";

describe("learning paths", () => {
  it("keeps the priority physics paths aligned with their module themes", () => {
    const electricityPath = learningPaths.find((entry) => entry.id === "physics-path-5");
    const wavePath = learningPaths.find((entry) => entry.id === "physics-path-6");

    expect(electricityPath?.topics).toEqual([
      "串联与并联电路对比",
      "欧姆定律与伏安关系",
    ]);

    expect(wavePath?.topics).toEqual([
      "简谐振动的周期与图像",
      "波的传播与相位感知",
    ]);
  });
});
