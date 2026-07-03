function formatNumber(value, digits = 2) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value)
    .toFixed(digits)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function formatSignedNumber(value, digits = 2) {
  const abs = formatNumber(Math.abs(value), digits);
  return value >= 0 ? `+ ${abs}` : `- ${abs}`;
}

function formatLinearExpression(symbol, intercept, slope) {
  const interceptText = Math.abs(intercept) < 1e-8 ? "" : formatNumber(intercept);
  const slopeAbs = Math.abs(slope);
  const slopeCoeff = Math.abs(slopeAbs - 1) < 1e-8 ? "" : formatNumber(slopeAbs);
  const slopeTerm = slopeAbs < 1e-8 ? "" : `${slopeCoeff}t`;

  if (!interceptText && !slopeTerm) return `${symbol} = 0`;
  if (!interceptText) return `${symbol} = ${slope < 0 ? "-" : ""}${slopeTerm}`;
  if (!slopeTerm) return `${symbol} = ${interceptText}`;
  return `${symbol} = ${interceptText} ${formatSignedNumber(slope).replace(Math.abs(slopeAbs - 1) < 1e-8 ? absToken(slope) : formatNumber(slopeAbs), slopeTerm)}`;
}

function absToken(value) {
  return formatNumber(Math.abs(value));
}

function buildTimeSamples(maxTime, step = 0.1) {
  const points = [];
  for (let t = 0; t <= maxTime + 1e-8; t += step) {
    points.push(Number(t.toFixed(4)));
  }
  if (points[points.length - 1] !== maxTime) {
    points.push(maxTime);
  }
  return points;
}

function buildViewport(xValues, yValues, options = {}) {
  const safeX = [...xValues, 0];
  const safeY = [...yValues, 0];
  const xMin = Math.min(...safeX);
  const xMax = Math.max(...safeX);
  const yMin = Math.min(...safeY);
  const yMax = Math.max(...safeY);
  const xPadding = Math.max((xMax - xMin) * 0.12, options.minXPadding ?? 1);
  const yPadding = Math.max((yMax - yMin) * 0.18, options.minYPadding ?? 1.5);

  return {
    xMin: Math.min(0, xMin - xPadding * 0.2),
    xMax: xMax + xPadding,
    yMin: yMin - yPadding,
    yMax: yMax + yPadding,
  };
}

function currentTimeGuides(t, y, xLabel, yLabel) {
  return {
    segments: [
      {
        from: { x: t, y: 0 },
        to: { x: t, y },
        dashed: true,
        color: "rgba(29, 111, 165, 0.45)",
        lineWidth: 2,
      },
      {
        from: { x: 0, y },
        to: { x: t, y },
        dashed: true,
        color: "rgba(249, 115, 22, 0.45)",
        lineWidth: 2,
      },
    ],
    labels: [
      { x: t, y: 0, text: xLabel, color: "rgba(29,111,165,0.92)", dx: 8, dy: -10 },
      { x: 0, y, text: yLabel, color: "rgba(249,115,22,0.92)", dx: 10, dy: -8 },
    ],
  };
}

export function createPhysicsMotionCard(title, conclusion, observation, warning, highlight = false) {
  return {
    title,
    conclusion,
    observation,
    warning,
    highlight,
  };
}

export function buildPhysicsMotionTeachingItems(items) {
  return items.map((item) => ({
    title: item.title,
    value: item.value,
    badges: item.badges ?? [],
    text: item.text ?? "",
  }));
}

export function buildUniformMotionModel({ v, s0, t }) {
  const xMax = Math.max(6, t + 2);
  const times = buildTimeSamples(xMax, 0.1);
  const curvePoints = times.map((time) => ({
    x: time,
    y: s0 + v * time,
  }));
  const currentPosition = s0 + v * t;
  const viewport = buildViewport(
    [0, xMax, t],
    [s0, currentPosition, ...curvePoints.map((point) => point.y)],
    { minXPadding: 1, minYPadding: 1.8 },
  );
  const guides = currentTimeGuides(t, currentPosition, `t = ${formatNumber(t)}`, `s = ${formatNumber(currentPosition)}`);

  return {
    derived: {
      equation: formatLinearExpression("s", s0, v),
      currentTime: t,
      currentPosition,
      currentVelocity: v,
      startPosition: s0,
      studentSummary: v >= 0
        ? "速度保持不变，所以位置会按固定快慢稳定向前增加。"
        : "速度保持不变且方向为负，所以位置会按固定快慢稳定向反方向变化。",
    },
    view: {
      viewport,
      showGrid: true,
      showAxes: true,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#1d6fa5",
          lineWidth: 4,
          points: curvePoints,
        },
      ],
      points: [
        { x: 0, y: s0, label: "初始位置", color: "#34a853", radius: 5 },
        { x: t, y: currentPosition, label: "当前时刻", color: "#f97316", radius: 6 },
      ],
      segments: guides.segments,
      labels: [
        ...guides.labels,
        { x: xMax - 0.8, y: curvePoints[curvePoints.length - 1].y, text: "s-t 图像", color: "rgba(29,111,165,0.92)", dx: 10, dy: -10 },
      ],
    },
  };
}

