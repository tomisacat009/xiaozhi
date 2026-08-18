"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CompositeFunctionLabProps = {
  family: string;
  amplitude: number;
  horizontalShift: number;
  verticalShift: number;
  probeX: number;
};

type FunctionFamily =
  | "hook"
  | "absolute"
  | "absolute-quadratic"
  | "reciprocal"
  | "square-root"
  | "logarithm";

type PlotPoint = { x: number; y: number };

const VIEW = { width: 720, height: 520 };
const GRAPH = { left: 70, right: 670, top: 38, bottom: 468 };
const BOUNDS = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 };
const PROBE_MIN = -5.5;
const PROBE_MAX = 5.5;
const ANIMATION_FRAME_INTERVAL = 1000 / 30;

const FAMILY_META: Record<FunctionFamily, {
  title: string;
  shortFormula: string;
  idea: string;
  base: (value: number) => number;
  valid: (value: number) => boolean;
}> = {
  hook: {
    title: "对勾函数",
    shortFormula: "g(u) = u + 1/u",
    idea: "一次项负责远处走势，倒数项制造中间断点与两侧转折。",
    base: (value) => value + 1 / value,
    valid: (value) => Math.abs(value) > 0.025,
  },
  absolute: {
    title: "绝对值一次函数",
    shortFormula: "g(u) = |u|",
    idea: "绝对值把负半轴折到上方，形成一个尖锐顶点。",
    base: (value) => Math.abs(value),
    valid: () => true,
  },
  "absolute-quadratic": {
    title: "二次函数的绝对值",
    shortFormula: "g(u) = |u² - 1|",
    idea: "先画抛物线，再把 x 轴下方的部分向上翻折。",
    base: (value) => Math.abs(value * value - 1),
    valid: () => true,
  },
  reciprocal: {
    title: "平移后的反比例函数",
    shortFormula: "g(u) = 1/u",
    idea: "括号内平移竖直渐近线，括号外常数平移水平渐近线。",
    base: (value) => 1 / value,
    valid: (value) => Math.abs(value) > 0.025,
  },
  "square-root": {
    title: "根式复合函数",
    shortFormula: "g(u) = √u",
    idea: "被开方数先限制定义域，图像只能从端点向右出发。",
    base: (value) => Math.sqrt(value),
    valid: (value) => value >= 0,
  },
  logarithm: {
    title: "对数平移函数",
    shortFormula: "g(u) = log₂u",
    idea: "真数必须为正，边界处形成永远不能碰到的竖直渐近线。",
    base: (value) => Math.log2(value),
    valid: (value) => value > 0.025,
  },
};

function isFunctionFamily(value: string): value is FunctionFamily {
  return value in FAMILY_META;
}

function round(value: number, digits = 2) {
  const result = Number(value.toFixed(digits));
  return Object.is(result, -0) ? 0 : result;
}

function signed(value: number) {
  if (value === 0) return "";
  return value > 0 ? ` + ${round(value)}` : ` − ${Math.abs(round(value))}`;
}

function shiftedVariable(horizontalShift: number) {
  if (horizontalShift === 0) return "x";
  return horizontalShift > 0
    ? `(x − ${round(horizontalShift)})`
    : `(x + ${Math.abs(round(horizontalShift))})`;
}

function formulaFor(
  family: FunctionFamily,
  amplitude: number,
  horizontalShift: number,
  verticalShift: number,
) {
  const u = shiftedVariable(horizontalShift);
  const a = amplitude === 1 ? "" : amplitude === -1 ? "−" : `${round(amplitude)}·`;
  const core = {
    hook: `[${u} + 1/${u}]`,
    absolute: `|${u}|`,
    "absolute-quadratic": `|${u}² − 1|`,
    reciprocal: `1/${u}`,
    "square-root": `√${u}`,
    logarithm: `log₂${u}`,
  }[family];

  return `y = ${a}${core}${signed(verticalShift)}`;
}

function domainFor(family: FunctionFamily, horizontalShift: number) {
  const h = round(horizontalShift);
  if (family === "hook" || family === "reciprocal") return `x ≠ ${h}`;
  if (family === "square-root") return `x ≥ ${h}`;
  if (family === "logarithm") return `x > ${h}`;
  return "x ∈ ℝ";
}

function rangeFor(family: FunctionFamily, amplitude: number, verticalShift: number) {
  const d = round(verticalShift);
  if (amplitude === 0) return `y = ${d}（定义域内）`;
  if (family === "hook") {
    const gap = round(2 * Math.abs(amplitude));
    return `y ≤ ${round(d - gap)} 或 y ≥ ${round(d + gap)}`;
  }
  if (family === "absolute" || family === "absolute-quadratic" || family === "square-root") {
    return amplitude > 0 ? `y ≥ ${d}` : `y ≤ ${d}`;
  }
  if (family === "reciprocal") return `y ≠ ${d}`;
  return "y ∈ ℝ";
}

