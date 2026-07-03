function rectanglePolygon(x1, y1, x2, y2, options = {}) {
  return {
    points: [
      { x: x1, y: y1 },
      { x: x2, y: y1 },
      { x: x2, y: y2 },
      { x: x1, y: y2 },
    ],
    ...options,
  };
}

function formatSetLine(name, values) {
  return `${name} = {${values.join(", ")}}`;
}

function cloneValues(values) {
  return values.map((value) => `${value}`);
}

function intersectionValues(a, b) {
  const lookup = new Set(b);
  return a.filter((value) => lookup.has(value));
}

function unionValues(a, b) {
  return Array.from(new Set([...a, ...b]));
}

function differenceValues(universe, target) {
  const lookup = new Set(target);
  return universe.filter((value) => !lookup.has(value));
}

function isSubsetOf(subset, superset) {
  const lookup = new Set(superset);
  return subset.every((value) => lookup.has(value));
}

function sameSet(a, b) {
  return a.length === b.length && isSubsetOf(a, b);
}

const BASICS_SAMPLES = {
  "numbers-basic": {
    title: "自然数分类",
    lifeTitle: "数字卡片归类",
    universe: ["1", "2", "3", "4", "5", "6", "7", "8"],
    setA: ["1", "2", "3", "4"],
    setB: ["1", "2", "3"],
    equalSet: ["1", "2", "3", "4"],
    emptySet: [],
    lifeItems: [
      { id: "1", label: "1", x: -5.6, y: 5.5, color: "#f59e0b" },
      { id: "2", label: "2", x: -3.8, y: 5.5, color: "#f59e0b" },
      { id: "3", label: "3", x: -2, y: 5.5, color: "#f59e0b" },
      { id: "4", label: "4", x: -0.2, y: 5.5, color: "#f59e0b" },
      { id: "5", label: "5", x: 1.6, y: 5.5, color: "#60a5fa" },
      { id: "6", label: "6", x: 3.4, y: 5.5, color: "#60a5fa" },
      { id: "7", label: "7", x: 5.2, y: 5.5, color: "#f472b6" },
      { id: "8", label: "8", x: 7, y: 5.5, color: "#34d399" },
    ],
    belongItem: "1",
    notBelongItem: "7",
  },
  "letters-basic": {
    title: "字母归类",
    lifeTitle: "字母卡片归类",
    universe: ["a", "b", "c", "d", "e", "f"],
    setA: ["a", "c", "e"],
    setB: ["a", "e"],
    equalSet: ["a", "c", "e"],
    emptySet: [],
    lifeItems: [
      { id: "a", label: "a", x: -5.6, y: 5.5, color: "#f59e0b" },
      { id: "b", label: "b", x: -3.6, y: 5.5, color: "#38bdf8" },
      { id: "c", label: "c", x: -1.6, y: 5.5, color: "#f59e0b" },
      { id: "d", label: "d", x: 0.4, y: 5.5, color: "#38bdf8" },
      { id: "e", label: "e", x: 2.4, y: 5.5, color: "#f59e0b" },
      { id: "f", label: "f", x: 4.4, y: 5.5, color: "#f472b6" },
    ],
    belongItem: "a",
    notBelongItem: "b",
  },
  "shapes-basic": {
    title: "图形归类",
    lifeTitle: "颜色与图形分类",
    universe: ["红圆", "红方", "蓝圆", "蓝方", "黄三角", "绿圆"],
    setA: ["红圆", "红方", "蓝圆"],
    setB: ["红圆", "红方"],
    equalSet: ["红圆", "红方", "蓝圆"],
    emptySet: [],
    lifeItems: [
      { id: "红圆", label: "红圆", x: -5.8, y: 5.5, color: "#fb7185" },
      { id: "红方", label: "红方", x: -3.6, y: 5.5, color: "#fb7185" },
      { id: "蓝圆", label: "蓝圆", x: -1.4, y: 5.5, color: "#60a5fa" },
      { id: "蓝方", label: "蓝方", x: 0.8, y: 5.5, color: "#60a5fa" },
      { id: "黄三角", label: "黄三角", x: 3, y: 5.5, color: "#facc15" },
      { id: "绿圆", label: "绿圆", x: 5.2, y: 5.5, color: "#4ade80" },
    ],
    belongItem: "红圆",
    notBelongItem: "蓝方",
  },
};

