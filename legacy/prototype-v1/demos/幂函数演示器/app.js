import {
  formatSignedNumber,
  powerCurvePoints,
  powerFeatures,
} from "../../assets/math-viz-core.mjs";

const samples = [
  { name: "平方", exponent: 2, note: "先看偶次幂，最容易感受到关于 y 轴对称。", label: "x^2" },
  { name: "立方", exponent: 3, note: "再看奇次幂，它会穿过原点，并保持原点对称。", label: "x^3" },
  { name: "平方根", exponent: 0.5, note: "分数指数最重要的是先盯住定义域，只看 x ≥ 0。", label: "x^0.5" },
  { name: "四次幂", exponent: 4, note: "指数更大时，靠近原点会更平，远离原点会上升更快。", label: "x^4" },
];

const state = {
  exponent: 2,
  sampleIndex: 0,
};

let canvas;
let ctx;
let els = {};

function init() {
  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");
  els = {
    exponentSlider: document.getElementById("exponentSlider"),
    exponentValue: document.getElementById("exponentValue"),
    equationDisplay: document.getElementById("equationDisplay"),
    sampleStrip: document.getElementById("sampleStrip"),
    teachingPanel: document.getElementById("teachingPanel"),
    explanationPanel: document.getElementById("explanationPanel"),
    messageBox: document.getElementById("messageBox"),
  };
  renderSamples();
  bindEvents();
  resizeCanvas();
  syncControls();
  render();
  window.addEventListener("resize", resizeCanvas);
}

function bindEvents() {
  els.exponentSlider.addEventListener("input", () => {
    state.exponent = parseFloat(els.exponentSlider.value);
    state.sampleIndex = samples.findIndex((sample) => Math.abs(sample.exponent - state.exponent) < 1e-8);
    syncControls();
    updateSampleActive();
    setMessage("先判断指数属于哪一类，再观察图像是关于 y 轴对称、关于原点对称，还是只剩半边。");
    render();
  });
}

function renderSamples() {
  els.sampleStrip.innerHTML = samples
    .map((sample, index) => `<button class="sample-chip ${index === 0 ? "is-active" : ""}" data-index="${index}">${sample.name}</button>`)
    .join("");
  els.sampleStrip.querySelectorAll(".sample-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      state.sampleIndex = index;
      state.exponent = samples[index].exponent;
      syncControls();
      updateSampleActive();
      setMessage(samples[index].note);
      render();
    });
  });
}

function updateSampleActive() {
  els.sampleStrip.querySelectorAll(".sample-chip").forEach((button, index) => {
    button.classList.toggle("is-active", index === state.sampleIndex);
  });
}

function syncControls() {
  els.exponentSlider.value = state.exponent;
  els.exponentValue.textContent = state.exponent.toFixed(2);
  els.equationDisplay.textContent = `y = x^${state.exponent.toFixed(2)}`;
}

function resizeCanvas() {
  const wrap = canvas.parentElement;
  const width = wrap.clientWidth;
  const height = parseInt(getComputedStyle(canvas).height, 10);
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  render();
}

function render() {
  if (!ctx) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);
  drawGrid(width, height);
  drawAxes(width, height);
  drawCurve(width, height);
  renderExplanation();
}

function drawGrid(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(43,122,120,0.12)";
  for (let x = 0; x <= width; x += width / 18) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += height / 18) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawAxes(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(23,48,66,0.78)";
  ctx.lineWidth = 2;
  const center = worldToCanvas(width, height, 0, 0);
  ctx.beginPath();
  ctx.moveTo(0, center.y);
  ctx.lineTo(width, center.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(center.x, 0);
  ctx.lineTo(center.x, height);
  ctx.stroke();
  ctx.restore();
}

function worldToCanvas(width, height, x, y) {
  const scale = 62;
  return {
    x: width / 2 + x * scale,
    y: height / 2 - y * scale,
  };
}

function drawCurve(width, height) {
  const points = powerCurvePoints(state.exponent, -4, 4, 0.04).filter((point) => Math.abs(point.y) <= 6);
  ctx.save();
  ctx.beginPath();
  let started = false;
  points.forEach((point) => {
    const canvasPoint = worldToCanvas(width, height, point.x, point.y);
    if (!started) {
      ctx.moveTo(canvasPoint.x, canvasPoint.y);
      started = true;
    } else {
      ctx.lineTo(canvasPoint.x, canvasPoint.y);
    }
  });
  ctx.strokeStyle = "#2b7a78";
  ctx.lineWidth = 4;
  ctx.stroke();

  const markers = [
    { x: 1, y: 1, label: "(1,1)" },
    { x: -1, y: Math.abs(state.exponent - 0.5) < 1e-8 ? null : (-1) ** state.exponent, label: null },
    { x: 0, y: 0, label: "(0,0)" },
  ];

  markers.forEach((marker) => {
    if (!Number.isFinite(marker.y) || marker.y === null) return;
    const point = worldToCanvas(width, height, marker.x, marker.y);
    ctx.fillStyle = "#ef8354";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
    if (marker.label) {
      ctx.fillStyle = "rgba(23,48,66,0.88)";
      ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
      ctx.fillText(marker.label, point.x + 10, point.y - 10);
    }
  });
  ctx.restore();
}

function renderExplanation() {
  const features = powerFeatures(state.exponent);
  renderTeachingPanel(features);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前函数</span>
      <strong>y = x^${state.exponent.toFixed(2)}</strong>
      <p>${features.studentSummary}</p>
    </div>
    <div class="info-card">
      <span class="info-label">关键观察</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>对称性：${features.symmetry}</strong>
          <span>先看它是不是左右对称，还是穿过原点向两边延伸。</span>
        </div>
        <div class="metric-item">
          <strong>定义域提示：${features.domainHint}</strong>
          <span>尤其是分数指数，先判断哪些 x 可以代进去。</span>
        </div>
        <div class="metric-item">
          <strong>图像感觉</strong>
          <span>${features.graphHint}</span>
        </div>
      </div>
    </div>
  `;
}

function renderTeachingPanel(features) {
  els.teachingPanel.innerHTML = `
    <div class="teaching-card">
      <span class="teaching-title">先抓分类</span>
      <strong class="teaching-value">${samples.find((sample) => Math.abs(sample.exponent - state.exponent) < 1e-8)?.label || `x^${state.exponent.toFixed(2)}`}</strong>
      <div class="badge-row">
        <span class="teaching-chip">${features.symmetry}</span>
        <span class="teaching-chip">${features.domainHint}</span>
      </div>
    </div>
    <div class="teaching-card">
      <span class="teaching-title">速读提示</span>
      <p class="teaching-text">${features.studentSummary}</p>
    </div>
  `;
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
