import {
  formatSignedNumber,
  tangentAsymptotes,
  tangentFeatures,
  tangentValue,
} from "../../assets/math-viz-core.mjs";

const samples = [
  { name: "标准正切", omega: 1, phase: 0, offset: 0, note: "先看最基础的一条正切曲线，先把渐近线找出来。" },
  { name: "周期压缩", omega: 2, phase: 0, offset: 0, note: "ω 变大以后，一个周期会变短，图像会更密。" },
  { name: "左右平移", omega: 1, phase: Math.PI / 4, offset: 0, note: "相位变化后，整组渐近线和图像会一起移动。" },
  { name: "整体上移", omega: 1, phase: 0, offset: 1.2, note: "上下平移会整体抬高曲线，但渐近线位置不会因为 b 改变。"},
];

const state = {
  omega: 1,
  phase: 0,
  offset: 0,
  sampleIndex: 0,
};

let canvas;
let ctx;
let els = {};

function init() {
  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");
  els = {
    omegaSlider: document.getElementById("omegaSlider"),
    phaseSlider: document.getElementById("phaseSlider"),
    offsetSlider: document.getElementById("offsetSlider"),
    omegaValue: document.getElementById("omegaValue"),
    phaseValue: document.getElementById("phaseValue"),
    offsetValue: document.getElementById("offsetValue"),
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
  els.omegaSlider.addEventListener("input", () => updateState("omega", parseFloat(els.omegaSlider.value), "先看 ω，先别急着盯曲线，先看渐近线之间的距离有没有变。"));
  els.phaseSlider.addEventListener("input", () => updateState("phase", parseFloat(els.phaseSlider.value), "相位变化时，正切曲线和整组渐近线会一起平移。"));
  els.offsetSlider.addEventListener("input", () => updateState("offset", parseFloat(els.offsetSlider.value), "上下平移不会改变周期，也不会改变渐近线的横坐标位置。"));
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
      state.omega = sample.omega;
      state.phase = sample.phase;
      state.offset = sample.offset;
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
  els.omegaSlider.value = state.omega;
  els.phaseSlider.value = state.phase;
  els.offsetSlider.value = state.offset;
  els.omegaValue.textContent = state.omega.toFixed(2);
  els.phaseValue.textContent = formatSignedNumber(state.phase);
  els.offsetValue.textContent = formatSignedNumber(state.offset);
  els.equationDisplay.textContent = `y = tan(${state.omega.toFixed(2)}x ${phaseText(state.phase)}) ${offsetText(state.offset)}`.trim();
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
  drawAsymptotes(width, height);
  drawTangentCurve(width, height);
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
  return {
    x: width / 2 + (x / Math.PI) * (width * 0.42),
    y: height / 2 - (y / 4) * (height * 0.38),
  };
}

function drawAsymptotes(width, height) {
  const asymptotes = tangentAsymptotes({ omega: state.omega, phase: state.phase }, -Math.PI, Math.PI);
  ctx.save();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = "rgba(239,131,84,0.75)";
  asymptotes.forEach((value) => {
    const point = worldToCanvas(width, height, value, 0);
    ctx.beginPath();
    ctx.moveTo(point.x, 0);
    ctx.lineTo(point.x, height);
    ctx.stroke();
  });
  ctx.setLineDash([]);
  ctx.restore();
}

function drawTangentCurve(width, height) {
  const asymptotes = tangentAsymptotes({ omega: state.omega, phase: state.phase }, -Math.PI, Math.PI);
  const boundaries = [-Math.PI, ...asymptotes, Math.PI];
  ctx.save();
  ctx.strokeStyle = "#2b7a78";
  ctx.lineWidth = 4;
  for (let i = 0; i < boundaries.length - 1; i += 1) {
    const left = boundaries[i] + 0.03;
    const right = boundaries[i + 1] - 0.03;
    ctx.beginPath();
    let started = false;
    for (let x = left; x <= right; x += 0.02) {
      const y = tangentValue(state.omega, state.phase, state.offset, x);
      if (!Number.isFinite(y) || Math.abs(y) > 4.2) continue;
      const point = worldToCanvas(width, height, x, y);
      if (!started) {
        ctx.moveTo(point.x, point.y);
        started = true;
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
    ctx.stroke();
  }
  ctx.restore();
}

function renderExplanation() {
  const features = tangentFeatures(state.omega, state.phase, state.offset);
  const asymptotes = tangentAsymptotes({ omega: state.omega, phase: state.phase }, -Math.PI, Math.PI);
  renderTeachingPanel(features, asymptotes);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前模型</span>
      <strong>y = tan(${state.omega.toFixed(2)}x ${phaseText(state.phase)}) ${offsetText(state.offset)}</strong>
      <p>${features.asymptoteHint}</p>
    </div>
    <div class="info-card">
      <span class="info-label">关键性质</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>周期：${features.period.toFixed(2)}</strong>
          <span>标准正切函数的周期是 π，ω 改变后，这个长度会被压缩或拉长。</span>
        </div>
        <div class="metric-item">
          <strong>渐近线数量：${asymptotes.length}</strong>
          <span>当前画面里每一条虚线，都是曲线会无限靠近但不会碰到的位置。</span>
        </div>
        <div class="metric-item">
          <strong>${features.rangeHint}</strong>
          <span>正切函数不会像正弦和余弦那样被限制在固定的最大值和最小值之间。</span>
        </div>
      </div>
    </div>
  `;
}

function renderTeachingPanel(features, asymptotes) {
  els.teachingPanel.innerHTML = `
    <div class="teaching-card">
      <span class="teaching-title">先抓结构</span>
      <strong class="teaching-value">周期 ${features.period.toFixed(2)}</strong>
      <div class="badge-row">
        <span class="teaching-chip">${features.rangeHint}</span>
        <span class="teaching-chip">渐近线 ${asymptotes.length} 条</span>
      </div>
    </div>
    <div class="teaching-card">
      <span class="teaching-title">速读提示</span>
      <p class="teaching-text">先找虚线，再看虚线之间这一段曲线是怎样从下往上穿过去的。</p>
    </div>
  `;
}

function phaseText(value) {
  if (Math.abs(value) < 1e-8) return "";
  return value > 0 ? `+ ${value.toFixed(2)}` : `- ${Math.abs(value).toFixed(2)}`;
}

function offsetText(value) {
  if (Math.abs(value) < 1e-8) return "";
  return value > 0 ? `+ ${value.toFixed(2)}` : `- ${Math.abs(value).toFixed(2)}`;
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
