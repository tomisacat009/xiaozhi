import { createElement } from "react";

import { sampleQuadratic } from "@/engine/core/math";
import type { DemoDefinition, DemoParams } from "@/engine/core/types";
import { CartesianPlot, ConceptBoard } from "@/engine/renderers/cartesian-plot";
import { QuadraticSvg } from "@/engine/renderers/quadratic-svg";

type NumericDemo = DemoDefinition<Record<string, number>>;
type MixedDemo = DemoDefinition<Record<string, number | string>>;
type CircuitDemo = DemoDefinition<{
  circuit: string;
  voltage: number;
  r1: number;
  r2: number;
}>;

function round(value: number) {
  return Number(value.toFixed(2));
}

function sampleCurve(
  fn: (x: number) => number,
  range: { xMin: number; xMax: number },
  step = 0.1,
) {
  const points: Array<{ x: number; y: number }> = [];

  for (let x = range.xMin; x <= range.xMax + 1e-8; x += step) {
    const safeX = round(x);
    const y = fn(safeX);

    if (!Number.isFinite(y)) {
      continue;
    }

    points.push({ x: safeX, y: round(y) });
  }

  return points;
}

function makeSeries(
  id: string,
  label: string,
  color: string,
  points: Array<{ x: number; y: number }>,
) {
  return { id, label, color, points };
}

function sampleSineWave(
  fn: (value: number) => number,
  range: { min: number; max: number },
  step = 0.05,
) {
  const points: Array<{ x: number; y: number }> = [];

  for (let value = range.min; value <= range.max + 1e-8; value += step) {
    const safeValue = round(value);

    points.push({
      x: safeValue,
      y: round(fn(safeValue)),
    });
  }

  return points;
}

function createBoard(
  title: string,
  items: Array<{
    id: string;
    title: string;
    summary: string;
    accent?: string;
  }>,
) {
  return createElement(ConceptBoard, {
    title,
    items,
  });
}

const linearDemo: NumericDemo = {
  id: "linear",
  title: "一次函数变化",
  description: "拖动斜率和截距，观察直线方向、陡缓与上下平移如何分工。",
  defaultParams: { k: 1, b: 0 },
  presets: [
    { id: "rise", label: "正斜率", params: { k: 1.5, b: 0 } },
    { id: "flat", label: "水平线", params: { k: 0, b: 2 } },
    { id: "fall", label: "负斜率", params: { k: -1.5, b: -1 } },
  ],
  controls: {
    k: { label: "斜率 k", min: -4, max: 4, step: 0.2 },
    b: { label: "截距 b", min: -6, max: 6, step: 0.5 },
  },
  explanation({ k, b }) {
    return [
      k > 0 ? "斜率大于 0，直线从左下向右上。" : k < 0 ? "斜率小于 0，直线从左上向右下。" : "斜率等于 0，图像退化为水平线。",
      `当前与 y 轴交点是 (${0}, ${round(b)})。`,
      Math.abs(k) > 1 ? "斜率绝对值更大，图像更陡。" : "斜率绝对值较小，图像更平缓。",
    ];
  },
  renderStage({ k, b }) {
    const points = sampleCurve((x) => k * x + b, { xMin: -6, xMax: 6 }, 0.5);

    return createElement(CartesianPlot, {
      ariaLabel: "一次函数图像",
      bounds: { xMin: -6, xMax: 6, yMin: -8, yMax: 8 },
      series: [makeSeries("linear", "y = kx + b", "#ea580c", points)],
      markers: [{ id: "intercept", x: 0, y: b, label: "y 截距" }],
    });
  },
};

const reciprocalDemo: NumericDemo = {
  id: "reciprocal",
  title: "反比例函数变化",
  description: "看清系数 k 对象限分布、开口方向与渐近线的共同影响。",
  defaultParams: { k: 4 },
  presets: [
    { id: "q13", label: "第一三象限", params: { k: 4 } },
    { id: "q24", label: "第二四象限", params: { k: -4 } },
    { id: "wide", label: "更贴近坐标轴", params: { k: 1.5 } },
  ],
  controls: {
    k: { label: "系数 k", min: -8, max: 8, step: 0.5 },
  },
  explanation({ k }) {
    return [
      k > 0 ? "k > 0 时，两支曲线落在第一、三象限。" : "k < 0 时，两支曲线落在第二、四象限。",
      Math.abs(k) > 4 ? "绝对值变大后，离原点更远，同一 x 下 y 的绝对值更大。" : "绝对值较小时，曲线更贴近坐标轴。",
      "x = 0 与 y = 0 仍然是渐近线，图像不会真正碰到坐标轴。",
    ];
  },
  renderStage({ k }) {
    const left = sampleCurve((x) => k / x, { xMin: -8, xMax: -0.6 }, 0.1);
    const right = sampleCurve((x) => k / x, { xMin: 0.6, xMax: 8 }, 0.1);

    return createElement(CartesianPlot, {
      ariaLabel: "反比例函数图像",
      bounds: { xMin: -8, xMax: 8, yMin: -8, yMax: 8 },
      series: [
        makeSeries("left", "左支", "#0f766e", left),
        makeSeries("right", "右支", "#ea580c", right),
      ],
    });
  },
};

const expLogDemo: NumericDemo = {
  id: "exp-log",
  title: "指数与对数对比",
  description: "把互逆关系与底数变化放在同一坐标系里观察。",
  defaultParams: { base: 2 },
  presets: [
    { id: "grow", label: "底数 2", params: { base: 2 } },
    { id: "fast", label: "底数 3", params: { base: 3 } },
    { id: "decay", label: "底数 0.5", params: { base: 0.5 } },
  ],
  controls: {
    base: { label: "底数 a", min: 0.3, max: 3, step: 0.1 },
  },
  explanation({ base }) {
    return [
      base > 1 ? "a > 1 时，指数函数递增，对数函数也递增。" : "0 < a < 1 时，两条曲线都改成递减趋势。",
      "指数函数一定经过 (0, 1)，对数函数一定经过 (1, 0)。",
      "互逆关系的核心不是背定义，而是看到两条曲线围绕 y = x 互为镜像。",
    ];
  },
  renderStage({ base }) {
    const expPoints = sampleCurve((x) => base ** x, { xMin: -3, xMax: 3 }, 0.05);
    const logPoints = sampleCurve((x) => Math.log(x) / Math.log(base), { xMin: 0.2, xMax: 8 }, 0.05);
    const mirror = sampleCurve((x) => x, { xMin: -3, xMax: 6 }, 0.25);

    return createElement(CartesianPlot, {
      ariaLabel: "指数函数和对数函数对比",
      bounds: { xMin: -3, xMax: 8, yMin: -4, yMax: 8 },
      series: [
        makeSeries("exp", "y = a^x", "#ea580c", expPoints),
        makeSeries("log", "y = log_a x", "#2563eb", logPoints),
        { ...makeSeries("mirror", "y = x", "#64748b", mirror), strokeDasharray: "6 6" },
      ],
      markers: [
        { id: "exp-anchor", x: 0, y: 1, label: "(0,1)" },
        { id: "log-anchor", x: 1, y: 0, label: "(1,0)", color: "#2563eb" },
      ],
    });
  },
};

const powerDemo: NumericDemo = {
  id: "power",
  title: "幂函数图像变化",
  description: "对比奇次、偶次与分数指数，建立幂函数的整体图像感。",
  defaultParams: { exponent: 2 },
  presets: [
    { id: "even", label: "偶次幂", params: { exponent: 2 } },
    { id: "odd", label: "奇次幂", params: { exponent: 3 } },
    { id: "fraction", label: "分数指数", params: { exponent: 0.5 } },
  ],
  controls: {
    exponent: { label: "指数 p", min: 0.5, max: 5, step: 0.5 },
  },
  explanation({ exponent }) {
    return [
      Number.isInteger(exponent) && exponent % 2 === 0 ? "偶次幂关于 y 轴对称。" : Number.isInteger(exponent) ? "奇次幂关于原点对称。" : "分数指数先盯住定义域，通常只看 x >= 0。",
      exponent > 2 ? "指数更大时，x 远离 1 后变化更剧烈。" : "指数较小时，曲线更舒展。",
      "幂函数最容易混的不是公式，而是对称性和定义域。",
    ];
  },
  renderStage({ exponent }) {
    const start = exponent < 1 ? 0 : -3;
    const points = sampleCurve((x) => x ** exponent, { xMin: start, xMax: 3 }, 0.05);

    return createElement(CartesianPlot, {
      ariaLabel: "幂函数图像",
      bounds: { xMin: -3, xMax: 3, yMin: -4, yMax: 10 },
      series: [makeSeries("power", "y = x^p", "#7c3aed", points)],
    });
  },
};

const quadraticReferenceDemo = {
  id: "quadratic-function",
  title: "二次函数图像变化",
  description: "拖动 a、b、c，实时观察抛物线的开口方向、对称轴与顶点位置如何联动变化。",
  defaultParams: { a: 1, b: 0, c: 0 },
  presets: [
    { id: "base", label: "基础抛物线", params: { a: 1, b: 0, c: 0 } },
    { id: "flip", label: "开口向下", params: { a: -1, b: 0, c: 0 } },
    { id: "shift", label: "顶点右移", params: { a: 1, b: -4, c: 1 } },
  ],
  controls: {
    a: { label: "a", min: -4, max: 4, step: 0.5 },
    b: { label: "b", min: -8, max: 8, step: 0.5 },
    c: { label: "c", min: -8, max: 8, step: 0.5 },
  },
  explanation({ a, b, c }) {
    if (a === 0) {
      return ["当前 a = 0，图像退化为一次函数。", `此时截距是 ${round(c)}，斜率由 b 决定。`];
    }

    const axis = -b / (2 * a);
    const vertex = { x: axis, y: a * axis * axis + b * axis + c };

    return [
      a > 0 ? "抛物线开口向上，顶点对应最小值。" : "抛物线开口向下，顶点对应最大值。",
      `对称轴是 x = ${round(axis)}，顶点约为 (${round(vertex.x)}, ${round(vertex.y)})。`,
      Math.abs(a) > 1 ? "|a| 更大，图像更瘦更陡。" : "|a| 较小，图像更舒展。",
    ];
  },
  renderStage({ a, b, c }) {
    return createElement(QuadraticSvg, { points: sampleQuadratic(a, b, c) });
  },
} satisfies NumericDemo;

const sinTransformDemo: NumericDemo = {
  id: "sin-transform",
  title: "三角函数参数变化",
  description: "把振幅、周期、相位和平移的影响拆开看。",
  defaultParams: { amplitude: 1, omega: 1, phase: 0, offset: 0 },
  presets: [
    { id: "base", label: "标准波形", params: { amplitude: 1, omega: 1, phase: 0, offset: 0 } },
    { id: "amplitude", label: "振幅放大", params: { amplitude: 2, omega: 1, phase: 0, offset: 0 } },
    { id: "period", label: "周期压缩", params: { amplitude: 1, omega: 2, phase: 0, offset: 0 } },
  ],
  controls: {
    amplitude: { label: "振幅 A", min: 0.5, max: 3, step: 0.1 },
    omega: { label: "角速度 w", min: 0.5, max: 3, step: 0.1 },
    phase: { label: "相位 p", min: -3.14, max: 3.14, step: 0.1 },
    offset: { label: "平移 d", min: -3, max: 3, step: 0.1 },
  },
  explanation({ amplitude, omega, phase, offset }) {
    const period = (2 * Math.PI) / omega;

    return [
      `振幅是 ${round(amplitude)}，所以波峰与中线的距离固定为它。`,
      `周期约为 ${round(period)}，w 越大，一个周期越短。`,
      `相位约为 ${round(phase)}，它会和上下平移一起决定首个波峰出现的位置；当前中线是 y = ${round(offset)}。`,
    ];
  },
  renderStage({ amplitude, omega, phase, offset }) {
    const points = sampleCurve(
      (x) => amplitude * Math.sin(omega * x + phase) + offset,
      { xMin: 0, xMax: Math.PI * 4 },
      0.05,
    );

    return createElement(CartesianPlot, {
      ariaLabel: "三角函数参数变化图像",
      bounds: { xMin: 0, xMax: Math.PI * 4, yMin: -4, yMax: 4 },
      series: [makeSeries("sin-transform", "y = A sin(wx + p) + d", "#0f766e", points)],
    });
  },
};

const sinBasicDemo: NumericDemo = {
  ...sinTransformDemo,
  id: "sin-basic",
  title: "sin(x) 基础图像",
  defaultParams: { amplitude: 1, omega: 1, phase: 0, offset: 0 },
  presets: [
    { id: "base", label: "标准 sin(x)", params: { amplitude: 1, omega: 1, phase: 0, offset: 0 } },
    { id: "half", label: "只看半周期", params: { amplitude: 1, omega: 1, phase: 0, offset: 0 } },
  ],
};

const cosBasicDemo: NumericDemo = {
  ...sinTransformDemo,
  id: "cos-basic",
  title: "余弦函数基础图像",
  explanation({ amplitude, omega, phase, offset }) {
    const period = (2 * Math.PI) / omega;

    return [
      "余弦函数在 x = 0 时先从最高点出发，这是它和正弦函数最直观的区别。",
      `当前周期约为 ${round(period)}，中线是 y = ${round(offset)}。`,
      `波峰高度由振幅 ${round(amplitude)} 决定，相位 ${round(phase)} 会整体推动图像左右平移。`,
    ];
  },
  renderStage({ amplitude, omega, phase, offset }) {
    const points = sampleCurve(
      (x) => amplitude * Math.cos(omega * x + phase) + offset,
      { xMin: 0, xMax: Math.PI * 4 },
      0.05,
    );

    return createElement(CartesianPlot, {
      ariaLabel: "余弦函数图像",
      bounds: { xMin: 0, xMax: Math.PI * 4, yMin: -4, yMax: 4 },
      series: [makeSeries("cos", "y = A cos(wx + p) + d", "#2563eb", points)],
    });
  },
};

const tanBasicDemo: NumericDemo = {
  id: "tan-basic",
  title: "正切函数与间断感知",
  description: "看见渐近线和断点后，正切函数才不会被误看成连续波形。",
  defaultParams: { omega: 1 },
  presets: [
    { id: "base", label: "标准 tan(x)", params: { omega: 1 } },
    { id: "tight", label: "周期变短", params: { omega: 2 } },
  ],
  controls: {
    omega: { label: "角速度 w", min: 0.5, max: 2.5, step: 0.1 },
  },
  explanation({ omega }) {
    return [
      `当前周期约为 ${round(Math.PI / omega)}。`,
      "每遇到 x = pi/2 + kpi 这一类位置，图像会断开并靠近渐近线。",
      "看正切函数时，最容易犯的错是把断点两边硬连起来。",
    ];
  },
  renderStage({ omega }) {
    const segments = [
      sampleCurve((x) => Math.tan(omega * x), { xMin: -1.3, xMax: -0.2 }, 0.02),
      sampleCurve((x) => Math.tan(omega * x), { xMin: 0.2, xMax: 1.3 }, 0.02),
      sampleCurve((x) => Math.tan(omega * x), { xMin: 1.8, xMax: 2.9 }, 0.02),
    ];

    return createElement(CartesianPlot, {
      ariaLabel: "正切函数图像",
      bounds: { xMin: -1.5, xMax: 3.2, yMin: -5, yMax: 5 },
      series: segments.map((points, index) =>
        makeSeries(`tan-${index}`, `分段 ${index + 1}`, index % 2 === 0 ? "#ea580c" : "#0f766e", points),
      ),
    });
  },
};

const lineCircleDemo: NumericDemo = {
  id: "line-circle",
  title: "直线与圆的位置关系",
  description: "通过直线到圆心的距离，统一判断相离、相切和相交。",
  defaultParams: { k: 0.6, b: 0, r: 3 },
  presets: [
    { id: "separate", label: "相离", params: { k: 0.6, b: 4, r: 3 } },
    { id: "touch", label: "相切", params: { k: 0, b: 3, r: 3 } },
    { id: "cross", label: "相交", params: { k: -0.5, b: 0, r: 3 } },
  ],
  controls: {
    k: { label: "斜率 k", min: -2, max: 2, step: 0.1 },
    b: { label: "截距 b", min: -6, max: 6, step: 0.2 },
    r: { label: "半径 r", min: 1, max: 5, step: 0.2 },
  },
  explanation({ k, b, r }) {
    const distance = Math.abs(b) / Math.sqrt(k * k + 1);
    const relation = Math.abs(distance - r) < 0.1 ? "相切" : distance > r ? "相离" : "相交";

    return [
      `当前圆心取原点，直线到圆心的距离约为 ${round(distance)}。`,
      `把这个距离与半径 ${round(r)} 比较，得到位置关系：${relation}。`,
      "一旦抓住“距离和半径比较”，判定方法就统一了。",
    ];
  },
  renderStage({ k, b, r }) {
    const line = sampleCurve((x) => k * x + b, { xMin: -6, xMax: 6 }, 0.1);
    const circle = Array.from({ length: 121 }, (_, index) => {
      const angle = (index / 120) * Math.PI * 2;

      return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
    });

    return createElement(CartesianPlot, {
      ariaLabel: "直线与圆的位置关系",
      bounds: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
      series: [
        makeSeries("line", "直线", "#ea580c", line),
        makeSeries("circle", "圆", "#2563eb", circle),
      ],
    });
  },
};

const parabolaStandardDemo: NumericDemo = {
  id: "parabola-standard",
  title: "抛物线标准方程",
  description: "通过 p 的变化，看开口方向和焦点位置如何同步变化。",
  defaultParams: { p: 2 },
  presets: [
    { id: "right", label: "向右开口", params: { p: 2 } },
    { id: "left", label: "向左开口", params: { p: -2 } },
  ],
  controls: {
    p: { label: "参数 p", min: -4, max: 4, step: 0.5 },
  },
  explanation({ p }) {
    return [
      p > 0 ? "p > 0 时，抛物线向右开口。" : "p < 0 时，抛物线向左开口。",
      `焦点在 (${round(p / 2)}, 0)，准线是 x = ${round(-p / 2)}。`,
      "|p| 变大后，焦点离顶点更远，图像会更舒展。",
    ];
  },
  renderStage({ p }) {
    const points = sampleCurve((y) => (y * y) / (2 * p), { xMin: -6, xMax: 6 }, 0.1).map((point) => ({
      x: point.y,
      y: point.x,
    }));

    return createElement(CartesianPlot, {
      ariaLabel: "抛物线标准方程图像",
      bounds: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
      series: [makeSeries("parabola", "y^2 = 2px", "#ea580c", points)],
      markers: [{ id: "focus", x: p / 2, y: 0, label: "焦点" }],
    });
  },
};

