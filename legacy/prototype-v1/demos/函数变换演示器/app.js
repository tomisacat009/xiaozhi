import {
  formatSignedNumber,
  transformFeatures,
  transformValue,
} from "../../assets/math-viz-core.mjs";

const baseTypes = [
  { id: "quadratic", label: "x^2" },
  { id: "absolute", label: "|x|" },
  { id: "sine", label: "sin(x)" },
];

const samples = [
  { name: "原图像", baseType: "quadratic", horizontalShift: 0, verticalShift: 0, horizontalScale: 1, verticalScale: 1, note: "先看原图像，不急着同时拖四个参数。" },
  { name: "向右平移", baseType: "quadratic", horizontalShift: 2, verticalShift: 0, horizontalScale: 1, verticalScale: 1, note: "先只盯左右平移，看顶点被整体带到了哪里。" },
  { name: "整体上移", baseType: "absolute", horizontalShift: 0, verticalShift: 2, horizontalScale: 1, verticalScale: 1, note: "上下平移最好和左右平移分开观察。"},
  { name: "横向压缩", baseType: "sine", horizontalShift: 0, verticalShift: 0, horizontalScale: 1.8, verticalScale: 1, note: "横向参数一变，图像会变得更密或更宽。"},
  { name: "纵向拉伸", baseType: "quadratic", horizontalShift: 0, verticalShift: 0, horizontalScale: 1, verticalScale: 2.2, note: "纵向拉伸时，图像会看起来更高更陡。"},
];

const state = {
  baseType: "quadratic",
  horizontalShift: 0,
  verticalShift: 0,
  horizontalScale: 1,
  verticalScale: 1,
  sampleIndex: 0,
};

let canvas;
let ctx;
let els = {};

function init() {
  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");
  els = {
    baseStrip: document.getElementById("baseStrip"),
    shiftXSlider: document.getElementById("shiftXSlider"),
    shiftYSlider: document.getElementById("shiftYSlider"),
    scaleXSlider: document.getElementById("scaleXSlider"),
    scaleYSlider: document.getElementById("scaleYSlider"),
    shiftXValue: document.getElementById("shiftXValue"),
    shiftYValue: document.getElementById("shiftYValue"),
    scaleXValue: document.getElementById("scaleXValue"),
    scaleYValue: document.getElementById("scaleYValue"),
    equationDisplay: document.getElementById("equationDisplay"),
    sampleStrip: document.getElementById("sampleStrip"),
    explanationPanel: document.getElementById("explanationPanel"),
    messageBox: document.getElementById("messageBox"),
  };
  renderBaseButtons();
  renderSamples();
  bindEvents();
  resizeCanvas();
  syncControls();
  render();
  window.addEventListener("resize", resizeCanvas);
}

function bindEvents() {
  els.shiftXSlider.addEventListener("input", () => updateState("horizontalShift", parseFloat(els.shiftXSlider.value), "先盯左右平移，看图像整体被往哪边带走。"));
  els.shiftYSlider.addEventListener("input", () => updateState("verticalShift", parseFloat(els.shiftYSlider.value), "现在只看上下平移，注意整条曲线会整体抬高或下移。"));
  els.scaleXSlider.addEventListener("input", () => updateState("horizontalScale", parseFloat(els.scaleXSlider.value), "横向伸缩先看图像是变密了还是变宽了。"));
  els.scaleYSlider.addEventListener("input", () => updateState("verticalScale", parseFloat(els.scaleYSlider.value), "纵向伸缩先看波峰、顶点或折点离 x 轴有多远。"));
}

function updateState(key, value, message) {
  state[key] = value;
  state.sampleIndex = -1;
  updateSampleActive();
  syncControls();
  setMessage(message);
  render();
}

function renderBaseButtons() {
  els.baseStrip.innerHTML = baseTypes
    .map((item) => `<button class="sample-chip ${item.id === state.baseType ? "is-active" : ""}" data-base="${item.id}">${item.label}</button>`)
    .join("");
  els.baseStrip.querySelectorAll(".sample-chip").forEach((button) => {
    button.addEventListener("click", () => {
      state.baseType = button.dataset.base;
      state.sampleIndex = -1;
      updateBaseActive();
      updateSampleActive();
      syncControls();
      setMessage("先固定一个底函数，再去观察平移和伸缩，孩子更容易建立整体框架。");
      render();
    });
  });
}