export function buildAcceleratedMotionModel({ v0, a, t }) {
  const xMax = Math.max(6, t + 2);
  const times = buildTimeSamples(xMax, 0.1);
  const curvePoints = times.map((time) => ({
    x: time,
    y: v0 + a * time,
  }));
  const currentVelocity = v0 + a * t;
  const displacement = v0 * t + 0.5 * a * t * t;
  const viewport = buildViewport(
    [0, xMax, t],
    [v0, currentVelocity, ...curvePoints.map((point) => point.y)],
    { minXPadding: 1, minYPadding: 2 },
  );
  const guides = currentTimeGuides(t, currentVelocity, `t = ${formatNumber(t)}`, `v = ${formatNumber(currentVelocity)}`);

  return {
    derived: {
      equation: formatLinearExpression("v", v0, a),
      velocityEquation: formatLinearExpression("v", v0, a),
      currentTime: t,
      currentVelocity,
      displacement,
      acceleration: a,
      studentSummary: a >= 0
        ? "加速度固定为正，说明速度会一秒一秒稳定增加。"
        : "加速度固定为负，说明速度会一秒一秒稳定减小，必要时还可能反向。",
    },
    view: {
      viewport,
      showGrid: true,
      showAxes: true,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#8b5cf6",
          lineWidth: 4,
          points: curvePoints,
        },
      ],
      polygons: [
        {
          points: [
            { x: 0, y: 0 },
            { x: 0, y: v0 },
            { x: t, y: currentVelocity },
            { x: t, y: 0 },
          ],
          color: "rgba(139,92,246,0.55)",
          fillColor: "rgba(139,92,246,0.18)",
          lineWidth: 2,
        },
      ],
      points: [
        { x: 0, y: v0, label: "初速度", color: "#34a853", radius: 5 },
        { x: t, y: currentVelocity, label: "当前速度", color: "#f97316", radius: 6 },
      ],
      segments: guides.segments,
      labels: [
        ...guides.labels,
        { x: xMax - 0.8, y: curvePoints[curvePoints.length - 1].y, text: "v-t 图像", color: "rgba(139,92,246,0.92)", dx: 10, dy: -10 },
        { x: t * 0.5, y: (v0 + currentVelocity) * 0.25, text: `位移 ≈ ${formatNumber(displacement)}`, color: "rgba(79,70,229,0.92)", dx: 12, dy: -10 },
      ],
    },
  };
}

