import { describe, expect, it } from "vitest";

import { getUnitByRoute } from "@/lib/content/loaders";

describe("content polish metadata", () => {
  it("keeps math function units free from unrelated english sentence goals", () => {
    const linear = getUnitByRoute("math", "functions", "linear");
    const reciprocal = getUnitByRoute("math", "functions", "reciprocal");

    expect(linear).not.toBeNull();
    expect(reciprocal).not.toBeNull();

    const blockedWords = ["句子", "谓语", "宾语", "表语", "主干", "修饰"];

    for (const unit of [linear, reciprocal]) {
      const joined = [...unit!.learningGoals, ...unit!.coreTakeaways].join(" ");

      for (const word of blockedWords) {
        expect(joined).not.toContain(word);
      }
    }
  });
});
