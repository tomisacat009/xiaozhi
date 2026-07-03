import { createElement } from "react";

import { sampleQuadratic } from "@/engine/core/math";
import type { DemoDefinition, DemoParams } from "@/engine/core/types";
import { CartesianPlot, ConceptBoard } from "@/engine/renderers/cartesian-plot";
import { QuadraticSvg } from "@/engine/renderers/quadratic-svg";

type NumericDemo = DemoDefinition<Record<string, number>>;
type MixedDemo = DemoDefinition<Record<string, number | string>>;

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
  "math/trigonometry/sin-basic": sinBasicDemo,
  "math/trigonometry/sin-transform": sinTransformDemo,
  "math/trigonometry/cos-basic": cosBasicDemo,
  "math/trigonometry/tan-basic": tanBasicDemo,
  "math/analytic-geometry/line-circle": lineCircleDemo,
  "math/analytic-geometry/parabola-standard": parabolaStandardDemo,
  "physics/motion/physics-uniform-motion": uniformMotionDemo,
  "physics/motion/physics-accelerated-motion": acceleratedMotionDemo,
  "physics/motion/physics-projectile-motion": projectileDemo,
  "physics/force/physics-force-composition": forceCompositionDemo,
  "physics/force/physics-newton-second-law": newtonSecondLawDemo,
  "physics/energy/physics-work-energy-synthesis": workEnergyDemo,
  "chemistry/chemical-language/chemistry-mole": chemistryMoleDemo,
  "chemistry/reaction-principles/chemistry-ionic-reaction": chemistryIonicDemo,
  "chemistry/reaction-principles/chemistry-redox": chemistryRedoxDemo,
  "chemistry/experiments/chemistry-ion-identification": chemistryIonIdentificationDemo,
  "english/sentence-structure/english-clause-hierarchy": englishClauseDemo,
  "english/roots-vocabulary-network/english-word-roots": englishRootsDemo,
  "english/roots-vocabulary-network/english-grammar-cloze-strategy": englishGrammarClozeDemo,
} as const;

export function getDemoDefinition(
  subjectSlug: string,
  moduleSlug: string,
  unitSlug: string,
) {
  const key = `${subjectSlug}/${moduleSlug}/${unitSlug}` as keyof typeof demoRegistry;

  return (demoRegistry[key] ?? null) as DemoDefinition<DemoParams> | null;
}
