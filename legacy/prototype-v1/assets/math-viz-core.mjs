export function linearValue(k, b, x) {
  return k * x + b;
}

export function exponentialValue(base, x) {
  return base ** x;
}

export function powerValue(exponent, x) {
  return x ** exponent;
}

export function powerCurvePoints(exponent, xMin = -4, xMax = 4, step = 0.05) {
  const points = [];
  for (let x = xMin; x <= xMax + 1e-8; x += step) {
    const safeX = roundTiny(x);
    const y = powerValue(exponent, safeX);
    if (!Number.isFinite(y) || Number.isNaN(y)) continue;
    points.push({ x: safeX, y: roundTiny(y) });
  }
  return points;
}

export function sampleCurve(fn, viewport, step = 0.1) {
  const points = [];
  for (let x = viewport.xMin; x <= viewport.xMax + 1e-8; x += step) {
    const safeX = roundTiny(x);
    const y = fn(safeX);
    if (!Number.isFinite(y) || Number.isNaN(y)) continue;
    points.push({ x: safeX, y: roundTiny(y) });
  }
  return points;
}

export function formatEquationParts(parts) {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

export function powerFeatures(exponent) {
  const roundedExponent = roundTiny(exponent);
  let symmetry = "没有明显对称";
  let domainHint = "所有实数都可以取";
  let graphHint = "图像会随指数变化而改变形状";
  let studentSummary = "先看指数是奇数、偶数，还是 0 到 1 之间的小数。";

  if (Number.isInteger(roundedExponent) && Math.abs(roundedExponent % 2) === 0) {
    symmetry = "关于 y 轴对称";
    graphHint = "左右两边对称展开";
    studentSummary = "偶次幂会左右对称，x 取正取负，函数值都不会变号。";
  } else if (Number.isInteger(roundedExponent)) {
    symmetry = "关于原点对称";
    graphHint = "会穿过原点，左下到右上延伸";
    studentSummary = "奇次幂会保留正负号，所以图像会穿过原点并保持原点对称。";
  } else if (roundedExponent > 0 && roundedExponent < 1) {
    domainHint = "只看 x ≥ 0 的部分";
    graphHint = "起步很陡，后面逐渐放缓";
    studentSummary = "分数指数最重要的是先盯住定义域，负数通常先不看。";
  }

  return {
    exponent: roundedExponent,
    symmetry,
    domainHint,
    graphHint,
    studentSummary,
  };
}

export function logarithmValue(base, x) {
  return Math.log(x) / Math.log(base);
}

export function quadraticValue(a, b, c, x) {
  return a * x * x + b * x + c;
}

export function reciprocalValue(k, x) {
  return k / x;
}

export function transformValue(baseType, x, options = {}) {
  const {
    horizontalShift = 0,
    verticalShift = 0,
    horizontalScale = 1,
    verticalScale = 1,
  } = options;
  const innerX = horizontalScale * (x - horizontalShift);
  const baseValue = baseFunctionValue(baseType, innerX);
  return verticalScale * baseValue + verticalShift;
}

export function transformFeatures(options = {}) {
  const {
    baseType = "quadratic",
    horizontalShift = 0,
    verticalShift = 0,
    horizontalScale = 1,
    verticalScale = 1,
  } = options;

  return {
    baseType,
    baseLabel: baseFunctionLabel(baseType),
    horizontalMove: shiftText(horizontalShift, "向右平移", "向左平移"),
    verticalMove: shiftText(verticalShift, "向上平移", "向下平移"),
    horizontalScaleHint: horizontalScale >= 1 ? "横向更紧" : "横向更宽",
    verticalScaleHint: Math.abs(verticalScale) >= 1 ? "纵向拉伸更明显" : "纵向压缩更平缓",
  };
}

export function expLogFeatures(base) {
  const expTrend = base > 1 ? "增长" : "衰减";
  const logTrend = base > 1 ? "增长" : "衰减";

  return {
    base,
    expTrend,
    logTrend,
    expAnchor: { x: 0, y: 1 },
    logAnchor: { x: 1, y: 0 },
    inverseHint: "两条曲线关于 y = x 对称",
  };
}

export function arithmeticSequenceValue(a1, d, n) {
  return a1 + (n - 1) * d;
}

export function geometricSequenceValue(a1, q, n) {
  return a1 * (q ** (n - 1));
}

export function sequenceTerms(a1, d, q, count) {
  return {
    arithmetic: Array.from({ length: count }, (_, index) => arithmeticSequenceValue(a1, d, index + 1)),
    geometric: Array.from({ length: count }, (_, index) => geometricSequenceValue(a1, q, index + 1)),
  };
}

export function sequenceComparisonFeatures(a1, d, q, count) {
  const terms = sequenceTerms(a1, d, q, count);
  let arithmeticStyle = "线性增长";
  if (d < 0) arithmeticStyle = "线性递减";
  if (Math.abs(d) < 1e-8) arithmeticStyle = "保持不变";

  let geometricStyle = "倍增增长";
  if (q > 0 && q < 1) geometricStyle = "指数衰减";
  if (Math.abs(q - 1) < 1e-8) geometricStyle = "保持不变";

  return {
    arithmeticLast: terms.arithmetic[terms.arithmetic.length - 1],
    geometricLast: terms.geometric[terms.geometric.length - 1],
    arithmeticStyle,
    geometricStyle,
    terms,
  };
}

export function recursiveSequenceTerms(a1, factor, offset, count) {
  const terms = [roundTiny(a1)];

  for (let index = 1; index < count; index += 1) {
    const previous = terms[index - 1];
    terms.push(roundTiny(factor * previous + offset));
  }

  const lastTerm = terms[terms.length - 1];
  let growthHint = "变化平稳";
  if (terms.length >= 2) {
    const delta = lastTerm - terms[terms.length - 2];
    if (delta > 3) growthHint = "增长很快";
    else if (delta > 0) growthHint = "稳步增长";
    else if (delta < -3) growthHint = "下降很快";
    else if (delta < 0) growthHint = "稳步下降";
  }

  return {
    terms,
    lastTerm,
    growthHint,
  };
}

export function lineCircleRelation(k, b, cx, cy, r) {
  const distance = Math.abs(k * cx - cy + b) / Math.sqrt(k * k + 1);
  const delta = distance - r;
  let relation = "相离";
  let intersectionCount = 0;
  let points = [];

  if (Math.abs(delta) < 1e-8) {
    relation = "相切";
    intersectionCount = 1;
  } else if (distance < r) {
    relation = "相交";
    intersectionCount = 2;
  }

  const A = 1 + k * k;
  const B = 2 * (k * (b - cy) - cx);
  const C = cx * cx + (b - cy) * (b - cy) - r * r;
  const discriminant = B * B - 4 * A * C;

  if (discriminant >= -1e-8) {
    const safeDisc = Math.max(0, discriminant);
    const sqrtDisc = Math.sqrt(safeDisc);
    const x1 = (-B - sqrtDisc) / (2 * A);
    const y1 = k * x1 + b;
    points.push({ x: roundTiny(x1), y: roundTiny(y1) });
    if (sqrtDisc > 1e-8) {
      const x2 = (-B + sqrtDisc) / (2 * A);
      const y2 = k * x2 + b;
      points.push({ x: roundTiny(x2), y: roundTiny(y2) });
    }
  }

  return {
    relation,
    distance: roundTiny(distance),
    intersectionCount,
    points,
  };
}

export function lineTwoPointsFromViewport(k, b, viewport) {
  return [
    { x: roundTiny(viewport.xMin), y: roundTiny(linearValue(k, b, viewport.xMin)) },
    { x: roundTiny(viewport.xMax), y: roundTiny(linearValue(k, b, viewport.xMax)) },
  ];
}

export function circleRadiusSegment(h, k, r) {
  return {
    from: { x: roundTiny(h), y: roundTiny(k) },
    to: { x: roundTiny(h + r), y: roundTiny(k) },
  };
}

export function circleDistanceSummary(k, b, cx, cy, r) {
  const relation = lineCircleRelation(k, b, cx, cy, r);
  let compareHint = "距离小于半径，所以是相交";
  if (relation.relation === "相切") compareHint = "距离等于半径，所以是相切";
  if (relation.relation === "相离") compareHint = "距离大于半径，所以是相离";

  return {
    ...relation,
    compareHint,
  };
}

export function lineDisplayEquation(k, b) {
  const safeK = roundTiny(k);
  const safeB = roundTiny(b);

  if (Math.abs(safeK) < 1e-8) {
    return `y = ${safeB}`;
  }

  let slopeText = `${safeK}x`;
  if (Math.abs(safeK - 1) < 1e-8) slopeText = "x";
  if (Math.abs(safeK + 1) < 1e-8) slopeText = "-x";

  if (Math.abs(safeB) < 1e-8) {
    return `y = ${slopeText}`;
  }

  return `y = ${slopeText} ${safeB > 0 ? "+" : "-"} ${Math.abs(safeB)}`;
}

export function solidSectionFeatures(solidType, size, height, sliceRatio) {
  const ratio = Math.min(Math.max(sliceRatio, 0), 1);

  if (solidType === "prism") {
    return {
      solidType,
      shape: "正方形",
      sliceRatio: ratio,
      sectionSize: roundTiny(size),
      area: roundTiny(size * size),
      areaTrend: "保持不变",
    };
  }

  if (solidType === "pyramid") {
    const sectionSize = size * (1 - ratio);
    return {
      solidType,
      shape: "正方形",
      sliceRatio: ratio,
      sectionSize: roundTiny(sectionSize),
      area: roundTiny(sectionSize * sectionSize),
      areaTrend: "逐渐缩小",
    };
  }

  if (solidType === "cylinder") {
    return {
      solidType,
      shape: "圆",
      sliceRatio: ratio,
      sectionRadius: roundTiny(size),
      area: Math.PI * size * size,
      areaTrend: "保持不变",
    };
  }

  const sectionRadius = size * (1 - ratio);
  return {
    solidType,
    shape: "圆",
    sliceRatio: ratio,
    sectionRadius: roundTiny(sectionRadius),
    area: Math.PI * sectionRadius * sectionRadius,
    areaTrend: "逐渐缩小",
  };
}

export function solidRotationFeatures(profileType, radius, height) {
  const safeRadius = Math.max(roundTiny(radius), 0.1);
  const safeHeight = Math.max(roundTiny(height), 0);

  if (profileType === "triangle") {
    return {
      profileType,
      solidName: "圆锥",
      radius: safeRadius,
      height: Math.max(safeHeight, 0.1),
      summary: "直角三角形绕一条直角边旋转，可以形成圆锥。",
    };
  }

  if (profileType === "semicircle") {
    return {
      profileType,
      solidName: "球",
      radius: safeRadius,
      height: safeRadius * 2,
      summary: "半圆绕直径旋转，会形成球。",
    };
  }

  return {
    profileType: "rectangle",
    solidName: "圆柱",
    radius: safeRadius,
    height: Math.max(safeHeight, 0.1),
    summary: "长方形绕一条边旋转，可以形成圆柱。",
  };
}

function roundTiny(value) {
  const rounded = Math.abs(value) < 1e-8 ? 0 : value;
  return Number(rounded.toFixed(6));
}

function baseFunctionValue(baseType, x) {
  if (baseType === "absolute") return Math.abs(x);
  if (baseType === "sine") return Math.sin(x);
  return x * x;
}

function baseFunctionLabel(baseType) {
  if (baseType === "absolute") return "|x|";
  if (baseType === "sine") return "sin(x)";
  return "x^2";
}

function shiftText(value, positiveLabel, negativeLabel) {
  if (Math.abs(value) < 1e-8) return "不平移";
  return value > 0 ? `${positiveLabel} ${Math.abs(value).toFixed(2)}` : `${negativeLabel} ${Math.abs(value).toFixed(2)}`;
}

function axisSquare(axisName, shift) {
  if (Math.abs(shift) < 1e-8) return `${axisName}^2`;
  const sign = shift > 0 ? "-" : "+";
  return `(${axisName} ${sign} ${Math.abs(roundTiny(shift))})^2`;
}

function compactNumber(value) {
  const safeValue = roundTiny(value);
  if (Math.abs(safeValue) < 1e-8) return "0";
  return Number(safeValue)
    .toFixed(6)
    .replace(/\.0+$/, "")
    .replace(/(\.\d*?)0+$/, "$1");
}

function compactFixed(value, digits = 2) {
  const safeValue = roundTiny(value);
  if (Math.abs(safeValue) < 1e-8) return "0";
  return Number(safeValue)
    .toFixed(digits)
    .replace(/\.0+$/, "")
    .replace(/(\.\d*?)0+$/, "$1");
}

export function linearFeatures(k, b) {
  const absK = Math.abs(k);
  let steepness = "中等";
  if (absK > 1.2) steepness = "较陡";
  if (absK < 0.6) steepness = "较缓";

  let trend = "水平";
  if (k > 0) trend = "上升";
  if (k < 0) trend = "下降";

  return {
    yIntercept: b,
    trend,
    steepness,
    xIntercept: Math.abs(k) < 1e-8 ? null : -b / k,
  };
}

export function linearTeachingNotes(k, b) {
  const relationType = Math.abs(k) < 1e-8 ? "常数函数" : Math.abs(b) < 1e-8 ? "正比例函数" : "一次函数";
  const passesOrigin = Math.abs(b) < 1e-8;
  const specialCases = [];

  if (Math.abs(k) < 1e-8) specialCases.push("水平线");
  if (passesOrigin) specialCases.push("过原点");
  if (k > 0) specialCases.push("y 随 x 增大而增大");
  if (k < 0) specialCases.push("y 随 x 增大而减小");

  let studentSummary = "先盯住 k 和 b，再看图像怎么变化。";
  if (relationType === "常数函数") {
    studentSummary = "现在 k = 0，所以不管 x 怎么变，y 都保持不变。";
  } else if (passesOrigin) {
    studentSummary = "现在 b = 0，所以这条直线会穿过原点。";
  } else if (k > 0) {
    studentSummary = "现在直线在上升，x 越大，y 也越大。";
  } else if (k < 0) {
    studentSummary = "现在直线在下降，x 越大，y 反而越小。";
  }

  return {
    relationType,
    passesOrigin,
    specialCases,
    studentSummary,
  };
}

export function reciprocalFeatures(k) {
  const safeK = roundTiny(k);
  const branchHint = safeK >= 0 ? "图像在第一、三象限" : "图像在第二、四象限";

  return {
    k: safeK,
    branchHint,
    asymptotes: ["x = 0", "y = 0"],
    symmetry: "关于原点对称",
    studentSummary: "先看 k 的正负判断象限，再记住两条坐标轴都是渐近线。",
  };
}

export function sineValue(amplitude, omega, phase, offset, x) {
  return amplitude * Math.sin(omega * x + phase) + offset;
}

export function cosineValue(amplitude, omega, phase, offset, x) {
  return amplitude * Math.cos(omega * x + phase) + offset;
}

export function sineKeyPoints({ amplitude, omega, phase, offset }) {
  const safeOmega = Math.abs(omega) < 1e-8 ? 1 : omega;
  const period = (2 * Math.PI) / Math.abs(safeOmega);
  const startX = -phase / safeOmega;
  const step = period / 4;

  return Array.from({ length: 5 }, (_, index) => {
    const x = startX + step * index;
    return {
      x,
      y: sineValue(amplitude, omega, phase, offset, x),
    };
  });
}

export function cosineKeyPoints({ amplitude, omega, phase, offset }) {
  const safeOmega = Math.abs(omega) < 1e-8 ? 1 : omega;
  const period = (2 * Math.PI) / Math.abs(safeOmega);
  const startX = -phase / safeOmega;
  const step = period / 4;

  return Array.from({ length: 5 }, (_, index) => {
    const x = startX + step * index;
    return {
      x,
      y: cosineValue(amplitude, omega, phase, offset, x),
    };
  });
}

export function sineAngleGuide(angle, tolerance = 0.05) {
  const fullTurn = Math.PI * 2;
  let normalizedAngle = angle % fullTurn;
  if (normalizedAngle < 0) normalizedAngle += fullTurn;

  const keyAngles = [
    { value: 0, label: "0", pointType: "起点" },
    { value: Math.PI / 2, label: "π/2", pointType: "波峰" },
    { value: Math.PI, label: "π", pointType: "过零点" },
    { value: (3 * Math.PI) / 2, label: "3π/2", pointType: "波谷" },
    { value: fullTurn, label: "2π", pointType: "周期终点" },
  ];

  let keyAngleLabel = null;
  let pointType = "普通位置";
  for (const item of keyAngles) {
    const distance = Math.min(
      Math.abs(normalizedAngle - item.value),
      Math.abs(normalizedAngle + fullTurn - item.value),
      Math.abs(normalizedAngle - (item.value + fullTurn))
    );
    if (distance <= tolerance) {
      keyAngleLabel = item.label;
      pointType = item.pointType;
      break;
    }
  }

  let quadrant = "坐标轴上";
  if (normalizedAngle > 0 && normalizedAngle < Math.PI / 2) quadrant = "第一象限";
  else if (normalizedAngle > Math.PI / 2 && normalizedAngle < Math.PI) quadrant = "第二象限";
  else if (normalizedAngle > Math.PI && normalizedAngle < (3 * Math.PI) / 2) quadrant = "第三象限";
  else if (normalizedAngle > (3 * Math.PI) / 2 && normalizedAngle < fullTurn) quadrant = "第四象限";
  else if (Math.abs(normalizedAngle - Math.PI / 2) <= tolerance) quadrant = "第一象限";

  const currentValue = Math.sin(normalizedAngle);
  let valueSign = "0";
  if (currentValue > 1e-8) valueSign = "正";
  if (currentValue < -1e-8) valueSign = "负";

  return {
    normalizedAngle,
    keyAngleLabel,
    pointType,
    quadrant,
    valueSign,
  };
}

export function cosineAngleGuide(angle, tolerance = 0.05) {
  const fullTurn = Math.PI * 2;
  let normalizedAngle = angle % fullTurn;
  if (normalizedAngle < 0) normalizedAngle += fullTurn;

  const keyAngles = [
    { value: 0, label: "0", pointType: "波峰" },
    { value: Math.PI / 2, label: "π/2", pointType: "过零点" },
    { value: Math.PI, label: "π", pointType: "波谷" },
    { value: (3 * Math.PI) / 2, label: "3π/2", pointType: "过零点" },
    { value: fullTurn, label: "2π", pointType: "周期终点" },
  ];

  let keyAngleLabel = null;
  let pointType = "普通位置";
  for (const item of keyAngles) {
    const distance = Math.min(
      Math.abs(normalizedAngle - item.value),
      Math.abs(normalizedAngle + fullTurn - item.value),
      Math.abs(normalizedAngle - (item.value + fullTurn))
    );
    if (distance <= tolerance) {
      keyAngleLabel = item.label;
      pointType = item.pointType;
      break;
    }
  }

  let quadrant = "坐标轴上";
  if (normalizedAngle > 0 && normalizedAngle < Math.PI / 2) quadrant = "第一象限";
  else if (normalizedAngle > Math.PI / 2 && normalizedAngle < Math.PI) quadrant = "第二象限";
  else if (normalizedAngle > Math.PI && normalizedAngle < (3 * Math.PI) / 2) quadrant = "第三象限";
  else if (normalizedAngle > (3 * Math.PI) / 2 && normalizedAngle < fullTurn) quadrant = "第四象限";

  const currentValue = Math.cos(normalizedAngle);
  let valueSign = "0";
  if (currentValue > 1e-8) valueSign = "正";
  if (currentValue < -1e-8) valueSign = "负";

  return {
    normalizedAngle,
    keyAngleLabel,
    pointType,
    quadrant,
    valueSign,
  };
}

export function sineTransformFeatures(amplitude, omega, phase, offset) {
  const safeOmega = Math.abs(omega) < 1e-8 ? 1 : omega;
  const amplitudeAbs = Math.abs(amplitude);
  const period = (2 * Math.PI) / Math.abs(safeOmega);
  const phaseShift = -phase / safeOmega;
  const range = [offset - amplitudeAbs, offset + amplitudeAbs];

  let openingTrend = "先上后下";
  if (amplitude * omega < 0) openingTrend = "先下后上";

  return {
    amplitude: amplitudeAbs,
    signedAmplitude: amplitude,
    omega,
    period,
    phaseShift,
    verticalShift: offset,
    range,
    openingTrend,
  };
}

export function tangentValue(omega, phase, offset, x) {
  return Math.tan(omega * x + phase) + offset;
}

export function tangentAsymptotes({ omega = 1, phase = 0 }, xMin = -Math.PI, xMax = Math.PI) {
  const safeOmega = Math.abs(omega) < 1e-8 ? 1 : omega;
  const lower = Math.min(xMin, xMax);
  const upper = Math.max(xMin, xMax);
  const startK = Math.ceil(((safeOmega * lower + phase) - Math.PI / 2) / Math.PI);
  const endK = Math.floor(((safeOmega * upper + phase) - Math.PI / 2) / Math.PI);
  const asymptotes = [];

  for (let k = startK; k <= endK; k += 1) {
    const x = (Math.PI / 2 - phase + k * Math.PI) / safeOmega;
    if (x >= lower - 1e-8 && x <= upper + 1e-8) asymptotes.push(x);
  }

  return asymptotes.sort((a, b) => a - b);
}

export function tangentFeatures(omega, phase, offset) {
  const safeOmega = Math.abs(omega) < 1e-8 ? 1 : omega;
  return {
    omega,
    phase,
    offset,
    period: Math.PI / Math.abs(safeOmega),
    phaseShift: -phase / safeOmega,
    rangeHint: "没有最大值和最小值",
    asymptoteHint: "靠近渐近线时会越来越陡，但不会真正碰到它",
  };
}

export function circleStandardFeatures(h, k, r) {
  const radius = Math.max(roundTiny(r), 0.1);
  return {
    center: { x: roundTiny(h), y: roundTiny(k) },
    radius,
    radiusSquared: roundTiny(radius * radius),
    standardEquation: `${axisSquare("x", h)} + ${axisSquare("y", k)} = ${roundTiny(radius * radius)}`,
  };
}

export function parabolaStandardFeatures(direction, a) {
  const safeA = Math.max(Math.abs(roundTiny(a)), 0.1);
  const factor = compactNumber(4 * safeA);

  if (direction === "down") {
    return {
      direction,
      directionLabel: "开口向下",
      vertex: { x: 0, y: 0 },
      focus: { x: 0, y: -safeA },
      directrix: `y = ${compactNumber(safeA)}`,
      axis: "x = 0",
      standardEquation: `x^2 = -${factor}y`,
    };
  }

  if (direction === "right") {
    return {
      direction,
      directionLabel: "开口向右",
      vertex: { x: 0, y: 0 },
      focus: { x: safeA, y: 0 },
      directrix: `x = -${compactNumber(safeA)}`,
      axis: "y = 0",
      standardEquation: `y^2 = ${factor}x`,
    };
  }

  if (direction === "left") {
    return {
      direction,
      directionLabel: "开口向左",
      vertex: { x: 0, y: 0 },
      focus: { x: -safeA, y: 0 },
      directrix: `x = ${compactNumber(safeA)}`,
      axis: "y = 0",
      standardEquation: `y^2 = -${factor}x`,
    };
  }

  return {
    direction: "up",
    directionLabel: "开口向上",
    vertex: { x: 0, y: 0 },
    focus: { x: 0, y: safeA },
    directrix: `y = -${compactNumber(safeA)}`,
    axis: "x = 0",
    standardEquation: `x^2 = ${factor}y`,
  };
}

export function ellipseStandardFeatures(orientation, a, b) {
  const majorAxis = Math.max(Math.abs(roundTiny(a)), 0.1);
  const minorAxis = Math.min(Math.max(Math.abs(roundTiny(b)), 0.1), majorAxis);
  const c = roundTiny(Math.sqrt(Math.max(majorAxis * majorAxis - minorAxis * minorAxis, 0)));
  const eccentricity = roundTiny(c / majorAxis);

  if (orientation === "vertical") {
    return {
      orientation,
      center: { x: 0, y: 0 },
      semiMajorAxis: majorAxis,
      semiMinorAxis: minorAxis,
      focusTop: { x: 0, y: c },
      focusBottom: { x: 0, y: -c },
      vertices: [
        { x: 0, y: majorAxis },
        { x: 0, y: -majorAxis },
      ],
      coVertices: [
        { x: minorAxis, y: 0 },
        { x: -minorAxis, y: 0 },
      ],
      eccentricity,
      standardEquation: `x^2/${compactNumber(minorAxis * minorAxis)} + y^2/${compactNumber(majorAxis * majorAxis)} = 1`,
    };
  }

  return {
    orientation: "horizontal",
    center: { x: 0, y: 0 },
    semiMajorAxis: majorAxis,
    semiMinorAxis: minorAxis,
    focusLeft: { x: -c, y: 0 },
    focusRight: { x: c, y: 0 },
    vertices: [
      { x: -majorAxis, y: 0 },
      { x: majorAxis, y: 0 },
    ],
    coVertices: [
      { x: 0, y: minorAxis },
      { x: 0, y: -minorAxis },
    ],
    eccentricity,
    standardEquation: `x^2/${compactNumber(majorAxis * majorAxis)} + y^2/${compactNumber(minorAxis * minorAxis)} = 1`,
  };
}

export function hyperbolaStandardFeatures(orientation, a, b) {
  const transverseAxis = Math.max(Math.abs(roundTiny(a)), 0.1);
  const conjugateAxis = Math.max(Math.abs(roundTiny(b)), 0.1);
  const c = roundTiny(Math.sqrt(transverseAxis * transverseAxis + conjugateAxis * conjugateAxis));
  const eccentricity = roundTiny(c / transverseAxis);
  const horizontalSlope = roundTiny(conjugateAxis / transverseAxis);
  const verticalSlope = roundTiny(transverseAxis / conjugateAxis);

  if (orientation === "vertical") {
    return {
      orientation,
      center: { x: 0, y: 0 },
      semiTransverseAxis: transverseAxis,
      semiConjugateAxis: conjugateAxis,
      focusTop: { x: 0, y: c },
      focusBottom: { x: 0, y: -c },
      vertices: [
        { x: 0, y: -transverseAxis },
        { x: 0, y: transverseAxis },
      ],
      asymptotes: [
        `y = ${compactFixed(verticalSlope)}x`,
        `y = -${compactFixed(verticalSlope)}x`,
      ],
      eccentricity,
      standardEquation: `y^2/${compactNumber(transverseAxis * transverseAxis)} - x^2/${compactNumber(conjugateAxis * conjugateAxis)} = 1`,
    };
  }

  return {
    orientation: "horizontal",
    center: { x: 0, y: 0 },
    semiTransverseAxis: transverseAxis,
    semiConjugateAxis: conjugateAxis,
    focusLeft: { x: -c, y: 0 },
    focusRight: { x: c, y: 0 },
    vertices: [
      { x: -transverseAxis, y: 0 },
      { x: transverseAxis, y: 0 },
    ],
    asymptotes: [
      `y = ${compactFixed(horizontalSlope)}x`,
      `y = -${compactFixed(horizontalSlope)}x`,
    ],
    eccentricity,
    standardEquation: `x^2/${compactNumber(transverseAxis * transverseAxis)} - y^2/${compactNumber(conjugateAxis * conjugateAxis)} = 1`,
  };
}

export function conicHorizontalLineRelation(family, lineY, params = {}) {
  const safeLineY = roundTiny(lineY);

  if (family === "ellipse") {
    const a = Math.max(Math.abs(roundTiny(params.a ?? 5)), 0.1);
    const b = Math.max(Math.abs(roundTiny(params.b ?? 3)), 0.1);
    const ratio = 1 - (safeLineY * safeLineY) / (b * b);

    if (ratio < -1e-8) {
      return {
        family,
        relation: "相离",
        intersectionCount: 0,
        points: [],
        compareHint: "水平直线已经超过椭圆的上下边界，所以没有公共点。",
      };
    }

    if (Math.abs(ratio) < 1e-8) {
      return {
        family,
        relation: "相切",
        intersectionCount: 1,
        points: [{ x: 0, y: safeLineY }],
        compareHint: "水平直线正好碰到椭圆的最高点或最低点，所以只有一个公共点。",
      };
    }

    const x = roundTiny(a * Math.sqrt(ratio));
    return {
      family,
      relation: "相交",
      intersectionCount: 2,
      points: [
        { x: -x, y: safeLineY },
        { x, y: safeLineY },
      ],
      compareHint: "水平直线穿过椭圆内部，所以会有两个公共点。",
    };
  }

  if (family === "hyperbola") {
    const a = Math.max(Math.abs(roundTiny(params.a ?? 4)), 0.1);
    const b = Math.max(Math.abs(roundTiny(params.b ?? 3)), 0.1);
    const yAbs = Math.abs(safeLineY);

    if (yAbs < a - 1e-8) {
      return {
        family,
        relation: "相离",
        intersectionCount: 0,
        points: [],
        compareHint: "水平直线还没达到双曲线顶点的高度，所以暂时碰不到图像。",
      };
    }

    if (Math.abs(yAbs - a) < 1e-8) {
      return {
        family,
        relation: "相切",
        intersectionCount: 1,
        points: [{ x: 0, y: safeLineY }],
        compareHint: "水平直线恰好经过双曲线顶点，所以只接触一个公共点。",
      };
    }

    const x = roundTiny(b * Math.sqrt((safeLineY * safeLineY) / (a * a) - 1));
    return {
      family,
      relation: "相交",
      intersectionCount: 2,
      points: [
        { x: -x, y: safeLineY },
        { x, y: safeLineY },
      ],
      compareHint: "水平直线高于双曲线顶点后，会分别切到左右两支，所以有两个公共点。",
    };
  }

  const a = Math.max(Math.abs(roundTiny(params.a ?? 2)), 0.1);

  if (safeLineY < -1e-8) {
    return {
      family: "parabola",
      relation: "相离",
      intersectionCount: 0,
      points: [],
      compareHint: "水平直线落在抛物线顶点下方，所以没有公共点。",
    };
  }

  if (Math.abs(safeLineY) < 1e-8) {
    return {
      family: "parabola",
      relation: "相切",
      intersectionCount: 1,
      points: [{ x: 0, y: 0 }],
      compareHint: "水平直线经过顶点时，只会轻轻碰到抛物线一次。",
    };
  }

  const x = roundTiny(Math.sqrt(4 * a * safeLineY));
  return {
    family: "parabola",
    relation: "相交",
    intersectionCount: 2,
    points: [
      { x: -x, y: safeLineY },
      { x, y: safeLineY },
    ],
    compareHint: "水平直线进入抛物线开口内部后，会出现左右两个公共点。",
  };
}

export function pointLineDistance(x0, y0, k, b) {
  const A = k;
  const B = -1;
  const C = b;
  const denominator = A * A + B * B;
  const factor = (A * x0 + B * y0 + C) / denominator;
  const footX = x0 - A * factor;
  const footY = y0 - B * factor;
  const distance = Math.abs(A * x0 + B * y0 + C) / Math.sqrt(denominator);

  return {
    point: { x: roundTiny(x0), y: roundTiny(y0) },
    foot: { x: roundTiny(footX), y: roundTiny(footY) },
    distance: roundTiny(distance),
    shortestHint: "最短距离一定沿着垂线段",
  };
}

export function formatSignedNumber(value, digits = 2) {
  const number = Number(value);
  const fixed = number.toFixed(digits).replace(/-0\.00$/, "0.00");
  return number >= 0 ? `+${fixed}` : fixed;
}
