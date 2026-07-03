const SENTENCE_SCENES = {
  "simple-main": {
    sentenceText: "The little boy quickly opened the door.",
    coreRole: "谓语",
    focusSummary: "谓语说明主语做了什么，是句子主干里最关键的动作中心。",
    nodes: [
      { id: "subject", label: "The little boy\n主语", x: 2.2, y: 5.8, color: "rgba(59,130,246,0.84)" },
      { id: "predicate", label: "opened\n谓语", x: 5.6, y: 5.8, color: "rgba(249,115,22,0.84)" },
      { id: "object", label: "the door\n宾语", x: 9.0, y: 5.8, color: "rgba(34,197,94,0.84)" },
      { id: "adverbial", label: "quickly\n状语", x: 5.6, y: 3.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "subject", to: "predicate", label: "主干" },
      { from: "predicate", to: "object", label: "动作作用" },
      { from: "adverbial", to: "predicate", label: "修饰动作" },
    ],
  },
  "relative-clause": {
    sentenceText: "The book that you bought yesterday is very useful.",
    coreRole: "定语从句",
    focusSummary: "定语从句负责进一步限定名词，让句子表达更具体。",
    nodes: [
      { id: "subject", label: "The book\n主语核心", x: 2.4, y: 5.8, color: "rgba(59,130,246,0.84)" },
      { id: "relative", label: "that you bought yesterday\n定语从句", x: 5.8, y: 3.4, color: "rgba(168,85,247,0.84)" },
      { id: "predicate", label: "is\n系动词", x: 6.0, y: 5.8, color: "rgba(249,115,22,0.84)" },
      { id: "complement", label: "very useful\n表语", x: 9.4, y: 5.8, color: "rgba(34,197,94,0.84)" },
    ],
    links: [
      { from: "subject", to: "predicate", label: "主干" },
      { from: "predicate", to: "complement", label: "状态说明" },
      { from: "relative", to: "subject", label: "修饰名词" },
    ],
  },
};