const ellipseStandardDemo: NumericDemo = {
  id: "ellipse-standard",
  title: "椭圆标准方程",
  description: "用长轴和短轴的变化，建立椭圆整体形态与焦点位置的感觉。",
  defaultParams: { a: 4, b: 2.5 },
  presets: [
    { id: "flat", label: "横向拉长", params: { a: 4.5, b: 2 } },
    { id: "round", label: "更接近圆", params: { a: 3.2, b: 2.8 } },
  ],
  controls: {
    a: { label: "长半轴 a", min: 2.5, max: 5.5, step: 0.1 },
    b: { label: "短半轴 b", min: 1.5, max: 4.5, step: 0.1 },
  },
  explanation({ a, b }) {
    const safeA = Math.max(a, b + 0.1);
    const c = Math.sqrt(safeA * safeA - b * b);

    return [
      `长半轴 a = ${round(safeA)}，短半轴 b = ${round(b)}。`,
      `焦点大约在 (${round(c)}, 0) 与 (${round(-c)}, 0)。`,
      safeA - b > 1 ? "a 和 b 差得更大时，椭圆会更扁长。" : "a 和 b 越接近，图像越接近圆。",
    ];
  },
  renderStage({ a, b }) {
    const safeA = Math.max(a, b + 0.1);
    const points = Array.from({ length: 161 }, (_, index) => {
      const angle = (index / 160) * Math.PI * 2;

      return { x: safeA * Math.cos(angle), y: b * Math.sin(angle) };
    });
    const c = Math.sqrt(safeA * safeA - b * b);

    return createElement(CartesianPlot, {
      ariaLabel: "椭圆标准方程图像",
      bounds: { xMin: -6, xMax: 6, yMin: -5, yMax: 5 },
      series: [makeSeries("ellipse", "x^2/a^2 + y^2/b^2 = 1", "#2563eb", points)],
      markers: [
        { id: "focus-right", x: c, y: 0, label: "F1" },
        { id: "focus-left", x: -c, y: 0, label: "F2", color: "#ea580c" },
      ],
    });
  },
};

const hyperbolaStandardDemo: NumericDemo = {
  id: "hyperbola-standard",
  title: "双曲线标准方程",
  description: "把两支图像、焦点与渐近线一起看，双曲线就更不容易抽象化。",
  defaultParams: { a: 2.5, b: 2 },
  presets: [
    { id: "narrow", label: "更瘦的开口", params: { a: 2, b: 2.8 } },
    { id: "wide", label: "更宽的开口", params: { a: 3.5, b: 1.8 } },
  ],
  controls: {
    a: { label: "实半轴 a", min: 1.5, max: 4, step: 0.1 },
    b: { label: "虚半轴 b", min: 1, max: 4, step: 0.1 },
  },
  explanation({ a, b }) {
    const c = Math.sqrt(a * a + b * b);

    return [
      `焦点大约在 (${round(c)}, 0) 与 (${round(-c)}, 0)。`,
      `渐近线斜率约为 ±${round(b / a)}。`,
      b / a > 1 ? "b 相对更大时，开口更陡。" : "a 相对更大时，两支曲线会更平缓地展开。",
    ];
  },
  renderStage({ a, b }) {
    const right = sampleCurve((x) => (b / a) * Math.sqrt(x * x - a * a), { xMin: a + 0.05, xMax: 6 }, 0.05);
    const rightDown = right.map((point) => ({ x: point.x, y: -point.y }));
    const left = right.map((point) => ({ x: -point.x, y: point.y }));
    const leftDown = right.map((point) => ({ x: -point.x, y: -point.y }));
    const c = Math.sqrt(a * a + b * b);

    return createElement(CartesianPlot, {
      ariaLabel: "双曲线标准方程图像",
      bounds: { xMin: -6, xMax: 6, yMin: -5, yMax: 5 },
      series: [
        makeSeries("r1", "第一支", "#ea580c", right),
        makeSeries("r2", "第二支", "#ea580c", rightDown),
        makeSeries("l1", "第三支", "#2563eb", left),
        makeSeries("l2", "第四支", "#2563eb", leftDown),
      ],
      markers: [
        { id: "focus-right", x: c, y: 0, label: "F1" },
        { id: "focus-left", x: -c, y: 0, label: "F2", color: "#2563eb" },
      ],
    });
  },
};

const conicOverviewDemo: MixedDemo = {
  id: "conic-overview",
  title: "圆锥曲线总览",
  description: "把圆、椭圆、抛物线、双曲线放到一张结构板里，快速建立家族关系。",
  defaultParams: { conic: "ellipse" },
  presets: [
    { id: "circle", label: "圆", params: { conic: "circle" } },
    { id: "ellipse", label: "椭圆", params: { conic: "ellipse" } },
    { id: "parabola", label: "抛物线", params: { conic: "parabola" } },
    { id: "hyperbola", label: "双曲线", params: { conic: "hyperbola" } },
  ],
  controls: {
    conic: {
      kind: "select",
      label: "曲线类型",
      options: [
        { label: "圆", value: "circle" },
        { label: "椭圆", value: "ellipse" },
        { label: "抛物线", value: "parabola" },
        { label: "双曲线", value: "hyperbola" },
      ],
    },
  },
  explanation({ conic }) {
    const map: Record<string, string[]> = {
      circle: ["圆可以看成长短半轴相等的特殊椭圆。", "最先抓的是“到圆心距离恒定”。"],
      ellipse: ["椭圆最先抓长短轴和两焦点。", "焦点和轴长共同决定扁长程度。"],
      parabola: ["抛物线最核心的是“到焦点和准线距离相等”。", "它只有一支，没有封闭区域。"],
      hyperbola: ["双曲线一定成双支出现。", "焦点与渐近线是理解它的两个抓手。"],
    };

    return map[String(conic)];
  },
  renderStage({ conic }) {
    const boards: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      circle: [
        { id: "shape", title: "形态", summary: "完全对称、封闭曲线。", accent: "#93c5fd" },
        { id: "feature", title: "核心量", summary: "半径决定一切。", accent: "#fdba74" },
        { id: "relation", title: "家族位置", summary: "是椭圆的特殊情形。", accent: "#86efac" },
      ],
      ellipse: [
        { id: "shape", title: "形态", summary: "封闭、扁长。", accent: "#93c5fd" },
        { id: "feature", title: "核心量", summary: "长短轴与焦点。", accent: "#fdba74" },
        { id: "relation", title: "家族位置", summary: "圆是它的极限情形之一。", accent: "#86efac" },
      ],
      parabola: [
        { id: "shape", title: "形态", summary: "单支开口。", accent: "#93c5fd" },
        { id: "feature", title: "核心量", summary: "焦点与准线。", accent: "#fdba74" },
        { id: "relation", title: "家族位置", summary: "是离心率等于 1 的典型曲线。", accent: "#86efac" },
      ],
      hyperbola: [
        { id: "shape", title: "形态", summary: "两支分离的开口曲线。", accent: "#93c5fd" },
        { id: "feature", title: "核心量", summary: "焦点与渐近线。", accent: "#fdba74" },
        { id: "relation", title: "家族位置", summary: "离心率大于 1。", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "圆锥曲线家族板",
      items: boards[String(conic)],
    });
  },
};

const lineConicRelationDemo: MixedDemo = {
  id: "line-conic-relation",
  title: "直线与圆锥曲线位置关系",
  description: "先看直线扫过曲线时交点个数怎样变化，再回到判别条件。",
  defaultParams: { relation: "secant" },
  presets: [
    { id: "secant", label: "相交", params: { relation: "secant" } },
    { id: "tangent", label: "相切", params: { relation: "tangent" } },
    { id: "separate", label: "相离", params: { relation: "separate" } },
  ],
  controls: {
    relation: {
      kind: "select",
      label: "位置关系",
      options: [
        { label: "相交", value: "secant" },
        { label: "相切", value: "tangent" },
        { label: "相离", value: "separate" },
      ],
    },
  },
  explanation({ relation }) {
    const map: Record<string, string[]> = {
      secant: ["交点有 2 个时，通常回到判别式大于 0。", "图像先帮你建立“确实切进去过”的感觉。"],
      tangent: ["只碰到 1 个点时，对应临界状态。", "这是最适合孩子理解判别式等于 0 的场景。"],
      separate: ["完全碰不到时，交点个数为 0。", "图像感先稳住，再回代数判别。"],
    };

    return map[String(relation)];
  },
  renderStage({ relation }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      secant: [
        { id: "contact", title: "交点数", summary: "2 个交点。", accent: "#93c5fd" },
        { id: "algebra", title: "代数信号", summary: "判别式大于 0。", accent: "#fdba74" },
        { id: "meaning", title: "图像意义", summary: "直线真正穿过曲线。", accent: "#86efac" },
      ],
      tangent: [
        { id: "contact", title: "交点数", summary: "1 个交点。", accent: "#93c5fd" },
        { id: "algebra", title: "代数信号", summary: "判别式等于 0。", accent: "#fdba74" },
        { id: "meaning", title: "图像意义", summary: "直线刚好擦到曲线。", accent: "#86efac" },
      ],
      separate: [
        { id: "contact", title: "交点数", summary: "0 个交点。", accent: "#93c5fd" },
        { id: "algebra", title: "代数信号", summary: "判别式小于 0。", accent: "#fdba74" },
        { id: "meaning", title: "图像意义", summary: "直线没有切进曲线。", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "位置关系判断板",
      items: items[String(relation)],
    });
  },
};

const pointLineDistanceDemo: NumericDemo = {
  id: "point-line-distance",
  title: "点到直线距离",
  description: "把点、直线和垂线段一起画出来，先建立“最短距离一定是垂线段”的感觉。",
  defaultParams: { px: 2, py: 3, k: -0.5, b: -1 },
  presets: [
    { id: "base", label: "基础情形", params: { px: 2, py: 3, k: -0.5, b: -1 } },
    { id: "near", label: "更靠近直线", params: { px: 1, py: 1.2, k: -0.5, b: -1 } },
  ],
  controls: {
    px: { label: "点横坐标", min: -4, max: 4, step: 0.2 },
    py: { label: "点纵坐标", min: -4, max: 5, step: 0.2 },
    k: { label: "斜率 k", min: -2, max: 2, step: 0.1 },
    b: { label: "截距 b", min: -4, max: 4, step: 0.2 },
  },
  explanation({ px, py, k, b }) {
    const distance = Math.abs(k * px - py + b) / Math.sqrt(k * k + 1);
    return [
      `当前最短距离约为 ${round(distance)}。`,
      "最短不是随便连一条线，而是从点向直线作垂线。",
      "公式只是压缩表达，真正的几何意义是“垂直时最短”。",
    ];
  },
  renderStage({ px, py, k, b }) {
    const line = sampleCurve((x) => k * x + b, { xMin: -6, xMax: 6 }, 0.1);
    const footX = (px - k * b + k * py) / (k * k + 1);
    const footY = k * footX + b;

    return createElement(CartesianPlot, {
      ariaLabel: "点到直线距离图像",
      bounds: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
      series: [
        makeSeries("line", "直线", "#2563eb", line),
        makeSeries("distance", "垂线段", "#ea580c", [
          { x: px, y: py },
          { x: footX, y: footY },
        ]),
      ],
      markers: [
        { id: "point", x: px, y: py, label: "P" },
        { id: "foot", x: footX, y: footY, label: "H", color: "#ea580c" },
      ],
    });
  },
};

const solidSectionDemo: MixedDemo = {
  id: "solid-section",
  title: "立体截面变化",
  description: "先看切面方向，再看截面形状怎样变化，别一上来只背结论。",
  defaultParams: { plane: "parallel" },
  presets: [
    { id: "parallel", label: "平行底面", params: { plane: "parallel" } },
    { id: "through-vertex", label: "过顶点", params: { plane: "through-vertex" } },
    { id: "oblique", label: "斜切", params: { plane: "oblique" } },
  ],
  controls: {
    plane: {
      kind: "select",
      label: "切面方式",
      options: [
        { label: "平行底面", value: "parallel" },
        { label: "过顶点", value: "through-vertex" },
        { label: "斜切", value: "oblique" },
      ],
    },
  },
  explanation({ plane }) {
    const map: Record<string, string[]> = {
      parallel: ["切面平行底面时，截面通常与底面同形。", "先抓“相似”而不是死记边数。"],
      "through-vertex": ["过顶点时，经常会出现三角形一类的尖形截面。", "这时要特别盯住哪些棱被切到。"],
      oblique: ["斜切时最容易误判。", "建议先在脑中标出切面依次经过哪些面。"],
    };

    return map[String(plane)];
  },
  renderStage({ plane }) {
    const boards: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      parallel: [
        { id: "plane", title: "切面方向", summary: "平行底面。", accent: "#93c5fd" },
        { id: "shape", title: "截面形状", summary: "通常与底面同形且相似。", accent: "#fdba74" },
        { id: "focus", title: "观察重点", summary: "看比例缩放，不要只盯边数。", accent: "#86efac" },
      ],
      "through-vertex": [
        { id: "plane", title: "切面方向", summary: "穿过顶点。", accent: "#93c5fd" },
        { id: "shape", title: "截面形状", summary: "容易形成三角形。", accent: "#fdba74" },
        { id: "focus", title: "观察重点", summary: "看它切到了哪些侧棱。", accent: "#86efac" },
      ],
      oblique: [
        { id: "plane", title: "切面方向", summary: "斜着穿过立体。", accent: "#93c5fd" },
        { id: "shape", title: "截面形状", summary: "边数和形状最容易变化。", accent: "#fdba74" },
        { id: "focus", title: "观察重点", summary: "按面逐个追踪截线。", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "截面观察板",
      items: boards[String(plane)],
    });
  },
};

const solidRotationDemo: NumericDemo = {
  id: "solid-rotation",
  title: "旋转体生成",
  description: "把平面图形绕轴旋转前后的对应关系说清楚，旋转体就不再只是名字。",
  defaultParams: { radius: 2, height: 4 },
  presets: [
    { id: "cylinder", label: "更像圆柱", params: { radius: 2.5, height: 5 } },
    { id: "slim", label: "更细长", params: { radius: 1.5, height: 5.5 } },
  ],
  controls: {
    radius: { label: "半径", min: 1, max: 4, step: 0.2 },
    height: { label: "高度", min: 2, max: 6, step: 0.2 },
  },
  explanation({ radius, height }) {
    const volume = Math.PI * radius * radius * height;
    return [
      `当前可联想到的圆柱体体积约为 ${round(volume)}。`,
      "半径变化会平方放大体积，高度变化则是线性影响。",
      "旋转体题里，关键是先找到“哪条线在转、绕哪条轴转”。",
    ];
  },
  renderStage({ radius, height }) {
    return createElement(ConceptBoard, {
      title: "旋转体生成板",
      items: [
        { id: "profile", title: `母线高度 ${round(height)}`, summary: "先看平面图形里哪条边在提供高度。", accent: "#93c5fd" },
        { id: "axis", title: "旋转轴", summary: "绕轴旋转后，距离轴的最远处决定半径。", accent: "#fdba74" },
        { id: "solid", title: `半径 ${round(radius)}`, summary: "最终空间形体由“高度 + 半径”共同决定。", accent: "#86efac" },
      ],
    });
  },
};

const setsBasicsDemo: MixedDemo = {
  id: "sets-basics",
  title: "集合基础概念",
  description: "把元素、集合、属于与包含关系拆开，先稳住语言层面的理解。",
  defaultParams: { focus: "element" },
  presets: [
    { id: "element", label: "元素与属于", params: { focus: "element" } },
    { id: "subset", label: "子集关系", params: { focus: "subset" } },
  ],
  controls: {
    focus: {
      kind: "select",
      label: "观察重点",
      options: [
        { label: "元素与属于", value: "element" },
        { label: "子集关系", value: "subset" },
      ],
    },
  },
  explanation({ focus }) {
    return focus === "element"
      ? ["先分清“3 属于 A”是元素与集合的关系。", "不要把它误说成子集关系。"] 
      : ["A 包含 B，谈的是集合和集合之间的关系。", "子集关系和元素关系的主语层级不同。"];
  },
  renderStage({ focus }) {
    const items =
      focus === "element"
        ? [
            { id: "who", title: "对象层级", summary: "一个是元素，一个是集合。", accent: "#93c5fd" },
            { id: "symbol", title: "符号", summary: "常写作 x ∈ A。", accent: "#fdba74" },
            { id: "mistake", title: "易错点", summary: "别把单个元素说成子集。", accent: "#86efac" },
          ]
        : [
            { id: "who", title: "对象层级", summary: "两边都是集合。", accent: "#93c5fd" },
            { id: "symbol", title: "符号", summary: "常写作 B ⊆ A。", accent: "#fdba74" },
            { id: "mistake", title: "易错点", summary: "别把属于和包含混成一件事。", accent: "#86efac" },
          ];

    return createElement(ConceptBoard, {
      title: "集合语言板",
      items,
    });
  },
};

const setOperationsDemo: MixedDemo = {
  id: "set-operations",
  title: "集合运算与韦恩图",
  description: "把并集、交集、补集放回区域图里理解，而不是只看符号。",
  defaultParams: { operation: "intersection" },
  presets: [
    { id: "intersection", label: "交集", params: { operation: "intersection" } },
    { id: "union", label: "并集", params: { operation: "union" } },
    { id: "complement", label: "补集", params: { operation: "complement" } },
  ],
  controls: {
    operation: {
      kind: "select",
      label: "运算类型",
      options: [
        { label: "交集", value: "intersection" },
        { label: "并集", value: "union" },
        { label: "补集", value: "complement" },
      ],
    },
  },
  explanation({ operation }) {
    const map: Record<string, string[]> = {
      intersection: ["交集先看“共同拥有”的区域。", "它最适合帮学生建立“同时满足”的感觉。"],
      union: ["并集看“至少在一个集合里”的整体区域。", "不要误以为并集只看重叠部分。"],
      complement: ["补集必须先说清全集是谁。", "没有全集，补集就没有参照系。"],
    };

    return map[String(operation)];
  },
  renderStage({ operation }) {
    const boards: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      intersection: [
        { id: "region", title: "区域", summary: "A 与 B 重叠的中间部分。", accent: "#93c5fd" },
        { id: "logic", title: "逻辑词", summary: "同时满足。", accent: "#fdba74" },
        { id: "symbol", title: "符号", summary: "A ∩ B。", accent: "#86efac" },
      ],
      union: [
        { id: "region", title: "区域", summary: "A 和 B 覆盖到的全部范围。", accent: "#93c5fd" },
        { id: "logic", title: "逻辑词", summary: "至少满足一个。", accent: "#fdba74" },
        { id: "symbol", title: "符号", summary: "A ∪ B。", accent: "#86efac" },
      ],
      complement: [
        { id: "region", title: "区域", summary: "全集里除去 A 的部分。", accent: "#93c5fd" },
        { id: "logic", title: "逻辑词", summary: "不属于 A 但仍在全集中。", accent: "#fdba74" },
        { id: "symbol", title: "符号", summary: "C_U A 或 A 的补集。", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "集合运算板",
      items: boards[String(operation)],
    });
  },
};

