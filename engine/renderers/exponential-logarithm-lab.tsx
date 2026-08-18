"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ExponentialLogarithmLabProps = {
  base: number;
  inputX: number;
};

type PlotPoint = {
  x: number;
  y: number;
};

const VIEW_SIZE = 620;
const GRAPH = { left: 72, right: 566, top: 42, bottom: 536 };
const BOUNDS = { min: -3, max: 7 };
const INPUT_MIN = -1.5;
const INPUT_MAX = 1.5;
const ANIMATION_FRAME_INTERVAL = 1000 / 30;

function round(value: number, digits = 3) {
  const rounded = Number(value.toFixed(digits));
  return Object.is(rounded, -0) ? 0 : rounded;
}

function makePath(
  points: PlotPoint[],
  mapX: (value: number) => number,
  mapY: (value: number) => number,
) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${mapX(point.x)} ${mapY(point.y)}`)
    .join(" ");
}

function sampleCurve(
  fn: (value: number) => number,
  min: number,
  max: number,
  count = 320,
) {
  const points: PlotPoint[] = [];

  for (let index = 0; index <= count; index += 1) {
    const x = min + ((max - min) * index) / count;
    const y = fn(x);

    if (Number.isFinite(y) && y >= BOUNDS.min - 0.2 && y <= BOUNDS.max + 0.2) {
      points.push({ x, y });
    }
  }

  return points;
}

export function ExponentialLogarithmLab({ base, inputX }: ExponentialLogarithmLabProps) {
  const [motionX, setMotionX] = useState(inputX);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const frameRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const isValidBase = base > 0 && Math.abs(base - 1) > 0.001;
  const isGrowth = base > 1;

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

      const previous = previousTimeRef.current;
      const elapsed = time - previous;

      if (document.hidden || elapsed < ANIMATION_FRAME_INTERVAL) {
        if (document.hidden) previousTimeRef.current = time;
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      previousTimeRef.current = time - (elapsed % ANIMATION_FRAME_INTERVAL);
      const stepSeconds = Math.min(elapsed, 100) / 1000;
      setMotionX((current) => {
        const next = current + stepSeconds * 0.55 * speed;
        return next > INPUT_MAX ? INPUT_MIN : next;
      });
      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [isPlaying, speed]);

  const exponentialPoints = useMemo(() => {
    if (!isValidBase) {
      return sampleCurve(() => 1, BOUNDS.min, BOUNDS.max);
    }

    return sampleCurve((x) => base ** x, BOUNDS.min, BOUNDS.max);
  }, [base, isValidBase]);

  const logarithmPoints = useMemo(() => {
    if (!isValidBase) return [];
    return sampleCurve((x) => Math.log(x) / Math.log(base), 0.015, BOUNDS.max);
  }, [base, isValidBase]);

  const output = base ** motionX;
  const inverseOutput = isValidBase ? Math.log(output) / Math.log(base) : null;
  const mapX = (value: number) =>
    GRAPH.left + ((value - BOUNDS.min) / (BOUNDS.max - BOUNDS.min)) * (GRAPH.right - GRAPH.left);
  const mapY = (value: number) =>
    GRAPH.bottom - ((value - BOUNDS.min) / (BOUNDS.max - BOUNDS.min)) * (GRAPH.bottom - GRAPH.top);
  const pointP = { x: motionX, y: output };
  const pointQ = { x: output, y: motionX };
  const pointsVisible = output >= BOUNDS.min && output <= BOUNDS.max;
  const gridValues = [-2, 0, 1, 2, 4, 6];
  const ladderInputs = [-2, -1, 0, 1, 2];
  const reciprocalBase = base === 0 ? null : 1 / base;

  return (
    <figure className="expLogLab" data-playing={isPlaying} data-valid={isValidBase} aria-label="指数函数与对数函数互逆实验室">
      <div className="expLogLab__toolbar">
        <div>
          <span className="expLogLab__kicker">反函数镜像实验</span>
          <strong>把输入输出交换，再沿 y = x 折叠</strong>
        </div>
        <div className="expLogLab__playback" aria-label="动画播放控制">
          <button type="button" onClick={() => setIsPlaying((current) => !current)} aria-pressed={isPlaying}>
            <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
            {isPlaying ? "暂停追踪" : "播放输入变化"}
          </button>
          <label>
            <span>速度</span>
            <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
              <option value={0.5}>0.5×</option>
              <option value={1}>1×</option>
              <option value={2}>2×</option>
            </select>
          </label>
          <button type="button" className="expLogLab__ghostButton" onClick={() => {
            setIsPlaying(false);
            setMotionX(inputX);
          }}>
            回到滑块输入
          </button>
        </div>
      </div>

      <div className="expLogLab__equationRail">
        <span className="expLogLab__equationRailExp">指数：x → aˣ = {round(output)}</span>
        <span aria-hidden="true">交换坐标 ⇄</span>
        <span className="expLogLab__equationRailLog">对数：{round(output)} → logₐ {round(output)} = {inverseOutput === null ? "不存在" : round(inverseOutput)}</span>
      </div>

      {!isValidBase ? (
        <div className="expLogLab__notice" role="status">
          <strong>a = 1 是一个必须排除的底数。</strong>
          <span>虽然 1ˣ 始终等于 1，但不同输入都得到同一个输出，函数不可逆，因此不存在 `log₁x`。</span>
        </div>
      ) : null}

      <p className="expLogLab__mobileHint">图形区可左右滑动；橙色指数点与蓝色对数点互换坐标。</p>
      <div className="expLogLab__viewport">
        <svg viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`} className="expLogLab__svg" role="img" aria-label="指数曲线、对数曲线与 y 等于 x 的镜像关系">
          <defs>
            <clipPath id="exp-log-graph-clip">
              <rect x={GRAPH.left} y={GRAPH.top} width={GRAPH.right - GRAPH.left} height={GRAPH.bottom - GRAPH.top} rx="20" />
            </clipPath>
          </defs>

          <rect x="28" y="18" width="568" height="554" rx="30" className="expLogLab__paper" />

          <g clipPath="url(#exp-log-graph-clip)">
            {gridValues.map((value) => (
              <g key={`grid-${value}`}>
                <line x1={mapX(value)} x2={mapX(value)} y1={GRAPH.top} y2={GRAPH.bottom} className="expLogLab__grid" />
                <line x1={GRAPH.left} x2={GRAPH.right} y1={mapY(value)} y2={mapY(value)} className="expLogLab__grid" />
              </g>
            ))}
            <line x1={mapX(0)} x2={mapX(0)} y1={GRAPH.top} y2={GRAPH.bottom} className="expLogLab__axis expLogLab__axis--log" />
            <line x1={GRAPH.left} x2={GRAPH.right} y1={mapY(0)} y2={mapY(0)} className="expLogLab__axis expLogLab__axis--exp" />
            <line x1={mapX(BOUNDS.min)} x2={mapX(BOUNDS.max)} y1={mapY(BOUNDS.min)} y2={mapY(BOUNDS.max)} className="expLogLab__mirror" />

            <path d={makePath(exponentialPoints, mapX, mapY)} className={`expLogLab__curve ${isValidBase ? "expLogLab__curve--exp" : "expLogLab__curve--invalid"}`} />
            {isValidBase ? <path d={makePath(logarithmPoints, mapX, mapY)} className="expLogLab__curve expLogLab__curve--log" /> : null}

            {isValidBase && pointsVisible ? (
              <>
                <line x1={mapX(pointP.x)} y1={mapY(pointP.y)} x2={mapX(pointQ.x)} y2={mapY(pointQ.y)} className="expLogLab__reflectionLink" />
                <circle cx={mapX(pointP.x)} cy={mapY(pointP.y)} r="14" className="expLogLab__pointHalo expLogLab__pointHalo--exp" />
                <circle cx={mapX(pointQ.x)} cy={mapY(pointQ.y)} r="14" className="expLogLab__pointHalo expLogLab__pointHalo--log" />
                <circle cx={mapX(pointP.x)} cy={mapY(pointP.y)} r="6" className="expLogLab__point expLogLab__point--exp" />
                <circle cx={mapX(pointQ.x)} cy={mapY(pointQ.y)} r="6" className="expLogLab__point expLogLab__point--log" />
                <text x={mapX(pointP.x) + 10} y={mapY(pointP.y) - 11} className="expLogLab__pointLabel expLogLab__pointLabel--exp">P(x, aˣ)</text>
                <text x={mapX(pointQ.x) + 10} y={mapY(pointQ.y) + 19} className="expLogLab__pointLabel expLogLab__pointLabel--log">Q(aˣ, x)</text>
              </>
            ) : null}

            <circle cx={mapX(0)} cy={mapY(1)} r="4" className="expLogLab__anchor expLogLab__anchor--exp" />
            {isValidBase ? <circle cx={mapX(1)} cy={mapY(0)} r="4" className="expLogLab__anchor expLogLab__anchor--log" /> : null}
          </g>

          {gridValues.map((value) => (
            <g key={`labels-${value}`}>
              <text x={mapX(value)} y={mapY(0) + 20} textAnchor="middle" className="expLogLab__tick">{value}</text>
              {value !== 0 ? <text x={mapX(0) - 12} y={mapY(value) + 4} textAnchor="end" className="expLogLab__tick">{value}</text> : null}
            </g>
          ))}
          <text x={GRAPH.right} y={mapY(0) - 10} textAnchor="end" className="expLogLab__axisLabel">x</text>
          <text x={mapX(0) + 10} y={GRAPH.top + 14} className="expLogLab__axisLabel">y</text>
          <text x={mapX(4.8)} y={mapY(5.2)} className="expLogLab__mirrorLabel">y = x：交换输入与输出</text>
          <text x={mapX(0) + 8} y={mapY(1) - 9} className="expLogLab__anchorLabel">指数固定点 (0,1)</text>
          {isValidBase ? <text x={mapX(1) + 8} y={mapY(0) + 33} className="expLogLab__anchorLabel">对数固定点 (1,0)</text> : null}
        </svg>
      </div>

      <div className="expLogLab__readouts" aria-live={isPlaying ? "off" : "polite"}>
        <article className="expLogLab__readout--exp">
          <span>指数函数做什么</span>
          <strong>{round(base)}<sup>{round(motionX)}</sup> = {round(output)}</strong>
          <small>给出指数，求幂的结果</small>
        </article>
        <article className="expLogLab__readout--log">
          <span>对数函数反过来问</span>
          <strong>log<sub>{round(base)}</sub> {round(output)} = {inverseOutput === null ? "不存在" : round(inverseOutput)}</strong>
          <small>给出结果，追问指数是多少</small>
        </article>
        <article>
          <span>底数决定趋势</span>
          <strong>{!isValidBase ? "不可作为对数底数" : isGrowth ? "a > 1：两者递增" : "0 < a < 1：两者递减"}</strong>
          <small>{isValidBase ? `互为倒数的底数约为 ${round(reciprocalBase ?? 0)}` : "指数函数退化为水平线 y = 1"}</small>
        </article>
        <article>
          <span>定义域和值域交换</span>
          <strong>{"指数 y > 0 ⇄ 对数 x > 0"}</strong>
          <small>指数不碰 x 轴，对数不碰 y 轴</small>
        </article>
      </div>

      <div className="expLogLab__ladder" aria-label="指数增长阶梯">
        <div className="expLogLab__ladderHead">
          <strong>每当指数增加 1，函数值就乘一次 a</strong>
          <span>{isValidBase ? (isGrowth ? "重复乘法形成加速增长" : "乘以小于 1 的数形成衰减") : "a = 1 时每一步都停在 1"}</span>
        </div>
        <div className="expLogLab__ladderSteps">
          {ladderInputs.map((value) => (
            <article key={value}>
              <span>x = {value}</span>
              <strong>{round(base ** value)}</strong>
              <small>a<sup>{value}</sup></small>
            </article>
          ))}
        </div>
      </div>

      <figcaption className="expLogLab__caption">
        <span><i className="expLogLab__legendDot expLogLab__legendDot--exp" />y = aˣ</span>
        <span><i className="expLogLab__legendDot expLogLab__legendDot--log" />y = logₐx</span>
        <span><i className="expLogLab__legendLine" />y = x 镜面</span>
        <span>拖动输入 x，观察 P 与 Q 如何交换横纵坐标</span>
      </figcaption>
    </figure>
  );
}
