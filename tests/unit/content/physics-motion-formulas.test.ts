import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("physics motion formulas copy", () => {
  it("covers the core velocity and graph formulas across motion units", () => {
    const expectations = [
      {
        file: "content/units/physics/motion/physics-uniform-motion.mdx",
        snippets: ["v = Δs / Δt", "s = s0 + vt", "`s-t` 图像的斜率就是速度"],
      },
      {
        file: "content/units/physics/motion/physics-accelerated-motion.mdx",
        snippets: ["v = v0 + at", "s = s0 + v0t + 1/2 at^2", "v^2 - v0^2 = 2a(s - s0)"],
      },
      {
        file: "content/units/physics/motion/physics-free-fall.mdx",
        snippets: ["v = gt", "s = 1/2 gt^2", "h = h0 - 1/2 gt^2"],
      },
      {
        file: "content/units/physics/motion/physics-uniform-chase.mdx",
        snippets: ["s前 = s前0 + v前 t", "s后 = s后0 + v后 t", "追上时，两者位置相等"],
      },
      {
        file: "content/units/physics/motion/physics-mixed-chase.mdx",
        snippets: ["s前 = s前0 + v前 t", "s后 = s后0 + v后0 t + 1/2 a后 t^2", "追上时，两者位置相等"],
      },
      {
        file: "content/units/physics/motion/physics-motion-graphs.mdx",
        snippets: ["s-t 图的斜率 = v", "v-t 图的斜率 = a", "v-t 图线与时间轴围成的面积 = 位移变化"],
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