const transformReviewDemo: NumericDemo = {
  id: "transform-review",
  title: "函数平移与伸缩总复习",
  description: "把平移和伸缩放到同一张图里，统一理解“先里后外”的观察顺序。",
  defaultParams: { shiftX: 0, shiftY: 0, scaleY: 1 },
  presets: [
    { id: "base", label: "原函数", params: { shiftX: 0, shiftY: 0, scaleY: 1 } },
    { id: "move", label: "右移上移", params: { shiftX: 2, shiftY: 1, scaleY: 1 } },
    { id: "stretch", label: "纵向拉伸", params: { shiftX: 0, shiftY: 0, scaleY: 2 } },
  ],
  controls: {
    shiftX: { label: "左右平移", min: -3, max: 3, step: 0.2 },
    shiftY: { label: "上下平移", min: -3, max: 3, step: 0.2 },
    scaleY: { label: "纵向伸缩", min: 0.5, max: 3, step: 0.1 },
  },
  explanation({ shiftX, shiftY, scaleY }) {
    return [
      `当前顶点从原点平移到 (${round(shiftX)}, ${round(shiftY)})。`,
      scaleY > 1 ? "纵向系数更大，图像更瘦更陡。" : "纵向系数较小，图像更舒展。",
      "观察顺序建议先看平移，再看伸缩。",
    ];
  },
  renderStage({ shiftX, shiftY, scaleY }) {
    const base = sampleCurve((x) => x * x, { xMin: -4, xMax: 4 }, 0.05);
    const transformed = sampleCurve(
      (x) => scaleY * (x - shiftX) * (x - shiftX) + shiftY,
      { xMin: -4, xMax: 4 },
      0.05,
    );

    return createElement(CartesianPlot, {
      ariaLabel: "函数变换图像",
      bounds: { xMin: -4, xMax: 4, yMin: -3, yMax: 10 },
      series: [
        { ...makeSeries("base", "原函数", "#94a3b8", base), strokeDasharray: "6 6" },
        makeSeries("transformed", "变换后", "#ea580c", transformed),
      ],
    });
  },
};

const sequencesBasicDemo: NumericDemo = {
  id: "sequences-basic",
  title: "等差与等比数列生成过程",
  description: "用前几项的生成结果，直观看出线性增长和倍数增长的差别。",
  defaultParams: { a1: 1, d: 2, q: 2, count: 6 },
  presets: [
    { id: "base", label: "基础对比", params: { a1: 1, d: 2, q: 2, count: 6 } },
    { id: "slow", label: "缓慢增长", params: { a1: 2, d: 1, q: 1.2, count: 6 } },
    { id: "decay", label: "等比衰减", params: { a1: 8, d: -1, q: 0.6, count: 6 } },
  ],
  controls: {
    a1: { label: "首项", min: 1, max: 8, step: 1 },
    d: { label: "公差", min: -3, max: 4, step: 1 },
    q: { label: "公比", min: 0.5, max: 3, step: 0.1 },
    count: { label: "项数", min: 4, max: 10, step: 1 },
  },
  explanation({ a1, d, q, count }) {
    const lastArithmetic = a1 + (count - 1) * d;
    const lastGeometric = a1 * q ** (count - 1);

    return [
      `第 ${count} 项的等差结果约为 ${round(lastArithmetic)}。`,
      `第 ${count} 项的等比结果约为 ${round(lastGeometric)}。`,
      q > 1 ? "等比数列会越来越体现倍数差。" : "当公比小于 1 时，等比数列会逐步衰减。",
    ];
  },
  renderStage({ a1, d, q, count }) {
    const arithmetic = Array.from({ length: count }, (_, index) => ({
      x: index + 1,
      y: a1 + index * d,
    }));
    const geometric = Array.from({ length: count }, (_, index) => ({
      x: index + 1,
      y: a1 * q ** index,
    }));

    return createElement(CartesianPlot, {
      ariaLabel: "等差与等比数列对比",
      bounds: { xMin: 1, xMax: Math.max(10, count), yMin: -5, yMax: 25 },
      series: [
        makeSeries("arithmetic", "等差数列", "#2563eb", arithmetic),
        makeSeries("geometric", "等比数列", "#ea580c", geometric),
      ],
    });
  },
};

const sequenceRecursiveDemo: NumericDemo = {
  id: "sequence-recursive",
  title: "递推数列生成过程",
  description: "把“后一项由前一项推出来”的过程直接展开，让学生形成生成感。",
  defaultParams: { a1: 2, factor: 1.2, offset: 1, count: 6 },
  presets: [
    { id: "grow", label: "稳步增长", params: { a1: 2, factor: 1.2, offset: 1, count: 6 } },
    { id: "stable", label: "缓慢变化", params: { a1: 4, factor: 0.8, offset: 1, count: 6 } },
  ],
  controls: {
    a1: { label: "首项 a1", min: 1, max: 8, step: 1 },
    factor: { label: "递推系数", min: 0.4, max: 1.8, step: 0.1 },
    offset: { label: "增量", min: -2, max: 3, step: 0.5 },
    count: { label: "项数", min: 4, max: 10, step: 1 },
  },
  explanation({ a1, factor, offset, count }) {
    const terms = [a1];
    for (let i = 1; i < count; i += 1) terms.push(factor * terms[i - 1] + offset);

    return [
      `当前最后一项约为 ${round(terms[terms.length - 1])}。`,
      factor > 1 ? "系数大于 1 时，前一项的影响会被放大。" : "系数小于 1 时，前一项的影响会逐步收缩。",
      "递推题最重要的是盯住“上一项怎样影响下一项”。",
    ];
  },
  renderStage({ a1, factor, offset, count }) {
    const terms = [a1];
    for (let i = 1; i < count; i += 1) terms.push(factor * terms[i - 1] + offset);
    const points = terms.map((value, index) => ({ x: index + 1, y: value }));

    return createElement(CartesianPlot, {
      ariaLabel: "递推数列图像",
      bounds: { xMin: 1, xMax: Math.max(10, count), yMin: -5, yMax: 30 },
      series: [makeSeries("recursive", "递推结果", "#0f766e", points)],
    });
  },
};

const circleStandardDemo: NumericDemo = {
  id: "circle-standard",
  title: "圆的标准方程",
  description: "通过圆心和平移、半径变化，把标准方程和图像一一对应起来。",
  defaultParams: { h: 0, k: 0, r: 3 },
  presets: [
    { id: "base", label: "标准圆", params: { h: 0, k: 0, r: 3 } },
    { id: "move", label: "圆心平移", params: { h: 2, k: 1, r: 2.5 } },
  ],
  controls: {
    h: { label: "圆心 x", min: -3, max: 3, step: 0.2 },
    k: { label: "圆心 y", min: -3, max: 3, step: 0.2 },
    r: { label: "半径 r", min: 1, max: 5, step: 0.1 },
  },
  explanation({ h, k, r }) {
    return [
      `圆心是 (${round(h)}, ${round(k)})。`,
      `半径是 ${round(r)}。`,
      "标准方程里，圆心决定位置，半径决定大小。",
    ];
  },
  renderStage({ h, k, r }) {
    const points = Array.from({ length: 161 }, (_, index) => {
      const angle = (index / 160) * Math.PI * 2;
      return { x: h + r * Math.cos(angle), y: k + r * Math.sin(angle) };
    });

    return createElement(CartesianPlot, {
      ariaLabel: "圆的标准方程图像",
      bounds: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
      series: [makeSeries("circle", "(x-h)^2 + (y-k)^2 = r^2", "#2563eb", points)],
      markers: [{ id: "center", x: h, y: k, label: "圆心" }],
    });
  },
};

const uniformMotionDemo: NumericDemo = {
  id: "physics-uniform-motion",
  title: "匀速直线运动",
  description: "把位置、初始位置和速度都放到 s-t 图像里观察。",
  defaultParams: { s0: 0, v: 2, t: 3 },
  presets: [
    { id: "basic", label: "基础模型", params: { s0: 0, v: 2, t: 3 } },
    { id: "shift", label: "改变起点", params: { s0: 4, v: 2, t: 3 } },
    { id: "reverse", label: "反向运动", params: { s0: 2, v: -1.5, t: 3 } },
  ],
  controls: {
    s0: { label: "初始位置 s0", min: -5, max: 8, step: 0.5 },
    v: { label: "速度 v", min: -4, max: 4, step: 0.2 },
    t: { label: "观察时刻 t", min: 0, max: 6, step: 0.2 },
  },
  explanation({ s0, v, t }) {
    const s = s0 + v * t;

    return [
      `位置公式是 s = ${round(s0)} + ${round(v)}t。`,
      `当前时刻 t = ${round(t)} 时，位置约为 ${round(s)}。`,
      "只改 s0 会整体平移直线，只改 v 会改变斜率。",
    ];
  },
  renderStage({ s0, v, t }) {
    const line = sampleCurve((time) => s0 + v * time, { xMin: 0, xMax: 6 }, 0.1);

    return createElement(CartesianPlot, {
      ariaLabel: "匀速直线运动图像",
      bounds: { xMin: 0, xMax: 6, yMin: -10, yMax: 15 },
      series: [makeSeries("motion", "s-t 图像", "#2563eb", line)],
      markers: [{ id: "current", x: t, y: s0 + v * t, label: "当前点", color: "#ea580c" }],
    });
  },
};

const acceleratedMotionDemo: NumericDemo = {
  id: "physics-accelerated-motion",
  title: "匀变速直线运动",
  description: "同时看位置曲线和速度变化，避免把匀变速误看成匀速。",
  defaultParams: { s0: 0, v0: 1, a: 1, t: 3 },
  presets: [
    { id: "basic", label: "基础加速", params: { s0: 0, v0: 1, a: 1, t: 3 } },
    { id: "decelerate", label: "减速模型", params: { s0: 0, v0: 4, a: -1, t: 2 } },
  ],
  controls: {
    s0: { label: "初始位置 s0", min: -4, max: 4, step: 0.5 },
    v0: { label: "初速度 v0", min: -4, max: 6, step: 0.2 },
    a: { label: "加速度 a", min: -3, max: 3, step: 0.2 },
    t: { label: "观察时刻 t", min: 0, max: 6, step: 0.2 },
  },
  explanation({ s0, v0, a, t }) {
    const s = s0 + v0 * t + 0.5 * a * t * t;
    const v = v0 + a * t;

    return [
      `当前速度 v = ${round(v)}，所以“快慢”本身正在变化。`,
      `位置约为 ${round(s)}，这也是图像不再是直线而是弯曲的原因。`,
      a > 0 ? "加速度为正，速度整体增加。" : a < 0 ? "加速度为负，速度整体减小。" : "a = 0 时会退化成匀速运动。",
    ];
  },
  renderStage({ s0, v0, a, t }) {
    const line = sampleCurve((time) => s0 + v0 * time + 0.5 * a * time * time, { xMin: 0, xMax: 6 }, 0.1);

    return createElement(CartesianPlot, {
      ariaLabel: "匀变速直线运动图像",
      bounds: { xMin: 0, xMax: 6, yMin: -10, yMax: 30 },
      series: [makeSeries("accelerated", "s-t 曲线", "#0f766e", line)],
      markers: [{ id: "current", x: t, y: s0 + v0 * t + 0.5 * a * t * t, label: "当前点", color: "#ea580c" }],
    });
  },
};

const projectileDemo: NumericDemo = {
  id: "physics-projectile-motion",
  title: "平抛运动",
  description: "让孩子在一张图里同时看到水平匀速、竖直下落和合成轨迹。",
  defaultParams: { v0x: 6, h0: 18, g: 10, t: 1.2 },
  presets: [
    { id: "basic", label: "基础平抛", params: { v0x: 6, h0: 18, g: 10, t: 1.2 } },
    { id: "high", label: "高台平抛", params: { v0x: 5, h0: 30, g: 9.8, t: 1.6 } },
    { id: "fast", label: "更快抛出", params: { v0x: 10, h0: 18, g: 10, t: 1.1 } },
  ],
  controls: {
    v0x: { label: "水平初速度", min: 2, max: 12, step: 0.2 },
    h0: { label: "初始高度", min: 5, max: 36, step: 1 },
    g: { label: "重力加速度", min: 6, max: 12, step: 0.1 },
    t: { label: "观察时刻", min: 0, max: 3, step: 0.05 },
  },
  explanation({ v0x, h0, g, t }) {
    const x = v0x * t;
    const y = h0 - 0.5 * g * t * t;

    return [
      `水平位移 x = v0x * t，所以当前约为 ${round(x)}。`,
      `竖直高度 y = h0 - 1/2gt^2，所以当前约为 ${round(y)}。`,
      "真正要建立的不是一条总公式，而是“两个方向分别发生什么”。",
    ];
  },
  renderStage({ v0x, h0, g, t }) {
    const flight = Math.sqrt((2 * h0) / g);
    const points = sampleCurve(
      (time) => h0 - 0.5 * g * time * time,
      { xMin: 0, xMax: Math.max(flight, 0.4) },
      0.03,
    ).map((point) => ({ x: v0x * point.x, y: Math.max(point.y, 0) }));

    return createElement(CartesianPlot, {
      ariaLabel: "平抛运动轨迹",
      bounds: { xMin: 0, xMax: Math.max(16, v0x * flight + 2), yMin: 0, yMax: Math.max(24, h0 + 2) },
      series: [makeSeries("projectile", "平抛轨迹", "#ea580c", points)],
      markers: [{ id: "current", x: v0x * t, y: Math.max(h0 - 0.5 * g * t * t, 0), label: "当前点", color: "#2563eb" }],
    });
  },
};

const forceCompositionDemo: NumericDemo = {
  id: "physics-force-composition",
  title: "力的合成",
  description: "把两个分力和合力摆成一张平行四边形示意图。",
  defaultParams: { f1: 4, f2: 3, angle: 60 },
  presets: [
    { id: "right", label: "直角分力", params: { f1: 4, f2: 3, angle: 90 } },
    { id: "acute", label: "锐角夹角", params: { f1: 4, f2: 3, angle: 45 } },
    { id: "obtuse", label: "钝角夹角", params: { f1: 4, f2: 5, angle: 120 } },
  ],
  controls: {
    f1: { label: "力 F1", min: 1, max: 8, step: 0.2 },
    f2: { label: "力 F2", min: 1, max: 8, step: 0.2 },
    angle: { label: "夹角", min: 10, max: 170, step: 5 },
  },
  explanation({ f1, f2, angle }) {
    const radians = (angle * Math.PI) / 180;
    const result = Math.sqrt(f1 * f1 + f2 * f2 + 2 * f1 * f2 * Math.cos(radians));

    return [
      `当前合力大小约为 ${round(result)}。`,
      angle < 90 ? "夹角越小，两个力方向越接近，合力越大。" : "夹角变钝后，彼此抵消更多，合力会减小。",
      "平行四边形法真正帮孩子理解的是“方向共同决定结果”，不是只背公式。",
    ];
  },
  renderStage({ f1, f2, angle }) {
    const radians = (angle * Math.PI) / 180;
    const end2 = { x: f2 * Math.cos(radians), y: f2 * Math.sin(radians) };
    const result = { x: f1 + end2.x, y: end2.y };

    return createElement(CartesianPlot, {
      ariaLabel: "力的合成示意图",
      bounds: { xMin: -1, xMax: 10, yMin: -1, yMax: 8 },
      series: [
        makeSeries("f1", "F1", "#ea580c", [{ x: 0, y: 0 }, { x: f1, y: 0 }]),
        makeSeries("f2", "F2", "#2563eb", [{ x: 0, y: 0 }, end2]),
        makeSeries("result", "合力", "#0f766e", [{ x: 0, y: 0 }, result]),
      ],
      markers: [{ id: "end", x: result.x, y: result.y, label: "R" }],
    });
  },
};

const newtonSecondLawDemo: NumericDemo = {
  id: "physics-newton-second-law",
  title: "牛顿第二定律",
  description: "把合力、质量和加速度的关系压缩成一个可拖动的比例模型。",
  defaultParams: { force: 6, mass: 2 },
  presets: [
    { id: "base", label: "基础情况", params: { force: 6, mass: 2 } },
    { id: "heavy", label: "质量更大", params: { force: 6, mass: 4 } },
    { id: "strong", label: "合力更大", params: { force: 10, mass: 2 } },
  ],
  controls: {
    force: { label: "合力 F", min: 1, max: 12, step: 0.5 },
    mass: { label: "质量 m", min: 0.5, max: 6, step: 0.5 },
  },
  explanation({ force, mass }) {
    const acceleration = force / mass;

    return [
      `当前加速度 a = F / m = ${round(acceleration)}。`,
      "保持质量不变时，合力越大，加速度越大。",
      "保持合力不变时，质量越大，加速度越小，这就是“推得动和推得快”之间的差别。",
    ];
  },
  renderStage({ force, mass }) {
    const acceleration = force / mass;

    return createElement(ConceptBoard, {
      title: "F-m-a 关系板",
      items: [
        { id: "force", title: `合力 F = ${round(force)}`, summary: "外界推动或拉动的总效果。", accent: "#fdba74" },
        { id: "mass", title: `质量 m = ${round(mass)}`, summary: "惯性大小，决定同样受力时是否容易改变运动状态。", accent: "#93c5fd" },
        { id: "acc", title: `加速度 a = ${round(acceleration)}`, summary: "真正被观察到的“快慢变化率”。", accent: "#86efac" },
      ],
    });
  },
};

const workEnergyDemo: NumericDemo = {
  id: "physics-work-energy-synthesis",
  title: "功能关系综合",
  description: "把初始动能、外力做功和末动能放到同一块能量板上。",
  defaultParams: { mass: 2, v0: 2, work: 12 },
  presets: [
    { id: "gain", label: "做正功", params: { mass: 2, v0: 2, work: 12 } },
    { id: "loss", label: "做负功", params: { mass: 2, v0: 4, work: -8 } },
  ],
  controls: {
    mass: { label: "质量 m", min: 1, max: 5, step: 0.5 },
    v0: { label: "初速度 v0", min: 0, max: 6, step: 0.5 },
    work: { label: "合外力做功 W", min: -12, max: 20, step: 1 },
  },
  explanation({ mass, v0, work }) {
    const initial = 0.5 * mass * v0 * v0;
    const final = initial + work;
    const finalSpeed = final > 0 ? Math.sqrt((2 * final) / mass) : 0;

    return [
      `初始动能约为 ${round(initial)}，末动能约为 ${round(final)}。`,
      work >= 0 ? "做正功时，能量被补进去，速度通常会上升。" : "做负功时，机械能被耗掉，速度会下降。",
      `如果继续换算，当前末速度约为 ${round(finalSpeed)}。`,
    ];
  },
  renderStage({ mass, v0, work }) {
    const initial = 0.5 * mass * v0 * v0;
    const final = initial + work;

    return createElement(ConceptBoard, {
      title: "功能关系能量板",
      items: [
        { id: "initial", title: `初始动能 ${round(initial)}`, summary: "由质量和初速度共同决定。", accent: "#93c5fd" },
        { id: "work", title: `外力做功 ${round(work)}`, summary: "它负责把能量加进来或带走。", accent: "#fdba74" },
        { id: "final", title: `末动能 ${round(final)}`, summary: "最终状态由“原来有多少 + 外界做了多少功”共同决定。", accent: "#86efac" },
      ],
    });
  },
};