export function buildUniformChaseModel({
  leadStart,
  leadSpeed,
  chaseStart,
  chaseSpeed,
  t,
}) {
  const relativeSpeed = chaseSpeed - leadSpeed;
  const initialGap = leadStart - chaseStart;
  const canCatchUp = relativeSpeed > 0 && initialGap >= 0;
  const catchUpTime = canCatchUp ? initialGap / relativeSpeed : null;
  const catchUpPosition = catchUpTime === null ? null : leadStart + leadSpeed * catchUpTime;
  const currentLeadPosition = leadStart + leadSpeed * t;
  const currentChasePosition = chaseStart + chaseSpeed * t;
  const currentGap = currentLeadPosition - currentChasePosition;
  const xMax = Math.max(6, t + 2, catchUpTime === null ? 0 : catchUpTime + 1.5);
  const times = buildTimeSamples(xMax, 0.1);
  const leadCurve = times.map((time) => ({ x: time, y: leadStart + leadSpeed * time }));
  const chaseCurve = times.map((time) => ({ x: time, y: chaseStart + chaseSpeed * time }));
  const viewport = buildViewport(
    [0, xMax, t, ...(catchUpTime === null ? [] : [catchUpTime])],
    [
      leadStart,
      chaseStart,
      currentLeadPosition,
      currentChasePosition,
      ...leadCurve.map((point) => point.y),
      ...chaseCurve.map((point) => point.y),
      ...(catchUpPosition === null ? [] : [catchUpPosition]),
    ],
    { minXPadding: 1.2, minYPadding: 2 },
  );

  const segments = [
    {
      from: { x: t, y: currentChasePosition },
      to: { x: t, y: currentLeadPosition },
      dashed: true,
      color: "rgba(244, 114, 24, 0.55)",
      lineWidth: 2,
    },
  ];
  const labels = [
    { x: xMax - 0.8, y: leadCurve[leadCurve.length - 1].y, text: "前车 s-t", color: "rgba(29,111,165,0.92)", dx: 10, dy: -10 },
    { x: xMax - 0.8, y: chaseCurve[chaseCurve.length - 1].y, text: "后车 s-t", color: "rgba(34,197,94,0.92)", dx: 10, dy: 16 },
    { x: t, y: (currentLeadPosition + currentChasePosition) * 0.5, text: `间距 ${formatNumber(currentGap)}`, color: "rgba(244,114,24,0.92)", dx: 12, dy: -8 },
  ];

  if (catchUpTime !== null) {
    segments.push({
      from: { x: catchUpTime, y: 0 },
      to: { x: catchUpTime, y: catchUpPosition },
      dashed: true,
      color: "rgba(139,92,246,0.5)",
      lineWidth: 2,
    });
    labels.push({
      x: catchUpTime,
      y: catchUpPosition,
      text: `追上于 t = ${formatNumber(catchUpTime)}`,
      color: "rgba(139,92,246,0.92)",
      dx: 12,
      dy: -10,
    });
  }

  return {
    derived: {
      canCatchUp,
      catchUpTime,
      catchUpPosition,
      currentTime: t,
      currentGap,
      leadPosition: currentLeadPosition,
      chasePosition: currentChasePosition,
      leadEquation: formatLinearExpression("sA", leadStart, leadSpeed),
      chaseEquation: formatLinearExpression("sB", chaseStart, chaseSpeed),
      studentSummary: canCatchUp
        ? `后车更快，所以会在 ${formatNumber(catchUpTime)} 秒时追上前车。`
        : "后车速度不够快，或者起步关系不满足追及条件，所以这两辆车在当前模型里不会追上。",
    },
    view: {
      viewport,
      showGrid: true,
      showAxes: true,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#1d6fa5",
          lineWidth: 4,
          points: leadCurve,
        },
        {
          type: "polyline",
          color: "#34a853",
          lineWidth: 4,
          points: chaseCurve,
        },
      ],
      points: [
        { x: 0, y: leadStart, label: "前车起点", color: "#1d6fa5", radius: 5 },
        { x: 0, y: chaseStart, label: "后车起点", color: "#34a853", radius: 5 },
        { x: t, y: currentLeadPosition, label: "前车当前", color: "#1d6fa5", radius: 6 },
        { x: t, y: currentChasePosition, label: "后车当前", color: "#34a853", radius: 6 },
        ...(catchUpTime === null
          ? []
          : [{ x: catchUpTime, y: catchUpPosition, label: "追上时刻", color: "#8b5cf6", radius: 6 }]),
      ],
      segments,
      labels,
    },
  };
}