export function buildSentenceStructureModel({ sentenceId = "simple-main", focusNodeId = "predicate" } = {}) {
  const scene = SENTENCE_SCENES[sentenceId] ?? SENTENCE_SCENES["simple-main"];
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(focusNodeId) ?? nodeLookup.get("predicate") ?? scene.nodes[0];

  return {
    derived: {
      sentenceId,
      focusNodeId: focusNode.id,
      sentenceText: scene.sentenceText,
      coreRole: scene.coreRole,
      focusSummary: scene.focusSummary,
      equation: `${scene.sentenceText}｜当前焦点：${focusNode.label.replace("\n", " ")}`,
      studentSummary: "先找句子主干，再看修饰关系，语法术语才会真正落回阅读过程。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: scene.nodes.map((node) => ({
        x: node.x,
        y: node.y,
        radius: node.id === focusNode.id ? 16 : 13,
        color: node.color,
        label: node.label,
      })),
      segments: scene.links.map((link) => ({
        from: { x: nodeLookup.get(link.from).x, y: nodeLookup.get(link.from).y },
        to: { x: nodeLookup.get(link.to).x, y: nodeLookup.get(link.to).y },
        color: "rgba(71, 85, 105, 0.9)",
        lineWidth: 3,
        label: link.label,
      })),
      labels: [
        { x: 1.0, y: 7.1, text: scene.sentenceText, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 1.0, text: scene.focusSummary, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const CLAUSE_SCENES = {
  "noun-clause": {
    sentenceText: "I know that he will come tomorrow.",
    mainFunction: "宾语从句",
    guideQuestion: "它在回答“知道什么”这个问题，所以整体充当宾语。",
    nodes: [
      { id: "main-subject", label: "I\n主句主语", x: 1.8, y: 5.8, color: "rgba(59,130,246,0.84)" },
      { id: "main-predicate", label: "know\n主句谓语", x: 4.4, y: 5.8, color: "rgba(249,115,22,0.84)" },
      { id: "object-clause", label: "that he will come tomorrow\n宾语从句", x: 8.5, y: 5.0, color: "rgba(34,197,94,0.84)" },
      { id: "linker", label: "that\n连接词", x: 6.1, y: 3.1, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "main-subject", to: "main-predicate", label: "主句主干" },
      { from: "object-clause", to: "main-predicate", label: "充当宾语" },
      { from: "linker", to: "object-clause", label: "引导从句" },
    ],
  },
  "adverbial-clause": {
    sentenceText: "When the rain stops, we will go out.",
    mainFunction: "状语从句",
    guideQuestion: "它在回答“什么时候出去”这个问题，所以整体充当时间状语。",
    nodes: [
      { id: "adverbial-clause", label: "When the rain stops\n时间状语从句", x: 3.0, y: 5.0, color: "rgba(168,85,247,0.84)" },
      { id: "main-subject", label: "we\n主句主语", x: 6.5, y: 5.8, color: "rgba(59,130,246,0.84)" },
      { id: "main-predicate", label: "will go out\n主句谓语", x: 9.2, y: 5.8, color: "rgba(249,115,22,0.84)" },
      { id: "linker", label: "When\n连接词", x: 3.0, y: 2.7, color: "rgba(34,197,94,0.84)" },
    ],
    links: [
      { from: "main-subject", to: "main-predicate", label: "主句主干" },
      { from: "adverbial-clause", to: "main-predicate", label: "充当状语" },
      { from: "linker", to: "adverbial-clause", label: "引导从句" },
    ],
  },
};

export function buildClauseHierarchyModel({ clauseId = "noun-clause", focusClause = "object-clause" } = {}) {
  const scene = CLAUSE_SCENES[clauseId] ?? CLAUSE_SCENES["noun-clause"];
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(focusClause) ?? scene.nodes[0];

  return {
    derived: {
      clauseId,
      focusClause: focusNode.id,
      sentenceText: scene.sentenceText,
      mainFunction: scene.mainFunction,
      guideQuestion: scene.guideQuestion,
      equation: `${scene.sentenceText}｜当前焦点：${scene.mainFunction}`,
      studentSummary: "不要先背从句名称，先问这个从句在整句里相当于什么成分。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: scene.nodes.map((node) => ({
        x: node.x,
        y: node.y,
        radius: node.id === focusNode.id ? 16 : 13,
        color: node.color,
        label: node.label,
      })),
      segments: scene.links.map((link) => ({
        from: { x: nodeLookup.get(link.from).x, y: nodeLookup.get(link.from).y },
        to: { x: nodeLookup.get(link.to).x, y: nodeLookup.get(link.to).y },
        color: "rgba(71, 85, 105, 0.9)",
        lineWidth: 3,
        label: link.label,
      })),
      labels: [
        { x: 1.0, y: 7.2, text: scene.sentenceText, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 1.0, text: scene.guideQuestion, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const COMPRESSION_SCENES = {
  "although-researchers": {
    sentenceText:
      "Although the researchers collected a large amount of data during the winter project, students can still improve their results if they review the experiment steps carefully.",
    mainTrunk: "students can still improve their results",
    compressionHint: "先砍修饰，再抓主干，最后把条件和让步关系重新挂回去。",
    readingGoal: "长难句不是一口气全吃下，而是先保住主干，再看附着层。",
    nodes: [
      { id: "concession", label: "Although ... project\n让步背景", x: 2.2, y: 5.8, color: "rgba(168,85,247,0.84)" },
      { id: "main-subject", label: "students\n主语", x: 4.8, y: 4.4, color: "rgba(59,130,246,0.84)" },
      { id: "main-predicate", label: "can improve\n谓语", x: 7.0, y: 4.4, color: "rgba(249,115,22,0.84)" },
      { id: "main-object", label: "their results\n宾语", x: 9.6, y: 4.4, color: "rgba(34,197,94,0.84)" },
      { id: "condition", label: "if they review ...\n条件补充", x: 7.2, y: 2.2, color: "rgba(236,72,153,0.84)" },
    ],
    links: [
      { from: "main-subject", to: "main-predicate", label: "主干" },
      { from: "main-predicate", to: "main-object", label: "动作结果" },
      { from: "concession", to: "main-predicate", label: "让步背景" },
      { from: "condition", to: "main-predicate", label: "条件挂接" },
    ],
  },
  "whoever-practices": {
    sentenceText:
      "Whoever practices the passage aloud every day will understand the article faster when the teacher asks detailed questions in class.",
    mainTrunk: "Whoever practices the passage aloud every day will understand the article faster",
    compressionHint: "主语很长时，不要慌，先把它整体当成一个主语块。",
    readingGoal: "遇到主语从句或超长主语时，先整体打包，再继续找谓语和宾语。",
    nodes: [
      { id: "subject-clause", label: "Whoever practices ...\n主语块", x: 2.6, y: 4.4, color: "rgba(59,130,246,0.84)" },
      { id: "main-predicate", label: "will understand\n谓语", x: 6.3, y: 4.4, color: "rgba(249,115,22,0.84)" },
      { id: "main-object", label: "the article\n宾语", x: 9.0, y: 4.4, color: "rgba(34,197,94,0.84)" },
      { id: "manner", label: "faster\n结果补充", x: 10.2, y: 6.2, color: "rgba(236,72,153,0.84)" },
      { id: "time-condition", label: "when the teacher asks ...\n课堂条件", x: 6.6, y: 2.1, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "subject-clause", to: "main-predicate", label: "主干" },
      { from: "main-predicate", to: "main-object", label: "动作对象" },
      { from: "main-predicate", to: "manner", label: "结果程度" },
      { from: "time-condition", to: "main-predicate", label: "时间条件" },
    ],
  },
};

export function buildSentenceCompressionModel({ sentenceId = "although-researchers", focusLayer = "main-trunk" } = {}) {
  const scene = COMPRESSION_SCENES[sentenceId] ?? COMPRESSION_SCENES["although-researchers"];
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusMap = {
    "main-trunk": "main-predicate",
    concession: "concession",
    condition: "condition",
    "subject-block": "subject-clause",
  };
  const focusNode =
    nodeLookup.get(focusMap[focusLayer] ?? focusLayer) ??
    nodeLookup.get("main-predicate") ??
    scene.nodes[0];

  return {
    derived: {
      sentenceId,
      focusLayer,
      sentenceText: scene.sentenceText,
      mainTrunk: scene.mainTrunk,
      compressionHint: scene.compressionHint,
      readingGoal: scene.readingGoal,
      equation: `${scene.mainTrunk}｜压缩焦点：${focusNode.label.replace("\n", " ")}`,
      studentSummary: "先保住主干，再把条件、让步、时间这些附着层一层层挂回去，长句就不会塌掉。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: scene.nodes.map((node) => ({
        x: node.x,
        y: node.y,
        radius: node.id === focusNode.id ? 16 : 13,
        color: node.color,
        label: node.label,
      })),
      segments: scene.links.map((link) => ({
        from: { x: nodeLookup.get(link.from).x, y: nodeLookup.get(link.from).y },
        to: { x: nodeLookup.get(link.to).x, y: nodeLookup.get(link.to).y },
        color: "rgba(71, 85, 105, 0.9)",
        lineWidth: 3,
        label: link.label,
      })),
      labels: [
        { x: 1.0, y: 7.25, text: scene.mainTrunk, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.85, text: scene.compressionHint, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const READING_LAYER_SCENES = {
  "solar-school": {
    passageTitle: "Solar School Project",
    mainIdea: "The school uses solar power to cut costs and teach students about clean energy.",
    readingHint: "先抓主旨句，再把理由、数据和例子挂到主旨下面，阅读就不会被细节带着跑。",
    nodes: [
      { id: "main-idea", label: "主旨\nsolar power helps school", x: 6.0, y: 5.6, color: "rgba(249,115,22,0.84)" },
      { id: "reason-1", label: "理由 1\nsave money", x: 3.0, y: 3.8, color: "rgba(59,130,246,0.84)" },
      { id: "reason-2", label: "理由 2\nteach clean energy", x: 9.0, y: 3.8, color: "rgba(34,197,94,0.84)" },
      { id: "detail", label: "细节\nmonthly bill falls", x: 2.2, y: 1.8, color: "rgba(168,85,247,0.84)" },
      { id: "example", label: "例子\nstudents track panels", x: 9.8, y: 1.8, color: "rgba(236,72,153,0.84)" },
    ],
    links: [
      { from: "main-idea", to: "reason-1", label: "支撑理由" },
      { from: "main-idea", to: "reason-2", label: "支撑理由" },
      { from: "reason-1", to: "detail", label: "数据细节" },
      { from: "reason-2", to: "example", label: "课堂例子" },
    ],
  },
  "library-club": {
    passageTitle: "Library Reading Club",
    mainIdea: "The club helps students build reading habits through shared goals and peer support.",
    readingHint: "主旨、做法、效果要分层看，不要把活动细节误当成整篇重点。",
    nodes: [
      { id: "main-idea", label: "主旨\nclub builds habits", x: 6.0, y: 5.6, color: "rgba(249,115,22,0.84)" },
      { id: "method-1", label: "做法 1\nshared goals", x: 3.2, y: 3.8, color: "rgba(59,130,246,0.84)" },
      { id: "method-2", label: "做法 2\npeer support", x: 8.8, y: 3.8, color: "rgba(34,197,94,0.84)" },
      { id: "effect", label: "结果\nmore daily reading", x: 6.0, y: 1.8, color: "rgba(168,85,247,0.84)" },
      { id: "detail", label: "细节\nweekly check-ins", x: 10.0, y: 1.8, color: "rgba(236,72,153,0.84)" },
    ],
    links: [
      { from: "main-idea", to: "method-1", label: "实现方式" },
      { from: "main-idea", to: "method-2", label: "实现方式" },
      { from: "method-1", to: "effect", label: "带来效果" },
      { from: "method-2", to: "detail", label: "活动细节" },
    ],
  },
};

export function buildReadingLayerModel({ passageId = "solar-school", emphasis = "main-idea" } = {}) {
  const scene = READING_LAYER_SCENES[passageId] ?? READING_LAYER_SCENES["solar-school"];
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(emphasis) ?? nodeLookup.get("main-idea") ?? scene.nodes[0];

  return {
    derived: {
      passageId,
      emphasis: focusNode.id,
      passageTitle: scene.passageTitle,
      mainIdea: scene.mainIdea,
      readingHint: scene.readingHint,
      equation: `${scene.passageTitle}｜主旨：${scene.mainIdea}`,
      studentSummary: "阅读不是把所有句子看成同一层，而是先分清主旨、理由、细节和例子。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: scene.nodes.map((node) => ({
        x: node.x,
        y: node.y,
        radius: node.id === focusNode.id ? 16 : 13,
        color: node.color,
        label: node.label,
      })),
      segments: scene.links.map((link) => ({
        from: { x: nodeLookup.get(link.from).x, y: nodeLookup.get(link.from).y },
        to: { x: nodeLookup.get(link.to).x, y: nodeLookup.get(link.to).y },
        color: "rgba(71, 85, 105, 0.9)",
        lineWidth: 3,
        label: link.label,
      })),
      labels: [
        { x: 1.0, y: 7.2, text: scene.mainIdea, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: scene.readingHint, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const TENSE_SCENES = {
  "present-perfect": {
    coreMeaning: "过去发生，对现在仍有结果或影响",
    timeHint: "现在完成时最适合放回时间轴里看：动作起点在过去，但注意力落在现在结果或持续状态。",
    sentenceText: "She has finished her homework, so she can play now.",
    nodes: [
      { id: "past-start", label: "过去开始", x: 2.0, y: 4.0, color: "rgba(59,130,246,0.84)" },
      { id: "action", label: "动作完成\nhas finished", x: 4.7, y: 4.0, color: "rgba(249,115,22,0.84)" },
      { id: "now-result", label: "现在结果\ncan play now", x: 8.0, y: 4.0, color: "rgba(34,197,94,0.84)" },
      { id: "duration", label: "持续影响", x: 10.1, y: 5.8, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "past-start", to: "action", label: "动作发生" },
      { from: "action", to: "now-result", label: "结果保留到现在" },
      { from: "action", to: "duration", label: "延续影响" },
    ],
  },
  "past-continuous": {
    coreMeaning: "过去某一时刻正在进行的动作",
    timeHint: "过去进行时要看成“过去某一点切进去时，动作还在展开”，不是单纯过去发生过。",
    sentenceText: "At eight last night, they were watching a science program.",
    nodes: [
      { id: "past-before", label: "过去前段", x: 2.0, y: 4.0, color: "rgba(59,130,246,0.84)" },
      { id: "past-point", label: "过去观察点\nat eight", x: 5.5, y: 4.0, color: "rgba(249,115,22,0.84)" },
      { id: "ongoing", label: "动作进行中\nwere watching", x: 8.5, y: 4.0, color: "rgba(34,197,94,0.84)" },
      { id: "background", label: "背景动作", x: 10.2, y: 2.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "past-before", to: "past-point", label: "时间推进" },
      { from: "past-point", to: "ongoing", label: "切入观察" },
      { from: "ongoing", to: "background", label: "背景展开" },
    ],
  },
};

export function buildTenseTimelineModel({ tenseId = "present-perfect", focusPoint = "now-result" } = {}) {
  const scene = TENSE_SCENES[tenseId] ?? TENSE_SCENES["present-perfect"];
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(focusPoint) ?? scene.nodes[0];

  return {
    derived: {
      tenseId,
      focusPoint: focusNode.id,
      coreMeaning: scene.coreMeaning,
      timeHint: scene.timeHint,
      sentenceText: scene.sentenceText,
      equation: `${scene.coreMeaning}｜${scene.sentenceText}`,
      studentSummary: "时态不要死背名称，先看动作落在时间轴哪里、关注点停在什么时候。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: scene.nodes.map((node) => ({
        x: node.x,
        y: node.y,
        radius: node.id === focusNode.id ? 16 : 13,
        color: node.color,
        label: node.label,
      })),
      segments: scene.links.map((link) => ({
        from: { x: nodeLookup.get(link.from).x, y: nodeLookup.get(link.from).y },
        to: { x: nodeLookup.get(link.to).x, y: nodeLookup.get(link.to).y },
        color: "rgba(71, 85, 105, 0.9)",
        lineWidth: 3,
        label: link.label,
      })),
      labels: [
        { x: 1.0, y: 7.2, text: scene.coreMeaning, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: scene.timeHint, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const NONFINITE_SCENES = {
  "to-learn-purpose": {
    sentenceText: "She joined the club to learn more about robotics.",
    coreRole: "不定式作目的状语",
    grammarHint: "非谓语最适合先看它挂在主句哪里，再看它在补充目的、结果还是伴随信息。",
    nodes: [
      { id: "main-subject", label: "She\n主语", x: 2.2, y: 5.2, color: "rgba(59,130,246,0.84)" },
      { id: "main-predicate", label: "joined the club\n主句动作", x: 5.3, y: 5.2, color: "rgba(249,115,22,0.84)" },
      { id: "infinitive", label: "to learn more ...\n不定式", x: 8.8, y: 4.6, color: "rgba(34,197,94,0.84)" },
      { id: "purpose", label: "目的补充", x: 9.7, y: 2.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "main-subject", to: "main-predicate", label: "主干" },
      { from: "infinitive", to: "main-predicate", label: "挂接主句动作" },
      { from: "infinitive", to: "purpose", label: "表达目的" },
    ],
  },
  "walking-companion": {
    sentenceText: "Walking along the river, he thought about the experiment.",
    coreRole: "现在分词作伴随状语",
    grammarHint: "分词结构常常不是主干动作，而是在补充背景、伴随或原因信息。",
    nodes: [
      { id: "participle", label: "Walking along the river\n分词结构", x: 3.0, y: 4.6, color: "rgba(34,197,94,0.84)" },
      { id: "main-subject", label: "he\n主语", x: 5.8, y: 5.2, color: "rgba(59,130,246,0.84)" },
      { id: "main-predicate", label: "thought about ...\n主句动作", x: 8.8, y: 5.2, color: "rgba(249,115,22,0.84)" },
      { id: "companion", label: "伴随背景", x: 3.2, y: 2.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "main-subject", to: "main-predicate", label: "主干" },
      { from: "participle", to: "main-predicate", label: "挂接主句动作" },
      { from: "participle", to: "companion", label: "伴随信息" },
    ],
  },
};

export function buildNonfiniteStructureModel({ patternId = "to-learn-purpose", focusNodeId = "infinitive" } = {}) {
  const scene = NONFINITE_SCENES[patternId] ?? NONFINITE_SCENES["to-learn-purpose"];
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(focusNodeId) ?? scene.nodes[0];

  return {
    derived: {
      patternId,
      focusNodeId: focusNode.id,
      sentenceText: scene.sentenceText,
      coreRole: scene.coreRole,
      grammarHint: scene.grammarHint,
      equation: `${scene.coreRole}｜${scene.sentenceText}`,
      studentSummary: "非谓语不要先背术语，先看它是不是主干动作，以及它到底补了哪一层信息。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: scene.nodes.map((node) => ({
        x: node.x,
        y: node.y,
        radius: node.id === focusNode.id ? 16 : 13,
        color: node.color,
        label: node.label,
      })),
      segments: scene.links.map((link) => ({
        from: { x: nodeLookup.get(link.from).x, y: nodeLookup.get(link.from).y },
        to: { x: nodeLookup.get(link.to).x, y: nodeLookup.get(link.to).y },
        color: "rgba(71, 85, 105, 0.9)",
        lineWidth: 3,
        label: link.label,
      })),
      labels: [
        { x: 1.0, y: 7.2, text: scene.coreRole, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: scene.grammarHint, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const READING_QUESTION_SCENES = {
  "main-idea": {
    coreStrategy: "主旨题：先抓中心，再排除细节干扰",
    solveHint: "主旨题最重要的是先读题干确认要找的是整篇中心，再回文章找反复出现的核心意思，而不是单个细节。",
    questionText: "What is the main idea of the passage?",
    nodes: [
      { id: "question", label: "题干\n主旨题", x: 2.2, y: 5.2, color: "rgba(59,130,246,0.84)" },
      { id: "article", label: "回到全文\n找中心意思", x: 5.2, y: 5.2, color: "rgba(249,115,22,0.84)" },
      { id: "evidence", label: "反复信息\n高频主题", x: 8.7, y: 4.6, color: "rgba(34,197,94,0.84)" },
      { id: "trap", label: "干扰项\n局部细节", x: 8.9, y: 2.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "question", to: "article", label: "先定位问题类型" },
      { from: "article", to: "evidence", label: "定位中心信息" },
      { from: "evidence", to: "trap", label: "排除细节干扰" },
    ],
  },
  detail: {
    coreStrategy: "细节题：先圈关键词，再回原文精准定位",
    solveHint: "细节题不要靠印象，要把题干关键词和选项差异带回原文，对应具体句子再判断。",
    questionText: "Which statement is true according to the passage?",
    nodes: [
      { id: "question", label: "题干\n细节题", x: 2.2, y: 5.2, color: "rgba(59,130,246,0.84)" },
      { id: "keyword", label: "圈关键词", x: 5.0, y: 5.2, color: "rgba(249,115,22,0.84)" },
      { id: "evidence", label: "回原文\n精确句子", x: 8.5, y: 4.6, color: "rgba(34,197,94,0.84)" },
      { id: "compare", label: "比选项差异", x: 8.8, y: 2.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "question", to: "keyword", label: "先找线索" },
      { from: "keyword", to: "evidence", label: "定位原文" },
      { from: "evidence", to: "compare", label: "比对选项" },
    ],
  },
};

export function buildReadingQuestionMapModel({ questionId = "main-idea", focusNodeId = "evidence" } = {}) {
  const scene = READING_QUESTION_SCENES[questionId] ?? READING_QUESTION_SCENES["main-idea"];
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(focusNodeId) ?? scene.nodes[0];

  return {
    derived: {
      questionId,
      focusNodeId: focusNode.id,
      questionText: scene.questionText,
      coreStrategy: scene.coreStrategy,
      solveHint: scene.solveHint,
      equation: `${scene.coreStrategy}｜${scene.questionText}`,
      studentSummary: "阅读题先分题型，再走对应路径，主旨题和细节题不能用同一种做法硬解。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: scene.nodes.map((node) => ({
        x: node.x,
        y: node.y,
        radius: node.id === focusNode.id ? 16 : 13,
        color: node.color,
        label: node.label,
      })),
      segments: scene.links.map((link) => ({
        from: { x: nodeLookup.get(link.from).x, y: nodeLookup.get(link.from).y },
        to: { x: nodeLookup.get(link.to).x, y: nodeLookup.get(link.to).y },
        color: "rgba(71, 85, 105, 0.9)",
        lineWidth: 3,
        label: link.label,
      })),
      labels: [
        { x: 1.0, y: 7.2, text: scene.coreStrategy, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: scene.solveHint, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const LISTENING_CAPTURE_SCENES = {
  "campus-radio": {
    coreTask: "听力信息捕捉：先抓场景和关键词，再补数字与细节",
    strategyHint: "听力不要一开始就想听全句，先抓场景词、关键词和数字，再逐步补全细节。",
    audioHint: "The school radio says the science club meeting will be held at 3:30 in Room 204.",
    nodes: [
      { id: "scene", label: "场景判断\nschool radio", x: 2.2, y: 5.0, color: "rgba(59,130,246,0.84)" },
      { id: "keywords", label: "关键词\nscience club", x: 5.1, y: 5.4, color: "rgba(249,115,22,0.84)" },
      { id: "numbers", label: "数字信息\n3:30 / 204", x: 8.4, y: 5.0, color: "rgba(34,197,94,0.84)" },
      { id: "notes", label: "速记结果", x: 9.2, y: 2.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "scene", to: "keywords", label: "先定主题" },
      { from: "keywords", to: "numbers", label: "补关键信息" },
      { from: "numbers", to: "notes", label: "记录答案" },
    ],
  },
  "phone-message": {
    coreTask: "听力信息捕捉：先抓人物关系，再补时间地点",
    strategyHint: "电话留言类听力先抓谁找谁、为了什么，再补时间和地点，不要一上来就逐词跟读。",
    audioHint: "Tom called to ask Lucy to meet him at the library after class.",
    nodes: [
      { id: "scene", label: "场景判断\nphone message", x: 2.2, y: 5.0, color: "rgba(59,130,246,0.84)" },
      { id: "keywords", label: "人物与目的\nTom asks Lucy", x: 5.2, y: 5.4, color: "rgba(249,115,22,0.84)" },
      { id: "numbers", label: "时间地点\nafter class / library", x: 8.7, y: 5.0, color: "rgba(34,197,94,0.84)" },
      { id: "notes", label: "速记结果", x: 9.0, y: 2.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "scene", to: "keywords", label: "先抓关系" },
      { from: "keywords", to: "numbers", label: "补时地信息" },
      { from: "numbers", to: "notes", label: "记录答案" },
    ],
  },
};

export function buildListeningCaptureModel({ sceneId = "campus-radio", focusNodeId = "keywords" } = {}) {
  const scene = LISTENING_CAPTURE_SCENES[sceneId] ?? LISTENING_CAPTURE_SCENES["campus-radio"];
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(focusNodeId) ?? scene.nodes[0];

  return {
    derived: {
      sceneId,
      focusNodeId: focusNode.id,
      coreTask: scene.coreTask,
      strategyHint: scene.strategyHint,
      audioHint: scene.audioHint,
      equation: `${scene.coreTask}｜${scene.audioHint}`,
      studentSummary: "听力先抓主题和关键词，再补数字和细节，比逐词硬跟更稳。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: scene.nodes.map((node) => ({
        x: node.x,
        y: node.y,
        radius: node.id === focusNode.id ? 16 : 13,
        color: node.color,
        label: node.label,
      })),
      segments: scene.links.map((link) => ({
        from: { x: nodeLookup.get(link.from).x, y: nodeLookup.get(link.from).y },
        to: { x: nodeLookup.get(link.to).x, y: nodeLookup.get(link.to).y },
        color: "rgba(71, 85, 105, 0.9)",
        lineWidth: 3,
        label: link.label,
      })),
      labels: [
        { x: 1.0, y: 7.2, text: scene.coreTask, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: scene.strategyHint, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}