const uniformChaseDemo: NumericDemo = {
  id: "physics-uniform-chase",
  title: "两车匀速追及",
  description: "把两辆车的位置曲线放在一起，看追及发生在什么时候。",
  defaultParams: { lead: 10, vA: 4, vB: 6, t: 3 },
  presets: [
    { id: "catch", label: "可以追上", params: { lead: 10, vA: 4, vB: 6, t: 3 } },
    { id: "hard", label: "更难追上", params: { lead: 14, vA: 5, vB: 6, t: 3 } },
  ],
  controls: {
    lead: { label: "初始距离", min: 4, max: 20, step: 1 },
    vA: { label: "前车速度", min: 2, max: 8, step: 0.2 },
    vB: { label: "后车速度", min: 2, max: 10, step: 0.2 },
    t: { label: "观察时刻", min: 0, max: 8, step: 0.2 },
  },
  explanation({ lead, vA, vB, t }) {
    const posA = lead + vA * t;
    const posB = vB * t;
    const meetTime = vB > vA ? lead / (vB - vA) : Infinity;
    return [
      `当前前车位置约为 ${round(posA)}，后车位置约为 ${round(posB)}。`,
      Number.isFinite(meetTime) ? `理论追及时刻约为 ${round(meetTime)}。` : "后车速度不更大时，本模型下追不上。",
      "追及题最关键的是盯“相对速度”而不是只看两个速度本身。",
    ];
  },
  renderStage({ lead, vA, vB, t }) {
    const carA = sampleCurve((time) => lead + vA * time, { xMin: 0, xMax: 8 }, 0.1);
    const carB = sampleCurve((time) => vB * time, { xMin: 0, xMax: 8 }, 0.1);
    return createElement(CartesianPlot, {
      ariaLabel: "匀速追及图像",
      bounds: { xMin: 0, xMax: 8, yMin: 0, yMax: 60 },
      series: [
        makeSeries("a", "前车", "#2563eb", carA),
        makeSeries("b", "后车", "#ea580c", carB),
      ],
      markers: [
        { id: "ta", x: t, y: lead + vA * t, label: "A" },
        { id: "tb", x: t, y: vB * t, label: "B", color: "#ea580c" },
      ],
    });
  },
};

const mixedChaseDemo: NumericDemo = {
  id: "physics-mixed-chase",
  title: "匀速与匀变速追及",
  description: "把一条直线和一条弯曲位置图放在一起，看追及为什么会多出临界时刻。",
  defaultParams: { lead: 12, vA: 4, v0B: 1, aB: 1.2, t: 4 },
  presets: [
    { id: "grow", label: "后车逐渐追上", params: { lead: 12, vA: 4, v0B: 1, aB: 1.2, t: 4 } },
    { id: "slow", label: "加速度偏小", params: { lead: 12, vA: 4, v0B: 1.5, aB: 0.6, t: 4 } },
  ],
  controls: {
    lead: { label: "初始距离", min: 6, max: 20, step: 1 },
    vA: { label: "前车速度", min: 2, max: 8, step: 0.2 },
    v0B: { label: "后车初速", min: 0, max: 6, step: 0.2 },
    aB: { label: "后车加速度", min: 0.2, max: 2.5, step: 0.1 },
    t: { label: "观察时刻", min: 0, max: 8, step: 0.2 },
  },
  explanation({ lead, vA, v0B, aB, t }) {
    const posA = lead + vA * t;
    const posB = v0B * t + 0.5 * aB * t * t;
    return [
      `当前前车位置约为 ${round(posA)}，后车位置约为 ${round(posB)}。`,
      "后车位置曲线会弯起来，因为它的速度还在继续变化。",
      "这类追及题往往要先找“什么时候追上”，再看是否满足最值或临界条件。",
    ];
  },
  renderStage({ lead, vA, v0B, aB, t }) {
    const carA = sampleCurve((time) => lead + vA * time, { xMin: 0, xMax: 8 }, 0.1);
    const carB = sampleCurve((time) => v0B * time + 0.5 * aB * time * time, { xMin: 0, xMax: 8 }, 0.1);
    return createElement(CartesianPlot, {
      ariaLabel: "匀速与匀变速追及图像",
      bounds: { xMin: 0, xMax: 8, yMin: 0, yMax: 70 },
      series: [
        makeSeries("a", "前车", "#2563eb", carA),
        makeSeries("b", "后车", "#ea580c", carB),
      ],
      markers: [
        { id: "ta", x: t, y: lead + vA * t, label: "A" },
        { id: "tb", x: t, y: v0B * t + 0.5 * aB * t * t, label: "B", color: "#ea580c" },
      ],
    });
  },
};

const freeFallDemo: NumericDemo = {
  id: "physics-free-fall",
  title: "自由落体",
  description: "把速度和高度的变化拉回同一个过程，帮助学生看懂“同样是加速下落”。",
  defaultParams: { h0: 20, g: 10, t: 1.5 },
  presets: [
    { id: "base", label: "基础自由落体", params: { h0: 20, g: 10, t: 1.5 } },
    { id: "high", label: "更高起点", params: { h0: 35, g: 9.8, t: 2 } },
  ],
  controls: {
    h0: { label: "初始高度", min: 10, max: 40, step: 1 },
    g: { label: "重力加速度", min: 6, max: 12, step: 0.1 },
    t: { label: "观察时刻", min: 0, max: 3, step: 0.1 },
  },
  explanation({ h0, g, t }) {
    const h = h0 - 0.5 * g * t * t;
    const v = g * t;
    return [
      `当前高度约为 ${round(Math.max(h, 0))}，速度约为 ${round(v)}。`,
      "自由落体不是“速度固定地下落”，而是速度一直在增加。",
      "它可以看成初速度为 0 的匀变速直线运动。",
    ];
  },
  renderStage({ h0, g, t }) {
    const fall = sampleCurve((time) => h0 - 0.5 * g * time * time, { xMin: 0, xMax: Math.sqrt((2 * h0) / g) }, 0.05);
    return createElement(CartesianPlot, {
      ariaLabel: "自由落体图像",
      bounds: { xMin: 0, xMax: 3, yMin: 0, yMax: Math.max(40, h0 + 5) },
      series: [makeSeries("fall", "高度-时间", "#0f766e", fall)],
      markers: [{ id: "current", x: t, y: Math.max(h0 - 0.5 * g * t * t, 0), label: "当前点" }],
    });
  },
};

const motionGraphsDemo: MixedDemo = {
  id: "physics-motion-graphs",
  title: "运动图像综合判读",
  description: "先问图像横纵轴各代表什么，再谈斜率、面积和运动状态。",
  defaultParams: { graph: "st" },
  presets: [
    { id: "st", label: "位移-时间图", params: { graph: "st" } },
    { id: "vt", label: "速度-时间图", params: { graph: "vt" } },
  ],
  controls: {
    graph: {
      kind: "select",
      label: "图像类型",
      options: [
        { label: "位移-时间图", value: "st" },
        { label: "速度-时间图", value: "vt" },
      ],
    },
  },
  explanation({ graph }) {
    return graph === "st"
      ? ["s-t 图里斜率代表速度。", "图像本身不是轨迹，而是位置随时间怎样变。"] 
      : ["v-t 图里斜率代表加速度。", "v-t 图下面的面积代表位移。"];
  },
  renderStage({ graph }) {
    return createBoard("运动图像判读板", graph === "st"
      ? [
          { id: "axis", title: "坐标含义", summary: "横轴时间，纵轴位移。", accent: "#93c5fd" },
          { id: "slope", title: "斜率", summary: "斜率 = 速度。", accent: "#fdba74" },
          { id: "pitfall", title: "易错点", summary: "不要把图线形状误看成真实轨迹。", accent: "#86efac" },
        ]
      : [
          { id: "axis", title: "坐标含义", summary: "横轴时间，纵轴速度。", accent: "#93c5fd" },
          { id: "slope", title: "斜率", summary: "斜率 = 加速度。", accent: "#fdba74" },
          { id: "area", title: "面积", summary: "图像下面的面积 = 位移。", accent: "#86efac" },
        ]);
  },
};

const forceBalanceDemo: NumericDemo = {
  id: "physics-force-balance",
  title: "共点力平衡",
  description: "把四个方向的受力摆在同一个坐标里，直接看见“水平平衡 + 竖直平衡 = 合力为零”。",
  defaultParams: { right: 4, left: 4, up: 3, down: 3 },
  presets: [
    { id: "balanced", label: "完全平衡", params: { right: 4, left: 4, up: 3, down: 3 } },
    { id: "right-heavy", label: "向右失衡", params: { right: 5.5, left: 3, up: 3, down: 3 } },
    { id: "down-heavy", label: "向下失衡", params: { right: 4, left: 4, up: 2, down: 4.5 } },
  ],
  controls: {
    right: { label: "向右拉力", min: 0, max: 8, step: 0.5 },
    left: { label: "向左拉力", min: 0, max: 8, step: 0.5 },
    up: { label: "向上支持力", min: 0, max: 8, step: 0.5 },
    down: { label: "向下重力", min: 0, max: 8, step: 0.5 },
  },
  explanation({ right, left, up, down }) {
    const rx = round(right - left);
    const ry = round(up - down);
    const resultant = round(Math.sqrt(rx * rx + ry * ry));

    return [
      `当前水平合力约为 ${rx}，竖直合力约为 ${ry}。`,
      resultant === 0
        ? "两个方向都抵消后，合力为零，这才是真正的平衡。"
        : `当前合力大小约为 ${resultant}，说明受力还没有完全抵消。`,
      "平衡不是“没有力”，而是每个方向上的矢量和都被抵消了。",
    ];
  },
  renderStage({ right, left, up, down }) {
    const resultant = {
      x: round(right - left),
      y: round(up - down),
    };

    return createElement(CartesianPlot, {
      ariaLabel: "共点力平衡图",
      bounds: { xMin: -8, xMax: 8, yMin: -8, yMax: 8 },
      series: [
        makeSeries("right", "向右力", "#ea580c", [{ x: 0, y: 0 }, { x: right, y: 0 }]),
        makeSeries("left", "向左力", "#2563eb", [{ x: 0, y: 0 }, { x: -left, y: 0 }]),
        makeSeries("up", "向上力", "#0f766e", [{ x: 0, y: 0 }, { x: 0, y: up }]),
        makeSeries("down", "向下力", "#7c3aed", [{ x: 0, y: 0 }, { x: 0, y: -down }]),
        makeSeries("resultant", "合力", "#0f172a", [{ x: 0, y: 0 }, resultant]),
      ],
      markers: [
        { id: "center", x: 0, y: 0, label: "受力点" },
        { id: "result-end", x: resultant.x, y: resultant.y, label: "R", color: "#0f172a" },
      ],
    });
  },
};

const frictionDemo: MixedDemo = {
  id: "physics-friction",
  title: "摩擦力与临界状态",
  description: "先分清静摩擦与滑动摩擦，再理解“刚要动”的临界意义。",
  defaultParams: { mode: "static" },
  presets: [
    { id: "static", label: "静摩擦", params: { mode: "static" } },
    { id: "sliding", label: "滑动摩擦", params: { mode: "sliding" } },
  ],
  controls: {
    mode: {
      kind: "select",
      label: "摩擦类型",
      options: [
        { label: "静摩擦", value: "static" },
        { label: "滑动摩擦", value: "sliding" },
      ],
    },
  },
  explanation({ mode }) {
    return mode === "static"
      ? ["静摩擦会随外力调节，在最大静摩擦前不一定等于 μN。", "临界状态是“刚要动”而还没动。"] 
      : ["滑动摩擦出现在已经发生相对滑动后。", "这时大小通常按 μN 处理。"];
  },
  renderStage({ mode }) {
    return createBoard("摩擦力判断板", mode === "static"
      ? [
          { id: "state", title: "状态", summary: "物体还没相对滑动。", accent: "#93c5fd" },
          { id: "size", title: "大小", summary: "会随外力变化，直到最大静摩擦。", accent: "#fdba74" },
          { id: "critical", title: "临界", summary: "刚要动时最值得单独分析。", accent: "#86efac" },
        ]
      : [
          { id: "state", title: "状态", summary: "已经发生相对滑动。", accent: "#93c5fd" },
          { id: "size", title: "大小", summary: "常按 μN 求解。", accent: "#fdba74" },
          { id: "direction", title: "方向", summary: "总是阻碍相对运动方向。", accent: "#86efac" },
        ]);
  },
};

const inclineMotionDemo: MixedDemo = {
  id: "physics-incline-motion",
  title: "斜面受力与运动",
  description: "把重力分解、支持力和摩擦力放回斜面坐标里，减少乱分解。",
  defaultParams: { focus: "decompose" },
  presets: [
    { id: "decompose", label: "重力分解", params: { focus: "decompose" } },
    { id: "motion", label: "沿斜面运动", params: { focus: "motion" } },
  ],
  controls: {
    focus: {
      kind: "select",
      label: "观察重点",
      options: [
        { label: "重力分解", value: "decompose" },
        { label: "沿斜面运动", value: "motion" },
      ],
    },
  },
  explanation({ focus }) {
    return focus === "decompose"
      ? ["最稳的分解方式是沿斜面和垂直斜面。", "这样支持力和运动方程都会更清楚。"] 
      : ["沿斜面方向决定加速度，垂直斜面方向常用来求支持力。", "两条方向不要混在一起列式。"];
  },
  renderStage({ focus }) {
    return createBoard("斜面分析板", focus === "decompose"
      ? [
          { id: "axis", title: "坐标选择", summary: "沿斜面 / 垂直斜面。", accent: "#93c5fd" },
          { id: "gravity", title: "重力分解", summary: "分成沿斜面分力和垂直分力。", accent: "#fdba74" },
          { id: "benefit", title: "好处", summary: "支持力和运动分析更直观。", accent: "#86efac" },
        ]
      : [
          { id: "along", title: "沿斜面", summary: "决定是否上滑、下滑和加速度大小。", accent: "#93c5fd" },
          { id: "normal", title: "垂直斜面", summary: "常用于求支持力。", accent: "#fdba74" },
          { id: "trap", title: "易错点", summary: "别把分力方向写反。", accent: "#86efac" },
        ]);
  },
};

const connectedBodiesDemo: MixedDemo = {
  id: "physics-connected-bodies",
  title: "连接体受力与整体隔离",
  description: "整体法和隔离法切换，是连接体题最关键的思维步骤。",
  defaultParams: { method: "whole" },
  presets: [
    { id: "whole", label: "整体法", params: { method: "whole" } },
    { id: "separate", label: "隔离法", params: { method: "separate" } },
  ],
  controls: {
    method: {
      kind: "select",
      label: "分析方法",
      options: [
        { label: "整体法", value: "whole" },
        { label: "隔离法", value: "separate" },
      ],
    },
  },
  explanation({ method }) {
    return method === "whole"
      ? ["整体法先把内部拉力、支持力等内力先隐藏。", "适合先求共同加速度。"] 
      : ["隔离法在已知整体结果后，适合回头求绳力或接触力。", "顺序常是先整体、再隔离。"];
  },
  renderStage({ method }) {
    return createBoard("连接体分析板", method === "whole"
      ? [
          { id: "object", title: "对象", summary: "把多个物体视为一个整体。", accent: "#93c5fd" },
          { id: "benefit", title: "好处", summary: "内力不必先算。", accent: "#fdba74" },
          { id: "use", title: "适合求", summary: "整体加速度。", accent: "#86efac" },
        ]
      : [
          { id: "object", title: "对象", summary: "把某一个物体单独拿出来。", accent: "#93c5fd" },
          { id: "benefit", title: "好处", summary: "能求绳力、支持力等内部量。", accent: "#fdba74" },
          { id: "use", title: "适合求", summary: "局部相互作用力。", accent: "#86efac" },
        ]);
  },
};

const overweightWeightlessnessDemo: MixedDemo = {
  id: "physics-overweight-weightlessness",
  title: "超重与失重",
  description: "把支持力变化和加速度方向连起来，看清“感觉变重/变轻”的来源。",
  defaultParams: { state: "overweight" },
  presets: [
    { id: "overweight", label: "超重", params: { state: "overweight" } },
    { id: "weightless", label: "失重", params: { state: "weightless" } },
  ],
  controls: {
    state: {
      kind: "select",
      label: "状态",
      options: [
        { label: "超重", value: "overweight" },
        { label: "失重", value: "weightless" },
      ],
    },
  },
  explanation({ state }) {
    return state === "overweight"
      ? ["超重时支持力大于重力。", "常见于加速度方向向上。"] 
      : ["失重时支持力小于重力，完全失重时支持力为零。", "常见于加速度方向向下。"];
  },
  renderStage({ state }) {
    return createBoard("超重失重判断板", state === "overweight"
      ? [
          { id: "force", title: "支持力", summary: "大于重力。", accent: "#93c5fd" },
          { id: "acc", title: "加速度方向", summary: "通常向上。", accent: "#fdba74" },
          { id: "feeling", title: "体验", summary: "感觉更重。", accent: "#86efac" },
        ]
      : [
          { id: "force", title: "支持力", summary: "小于重力，极端时可为零。", accent: "#93c5fd" },
          { id: "acc", title: "加速度方向", summary: "通常向下。", accent: "#fdba74" },
          { id: "feeling", title: "体验", summary: "感觉更轻或无重感。", accent: "#86efac" },
        ]);
  },
};

const workPowerDemo: NumericDemo = {
  id: "physics-work-power",
  title: "功与功率",
  description: "把做功多少和做功快慢分开看，减少把功和功率混在一起。",
  defaultParams: { force: 10, distance: 5, time: 2 },
  presets: [
    { id: "base", label: "基础情形", params: { force: 10, distance: 5, time: 2 } },
    { id: "fast", label: "更快完成", params: { force: 10, distance: 5, time: 1 } },
  ],
  controls: {
    force: { label: "力 F", min: 2, max: 20, step: 1 },
    distance: { label: "位移 s", min: 1, max: 10, step: 0.5 },
    time: { label: "时间 t", min: 0.5, max: 6, step: 0.5 },
  },
  explanation({ force, distance, time }) {
    const work = force * distance;
    const power = work / time;
    return [
      `当前做功约为 ${round(work)}。`,
      `当前平均功率约为 ${round(power)}。`,
      "功是“总量”，功率是“做得有多快”。",
    ];
  },
  renderStage({ force, distance, time }) {
    const work = force * distance;
    const power = work / time;
    return createBoard("功与功率关系板", [
      { id: "work", title: `功 W = ${round(work)}`, summary: "反映总共转移了多少能量。", accent: "#93c5fd" },
      { id: "time", title: `时间 t = ${round(time)}`, summary: "决定完成这些功用了多久。", accent: "#fdba74" },
      { id: "power", title: `功率 P = ${round(power)}`, summary: "反映做功快慢。", accent: "#86efac" },
    ]);
  },
};

