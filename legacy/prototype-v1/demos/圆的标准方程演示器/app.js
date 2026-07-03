import {
  circleStandardFeatures,
  formatSignedNumber,
} from "../../assets/math-viz-core.mjs";

const samples = [
  { name: "标准圆", h: 0, k: 0, r: 3, note: "先看标准圆，圆心在原点，最容易建立第一层感觉。" },
  { name: "右上平移", h: 2, k: 1.5, r: 3, note: "先拖圆心，看图像整体怎样被平移。"},
  { name: "偏心小圆", h: -2, k: 1, r: 2, note: "圆心和半径一起变化时，方程的三部分都在同步改变。"},
  { name: "大圆", h: 0, k: -1.5, r: 4.5, note: "半径变大以后，图像会整体放大。"},
];

const state = {
  h: 0,
  k: 0,
  r: 3,
  sampleIndex: 0,
};

let canvas;
let ctx;
let els = {};

function init() {
  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");
  els = {
    centerXSlider: document.getElementById("centerXSlider"),
    centerYSlider: document.getElementById("centerYSlider"),
    radiusSlider: document.getElementById("radiusSlider"),
    centerXValue: document.getElementById("centerXValue"),
    centerYValue: document.getElementById("centerYValue"),
    radiusValue: document.getElementById("radiusValue"),
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
  els.centerXSlider.addEventListener("input", () => updateState("h", parseFloat(els.centerXSlider.value), "先盯圆心横坐标，看看圆整体往哪边平移。"));
  els.centerYSlider.addEventListener("input", () => updateState("k", parseFloat(els.centerYSlider.value), "先盯圆心纵坐标，看看圆整体往上还是往下走。"));
  els.radiusSlider.addEventListener("input", () => updateState("r", parseFloat(els.radiusSlider.value), "半径变化时，先别急着看方程，先看圆是变大还是变小。"));
}

function updateState(key, value, message) {
  state[key] = value;
  state.sampleIndex = -1;
  updateSampleActive();
  syncControls();
  setMessage(message);
  render();
}

function renderSamples() {
  els.sampleStrip.innerHTML = samples
    .map((sample, index) => `<button class="sample-chip ${index === 0 ? "is-active" : ""}" data-index="${index}">${sample.name}</button>`)
    .join("");
  els.sampleStrip.querySelectorAll(".sample-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const sample = samples[Number(button.dataset.index)];
      state.sampleIndex = Number(button.dataset.index);
      state.h = sample.h;
      state.k = sample.k;
      state.r = sample.r;
      updateSampleActive();
      syncControls();
      setMessage(sample.note);
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
  els.centerXSlider.value = state.h;
  els.centerYSlider.value = state.k;
  els.radiusSlider.value = state.r;
  els.centerXValue.textContent = formatSignedNumber(state.h);
  els.centerYValue.textContent = formatSignedNumber(state.k);
  els.radiusValue.textContent = state.r.toFixed(2);
  els.equationDisplay.textContent = circleStandardFeatures(state.h, state.k, state.r).standardEquation;
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
  drawCircle(width, height);
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
  const scale = 48;
  return {
    x: width / 2 + x * scale,
    y: height / 2 - y * scale,
  };
}

function drawCircle(width, height) {
  const center = worldToCanvas(width, height, state.h, state.k);
  const radius = state.r * 48;
  ctx.save();
  ctx.strokeStyle = "#2b7a78";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#ef8354";
  ctx.beginPath();
  ctx.arc(center.x, center.y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = "rgba(239,131,84,0.82)";
  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(center.x + radius, center.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(23,48,66,0.88)";
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText(`圆心 (${state.h.toFixed(1)}, ${state.k.toFixed(1)})`, center.x + 10, center.y - 12);
  ctx.fillText(`r = ${state.r.toFixed(1)}`, center.x + radius / 2 - 10, center.y - 12);
  ctx.restore();
}

function renderExplanation() {
  const features = circleStandardFeatures(state.h, state.k, state.r);
  renderTeachingPanel(features);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前方程</span>
      <strong>${features.standardEquation}</strong>
      <p>先从圆心和半径去读方程，再回头看符号，不容易混淆。</p>
    </div>
    <div class="info-card">
      <span class="info-label">关键观察</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>圆心：(${features.center.x}, ${features.center.y})</strong>
          <span>圆心变了，整张图就是整体平移。</span>
        </div>
        <div class="metric-item">
          <strong>半径：${features.radius}</strong>
          <span>半径越大，圆会整体放大；半径越小，圆会收缩。</span>
        </div>
        <div class="metric-item">
          <strong>半径平方：${features.radiusSquared}</strong>
          <span>标准方程右边的数，实际就是半径平方。</span>
        </div>
      </div>
    </div>
  `;
}

function renderTeachingPanel(features) {
  els.teachingPanel.innerHTML = `
    <div class="teaching-card">
      <span class="teaching-title">先抓本质</span>
      <strong class="teaching-value">圆心 + 半径</strong>
      <div class="badge-row">
        <span class="teaching-chip">圆心 (${features.center.x}, ${features.center.y})</span>
        <span class="teaching-chip">r = ${features.radius}</span>
      </div>
    </div>
    <div class="teaching-card">
      <span class="teaching-title">速读提示</span>
      <p class="teaching-text">方程里的减号和加号先别死记，先想圆心在图上到底跑到了哪里。</p>
    </div>
  `;
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
