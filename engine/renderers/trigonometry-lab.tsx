"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TrigonometryMode = "sin" | "cos" | "tan" | "transform";

type TrigonometryLabProps = {
  mode: TrigonometryMode;
  angleDeg: number;
  amplitude?: number;
  omega?: number;
  phase?: number;
  offset?: number;
};

type PlotPoint = {
  x: number;
  y: number;
};

const TAU = Math.PI * 2;
const VIEW_WIDTH = 800;
const VIEW_HEIGHT = 390;
const CIRCLE_CENTER = { x: 150, y: 180 };
const CIRCLE_RADIUS = 104;
const GRAPH = { left: 330, right: 770, top: 56, bottom: 320 };
const ANIMATION_FRAME_INTERVAL = 1000 / 30;

const modeCopy = {
  sin: {
    title: "正弦：追踪圆上点的高度",
    formula: "sin θ = 纵坐标",
    color: "#f97316",
  },
  cos: {
    title: "余弦：追踪圆上点的横坐标",
    formula: "cos θ = 横坐标",
    color: "#2563eb",
  },
  tan: {
    title: "正切：比较纵坐标与横坐标",
    formula: "tan θ = sin θ / cos θ",
    color: "#7c3aed",
  },
  transform: {
    title: "参数实验：圆周运动怎样变成波形",
    formula: "y = A sin(ωx + φ) + d",
    color: "#0f766e",
  },
} satisfies Record<TrigonometryMode, { title: string; formula: string; color: string }>;

const specialAngles = [
  { degree: 0, radian: "0", sin: "0", cos: "1", tan: "0" },
  { degree: 30, radian: "π/6", sin: "1/2", cos: "√3/2", tan: "√3/3" },
  { degree: 45, radian: "π/4", sin: "√2/2", cos: "√2/2", tan: "1" },
  { degree: 60, radian: "π/3", sin: "√3/2", cos: "1/2", tan: "√3" },
  { degree: 90, radian: "π/2", sin: "1", cos: "0", tan: "无定义" },
  { degree: 120, radian: "2π/3", sin: "√3/2", cos: "-1/2", tan: "-√3" },
  { degree: 135, radian: "3π/4", sin: "√2/2", cos: "-√2/2", tan: "-1" },
  { degree: 150, radian: "5π/6", sin: "1/2", cos: "-√3/2", tan: "-√3/3" },
  { degree: 180, radian: "π", sin: "0", cos: "-1", tan: "0" },
  { degree: 210, radian: "7π/6", sin: "-1/2", cos: "-√3/2", tan: "√3/3" },
  { degree: 225, radian: "5π/4", sin: "-√2/2", cos: "-√2/2", tan: "1" },
  { degree: 240, radian: "4π/3", sin: "-√3/2", cos: "-1/2", tan: "√3" },
  { degree: 270, radian: "3π/2", sin: "-1", cos: "0", tan: "无定义" },
  { degree: 300, radian: "5π/3", sin: "-√3/2", cos: "1/2", tan: "-√3" },
  { degree: 315, radian: "7π/4", sin: "-√2/2", cos: "√2/2", tan: "-1" },
  { degree: 330, radian: "11π/6", sin: "-1/2", cos: "√3/2", tan: "-√3/3" },
  { degree: 360, radian: "2π", sin: "0", cos: "1", tan: "0" },
] as const;

function round(value: number, digits = 3) {
  const rounded = Number(value.toFixed(digits));
  return Object.is(rounded, -0) ? 0 : rounded;
}

function normalizeDegree(value: number) {
  return ((value % 360) + 360) % 360;
}

function wrap(value: number, min: number, max: number) {
  const width = max - min;
  return ((((value - min) % width) + width) % width) + min;
}

function getQuadrant(degree: number) {
  const normalized = normalizeDegree(degree);

  if (normalized === 0 || normalized === 90 || normalized === 180 || normalized === 270) {
    return "坐标轴上";
  }

  if (normalized < 90) return "第一象限";
  if (normalized < 180) return "第二象限";
  if (normalized < 270) return "第三象限";
  return "第四象限";
}

