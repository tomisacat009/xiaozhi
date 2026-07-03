const DEFAULT_VIEWPORT = {
  xMin: -8,
  xMax: 8,
  yMin: -8,
  yMax: 8,
};

const DEFAULT_FEATURES = {
  animation: false,
  gridToggle: true,
  keyPointToggle: true,
  explanationCards: true,
};

function normalizeControl(control) {
  return {
    type: "range",
    min: -5,
    max: 5,
    step: 0.1,
    default: 0,
    ...control,
  };
}

function baseStateFromConfig(config) {
  return {
    params: { ...config.defaultParams },
    derived: {},
    view: {
      viewport: { ...config.viewport },
      activePresetId: config.presets[0]?.id ?? null,
      showGrid: config.features.gridToggle,
      showKeyPoints: config.features.keyPointToggle,
    },
    animation: {
      playing: false,
      progress: 0,
      presetId: null,
      frameId: null,
    },
    ui: {
      message: config.initialMessage ?? "",
      locked: false,
    },
  };
}

export function normalizeConfig(config) {
  const controls = (config.controls ?? []).map(normalizeControl);
  const controlDefaults = Object.fromEntries(
    controls.map((control) => [control.key, control.default]),
  );
  const defaultParams = {
    ...controlDefaults,
    ...(config.defaultParams ?? {}),
  };

  return {
    id: "demo",
    title: "数学演示器",
    eyebrow: "数学可视化",
    heroText: "拖动参数，观察图像变化。",
    graphTitle: "图像舞台",
    graphNote: "先看图像，再回到公式和性质。",
    sampleTitle: "典型样例",
    sampleHint: "点击切换一组常见变化",
    controlTitle: "参数控制",
    controlHint: "先看最关键的参数",
    teachingTitle: "观察提示",
    teachingHint: "把变化拆开看",
    backHref: "../../index.html",
    backLabel: "返回高中数学可视化学习系统",
    presets: [],
    features: { ...DEFAULT_FEATURES, ...(config.features ?? {}) },
    viewport: { ...DEFAULT_VIEWPORT, ...(config.viewport ?? {}) },
    ...config,
    controls,
    defaultParams,
  };
}

export function createDemoState(config, preset) {
  const normalized = normalizeConfig(config);
  const baseState = baseStateFromConfig(normalized);
  return preset ? buildPresetState(normalized, preset, baseState) : baseState;
}

export function buildPresetState(config, preset, currentState) {
  const normalized = normalizeConfig(config);
  const state = currentState ? structuredClone(currentState) : baseStateFromConfig(normalized);

  return {
    ...state,
    params: {
      ...state.params,
      ...(preset.params ?? {}),
    },
    view: {
      ...state.view,
      activePresetId: preset.id ?? state.view.activePresetId,
      viewport: {
        ...state.view.viewport,
        ...(preset.viewport ?? {}),
      },
    },
  };
}

export function interpolateParams(fromParams, toParams, progress) {
  const keys = Object.keys({ ...fromParams, ...toParams });

  return Object.fromEntries(
    keys.map((key) => {
      const fromValue = fromParams[key];
      const toValue = toParams[key];

      if (typeof fromValue === "number" && typeof toValue === "number") {
        return [key, fromValue + (toValue - fromValue) * progress];
      }

      return [key, toValue ?? fromValue];
    }),
  );
}
