import { lineCircleRelation } from "../../assets/math-viz-core.mjs";

const samples = [
  { name: "标准相交", k: 0.5, b: 0, cx: 0, cy: 0, r: 3, note: "先看相交，直线会穿过圆，出现两个交点。" },
  { name: "水平相切", k: 0, b: 3, cx: 0, cy: 0, r: 3, note: "当直线离圆心的距离刚好等于半径时，就会相切。" },
  { name: "整体相离", k: 0, b: 4.2, cx: 0, cy: 0, r: 3, note: "当直线离圆心比半径还远时，就不会碰到圆。" },
  { name: "偏心圆", k: -0.6, b: 1.5, cx: 1.5, cy: -0.8, r: 2.4, note: "把圆心挪开以后，方程和图形的关系会更直观地显出来。" },
];

const state = {
  k: 0.5,
  b: 0,
  cx: 0,
  cy: 0,
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
    slopeSlider: document.getElementById("slopeSlider"),
    interceptSlider: document.getElementById("interceptSlider"),
    centerXSlider: document.getElementById("centerXSlider"),
    centerYSlider: document.getElementById("centerYSlider"),
    radiusSlider: document.getElementById("radiusSlider"),
    slopeValue: document.getElementById("slopeValue"),
    interceptValue: document.getElementById("interceptValue"),
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
  bindSlider("slopeSlider", "k", "现在先看直线方向怎么变，再观察交点位置会不会跟着改变。");
  bindSlider("interceptSlider", "b", "现在先看直线上下平移，最容易看到相交、相切、相离的切换。");
  bindSlider("centerXSlider", "cx", "现在先看圆心左右移动，方程中的圆心坐标会直接变成图上的位置变化。");
  bindSlider("centerYSlider", "cy", "现在先看圆心上下移动，再对照直线和圆的相对位置。");
  bindSlider("radiusSlider", "r", "现在先看半径变大或变小，圆和直线的接触情况会最直接地变化。");
}