function getSpecialAngle(degree: number) {
  const normalized = normalizeDegree(degree);
  const target = normalized === 0 && degree > 0 ? 360 : normalized;

  return specialAngles.find((entry) => Math.abs(entry.degree - target) < 0.35) ?? null;
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

function sampleContinuousCurve(
  fn: (x: number) => number,
  min: number,
  max: number,
  count = 240,
) {
  return Array.from({ length: count + 1 }, (_, index) => {
    const x = min + ((max - min) * index) / count;
    return { x, y: fn(x) };
  });
}

function sampleTangentSegments(omega: number, min: number, max: number) {
  const segments: PlotPoint[][] = [];
  let segment: PlotPoint[] = [];

  for (let index = 0; index <= 520; index += 1) {
    const x = min + ((max - min) * index) / 520;
    const cosine = Math.cos(omega * x);
    const y = Math.tan(omega * x);
    const drawable = Math.abs(cosine) > 0.035 && Math.abs(y) <= 6;

    if (!drawable) {
      if (segment.length > 1) segments.push(segment);
      segment = [];
      continue;
    }

    segment.push({ x, y });
  }

  if (segment.length > 1) segments.push(segment);
  return segments;
}

function radianLabel(degree: number) {
  const radians = (degree * Math.PI) / 180;
  return `${round(radians)} rad`;
}

export function TrigonometryLab({
  mode,
  angleDeg,
  amplitude = 1,
  omega = 1,
  phase = 0,
  offset = 0,
}: TrigonometryLabProps) {
  const [motionAngle, setMotionAngle] = useState(angleDeg);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const frameRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const copy = modeCopy[mode];

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
      setMotionAngle((current) => current + stepSeconds * 48 * speed);
      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [isPlaying, speed]);

  const values = useMemo(() => {
    const inputRadians = (motionAngle * Math.PI) / 180;
    const innerAngle = mode === "transform" || mode === "tan"
      ? omega * inputRadians + (mode === "transform" ? phase : 0)
      : inputRadians;
    const sinValue = Math.sin(innerAngle);
    const cosValue = Math.cos(innerAngle);
    const tanDefined = Math.abs(cosValue) > 0.015;
    const baseValue = mode === "cos" ? cosValue : mode === "tan" ? sinValue / cosValue : sinValue;
    const outputValue = mode === "transform" ? amplitude * sinValue + offset : baseValue;

    return {
      inputRadians,
      innerAngle,
      innerDegree: (innerAngle * 180) / Math.PI,
      sinValue,
      cosValue,
      tanDefined,
      outputValue,
    };
  }, [amplitude, mode, motionAngle, offset, omega, phase]);

  const graphConfig = useMemo(() => {
    if (mode === "tan") {
      return { xMin: -Math.PI, xMax: Math.PI, yMin: -5, yMax: 5 };
    }

    if (mode === "transform") {
      const verticalReach = Math.max(3, Math.abs(offset) + Math.abs(amplitude) + 0.8);
      return { xMin: -Math.PI, xMax: Math.PI * 3, yMin: -verticalReach, yMax: verticalReach };
    }

    return { xMin: 0, xMax: TAU, yMin: -1.4, yMax: 1.4 };
  }, [amplitude, mode, offset]);

  const mapGraphX = (value: number) =>
    GRAPH.left + ((value - graphConfig.xMin) / (graphConfig.xMax - graphConfig.xMin)) * (GRAPH.right - GRAPH.left);
  const mapGraphY = (value: number) =>
    GRAPH.bottom - ((value - graphConfig.yMin) / (graphConfig.yMax - graphConfig.yMin)) * (GRAPH.bottom - GRAPH.top);

  const currentGraphX = mode === "tan"
    ? wrap(values.inputRadians, graphConfig.xMin, graphConfig.xMax)
    : mode === "transform"
      ? wrap(values.inputRadians, graphConfig.xMin, graphConfig.xMax)
      : normalizeDegree(motionAngle) * Math.PI / 180;

  const curve = useMemo(() => {
    if (mode === "tan") return [];

    return sampleContinuousCurve((x) => {
      if (mode === "cos") return Math.cos(x);
      if (mode === "transform") return amplitude * Math.sin(omega * x + phase) + offset;
      return Math.sin(x);
    }, graphConfig.xMin, graphConfig.xMax);
  }, [amplitude, graphConfig.xMax, graphConfig.xMin, mode, offset, omega, phase]);

  const tanSegments = useMemo(
    () => mode === "tan" ? sampleTangentSegments(omega, graphConfig.xMin, graphConfig.xMax) : [],
    [graphConfig.xMax, graphConfig.xMin, mode, omega],
  );

  const referenceCurve = useMemo(
    () => mode === "transform"
      ? sampleContinuousCurve(Math.sin, graphConfig.xMin, graphConfig.xMax)
      : [],
    [graphConfig.xMax, graphConfig.xMin, mode],
  );

  const generatedCurve = mode === "sin" || mode === "cos"
    ? curve.filter((point) => point.x <= currentGraphX + 0.001)
    : [];
  const circleX = CIRCLE_CENTER.x + values.cosValue * CIRCLE_RADIUS;
  const circleY = CIRCLE_CENTER.y - values.sinValue * CIRCLE_RADIUS;
  const graphValue = values.tanDefined || mode !== "tan" ? values.outputValue : null;
  const graphMarkerY = graphValue === null ? null : Math.max(graphConfig.yMin, Math.min(graphConfig.yMax, graphValue));
  const quadrant = getQuadrant(values.innerDegree);
  const specialAngle = getSpecialAngle(values.innerDegree);
  const tangentY = CIRCLE_CENTER.y - (values.sinValue / values.cosValue) * CIRCLE_RADIUS;
  const tangentVisible = values.tanDefined && tangentY > 30 && tangentY < 335;
  const period = omega === 0 ? null : (mode === "tan" ? Math.PI : TAU) / Math.abs(omega);
  const horizontalShift = omega === 0 ? null : -phase / omega;
  const xTicks = mode === "tan"
    ? [
        { value: -Math.PI, label: "-π" },
        { value: -Math.PI / 2, label: "-π/2" },
        { value: 0, label: "0" },
        { value: Math.PI / 2, label: "π/2" },
        { value: Math.PI, label: "π" },
      ]
    : mode === "transform"
      ? [
          { value: -Math.PI, label: "-π" },
          { value: 0, label: "0" },
          { value: Math.PI, label: "π" },
          { value: Math.PI * 2, label: "2π" },
          { value: Math.PI * 3, label: "3π" },
        ]
      : [
          { value: 0, label: "0" },
          { value: Math.PI / 2, label: "π/2" },
          { value: Math.PI, label: "π" },
          { value: Math.PI * 1.5, label: "3π/2" },
          { value: TAU, label: "2π" },
        ];
  const asymptotes = mode === "tan"
    ? Array.from({ length: 17 }, (_, index) => index - 8)
        .map((k) => (Math.PI / 2 + k * Math.PI) / omega)
        .filter((x) => x > graphConfig.xMin && x < graphConfig.xMax)
    : [];
  const exactValue = specialAngle
    ? mode === "cos"
      ? specialAngle.cos
      : mode === "tan"
        ? specialAngle.tan
        : specialAngle.sin
    : null;

  return (
    <figure className="trigLab" data-mode={mode} data-playing={isPlaying} aria-label={`${copy.title}交互演示`}>
      <div className="trigLab__toolbar">
        <div>
          <span className="trigLab__kicker">单位圆 × 函数图像</span>
          <strong>{copy.title}</strong>
        </div>
        <div className="trigLab__playback" aria-label="动画播放控制">
          <button type="button" onClick={() => setIsPlaying((current) => !current)} aria-pressed={isPlaying}>
            <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
            {isPlaying ? "暂停运动" : "播放一圈"}
          </button>
          <label>
            <span>速度</span>
            <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
              <option value={0.5}>0.5×</option>
              <option value={1}>1×</option>
              <option value={2}>2×</option>
            </select>
          </label>
          <button type="button" className="trigLab__ghostButton" onClick={() => {
            setIsPlaying(false);
            setMotionAngle(angleDeg);
          }}>
            回到滑块角度
          </button>
        </div>
      </div>

      <div className="trigLab__formulaStrip">
        <span>{copy.formula}</span>
        <span>当前输入：{round(motionAngle, 1)}° = {radianLabel(motionAngle)}</span>
        {mode === "transform" ? <span>圆上实际转角：ωx + φ = {round(values.innerAngle)} rad</span> : null}
      </div>

      <p className="trigLab__mobileHint">左右滑动图形区：先看单位圆，再看函数图像 →</p>
      <div className="trigLab__viewport">
        <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="trigLab__svg" role="img" aria-label={`${copy.title}：单位圆与函数图像同步变化`}>
        <defs>
          <clipPath id={`trig-graph-clip-${mode}`}>
            <rect x={GRAPH.left} y={GRAPH.top} width={GRAPH.right - GRAPH.left} height={GRAPH.bottom - GRAPH.top} rx="16" />
          </clipPath>
        </defs>

        <rect x="18" y="24" width="268" height="326" rx="24" className="trigLab__panelSurface" />
        <rect x="310" y="24" width="474" height="326" rx="24" className="trigLab__panelSurface" />

        <g aria-label="单位圆观察区">
          <text x="38" y="54" className="trigLab__sectionLabel">单位圆：同一个点的两种投影</text>
          <line x1="38" x2="262" y1={CIRCLE_CENTER.y} y2={CIRCLE_CENTER.y} className="trigLab__axis" />
          <line x1={CIRCLE_CENTER.x} x2={CIRCLE_CENTER.x} y1="68" y2="292" className="trigLab__axis" />
          <circle cx={CIRCLE_CENTER.x} cy={CIRCLE_CENTER.y} r={CIRCLE_RADIUS} className="trigLab__unitCircle" />
          <path
            d={`M ${CIRCLE_CENTER.x + 34} ${CIRCLE_CENTER.y} A 34 34 0 ${normalizeDegree(values.innerDegree) > 180 ? 1 : 0} 0 ${CIRCLE_CENTER.x + Math.cos(values.innerAngle) * 34} ${CIRCLE_CENTER.y - Math.sin(values.innerAngle) * 34}`}
            className="trigLab__angleArc"
            style={{ stroke: copy.color }}
          />
          <line x1={CIRCLE_CENTER.x} y1={CIRCLE_CENTER.y} x2={circleX} y2={circleY} className="trigLab__radius" style={{ stroke: copy.color }} />
          <line x1={circleX} y1={circleY} x2={circleX} y2={CIRCLE_CENTER.y} className="trigLab__projection trigLab__projection--sin" />
          <line x1={circleX} y1={circleY} x2={CIRCLE_CENTER.x} y2={circleY} className="trigLab__projection trigLab__projection--cos" />
          {mode === "tan" ? (
            <>
              <line x1={CIRCLE_CENTER.x + CIRCLE_RADIUS} x2={CIRCLE_CENTER.x + CIRCLE_RADIUS} y1="62" y2="300" className="trigLab__tangentAxis" />
              {tangentVisible ? (
                <>
                  <line x1={CIRCLE_CENTER.x} y1={CIRCLE_CENTER.y} x2={CIRCLE_CENTER.x + CIRCLE_RADIUS} y2={tangentY} className="trigLab__tangentRay" />
                  <line x1={CIRCLE_CENTER.x + CIRCLE_RADIUS} y1={CIRCLE_CENTER.y} x2={CIRCLE_CENTER.x + CIRCLE_RADIUS} y2={tangentY} className="trigLab__tangentLength" />
                  <circle cx={CIRCLE_CENTER.x + CIRCLE_RADIUS} cy={tangentY} r="5" className="trigLab__tangentPoint" />
                </>
              ) : null}
            </>
          ) : null}
          <circle cx={circleX} cy={circleY} r="12" className="trigLab__markerHalo" style={{ fill: copy.color }} />
          <circle cx={circleX} cy={circleY} r="6" className="trigLab__orbitPoint" style={{ fill: copy.color }} />
          <text x={Math.min(circleX + 10, 245)} y={Math.max(circleY - 12, 72)} className="trigLab__pointLabel">P(cos θ, sin θ)</text>
          <text x="38" y="326" className="trigLab__circleReadout">{quadrant} · P({round(values.cosValue)}, {round(values.sinValue)})</text>
        </g>

        <g aria-label="函数图像观察区" clipPath={`url(#trig-graph-clip-${mode})`}>
          {xTicks.map((tick) => (
            <line key={`grid-${tick.label}`} x1={mapGraphX(tick.value)} x2={mapGraphX(tick.value)} y1={GRAPH.top} y2={GRAPH.bottom} className="trigLab__gridLine" />
          ))}
          {[-1, 0, 1].filter((value) => value >= graphConfig.yMin && value <= graphConfig.yMax).map((value) => (
            <line key={`y-grid-${value}`} x1={GRAPH.left} x2={GRAPH.right} y1={mapGraphY(value)} y2={mapGraphY(value)} className="trigLab__gridLine" />
          ))}
          <line x1={GRAPH.left} x2={GRAPH.right} y1={mapGraphY(0)} y2={mapGraphY(0)} className="trigLab__axis" />
          {mode === "transform" ? (
            <>
              <rect
                x={GRAPH.left}
                y={mapGraphY(offset + Math.abs(amplitude))}
                width={GRAPH.right - GRAPH.left}
                height={Math.abs(mapGraphY(offset - Math.abs(amplitude)) - mapGraphY(offset + Math.abs(amplitude)))}
                className="trigLab__amplitudeBand"
              />
              <line x1={GRAPH.left} x2={GRAPH.right} y1={mapGraphY(offset)} y2={mapGraphY(offset)} className="trigLab__midline" />
              <path d={makePath(referenceCurve, mapGraphX, mapGraphY)} className="trigLab__referenceCurve" />
            </>
          ) : null}
          {asymptotes.map((x) => (
            <line key={`asymptote-${x}`} x1={mapGraphX(x)} x2={mapGraphX(x)} y1={GRAPH.top} y2={GRAPH.bottom} className="trigLab__asymptote" />
          ))}
          {mode === "tan" ? tanSegments.map((segment, index) => (
            <path key={index} d={makePath(segment, mapGraphX, mapGraphY)} className="trigLab__curve" style={{ stroke: copy.color }} />
          )) : (
            <path d={makePath(curve, mapGraphX, mapGraphY)} className="trigLab__curve" style={{ stroke: copy.color }} />
          )}
          {generatedCurve.length > 1 ? <path d={makePath(generatedCurve, mapGraphX, mapGraphY)} className="trigLab__generatedCurve" style={{ stroke: copy.color }} /> : null}
          {graphMarkerY !== null ? (
            <>
              <line x1={mapGraphX(currentGraphX)} x2={mapGraphX(currentGraphX)} y1={mapGraphY(0)} y2={mapGraphY(graphMarkerY)} className="trigLab__currentGuide" style={{ stroke: copy.color }} />
              <circle cx={mapGraphX(currentGraphX)} cy={mapGraphY(graphMarkerY)} r="12" className="trigLab__markerHalo" style={{ fill: copy.color }} />
              <circle cx={mapGraphX(currentGraphX)} cy={mapGraphY(graphMarkerY)} r="6" className="trigLab__graphPoint" style={{ fill: copy.color }} />
            </>
          ) : null}
        </g>

        <text x="330" y="51" className="trigLab__sectionLabel">函数图像：按输入顺序记录投影</text>
        {xTicks.map((tick) => (
          <text key={`label-${tick.label}`} x={mapGraphX(tick.value)} y="340" textAnchor="middle" className="trigLab__tickLabel">{tick.label}</text>
        ))}
        <text x="768" y="340" textAnchor="end" className="trigLab__axisLabel">x（弧度）</text>
        <path
          d={`M ${circleX + 8} ${circleY} C 292 ${circleY}, 300 ${graphMarkerY === null ? 180 : mapGraphY(graphMarkerY)}, ${mapGraphX(currentGraphX) - 10} ${graphMarkerY === null ? 180 : mapGraphY(graphMarkerY)}`}
          className="trigLab__bridge"
          style={{ stroke: copy.color }}
        />
        </svg>
      </div>

      <div className="trigLab__readouts" aria-live={isPlaying ? "off" : "polite"}>
        <article>
          <span>输入角 x</span>
          <strong>{round(motionAngle, 1)}°</strong>
          <small>{radianLabel(motionAngle)}</small>
        </article>
        <article>
          <span>单位圆坐标</span>
          <strong>({round(values.cosValue)}, {round(values.sinValue)})</strong>
          <small>横坐标看 cos，纵坐标看 sin</small>
        </article>
        <article className={mode === "tan" && !values.tanDefined ? "trigLab__readout--warning" : ""}>
          <span>当前函数值</span>
          <strong>{mode === "tan" && !values.tanDefined ? "无定义" : round(values.outputValue)}</strong>
          <small>{mode === "tan" ? `cos(ωx) = ${round(values.cosValue)}` : quadrant}</small>
        </article>
        <article>
          <span>{specialAngle ? "特殊角精确值" : "符号判断"}</span>
          <strong>{specialAngle ? exactValue : quadrant}</strong>
          <small>{specialAngle ? `${specialAngle.degree}° = ${specialAngle.radian}` : `sin ${values.sinValue >= 0 ? "+" : "−"} · cos ${values.cosValue >= 0 ? "+" : "−"}`}</small>
        </article>
      </div>

      {mode === "transform" ? (
        <div className="trigLab__parameterMap" aria-label="参数作用对照">
          <article><span>A 管纵向</span><strong>振幅 |A| = {round(Math.abs(amplitude))}</strong><small>{amplitude < 0 ? "A < 0，还会关于中线翻转" : amplitude === 0 ? "A = 0，波形退化为中线" : "波峰、波谷到中线的距离"}</small></article>
          <article><span>ω 管横向</span><strong>周期 T = {period === null ? "无" : round(period)}</strong><small>ω 越大，横向压得越紧</small></article>
          <article><span>φ 管起点</span><strong>平移 {horizontalShift === null ? "无" : round(horizontalShift)}</strong><small>真正方向看 -φ/ω，不是只看 φ 正负</small></article>
          <article><span>d 管中线</span><strong>y = {round(offset)}</strong><small>值域围绕这条水平线展开</small></article>
        </div>
      ) : null}

      {mode === "tan" && !values.tanDefined ? (
        <div className="trigLab__notice" role="status">
          <strong>这里不是“函数值特别大”，而是没有定义。</strong>
          <span>因为 cos(ωx) = 0，分母不能为 0；图像两侧只能无限靠近虚线渐近线，不能连过去。</span>
        </div>
      ) : null}

      <figcaption className="trigLab__caption">
        <span><i className="trigLab__legendDot trigLab__legendDot--sin" />纵投影 sin</span>
        <span><i className="trigLab__legendDot trigLab__legendDot--cos" />横投影 cos</span>
        {mode === "tan" ? <span><i className="trigLab__legendDot trigLab__legendDot--tan" />比值与切线段 tan</span> : null}
        {mode === "transform" ? <span>浅色虚线是标准 y = sin x，用来比较参数造成的变化</span> : <span>拖动下方参数后，圆上点、投影、函数值和图像标记会同步更新</span>}
      </figcaption>
    </figure>
  );
}