function renderSamples() {
  els.sampleStrip.innerHTML = samples
    .map((sample, index) => `<button class="sample-chip ${index === 0 ? "is-active" : ""}" data-index="${index}">${sample.name}</button>`)
    .join("");
  els.sampleStrip.querySelectorAll(".sample-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const sample = samples[Number(button.dataset.index)];
      state.sampleIndex = Number(button.dataset.index);
      state.baseType = sample.baseType;
      state.horizontalShift = sample.horizontalShift;
      state.verticalShift = sample.verticalShift;
      state.horizontalScale = sample.horizontalScale;
      state.verticalScale = sample.verticalScale;
      updateBaseActive();
      updateSampleActive();
      syncControls();
      setMessage(sample.note);
      render();
    });
  });
}

function updateBaseActive() {
  els.baseStrip.querySelectorAll(".sample-chip").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.base === state.baseType);
  });
}

function updateSampleActive() {
  els.sampleStrip.querySelectorAll(".sample-chip").forEach((button, index) => {
    button.classList.toggle("is-active", index === state.sampleIndex);
  });
}

function syncControls() {
  els.shiftXSlider.value = state.horizontalShift;
  els.shiftYSlider.value = state.verticalShift;
  els.scaleXSlider.value = state.horizontalScale;
  els.scaleYSlider.value = state.verticalScale;
  els.shiftXValue.textContent = formatSignedNumber(state.horizontalShift);
  els.shiftYValue.textContent = formatSignedNumber(state.verticalShift);
  els.scaleXValue.textContent = state.horizontalScale.toFixed(2);
  els.scaleYValue.textContent = state.verticalScale.toFixed(2);
  els.equationDisplay.textContent = `y = ${state.verticalScale.toFixed(2)}·f(${state.horizontalScale.toFixed(2)}(x ${shiftFormula(state.horizontalShift)})) ${offsetFormula(state.verticalShift)}`;
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
  drawBaseCurve(width, height);
  drawTransformedCurve(width, height);
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

function drawBaseCurve(width, height) {
  drawCurve(width, height, (x) => transformValue(state.baseType, x), "rgba(43,38,53,0.4)", 3);
}

function drawTransformedCurve(width, height) {
  drawCurve(
    width,
    height,
    (x) => transformValue(state.baseType, x, state),
    "#ef8354",
    4
  );
}

function drawCurve(width, height, getValue, color, lineWidth) {
  ctx.save();
  ctx.beginPath();
  let started = false;
  for (let x = -6; x <= 6; x += 0.04) {
    const y = getValue(x);
    if (!Number.isFinite(y) || Math.abs(y) > 8) continue;
    const point = worldToCanvas(width, height, x, y);
    if (!started) {
      ctx.moveTo(point.x, point.y);
      started = true;
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.restore();
}

function renderExplanation() {
  const features = transformFeatures(state);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前底函数</span>
      <strong>${features.baseLabel}</strong>
      <p>建议每次只看一种变化，不要一口气同时改四个参数。</p>
    </div>
    <div class="info-card">
      <span class="info-label">当前变换</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>${features.horizontalMove}</strong>
          <span>先盯图像整体往左还是往右移动。</span>
        </div>
        <div class="metric-item">
          <strong>${features.verticalMove}</strong>
          <span>上下平移时，整个图像会一起抬高或下移。</span>
        </div>
        <div class="metric-item">
          <strong>${features.horizontalScaleHint}</strong>
          <span>横向参数改变后，图像会显得更密或更宽。</span>
        </div>
        <div class="metric-item">
          <strong>${features.verticalScaleHint}</strong>
          <span>纵向参数改变后，图像离 x 轴会更远或更近。</span>
        </div>
      </div>
    </div>
  `;
}

function shiftFormula(value) {
  if (Math.abs(value) < 1e-8) return "- 0.00";
  return value >= 0 ? `- ${Math.abs(value).toFixed(2)}` : `+ ${Math.abs(value).toFixed(2)}`;
}

function offsetFormula(value) {
  if (Math.abs(value) < 1e-8) return "";
  return value > 0 ? `+ ${value.toFixed(2)}` : `- ${Math.abs(value).toFixed(2)}`;
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