const kineticEnergyDemo: NumericDemo = {
  id: "physics-kinetic-energy",
  title: "动能定理",
  description: "把合外力做功和速度变化直接连起来，看懂为什么它能跨过程求解。",
  defaultParams: { mass: 2, v0: 2, work: 12 },
  presets: [
    { id: "gain", label: "做正功", params: { mass: 2, v0: 2, work: 12 } },
    { id: "loss", label: "做负功", params: { mass: 2, v0: 4, work: -6 } },
  ],
  controls: {
    mass: { label: "质量 m", min: 1, max: 5, step: 0.5 },
    v0: { label: "初速度", min: 0, max: 6, step: 0.5 },
    work: { label: "合外力做功", min: -10, max: 20, step: 1 },
  },
  explanation({ mass, v0, work }) {
    const ek0 = 0.5 * mass * v0 * v0;
    const ek1 = ek0 + work;
    return [
      `初始动能约为 ${round(ek0)}，末动能约为 ${round(ek1)}。`,
      work >= 0 ? "做正功会增加动能。" : "做负功会减少动能。",
      "动能定理最适合跨越中间复杂受力过程。",
    ];
  },
  renderStage({ mass, v0, work }) {
    const ek0 = 0.5 * mass * v0 * v0;
    const ek1 = ek0 + work;
    return createBoard("动能定理板", [
      { id: "start", title: `初动能 ${round(ek0)}`, summary: "由质量和初速度决定。", accent: "#93c5fd" },
      { id: "work", title: `合外力做功 ${round(work)}`, summary: "它决定动能改变量。", accent: "#fdba74" },
      { id: "end", title: `末动能 ${round(ek1)}`, summary: "结果由“原来有多少 + 做功多少”得到。", accent: "#86efac" },
    ]);
  },
};

const mechanicalEnergyDemo: MixedDemo = {
  id: "physics-mechanical-energy",
  title: "机械能守恒",
  description: "把动能和势能之间的转化看成“内部换账”，而不是能量凭空增减。",
  defaultParams: { scene: "freefall" },
  presets: [
    { id: "freefall", label: "自由下落", params: { scene: "freefall" } },
    { id: "swing", label: "摆动/滑动", params: { scene: "swing" } },
  ],
  controls: {
    scene: {
      kind: "select",
      label: "观察场景",
      options: [
        { label: "自由下落", value: "freefall" },
        { label: "摆动/滑动", value: "swing" },
      ],
    },
  },
  explanation({ scene }) {
    return scene === "freefall"
      ? ["下降时重力势能减小，动能增大。", "如果只有重力做功，机械能总量保持不变。"] 
      : ["上升与下降本质上仍是动能和势能互相转化。", "关键先确认有没有非保守力做功。"];
  },
  renderStage({ scene }) {
    return createBoard("机械能守恒板", scene === "freefall"
      ? [
          { id: "potential", title: "重力势能", summary: "高度下降时减小。", accent: "#93c5fd" },
          { id: "kinetic", title: "动能", summary: "速度增大时增加。", accent: "#fdba74" },
          { id: "total", title: "机械能总量", summary: "若仅重力做功则保持不变。", accent: "#86efac" },
        ]
      : [
          { id: "check", title: "先检查", summary: "是否只有保守力做功。", accent: "#93c5fd" },
          { id: "convert", title: "再判断", summary: "动能与势能如何互相转换。", accent: "#fdba74" },
          { id: "trap", title: "易错点", summary: "有摩擦时通常不能直接套守恒。", accent: "#86efac" },
        ]);
  },
};

const seriesParallelDemo: CircuitDemo = {
  id: "physics-series-parallel",
  title: "串联与并联电路",
  description: "先把电路结构画出来，再从结构上读出电流、电压和总电阻的分配规律。",
  defaultParams: { circuit: "series", voltage: 12, r1: 2, r2: 4 },
  presets: [
    { id: "series", label: "串联", params: { circuit: "series", voltage: 12, r1: 2, r2: 4 } },
    { id: "parallel", label: "并联", params: { circuit: "parallel", voltage: 12, r1: 2, r2: 4 } },
  ],
  controls: {
    circuit: {
      kind: "select",
      label: "电路结构",
      options: [
        { label: "串联", value: "series" },
        { label: "并联", value: "parallel" },
      ],
    },
    voltage: { label: "总电压 U", min: 3, max: 24, step: 1 },
    r1: { label: "电阻 R1", min: 1, max: 8, step: 0.5 },
    r2: { label: "电阻 R2", min: 1, max: 8, step: 0.5 },
  },
  explanation({ circuit, voltage, r1, r2 }) {
    if (circuit === "series") {
      const current = voltage / (r1 + r2);
      const u1 = current * r1;
      const u2 = current * r2;

      return [
        `串联时只有一条通路，电流约为 ${round(current)}。`,
        `当前两个电阻上的分压约为 U1 = ${round(u1)}、U2 = ${round(u2)}。`,
        "先抓“一条路”这个结构，再记“电流相等、分压相加”会更稳。",
      ];
    }

    const i1 = voltage / r1;
    const i2 = voltage / r2;

    return [
      `并联时两条支路电压都等于 ${round(voltage)}。`,
      `当前支路电流约为 I1 = ${round(i1)}、I2 = ${round(i2)}，总电流约为 ${round(i1 + i2)}。`,
      "先抓“同起点同终点”的结构，再记“电压相等、电流分流”就不容易混。",
    ];
  },
  renderStage({ circuit, voltage, r1, r2 }) {
    if (circuit === "series") {
      const current = voltage / (r1 + r2);

      return createElement(CartesianPlot, {
        ariaLabel: "串联与并联电路对比图",
        bounds: { xMin: 0, xMax: 10, yMin: 0, yMax: 6 },
        series: [
          makeSeries("wire-left", "导线", "#94a3b8", [{ x: 1, y: 3 }, { x: 3, y: 3 }]),
          makeSeries("r1", "R1", "#ea580c", [{ x: 3, y: 3 }, { x: 5, y: 3 }]),
          makeSeries("r2", "R2", "#2563eb", [{ x: 5, y: 3 }, { x: 7, y: 3 }]),
          makeSeries("wire-right", "回路", "#94a3b8", [{ x: 7, y: 3 }, { x: 9, y: 3 }]),
        ],
        markers: [
          { id: "source", x: 1, y: 3, label: `U=${round(voltage)}` },
          { id: "current", x: 5, y: 3.8, label: `I=${round(current)}` },
          { id: "r1-label", x: 4, y: 2.4, label: `R1=${round(r1)}` },
          { id: "r2-label", x: 6, y: 2.4, label: `R2=${round(r2)}` },
        ],
      });
    }

    const i1 = voltage / r1;
    const i2 = voltage / r2;

    return createElement(CartesianPlot, {
      ariaLabel: "串联与并联电路对比图",
      bounds: { xMin: 0, xMax: 10, yMin: 0, yMax: 6 },
      series: [
        makeSeries("left-rail", "左侧节点", "#94a3b8", [{ x: 2, y: 1.5 }, { x: 2, y: 4.5 }]),
        makeSeries("right-rail", "右侧节点", "#94a3b8", [{ x: 8, y: 1.5 }, { x: 8, y: 4.5 }]),
        makeSeries("top-branch", "上支路", "#ea580c", [{ x: 2, y: 4 }, { x: 8, y: 4 }]),
        makeSeries("bottom-branch", "下支路", "#2563eb", [{ x: 2, y: 2 }, { x: 8, y: 2 }]),
      ],
      markers: [
        { id: "voltage", x: 1.2, y: 3, label: `U=${round(voltage)}` },
        { id: "i1", x: 5, y: 4.6, label: `I1=${round(i1)}` },
        { id: "i2", x: 5, y: 1.4, label: `I2=${round(i2)}` },
        { id: "total", x: 8.6, y: 3, label: `I总=${round(i1 + i2)}` },
      ],
    });
  },
};

const ohmsLawDemo: NumericDemo = {
  id: "physics-ohms-law",
  title: "欧姆定律与伏安关系",
  description: "把电压、电流和电阻的比例关系拉直，让图像和公式互相对应。",
  defaultParams: { resistance: 4, voltage: 8 },
  presets: [
    { id: "base", label: "基础关系", params: { resistance: 4, voltage: 8 } },
    { id: "largeR", label: "更大电阻", params: { resistance: 8, voltage: 8 } },
  ],
  controls: {
    resistance: { label: "电阻 R", min: 1, max: 12, step: 0.5 },
    voltage: { label: "电压 U", min: 1, max: 24, step: 1 },
  },
  explanation({ resistance, voltage }) {
    const current = voltage / resistance;
    return [
      `当前电流 I = U / R ≈ ${round(current)}。`,
      "电压固定时，电阻变大，电流会变小。",
      "欧姆定律最适合先建立比例感，再回到计算。",
    ];
  },
  renderStage({ resistance }) {
    const line = sampleCurve((u) => u / resistance, { xMin: 0, xMax: 24 }, 0.5);
    return createElement(CartesianPlot, {
      ariaLabel: "欧姆定律图像",
      bounds: { xMin: 0, xMax: 24, yMin: 0, yMax: 10 },
      series: [makeSeries("ohm", "I-U 关系", "#2563eb", line)],
    });
  },
};

const vibrationDemo: NumericDemo = {
  id: "physics-vibration",
  title: "简谐振动的周期与图像",
  description: "让位移-时间图像和实际往返过程同步起来，帮助孩子把一个周期真正看成完整过程。",
  defaultParams: { amplitude: 2, period: 4, time: 1 },
  presets: [
    { id: "base", label: "标准节奏", params: { amplitude: 2, period: 4, time: 1 } },
    { id: "fast", label: "周期更短", params: { amplitude: 2, period: 2.5, time: 1 } },
    { id: "large", label: "振幅更大", params: { amplitude: 3, period: 4, time: 1 } },
  ],
  controls: {
    amplitude: { label: "振幅 A", min: 1, max: 4, step: 0.2 },
    period: { label: "周期 T", min: 2, max: 6, step: 0.2 },
    time: { label: "观察时刻 t", min: 0, max: 8, step: 0.2 },
  },
  explanation({ amplitude, period, time }) {
    const omega = (2 * Math.PI) / period;
    const displacement = amplitude * Math.sin(omega * time);

    return [
      `当前位移约为 ${round(displacement)}，振幅保持在 ${round(amplitude)}。`,
      `周期是 ${round(period)}，表示完成一次完整往返所需的时间。`,
      "看图时要把“位移有多大”和“此刻正往哪边走”一起读出来，这样图像才真正连回过程。",
    ];
  },
  renderStage({ amplitude, period, time }) {
    const omega = (2 * Math.PI) / period;
    const points = sampleSineWave(
      (t) => amplitude * Math.sin(omega * t),
      { min: 0, max: 8 },
      0.05,
    );
    const displacement = amplitude * Math.sin(omega * time);

    return createElement(CartesianPlot, {
      ariaLabel: "简谐振动图像",
      bounds: { xMin: 0, xMax: 8, yMin: -4.5, yMax: 4.5 },
      series: [
        makeSeries("wave", "位移-时间图", "#7c3aed", points),
        { ...makeSeries("equilibrium", "平衡位置", "#94a3b8", [{ x: 0, y: 0 }, { x: 8, y: 0 }]), strokeDasharray: "6 6" },
      ],
      markers: [
        { id: "time", x: round(time), y: round(displacement), label: `t=${round(time)}` },
        { id: "period", x: round(period), y: 0, label: "1T", color: "#0f766e" },
      ],
    });
  },
};

const wavePropagationDemo: NumericDemo = {
  id: "physics-wave-propagation",
  title: "波的传播与相位感知",
  description: "把同一时刻的波形快照画出来，帮助孩子区分“波在走”和“点在振”。",
  defaultParams: { amplitude: 2, wavelength: 4, speed: 1, time: 1 },
  presets: [
    { id: "snapshot", label: "基础波形", params: { amplitude: 2, wavelength: 4, speed: 1, time: 1 } },
    { id: "faster", label: "传播更快", params: { amplitude: 2, wavelength: 4, speed: 1.8, time: 1 } },
    { id: "longer", label: "波长更长", params: { amplitude: 2, wavelength: 6, speed: 1, time: 1 } },
  ],
  controls: {
    amplitude: { label: "振幅 A", min: 1, max: 4, step: 0.2 },
    wavelength: { label: "波长 λ", min: 2, max: 8, step: 0.2 },
    speed: { label: "波速 v", min: 0.5, max: 2.5, step: 0.1 },
    time: { label: "观察时刻 t", min: 0, max: 4, step: 0.2 },
  },
  explanation({ amplitude, wavelength, speed, time }) {
    const phaseShift = round(speed * time);
    const pointA = round(amplitude * Math.sin((2 * Math.PI * (2 - phaseShift)) / wavelength));
    const pointB = round(amplitude * Math.sin((2 * Math.PI * (5 - phaseShift)) / wavelength));

    return [
      `此刻波形整体向前平移了约 ${phaseShift} 个单位，但介质质点仍只在原位置附近振动。`,
      `A 点位移约为 ${pointA}，B 点位移约为 ${pointB}，这就是同一时刻不同位置的相位差。`,
      "读波形图时，先分清“整条波形怎样前进”，再分清“某个点此刻处在什么状态”。",
    ];
  },
  renderStage({ amplitude, wavelength, speed, time }) {
    const shift = speed * time;
    const points = sampleSineWave(
      (x) => amplitude * Math.sin((2 * Math.PI * (x - shift)) / wavelength),
      { min: 0, max: 10 },
      0.05,
    );
    const pointA = {
      x: 2,
      y: round(amplitude * Math.sin((2 * Math.PI * (2 - shift)) / wavelength)),
    };
    const pointB = {
      x: 5,
      y: round(amplitude * Math.sin((2 * Math.PI * (5 - shift)) / wavelength)),
    };

    return createElement(CartesianPlot, {
      ariaLabel: "波的传播图像",
      bounds: { xMin: 0, xMax: 10, yMin: -4.5, yMax: 4.5 },
      series: [
        makeSeries("wave", "同一时刻波形", "#2563eb", points),
        { ...makeSeries("equilibrium", "平衡位置", "#94a3b8", [{ x: 0, y: 0 }, { x: 10, y: 0 }]), strokeDasharray: "6 6" },
      ],
      markers: [
        { id: "point-a", x: pointA.x, y: pointA.y, label: "A" },
        { id: "point-b", x: pointB.x, y: pointB.y, label: "B", color: "#ea580c" },
      ],
    });
  },
};

const chemistryMoleDemo: NumericDemo = {
  id: "chemistry-mole",
  title: "物质的量关系网",
  description: "把 n 放在中央，看它如何统领质量、微粒数和气体体积。",
  defaultParams: { amount: 2, molarMass: 18, gasMolarVolume: 22.4 },
  presets: [
    { id: "water", label: "水分子", params: { amount: 2, molarMass: 18, gasMolarVolume: 22.4 } },
    { id: "oxygen", label: "氧气", params: { amount: 1.5, molarMass: 32, gasMolarVolume: 22.4 } },
    { id: "room", label: "常温气体", params: { amount: 2, molarMass: 44, gasMolarVolume: 24 } },
  ],
  controls: {
    amount: { label: "物质的量 n", min: 0.5, max: 5, step: 0.1 },
    molarMass: { label: "摩尔质量 M", min: 2, max: 98, step: 1 },
    gasMolarVolume: { label: "气体摩尔体积 Vm", min: 22.4, max: 24.5, step: 0.1 },
  },
  explanation({ amount, molarMass, gasMolarVolume }) {
    const mass = amount * molarMass;
    const particles = amount * 6.02e23;
    const volume = amount * gasMolarVolume;

    return [
      `质量 m = nM，当前约为 ${round(mass)} g。`,
      `微粒数 N = nNa，当前约为 ${(particles / 1e23).toFixed(2)} x 10^23。`,
      `气体体积 V = nVm，当前约为 ${round(volume)} L。`,
    ];
  },
  renderStage({ amount, molarMass, gasMolarVolume }) {
    return createElement(ConceptBoard, {
      title: "n 的换算枢纽",
      items: [
        { id: "n", title: `n = ${round(amount)} mol`, summary: "所有换算都先回到物质的量。", accent: "#fdba74" },
        { id: "m", title: `m = ${round(amount * molarMass)} g`, summary: "通过 m = nM 连接质量。", accent: "#93c5fd" },
        { id: "v", title: `V = ${round(amount * gasMolarVolume)} L`, summary: "气体体积换算别忘了条件。", accent: "#86efac" },
      ],
    });
  },
};

const chemistryMaterialClassificationDemo: MixedDemo = {
  id: "chemistry-material-classification",
  title: "物质分类关系",
  description: "把纯净物、混合物、单质、化合物的层级关系放在同一张图里。",
  defaultParams: { branch: "pure" },
  presets: [
    { id: "pure", label: "纯净物主线", params: { branch: "pure" } },
    { id: "mixture", label: "混合物主线", params: { branch: "mixture" } },
  ],
  controls: {
    branch: {
      kind: "select",
      label: "分类主线",
      options: [
        { label: "纯净物", value: "pure" },
        { label: "混合物", value: "mixture" },
      ],
    },
  },
  explanation({ branch }) {
    return branch === "pure"
      ? ["纯净物最先再分成单质和化合物。", "判断时先问组成是否固定，再问元素种类。"] 
      : ["混合物的关键是成分不唯一。", "空气、溶液、合金都要先回到“多种物质共存”。"];
  },
  renderStage({ branch }) {
    const items =
      branch === "pure"
        ? [
            { id: "pure", title: "纯净物", summary: "组成固定。", accent: "#93c5fd" },
            { id: "element", title: "单质", summary: "只含一种元素。", accent: "#fdba74" },
            { id: "compound", title: "化合物", summary: "含两种或更多元素。", accent: "#86efac" },
          ]
        : [
            { id: "mixture", title: "混合物", summary: "成分不固定。", accent: "#93c5fd" },
            { id: "solution", title: "溶液", summary: "均一稳定的常见混合物。", accent: "#fdba74" },
            { id: "air", title: "空气/合金", summary: "也是典型混合物。", accent: "#86efac" },
          ];

    return createElement(ConceptBoard, {
      title: "物质分类树",
      items,
    });
  },
};