function featureFor(
  family: FunctionFamily,
  amplitude: number,
  horizontalShift: number,
  verticalShift: number,
) {
  const h = round(horizontalShift);
  const d = round(verticalShift);
  if (family === "hook") {
    return `断点 x=${h}；转折横坐标 x=${round(horizontalShift - 1)}、${round(horizontalShift + 1)}`;
  }
  if (family === "absolute") return `顶点 (${h}, ${d})；关于 x=${h} 对称`;
  if (family === "absolute-quadratic") {
    return `零点横坐标 ${round(horizontalShift - 1)}、${round(horizontalShift + 1)}；中间发生翻折`;
  }
  if (family === "reciprocal") return `渐近线 x=${h}、y=${d}；中心 (${h}, ${d})`;
  if (family === "square-root") return `端点 (${h}, ${d})；只向右延伸`;
  return `竖直渐近线 x=${h}；经过 (${round(horizontalShift + 1)}, ${d})`;
}

function mapX(value: number) {
  return GRAPH.left + ((value - BOUNDS.xMin) / (BOUNDS.xMax - BOUNDS.xMin)) * (GRAPH.right - GRAPH.left);
}

function mapY(value: number) {
  return GRAPH.bottom - ((value - BOUNDS.yMin) / (BOUNDS.yMax - BOUNDS.yMin)) * (GRAPH.bottom - GRAPH.top);
}

function samplePaths(
  fn: (x: number) => number,
  valid: (x: number) => boolean,
  mapX: (value: number) => number,
  mapY: (value: number) => number,
) {
  const segments: PlotPoint[][] = [];
  let current: PlotPoint[] = [];
  let previousY: number | null = null;
  const samples = 520;

  for (let index = 0; index <= samples; index += 1) {
    const x = BOUNDS.xMin + ((BOUNDS.xMax - BOUNDS.xMin) * index) / samples;
    const y = valid(x) ? fn(x) : Number.NaN;
    const outside = !Number.isFinite(y) || y < BOUNDS.yMin - 0.4 || y > BOUNDS.yMax + 0.4;
    const discontinuous = previousY !== null && Math.abs(y - previousY) > 1.2;

    if (outside || discontinuous) {
      if (current.length > 1) segments.push(current);
      current = [];
      previousY = null;
      continue;
    }

    current.push({ x, y });
    previousY = y;
  }

  if (current.length > 1) segments.push(current);

  return segments.map((segment) =>
    segment
      .map((point, index) => `${index === 0 ? "M" : "L"} ${round(mapX(point.x), 3)} ${round(mapY(point.y), 3)}`)
      .join(" "),
  );
}