const OPERATION_SAMPLES = {
  "numbers-overlap": {
    title: "数字集合重叠",
    lifeTitle: "数字卡片重叠",
    universe: ["1", "2", "3", "4", "5", "6", "7", "8"],
    setA: ["1", "2", "3", "4"],
    setB: ["3", "4", "5", "6"],
    leftZone: ["1", "2"],
    middleZone: ["3", "4"],
    rightZone: ["5", "6"],
    outerZone: ["7", "8"],
  },
  "hobbies-overlap": {
    title: "兴趣爱好重叠",
    lifeTitle: "兴趣爱好重叠",
    universe: ["跑步", "篮球", "钢琴", "吉他", "摄影", "围棋", "阅读"],
    setA: ["跑步", "篮球", "摄影", "阅读"],
    setB: ["钢琴", "吉他", "摄影", "阅读"],
    leftZone: ["跑步", "篮球"],
    middleZone: ["摄影", "阅读"],
    rightZone: ["钢琴", "吉他"],
    outerZone: ["围棋"],
  },
};

function createSetItemPoints(sample, activeSetLookup) {
  const baseItems = sample.lifeItems ?? sample.universe.map((value, index) => ({
    id: value,
    label: value,
    x: -5.6 + (index % 4) * 2.3,
    y: 5.5 - Math.floor(index / 4) * 1.5,
    color: "#f59e0b",
  }));

  return baseItems.map((item) => ({
    x: item.x,
    y: item.y,
    label: item.label,
    radius: 14,
    color: activeSetLookup.has(item.id)
      ? "rgba(59, 130, 246, 0.82)"
      : "rgba(148, 163, 184, 0.72)",
  }));
}

function createBasicsTeachingItems(derived, focusKey) {
  const relationMap = {
    belong: {
      title: "属于",
      value: `${derived.relations.belong.item} ∈ A`,
      text: "先看这个对象有没有被放进集合 A，再说它属不属于。",
    },
    notBelong: {
      title: "不属于",
      value: `${derived.relations.notBelong.item} ∉ A`,
      text: "不在集合框里的对象，就不能写成属于这个集合。",
    },
    subset: {
      title: "子集",
      value: `${derived.relations.subset.name} ⊂ ${derived.relations.subset.target}`,
      text: "只要 B 里的每个元素都在 A 里，B 就是 A 的子集。",
    },
    properSubset: {
      title: "真子集",
      value: `${derived.relations.properSubset.name} ⊊ ${derived.relations.properSubset.target}`,
      text: "除了全部包含，还要确认两个集合不完全相同。",
    },
    emptySet: {
      title: "空集",
      value: "∅",
      text: "空集虽然没有元素，但它依然是一个集合。",
    },
  };

  return [
    relationMap[focusKey] ?? relationMap.belong,
    {
      title: "相等集合",
      value: derived.relations.equalSet.isEqual ? "A 与 D 相等" : "A 与 D 不相等",
      text: "比较集合相等时，看的是元素是否完全一样，不看书写顺序。",
    },
  ].map((item, index) => ({
    title: item.title,
    value: item.value,
    badges: index === 0 ? ["当前重点"] : ["易混点"],
    text: item.text,
  }));
}

function createBasicsExplanation(derived, focusKey) {
  const cards = [
    createSetExplanationCard(
      "当前集合",
      derived.equation,
      "先盯住集合 A、B、U 各自装了哪些对象，再看符号表达。",
      "不要把元素和集合本身写成同一层级。",
    ),
    createSetExplanationCard(
      "当前重点",
      derived.summaryText,
      "集合语言最怕只背符号，不看“有没有装进去”和“是不是全部包含”。",
      focusKey === "properSubset"
        ? "真子集比子集多一步：两个集合不能完全一样。"
        : "先看对象关系，再写符号。",
      true,
    ),
  ];

  cards.push(
    createSetExplanationCard(
      "易错提醒",
      "∈ 用在“元素与集合”，⊂ / ⊊ 用在“集合与集合”。",
      "这是初高衔接里最常见的符号混用点。",
      "空集也是集合，不能因为里面没有元素就把它排除掉。",
    ),
  );

  return cards;
}

