const ROOT_SCENES = {
  spect: {
    rootMeaning: "spect = 看",
    familySummary: "同一个“看”字核心，配上不同前缀后，会变成向内看、向后看、向前看等不同方向。",
    words: [
      { word: "inspect", note: "向内看，检查" },
      { word: "respect", note: "回头看，引申为尊重" },
      { word: "prospect", note: "向前看，前景" },
      { word: "spectator", note: "观看者" },
    ],
  },
  struct: {
    rootMeaning: "struct = 建造",
    familySummary: "以“建造、结构”为核心，可以扩展到 construction、instruct、structure 等一整组词。",
    words: [
      { word: "construct", note: "共同建造，构建" },
      { word: "structure", note: "结构" },
      { word: "instruction", note: "向内建构，引申为指导说明" },
      { word: "destruction", note: "拆毁结构，引申为破坏" },
    ],
  },
};

export function buildWordRootModel({ rootId = "spect", familyView = "network" } = {}) {
  const scene = ROOT_SCENES[rootId] ?? ROOT_SCENES.spect;
  const words = scene.words.map((item) => item.word);
  const centerX = 5.8;
  const centerY = 4.4;

  return {
    derived: {
      rootId,
      familyView,
      rootMeaning: scene.rootMeaning,
      words,
      familySummary: scene.familySummary,
      equation: `${scene.rootMeaning}｜${words.join(" / ")}`,
      studentSummary: "先抓词根核心义，再看前后缀怎样改变方向、语气和词性，记忆会更稳。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: [
        { x: centerX, y: centerY, radius: 16, color: "rgba(249,115,22,0.84)", label: scene.rootMeaning },
        { x: 2.2, y: 6.2, radius: 13, color: "rgba(59,130,246,0.84)", label: "inspect" },
        { x: 9.3, y: 6.2, radius: 13, color: "rgba(34,197,94,0.84)", label: "respect" },
        { x: 2.6, y: 2.3, radius: 13, color: "rgba(168,85,247,0.84)", label: "prospect" },
        { x: 9.0, y: 2.3, radius: 13, color: "rgba(236,72,153,0.84)", label: "spectator" },
      ],
      segments: [
        { from: { x: centerX, y: centerY }, to: { x: 2.2, y: 6.2 }, color: "rgba(59,130,246,0.9)", lineWidth: 3, label: "in- 前缀" },
        { from: { x: centerX, y: centerY }, to: { x: 9.3, y: 6.2 }, color: "rgba(34,197,94,0.9)", lineWidth: 3, label: "re- 前缀" },
        { from: { x: centerX, y: centerY }, to: { x: 2.6, y: 2.3 }, color: "rgba(168,85,247,0.9)", lineWidth: 3, label: "pro- 前缀" },
        { from: { x: centerX, y: centerY }, to: { x: 9.0, y: 2.3 }, color: "rgba(236,72,153,0.9)", lineWidth: 3, label: "-ator 后缀" },
      ],
      labels: [
        { x: 1.0, y: 7.2, text: scene.familySummary, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: "前缀改变方向，后缀改变词性或身份角色。", color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const AFFIX_SCENES = {
  "re-view": {
    affixMeaning: "re- = 再次、回头",
    baseMeaning: "view = 看",
    derivedWords: ["review", "preview", "interview"],
    familySummary: "同样是和“看”有关的核心义，前缀一变，动作方向和使用场景就会跟着变。",
  },
  "im-possible": {
    affixMeaning: "im- = 否定、不能",
    baseMeaning: "possible = 可能的",
    derivedWords: ["impossible", "impolite", "immature"],
    familySummary: "否定前缀很适合理解成“把原词意义转向相反方向”。",
  },
};

export function buildAffixNetworkModel({ familyId = "re-view", emphasis = "prefix" } = {}) {
  const scene = AFFIX_SCENES[familyId] ?? AFFIX_SCENES["re-view"];
  return {
    derived: {
      familyId,
      emphasis,
      affixMeaning: scene.affixMeaning,
      baseMeaning: scene.baseMeaning,
      derivedWords: scene.derivedWords,
      familySummary: scene.familySummary,
      equation: `${scene.affixMeaning} + ${scene.baseMeaning}｜${scene.derivedWords.join(" / ")}`,
      studentSummary: "词根给核心义，词缀决定方向、态度或词性变化，孩子更容易从“拼装”角度理解单词。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: [
        { x: 2.2, y: 4.4, radius: 14, color: "rgba(59,130,246,0.84)", label: scene.affixMeaning },
        { x: 5.8, y: 4.4, radius: 16, color: "rgba(249,115,22,0.84)", label: scene.baseMeaning },
        { x: 9.4, y: 6.0, radius: 13, color: "rgba(34,197,94,0.84)", label: scene.derivedWords[0] },
        { x: 9.4, y: 4.0, radius: 13, color: "rgba(168,85,247,0.84)", label: scene.derivedWords[1] },
        { x: 9.4, y: 2.0, radius: 13, color: "rgba(236,72,153,0.84)", label: scene.derivedWords[2] },
      ],
      segments: [
        { from: { x: 3.1, y: 4.4 }, to: { x: 4.8, y: 4.4 }, color: "rgba(59,130,246,0.9)", lineWidth: 3, label: "词缀作用" },
        { from: { x: 6.8, y: 4.6 }, to: { x: 8.5, y: 5.7 }, color: "rgba(34,197,94,0.9)", lineWidth: 3, label: "组合成词" },
        { from: { x: 6.8, y: 4.4 }, to: { x: 8.5, y: 4.0 }, color: "rgba(168,85,247,0.9)", lineWidth: 3, label: "变换词义" },
        { from: { x: 6.8, y: 4.2 }, to: { x: 8.5, y: 2.3 }, color: "rgba(236,72,153,0.9)", lineWidth: 3, label: "词性延伸" },
      ],
      labels: [
        { x: 1.0, y: 7.2, text: scene.familySummary, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: "词性变化常由后缀决定，方向变化常由前缀决定。", color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const WORD_FAMILY_SCENES = {
  act: {
    coreMeaning: "act = 行动 / 做",
    familySummary: "教材里高频的 act 词族很适合做成“核心义 + 角色词 + 结果词 + 互动词”的扩展图。",
    familyWords: ["act", "action", "active", "activity", "react", "interaction"],
    tips: "先抓 act 的“行动”核心，再看谁表示人、谁表示状态、谁表示再次作用。",
    nodes: [
      { id: "core", label: "act\n核心义", x: 5.8, y: 4.4, color: "rgba(249,115,22,0.84)" },
      { id: "action", label: "action\n动作结果", x: 2.4, y: 6.1, color: "rgba(59,130,246,0.84)" },
      { id: "active", label: "active\n状态特点", x: 9.2, y: 6.1, color: "rgba(34,197,94,0.84)" },
      { id: "activity", label: "activity\n活动名词", x: 2.7, y: 2.2, color: "rgba(168,85,247,0.84)" },
      { id: "react", label: "react\n反向作用", x: 8.8, y: 2.2, color: "rgba(236,72,153,0.84)" },
      { id: "interaction", label: "interaction\n相互作用", x: 10.4, y: 4.4, color: "rgba(14,165,233,0.84)" },
    ],
    links: [
      { from: "core", to: "action", label: "同核扩展" },
      { from: "core", to: "active", label: "状态延伸" },
      { from: "core", to: "activity", label: "名词化" },
      { from: "core", to: "react", label: "re- 反向" },
      { from: "react", to: "interaction", label: "互动场景" },
    ],
  },
  form: {
    coreMeaning: "form = 形状 / 形成",
    familySummary: "form 词族很适合帮助孩子看懂“形成、形式、变化、转化”这一整组教材高频词。",
    familyWords: ["form", "formal", "formation", "transform", "uniform", "inform"],
    tips: "先抓 form 的“形状/形成”核心，再看前缀怎样把它拉成转化、统一和告知。",
    nodes: [
      { id: "core", label: "form\n核心义", x: 5.8, y: 4.4, color: "rgba(249,115,22,0.84)" },
      { id: "formal", label: "formal\n形式上的", x: 2.3, y: 6.0, color: "rgba(59,130,246,0.84)" },
      { id: "formation", label: "formation\n形成结果", x: 9.3, y: 6.0, color: "rgba(34,197,94,0.84)" },
      { id: "transform", label: "transform\n转化", x: 2.5, y: 2.1, color: "rgba(168,85,247,0.84)" },
      { id: "uniform", label: "uniform\n统一/制服", x: 8.8, y: 2.1, color: "rgba(236,72,153,0.84)" },
      { id: "inform", label: "inform\n告知", x: 10.4, y: 4.4, color: "rgba(14,165,233,0.84)" },
    ],
    links: [
      { from: "core", to: "formal", label: "形式特点" },
      { from: "core", to: "formation", label: "结果名词" },
      { from: "core", to: "transform", label: "trans- 转化" },
      { from: "core", to: "uniform", label: "uni- 统一" },
      { from: "core", to: "inform", label: "in- 向内传递" },
    ],
  },
};

export function buildWordFamilyAtlasModel({ familyId = "act", emphasis = "family" } = {}) {
  const scene = WORD_FAMILY_SCENES[familyId] ?? WORD_FAMILY_SCENES.act;
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = emphasis === "derivation" ? scene.nodes[1] : nodeLookup.get("core");

  return {
    derived: {
      familyId,
      emphasis,
      coreMeaning: scene.coreMeaning,
      familyWords: scene.familyWords,
      familySummary: scene.familySummary,
      tips: scene.tips,
      equation: `${scene.coreMeaning}｜${scene.familyWords.join(" / ")}`,
      studentSummary: "一个核心义长出一串教材高频词，比零散背单词更容易形成长期记忆。",
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
        { x: 1.0, y: 7.2, text: scene.familySummary, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: scene.tips, color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const SYNONYM_GROUP_SCENES = {
  look: {
    coreAxis: "看 = 视线动作",
    nuanceHint: "近义词不是完全等价，通常在时间长短、语气强弱和注意力集中度上有差别。",
    words: ["look", "glance", "stare", "watch"],
    nodes: [
      { id: "look", label: "look\n普通看", x: 5.6, y: 4.6, color: "rgba(249,115,22,0.84)" },
      { id: "glance", label: "glance\n快速看", x: 3.1, y: 6.0, color: "rgba(59,130,246,0.84)" },
      { id: "watch", label: "watch\n持续看", x: 8.8, y: 5.6, color: "rgba(34,197,94,0.84)" },
      { id: "stare", label: "stare\n盯着看", x: 8.9, y: 2.4, color: "rgba(168,85,247,0.84)" },
    ],
    labels: [
      { x: 1.2, y: 7.1, text: "语气更轻 / 时间更短", color: "rgba(71, 85, 105, 0.92)" },
      { x: 7.1, y: 1.0, text: "语气更强 / 注意力更集中", color: "rgba(71, 85, 105, 0.92)" },
    ],
    links: [
      { from: "look", to: "glance", label: "更短更快" },
      { from: "look", to: "watch", label: "持续观察" },
      { from: "look", to: "stare", label: "强烈注视" },
    ],
  },
  say: {
    coreAxis: "说 = 语言输出",
    nuanceHint: "同样是“说”，也会在正式程度、音量和对象关系上发生变化。",
    words: ["say", "speak", "tell", "shout"],
    nodes: [
      { id: "say", label: "say\n一般表达", x: 5.6, y: 4.6, color: "rgba(249,115,22,0.84)" },
      { id: "speak", label: "speak\n较正式", x: 3.0, y: 5.9, color: "rgba(59,130,246,0.84)" },
      { id: "tell", label: "tell\n对人说明", x: 8.8, y: 5.6, color: "rgba(34,197,94,0.84)" },
      { id: "shout", label: "shout\n大声喊", x: 8.9, y: 2.3, color: "rgba(168,85,247,0.84)" },
    ],
    labels: [
      { x: 1.1, y: 7.1, text: "更正式 / 场景更规范", color: "rgba(71, 85, 105, 0.92)" },
      { x: 7.4, y: 1.0, text: "语气更强 / 声量更高", color: "rgba(71, 85, 105, 0.92)" },
    ],
    links: [
      { from: "say", to: "speak", label: "正式场景" },
      { from: "say", to: "tell", label: "对象更明确" },
      { from: "say", to: "shout", label: "语气增强" },
    ],
  },
};

export function buildSynonymSemanticMapModel({ groupId = "look", focusWord = "look" } = {}) {
  const scene = SYNONYM_GROUP_SCENES[groupId] ?? SYNONYM_GROUP_SCENES.look;
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(focusWord) ?? nodeLookup.get(scene.words[0]) ?? scene.nodes[0];

  return {
    derived: {
      groupId,
      focusWord: focusNode.id,
      coreAxis: scene.coreAxis,
      words: scene.words,
      nuanceHint: scene.nuanceHint,
      equation: `${scene.coreAxis}｜${scene.words.join(" / ")}`,
      studentSummary: "近义词最怕死记中文，要把它们放回语气、时间、力度和对象差异里看。",
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
        { x: 1.0, y: 7.25, text: scene.nuanceHint, color: "rgba(15, 23, 42, 0.96)" },
        ...scene.labels,
      ],
    },
  };
}

const CONNECTOR_SCENES = {
  contrast: {
    coreFunction: "转折 / 对比逻辑",
    connectors: ["however", "but", "although", "instead"],
    summary: "转折连接词最适合做成逻辑网络，让孩子看到它们都在“拐弯”，但拐弯方式并不一样。",
    nodes: [
      { id: "contrast-core", label: "转折核心", x: 5.8, y: 4.4, color: "rgba(249,115,22,0.84)" },
      { id: "however", label: "however\n书面转折", x: 2.5, y: 6.0, color: "rgba(59,130,246,0.84)" },
      { id: "but", label: "but\n基础转折", x: 9.0, y: 6.0, color: "rgba(34,197,94,0.84)" },
      { id: "although", label: "although\n让步转折", x: 2.7, y: 2.2, color: "rgba(168,85,247,0.84)" },
      { id: "instead", label: "instead\n替代转向", x: 9.2, y: 2.2, color: "rgba(236,72,153,0.84)" },
    ],
    links: [
      { from: "contrast-core", to: "however", label: "逻辑转折" },
      { from: "contrast-core", to: "but", label: "逻辑转折" },
      { from: "contrast-core", to: "although", label: "让步逻辑" },
      { from: "contrast-core", to: "instead", label: "替代逻辑" },
    ],
  },
  cause: {
    coreFunction: "因果 / 结果逻辑",
    connectors: ["because", "so", "therefore", "as a result"],
    summary: "因果连接词很适合帮助孩子看懂哪部分是原因，哪部分是结果，以及书面表达的强弱差异。",
    nodes: [
      { id: "cause-core", label: "因果核心", x: 5.8, y: 4.4, color: "rgba(249,115,22,0.84)" },
      { id: "because", label: "because\n直接原因", x: 2.5, y: 6.0, color: "rgba(59,130,246,0.84)" },
      { id: "so", label: "so\n直接结果", x: 9.0, y: 6.0, color: "rgba(34,197,94,0.84)" },
      { id: "therefore", label: "therefore\n书面结果", x: 2.8, y: 2.2, color: "rgba(168,85,247,0.84)" },
      { id: "as-result", label: "as a result\n结果短语", x: 9.1, y: 2.2, color: "rgba(236,72,153,0.84)" },
    ],
    links: [
      { from: "cause-core", to: "because", label: "原因表达" },
      { from: "cause-core", to: "so", label: "结果表达" },
      { from: "cause-core", to: "therefore", label: "书面推论" },
      { from: "cause-core", to: "as-result", label: "结果短语" },
    ],
  },
};

export function buildLogicConnectorMapModel({ groupId = "contrast", focusConnector = "however" } = {}) {
  const scene = CONNECTOR_SCENES[groupId] ?? CONNECTOR_SCENES.contrast;
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(focusConnector) ?? scene.nodes[0];

  return {
    derived: {
      groupId,
      focusConnector: focusNode.id,
      coreFunction: scene.coreFunction,
      connectors: scene.connectors,
      summary: scene.summary,
      equation: `${scene.coreFunction}｜${scene.connectors.join(" / ")}`,
      studentSummary: "连接词不要只背中文，要先看它在句子和文章里承担哪一种逻辑关系。",
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
        { x: 1.0, y: 7.2, text: scene.summary, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: "先判断逻辑关系，再决定连接词，不要反过来硬套。", color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const WRITING_UPGRADE_SCENES = {
  "because-upgrade": {
    upgradeGoal: "句式升级：把平铺直叙改成更有层次的表达",
    stageLabels: ["基础表达", "升级表达", "效果提升"],
    summary: "写作升级不是换生僻词，而是把原因、结果和重点放到更清楚的句型结构里。",
    nodes: [
      { id: "basic", label: "I stayed at home because it rained.\n基础表达", x: 2.5, y: 4.6, color: "rgba(59,130,246,0.84)" },
      { id: "link", label: "连接改造", x: 5.6, y: 4.6, color: "rgba(249,115,22,0.84)" },
      { id: "advanced", label: "Because of the heavy rain, I stayed at home.\n升级表达", x: 9.0, y: 5.3, color: "rgba(34,197,94,0.84)" },
      { id: "effect", label: "层次更清楚", x: 9.4, y: 2.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "basic", to: "link", label: "识别原因结构" },
      { from: "link", to: "advanced", label: "升级句式" },
      { from: "advanced", to: "effect", label: "表达升级" },
    ],
  },
  "if-upgrade": {
    upgradeGoal: "句式升级：把简单条件句改成更完整的书面表达",
    stageLabels: ["基础表达", "升级表达", "效果提升"],
    summary: "条件句升级的关键，不是变难，而是让条件和结果的关系更完整、更书面。",
    nodes: [
      { id: "basic", label: "If you study hard, you will improve.\n基础表达", x: 2.5, y: 4.6, color: "rgba(59,130,246,0.84)" },
      { id: "link", label: "条件重组", x: 5.7, y: 4.6, color: "rgba(249,115,22,0.84)" },
      { id: "advanced", label: "If you work hard, you are more likely to make progress.\n升级表达", x: 9.2, y: 5.3, color: "rgba(34,197,94,0.84)" },
      { id: "effect", label: "更自然更书面", x: 9.3, y: 2.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "basic", to: "link", label: "识别条件关系" },
      { from: "link", to: "advanced", label: "升级句式" },
      { from: "advanced", to: "effect", label: "表达升级" },
    ],
  },
};

export function buildWritingUpgradeModel({ patternId = "because-upgrade", focusStage = "advanced" } = {}) {
  const scene = WRITING_UPGRADE_SCENES[patternId] ?? WRITING_UPGRADE_SCENES["because-upgrade"];
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(focusStage) ?? scene.nodes[0];

  return {
    derived: {
      patternId,
      focusStage: focusNode.id,
      upgradeGoal: scene.upgradeGoal,
      stageLabels: scene.stageLabels,
      summary: scene.summary,
      equation: `${scene.upgradeGoal}｜${scene.stageLabels.join(" -> ")}`,
      studentSummary: "写作升级先看结构升级，不要一开始就追求难词和长句。",
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
        { x: 1.0, y: 7.2, text: scene.summary, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: "先说清结构为什么更好，再去模仿升级表达。", color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const WRITING_PARAGRAPH_SCENES = {
  "opinion-paragraph": {
    paragraphGoal: "段落展开：把观点句稳定展开成支撑句和结尾句",
    layerLabels: ["主题句", "支撑句", "例子句", "收束句"],
    summary: "段落写不开，往往不是词汇不够，而是没有看清一段话本身该怎样分层展开。",
    nodes: [
      { id: "topic", label: "主题句\nI think reading is important.", x: 2.4, y: 5.0, color: "rgba(59,130,246,0.84)" },
      { id: "support-1", label: "支撑句\nIt broadens our minds.", x: 5.6, y: 5.6, color: "rgba(249,115,22,0.84)" },
      { id: "support-2", label: "支撑句\nIt improves language ability.", x: 5.8, y: 3.6, color: "rgba(34,197,94,0.84)" },
      { id: "example", label: "例子句", x: 8.8, y: 4.6, color: "rgba(168,85,247,0.84)" },
      { id: "closing", label: "收束句", x: 10.0, y: 2.2, color: "rgba(236,72,153,0.84)" },
    ],
    links: [
      { from: "topic", to: "support-1", label: "展开理由" },
      { from: "topic", to: "support-2", label: "展开理由" },
      { from: "support-1", to: "example", label: "补例子" },
      { from: "example", to: "closing", label: "收束段落" },
    ],
  },
  "problem-solution": {
    paragraphGoal: "段落展开：把问题段写成“问题 + 原因 + 解决办法”",
    layerLabels: ["问题句", "原因句", "办法句", "收束句"],
    summary: "议论文段落常见卡点不是不会写句子，而是不知道一段话该按什么顺序长出来。",
    nodes: [
      { id: "topic", label: "问题句", x: 2.4, y: 5.0, color: "rgba(59,130,246,0.84)" },
      { id: "cause", label: "原因句", x: 5.6, y: 5.6, color: "rgba(249,115,22,0.84)" },
      { id: "solution", label: "办法句", x: 5.8, y: 3.6, color: "rgba(34,197,94,0.84)" },
      { id: "detail", label: "补充细节", x: 8.8, y: 4.6, color: "rgba(168,85,247,0.84)" },
      { id: "closing", label: "收束句", x: 10.0, y: 2.2, color: "rgba(236,72,153,0.84)" },
    ],
    links: [
      { from: "topic", to: "cause", label: "说明原因" },
      { from: "topic", to: "solution", label: "提出办法" },
      { from: "solution", to: "detail", label: "补做法" },
      { from: "detail", to: "closing", label: "收束段落" },
    ],
  },
};

export function buildWritingParagraphModel({ paragraphId = "opinion-paragraph", focusNodeId = "support-1" } = {}) {
  const scene = WRITING_PARAGRAPH_SCENES[paragraphId] ?? WRITING_PARAGRAPH_SCENES["opinion-paragraph"];
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(focusNodeId) ?? scene.nodes[0];

  return {
    derived: {
      paragraphId,
      focusNodeId: focusNode.id,
      paragraphGoal: scene.paragraphGoal,
      layerLabels: scene.layerLabels,
      summary: scene.summary,
      equation: `${scene.paragraphGoal}｜${scene.layerLabels.join(" -> ")}`,
      studentSummary: "段落提升先看层级展开，不要一上来就堆句子和难词。",
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
        { x: 1.0, y: 7.2, text: scene.summary, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: "先看这一段要怎样长出来，再考虑句子怎么润色。", color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}

const GRAMMAR_CLOZE_SCENES = {
  "verb-form": {
    coreGoal: "语法填空：先判断词性和句法位置，再决定动词形式",
    stepLabels: ["看空格位置", "句法判断", "时态语态", "确定答案"],
    summary: "语法填空最怕一眼凭感觉填词，稳定做法一定是先看空格在句子里承担什么功能。",
    nodes: [
      { id: "blank", label: "空格位置", x: 2.2, y: 5.0, color: "rgba(59,130,246,0.84)" },
      { id: "syntax", label: "句法判断\n谓语 or 非谓语", x: 5.2, y: 5.4, color: "rgba(249,115,22,0.84)" },
      { id: "tense", label: "时态语态", x: 8.6, y: 5.0, color: "rgba(34,197,94,0.84)" },
      { id: "answer", label: "确定答案", x: 9.2, y: 2.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "blank", to: "syntax", label: "先定功能" },
      { from: "syntax", to: "tense", label: "再做判断" },
      { from: "tense", to: "answer", label: "落到答案" },
    ],
  },
  "word-class": {
    coreGoal: "语法填空：先看上下文，再决定词性变化",
    stepLabels: ["看空格位置", "判断词性", "看搭配", "确定答案"],
    summary: "很多词形变化题不是词不会，而是没先看清空格前后在要名词、形容词还是副词。",
    nodes: [
      { id: "blank", label: "空格位置", x: 2.2, y: 5.0, color: "rgba(59,130,246,0.84)" },
      { id: "syntax", label: "判断词性", x: 5.0, y: 5.4, color: "rgba(249,115,22,0.84)" },
      { id: "tense", label: "固定搭配 / 词形", x: 8.6, y: 5.0, color: "rgba(34,197,94,0.84)" },
      { id: "answer", label: "确定答案", x: 9.1, y: 2.2, color: "rgba(168,85,247,0.84)" },
    ],
    links: [
      { from: "blank", to: "syntax", label: "先定词性" },
      { from: "syntax", to: "tense", label: "再看搭配" },
      { from: "tense", to: "answer", label: "落到答案" },
    ],
  },
};

export function buildGrammarClozeStrategyModel({ taskId = "verb-form", focusNodeId = "syntax" } = {}) {
  const scene = GRAMMAR_CLOZE_SCENES[taskId] ?? GRAMMAR_CLOZE_SCENES["verb-form"];
  const nodeLookup = new Map(scene.nodes.map((node) => [node.id, node]));
  const focusNode = nodeLookup.get(focusNodeId) ?? scene.nodes[0];

  return {
    derived: {
      taskId,
      focusNodeId: focusNode.id,
      coreGoal: scene.coreGoal,
      stepLabels: scene.stepLabels,
      summary: scene.summary,
      equation: `${scene.coreGoal}｜${scene.stepLabels.join(" -> ")}`,
      studentSummary: "语法填空先判断功能，再选形式，不能跳过句法这一步。",
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
        { x: 1.0, y: 7.2, text: scene.summary, color: "rgba(15, 23, 42, 0.96)" },
        { x: 1.0, y: 0.8, text: "先看空格做什么，再看该填什么，不要直接猜词形。", color: "rgba(71, 85, 105, 0.92)" },
      ],
    },
  };
}