function bindSlider(id, key, message) {
  els[id].addEventListener("input", () => {
    state[key] = parseFloat(els[id].value);
    state.sampleIndex = -1;
    updateSampleActive();
    syncControls();
    setMessage(message);
    render();
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
      state.k = sample.k;
      state.b = sample.b;
      state.cx = sample.cx;
      state.cy = sample.cy;
      state.r = sample.r;
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
  els.slopeSlider.value = state.k;
  els.interceptSlider.value = state.b;
  els.centerXSlider.value = state.cx;
  els.centerYSlider.value = state.cy;
  els.radiusSlider.value = state.r;
  els.slopeValue.textContent = state.k.toFixed(2);
  els.interceptValue.textContent = state.b.toFixed(2);
  els.centerXValue.textContent = state.cx.toFixed(2);
  els.centerYValue.textContent = state.cy.toFixed(2);
  els.radiusValue.textContent = state.r.toFixed(2);
  els.equationDisplay.textContent = `y = ${state.k.toFixed(2)}x + ${state.b.toFixed(2)}, C(${state.cx.toFixed(2)}, ${state.cy.toFixed(2)}), r = ${state.r.toFixed(2)}`;
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
  const relation = lineCircleRelation(state.k, state.b, state.cx, state.cy, state.r);
  ctx.clearRect(0, 0, width, height);
  drawGrid(width, height);
  drawAxes(width, height);
  drawCircle(width, height);
  drawLine(width, height);
  drawPoints(width, height, relation.points);
  renderExplanation(relation);
}

function worldToCanvas(width, height, x, y) {
  const scale = 52;
  return {
    x: width / 2 + x * scale,
    y: height / 2 - y * scale,
  };
}

function drawGrid(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(107,92,165,0.1)";
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
  ctx.strokeStyle = "rgba(45,36,64,0.76)";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height); ctx.stroke();
  ctx.restore();
}

function drawCircle(width, height) {
  const center = worldToCanvas(width, height, state.cx, state.cy);
  ctx.save();
  ctx.strokeStyle = "#8b5cf6";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(center.x, center.y, state.r * 52, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#8b5cf6";
  ctx.beginPath(); ctx.arc(center.x, center.y, 5, 0, Math.PI * 2); ctx.fill();
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText(`C(${state.cx.toFixed(1)}, ${state.cy.toFixed(1)})`, center.x + 10, center.y - 10);
  ctx.restore();
}

function drawLine(width, height) {
  const leftX = -width / 104;
  const rightX = width / 104;
  const left = worldToCanvas(width, height, leftX, state.k * leftX + state.b);
  const right = worldToCanvas(width, height, rightX, state.k * rightX + state.b);
  ctx.save();
  ctx.strokeStyle = "#4e78c8";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(left.x, left.y);
  ctx.lineTo(right.x, right.y);
  ctx.stroke();
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillStyle = "#4e78c8";
  ctx.fillText(`y = ${state.k.toFixed(1)}x + ${state.b.toFixed(1)}`, width * 0.68, height * 0.12);
  ctx.restore();
}

function drawPoints(width, height, points) {
  ctx.save();
  ctx.fillStyle = "#f08a4b";
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  points.forEach((point, index) => {
    const draw = worldToCanvas(width, height, point.x, point.y);
    ctx.beginPath(); ctx.arc(draw.x, draw.y, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillText(`P${index + 1}(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`, draw.x + 10, draw.y - 10);
  });
  ctx.restore();
}

function renderExplanation(relation) {
  renderTeachingPanel(relation);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前关系</span>
      <strong>${relation.relation}</strong>
      <p>这块内容最适合把“方程条件”重新翻译成“图形距离关系”。</p>
    </div>
    <div class="info-card">
      <span class="info-label">关键性质</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>圆心到直线距离：${relation.distance.toFixed(2)}</strong>
          <span>拿这个距离和半径 ${state.r.toFixed(2)} 比，就能判断相交、相切还是相离。</span>
        </div>
        <div class="metric-item">
          <strong>交点个数：${relation.intersectionCount}</strong>
          <span>${relation.intersectionCount === 2 ? "有两个交点，所以是相交。" : relation.intersectionCount === 1 ? "只有一个接触点，所以是相切。" : "没有公共点，所以是相离。"}</span>
        </div>
        <div class="metric-item">
          <strong>判定核心</strong>
          <span>距离小于半径是相交，等于半径是相切，大于半径是相离。</span>
        </div>
      </div>
    </div>
    <div class="info-card tip-card">
      <span class="info-label">给孩子的解释</span>
      <strong>${buildStudentSummary(relation)}</strong>
      <p>建议先盯住“圆心到直线的距离”，比先盯公式更容易把这类题讲明白。</p>
    </div>
  `;
}

function renderTeachingPanel(relation) {
  const chips = [
    `距离 ${relation.distance.toFixed(2)}`,
    `半径 ${state.r.toFixed(2)}`,
    `${relation.intersectionCount} 个公共点`,
  ];
  els.teachingPanel.innerHTML = `
    <div class="teaching-card">
      <span class="teaching-title">先抓结论</span>
      <strong class="teaching-value">${relation.relation}</strong>
      <div class="badge-row">
        ${chips.map((item) => `<span class="teaching-chip">${item}</span>`).join("")}
      </div>
    </div>
    <div class="teaching-card">
      <span class="teaching-title">速读提示</span>
      <p class="teaching-text">${buildStudentSummary(relation)}</p>
    </div>
  `;
}

function buildStudentSummary(relation) {
  if (relation.relation === "相交") return "现在直线穿过圆，所以你会看到两个交点，说明圆心到直线的距离比半径更短。";
  if (relation.relation === "相切") return "现在直线刚好碰到圆，只有一个接触点，说明圆心到直线的距离正好等于半径。";
  return "现在直线没有碰到圆，说明圆心到直线的距离已经大于半径。";
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