const chemistryDispersionDemo: MixedDemo = {
  id: "chemistry-dispersion-colloid",
  title: "分散系与胶体",
  description: "把溶液、胶体、浊液按粒子尺度和现象差异放回同一张关系图里。",
  defaultParams: { system: "colloid" },
  presets: [
    { id: "solution", label: "溶液", params: { system: "solution" } },
    { id: "colloid", label: "胶体", params: { system: "colloid" } },
    { id: "suspension", label: "浊液", params: { system: "suspension" } },
  ],
  controls: {
    system: {
      kind: "select",
      label: "分散系类型",
      options: [
        { label: "溶液", value: "solution" },
        { label: "胶体", value: "colloid" },
        { label: "浊液", value: "suspension" },
      ],
    },
  },
  explanation({ system }) {
    const map: Record<string, string[]> = {
      solution: ["粒子很小，体系均一稳定。", "最先抓“看起来很均一”。"],
      colloid: ["胶体最常见的识别特征是丁达尔效应。", "它介于溶液和浊液之间。"],
      suspension: ["粒子更大，静置后容易分层或沉降。", "这类体系最不稳定。"],
    };
    return map[String(system)];
  },
  renderStage({ system }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      solution: [
        { id: "size", title: "粒子尺度", summary: "最小。", accent: "#93c5fd" },
        { id: "look", title: "外观", summary: "均一透明。", accent: "#fdba74" },
        { id: "effect", title: "现象", summary: "无明显丁达尔效应。", accent: "#86efac" },
      ],
      colloid: [
        { id: "size", title: "粒子尺度", summary: "介于溶液与浊液之间。", accent: "#93c5fd" },
        { id: "look", title: "外观", summary: "较均一但不是分子级。", accent: "#fdba74" },
        { id: "effect", title: "现象", summary: "常有丁达尔效应。", accent: "#86efac" },
      ],
      suspension: [
        { id: "size", title: "粒子尺度", summary: "最大。", accent: "#93c5fd" },
        { id: "look", title: "外观", summary: "不均一、易分层。", accent: "#fdba74" },
        { id: "effect", title: "现象", summary: "静置后常沉降。", accent: "#86efac" },
      ],
    };
    return createBoard("分散系比较板", items[String(system)]);
  },
};

const chemistrySodiumDemo: MixedDemo = {
  id: "chemistry-sodium",
  title: "钠及其化合物",
  description: "把钠单质、氧化物和常见盐类的转化链路放在一起记忆。",
  defaultParams: { stage: "metal" },
  presets: [
    { id: "metal", label: "钠单质", params: { stage: "metal" } },
    { id: "oxide", label: "氧化物", params: { stage: "oxide" } },
    { id: "salt", label: "盐类", params: { stage: "salt" } },
  ],
  controls: {
    stage: {
      kind: "select",
      label: "观察节点",
      options: [
        { label: "钠单质", value: "metal" },
        { label: "氧化物", value: "oxide" },
        { label: "盐类", value: "salt" },
      ],
    },
  },
  explanation({ stage }) {
    const map: Record<string, string[]> = {
      metal: ["钠单质活泼，常和水、氧气等快速反应。", "记忆时要先抓“活泼性很强”。"],
      oxide: ["钠的氧化物与过氧化物最容易混。", "要特别注意产物和颜色差异。"],
      salt: ["最终常回到碳酸钠、碳酸氢钠等常见盐。", "转化题里要看清反应条件。"],
    };
    return map[String(stage)];
  },
  renderStage({ stage }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      metal: [
        { id: "trait", title: "性质", summary: "很活泼。", accent: "#93c5fd" },
        { id: "reaction", title: "典型反应", summary: "与水、氧气反应显著。", accent: "#fdba74" },
        { id: "tip", title: "学习抓手", summary: "先抓活泼性，再串产物。", accent: "#86efac" },
      ],
      oxide: [
        { id: "na2o", title: "氧化钠", summary: "较基础的氧化物。", accent: "#93c5fd" },
        { id: "na2o2", title: "过氧化钠", summary: "性质和用途都更特殊。", accent: "#fdba74" },
        { id: "tip", title: "易错点", summary: "别把两者反应条件和现象混掉。", accent: "#86efac" },
      ],
      salt: [
        { id: "na2co3", title: "碳酸钠", summary: "典型盐类。", accent: "#93c5fd" },
        { id: "nahco3", title: "碳酸氢钠", summary: "常与碳酸钠对比。", accent: "#fdba74" },
        { id: "tip", title: "学习抓手", summary: "把用途、热稳定性和反应现象一起记。", accent: "#86efac" },
      ],
    };
    return createBoard("钠元素转化板", items[String(stage)]);
  },
};

