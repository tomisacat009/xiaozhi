import {
  formatSignedNumber,
  linearFeatures,
  linearTeachingNotes,
  linearValue,
} from "../../assets/math-viz-core.mjs";

const samples = [
  { name: "基础上升", k: 1, b: 0, note: "斜率是正数，所以直线从左下往右上走。" },
  { name: "更陡上升", k: 2.2, b: 0, note: "|k| 变大以后，直线会更陡。" },
  { name: "下降直线", k: -1.6, b: 3, note: "斜率变成负数以后，直线就开始下降。" },
  { name: "截距上移", k: 0.6, b: 4, note: "b 变化时，整条直线会整体上移或下移。" },
];

const state = {
  k: 1,
  b: 0,
  animation: { frameId: null, timerId: null, playing: false, index: 0, duration: 1000 },
};

let canvas;
let ctx;
let els = {};

function init() {
  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");
  els = {
    slopeSlider: document.getElementById("slopeSlider"),
    interceptSlider: document.getElementById("interceptSlider"),
    slopeValue: document.getElementById("slopeValue"),
    interceptValue: document.getElementById("interceptValue"),
    equationDisplay: document.getElementById("equationDisplay"),
    sampleStrip: document.getElementById("sampleStrip"),
    playButton: document.getElementById("playButton"),
    pauseButton: document.getElementById("pauseButton"),
    resetButton: document.getElementById("resetButton"),
    teachingPanel: document.getElementById("teachingPanel"),
    explanationPanel: document.getElementById("explanationPanel"),
    messageBox: document.getElementById("messageBox"),
  };
  resizeCanvas();
  renderSamples();
  bindEvents();
  syncControls();
  render();
  window.addEventListener("resize", resizeCanvas);
}

function bindEvents() {
  els.slopeSlider.addEventListener("input", () => {
    pauseAnimation();
    state.k = parseFloat(els.slopeSlider.value);
    syncControls();
    setMessage("观察 k 的正负和大小，直线的方向和陡缓会一起变。");
    render();
  });
  els.interceptSlider.addEventListener("input", () => {
    pauseAnimation();
    state.b = parseFloat(els.interceptSlider.value);
    syncControls();
    setMessage("观察 b 的变化，直线会整体上移或下移。");
    render();
  });
  els.playButton.addEventListener("click", playSamples);
  els.pauseButton.addEventListener("click", pauseAnimation);
  els.resetButton.addEventListener("click", () => animateTo({ k: 1, b: 0 }, "已经回到最基础的一次函数。"));
}

function renderSamples() {
  els.sampleStrip.innerHTML = samples
    .map((sample, index) => `<button class="sample-chip ${index === 0 ? "is-active" : ""}" data-index="${index}">${sample.name}</button>`)
    .join("");
  els.sampleStrip.querySelectorAll(".sample-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      state.animation.index = index;
      updateSampleActive();
      animateTo(samples[index], samples[index].note);
    });
  });
}

function playSamples() {
  if (state.animation.playing) return;
  state.animation.playing = true;
  setMessage("自动演示开始了，重点看斜率和截距是怎样分别影响图像的。");
  runNextSample();
}

function runNextSample() {
  if (!state.animation.playing) return;
  const sample = samples[state.animation.index];
  updateSampleActive();
  animateTo(sample, sample.note, () => {
    if (!state.animation.playing) return;
    state.animation.timerId = setTimeout(() => {
      state.animation.index = (state.animation.index + 1) % samples.length;
      runNextSample();
    }, 900);
  });
}

function pauseAnimation() {
  state.animation.playing = false;
  if (state.animation.frameId) cancelAnimationFrame(state.animation.frameId);
  if (state.animation.timerId) clearTimeout(state.animation.timerId);
  state.animation.frameId = null;
  state.animation.timerId = null;
}

function animateTo(target, message, done) {
  pauseAnimation();
  const start = { k: state.k, b: state.b };
  const end = { k: target.k, b: target.b };
  const startTime = performance.now();

  const step = (now) => {
    const t = Math.min((now - startTime) / state.animation.duration, 1);
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    state.k = start.k + (end.k - start.k) * eased;
    state.b = start.b + (end.b - start.b) * eased;
    syncControls();
    render();
    if (t < 1) {
      state.animation.frameId = requestAnimationFrame(step);
    } else {
      state.animation.frameId = null;
      setMessage(message);
      if (done) done();
    }
  };
  state.animation.frameId = requestAnimationFrame(step);
}