function basicsSummary(derived, focusKey) {
  switch (focusKey) {
    case "notBelong":
      return `${derived.relations.notBelong.item} 不在集合 A 里，所以要写成 ${derived.relations.notBelong.item} ∉ A。`;
    case "subset":
      return `因为 ${derived.relations.subset.name} 里的每个元素都在 ${derived.relations.subset.target} 里，所以它是子集。`;
    case "properSubset":
      return `${derived.relations.properSubset.name} 全都包含在 ${derived.relations.properSubset.target} 中，而且两者不完全相同，所以是真子集。`;
    case "emptySet":
      return "空集虽然一个元素都没有，但它依然是集合，记作 ∅。";
    case "belong":
    default:
      return `${derived.relations.belong.item} 被放进了集合 A，所以可以写成 ${derived.relations.belong.item} ∈ A。`;
  }
}

export function buildSetBasicsModel({ mode = "life", sampleId = "numbers-basic", focusKey = "belong" }) {
  const sample = BASICS_SAMPLES[sampleId] ?? BASICS_SAMPLES["numbers-basic"];
  const activeSetLookup = new Set(sample.setA);
  const modeLabel = mode === "math" ? "数学化" : "生活化";
  const title = mode === "math" ? sample.title : sample.lifeTitle;
  const derived = {
    mode,
    modeLabel,
    sample: {
      id: sampleId,
      title,
    },
    equation: [
      formatSetLine("A", sample.setA),
      formatSetLine("B", sample.setB),
      formatSetLine("U", sample.universe),
      "C = ∅",
    ].join("   "),
    expressions: {
      A: formatSetLine("A", sample.setA),
      B: formatSetLine("B", sample.setB),
      U: formatSetLine("U", sample.universe),
      C: "C = ∅",
      D: formatSetLine("D", sample.equalSet),
    },
    relations: {
      belong: {
        item: sample.belongItem,
        trueItems: cloneValues(sample.setA),
      },
      notBelong: {
        item: sample.notBelongItem,
        trueItems: cloneValues(differenceValues(sample.universe, sample.setA)),
      },
      subset: {
        name: "B",
        target: "A",
        isSubset: isSubsetOf(sample.setB, sample.setA),
      },
      properSubset: {
        name: "B",
        target: "A",
        isProperSubset: isSubsetOf(sample.setB, sample.setA) && !sameSet(sample.setA, sample.setB),
      },
      emptySet: {
        name: "C",
        label: "空集也是集合",
        values: [],
      },
      equalSet: {
        name: "D",
        isEqual: sameSet(sample.setA, sample.equalSet),
      },
    },
  };

  derived.summaryText = basicsSummary(derived, focusKey);

  const drawModel = {
    polygons: [
      rectanglePolygon(-7.2, -5.6, 7.2, 6.6, {
        color: "rgba(15, 23, 42, 0.34)",
        fillColor: "rgba(244, 246, 248, 0.72)",
        lineWidth: 2,
      }),
      rectanglePolygon(-6.2, -3.2, 1.2, 3.2, {
        color: "rgba(37, 99, 235, 0.85)",
        fillColor: "rgba(96, 165, 250, 0.16)",
        lineWidth: focusKey === "belong" || focusKey === "notBelong" ? 4 : 3,
      }),
      rectanglePolygon(-4.8, -1.6, -0.2, 1.6, {
        color: "rgba(5, 150, 105, 0.85)",
        fillColor: "rgba(74, 222, 128, 0.18)",
        lineWidth: focusKey === "subset" || focusKey === "properSubset" ? 4 : 3,
      }),
    ],
    points: createSetItemPoints(sample, activeSetLookup),
    labels: [
      { x: -6.9, y: 6.2, text: "U 全集", color: "rgba(30,41,59,0.92)" },
      { x: -5.7, y: 2.8, text: "A", color: "rgba(37,99,235,0.92)", dx: -6 },
      { x: -4.4, y: 1.2, text: "B", color: "rgba(5,150,105,0.92)", dx: -6 },
      { x: 2.3, y: -2.2, text: "C = ∅", color: "rgba(244, 114, 24, 0.92)" },
      { x: 2.3, y: -3.2, text: "D 与 A 元素完全相同", color: "rgba(30,41,59,0.86)" },
      { x: 1.8, y: 4.2, text: mode === "math" ? derived.expressions.A : "A：先装进这一类对象", color: "rgba(30,41,59,0.9)" },
      { x: 1.8, y: 3.1, text: mode === "math" ? derived.expressions.B : "B：完全放在 A 里面", color: "rgba(30,41,59,0.9)" },
    ],
  };

  return {
    derived,
    view: {
      viewport: { xMin: -8, xMax: 8, yMin: -6, yMax: 7 },
      showGrid: false,
      showAxes: false,
    },
    drawModel,
    teachingModel: createBasicsTeachingItems(derived, focusKey),
    explanationModel: createBasicsExplanation(derived, focusKey),
    message: mode === "math"
      ? "现在已经切到数学化表达，盯住集合符号和图里的框选关系。"
      : "先把对象怎么进集合框看清楚，再去记数学符号。",
  };
}

