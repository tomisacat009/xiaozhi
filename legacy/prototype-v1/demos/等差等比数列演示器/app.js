import {
  arithmeticSequenceValue,
  geometricSequenceValue,
  sequenceComparisonFeatures,
  sequenceTerms,
} from "../../assets/math-viz-core.mjs";

const samples = [
  { name: "稳步增加", a1: 2, d: 2, q: 1.2, count: 8, note: "先看等差数列稳定增加，再看等比数列前期可能没那么明显。" },
  { name: "倍增拉开", a1: 2, d: 2, q: 2, count: 8, note: "当公比大于 1 且比较大时，后面几项会很快拉开差距。" },
  { name: "等比衰减", a1: 4, d: 1, q: 0.6, count: 8, note: "当 0 < q < 1 时，等比数列会逐项变小，但等差数列还会继续线性增长。" },
  { name: "等差递减", a1: 8, d: -1, q: 1.3, count: 8, note: "公差为负时，等差数列会线性下降；等比数列仍可能继续增长。" },
];

const state = {
  a1: 2,
  d: 2,
  q: 1.5,
  count: 8,
  sampleIndex: 0,
};

let canvas;
let ctx;
let els = {};

function init() {
  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");
  els = {
    firstTermSlider: document.getElementById("firstTermSlider"),
    differenceSlider: document.getElementById("differenceSlider"),
    ratioSlider: document.getElementById("ratioSlider"),
    countSlider: document.getElementById("countSlider"),
    firstTermValue: document.getElementById("firstTermValue"),
    differenceValue: document.getElementById("differenceValue"),
    ratioValue: document.getElementById("ratioValue"),
    countValue: document.getElementById("countValue"),
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
  els.firstTermSlider.addEventListener("input", () => updateState("a1", parseFloat(els.firstTermSlider.value), "先固定增长方式，只观察首项变大后整串数列怎样整体抬高。"));
  els.differenceSlider.addEventListener("input", () => updateState("d", parseFloat(els.differenceSlider.value), "现在重点看公差 d，它决定等差数列每一步加多少。"));
  els.ratioSlider.addEventListener("input", () => updateState("q", parseFloat(els.ratioSlider.value), "现在重点看公比 q，它决定等比数列每一步乘多少。"));
  els.countSlider.addEventListener("input", () => updateState("count", parseInt(els.countSlider.value, 10), "把项数往后拖，你会更容易看出线性增长和指数增长谁拉得更快。"));
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
      const index = Number(button.dataset.index);
      const sample = samples[index];
      state.sampleIndex = index;
      state.a1 = sample.a1;
      state.d = sample.d;
      state.q = sample.q;
      state.count = sample.count;
      syncControls();
      updateSampleActive();
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
  els.firstTermSlider.value = state.a1;
  els.differenceSlider.value = state.d;
  els.ratioSlider.value = state.q;
  els.countSlider.value = state.count;
  els.firstTermValue.textContent = state.a1.toFixed(2);
  els.differenceValue.textContent = state.d.toFixed(2);
  els.ratioValue.textContent = state.q.toFixed(2);
  els.countValue.textContent = String(state.count);
  els.equationDisplay.textContent = `a1 = ${state.a1.toFixed(2)}, d = ${state.d.toFixed(2)}, q = ${state.q.toFixed(2)}`;
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
  const features = sequenceComparisonFeatures(state.a1, state.d, state.q, state.count);
  drawGrid(width, height);
  drawAxes(width, height, features.terms);
  drawSeries(width, height, features.terms.arithmetic, "#3b8f59", "等差数列");
  drawSeries(width, height, features.terms.geometric, "#f08b4b", "等比数列");
  renderExplanation(features);
}

function drawGrid(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(91,140,75,0.1)";
  for (let x = 0; x <= width; x += width / 18) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y <= height; y += height / 18) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }
  ctx.restore();
}

function getScaleBounds(terms) {
  const values = [...terms.arithmetic, ...terms.geometric, 0];
  const max = Math.max(...values);
  const min = Math.min(...values);
  return { min, max, span: Math.max(max - min, 1) };
}

