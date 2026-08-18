"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type UniformlyAcceleratedMotionLabProps = {
  s0: number;
  v0: number;
  a: number;
  t: number;
  interval: number;
};

type Point = { x: number; y: number };

const MAX_TIME = 6;
const FRAME_INTERVAL = 1000 / 30;
const GRAPH = { width: 360, height: 220, left: 46, right: 16, top: 24, bottom: 38 };

function round(value: number, digits = 2) {
  const result = Number(value.toFixed(digits));
  return Object.is(result, -0) ? 0 : result;
}

function positionAt(s0: number, v0: number, a: number, time: number) {
  return s0 + v0 * time + 0.5 * a * time * time;
}

function velocityAt(v0: number, a: number, time: number) {
  return v0 + a * time;
}

function sample(fn: (time: number) => number, step = 0.05) {
  const points: Point[] = [];
  for (let time = 0; time <= MAX_TIME + 1e-8; time += step) {
    const safeTime = Math.min(MAX_TIME, round(time, 3));
    points.push({ x: safeTime, y: fn(safeTime) });
  }
  return points;
}

function graphBounds(values: number[]) {
  const rawMin = Math.min(0, ...values);
  const rawMax = Math.max(0, ...values);
  const span = Math.max(1, rawMax - rawMin);
  const padding = span * 0.12;
  return {
    min: Math.floor((rawMin - padding) * 2) / 2,
    max: Math.ceil((rawMax + padding) * 2) / 2,
  };
}