function createOperationTeachingItems(derived, focusKey) {
  const mapping = {
    intersection: {
      title: "交集",
      value: `${derived.result.name} = {${derived.result.values.join(", ")}}`,
      text: "交集只看“同时属于 A 和 B”的那部分。",
    },
    union: {
      title: "并集",
      value: `${derived.result.name} = {${derived.result.values.join(", ")}}`,
      text: "并集看的是 A 或 B 中出现过的全部元素，不是只看重叠。",
    },
    complement: {
      title: "补集",
      value: `${derived.result.name} = {${derived.result.values.join(", ")}}`,
      text: "补集一定要先有全集，再看“在全集里但不在 A 里”的部分。",
    },
    universe: {
      title: "全集",
      value: `U = {${derived.universe.values.join(", ")}}`,
      text: "没有全集，补集就没有参照物。",
    },
  };

  const current = mapping[focusKey] ?? mapping.intersection;

  return [
    {
      title: current.title,
      value: current.value,
      badges: ["当前重点"],
      text: current.text,
    },
    {
      title: "区域对照",
      value: derived.operationLabel,
      badges: ["图像理解"],
      text: "先看颜色高亮的是哪一块，再回头读集合式子。",
    },
  ];
}

function createOperationExplanation(derived) {
  return [
    createSetExplanationCard(
      "当前运算",
      `${derived.operationLabel}：${derived.result.name} = {${derived.result.values.join(", ")}}`,
      "图上的区域和右侧结果集合应该是同一件事的两种表达。",
      "不要只盯结果集合，忘记它在图上对应的是哪一块。",
      true,
    ),
    createSetExplanationCard(
      "全集提醒",
      `U = {${derived.universe.values.join(", ")}}`,
      "交集和并集主要看 A、B 两个集合，补集一定要多看一步全集。",
      "没先确认全集，就很容易把补集算错。",
    ),
  ];
}

function operationSummary(operationLabel, operation) {
  if (operation === "intersection") {
    return "当前看的是交集，只取同时落在 A 和 B 里的共同部分。";
  }
  if (operation === "union") {
    return "当前看的是并集，只要属于 A 或 B，就都应该被收进去。";
  }
  return "当前看的是补集，先看全集，再去掉属于 A 的部分，先看全集。";
}

