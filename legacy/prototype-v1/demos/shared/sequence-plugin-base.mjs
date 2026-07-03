import {
  recursiveSequenceTerms,
  sequenceComparisonFeatures,
} from "../../assets/math-viz-core.mjs";

function formatNumber(value, digits = 2) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value)
    .toFixed(digits)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function buildSeriesPoints(values, prefix, color) {
  return values.flatMap((value, index) => {
    const point = {
      x: index + 1,
      y: value,
      color,
      radius: 5,
    };

    if (index === 0 || index === values.length - 1) {
      return [{ ...point, label: `${prefix}${index + 1}` }];
    }

    return [point];
  });
}

function buildSequenceViewport(features, count) {
  const values = [...features.terms.arithmetic, ...features.terms.geometric, 0];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 1);
  const padding = Math.max(span * 0.16, 2);

  return {
    xMin: 0.5,
    xMax: count + 0.5,
    yMin: min - padding,
    yMax: max + padding,
  };
}

export function createSequenceCard(title, conclusion, observation, warning, highlight = false) {
  return {
    title,
    conclusion,
    observation,
    warning,
    highlight,
  };
}

export function buildSequenceTeachingItems(items) {
  return items.map((item) => ({
    title: item.title,
    value: item.value,
    badges: item.badges ?? [],
    text: item.text ?? "",
  }));
}

export function buildSequenceStudentSummary(features) {
  if (features.geometricStyle === "倍增增长" && features.geometricLast > features.arithmeticLast * 1.2) {
    return "等比数列后面会拉得更快，因为它每一步都在按固定倍数放大。";
  }
  if (features.geometricStyle === "指数衰减") {
    return "公比小于 1 时，等比数列不是增长，而是在一项一项缩小。";
  }
  if (features.arithmeticStyle === "线性递减") {
    return "公差为负时，等差数列会稳定下降，每一步都减同样多。";
  }
  return "等差看固定差，等比看固定倍，越往后看，两者的差别通常越明显。";
}

export function buildSequenceModel({ a1, d, q, count }) {
  const features = sequenceComparisonFeatures(a1, d, q, count);

  return {
    derived: {
      equation: `a1 = ${formatNumber(a1)}，d = ${formatNumber(d)}，q = ${formatNumber(q)}`,
      arithmeticFormula: `a_n = ${formatNumber(a1)} + (n - 1) x ${formatNumber(d)}`,
      geometricFormula: `a_n = ${formatNumber(a1)} x ${formatNumber(q)}^(n - 1)`,
      features,
    },
    view: {
      viewport: buildSequenceViewport(features, count),
      showGrid: true,
      showAxes: true,
    },
    drawModel: {
      curves: [
        {
          points: features.terms.arithmetic.map((value, index) => ({ x: index + 1, y: value })),
          color: "#3b8f59",
          lineWidth: 4,
        },
        {
          points: features.terms.geometric.map((value, index) => ({ x: index + 1, y: value })),
          color: "#f08b4b",
          lineWidth: 4,
        },
      ],
      points: [
        ...buildSeriesPoints(features.terms.arithmetic, "A", "#3b8f59"),
        ...buildSeriesPoints(features.terms.geometric, "G", "#f08b4b"),
      ],
      labels: [
        { x: count - 0.6, y: features.terms.arithmetic[Math.max(count - 1, 0)], text: "等差数列", color: "#3b8f59", dx: 10, dy: -14 },
        { x: count - 0.6, y: features.terms.geometric[Math.max(count - 1, 0)], text: "等比数列", color: "#f08b4b", dx: 10, dy: 18 },
      ],
    },
  };
}

export function buildRecursiveSequenceModel({ a1, factor, offset, count }) {
  const features = recursiveSequenceTerms(a1, factor, offset, count);
  const values = [...features.terms, 0];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 1);
  const padding = Math.max(span * 0.16, 2);

  return {
    derived: {
      equation: `a1 = ${formatNumber(a1)}，a(n+1) = ${formatNumber(factor)}a(n) ${offset >= 0 ? "+" : "-"} ${formatNumber(Math.abs(offset))}`,
      features,
      recursiveRule: `a(n+1) = ${formatNumber(factor)}a(n) ${offset >= 0 ? "+" : "-"} ${formatNumber(Math.abs(offset))}`,
    },
    view: {
      viewport: {
        xMin: 0.5,
        xMax: count + 0.5,
        yMin: min - padding,
        yMax: max + padding,
      },
      showGrid: true,
      showAxes: true,
    },
    drawModel: {
      curves: [
        {
          points: features.terms.map((value, index) => ({ x: index + 1, y: value })),
          color: "#5b7cfa",
          lineWidth: 4,
        },
      ],
      points: features.terms.map((value, index) => ({
        x: index + 1,
        y: value,
        color: "#5b7cfa",
        radius: 5,
        ...(index === 0 || index === features.terms.length - 1 ? { label: `R${index + 1}` } : {}),
      })),
      labels: [
        { x: count - 0.4, y: features.lastTerm, text: "递推数列", color: "#5b7cfa", dx: 10, dy: -12 },
      ],
    },
  };
}
