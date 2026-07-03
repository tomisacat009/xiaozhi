import {
  formatSignedNumber,
  pointLineDistance,
} from "../../assets/math-viz-core.mjs";

const samples = [
  { name: "基础垂足", x0: 0, y0: 3, k: 1, b: 0, note: "先看最标准的一组，先把垂足和最短线段看清楚。" },
  { name: "负斜率直线", x0: 2, y0: 3, k: -1, b: 1, note: "直线方向一变，垂足位置也会跟着明显变化。"},
  { name: "点在下方", x0: -2, y0: -3, k: 0.5, b: 1, note: "点跑到直线下方时，最短线段还是垂线段。"},
  { name: "远离直线", x0: 4, y0: 4, k: 0, b: -1, note: "点离直线越远，橙色最短线段会直接变长。"},
];

const state = {
  x0: 0,
  y0: 3,
  k: 1,
  b: 0,
  sampleIndex: 0,
};

let canvas;
let ctx;
let els = {};

function init() {
  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");
  els = {
    pointXSlider: document.getElementById("pointXSlider"),
    pointYSlider: document.getElementById("pointYSlider"),
    slopeSlider: document.getElementById("slopeSlider"),
    interceptSlider: document.getElementById("interceptSlider"),
    pointXValue: document.getElementById("pointXValue"),
    pointYValue: document.getElementById("pointYValue"),
    slopeValue: document.getElementById("slopeValue"),
    interceptValue: document.getElementById("interceptValue"),
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
  els.pointXSlider.addEventListener("input", () => updateState("x0", parseFloat(els.pointXSlider.value), "先盯点的位置，看垂足会不会跟着明显移动。"));
  els.pointYSlider.addEventListener("input", () => updateState("y0", parseFloat(els.pointYSlider.value), "点上下移动时，最短线段的长度会最直观地变化。"));
  els.slopeSlider.addEventListener("input", () => updateState("k", parseFloat(els.slopeSlider.value), "先看直线方向怎么变，再看垂足落到哪里。"));
  els.interceptSlider.addEventListener("input", () => updateState("b", parseFloat(els.interceptSlider.value), "直线上下平移时，点到直线的最短距离会跟着改变。"));
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
      state.x0 = sample.x0;
      state.y0 = sample.y0;
      state.k = sample.k;
      state.b = sample.b;
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
  els.pointXSlider.value = state.x0;
  els.pointYSlider.value = state.y0;
  els.slopeSlider.value = state.k;
  els.interceptSlider.value = state.b;
  els.pointXValue.textContent = formatSignedNumber(state.x0);
  els.pointYValue.textContent = formatSignedNumber(state.y0);
  els.slopeValue.textContent = formatSignedNumber(state.k);
  els.interceptValue.textContent = formatSignedNumber(state.b);
  els.equationDisplay.textContent = `P(${state.x0.toFixed(1)}, ${state.y0.toFixed(1)})，y = ${state.k.toFixed(2)}x ${offsetText(state.b)}`;
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
  drawLine(width, height);
  drawDistance(width, height);
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
  const scale = 52;
  return {
    x: width / 2 + x * scale,
    y: height / 2 - y * scale,
  };
}

function drawLine(width, height) {
  ctx.save();
  ctx.strokeStyle = "#2b7a78";
  ctx.lineWidth = 4;
  const start = worldToCanvas(width, height, -6, state.k * -6 + state.b);
  const end = worldToCanvas(width, height, 6, state.k * 6 + state.b);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.restore();
}

function drawDistance(width, height) {
  const result = pointLineDistance(state.x0, state.y0, state.k, state.b);
  const point = worldToCanvas(width, height, state.x0, state.y0);
  const foot = worldToCanvas(width, height, result.foot.x, result.foot.y);

  ctx.save();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = "rgba(239,131,84,0.82)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(foot.x, foot.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#ef8354";
  ctx.beginPath();
  ctx.arc(point.x, point.y, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(foot.x, foot.y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(23,48,66,0.88)";
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText("P", point.x + 10, point.y - 10);
  ctx.fillText("H", foot.x + 10, foot.y - 10);
  ctx.fillText(`d = ${result.distance.toFixed(2)}`, (point.x + foot.x) / 2 + 8, (point.y + foot.y) / 2 - 8);
  ctx.restore();
}

function renderExplanation() {
  const result = pointLineDistance(state.x0, state.y0, state.k, state.b);
  renderTeachingPanel(result);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前距离</span>
      <strong>${result.distance.toFixed(2)}</strong>
      <p>${result.shortestHint}</p>
    </div>
    <div class="info-card">
      <span class="info-label">关键观察</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>点 P：(${state.x0.toFixed(1)}, ${state.y0.toFixed(1)})</strong>
          <span>点移动时，垂足和最短线段都会跟着变化。</span>
        </div>
        <div class="metric-item">
          <strong>垂足 H：(${result.foot.x.toFixed(2)}, ${result.foot.y.toFixed(2)})</strong>
          <span>最短线段的终点一定会落在垂足上。</span>
        </div>
        <div class="metric-item">
          <strong>最短距离</strong>
          <span>不是任意连线都最短，只有垂线段才是点到直线的最短距离。</span>
        </div>
      </div>
    </div>
  `;
}

function renderTeachingPanel(result) {
  els.teachingPanel.innerHTML = `
    <div class="teaching-card">
      <span class="teaching-title">先抓结论</span>
      <strong class="teaching-value">垂线段最短</strong>
      <div class="badge-row">
        <span class="teaching-chip">距离 ${result.distance.toFixed(2)}</span>
        <span class="teaching-chip">垂足 H</span>
      </div>
    </div>
    <div class="teaching-card">
      <span class="teaching-title">速读提示</span>
      <p class="teaching-text">如果孩子看不懂公式，先让他只盯住橙色线段：为什么它一定和直线垂直，而且为什么它最短。</p>
    </div>
  `;
}

function offsetText(value) {
  if (Math.abs(value) < 1e-8) return "";
  return value > 0 ? `+ ${value.toFixed(2)}` : `- ${Math.abs(value).toFixed(2)}`;
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