const chemistryChlorineDemo: MixedDemo = {
  id: "chemistry-chlorine",
  title: "氯及其化合物",
  description: "把氯气、盐酸、次氯酸和漂白相关物质放到同一张链路图里。",
  defaultParams: { node: "chlorine" },
  presets: [
    { id: "chlorine", label: "氯气", params: { node: "chlorine" } },
    { id: "acid", label: "盐酸/次氯酸", params: { node: "acid" } },
    { id: "bleach", label: "漂白体系", params: { node: "bleach" } },
  ],
  controls: {
    node: {
      kind: "select",
      label: "观察节点",
      options: [
        { label: "氯气", value: "chlorine" },
        { label: "盐酸/次氯酸", value: "acid" },
        { label: "漂白体系", value: "bleach" },
      ],
    },
  },
  explanation({ node }) {
    const map: Record<string, string[]> = {
      chlorine: ["氯气有毒且氧化性较强。", "先抓活泼性和应用场景。"],
      acid: ["盐酸和次氯酸的性质差异要分开记。", "尤其注意谁更强酸、谁更具漂白性。"],
      bleach: ["漂白粉、次氯酸盐体系最适合放回整体链路记忆。", "别只背一个名字。"],
    };
    return map[String(node)];
  },
  renderStage({ node }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      chlorine: [
        { id: "trait", title: "核心性质", summary: "有毒、强氧化性。", accent: "#93c5fd" },
        { id: "reaction", title: "典型反应", summary: "与金属、氢气、水等反应。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "先看电子得失和用途。", accent: "#86efac" },
      ],
      acid: [
        { id: "hcl", title: "盐酸", summary: "强酸，常见电离体系。", accent: "#93c5fd" },
        { id: "hclo", title: "次氯酸", summary: "弱酸但有漂白杀菌性。", accent: "#fdba74" },
        { id: "tip", title: "易错点", summary: "别把酸性强弱和氧化漂白作用混为一谈。", accent: "#86efac" },
      ],
      bleach: [
        { id: "system", title: "体系", summary: "氯气制漂白粉、次氯酸盐。", accent: "#93c5fd" },
        { id: "essence", title: "本质", summary: "关键常回到次氯酸或次氯酸根。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "把消毒、漂白、储存条件放一起记。", accent: "#86efac" },
      ],
    };
    return createBoard("氯元素链路板", items[String(node)]);
  },
};

const chemistryIronDemo: MixedDemo = {
  id: "chemistry-iron",
  title: "铁及其化合物",
  description: "围绕 Fe、Fe2+、Fe3+ 三个层级，建立铁元素反应链的主线。",
  defaultParams: { ion: "fe2" },
  presets: [
    { id: "metal", label: "Fe", params: { ion: "metal" } },
    { id: "fe2", label: "Fe2+", params: { ion: "fe2" } },
    { id: "fe3", label: "Fe3+", params: { ion: "fe3" } },
  ],
  controls: {
    ion: {
      kind: "select",
      label: "观察节点",
      options: [
        { label: "Fe", value: "metal" },
        { label: "Fe2+", value: "fe2" },
        { label: "Fe3+", value: "fe3" },
      ],
    },
  },
  explanation({ ion }) {
    const map: Record<string, string[]> = {
      metal: ["单质铁常作为电子提供者。", "先抓金属活动性和被氧化方向。"],
      fe2: ["Fe2+ 往往处在中间态，易被氧化成 Fe3+。", "是很多转化题的核心桥梁。"],
      fe3: ["Fe3+ 氧化性更明显。", "要特别留意颜色和检验现象。"],
    };
    return map[String(ion)];
  },
  renderStage({ ion }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      metal: [
        { id: "role", title: "角色", summary: "电子提供者。", accent: "#93c5fd" },
        { id: "path", title: "转化", summary: "常先转成 Fe2+。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "先看被氧化还是参与置换。", accent: "#86efac" },
      ],
      fe2: [
        { id: "state", title: "中间层级", summary: "介于 Fe 与 Fe3+ 之间。", accent: "#93c5fd" },
        { id: "path", title: "变化方向", summary: "易继续被氧化成 Fe3+。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "它是链路中的过渡桥。", accent: "#86efac" },
      ],
      fe3: [
        { id: "trait", title: "特点", summary: "氧化性更强。", accent: "#93c5fd" },
        { id: "path", title: "变化方向", summary: "可被还原回 Fe2+。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "把颜色和检验现象一起记。", accent: "#86efac" },
      ],
    };
    return createBoard("铁元素转化板", items[String(ion)]);
  },
};

const chemistryLabDevicesDemo: MixedDemo = {
  id: "chemistry-lab-devices",
  title: "化学实验基础与装置",
  description: "把装置用途、操作顺序和安全注意拆成稳定的实验流程。",
  defaultParams: { device: "heating" },
  presets: [
    { id: "heating", label: "加热装置", params: { device: "heating" } },
    { id: "gas", label: "气体收集", params: { device: "gas" } },
    { id: "filtration", label: "过滤洗涤", params: { device: "filtration" } },
  ],
  controls: {
    device: {
      kind: "select",
      label: "实验场景",
      options: [
        { label: "加热装置", value: "heating" },
        { label: "气体收集", value: "gas" },
        { label: "过滤洗涤", value: "filtration" },
      ],
    },
  },
  explanation({ device }) {
    const map: Record<string, string[]> = {
      heating: ["加热类实验最先抓装置受热顺序和试管口方向。", "安全细节经常就是得分点。"],
      gas: ["气体收集先看密度，再看是否溶于水。", "方法选择比背名称更重要。"],
      filtration: ["过滤洗涤要把操作步骤和目的对应起来。", "玻璃棒、漏斗和液面位置最容易丢分。"],
    };
    return map[String(device)];
  },
  renderStage({ device }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      heating: [
        { id: "device", title: "装置", summary: "酒精灯、试管、铁架台等。", accent: "#93c5fd" },
        { id: "focus", title: "重点", summary: "均匀受热、试管口略向下。", accent: "#fdba74" },
        { id: "safety", title: "安全", summary: "防止液体倒流和暴沸。", accent: "#86efac" },
      ],
      gas: [
        { id: "basis", title: "选择依据", summary: "密度和溶解性。", accent: "#93c5fd" },
        { id: "method", title: "常见方法", summary: "排水法、向上/向下排空气法。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "先看性质再选装置。", accent: "#86efac" },
      ],
      filtration: [
        { id: "tool", title: "装置", summary: "漏斗、滤纸、烧杯、玻璃棒。", accent: "#93c5fd" },
        { id: "step", title: "重点步骤", summary: "一贴二低三靠。", accent: "#fdba74" },
        { id: "tip", title: "易错点", summary: "液面别高于滤纸边缘。", accent: "#86efac" },
      ],
    };
    return createBoard("实验装置流程板", items[String(device)]);
  },
};

const chemistryIonicDemo: MixedDemo = {
  id: "chemistry-ionic-reaction",
  title: "离子反应拆解",
  description: "从“能不能拆成离子”与“有没有沉淀/气体/水生成”两步判断。",
  defaultParams: { reaction: "precipitation" },
  presets: [
    { id: "ppt", label: "沉淀生成", params: { reaction: "precipitation" } },
    { id: "gas", label: "气体生成", params: { reaction: "gas" } },
    { id: "neutral", label: "中和反应", params: { reaction: "neutralization" } },
  ],
  controls: {
    reaction: {
      kind: "select",
      label: "反应类型",
      options: [
        { label: "沉淀生成", value: "precipitation" },
        { label: "气体生成", value: "gas" },
        { label: "中和反应", value: "neutralization" },
      ],
    },
  },
  explanation({ reaction }) {
    const map: Record<string, string[]> = {
      precipitation: ["先拆强电解质，再找是否生成难溶物。", "AgNO3 + NaCl 这类题的关键是抓住 AgCl 沉淀。"] ,
      gas: ["看是否生成 CO2、SO2、NH3 这类气体。", "本质是离子重新组合后出现了离开溶液体系的产物。"] ,
      neutralization: ["H+ 和 OH- 相遇生成水，是最核心的净离子过程。", "写净离子方程时要把旁观离子删掉。"] ,
    };

    return map[String(reaction)];
  },
  renderStage({ reaction }) {
    const boards: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      precipitation: [
        { id: "step1", title: "先拆", summary: "强酸、强碱、可溶盐拆成离子。", accent: "#93c5fd" },
        { id: "step2", title: "再配对", summary: "看新组合里有没有难溶物。", accent: "#fdba74" },
        { id: "step3", title: "删旁观", summary: "把没有变化的离子删掉。", accent: "#86efac" },
      ],
      gas: [
        { id: "step1", title: "找弱酸根", summary: "碳酸根、亚硫酸根常与 H+ 生成气体。", accent: "#93c5fd" },
        { id: "step2", title: "写中间产物", summary: "先写 H2CO3，再想到它分解成 CO2 和 H2O。", accent: "#fdba74" },
        { id: "step3", title: "删旁观", summary: "保留真正发生变化的离子。", accent: "#86efac" },
      ],
      neutralization: [
        { id: "step1", title: "核心粒子", summary: "真正发生变化的是 H+ 和 OH-。", accent: "#93c5fd" },
        { id: "step2", title: "生成物", summary: "它们生成难电离的水。", accent: "#fdba74" },
        { id: "step3", title: "净离子方程", summary: "H+ + OH- = H2O。", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "离子反应判断流程",
      items: boards[String(reaction)],
    });
  },
};

const chemistryRedoxDemo: MixedDemo = {
  id: "chemistry-redox",
  title: "氧化还原判断",
  description: "把得失电子、化合价变化和氧化剂/还原剂身份放到一张关系板上。",
  defaultParams: { scenario: "iron" },
  presets: [
    { id: "iron", label: "铁被氧化", params: { scenario: "iron" } },
    { id: "chlorine", label: "氯气得电子", params: { scenario: "chlorine" } },
  ],
  controls: {
    scenario: {
      kind: "select",
      label: "观察场景",
      options: [
        { label: "铁被氧化", value: "iron" },
        { label: "氯气得电子", value: "chlorine" },
      ],
    },
  },
  explanation({ scenario }) {
    if (scenario === "iron") {
      return ["Fe 失电子，化合价升高，所以它被氧化。", "失电子的一方同时叫还原剂。"];
    }

    return ["Cl2 得电子，化合价降低，所以它被还原。", "得电子的一方同时叫氧化剂。"];
  },
  renderStage({ scenario }) {
    const items =
      scenario === "iron"
        ? [
            { id: "electron", title: "失电子", summary: "电子从 Fe 流出。", accent: "#fdba74" },
            { id: "valence", title: "化合价升高", summary: "Fe 从 0 变成 +2 或 +3。", accent: "#93c5fd" },
            { id: "role", title: "还原剂", summary: "它提供电子，因此自身被氧化。", accent: "#86efac" },
          ]
        : [
            { id: "electron", title: "得电子", summary: "Cl2 接收电子。", accent: "#fdba74" },
            { id: "valence", title: "化合价降低", summary: "Cl 从 0 变成 -1。", accent: "#93c5fd" },
            { id: "role", title: "氧化剂", summary: "它拿走电子，因此自身被还原。", accent: "#86efac" },
          ];

    return createElement(ConceptBoard, {
      title: "氧化还原关系板",
      items,
    });
  },
};

const chemistryIonIdentificationDemo: MixedDemo = {
  id: "chemistry-ion-identification",
  title: "离子检验流程",
  description: "把试剂、现象和结论串成一个稳定的实验判断链。",
  defaultParams: { ion: "chloride" },
  presets: [
    { id: "cl", label: "氯离子", params: { ion: "chloride" } },
    { id: "so4", label: "硫酸根", params: { ion: "sulfate" } },
    { id: "nh4", label: "铵根", params: { ion: "ammonium" } },
  ],
  controls: {
    ion: {
      kind: "select",
      label: "待检离子",
      options: [
        { label: "Cl-", value: "chloride" },
        { label: "SO4^2-", value: "sulfate" },
        { label: "NH4+", value: "ammonium" },
      ],
    },
  },
  explanation({ ion }) {
    const tips: Record<string, string[]> = {
      chloride: ["加稀硝酸酸化后再滴加 AgNO3。", "出现白色沉淀，且不溶于稀硝酸，可判断有 Cl-。"],
      sulfate: ["先排除碳酸根干扰，再加 BaCl2 或 Ba(NO3)2。", "生成不溶于酸的白色沉淀时，常指向 SO4^2-。"],
      ammonium: ["加碱并微热。", "若产生使湿润红色石蕊试纸变蓝的气体，可判断有 NH4+。"],
    };

    return tips[String(ion)];
  },
  renderStage({ ion }) {
    const flows: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      chloride: [
        { id: "reagent", title: "试剂", summary: "稀硝酸 + AgNO3", accent: "#93c5fd" },
        { id: "observe", title: "现象", summary: "白色沉淀生成", accent: "#fdba74" },
        { id: "conclusion", title: "结论", summary: "样品中含有 Cl-", accent: "#86efac" },
      ],
      sulfate: [
        { id: "reagent", title: "试剂", summary: "酸化后加 Ba2+ 试剂", accent: "#93c5fd" },
        { id: "observe", title: "现象", summary: "白色沉淀且不溶于酸", accent: "#fdba74" },
        { id: "conclusion", title: "结论", summary: "样品中含有 SO4^2-", accent: "#86efac" },
      ],
      ammonium: [
        { id: "reagent", title: "试剂", summary: "加碱并加热", accent: "#93c5fd" },
        { id: "observe", title: "现象", summary: "放出可使红色石蕊变蓝的气体", accent: "#fdba74" },
        { id: "conclusion", title: "结论", summary: "样品中含有 NH4+", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "离子检验链路",
      items: flows[String(ion)],
    });
  },
};

const englishClauseDemo: MixedDemo = {
  id: "english-clause-hierarchy",
  title: "从句层级拆解",
  description: "先看从句在整句里充当什么功能，再看它挂在谁身上。",
  defaultParams: { clause: "object" },
  presets: [
    { id: "object", label: "宾语从句", params: { clause: "object" } },
    { id: "adverbial", label: "状语从句", params: { clause: "adverbial" } },
  ],
  controls: {
    clause: {
      kind: "select",
      label: "从句类型",
      options: [
        { label: "宾语从句", value: "object" },
        { label: "状语从句", value: "adverbial" },
      ],
    },
  },
  explanation({ clause }) {
    return clause === "object"
      ? ["先问从句在回答谓语动词的什么内容。", "宾语从句最重要的是把它当成“名词性成分”来看。"] 
      : ["先问它在补充时间、原因、条件还是让步。", "状语从句最重要的是看它和主句之间的逻辑关系。"];
  },
  renderStage({ clause }) {
    const items =
      clause === "object"
        ? [
            { id: "main", title: "主句谓语", summary: "say / know / believe 等动词抛出问题。", accent: "#93c5fd" },
            { id: "linker", title: "连接词", summary: "that / whether 负责把从句挂进来。", accent: "#fdba74" },
            { id: "clause", title: "宾语从句", summary: "整体充当“说了什么/知道什么”的内容。", accent: "#86efac" },
          ]
        : [
            { id: "main", title: "主句动作", summary: "真正的核心事件仍在主句。", accent: "#93c5fd" },
            { id: "linker", title: "逻辑词", summary: "because / if / when 等提醒逻辑关系。", accent: "#fdba74" },
            { id: "clause", title: "状语从句", summary: "它在补充条件、时间、原因等背景。", accent: "#86efac" },
          ];

    return createElement(ConceptBoard, {
      title: "从句层级板",
      items,
    });
  },
};

const englishSentenceStructureDemo: MixedDemo = {
  id: "english-sentence-structure",
  title: "句子成分结构拆解",
  description: "先找主干，再看修饰，帮助学生把长句拆成层次清晰的结构。",
  defaultParams: { pattern: "svo" },
  presets: [
    { id: "sv", label: "主谓", params: { pattern: "sv" } },
    { id: "svo", label: "主谓宾", params: { pattern: "svo" } },
    { id: "svoc", label: "主谓宾补", params: { pattern: "svoc" } },
  ],
  controls: {
    pattern: {
      kind: "select",
      label: "句型骨架",
      options: [
        { label: "主谓", value: "sv" },
        { label: "主谓宾", value: "svo" },
        { label: "主谓宾补", value: "svoc" },
      ],
    },
  },
  explanation({ pattern }) {
    const map: Record<string, string[]> = {
      sv: ["先找到谁在做动作。", "这是最短的句子主干。"],
      svo: ["谓语后面的核心接受者是宾语。", "别把长修饰语误判成主干。"],
      svoc: ["宾补是“补足宾语状态”的部分。", "它不是新的并列动作。"],
    };

    return map[String(pattern)];
  },
  renderStage({ pattern }) {
    const boards: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      sv: [
        { id: "s", title: "主语", summary: "谁/什么。", accent: "#93c5fd" },
        { id: "v", title: "谓语", summary: "在做什么。", accent: "#fdba74" },
        { id: "tip", title: "拆句抓手", summary: "先把这两块钉住。", accent: "#86efac" },
      ],
      svo: [
        { id: "s", title: "主语", summary: "发出动作的一方。", accent: "#93c5fd" },
        { id: "v", title: "谓语", summary: "核心动作。", accent: "#fdba74" },
        { id: "o", title: "宾语", summary: "动作指向的对象。", accent: "#86efac" },
      ],
      svoc: [
        { id: "s", title: "主语", summary: "动作发出者。", accent: "#93c5fd" },
        { id: "vo", title: "谓语 + 宾语", summary: "先找到动作和承受对象。", accent: "#fdba74" },
        { id: "c", title: "宾补", summary: "补充宾语状态或结果。", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "句子结构主干板",
      items: boards[String(pattern)],
    });
  },
};

const englishTenseTimelineDemo: MixedDemo = {
  id: "english-tense-timeline",
  title: "时态时间轴",
  description: "把动作发生点放回时间线上，帮助学生先看时间关系，再选形式。",
  defaultParams: { tense: "present-perfect" },
  presets: [
    { id: "present", label: "一般现在时", params: { tense: "present" } },
    { id: "past", label: "一般过去时", params: { tense: "past" } },
    { id: "present-perfect", label: "现在完成时", params: { tense: "present-perfect" } },
  ],
  controls: {
    tense: {
      kind: "select",
      label: "时态类型",
      options: [
        { label: "一般现在时", value: "present" },
        { label: "一般过去时", value: "past" },
        { label: "现在完成时", value: "present-perfect" },
      ],
    },
  },
  explanation({ tense }) {
    const map: Record<string, string[]> = {
      present: ["一般现在时强调习惯、事实或常态。", "时间线上的重点是“常常如此”。"],
      past: ["一般过去时把动作钉在过去某一点。", "是否与现在有关通常不是重点。"],
      "present-perfect": ["现在完成时是“过去发生 + 对现在有影响”。", "时间线要同时看到过去起点和当前结果。"],
    };

    return map[String(tense)];
  },
  renderStage({ tense }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      present: [
        { id: "time", title: "时间感", summary: "常态、习惯、事实。", accent: "#93c5fd" },
        { id: "signal", title: "信号词", summary: "usually, often, every day。", accent: "#fdba74" },
        { id: "focus", title: "判断重点", summary: "不是现在发生，而是经常如此。", accent: "#86efac" },
      ],
      past: [
        { id: "time", title: "时间感", summary: "过去某一点或某段。", accent: "#93c5fd" },
        { id: "signal", title: "信号词", summary: "yesterday, last year, ago。", accent: "#fdba74" },
        { id: "focus", title: "判断重点", summary: "动作已离开现在。", accent: "#86efac" },
      ],
      "present-perfect": [
        { id: "time", title: "时间感", summary: "从过去连到现在。", accent: "#93c5fd" },
        { id: "signal", title: "信号词", summary: "since, for, already, yet。", accent: "#fdba74" },
        { id: "focus", title: "判断重点", summary: "现在仍能看到结果或延续。", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "时态时间轴板",
      items: items[String(tense)],
    });
  },
};

const englishReadingLayerDemo: MixedDemo = {
  id: "english-reading-layer",
  title: "阅读信息分层",
  description: "先区分主旨、论据、细节，再回到题目要求，阅读就不会陷在逐词翻译里。",
  defaultParams: { layer: "main-idea" },
  presets: [
    { id: "main", label: "主旨层", params: { layer: "main-idea" } },
    { id: "support", label: "论据层", params: { layer: "support" } },
    { id: "detail", label: "细节层", params: { layer: "detail" } },
  ],
  controls: {
    layer: {
      kind: "select",
      label: "阅读层级",
      options: [
        { label: "主旨层", value: "main-idea" },
        { label: "论据层", value: "support" },
        { label: "细节层", value: "detail" },
      ],
    },
  },
  explanation({ layer }) {
    const map: Record<string, string[]> = {
      "main-idea": ["主旨层回答“这段主要在说什么”。", "做标题题和中心思想题时先抓这一层。"],
      support: ["论据层看作者如何支撑主张。", "通常由例子、原因、对比、数据构成。"],
      detail: ["细节层适合回文定位。", "别把局部细节误当成整段主旨。"],
    };

    return map[String(layer)];
  },
  renderStage({ layer }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      "main-idea": [
        { id: "question", title: "核心问题", summary: "作者最想表达什么。", accent: "#93c5fd" },
        { id: "position", title: "常见位置", summary: "标题、首段、尾段和主题句。", accent: "#fdba74" },
        { id: "pitfall", title: "易错点", summary: "别被某个例子带跑。", accent: "#86efac" },
      ],
      support: [
        { id: "question", title: "核心问题", summary: "作者如何证明主张。", accent: "#93c5fd" },
        { id: "position", title: "常见位置", summary: "中间展开段。", accent: "#fdba74" },
        { id: "pitfall", title: "易错点", summary: "支撑点不能直接等于主旨。", accent: "#86efac" },
      ],
      detail: [
        { id: "question", title: "核心问题", summary: "具体信息是什么。", accent: "#93c5fd" },
        { id: "position", title: "常见位置", summary: "需要关键词回文定位。", accent: "#fdba74" },
        { id: "pitfall", title: "易错点", summary: "注意同义替换。", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "阅读分层板",
      items: items[String(layer)],
    });
  },
};

const englishLogicConnectorDemo: MixedDemo = {
  id: "english-logic-connector-map",
  title: "逻辑连接词网络",
  description: "把转折、因果、递进、条件放回逻辑关系里，而不是只背词表。",
  defaultParams: { relation: "contrast" },
  presets: [
    { id: "contrast", label: "转折", params: { relation: "contrast" } },
    { id: "cause", label: "因果", params: { relation: "cause" } },
    { id: "addition", label: "递进", params: { relation: "addition" } },
  ],
  controls: {
    relation: {
      kind: "select",
      label: "逻辑关系",
      options: [
        { label: "转折", value: "contrast" },
        { label: "因果", value: "cause" },
        { label: "递进", value: "addition" },
      ],
    },
  },
  explanation({ relation }) {
    const map: Record<string, string[]> = {
      contrast: ["however、but、yet 都在提示信息反向。", "先看语义冲突，再选连接词。"],
      cause: ["because、therefore、so 强调前后因果链。", "判断方向时要分清原因和结果。"],
      addition: ["moreover、besides、in addition 是在继续往上叠信息。", "不是所有长句都一定需要转折。"],
    };

    return map[String(relation)];
  },
  renderStage({ relation }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      contrast: [
        { id: "logic", title: "逻辑感", summary: "前后方向相反或不一致。", accent: "#93c5fd" },
        { id: "words", title: "高频词", summary: "however, but, yet。", accent: "#fdba74" },
        { id: "tip", title: "判断抓手", summary: "先看意思是不是拐弯。", accent: "#86efac" },
      ],
      cause: [
        { id: "logic", title: "逻辑感", summary: "前因后果。", accent: "#93c5fd" },
        { id: "words", title: "高频词", summary: "because, since, therefore。", accent: "#fdba74" },
        { id: "tip", title: "判断抓手", summary: "先问哪一句解释哪一句。", accent: "#86efac" },
      ],
      addition: [
        { id: "logic", title: "逻辑感", summary: "继续补充、继续加码。", accent: "#93c5fd" },
        { id: "words", title: "高频词", summary: "moreover, besides, in addition。", accent: "#fdba74" },
        { id: "tip", title: "判断抓手", summary: "看是不是在同方向继续堆料。", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "连接词逻辑板",
      items: items[String(relation)],
    });
  },
};

const englishAffixNetworkDemo: MixedDemo = {
  id: "english-affix-network",
  title: "前后缀变义网络",
  description: "让学生看到前后缀是在如何推动词义方向变化，而不是孤立记忆词表。",
  defaultParams: { affix: "un" },
  presets: [
    { id: "un", label: "un-", params: { affix: "un" } },
    { id: "re", label: "re-", params: { affix: "re" } },
    { id: "ful", label: "-ful", params: { affix: "ful" } },
  ],
  controls: {
    affix: {
      kind: "select",
      label: "词缀",
      options: [
        { label: "un-", value: "un" },
        { label: "re-", value: "re" },
        { label: "-ful", value: "ful" },
      ],
    },
  },
  explanation({ affix }) {
    const map: Record<string, string[]> = {
      un: ["un- 常给单词加上否定方向。", "但仍要结合词根和语境看具体词义。"],
      re: ["re- 常表示“再次、回到”。", "它非常适合做动作类词汇扩展。"],
      ful: ["-ful 常把词推向“充满……的”。", "后缀经常帮助判断词性。"],
    };

    return map[String(affix)];
  },
  renderStage({ affix }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      un: [
        { id: "core", title: "方向", summary: "否定、反向。", accent: "#93c5fd" },
        { id: "example", title: "例词", summary: "unhappy, unclear。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "先看原词，再看是否被翻转。", accent: "#86efac" },
      ],
      re: [
        { id: "core", title: "方向", summary: "再次、回到。", accent: "#93c5fd" },
        { id: "example", title: "例词", summary: "rewrite, return。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "看动作是不是被重复或回转。", accent: "#86efac" },
      ],
      ful: [
        { id: "core", title: "方向", summary: "充满……的。", accent: "#93c5fd" },
        { id: "example", title: "例词", summary: "helpful, useful。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "后缀经常顺手提示词性。", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "前后缀变义板",
      items: items[String(affix)],
    });
  },
};

const englishWordFamilyDemo: MixedDemo = {
  id: "english-word-family-atlas",
  title: "高频词族网络",
  description: "把同一家族的名词、动词、形容词连起来，帮助学生做词形转换。",
  defaultParams: { family: "act" },
  presets: [
    { id: "act", label: "act 家族", params: { family: "act" } },
    { id: "develop", label: "develop 家族", params: { family: "develop" } },
  ],
  controls: {
    family: {
      kind: "select",
      label: "词族中心",
      options: [
        { label: "act", value: "act" },
        { label: "develop", value: "develop" },
      ],
    },
  },
  explanation({ family }) {
    return family === "act"
      ? ["act 可以扩成 action, active, activity, actor。", "词族题最重要的是看句子里需要什么词性。"] 
      : ["develop 可以扩成 development, developed, developing。", "别只记一个词，要把变形方向连起来。"];
  },
  renderStage({ family }) {
    const items =
      family === "act"
        ? [
            { id: "verb", title: "act", summary: "动词原点。", accent: "#93c5fd" },
            { id: "noun", title: "action / activity", summary: "动作本身或活动。", accent: "#fdba74" },
            { id: "adj", title: "active", summary: "主动的、积极的。", accent: "#86efac" },
          ]
        : [
            { id: "verb", title: "develop", summary: "发展、开发。", accent: "#93c5fd" },
            { id: "noun", title: "development", summary: "发展、成果。", accent: "#fdba74" },
            { id: "adj", title: "developed / developing", summary: "已发展的 / 发展中的。", accent: "#86efac" },
          ];

    return createElement(ConceptBoard, {
      title: "词族扩展图",
      items,
    });
  },
};

const englishSentenceCompressionDemo: MixedDemo = {
  id: "english-sentence-compression",
  title: "长难句主干压缩",
  description: "先抽主干，再层层挂回修饰，帮助学生从“看不懂”变成“分层读”。",
  defaultParams: { step: "trunk" },
  presets: [
    { id: "trunk", label: "找主干", params: { step: "trunk" } },
    { id: "modifier", label: "挂修饰", params: { step: "modifier" } },
  ],
  controls: {
    step: {
      kind: "select",
      label: "拆句步骤",
      options: [
        { label: "找主干", value: "trunk" },
        { label: "挂修饰", value: "modifier" },
      ],
    },
  },
  explanation({ step }) {
    return step === "trunk"
      ? ["先只保留主语、谓语、宾语等核心骨架。", "别一开始就试图把每个定语从句都解释清楚。"] 
      : ["主干找稳之后，再把介词短语、从句、非谓语挂回去。", "这样复杂句会变得很有层次。"];
  },
  renderStage({ step }) {
    return createBoard("长难句压缩板", step === "trunk"
      ? [
          { id: "goal", title: "目标", summary: "先找最短可成立句。", accent: "#93c5fd" },
          { id: "items", title: "保留项", summary: "主语、谓语、宾语/表语。", accent: "#fdba74" },
          { id: "tip", title: "抓手", summary: "先别被长修饰干扰。", accent: "#86efac" },
        ]
      : [
          { id: "first", title: "先后顺序", summary: "先主干，后修饰。", accent: "#93c5fd" },
          { id: "modifier", title: "常见修饰", summary: "介词短语、从句、非谓语。", accent: "#fdba74" },
          { id: "tip", title: "抓手", summary: "一个修饰块一个修饰块地挂回去。", accent: "#86efac" },
        ]);
  },
};

const englishSynonymMapDemo: MixedDemo = {
  id: "english-synonym-semantic-map",
  title: "近义词语义坐标图",
  description: "把近义词放进语义强弱和语气差别里，而不是平铺地背一串意思。",
  defaultParams: { group: "happy" },
  presets: [
    { id: "happy", label: "happy 家族", params: { group: "happy" } },
    { id: "important", label: "important 家族", params: { group: "important" } },
  ],
  controls: {
    group: {
      kind: "select",
      label: "词义组",
      options: [
        { label: "happy 家族", value: "happy" },
        { label: "important 家族", value: "important" },
      ],
    },
  },
  explanation({ group }) {
    return group === "happy"
      ? ["happy、glad、delighted 不是完全等强度。", "近义词题最重要的是语气和场景。"] 
      : ["important、significant、vital 在正式程度和强调度上有差异。", "不要把近义词当成可无条件互换。"];
  },
  renderStage({ group }) {
    return createBoard("近义词语义板", group === "happy"
      ? [
          { id: "mild", title: "glad", summary: "较轻、日常。", accent: "#93c5fd" },
          { id: "base", title: "happy", summary: "基础高频词。", accent: "#fdba74" },
          { id: "strong", title: "delighted", summary: "情绪更强、更正式。", accent: "#86efac" },
        ]
      : [
          { id: "base", title: "important", summary: "基础范围最广。", accent: "#93c5fd" },
          { id: "formal", title: "significant", summary: "更书面，常带“重要且有影响”。", accent: "#fdba74" },
          { id: "strong", title: "vital", summary: "强度更高，接近“至关重要”。", accent: "#86efac" },
        ]);
  },
};

const englishNonfiniteDemo: MixedDemo = {
  id: "english-nonfinite-structure",
  title: "非谓语结构关系图",
  description: "把 doing、done、to do 的判断拉回“主动被动 + 时间关系 + 句法功能”。",
  defaultParams: { form: "doing" },
  presets: [
    { id: "doing", label: "doing", params: { form: "doing" } },
    { id: "done", label: "done", params: { form: "done" } },
    { id: "todo", label: "to do", params: { form: "todo" } },
  ],
  controls: {
    form: {
      kind: "select",
      label: "非谓语形式",
      options: [
        { label: "doing", value: "doing" },
        { label: "done", value: "done" },
        { label: "to do", value: "todo" },
      ],
    },
  },
  explanation({ form }) {
    const map: Record<string, string[]> = {
      doing: ["常和主动、进行或伴随有关。", "但最先还是看它在句中做什么功能。"],
      done: ["常和被动或完成感有关。", "判断时要特别看逻辑主语和动作承受关系。"],
      todo: ["常带将来、目的或待发生感。", "很多题先看是否在表达“为了……”或“将要……”。"],
    };
    return map[String(form)];
  },
  renderStage({ form }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      doing: [
        { id: "voice", title: "常见语态", summary: "主动。", accent: "#93c5fd" },
        { id: "time", title: "常见时间感", summary: "进行/伴随。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "先看功能，再看主动被动。", accent: "#86efac" },
      ],
      done: [
        { id: "voice", title: "常见语态", summary: "被动。", accent: "#93c5fd" },
        { id: "time", title: "常见时间感", summary: "完成或被处理后状态。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "逻辑主语常是动作承受者。", accent: "#86efac" },
      ],
      todo: [
        { id: "voice", title: "常见语态", summary: "多见主动，但也能带被动结构。", accent: "#93c5fd" },
        { id: "time", title: "常见时间感", summary: "将来/目的。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "很适合先问“是不是为了……”。", accent: "#86efac" },
      ],
    };
    return createBoard("非谓语判断板", items[String(form)]);
  },
};

const englishWritingUpgradeDemo: MixedDemo = {
  id: "english-writing-upgrade-workshop",
  title: "写作句型升级工坊",
  description: "把普通表达升级成更清晰、更有层次的表达，而不是只堆生词。",
  defaultParams: { strategy: "variety" },
  presets: [
    { id: "variety", label: "句型丰富", params: { strategy: "variety" } },
    { id: "logic", label: "逻辑连接", params: { strategy: "logic" } },
  ],
  controls: {
    strategy: {
      kind: "select",
      label: "升级策略",
      options: [
        { label: "句型丰富", value: "variety" },
        { label: "逻辑连接", value: "logic" },
      ],
    },
  },
  explanation({ strategy }) {
    return strategy === "variety"
      ? ["升级写作不只是换难词，也包括句型层次更丰富。", "简单句、并列句、从句适度穿插更自然。"] 
      : ["好作文的连贯感很大一部分来自逻辑连接。", "先让读者看懂关系，再谈修辞。"];
  },
  renderStage({ strategy }) {
    return createBoard("写作升级板", strategy === "variety"
      ? [
          { id: "base", title: "基础句", summary: "先把意思表达准确。", accent: "#93c5fd" },
          { id: "upgrade", title: "升级点", summary: "适度加入从句、非谓语、倒装等。", accent: "#fdba74" },
          { id: "tip", title: "抓手", summary: "变化要服务表达，不是炫技。", accent: "#86efac" },
        ]
      : [
          { id: "idea", title: "先定逻辑", summary: "并列、转折、因果、递进。", accent: "#93c5fd" },
          { id: "connector", title: "再选连接", summary: "让句间关系清楚可见。", accent: "#fdba74" },
          { id: "tip", title: "抓手", summary: "逻辑清楚比词更高级更重要。", accent: "#86efac" },
        ]);
  },
};

const englishReadingQuestionDemo: MixedDemo = {
  id: "english-reading-question-map",
  title: "阅读题型拆解",
  description: "先分清题目在问主旨、细节、推断还是词义，再决定阅读策略。",
  defaultParams: { question: "detail" },
  presets: [
    { id: "detail", label: "细节题", params: { question: "detail" } },
    { id: "inference", label: "推断题", params: { question: "inference" } },
    { id: "main", label: "主旨题", params: { question: "main" } },
  ],
  controls: {
    question: {
      kind: "select",
      label: "题型",
      options: [
        { label: "细节题", value: "detail" },
        { label: "推断题", value: "inference" },
        { label: "主旨题", value: "main" },
      ],
    },
  },
  explanation({ question }) {
    const map: Record<string, string[]> = {
      detail: ["细节题通常要关键词回文定位。", "真正考的是定位与同义替换。"],
      inference: ["推断题不是乱猜，而是基于文中证据作合逻辑延伸。", "常需要看语气和隐含立场。"],
      main: ["主旨题最该先回到段落/全文在“总体上讲什么”。", "不要抓某一个局部例子当答案。"],
    };
    return map[String(question)];
  },
  renderStage({ question }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      detail: [
        { id: "goal", title: "目标", summary: "找到原文对应信息。", accent: "#93c5fd" },
        { id: "method", title: "方法", summary: "关键词定位 + 同义替换。", accent: "#fdba74" },
        { id: "trap", title: "易错点", summary: "只看选项表面词，不回文核对。", accent: "#86efac" },
      ],
      inference: [
        { id: "goal", title: "目标", summary: "基于证据做合理推断。", accent: "#93c5fd" },
        { id: "method", title: "方法", summary: "看语气、态度、暗含关系。", accent: "#fdba74" },
        { id: "trap", title: "易错点", summary: "越过原文证据范围。", accent: "#86efac" },
      ],
      main: [
        { id: "goal", title: "目标", summary: "抓中心思想或最佳标题。", accent: "#93c5fd" },
        { id: "method", title: "方法", summary: "优先看主题句和全文共同指向。", accent: "#fdba74" },
        { id: "trap", title: "易错点", summary: "把例子或细节误当主旨。", accent: "#86efac" },
      ],
    };
    return createBoard("阅读题型策略板", items[String(question)]);
  },
};

const englishParagraphWritingDemo: MixedDemo = {
  id: "english-writing-paragraph-workshop",
  title: "作文段落展开工坊",
  description: "把段落从观点、解释、例子、回扣四层拆开，帮助学生稳定展开。",
  defaultParams: { layer: "topic" },
  presets: [
    { id: "topic", label: "主题句", params: { layer: "topic" } },
    { id: "support", label: "支撑句", params: { layer: "support" } },
    { id: "example", label: "例证句", params: { layer: "example" } },
  ],
  controls: {
    layer: {
      kind: "select",
      label: "段落层级",
      options: [
        { label: "主题句", value: "topic" },
        { label: "支撑句", value: "support" },
        { label: "例证句", value: "example" },
      ],
    },
  },
  explanation({ layer }) {
    const map: Record<string, string[]> = {
      topic: ["主题句先把段落核心观点亮出来。", "它是后面所有展开的锚点。"],
      support: ["支撑句解释为什么。", "这里最适合补原因、影响或对比。"],
      example: ["例证句让抽象观点落地。", "例子不是越多越好，而是要贴近观点。"],
    };
    return map[String(layer)];
  },
  renderStage({ layer }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      topic: [
        { id: "goal", title: "作用", summary: "先亮观点。", accent: "#93c5fd" },
        { id: "position", title: "常见位置", summary: "段首最清晰。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "一句话说清这一段想表达什么。", accent: "#86efac" },
      ],
      support: [
        { id: "goal", title: "作用", summary: "解释、扩展、论证。", accent: "#93c5fd" },
        { id: "position", title: "常见内容", summary: "原因、影响、对比。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "始终围绕主题句服务。", accent: "#86efac" },
      ],
      example: [
        { id: "goal", title: "作用", summary: "让观点更具体。", accent: "#93c5fd" },
        { id: "position", title: "常见内容", summary: "个人经历、社会案例、事实。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "例子要和主题直接对应。", accent: "#86efac" },
      ],
    };
    return createBoard("段落展开板", items[String(layer)]);
  },
};

const englishListeningDemo: MixedDemo = {
  id: "english-listening-capture",
  title: "听力信息捕捉流程图",
  description: "把听前预测、听中抓点、听后核对拆成流程，降低听力焦虑感。",
  defaultParams: { stage: "before" },
  presets: [
    { id: "before", label: "听前", params: { stage: "before" } },
    { id: "during", label: "听中", params: { stage: "during" } },
    { id: "after", label: "听后", params: { stage: "after" } },
  ],
  controls: {
    stage: {
      kind: "select",
      label: "流程阶段",
      options: [
        { label: "听前", value: "before" },
        { label: "听中", value: "during" },
        { label: "听后", value: "after" },
      ],
    },
  },
  explanation({ stage }) {
    const map: Record<string, string[]> = {
      before: ["听前先利用题干和选项做预测。", "这样听的时候更容易抓关键词。"],
      during: ["听中不要追逐每个词。", "更重要的是抓人物、时间、地点、态度和转折。"],
      after: ["听后要回到题目选项做快速核对。", "尤其注意有没有被干扰项带偏。"],
    };
    return map[String(stage)];
  },
  renderStage({ stage }) {
    const items: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      before: [
        { id: "predict", title: "先预测", summary: "看题干、选项、场景。", accent: "#93c5fd" },
        { id: "prepare", title: "定关注点", summary: "人物、时间、地点、数字。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "带着问题去听。", accent: "#86efac" },
      ],
      during: [
        { id: "focus", title: "抓关键信息", summary: "别强求逐词听懂。", accent: "#93c5fd" },
        { id: "signal", title: "盯逻辑信号", summary: "转折、因果、比较、建议。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "先抓主信息，再补细节。", accent: "#86efac" },
      ],
      after: [
        { id: "check", title: "回选项核对", summary: "看是否和听到的信息真正吻合。", accent: "#93c5fd" },
        { id: "trap", title: "排干扰项", summary: "特别防止半对半错。", accent: "#fdba74" },
        { id: "tip", title: "抓手", summary: "依据证据，不凭感觉。", accent: "#86efac" },
      ],
    };
    return createBoard("听力捕捉流程板", items[String(stage)]);
  },
};

const englishRootsDemo: MixedDemo = {
  id: "english-word-roots",
  title: "词根词缀网络",
  description: "把一个核心词根向外扩成词义家族，帮助学生建立联想网络。",
  defaultParams: { root: "spect" },
  presets: [
    { id: "spect", label: "spect", params: { root: "spect" } },
    { id: "struct", label: "struct", params: { root: "struct" } },
  ],
  controls: {
    root: {
      kind: "select",
      label: "核心词根",
      options: [
        { label: "spect", value: "spect" },
        { label: "struct", value: "struct" },
      ],
    },
  },
  explanation({ root }) {
    return root === "spect"
      ? ["spect 表示看。", "inspect、respect、spectator 这些词的差异，来自前缀和场景变化。"] 
      : ["struct 表示建造、结构。", "construct、destruction、infrastructure 可以沿着“搭建结构”的核心义串起来。"];
  },
  renderStage({ root }) {
    const items =
      root === "spect"
        ? [
            { id: "root", title: "spect", summary: "核心义：看。", accent: "#fdba74" },
            { id: "inspect", title: "inspect", summary: "in + spect，向里看，检查。", accent: "#93c5fd" },
            { id: "respect", title: "respect", summary: "re + spect，回头看，尊重。", accent: "#86efac" },
          ]
        : [
            { id: "root", title: "struct", summary: "核心义：搭建。", accent: "#fdba74" },
            { id: "construct", title: "construct", summary: "con + struct，一起搭建。", accent: "#93c5fd" },
            { id: "destruction", title: "destruction", summary: "de + struct，把结构拆掉。", accent: "#86efac" },
          ];

    return createElement(ConceptBoard, {
      title: "词根扩展网络",
      items,
    });
  },
};

const englishGrammarClozeDemo: MixedDemo = {
  id: "english-grammar-cloze-strategy",
  title: "语法填空决策流",
  description: "把“先看词性，再看句法位置，再看固定搭配”的判断顺序固定下来。",
  defaultParams: { blank: "verb" },
  presets: [
    { id: "verb", label: "动词空", params: { blank: "verb" } },
    { id: "nonfinite", label: "非谓语空", params: { blank: "nonfinite" } },
    { id: "connector", label: "连接词空", params: { blank: "connector" } },
  ],
  controls: {
    blank: {
      kind: "select",
      label: "空格类型",
      options: [
        { label: "动词空", value: "verb" },
        { label: "非谓语空", value: "nonfinite" },
        { label: "连接词空", value: "connector" },
      ],
    },
  },
  explanation({ blank }) {
    const steps: Record<string, string[]> = {
      verb: ["先找句子里有没有谓语缺口。", "再判断时态、语态与主谓一致。"],
      nonfinite: ["先确认主句谓语是否已经完整。", "再看作定语、状语还是宾补，判断 doing / done / to do。"],
      connector: ["先看前后句关系。", "递进、转折、因果、条件各有高频连接词。"],
    };

    return steps[String(blank)];
  },
  renderStage({ blank }) {
    const flow: Record<string, Array<{ id: string; title: string; summary: string; accent?: string }>> = {
      verb: [
        { id: "step1", title: "找谓语缺口", summary: "先看句子是不是少主要动作。", accent: "#93c5fd" },
        { id: "step2", title: "判时态语态", summary: "再判断完成时、被动语态等。", accent: "#fdba74" },
        { id: "step3", title: "核主谓一致", summary: "最后回头核对单复数。", accent: "#86efac" },
      ],
      nonfinite: [
        { id: "step1", title: "谓语是否完整", summary: "若主句谓语已齐，多半要考虑非谓语。", accent: "#93c5fd" },
        { id: "step2", title: "看逻辑主语", summary: "判断主动还是被动。", accent: "#fdba74" },
        { id: "step3", title: "定功能", summary: "再决定 doing、done 还是 to do。", accent: "#86efac" },
      ],
      connector: [
        { id: "step1", title: "看前后逻辑", summary: "先判断转折、并列、因果还是条件。", accent: "#93c5fd" },
        { id: "step2", title: "看句法位置", summary: "空前空后结构会限制可选词类。", accent: "#fdba74" },
        { id: "step3", title: "再选词", summary: "最后才从 however、because、if 等里挑。", accent: "#86efac" },
      ],
    };

    return createElement(ConceptBoard, {
      title: "语法填空决策流",
      items: flow[String(blank)],
    });
  },
};

export const demoRegistry = {
  "math/functions/linear": linearDemo,
  "math/functions/reciprocal": reciprocalDemo,
  "math/functions/exp-log": expLogDemo,
  "math/functions/power": powerDemo,
  "math/functions/quadratic-function": quadraticReferenceDemo,
  "math/functions/transform-review": transformReviewDemo,
  "math/trigonometry/sin-basic": sinBasicDemo,
  "math/trigonometry/sin-transform": sinTransformDemo,
  "math/trigonometry/cos-basic": cosBasicDemo,
  "math/trigonometry/tan-basic": tanBasicDemo,
  "math/sequences/sequences-basic": sequencesBasicDemo,
  "math/sequences/sequence-recursive": sequenceRecursiveDemo,
  "math/analytic-geometry/conic-overview": conicOverviewDemo,
  "math/analytic-geometry/circle-standard": circleStandardDemo,
  "math/analytic-geometry/ellipse-standard": ellipseStandardDemo,
  "math/analytic-geometry/hyperbola-standard": hyperbolaStandardDemo,
  "math/analytic-geometry/line-circle": lineCircleDemo,
  "math/analytic-geometry/line-conic-relation": lineConicRelationDemo,
  "math/analytic-geometry/parabola-standard": parabolaStandardDemo,
  "math/analytic-geometry/point-line-distance": pointLineDistanceDemo,
  "math/solid-geometry/solid-section": solidSectionDemo,
  "math/solid-geometry/solid-rotation": solidRotationDemo,
  "math/sets-logic/sets-basics": setsBasicsDemo,
  "math/sets-logic/set-operations": setOperationsDemo,
  "physics/motion/physics-uniform-motion": uniformMotionDemo,
  "physics/motion/physics-accelerated-motion": acceleratedMotionDemo,
  "physics/motion/physics-uniform-chase": uniformChaseDemo,
  "physics/motion/physics-mixed-chase": mixedChaseDemo,
  "physics/motion/physics-free-fall": freeFallDemo,
  "physics/motion/physics-projectile-motion": projectileDemo,
  "physics/motion/physics-motion-graphs": motionGraphsDemo,
  "physics/force/physics-force-composition": forceCompositionDemo,
  "physics/force/physics-newton-second-law": newtonSecondLawDemo,
  "physics/force/physics-force-balance": forceBalanceDemo,
  "physics/force/physics-friction": frictionDemo,
  "physics/force/physics-incline-motion": inclineMotionDemo,
  "physics/force/physics-connected-bodies": connectedBodiesDemo,
  "physics/force/physics-overweight-weightlessness": overweightWeightlessnessDemo,
  "physics/energy/physics-work-power": workPowerDemo,
  "physics/energy/physics-kinetic-energy": kineticEnergyDemo,
  "physics/energy/physics-mechanical-energy": mechanicalEnergyDemo,
  "physics/energy/physics-work-energy-synthesis": workEnergyDemo,
  "physics/electricity/physics-series-parallel": seriesParallelDemo,
  "physics/electricity/physics-ohms-law": ohmsLawDemo,
  "physics/wave/physics-vibration": vibrationDemo,
  "physics/wave/physics-wave-propagation": wavePropagationDemo,
  "chemistry/chemical-language/chemistry-material-classification": chemistryMaterialClassificationDemo,
  "chemistry/chemical-language/chemistry-dispersion-colloid": chemistryDispersionDemo,
  "chemistry/chemical-language/chemistry-mole": chemistryMoleDemo,
  "chemistry/reaction-principles/chemistry-ionic-reaction": chemistryIonicDemo,
  "chemistry/reaction-principles/chemistry-redox": chemistryRedoxDemo,
  "chemistry/elements-compounds/chemistry-sodium": chemistrySodiumDemo,
  "chemistry/elements-compounds/chemistry-chlorine": chemistryChlorineDemo,
  "chemistry/elements-compounds/chemistry-iron": chemistryIronDemo,
  "chemistry/experiments/chemistry-lab-devices": chemistryLabDevicesDemo,
  "chemistry/experiments/chemistry-ion-identification": chemistryIonIdentificationDemo,
  "english/sentence-structure/english-clause-hierarchy": englishClauseDemo,
  "english/sentence-structure/english-sentence-structure": englishSentenceStructureDemo,
  "english/sentence-structure/english-sentence-compression": englishSentenceCompressionDemo,
  "english/sentence-structure/english-reading-layer": englishReadingLayerDemo,
  "english/sentence-structure/english-tense-timeline": englishTenseTimelineDemo,
  "english/sentence-structure/english-nonfinite-structure": englishNonfiniteDemo,
  "english/sentence-structure/english-reading-question-map": englishReadingQuestionDemo,
  "english/sentence-structure/english-listening-capture": englishListeningDemo,
  "english/roots-vocabulary-network/english-affix-network": englishAffixNetworkDemo,
  "english/roots-vocabulary-network/english-logic-connector-map": englishLogicConnectorDemo,
  "english/roots-vocabulary-network/english-synonym-semantic-map": englishSynonymMapDemo,
  "english/roots-vocabulary-network/english-word-family-atlas": englishWordFamilyDemo,
  "english/roots-vocabulary-network/english-word-roots": englishRootsDemo,
  "english/roots-vocabulary-network/english-grammar-cloze-strategy": englishGrammarClozeDemo,
  "english/roots-vocabulary-network/english-writing-upgrade-workshop": englishWritingUpgradeDemo,
  "english/roots-vocabulary-network/english-writing-paragraph-workshop": englishParagraphWritingDemo,
} as const;

export function getDemoDefinition(
  subjectSlug: string,
  moduleSlug: string,
  unitSlug: string,
) {
  const key = `${subjectSlug}/${moduleSlug}/${unitSlug}` as keyof typeof demoRegistry;

  return (demoRegistry[key] ?? null) as DemoDefinition<DemoParams> | null;
}
