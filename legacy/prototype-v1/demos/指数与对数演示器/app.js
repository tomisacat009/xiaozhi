import {
  expLogFeatures,
  exponentialValue,
  logarithmValue,
} from "../../assets/math-viz-core.mjs";

const samples = [
  { name: "标准增长", base: 2, note: "先看 a > 1 的情形，指数和对数都会随着 x 增大而增大。" },
  { name: "增长更快", base: 3, note: "底数更大以后，指数函数会抬头更快，对数函数会变得更平。"},
  { name: "缓慢增长", base: 1.4, note: "当底数只比 1 大一点时，指数增长会变慢。"},
  { name: "指数衰减", base: 0.5, note: "当 0 < a < 1 时，指数函数会衰减，对数函数也会变成下降。"},
  { name: "更快衰减", base: 0.3, note: "底数越接近 0，指数衰减越快。"},
];

const state = {
  base: 2,
  sampleIndex: 0,
};

let canvas;
let ctx;
let els = {};

function init() {
  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");
  els = {
    baseSlider: document.getElementById("baseSlider"),
    baseValue: document.getElementById("baseValue"),
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
  els.baseSlider.addEventListener("input", () => {
    state.base = normalizeBase(parseFloat(els.baseSlider.value), state.base);
    state.sampleIndex = -1;
    updateSampleActive();
    syncControls();
    setMessage("先看 a 在 1 的哪一侧，再判断指数和对数是增长还是衰减。");
    render();
  });
}

function normalizeBase(value, previous) {
  if (Math.abs(value - 1) < 0.06) {
    return previous > 1 ? 1.1 : 0.9;
  }
  return value;
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
      state.base = sample.base;
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
  els.baseSlider.value = state.base;
  els.baseValue.textContent = state.base.toFixed(2);
  els.equationDisplay.textContent = `a = ${state.base.toFixed(2)}`;
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
  drawMirrorLine(width, height);
  drawExponential(width, height);
  drawLogarithm(width, height);
  renderExplanation();
}

function drawGrid(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(47,157,143,0.1)";
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
  ctx.strokeStyle = "rgba(43,38,53,0.76)";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height); ctx.stroke();
  ctx.restore();
}

function worldToCanvas(width, height, x, y) {
  const scale = 58;
  return {
    x: width / 2 + x * scale,
    y: height / 2 - y * scale,
  };
}

function drawMirrorLine(width, height) {
  ctx.save();
  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = "rgba(47,157,143,0.78)";
  const start = worldToCanvas(width, height, -4, -4);
  const end = worldToCanvas(width, height, 4, 4);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(47,157,143,0.9)";
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText("y = x", end.x - 34, end.y - 10);
  ctx.restore();
}

function drawExponential(width, height) {
  ctx.save();
  ctx.beginPath();
  let started = false;
  for (let x = -4; x <= 4; x += 0.03) {
    const y = exponentialValue(state.base, x);
    if (!Number.isFinite(y) || y > 6 || y < -6) continue;
    const point = worldToCanvas(width, height, x, y);
    if (!started) {
      ctx.moveTo(point.x, point.y);
      started = true;
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }
  ctx.strokeStyle = "#3667c8";
  ctx.lineWidth = 4;
  ctx.stroke();
  const anchor = worldToCanvas(width, height, 0, 1);
  ctx.fillStyle = "#3667c8";
  ctx.beginPath(); ctx.arc(anchor.x, anchor.y, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillText("(0,1)", anchor.x + 10, anchor.y - 10);
  ctx.restore();
}

function drawLogarithm(width, height) {
  ctx.save();
  ctx.beginPath();
  let started = false;
  for (let x = 0.05; x <= 6; x += 0.03) {
    const y = logarithmValue(state.base, x);
    if (!Number.isFinite(y) || y > 6 || y < -6) continue;
    const point = worldToCanvas(width, height, x, y);
    if (!started) {
      ctx.moveTo(point.x, point.y);
      started = true;
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }
  ctx.strokeStyle = "#f08a4b";
  ctx.lineWidth = 4;
  ctx.stroke();
  const anchor = worldToCanvas(width, height, 1, 0);
  ctx.fillStyle = "#f08a4b";
  ctx.beginPath(); ctx.arc(anchor.x, anchor.y, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillText("(1,0)", anchor.x + 10, anchor.y - 10);
  ctx.restore();
}

function renderExplanation() {
  const features = expLogFeatures(state.base);
  renderTeachingPanel(features);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前模型</span>
      <strong>y = ${state.base.toFixed(2)}^x 和 y = log_${state.base.toFixed(2)} x</strong>
      <p>指数函数和对数函数不是孤立的两块内容，它们是一对互逆函数。</p>
    </div>
    <div class="info-card">
      <span class="info-label">关键性质</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>指数函数：${features.expTrend}</strong>
          <span>${features.expTrend === "增长" ? "a > 1 时，x 越大，a^x 越大。" : "0 < a < 1 时，x 越大，a^x 反而越小。"}</span>
        </div>
        <div class="metric-item">
          <strong>对数函数：${features.logTrend}</strong>
          <span>${features.logTrend === "增长" ? "a > 1 时，log_a x 随 x 增大而增大。" : "0 < a < 1 时，log_a x 随 x 增大而减小。"}</span>
        </div>
        <div class="metric-item">
          <strong>固定点：(0,1) 与 (1,0)</strong>
          <span>指数函数一定过 (0,1)，对数函数一定过 (1,0)。</span>
        </div>
        <div class="metric-item">
          <strong>互逆关系</strong>
          <span>${features.inverseHint}，所以一条曲线上的点交换横纵坐标，会落到另一条曲线上。</span>
        </div>
      </div>
    </div>
    <div class="info-card tip-card">
      <span class="info-label">给孩子的解释</span>
      <strong>${buildStudentSummary(features)}</strong>
      <p>建议先只记 3 句话：看 a 在不在 1 的右边、指数过 (0,1)、对数过 (1,0)。</p>
    </div>
  `;
}

function renderTeachingPanel(features) {
  const chips = [
    features.expTrend === "增长" ? "a > 1" : "0 < a < 1",
    "指数过 (0,1)",
    "对数过 (1,0)",
  ];
  els.teachingPanel.innerHTML = `
    <div class="teaching-card">
      <span class="teaching-title">先抓结论</span>
      <strong class="teaching-value">${features.inverseHint}</strong>
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

function buildStudentSummary(features) {
  if (features.expTrend === "增长") {
    if (state.base >= 2.5) return "现在底数比较大，指数函数会抬头更快，而对数函数会更平缓。";
    if (state.base <= 1.5) return "现在底数虽然大于 1，但离 1 很近，所以增长会显得更慢。";
    return "现在 a > 1，所以指数和对数都会增长，只是快慢方式不一样。";
  }
  if (state.base <= 0.4) return "现在底数很小，指数衰减会更快，而对数函数会更陡地下降。";
  return "现在 0 < a < 1，所以指数函数会衰减，对数函数也会变成下降。";
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
