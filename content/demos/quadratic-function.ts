import { createElement } from "react";

import { sampleQuadratic } from "@/engine/core/math";
import type { DemoDefinition } from "@/engine/core/types";
import { QuadraticSvg } from "@/engine/renderers/quadratic-svg";

export type QuadraticParams = {
  a: number;
  b: number;
  c: number;
};

function formatNumber(value: number) {
  return Number(value.toFixed(2)).toString();
}

function getAxis(a: number, b: number) {
  return -b / (2 * a);
}

function getVertex(a: number, b: number, c: number) {
  const x = getAxis(a, b);
  const y = a * x * x + b * x + c;

  return { x, y };
}

export const quadraticFunctionDemo: DemoDefinition<QuadraticParams> = {
  id: "quadratic-function",
  title: "二次函数图像变化",
  description:
    "拖动 a、b、c，实时观察抛物线的开口方向、对称轴与顶点位置如何联动变化。",
  defaultParams: { a: 1, b: 0, c: 0 },
  presets: [
    {
      id: "base",
      label: "基础抛物线",
      params: { a: 1, b: 0, c: 0 },
    },
    {
      id: "flip",
      label: "开口向下",
      params: { a: -1, b: 0, c: 0 },
    },
    {
      id: "shift",
      label: "顶点右移",
      params: { a: 1, b: -4, c: 1 },
    },
  ],
  controls: {
    a: { label: "a", min: -4, max: 4, step: 0.5 },
    b: { label: "b", min: -8, max: 8, step: 0.5 },
    c: { label: "c", min: -8, max: 8, step: 0.5 },
  },
  explanation(params) {
    const { a, b, c } = params;

    if (a === 0) {
      return [
        "当前 a = 0，图像退化为一次函数，不再是抛物线。",
        `此时直线的斜率由 b = ${formatNumber(b)} 决定，截距为 c = ${formatNumber(c)}。`,
      ];
    }

    const axis = getAxis(a, b);
    const vertex = getVertex(a, b, c);

    return [
      a > 0 ? "抛物线开口向上，顶点对应最小值。" : "抛物线开口向下，顶点对应最大值。",
      Math.abs(a) > 1
        ? "当前 |a| > 1，图像更瘦、更陡。"
        : "当前 |a| <= 1，图像更舒展、更平缓。",
      `对称轴是 x = ${formatNumber(axis)}。`,
      `顶点约为 (${formatNumber(vertex.x)}, ${formatNumber(vertex.y)})，常数项 c = ${formatNumber(c)} 会影响与 y 轴的交点。`,
      "开口方向与顶点变化",
    ];
  },
  renderStage(params) {
    const points = sampleQuadratic(params.a, params.b, params.c);

    return createElement(QuadraticSvg, { points });
  },
};
