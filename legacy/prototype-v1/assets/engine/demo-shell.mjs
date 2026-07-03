import { tweenPreset } from "./animation-engine.mjs";
import {
  bindControlPanel,
  renderControlPanel,
  syncControlPanel,
} from "./control-panel.mjs";
import {
  buildPresetState,
  createDemoState,
  normalizeConfig,
} from "./demo-registry.mjs";
import {
  renderExplanationPanel,
  renderMessage,
  renderTeachingPanel,
} from "./explanation-panel.mjs";
import { renderCanvas, resizeCanvas } from "./canvas-engine.mjs";
import {
  bindSampleStrip,
  renderSampleStrip,
  syncSampleStrip,
} from "./sample-strip.mjs";

function buildShell(config) {
  return `
    <div class="demo-page-shell">
      <div class="demo-topbar">
        <a class="demo-system-link" href="${config.backHref}">${config.backLabel}</a>
      </div>
      <header class="demo-hero">
        <div class="demo-hero-copy">
          <p class="demo-eyebrow">${config.eyebrow}</p>
          <h1>${config.title}</h1>
          <p class="demo-hero-text">${config.heroText}</p>
          ${config.heroBadges?.length ? `
            <div class="demo-hero-badges">
              ${config.heroBadges.map((badge) => `<span class="demo-hero-badge">${badge}</span>`).join("")}
            </div>
          ` : ""}
        </div>
        <div class="demo-equation-ribbon">
          <span class="demo-ribbon-label">当前表达式</span>
          <strong data-role="equation"></strong>
        </div>
      </header>
      <main class="demo-app-shell">
        <aside class="demo-panel demo-control-panel">
          <section class="demo-section-block">
            <div class="demo-section-title-wrap">
              <h2>${config.controlTitle}</h2>
              <span class="demo-section-hint">${config.controlHint}</span>
            </div>
            ${config.quickGuide?.length ? `
              <div class="demo-quick-guide">
                ${config.quickGuide.map((step, index) => `
                  <article class="demo-quick-step">
                    <span class="demo-quick-index">0${index + 1}</span>
                    <div>
                      <strong>${step.title}</strong>
                      <p>${step.text}</p>
                    </div>
                  </article>
                `).join("")}
              </div>
            ` : ""}
            <div data-role="controls"></div>
          </section>
          <section class="demo-section-block">
            <div class="demo-section-title-wrap">
              <h2>${config.sampleTitle}</h2>
              <span class="demo-section-hint">${config.sampleHint}</span>
            </div>
            <div class="demo-sample-strip" data-role="samples"></div>
            ${config.features.animation ? `
              <div class="demo-action-row">
                <button class="demo-primary-button" data-action="play">播放变化</button>
                <button class="demo-secondary-button" data-action="pause">暂停</button>
                <button class="demo-secondary-button" data-action="reset">重置</button>
              </div>
            ` : ""}
          </section>
          <section class="demo-section-block">
            <div class="demo-section-title-wrap">
              <h2>${config.teachingTitle}</h2>
              <span class="demo-section-hint">${config.teachingHint}</span>
            </div>
            <div class="demo-teaching-panel" data-role="teaching"></div>
          </section>
          <div class="demo-message-box" data-role="message"></div>
        </aside>
        <section class="demo-panel demo-graph-panel">
          <div class="demo-graph-header">
            <div>
              <p class="demo-eyebrow">Graph Stage</p>
              <h2>${config.graphTitle}</h2>
            </div>
            <p class="demo-graph-note">${config.graphNote}</p>
          </div>
          <div class="demo-canvas-wrap">
            <canvas data-role="canvas"></canvas>
          </div>
        </section>
        <aside class="demo-panel demo-info-panel" data-role="explanation"></aside>
      </main>
    </div>
  `;
}

function getPresetById(config, presetId) {
  return config.presets.find((preset) => preset.id === presetId) ?? null;
}