export function buildMixedChaseModel({
  leadStart,
  leadSpeed,
  chaseStart,
  chaseInitialSpeed,
  chaseAcceleration,
  t,
}) {
  const initialGap = leadStart - chaseStart;
  const relativeLinear = chaseInitialSpeed - leadSpeed;
  const relativeQuadratic = 0.5 * chaseAcceleration;
  let catchUpTime = null;

  if (Math.abs(relativeQuadratic) < 1e-8) {
    if (relativeLinear > 1e-8 && initialGap >= 0) {
      catchUpTime = initialGap / relativeLinear;
    } else if (Math.abs(initialGap) < 1e-8) {
      catchUpTime = 0;
    }
  } else {
    const a = relativeQuadratic;
    const b = relativeLinear;
    const c = -initialGap;
    const discriminant = b * b - 4 * a * c;

    if (discriminant >= -1e-8) {
      const safeDiscriminant = Math.max(0, discriminant);
      const sqrtD = Math.sqrt(safeDiscriminant);
      const roots = [
        (-b + sqrtD) / (2 * a),
        (-b - sqrtD) / (2 * a),
      ]
        .filter((value) => Number.isFinite(value) && value >= -1e-8)
        .map((value) => Math.max(0, value))
        .sort((left, right) => left - right);

      if (roots.length > 0) {
        catchUpTime = roots[0];
      }
    }
  }

  const canCatchUp = catchUpTime !== null;
  const catchUpPosition = canCatchUp
    ? leadStart + leadSpeed * catchUpTime
    : null;
  const currentLeadPosition = leadStart + leadSpeed * t;
  const currentChasePosition = chaseStart + chaseInitialSpeed * t + 0.5 * chaseAcceleration * t * t;
  const currentGap = currentLeadPosition - currentChasePosition;
  const currentChaseVelocity = chaseInitialSpeed + chaseAcceleration * t;
  const xMax = Math.max(6, t + 2, catchUpTime === null ? 0 : catchUpTime + 1.5);
  const times = buildTimeSamples(xMax, 0.1);
  const leadCurve = times.map((time) => ({ x: time, y: leadStart + leadSpeed * time }));
  const chaseCurve = times.map((time) => ({
    x: time,
    y: chaseStart + chaseInitialSpeed * time + 0.5 * chaseAcceleration * time * time,
  }));
  const viewport = buildViewport(
    [0, xMax, t, ...(catchUpTime === null ? [] : [catchUpTime])],
    [
      leadStart,
      chaseStart,
      currentLeadPosition,
      currentChasePosition,
      ...leadCurve.map((point) => point.y),
      ...chaseCurve.map((point) => point.y),
      ...(catchUpPosition === null ? [] : [catchUpPosition]),
    ],
    { minXPadding: 1.2, minYPadding: 2.2 },
  );

  const segments = [
    {
      from: { x: t, y: currentChasePosition },
      to: { x: t, y: currentLeadPosition },
      dashed: true,
      color: "rgba(244, 114, 24, 0.55)",
      lineWidth: 2,
    },
  ];
  const labels = [
    { x: xMax - 0.8, y: leadCurve[leadCurve.length - 1].y, text: "前车 s-t", color: "rgba(29,111,165,0.92)", dx: 10, dy: -10 },
    { x: xMax - 0.8, y: chaseCurve[chaseCurve.length - 1].y, text: "后车 s-t", color: "rgba(34,197,94,0.92)", dx: 10, dy: 16 },
    { x: t, y: (currentLeadPosition + currentChasePosition) * 0.5, text: `间距 ${formatNumber(currentGap)}`, color: "rgba(244,114,24,0.92)", dx: 12, dy: -8 },
  ];

  if (catchUpTime !== null) {
    segments.push({
      from: { x: catchUpTime, y: 0 },
      to: { x: catchUpTime, y: catchUpPosition },
      dashed: true,
      color: "rgba(139,92,246,0.5)",
      lineWidth: 2,
    });
    labels.push({
      x: catchUpTime,
      y: catchUpPosition,
      text: `追上于 t = ${formatNumber(catchUpTime)}`,
      color: "rgba(139,92,246,0.92)",
      dx: 12,
      dy: -10,
    });
  }

  return {
    derived: {
      canCatchUp,
      catchUpTime,
      catchUpPosition,
      currentTime: t,
      currentGap,
      leadPosition: currentLeadPosition,
      chasePosition: currentChasePosition,
      chaseVelocity: currentChaseVelocity,
      leadEquation: formatLinearExpression("sA", leadStart, leadSpeed),
      chaseEquation: `sB = ${formatNumber(chaseStart)} ${formatSignedNumber(chaseInitialSpeed).replace(absToken(chaseInitialSpeed), Math.abs(chaseInitialSpeed) < 1e-8 ? "0" : `${Math.abs(chaseInitialSpeed) === 1 ? "" : formatNumber(Math.abs(chaseInitialSpeed))}t`)} ${formatSignedNumber(0.5 * chaseAcceleration).replace(absToken(0.5 * chaseAcceleration), `${Math.abs(0.5 * chaseAcceleration) === 1 ? "" : formatNumber(Math.abs(0.5 * chaseAcceleration))}t²`)}`,
      studentSummary: canCatchUp
        ? `后车虽然不是一直匀速，但它在持续加速，所以会在 ${formatNumber(catchUpTime)} 秒时追上前车。`
        : "后车当前的加速条件还不足以消除起点差，所以在这段模型里还看不到追上时刻。",
    },
    view: {
      viewport,
      showGrid: true,
      showAxes: true,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#1d6fa5",
          lineWidth: 4,
          points: leadCurve,
        },
        {
          type: "polyline",
          color: "#34a853",
          lineWidth: 4,
          points: chaseCurve,
        },
      ],
      points: [
        { x: 0, y: leadStart, label: "前车起点", color: "#1d6fa5", radius: 5 },
        { x: 0, y: chaseStart, label: "后车起点", color: "#34a853", radius: 5 },
        { x: t, y: currentLeadPosition, label: "前车当前", color: "#1d6fa5", radius: 6 },
        { x: t, y: currentChasePosition, label: "后车当前", color: "#34a853", radius: 6 },
        ...(catchUpTime === null
          ? []
          : [{ x: catchUpTime, y: catchUpPosition, label: "追上时刻", color: "#8b5cf6", radius: 6 }]),
      ],
      segments,
      labels,
    },
  };
}