export function buildSetOperationsModel({
  mode = "life",
  operation = "intersection",
  sampleId = "numbers-overlap",
  focusKey = "intersection",
}) {
  const sample = OPERATION_SAMPLES[sampleId] ?? OPERATION_SAMPLES["numbers-overlap"];
  const resultValues = operation === "intersection"
    ? intersectionValues(sample.setA, sample.setB)
    : operation === "union"
      ? unionValues(sample.setA, sample.setB)
      : differenceValues(sample.universe, sample.setA);
  const operationLabel = operation === "intersection" ? "交集" : operation === "union" ? "并集" : "补集";
  const resultName = operation === "intersection" ? "A∩B" : operation === "union" ? "A∪B" : "CᵁA";
  const derived = {
    mode,
    modeLabel: mode === "math" ? "数学化" : "生活化",
    sample: {
      id: sampleId,
      title: mode === "math" ? sample.title : sample.lifeTitle,
    },
    equation: [
      formatSetLine("A", sample.setA),
      formatSetLine("B", sample.setB),
      formatSetLine("U", sample.universe),
    ].join("   "),
    operation,
    operationLabel,
    universe: {
      name: "U",
      values: cloneValues(sample.universe),
    },
    result: {
      name: resultName,
      values: cloneValues(resultValues),
    },
  };

  derived.summaryText = operationSummary(operationLabel, operation);

  const activeRegions = {
    left: operation === "union",
    intersection: operation === "intersection" || operation === "union",
    right: operation === "union",
    outer: operation === "complementA",
  };

  const zonePoints = [
    ...sample.leftZone.map((value, index) => ({
      x: -3.8 + index * 1.2,
      y: 0.4,
      label: value,
      radius: 13,
      color: activeRegions.left ? "rgba(59,130,246,0.82)" : "rgba(148,163,184,0.72)",
    })),
    ...sample.middleZone.map((value, index) => ({
      x: -0.4 + index * 0.9,
      y: 0.4,
      label: value,
      radius: 13,
      color: activeRegions.intersection ? "rgba(244,114,24,0.86)" : "rgba(148,163,184,0.72)",
    })),
    ...sample.rightZone.map((value, index) => ({
      x: 2.2 + index * 1.2,
      y: 0.4,
      label: value,
      radius: 13,
      color: activeRegions.right ? "rgba(34,197,94,0.84)" : "rgba(148,163,184,0.72)",
    })),
    ...sample.outerZone.map((value, index) => ({
      x: 4.8 + index * 1.2,
      y: -4.4,
      label: value,
      radius: 13,
      color: activeRegions.outer ? "rgba(168,85,247,0.84)" : "rgba(148,163,184,0.72)",
    })),
  ];

  return {
    derived,
    view: {
      viewport: { xMin: -8, xMax: 8, yMin: -6, yMax: 6 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      polygons: [
        rectanglePolygon(-7.2, -5.2, 7.2, 5.2, {
          color: "rgba(15, 23, 42, 0.34)",
          fillColor: operation === "complementA" ? "rgba(196, 181, 253, 0.16)" : "rgba(244, 246, 248, 0.72)",
          lineWidth: 2,
        }),
      ],
      ellipses: [
        {
          center: { x: -1.8, y: 0.5 },
          radiusX: 3.2,
          radiusY: 2.5,
          color: "rgba(37,99,235,0.88)",
          fillColor: operation === "intersection"
            ? "rgba(96, 165, 250, 0.14)"
            : operation === "union"
              ? "rgba(96, 165, 250, 0.22)"
              : "rgba(96, 165, 250, 0.08)",
          lineWidth: 3,
        },
        {
          center: { x: 1.8, y: 0.5 },
          radiusX: 3.2,
          radiusY: 2.5,
          color: "rgba(22,163,74,0.88)",
          fillColor: operation === "intersection"
            ? "rgba(74, 222, 128, 0.14)"
            : operation === "union"
              ? "rgba(74, 222, 128, 0.22)"
              : "rgba(74, 222, 128, 0.08)",
          lineWidth: 3,
        },
      ],
      points: zonePoints,
      labels: [
        { x: -6.8, y: 5, text: "U 全集", color: "rgba(30,41,59,0.92)" },
        { x: -3.8, y: 2.9, text: "A", color: "rgba(37,99,235,0.92)" },
        { x: 3.1, y: 2.9, text: "B", color: "rgba(22,163,74,0.92)" },
        { x: -6.6, y: -4.8, text: mode === "math" ? formatSetLine("A", sample.setA) : "A：左边这类对象", color: "rgba(30,41,59,0.9)" },
        { x: -6.6, y: -5.5, text: mode === "math" ? formatSetLine("B", sample.setB) : "B：右边这类对象", color: "rgba(30,41,59,0.9)" },
        { x: 1.8, y: -4.8, text: `${resultName} = {${resultValues.join(", ")}}`, color: "rgba(30,41,59,0.92)" },
      ],
      regions: [
        { id: "left", active: activeRegions.left, values: cloneValues(sample.leftZone) },
        { id: "intersection", active: activeRegions.intersection, values: cloneValues(sample.middleZone) },
        { id: "right", active: activeRegions.right, values: cloneValues(sample.rightZone) },
        { id: "outer", active: activeRegions.outer, values: cloneValues(sample.outerZone) },
      ],
    },
    teachingModel: createOperationTeachingItems(derived, focusKey),
    explanationModel: createOperationExplanation(derived),
    message: operation === "complementA"
      ? "现在重点看补集：一定先盯住全集，再把 A 里的部分拿掉。"
      : "先看图上哪一块被高亮，再看右侧结果集合。",
  };
}

export function createSetExplanationCard(title, conclusion, observation, warning, highlight = false) {
  return {
    title,
    conclusion,
    observation,
    warning,
    highlight,
  };
}

export function buildSetTeachingItems(items) {
  return items.map((item) => ({
    title: item.title,
    value: item.value,
    badges: item.badges ?? [],
    text: item.text ?? "",
  }));
}
