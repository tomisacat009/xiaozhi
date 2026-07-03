import {
  formatSignedNumber,
  sineTransformFeatures,
  sineValue,
} from "../../assets/math-viz-core.mjs";

const samples = [
  { name: "标准波形", amplitude: 1, omega: 1, phase: 0, offset: 0, note: "先把标准 sin(x) 看熟，再去看参数变化。" },
  { name: "振幅放大", amplitude: 2.2, omega: 1, phase: 0, offset: 0, note: "A 变大以后，波峰更高、波谷更低。"},
  { name: "周期压缩", amplitude: 1, omega: 2, phase: 0, offset: 0, note: "ω 变大以后，一个周期会变短，波形更密。"},
  { name: "向右平移", amplitude: 1, omega: 1, phase: -Math.PI / 2, offset: 0, note: "φ 改变以后，整条曲线会左右平移。"},
  { name: "整体上移", amplitude: 1, omega: 1, phase: 0, offset: 1.5, note: "d 决定整条曲线的中线会上移还是下移。"},
];

const state = {
  amplitude: 1,
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
    amplitudeSlider: document.getElementById("amplitudeSlider"),
    omegaSlider: document.getElementById("omegaSlider"),
    phaseSlider: document.getElementById("phaseSlider"),
    offsetSlider: document.getElementById("offsetSlider"),
    amplitudeValue: document.getElementById("amplitudeValue"),
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
  els.amplitudeSlider.addEventListener("input", () => updateState("amplitude", parseFloat(els.amplitudeSlider.value), "观察 A，先看波峰和波谷离中线有多远。"));
  els.omegaSlider.addEventListener("input", () => updateState("omega", parseFloat(els.omegaSlider.value), "观察 ω，先看一个周期是变长了还是变短了。"));
  els.phaseSlider.addEventListener("input", () => updateState("phase", parseFloat(els.phaseSlider.value), "观察 φ，先看整条曲线在左右移动。"));
  els.offsetSlider.addEventListener("input", () => updateState("offset", parseFloat(els.offsetSlider.value), "观察 d，先看整条曲线的中线有没有上下移动。"));
}

function updateState(key, value, message) {
  state[key] = value;
  state.sampleIndex = -1;
  setMessage(message);
  syncControls();
  updateSampleActive();
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
      state.amplitude = sample.amplitude;
      state.omega = sample.omega;
      state.phase = sample.phase;
      state.offset = sample.offset;
      setMessage(sample.note);
      syncControls();
      updateSampleActive();
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
  els.amplitudeSlider.value = state.amplitude;
  els.omegaSlider.value = state.omega;
  els.phaseSlider.value = state.phase;
  els.offsetSlider.value = state.offset;
  els.amplitudeValue.textContent = state.amplitude.toFixed(2);
  els.omegaValue.textContent = state.omega.toFixed(2);
  els.phaseValue.textContent = formatPiText(state.phase);
  els.offsetValue.textContent = state.offset.toFixed(2);
  els.equationDisplay.textContent = `y = ${state.amplitude.toFixed(2)}sin(${state.omega.toFixed(2)}x ${phaseToInnerText(state.phase)}) ${formatSignedNumber(state.offset)}`;
}

function formatPiText(value) {
  return `${(value / Math.PI).toFixed(2)}π`;
}

function phaseToInnerText(value) {
  const ratio = value / Math.PI;
  const fixed = Math.abs(ratio) < 1e-8 ? "0.00π" : `${ratio >= 0 ? "+" : "-"}${Math.abs(ratio).toFixed(2)}π`;
  return fixed;
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
  drawStandardCurve(width, height);
  drawTransformedCurve(width, height);
  drawMidline(width, height);
  renderExplanation();
}

function drawGrid(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(83,104,216,0.12)";
  for (let x = 0; x <= width; x += width / 18) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y <= height; y += height / 18) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }
  ctx.restore();
}

function drawAxes(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(27,34,64,0.74)";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(width * 0.08, 0); ctx.lineTo(width * 0.08, height); ctx.stroke();
  ctx.restore();
}

function drawStandardCurve(width, height) {
  drawCurve({
    width,
    height,
    amplitude: 1,
    omega: 1,
    phase: 0,
    offset: 0,
    color: "rgba(99,107,138,0.78)",
    lineWidth: 3,
    label: "标准 sin(x)",
    labelX: width * 0.72,
    labelY: height * 0.16,
  });
}

function drawTransformedCurve(width, height) {
  drawCurve({
    width,
    height,
    amplitude: state.amplitude,
    omega: state.omega,
    phase: state.phase,
    offset: state.offset,
    color: "#5368d8",
    lineWidth: 4,
    label: "变化后图像",
    labelX: width * 0.72,
    labelY: height * 0.1,
  });
}