export function buildFreeFallModel({ g, h0, t }) {
  const xMax = Math.max(5, t + 2);
  const times = buildTimeSamples(xMax, 0.1);
  const curvePoints = times.map((time) => ({
    x: time,
    y: g * time,
  }));
  const currentVelocity = g * t;
  const displacement = 0.5 * g * t * t;
  const currentHeight = h0 - displacement;
  const viewport = buildViewport(
    [0, xMax, t],
    [0, currentVelocity, ...curvePoints.map((point) => point.y)],
    { minXPadding: 1, minYPadding: 2.4 },
  );
  const guides = currentTimeGuides(t, currentVelocity, `t = ${formatNumber(t)}`, `v = ${formatNumber(currentVelocity)}`);

  return {
    derived: {
      velocityEquation: formatLinearExpression("v", 0, g),
      currentTime: t,
      currentVelocity,
      displacement,
      currentHeight,
      gravity: g,
      initialHeight: h0,
      studentSummary: currentHeight > 0
        ? "自由落体里速度会稳定增大，图像下方的面积表示这段时间已经下落了多少。"
        : "如果位移累计已经超过初始高度，说明按照这个参数物体已经落到地面以下，讲题时要提醒孩子回到真实情境判断。",
    },
    view: {
      viewport,
      showGrid: true,
      showAxes: true,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#0f766e",
          lineWidth: 4,
          points: curvePoints,
        },
      ],
      polygons: [
        {
          points: [
            { x: 0, y: 0 },
            { x: t, y: 0 },
            { x: t, y: currentVelocity },
          ],
          color: "rgba(15,118,110,0.55)",
          fillColor: "rgba(15,118,110,0.16)",
          lineWidth: 2,
        },
      ],
      points: [
        { x: 0, y: 0, label: "开始下落", color: "#1d4ed8", radius: 5 },
        { x: t, y: currentVelocity, label: "当前速度", color: "#f97316", radius: 6 },
      ],
      segments: guides.segments,
      labels: [
        ...guides.labels,
        { x: xMax - 0.8, y: curvePoints[curvePoints.length - 1].y, text: "自由落体 v-t", color: "rgba(15,118,110,0.92)", dx: 10, dy: -10 },
        { x: t * 0.45, y: currentVelocity * 0.35, text: `下落位移 ${formatNumber(displacement)}`, color: "rgba(13,148,136,0.92)", dx: 12, dy: -10 },
        { x: t, y: currentVelocity, text: `剩余高度 ${formatNumber(currentHeight)}`, color: "rgba(249,115,22,0.92)", dx: 12, dy: 16 },
      ],
    },
  };
}

