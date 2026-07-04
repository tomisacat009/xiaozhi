import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("priority content depth", () => {
  it("keeps the next high-priority units expanded with student-facing anchors", () => {
    const expectations = [
      {
        file: "content/units/physics/motion/physics-projectile-motion.mdx",
        snippets: ["## 先抓住两个方向", "x = v0t", "y = 1/2 gt^2"],
      },
      {
        file: "content/units/physics/energy/physics-work-power.mdx",
        snippets: ["## 先抓住这几个核心关系", "W = Fs cos θ", "P = W / t"],
      },
      {
        file: "content/units/physics/energy/physics-kinetic-energy.mdx",
        snippets: ["## 先抓住这条主线", "W合 = ΔEk", "Ek = 1/2 mv^2"],
      },
      {
        file: "content/units/physics/force/physics-friction.mdx",
        snippets: ["## 判断摩擦力时按这个顺序想", "静摩擦力", "滑动摩擦力"],
      },
      {
        file: "content/units/physics/force/physics-incline-motion.mdx",
        snippets: ["## 斜面题先走这四步", "mgsinθ", "mgcosθ"],
      },
      {
        file: "content/units/english/sentence-structure/english-tense-timeline.mdx",
        snippets: ["## 读时态先看三个点", "动作发生点", "观察点"],
      },
      {
        file: "content/units/english/sentence-structure/english-reading-layer.mdx",
        snippets: ["## 读文章时先分四层", "主旨句", "例子和数据"],
      },
      {
        file: "content/units/english/roots-vocabulary-network/english-logic-connector-map.mdx",
        snippets: ["## 选连接词时先问自己", "however", "therefore"],
      },
      {
        file: "content/units/english/roots-vocabulary-network/english-writing-upgrade-workshop.mdx",
        snippets: ["## 句子升级时优先改这三件事", "Because the weather was bad", "If we prepare well"],
      },
      {
        file: "content/units/chemistry/chemical-language/chemistry-mole.mdx",
        snippets: ["## 先抓住这张换算网", "n = m / M", "N = nNA"],
      },
      {
        file: "content/units/chemistry/reaction-principles/chemistry-redox.mdx",
        snippets: ["## 判断氧化还原时按这条线走", "化合价升高", "失电子 = 被氧化"],
      },
      {
        file: "content/units/chemistry/reaction-principles/chemistry-ionic-reaction.mdx",
        snippets: ["## 写离子方程式时按这四步走", "拆", "删去旁观离子"],
      },
    ];

    for (const { file, snippets } of expectations) {
      const source = readFileSync(path.join(process.cwd(), file), "utf8");

      for (const snippet of snippets) {
        expect(source).toContain(snippet);
      }
    }
  });
});