function drawCurve({ width, height, amplitude, omega, phase, offset, color, lineWidth, label, labelX, labelY }) {
  const left = width * 0.08;
  const graphWidth = width * 0.86;
  const scaleX = graphWidth / (Math.PI * 4);
  const scaleY = height / 8;
  ctx.save();
  ctx.beginPath();
  for (let px = 0; px <= graphWidth; px += 3) {
    const x = px / scaleX;
    const y = sineValue(amplitude, omega, phase, offset, x);
    const drawX = left + px;
    const drawY = height / 2 - y * scaleY;
    if (px === 0) ctx.moveTo(drawX, drawY);
    else ctx.lineTo(drawX, drawY);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText(label, labelX, labelY);
  ctx.restore();
}

function drawMidline(width, height) {
  const scaleY = height / 8;
  const midlineY = height / 2 - state.offset * scaleY;
  ctx.save();
  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = "rgba(255,159,104,0.85)";
  ctx.beginPath();
  ctx.moveTo(width * 0.08, midlineY);
  ctx.lineTo(width * 0.94, midlineY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(255,159,104,0.95)";
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText(`中线 y = ${state.offset.toFixed(2)}`, width * 0.1, midlineY - 10);
  ctx.restore();
}

function renderExplanation() {
  const features = sineTransformFeatures(state.amplitude, state.omega, state.phase, state.offset);
  renderTeachingPanel(features);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前模型</span>
      <strong>${els.equationDisplay.textContent}</strong>
      <p>把每个参数拆开看，就不会把三角函数变化混成一团。</p>
    </div>
    <div class="info-card">
      <span class="info-label">关键性质</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>振幅：${features.amplitude.toFixed(2)}</strong>
          <span>A 决定波峰和波谷离中线有多远。</span>
        </div>
        <div class="metric-item">
          <strong>周期：${features.period.toFixed(2)}</strong>
          <span>|ω| 越大，周期越短；|ω| 越小，周期越长。</span>
        </div>
        <div class="metric-item">
          <strong>相位平移：${formatPiText(features.phaseShift)}</strong>
          <span>整条曲线会整体左右平移，不会改变波峰波谷的高度。</span>
        </div>
        <div class="metric-item">
          <strong>值域：${features.range[0].toFixed(2)} 到 ${features.range[1].toFixed(2)}</strong>
          <span>d 决定中线位置，也会带着整个值域一起上下移动。</span>
        </div>
      </div>
    </div>
    <div class="info-card tip-card">
      <span class="info-label">给孩子的解释</span>
      <strong>${buildStudentSummary(features)}</strong>
      <p>建议每次只动一个参数，先说出“会发生什么”，再去看图像有没有印证。</p>
    </div>
  `;
}

function renderTeachingPanel(features) {
  const chips = [
    `周期 ${features.period.toFixed(2)}`,
    `中线 y = ${features.verticalShift.toFixed(2)}`,
    features.openingTrend,
  ];
  els.teachingPanel.innerHTML = `
    <div class="teaching-card">
      <span class="teaching-title">先抓哪一件事</span>
      <strong class="teaching-value">${primaryObservation(features)}</strong>
      <div class="badge-row">
        ${chips.map((item) => `<span class="teaching-chip">${item}</span>`).join("")}
      </div>
    </div>
    <div class="teaching-card">
      <span class="teaching-title">速读提示</span>
      <p class="teaching-text">${buildStudentSummary(features)}</p>
    </div>
  `;
}

function primaryObservation(features) {
  if (Math.abs(features.signedAmplitude) !== 1) return "先看振幅是不是变了";
  if (Math.abs(features.omega) !== 1) return "先看周期是不是变了";
  if (Math.abs(features.phaseShift) > 1e-8) return "先看整条曲线有没有左右平移";
  if (Math.abs(features.verticalShift) > 1e-8) return "先看整条曲线有没有上下平移";
  return "先把标准 sin(x) 的样子记牢";
}

function buildStudentSummary(features) {
  if (Math.abs(features.signedAmplitude) !== 1) {
    return `现在最明显的是振幅变化，波峰波谷离中线的距离变成了 ${features.amplitude.toFixed(2)}。`;
  }
  if (Math.abs(features.omega) !== 1) {
    return `现在最明显的是周期变化，一个完整周期变成了 ${features.period.toFixed(2)}。`;
  }
  if (Math.abs(features.phaseShift) > 1e-8) {
    return `现在最明显的是左右平移，整条曲线平移了 ${formatPiText(features.phaseShift)}。`;
  }
  if (Math.abs(features.verticalShift) > 1e-8) {
    return `现在最明显的是上下平移，中线已经移动到 y = ${features.verticalShift.toFixed(2)}。`;
  }
  return "现在就是标准 sin(x)，后面所有变化都可以拿它来做对照。";
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