export function buildProjectileMotionModel({ v0x, h0, g, t }) {
  const timeToGround = Math.sqrt((2 * h0) / g);
  const clampedTime = Math.min(t, timeToGround);
  const currentX = v0x * clampedTime;
  const currentY = h0 - 0.5 * g * clampedTime * clampedTime;
  const currentVy = g * clampedTime;
  const currentSpeed = Math.sqrt(v0x * v0x + currentVy * currentVy);
  const range = v0x * timeToGround;
  const xMax = Math.max(6, range + 1.5);
  const yMax = Math.max(6, h0 + 2);
  const times = buildTimeSamples(timeToGround, Math.max(0.05, timeToGround / 40));
  const pathCurve = times.map((time) => ({
    x: v0x * time,
    y: h0 - 0.5 * g * time * time,
  }));
  const viewport = buildViewport(
    [0, currentX, range, xMax],
    [0, h0, currentY, yMax],
    { minXPadding: 1.2, minYPadding: 1.5 },
  );

  return {
    derived: {
      currentTime: clampedTime,
      currentX,
      currentY,
      currentVy,
      currentSpeed: Number(formatNumber(currentSpeed)),
      timeToGround: Number(formatNumber(timeToGround)),
      range: Number(formatNumber(range)),
      studentSummary: "平抛运动里，水平方向始终匀速，竖直方向始终自由落体，所以一定要把同一时刻拆成两个方向同时看。",
    },
    view: {
      viewport,
      showGrid: true,
      showAxes: true,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#1d6fa5",
          lineWidth: 4,
          points: pathCurve,
        },
      ],
      points: [
        { x: 0, y: h0, label: "抛出点", color: "#1d4ed8", radius: 6 },
        { x: currentX, y: currentY, label: "当前点", color: "#f97316", radius: 6 },
        { x: range, y: 0, label: "落地点", color: "#16a34a", radius: 6 },
      ],
      segments: [
        {
          from: { x: currentX, y: 0 },
          to: { x: currentX, y: currentY },
          dashed: true,
          color: "rgba(29,111,165,0.45)",
          lineWidth: 2,
        },
        {
          from: { x: 0, y: currentY },
          to: { x: currentX, y: currentY },
          dashed: true,
          color: "rgba(249,115,22,0.45)",
          lineWidth: 2,
        },
      ],
      labels: [
        { x: currentX, y: 0, text: `x = ${formatNumber(currentX)}`, color: "rgba(29,111,165,0.92)", dx: 8, dy: -10 },
        { x: 0, y: currentY, text: `y = ${formatNumber(currentY)}`, color: "rgba(249,115,22,0.92)", dx: 8, dy: -8 },
        { x: range * 0.7, y: h0 * 0.6, text: "平抛轨迹", color: "rgba(29,111,165,0.92)", dx: 10, dy: -10 },
      ],
    },
  };
}

export function buildMotionGraphModel({ v0, a, t }) {
  const xMax = Math.max(6, t + 2);
  const times = buildTimeSamples(xMax, 0.1);
  const displacementCurve = times.map((time) => ({
    x: time,
    y: v0 * time + 0.5 * a * time * time,
  }));
  const velocityCurve = times.map((time) => ({
    x: time,
    y: v0 + a * time,
  }));
  const displacement = v0 * t + 0.5 * a * t * t;
  const currentVelocity = v0 + a * t;
  const viewport = buildViewport(
    [0, xMax, t],
    [
      0,
      displacement,
      currentVelocity,
      ...displacementCurve.map((point) => point.y),
      ...velocityCurve.map((point) => point.y),
    ],
    { minXPadding: 1, minYPadding: 2 },
  );

  return {
    derived: {
      currentTime: t,
      currentVelocity,
      displacement,
      studentSummary: "s-t 图像更适合读位置变化过程，v-t 图像更适合读速度变化规律；同一个运动过程，要学会在两张图之间来回翻译。",
    },
    view: {
      viewport,
      showGrid: true,
      showAxes: true,
    },
    drawModel: {
      curves: [
        {
          type: "polyline",
          color: "#1d6fa5",
          lineWidth: 4,
          points: displacementCurve,
        },
        {
          type: "polyline",
          color: "#8b5cf6",
          lineWidth: 4,
          points: velocityCurve,
        },
      ],
      points: [
        { x: t, y: displacement, label: "s-t 当前", color: "#1d6fa5", radius: 6 },
        { x: t, y: currentVelocity, label: "v-t 当前", color: "#8b5cf6", radius: 6 },
      ],
      segments: [
        {
          from: { x: t, y: 0 },
          to: { x: t, y: displacement },
          dashed: true,
          color: "rgba(29,111,165,0.4)",
          lineWidth: 2,
        },
        {
          from: { x: t, y: 0 },
          to: { x: t, y: currentVelocity },
          dashed: true,
          color: "rgba(139,92,246,0.4)",
          lineWidth: 2,
        },
      ],
      labels: [
        { x: xMax - 0.8, y: displacementCurve[displacementCurve.length - 1].y, text: "s-t", color: "rgba(29,111,165,0.92)", dx: 10, dy: -10 },
        { x: xMax - 0.8, y: velocityCurve[velocityCurve.length - 1].y, text: "v-t", color: "rgba(139,92,246,0.92)", dx: 10, dy: 16 },
      ],
    },
  };
}