function drawAxes(width, height, terms) {
  const bounds = getScaleBounds(terms);
  const zeroY = height - ((0 - bounds.min) / bounds.span) * (height * 0.76) - height * 0.12;
  ctx.save();
  ctx.strokeStyle = "rgba(36,49,40,0.76)";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(width * 0.08, zeroY); ctx.lineTo(width * 0.94, zeroY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(width * 0.08, height * 0.1); ctx.lineTo(width * 0.08, height * 0.88); ctx.stroke();
  ctx.fillStyle = "rgba(36,49,40,0.88)";
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  for (let i = 1; i <= state.count; i += 1) {
    const x = getPointX(width, i);
    ctx.fillText(String(i), x - 4, zeroY + 22);
  }
  ctx.restore();
}

function getPointX(width, index) {
  return width * 0.1 + ((index - 1) / Math.max(state.count - 1, 1)) * (width * 0.8);
}

function getPointY(height, value, bounds) {
  return height - ((value - bounds.min) / bounds.span) * (height * 0.76) - height * 0.12;
}

function drawSeries(width, height, values, color, label) {
  const bounds = getScaleBounds({
    arithmetic: sequenceTerms(state.a1, state.d, state.q, state.count).arithmetic,
    geometric: sequenceTerms(state.a1, state.d, state.q, state.count).geometric,
  });
  ctx.save();
  ctx.beginPath();
  values.forEach((value, index) => {
    const x = getPointX(width, index + 1);
    const y = getPointY(height, value, bounds);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.stroke();
  values.forEach((value, index) => {
    const x = getPointX(width, index + 1);
    const y = getPointY(height, value, bounds);
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
    if (index === values.length - 1 || index < 2) {
      ctx.fillText(value.toFixed(1), x + 8, y - 10);
    }
  });
  ctx.fillStyle = color;
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText(label, width * 0.74, label === "等差数列" ? height * 0.12 : height * 0.17);
  ctx.restore();
}

function renderExplanation(features) {
  renderTeachingPanel(features);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前模型</span>
      <strong>等差：a_n = ${state.a1.toFixed(2)} + (n-1)×${state.d.toFixed(2)}</strong>
      <p>等差数列是每一步加同样多，等比数列是每一步乘同样倍数。</p>
    </div>
    <div class="info-card">
      <span class="info-label">关键性质</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>等差数列：${features.arithmeticStyle}</strong>
          <span>公差 d 固定，所以相邻两项的差始终相同。</span>
        </div>
        <div class="metric-item">
          <strong>等比数列：${features.geometricStyle}</strong>
          <span>公比 q 固定，所以相邻两项的倍数关系始终相同。</span>
        </div>
        <div class="metric-item">
          <strong>第 ${state.count} 项对比</strong>
          <span>等差数列到 ${features.arithmeticLast.toFixed(2)}，等比数列到 ${features.geometricLast.toFixed(2)}。</span>
        </div>
        <div class="metric-item">
          <strong>观察重点</strong>
          <span>等差看“每一步差多少”，等比看“每一步乘多少”。</span>
        </div>
      </div>
    </div>
    <div class="info-card tip-card">
      <span class="info-label">给孩子的解释</span>
      <strong>${buildStudentSummary(features)}</strong>
      <p>建议先盯住后几项，因为线性增长和指数增长的差距通常会在后面被明显拉开。</p>
    </div>
  `;
}

function renderTeachingPanel(features) {
  const chips = [
    `第 ${state.count} 项`,
    `等差 ${features.arithmeticLast.toFixed(1)}`,
    `等比 ${features.geometricLast.toFixed(1)}`,
  ];
  els.teachingPanel.innerHTML = `
    <div class="teaching-card">
      <span class="teaching-title">先抓差别</span>
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
  if (features.geometricStyle === "倍增增长" && features.geometricLast > features.arithmeticLast) {
    return "等比数列在后面拉开得更快";
  }
  if (features.geometricStyle === "指数衰减") {
    return "等比数列在逐项缩小";
  }
  if (features.arithmeticStyle === "线性递减") {
    return "等差数列在稳定下降";
  }
  return "等差看固定差，等比看固定倍";
}

function buildStudentSummary(features) {
  if (features.geometricStyle === "倍增增长" && features.geometricLast > features.arithmeticLast * 1.2) {
    return "现在最明显的是等比数列后面抬得更快，因为它每次都在乘同样倍数。";
  }
  if (features.geometricStyle === "指数衰减") {
    return "现在公比小于 1，所以等比数列会越来越小，而不是越来越大。";
  }
  if (features.arithmeticStyle === "线性递减") {
    return "现在公差是负数，所以等差数列会每次减同样多，形成稳定下降。";
  }
  return "现在两条数列都在增长，但等差是均匀往上走，等比会越到后面越容易拉开差距。";
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