function updateSampleActive() {
  els.sampleStrip.querySelectorAll(".sample-chip").forEach((button, index) => {
    button.classList.toggle("is-active", index === state.animation.index);
  });
}

function syncControls() {
  els.slopeSlider.value = state.k;
  els.interceptSlider.value = state.b;
  els.slopeValue.textContent = formatSignedNumber(state.k);
  els.interceptValue.textContent = formatSignedNumber(state.b);
  els.equationDisplay.textContent = `y = ${formatSignedNumber(state.k)}x ${formatSignedNumber(state.b)}`;
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
  drawLine(width);
  drawIntercepts();
  renderExplanation();
}

function drawGrid(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(29,111,165,0.15)";
  for (let x = 0; x <= width; x += width / 20) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y <= height; y += height / 20) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }
  ctx.restore();
}

function drawAxes(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(22,50,79,0.74)";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height); ctx.stroke();
  ctx.restore();
}

function drawLine(width) {
  const points = [];
  for (let px = 0; px <= width; px += 4) {
    const x = (px - width / 2) / 40;
    const y = linearValue(state.k, state.b, x);
    points.push({ x: px, y: canvas.clientHeight / 2 - y * 40 });
  }
  ctx.save();
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.strokeStyle = "#1d6fa5";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();
}

function drawIntercepts() {
  const features = linearFeatures(state.k, state.b);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  drawMarker(width / 2, height / 2 - features.yIntercept * 40, "#ff7a59", "y轴交点");
  if (features.xIntercept !== null) {
    drawMarker(width / 2 + features.xIntercept * 40, height / 2, "#16324f", "x轴交点");
  }
}

function drawMarker(x, y, color, label) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(22,50,79,0.9)";
  ctx.font = '12px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText(label, x + 10, y - 10);
  ctx.restore();
}

function renderExplanation() {
  const features = linearFeatures(state.k, state.b);
  const notes = linearTeachingNotes(state.k, state.b);
  renderTeachingPanel(notes);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前函数</span>
      <strong>${els.equationDisplay.textContent}</strong>
      <p>一次函数最值得先盯住两个参数：斜率 k 和截距 b。</p>
    </div>
    <div class="info-card">
      <span class="info-label">关键性质</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>变化趋势：${features.trend}</strong>
          <span>${state.k > 0 ? "从左下向右上" : state.k < 0 ? "从左上向右下" : "与 x 轴平行"}</span>
        </div>
        <div class="metric-item">
          <strong>倾斜程度：${features.steepness}</strong>
          <span>|k| 越大，直线越陡；|k| 越小，直线越平。</span>
        </div>
        <div class="metric-item">
          <strong>y 轴交点：${formatSignedNumber(features.yIntercept)}</strong>
          <span>b 决定直线和 y 轴在什么位置相交。</span>
        </div>
        <div class="metric-item">
          <strong>函数类型：${notes.relationType}</strong>
          <span>${notes.passesOrigin ? "这条直线经过原点。" : "这条直线不经过原点。"}</span>
        </div>
      </div>
    </div>
    <div class="info-card tip-card">
      <span class="info-label">给孩子的解释</span>
      <strong>${notes.studentSummary}</strong>
      <p>先别急着算题，先把“k 管倾斜，b 管上下平移”这句话真正看懂。</p>
    </div>
  `;
}

function renderTeachingPanel(notes) {
  els.teachingPanel.innerHTML = `
    <div class="teaching-card">
      <span class="teaching-title">当前识别</span>
      <strong class="teaching-value">${notes.relationType}</strong>
      <div class="badge-row">
        ${notes.specialCases.map((item) => `<span class="teaching-chip">${item}</span>`).join("")}
      </div>
    </div>
    <div class="teaching-card">
      <span class="teaching-title">速读提示</span>
      <p class="teaching-text">${notes.studentSummary}</p>
    </div>
  `;
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