export function CompositeFunctionLab({
  family: rawFamily,
  amplitude,
  horizontalShift,
  verticalShift,
  probeX,
}: CompositeFunctionLabProps) {
  const family: FunctionFamily = isFunctionFamily(rawFamily) ? rawFamily : "hook";
  const meta = FAMILY_META[family];
  const [motionX, setMotionX] = useState(probeX);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const frameRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      previousTimeRef.current = null;
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      return;
    }

    function animate(time: number) {
      if (previousTimeRef.current === null) {
        previousTimeRef.current = time;
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = time - previousTimeRef.current;
      if (document.hidden || elapsed < ANIMATION_FRAME_INTERVAL) {
        if (document.hidden) previousTimeRef.current = time;
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      previousTimeRef.current = time - (elapsed % ANIMATION_FRAME_INTERVAL);
      const stepSeconds = Math.min(elapsed, 100) / 1000;
      setMotionX((current) => {
        let next = current + stepSeconds * 0.75 * speed;
        if (next > PROBE_MAX) next = PROBE_MIN;

        const nextInput = next - horizontalShift;
        if (!meta.valid(nextInput)) {
          if (family === "square-root") next = horizontalShift;
          else next = horizontalShift + 0.05;
        }
        return next;
      });
      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [family, horizontalShift, isPlaying, meta, speed]);

  const paths = useMemo(() => {
    const basePaths = samplePaths(meta.base, meta.valid, mapX, mapY);
    const transformedPaths = samplePaths(
      (x) => amplitude * meta.base(x - horizontalShift) + verticalShift,
      (x) => meta.valid(x - horizontalShift),
      mapX,
      mapY,
    );
    return { basePaths, transformedPaths };
  }, [amplitude, horizontalShift, meta, verticalShift]);

  const displayX = isPlaying ? motionX : probeX;
  const inputU = displayX - horizontalShift;
  const validProbe = meta.valid(inputU);
  const baseValue = validProbe ? meta.base(inputU) : null;
  const scaledValue = baseValue === null ? null : amplitude * baseValue;
  const output = scaledValue === null ? null : scaledValue + verticalShift;
  const pointVisible = output !== null && output >= BOUNDS.yMin && output <= BOUNDS.yMax;
  const ticks = [-6, -4, -2, 0, 2, 4, 6];
  const needsBoundary = family === "hook" || family === "reciprocal" || family === "logarithm";
  const hasForbiddenRegion = family === "square-root" || family === "logarithm";
  const equation = formulaFor(family, amplitude, horizontalShift, verticalShift);

  function togglePlayback() {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    setMotionX(probeX);
    setIsPlaying(true);
  }

  return (
    <figure className="compositeLab" data-family={family} data-playing={isPlaying} aria-label="常见复合与组合函数实验室">
      <div className="compositeLab__toolbar">
        <div>
          <span className="compositeLab__kicker">函数加工实验室</span>
          <strong>{meta.title}：从基本函数逐步加工</strong>
        </div>
        <div className="compositeLab__playback" aria-label="探针动画控制">
          <button type="button" onClick={togglePlayback} aria-pressed={isPlaying}>
            <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
            {isPlaying ? "暂停探针" : "播放定义域巡游"}
          </button>
          <label>
            <span>速度</span>
            <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
              <option value={0.5}>0.5×</option>
              <option value={1}>1×</option>
              <option value={2}>2×</option>
            </select>
          </label>
          <button type="button" className="compositeLab__ghostButton" onClick={() => {
            setIsPlaying(false);
            setMotionX(probeX);
          }}>
            回到滑块探针
          </button>
        </div>
      </div>

      <div className="compositeLab__equationRail">
        <span>{meta.shortFormula}</span>
        <strong>{equation}</strong>
      </div>

      <div className="compositeLab__pipeline" aria-label="函数加工顺序">
        <article>
          <span>① 输入</span>
          <strong>x = {round(displayX)}</strong>
        </article>
        <i aria-hidden="true">→</i>
        <article>
          <span>② 括号内先做</span>
          <strong>u = x − h = {round(inputU)}</strong>
        </article>
        <i aria-hidden="true">→</i>
        <article data-invalid={!validProbe}>
          <span>③ 进入基本函数</span>
          <strong>{baseValue === null ? "此处无定义" : `g(u) = ${round(baseValue)}`}</strong>
        </article>
        <i aria-hidden="true">→</i>
        <article data-invalid={!validProbe}>
          <span>④ 乘 A，再加 d</span>
          <strong>{output === null ? "无法继续计算" : `y = ${round(output)}`}</strong>
        </article>
      </div>

      {!validProbe ? (
        <div className="compositeLab__notice" role="status">
          <strong>当前探针碰到了定义域限制。</strong>
          <span>先检查 `x−h` 能否进入基本函数；没有定义的输入不能继续代入。</span>
        </div>
      ) : null}

      <p className="compositeLab__mobileHint">图形区可左右滑动；虚线是基本函数，实线是参数加工后的函数。</p>
      <div className="compositeLab__viewport">
        <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} className="compositeLab__svg" role="img" aria-label={`${meta.title}的基本图像、变换图像与定义域限制`}>
          <defs>
            <clipPath id="composite-function-graph-clip">
              <rect x={GRAPH.left} y={GRAPH.top} width={GRAPH.right - GRAPH.left} height={GRAPH.bottom - GRAPH.top} rx="18" />
            </clipPath>
          </defs>
          <rect x="22" y="16" width="676" height="482" rx="28" className="compositeLab__paper" />
          <g clipPath="url(#composite-function-graph-clip)">
            {ticks.map((value) => (
              <g key={`grid-${value}`}>
                <line x1={mapX(value)} x2={mapX(value)} y1={GRAPH.top} y2={GRAPH.bottom} className="compositeLab__grid" />
                <line x1={GRAPH.left} x2={GRAPH.right} y1={mapY(value)} y2={mapY(value)} className="compositeLab__grid" />
              </g>
            ))}
            {hasForbiddenRegion ? (
              <rect x={GRAPH.left} y={GRAPH.top} width={Math.max(0, mapX(horizontalShift) - GRAPH.left)} height={GRAPH.bottom - GRAPH.top} className="compositeLab__forbidden" />
            ) : null}
            <line x1={mapX(0)} x2={mapX(0)} y1={GRAPH.top} y2={GRAPH.bottom} className="compositeLab__axis" />
            <line x1={GRAPH.left} x2={GRAPH.right} y1={mapY(0)} y2={mapY(0)} className="compositeLab__axis" />

            {paths.basePaths.map((path, index) => <path key={`base-${index}`} d={path} className="compositeLab__curve compositeLab__curve--base" />)}

            {needsBoundary ? (
              <line x1={mapX(horizontalShift)} x2={mapX(horizontalShift)} y1={GRAPH.top} y2={GRAPH.bottom} className="compositeLab__asymptote" />
            ) : null}
            {family === "reciprocal" ? (
              <line x1={GRAPH.left} x2={GRAPH.right} y1={mapY(verticalShift)} y2={mapY(verticalShift)} className="compositeLab__asymptote" />
            ) : null}
            {family === "hook" ? (
              <line x1={GRAPH.left} x2={GRAPH.right} y1={mapY(amplitude * (BOUNDS.xMin - horizontalShift) + verticalShift)} y2={mapY(amplitude * (BOUNDS.xMax - horizontalShift) + verticalShift)} className="compositeLab__asymptote compositeLab__asymptote--slant" />
            ) : null}

            {paths.transformedPaths.map((path, index) => <path key={`result-${index}`} d={path} className="compositeLab__curve compositeLab__curve--result" />)}
            <line x1={mapX(displayX)} x2={mapX(displayX)} y1={GRAPH.top} y2={GRAPH.bottom} className={`compositeLab__probeLine ${validProbe ? "" : "compositeLab__probeLine--invalid"}`} />
            {validProbe && pointVisible ? (
              <>
                <circle cx={mapX(displayX)} cy={mapY(output as number)} r="12" className="compositeLab__pointHalo" />
                <circle cx={mapX(displayX)} cy={mapY(output as number)} r="5.5" className="compositeLab__point" />
              </>
            ) : null}
            {(family === "square-root" || family === "absolute") ? (
              <circle cx={mapX(horizontalShift)} cy={mapY(verticalShift)} r="5" className="compositeLab__keyPoint" />
            ) : null}
            {family === "absolute-quadratic" ? (
              <>
                <circle cx={mapX(horizontalShift - 1)} cy={mapY(verticalShift)} r="5" className="compositeLab__keyPoint" />
                <circle cx={mapX(horizontalShift + 1)} cy={mapY(verticalShift)} r="5" className="compositeLab__keyPoint" />
              </>
            ) : null}
          </g>

          {ticks.map((value) => (
            <g key={`label-${value}`}>
              <text x={mapX(value)} y={mapY(0) + 20} textAnchor="middle" className="compositeLab__tick">{value}</text>
              {value !== 0 ? <text x={mapX(0) - 11} y={mapY(value) + 4} textAnchor="end" className="compositeLab__tick">{value}</text> : null}
            </g>
          ))}
          <text x={GRAPH.right - 4} y={mapY(0) - 10} textAnchor="end" className="compositeLab__axisLabel">x</text>
          <text x={mapX(0) + 10} y={GRAPH.top + 14} className="compositeLab__axisLabel">y</text>
          {hasForbiddenRegion ? <text x={Math.max(GRAPH.left + 12, mapX(horizontalShift) - 96)} y={GRAPH.top + 26} className="compositeLab__forbiddenLabel">不可取区域</text> : null}
        </svg>
      </div>

      <div className="compositeLab__readouts" aria-live={isPlaying ? "off" : "polite"}>
        <article>
          <span>定义域先行</span>
          <strong>{domainFor(family, horizontalShift)}</strong>
          <small>先看括号内的输入能不能进入基本函数</small>
        </article>
        <article>
          <span>值域</span>
          <strong>{rangeFor(family, amplitude, verticalShift)}</strong>
          <small>A 决定翻转与伸缩，d 决定整体升降</small>
        </article>
        <article>
          <span>关键位置</span>
          <strong>{featureFor(family, amplitude, horizontalShift, verticalShift)}</strong>
          <small>关键点和渐近线会跟着 h、d 同步移动</small>
        </article>
        <article>
          <span>图像记忆</span>
          <strong>{meta.idea}</strong>
          <small>不要从零描点，先认出基本函数再做变换</small>
        </article>
      </div>

      <figcaption className="compositeLab__caption">
        <span><i className="compositeLab__legendLine compositeLab__legendLine--base" />基本函数 g(x)</span>
        <span><i className="compositeLab__legendLine compositeLab__legendLine--result" />变换后 {equation}</span>
        <span><i className="compositeLab__legendLine compositeLab__legendLine--boundary" />定义域边界或渐近线</span>
      </figcaption>
    </figure>
  );
}