export function mountDemo(rootElement, config, plugin) {
  const normalized = normalizeConfig(config);
  rootElement.innerHTML = buildShell(normalized);

  const els = {
    equation: rootElement.querySelector("[data-role='equation']"),
    controls: rootElement.querySelector("[data-role='controls']"),
    samples: rootElement.querySelector("[data-role='samples']"),
    teaching: rootElement.querySelector("[data-role='teaching']"),
    message: rootElement.querySelector("[data-role='message']"),
    explanation: rootElement.querySelector("[data-role='explanation']"),
    canvas: rootElement.querySelector("[data-role='canvas']"),
    playButton: rootElement.querySelector("[data-action='play']"),
    pauseButton: rootElement.querySelector("[data-action='pause']"),
    resetButton: rootElement.querySelector("[data-action='reset']"),
  };

  let cleanupTween = null;
  let state = createDemoState(normalized);
  let ctx = resizeCanvas(els.canvas, normalized.canvasHeight ?? 680);

  renderControlPanel(els.controls, normalized.controls, state.params);
  bindControlPanel(els.controls, normalized.controls, state.params, (key, value) => {
    stopAnimation();
    state.params[key] = value;
    state.view.activePresetId = null;
    render(normalized.liveMessage ?? normalized.initialMessage ?? "继续拖动参数，盯住图像和性质一起变。");
  });

  renderSampleStrip(els.samples, normalized.presets, state.view.activePresetId);
  bindSampleStrip(els.samples, (presetId) => {
    const preset = getPresetById(normalized, presetId);
    if (!preset) return;
    animateToPreset(preset);
  });

  if (els.playButton) {
    els.playButton.addEventListener("click", () => playPresets());
    els.pauseButton.addEventListener("click", () => stopAnimation());
    els.resetButton.addEventListener("click", () => {
      stopAnimation();
      state = createDemoState(normalized);
      render(normalized.resetMessage ?? "已经回到默认状态。");
    });
  }

  function runPlugin() {
    return plugin.build({
      params: state.params,
      view: state.view,
      animation: state.animation,
      helpers: normalized.helpers ?? {},
      content: normalized,
    });
  }

  function render(nextMessage) {
    const result = runPlugin();
    state.derived = result.derived ?? {};
    const effectiveView = {
      ...state.view,
      ...(result.view ?? {}),
      viewport: {
        ...state.view.viewport,
        ...(result.view?.viewport ?? {}),
      },
    };
    if (nextMessage) state.ui.message = nextMessage;
    else if (result.message) state.ui.message = result.message;

    syncControlPanel(els.controls, normalized.controls, state.params);
    syncSampleStrip(els.samples, state.view.activePresetId);
    els.equation.textContent = state.derived.equation ?? normalized.title;
    renderTeachingPanel(els.teaching, result.teachingModel ?? []);
    renderExplanationPanel(els.explanation, result.explanationModel ?? []);
    renderMessage(els.message, state.ui.message);
    renderCanvas(ctx, els.canvas, effectiveView, result.drawModel ?? {});
  }

  function stopAnimation() {
    state.animation.playing = false;
    if (cleanupTween) {
      cleanupTween();
      cleanupTween = null;
    }
  }

  function animateToPreset(preset, done) {
    stopAnimation();
    const nextState = buildPresetState(normalized, preset, state);
    const startParams = { ...state.params };
    const targetParams = { ...nextState.params };
    state.view.activePresetId = preset.id;

    cleanupTween = tweenPreset({
      fromParams: startParams,
      toParams: targetParams,
      duration: preset.duration ?? normalized.animationDuration ?? 900,
      onUpdate: (params, progress) => {
        state.params = params;
        state.animation.progress = progress;
        render(preset.note ?? normalized.liveMessage);
      },
      onComplete: () => {
        state.params = targetParams;
        state.view.viewport = { ...nextState.view.viewport };
        state.animation.progress = 1;
        render(preset.note ?? normalized.liveMessage);
        cleanupTween = null;
        if (done) done();
      },
    });
  }

  function playPresets() {
    if (!normalized.presets.length || state.animation.playing) return;

    state.animation.playing = true;
    let index = Math.max(
      0,
      normalized.presets.findIndex((preset) => preset.id === state.view.activePresetId),
    );

    const loop = () => {
      if (!state.animation.playing) return;
      const preset = normalized.presets[index];
      animateToPreset(preset, () => {
        if (!state.animation.playing) return;
        index = (index + 1) % normalized.presets.length;
        window.setTimeout(loop, normalized.autoPlayDelay ?? 900);
      });
    };

    loop();
  }

  const handleResize = () => {
    ctx = resizeCanvas(els.canvas, normalized.canvasHeight ?? 680);
    render();
  };

  window.addEventListener("resize", handleResize);
  render(normalized.initialMessage ?? "准备好了，先从第一个样例开始。");

  return {
    destroy() {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
    },
  };
}