function pathFrom(points: Point[], mapX: (value: number) => number, mapY: (value: number) => number) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${round(mapX(point.x), 3)} ${round(mapY(point.y), 3)}`)
    .join(" ");
}

function statusFor(velocity: number, acceleration: number) {
  if (Math.abs(acceleration) < 0.001) return "匀速：速度没有变化";
  if (Math.abs(velocity) < 0.08) return "转向临界：此刻速度约为 0";
  if (velocity * acceleration > 0) return "加速：速度与加速度同向";
  return "减速：速度与加速度反向";
}

function GraphPanel({
  title,
  ariaLabel,
  yLabel,
  color,
  points,
  currentTime,
  currentValue,
  insight,
  areaLabel,
  tangentSlope,
}: {
  title: string;
  ariaLabel: string;
  yLabel: string;
  color: string;
  points: Point[];
  currentTime: number;
  currentValue: number;
  insight: string;
  areaLabel?: string;
  tangentSlope?: number;
}) {
  const bounds = graphBounds(points.map((point) => point.y));
  const innerWidth = GRAPH.width - GRAPH.left - GRAPH.right;
  const innerHeight = GRAPH.height - GRAPH.top - GRAPH.bottom;
  const mapX = (value: number) => GRAPH.left + (value / MAX_TIME) * innerWidth;
  const mapY = (value: number) => GRAPH.height - GRAPH.bottom - ((value - bounds.min) / (bounds.max - bounds.min)) * innerHeight;
  const xTicks = [0, 1, 2, 3, 4, 5, 6];
  const yTicks = [bounds.min, (bounds.min + bounds.max) / 2, bounds.max];
  const visiblePoints = points.filter((point) => point.x <= currentTime);
  if (visiblePoints.length === 0 || visiblePoints.at(-1)?.x !== currentTime) {
    visiblePoints.push({ x: currentTime, y: currentValue });
  }
  const areaPath = areaLabel
    ? `M ${mapX(0)} ${mapY(0)} ${visiblePoints.map((point) => `L ${mapX(point.x)} ${mapY(point.y)}`).join(" ")} L ${mapX(currentTime)} ${mapY(0)} Z`
    : null;
  const tangentStart = Math.max(0, currentTime - 0.75);
  const tangentEnd = Math.min(MAX_TIME, currentTime + 0.75);

  return (
    <figure className="acceleratedLab__graphCard">
      <div className="acceleratedLab__graphHead">
        <strong>{title}</strong>
        <span>{insight}</span>
      </div>
      <svg viewBox={`0 0 ${GRAPH.width} ${GRAPH.height}`} role="img" aria-label={ariaLabel} className="acceleratedLab__graphSvg">
        <rect x="1" y="1" width={GRAPH.width - 2} height={GRAPH.height - 2} rx="17" className="acceleratedLab__graphPaper" />
        {xTicks.map((value) => (
          <g key={`x-${value}`}>
            <line x1={mapX(value)} x2={mapX(value)} y1={GRAPH.top} y2={GRAPH.height - GRAPH.bottom} className="acceleratedLab__gridLine" />
            <text x={mapX(value)} y={GRAPH.height - 18} textAnchor="middle" className="acceleratedLab__tick">{value}</text>
          </g>
        ))}
        {yTicks.map((value) => (
          <g key={`y-${value}`}>
            <line x1={GRAPH.left} x2={GRAPH.width - GRAPH.right} y1={mapY(value)} y2={mapY(value)} className="acceleratedLab__gridLine" />
            <text x={GRAPH.left - 7} y={mapY(value) + 4} textAnchor="end" className="acceleratedLab__tick">{round(value, 1)}</text>
          </g>
        ))}
        <line x1={GRAPH.left} x2={GRAPH.width - GRAPH.right} y1={mapY(0)} y2={mapY(0)} className="acceleratedLab__axisLine" />
        <line x1={GRAPH.left} x2={GRAPH.left} y1={GRAPH.top} y2={GRAPH.height - GRAPH.bottom} className="acceleratedLab__axisLine" />
        {areaPath ? <path d={areaPath} className="acceleratedLab__area" style={{ color }} /> : null}
        <path d={pathFrom(points, mapX, mapY)} className="acceleratedLab__curve" style={{ color }} />
        {tangentSlope !== undefined ? (
          <line
            x1={mapX(tangentStart)}
            y1={mapY(currentValue + tangentSlope * (tangentStart - currentTime))}
            x2={mapX(tangentEnd)}
            y2={mapY(currentValue + tangentSlope * (tangentEnd - currentTime))}
            className="acceleratedLab__tangent"
          />
        ) : null}
        <line x1={mapX(currentTime)} x2={mapX(currentTime)} y1={GRAPH.top} y2={GRAPH.height - GRAPH.bottom} className="acceleratedLab__timeGuide" />
        <circle cx={mapX(currentTime)} cy={mapY(currentValue)} r="8" className="acceleratedLab__pointHalo" />
        <circle cx={mapX(currentTime)} cy={mapY(currentValue)} r="4.5" className="acceleratedLab__point" />
        {areaLabel && currentTime > 0.05 ? <text x={(mapX(0) + mapX(currentTime)) / 2} y={mapY(0) - 8} textAnchor="middle" className="acceleratedLab__areaLabel">{areaLabel}</text> : null}
        <text x={GRAPH.width - GRAPH.right} y={GRAPH.height - 5} textAnchor="end" className="acceleratedLab__axisTitle">t</text>
        <text x="12" y={GRAPH.top + 4} className="acceleratedLab__axisTitle">{yLabel}</text>
      </svg>
      <figcaption>
        <span>横轴：t（时间）</span>
        <span>纵轴：{yLabel}</span>
      </figcaption>
    </figure>
  );
}

export function UniformlyAcceleratedMotionLab({ s0, v0, a, t, interval }: UniformlyAcceleratedMotionLabProps) {
  const [motionTime, setMotionTime] = useState(t);
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
      if (document.hidden || elapsed < FRAME_INTERVAL) {
        if (document.hidden) previousTimeRef.current = time;
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      previousTimeRef.current = time - (elapsed % FRAME_INTERVAL);
      const stepSeconds = Math.min(elapsed, 100) / 1000;
      setMotionTime((current) => {
        const next = current + stepSeconds * 0.8 * speed;
        return next > MAX_TIME ? 0 : next;
      });
      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [isPlaying, speed]);

  const displayTime = isPlaying ? motionTime : t;
  const position = positionAt(s0, v0, a, displayTime);
  const displacement = position - s0;
  const velocity = velocityAt(v0, a, displayTime);
  const velocityChange = velocity - v0;
  const averageVelocity = displayTime > 0 ? displacement / displayTime : v0;
  const status = statusFor(velocity, a);
  const stopTime = Math.abs(a) > 0.001 ? -v0 / a : null;
  const hasTurnInWindow = stopTime !== null && stopTime > 0 && stopTime < MAX_TIME;

  const positionPoints = useMemo(() => sample((time) => positionAt(s0, v0, a, time)), [a, s0, v0]);
  const velocityPoints = useMemo(() => sample((time) => velocityAt(v0, a, time)), [a, v0]);
  const accelerationPoints = useMemo(() => sample(() => a), [a]);

  const intervalData = useMemo(() => {
    const count = Math.floor(MAX_TIME / interval + 1e-8);
    return Array.from({ length: count }, (_, index) => {
      const start = index * interval;
      const end = Math.min(MAX_TIME, (index + 1) * interval);
      const startPosition = positionAt(s0, v0, a, start);
      const endPosition = positionAt(s0, v0, a, end);
      const delta = endPosition - startPosition;
      const previousDelta = index === 0
        ? null
        : startPosition - positionAt(s0, v0, a, start - interval);
      return {
        index,
        start,
        end,
        startPosition,
        endPosition,
        delta,
        deltaDifference: previousDelta === null ? null : delta - previousDelta,
      };
    });
  }, [a, interval, s0, v0]);

  const trackBounds = graphBounds(positionPoints.map((point) => point.y));
  const trackMap = (value: number) => 56 + ((value - trackBounds.min) / (trackBounds.max - trackBounds.min)) * 648;
  const trackSamples = [
    { time: 0, position: s0 },
    ...intervalData.map((entry) => ({ time: entry.end, position: entry.endPosition })),
  ];
  const currentTrackX = trackMap(position);

  function togglePlayback() {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setMotionTime(t);
    setIsPlaying(true);
  }

  return (
    <figure className="acceleratedLab" data-playing={isPlaying} aria-label="匀变速直线运动同步实验室">
      <div className="acceleratedLab__toolbar">
        <div>
          <span className="acceleratedLab__kicker">打点计时器 · 同步图像实验</span>
          <strong>每隔相同时间打一个点，看速度如何变成位移</strong>
        </div>
        <div className="acceleratedLab__playback" aria-label="运动动画控制">
          <button type="button" onClick={togglePlayback} aria-pressed={isPlaying}>
            <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
            {isPlaying ? "暂停运动" : "播放全过程"}
          </button>
          <label>
            <span>速度</span>
            <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
              <option value={0.5}>0.5×</option>
              <option value={1}>1×</option>
              <option value={2}>2×</option>
            </select>
          </label>
          <button type="button" className="acceleratedLab__ghostButton" onClick={() => {
            setIsPlaying(false);
            setMotionTime(t);
          }}>
            回到观察时刻
          </button>
        </div>
      </div>

      <div className="acceleratedLab__stateStrip" aria-live={isPlaying ? "off" : "polite"}>
        <article><span>时刻</span><strong>t = {round(displayTime)} s</strong></article>
        <article><span>位置</span><strong>x = {round(position)} m</strong></article>
        <article><span>位移</span><strong>Δx = {round(displacement)} m</strong></article>
        <article><span>瞬时速度</span><strong>v = {round(velocity)} m/s</strong></article>
        <article><span>速度变化量</span><strong>Δv = {round(velocityChange)} m/s</strong></article>
        <article><span>运动状态</span><strong>{status}</strong></article>
      </div>

      <section className="acceleratedLab__trackPanel" aria-labelledby="accelerated-track-title">
        <div className="acceleratedLab__sectionHead">
          <div>
            <span>等时纸带</span>
            <strong id="accelerated-track-title">点间距就是每个相等时间内的位移</strong>
          </div>
          <small>当前取 Δt = {round(interval)} s；点越来越疏表示同方向越跑越快</small>
        </div>
        <p className="acceleratedLab__mobileHint">纸带与图像可左右滑动查看完整过程。</p>
        <div className="acceleratedLab__trackViewport">
          <svg viewBox="0 0 760 190" className="acceleratedLab__trackSvg" role="img" aria-label="相等时间间隔的位置点、分段位移和当前运动物体">
            <defs>
              <marker id="accelerated-track-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" className="acceleratedLab__arrowHead" />
              </marker>
            </defs>
            <rect x="16" y="12" width="728" height="162" rx="22" className="acceleratedLab__trackPaper" />
            <line x1="48" x2="712" y1="112" y2="112" className="acceleratedLab__trackAxis" />
            {intervalData.map((entry) => {
              const y = entry.index % 2 === 0 ? 101 : 123;
              return (
                <line
                  key={`segment-${entry.index}`}
                  x1={trackMap(entry.startPosition)}
                  x2={trackMap(entry.endPosition)}
                  y1={y}
                  y2={y}
                  className="acceleratedLab__trackSegment"
                  data-complete={entry.end <= displayTime}
                  markerEnd="url(#accelerated-track-arrow)"
                />
              );
            })}
            {trackSamples.map((entry, index) => (
              <g key={`sample-${index}`}>
                <line x1={trackMap(entry.position)} x2={trackMap(entry.position)} y1="91" y2="135" className="acceleratedLab__sampleTick" />
                <circle cx={trackMap(entry.position)} cy="112" r="4.2" className="acceleratedLab__sampleDot" data-complete={entry.time <= displayTime} />
                {(trackSamples.length <= 8 || index % 2 === 0 || index === trackSamples.length - 1) ? (
                  <text x={trackMap(entry.position)} y={index % 2 === 0 ? 82 : 151} textAnchor="middle" className="acceleratedLab__sampleLabel">
                    {round(entry.time)}s
                  </text>
                ) : null}
              </g>
            ))}
            <g transform={`translate(${currentTrackX}, 104)`} className="acceleratedLab__vehicle" data-reverse={velocity < 0}>
              <rect x="-18" y="-13" width="36" height="17" rx="6" />
              <path d="M-10 -13 L-3 -23 L10 -23 L16 -13 Z" />
              <circle cx="-11" cy="6" r="5" />
              <circle cx="11" cy="6" r="5" />
            </g>
            <text x={Math.min(690, Math.max(70, currentTrackX))} y="42" textAnchor="middle" className="acceleratedLab__vehicleLabel">
              t={round(displayTime)}s · x={round(position)}m
            </text>
          </svg>
        </div>
      </section>

      {hasTurnInWindow ? (
        <div className="acceleratedLab__notice" role="status">
          <strong>这个模型会在 t = {round(stopTime ?? 0)} s 暂停并反向。</strong>
          <span>速度先减到 0，再改变方向；加速度方向始终不变，所以不能把“加速度为负”直接等同于“减速”。</span>
        </div>
      ) : null}

      <section className="acceleratedLab__graphs" aria-label="位置、速度和加速度随时间同步变化">
        <div className="acceleratedLab__graphWide">
          <GraphPanel
            title="x-t 位置—时间图"
            ariaLabel="匀变速直线运动 x-t 位置时间图像"
            yLabel="x（位置）"
            color="#0f766e"
            points={positionPoints}
            currentTime={displayTime}
            currentValue={position}
            tangentSlope={velocity}
            insight={`切线斜率 = 当前速度 ${round(velocity)} m/s`}
          />
        </div>
        <GraphPanel
          title="v-t 速度—时间图"
          ariaLabel="匀变速直线运动 v-t 速度时间图像"
          yLabel="v（速度）"
          color="#2563eb"
          points={velocityPoints}
          currentTime={displayTime}
          currentValue={velocity}
          areaLabel={`面积 = Δx = ${round(displacement)} m`}
          insight={`斜率 = a = ${round(a)} m/s²`}
        />
        <GraphPanel
          title="a-t 加速度—时间图"
          ariaLabel="匀变速直线运动 a-t 加速度时间图像"
          yLabel="a（加速度）"
          color="#d97706"
          points={accelerationPoints}
          currentTime={displayTime}
          currentValue={a}
          areaLabel={`面积 = Δv = ${round(velocityChange)} m/s`}
          insight="水平线表示加速度恒定"
        />
      </section>

      <section className="acceleratedLab__intervalPanel" aria-labelledby="accelerated-interval-title">
        <div className="acceleratedLab__sectionHead">
          <div>
            <span>逐段核算</span>
            <strong id="accelerated-interval-title">相邻相等时间内，位移差恒为 a(Δt)²</strong>
          </div>
          <small>每张卡表示一个长度相同的时间段；橙色卡是当前已经走过的区间</small>
        </div>
        <div className="acceleratedLab__intervalScroller">
          {intervalData.map((entry) => (
            <article key={entry.index} data-complete={entry.end <= displayTime}>
              <span>第 {entry.index + 1} 段 · {round(entry.start)}–{round(entry.end)} s</span>
              <strong>Δx<sub>{entry.index + 1}</sub> = {round(entry.delta)} m</strong>
              <small>{entry.deltaDifference === null ? "第一段作为比较起点" : `比前一段多 ${round(entry.deltaDifference)} m`}</small>
            </article>
          ))}
        </div>
        <div className="acceleratedLab__intervalRule">
          <strong>固定差值：a(Δt)² = {round(a * interval * interval)} m</strong>
          <span>{Math.abs(v0) < 0.001 ? "从静止开始时，各段位移之比为 1:3:5:7…" : "初速度会整体抬高或降低每段位移，但不会改变相邻位移的固定差。"}</span>
        </div>
      </section>

      <section className="acceleratedLab__formulaChain" aria-label="匀变速运动公式推导链">
        <article>
          <span>定义</span>
          <strong>a = Δv / Δt</strong>
          <small>加速度恒定，速度每秒改变同样多</small>
        </article>
        <i aria-hidden="true">→</i>
        <article>
          <span>速度公式</span>
          <strong>v = v₀ + at</strong>
          <small>当前 v = {round(v0)} + {round(a)}×{round(displayTime)}</small>
        </article>
        <i aria-hidden="true">→</i>
        <article>
          <span>平均速度</span>
          <strong>v̄ = (v₀ + v) / 2</strong>
          <small>当前 v̄ = {round(averageVelocity)} m/s</small>
        </article>
        <i aria-hidden="true">→</i>
        <article>
          <span>位移公式</span>
          <strong>Δx = v₀t + ½at²</strong>
          <small>也等于 v-t 图中的有向面积</small>
        </article>
        <i aria-hidden="true">→</i>
        <article>
          <span>消去时间</span>
          <strong>v² − v₀² = 2aΔx</strong>
          <small>题目不给时间时优先想到它</small>
        </article>
      </section>

      <figcaption className="acceleratedLab__caption">
        <span>同一条竖直时间探针同时穿过三张图。</span>
        <span>x-t 看切线斜率，v-t 同时看斜率和面积，a-t 看面积得到速度变化。</span>
      </figcaption>
    </figure>
  );
}
