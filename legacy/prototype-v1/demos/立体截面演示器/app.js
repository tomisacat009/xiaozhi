import { solidSectionFeatures } from "../../assets/math-viz-core.mjs";

const solids = [
  { id: "prism", label: "四棱柱", note: "先看棱柱，截面始终和底面一样大。" },
  { id: "pyramid", label: "四棱锥", note: "再看棱锥，越往上切，截面会越小。" },
  { id: "cylinder", label: "圆柱", note: "圆柱和平行底面的截面始终是同样大小的圆。" },
  { id: "cone", label: "圆锥", note: "圆锥越往上切，截面的圆会越小，直到顶点消失。" },
];

const state = {
  solidType: "prism",
  size: 4,
  height: 6,
  sliceRatio: 0.3,
};

let canvas;
let ctx;
let els = {};

function init() {
  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");
  els = {
    sizeSlider: document.getElementById("sizeSlider"),
    heightSlider: document.getElementById("heightSlider"),
    sliceSlider: document.getElementById("sliceSlider"),
    sizeValue: document.getElementById("sizeValue"),
    heightValue: document.getElementById("heightValue"),
    sliceValue: document.getElementById("sliceValue"),
    equationDisplay: document.getElementById("equationDisplay"),
    sampleStrip: document.getElementById("sampleStrip"),
    teachingPanel: document.getElementById("teachingPanel"),
    explanationPanel: document.getElementById("explanationPanel"),
    messageBox: document.getElementById("messageBox"),
  };
  renderSolidButtons();
  bindEvents();
  resizeCanvas();
  syncControls();
  render();
  window.addEventListener("resize", resizeCanvas);
}

function bindEvents() {
  els.sizeSlider.addEventListener("input", () => updateState("size", parseFloat(els.sizeSlider.value), "现在先看底面尺寸或半径的变化，它会直接带动截面大小变化。"));
  els.heightSlider.addEventListener("input", () => updateState("height", parseFloat(els.heightSlider.value), "现在先看高 h 的变化，切面位置相同时，几何体在画面里的纵向比例会变化。"));
  els.sliceSlider.addEventListener("input", () => updateState("sliceRatio", parseFloat(els.sliceSlider.value), "现在先拖动截面位置，观察哪种几何体的截面会保持不变，哪种会慢慢缩小。"));
}

function updateState(key, value, message) {
  state[key] = value;
  syncControls();
  setMessage(message);
  render();
}

function renderSolidButtons() {
  els.sampleStrip.innerHTML = solids
    .map((item) => `<button class="sample-chip ${item.id === state.solidType ? "is-active" : ""}" data-solid="${item.id}">${item.label}</button>`)
    .join("");
  els.sampleStrip.querySelectorAll(".sample-chip").forEach((button) => {
    button.addEventListener("click", () => {
      state.solidType = button.dataset.solid;
      updateSolidActive();
      syncControls();
      setMessage(solids.find((item) => item.id === state.solidType).note);
      render();
    });
  });
}

function updateSolidActive() {
  els.sampleStrip.querySelectorAll(".sample-chip").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.solid === state.solidType);
  });
}

function syncControls() {
  els.sizeSlider.value = state.size;
  els.heightSlider.value = state.height;
  els.sliceSlider.value = state.sliceRatio;
  els.sizeValue.textContent = state.size.toFixed(2);
  els.heightValue.textContent = state.height.toFixed(2);
  els.sliceValue.textContent = state.sliceRatio.toFixed(2);
  const solidLabel = solids.find((item) => item.id === state.solidType).label;
  els.equationDisplay.textContent = `${solidLabel} · 底面尺寸 ${state.size.toFixed(2)} · 高 ${state.height.toFixed(2)} · 截面位置 ${state.sliceRatio.toFixed(2)}`;
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
  const features = solidSectionFeatures(state.solidType, state.size, state.height, state.sliceRatio);
  ctx.clearRect(0, 0, width, height);
  drawLayout(width, height);
  drawSolidScene(width, height, features);
  drawSectionPreview(width, height, features);
  renderExplanation(features);
}

function drawLayout(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(107,138,86,0.1)";
  for (let x = 0; x <= width; x += width / 18) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y <= height; y += height / 18) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }
  ctx.restore();
}

function drawSolidScene(width, height, features) {
  const left = width * 0.08;
  const top = height * 0.18;
  const solidHeight = height * 0.52;
  const baseWidth = width * 0.2;
  const depthX = width * 0.06;
  const depthY = height * 0.06;
  const sliceY = top + solidHeight * state.sliceRatio;

  if (state.solidType === "prism" || state.solidType === "pyramid") {
    const frontTop = { x: left, y: top };
    const frontBottom = { x: left, y: top + solidHeight };
    const frontRightTop = { x: left + baseWidth, y: top };
    const frontRightBottom = { x: left + baseWidth, y: top + solidHeight };
    const backTop = { x: left + depthX, y: top - depthY };
    const backBottom = { x: left + depthX, y: top + solidHeight - depthY };
    const backRightTop = { x: left + baseWidth + depthX, y: top - depthY };
    const backRightBottom = { x: left + baseWidth + depthX, y: top + solidHeight - depthY };

    ctx.save();
    ctx.strokeStyle = "#8f6f3b";
    ctx.lineWidth = 3;
    drawQuad(frontTop, frontRightTop, frontRightBottom, frontBottom);
    if (state.solidType === "prism") {
      drawQuad(backTop, backRightTop, backRightBottom, backBottom);
      connect(frontTop, backTop);
      connect(frontRightTop, backRightTop);
      connect(frontBottom, backBottom);
      connect(frontRightBottom, backRightBottom);
    } else {
      const apex = { x: left + baseWidth / 2 + depthX / 2, y: top - solidHeight * 0.4 };
      connect(frontTop, apex);
      connect(frontRightTop, apex);
      connect(frontBottom, apex);
      connect(frontRightBottom, apex);
    }
    ctx.restore();

    drawSlicePlaneRect(sliceY, top, solidHeight, baseWidth, depthX, depthY, features);
  } else {
    drawRoundSolid(left, top, baseWidth, solidHeight, depthY, features);
  }
}

function drawSlicePlaneRect(sliceY, top, solidHeight, baseWidth, depthX, depthY, features) {
  const scale = state.solidType === "prism" ? 1 : 1 - state.sliceRatio;
  const sectionWidth = baseWidth * scale;
  const x = canvas.clientWidth * 0.08 + (baseWidth - sectionWidth) / 2;
  const y = sliceY;
  ctx.save();
  ctx.fillStyle = "rgba(229,123,73,0.28)";
  ctx.strokeStyle = "#e57b49";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + sectionWidth, y);
  ctx.lineTo(x + sectionWidth + depthX, y - depthY);
  ctx.lineTo(x + depthX, y - depthY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawRoundSolid(left, top, baseWidth, solidHeight, depthY, features) {
  const centerX = left + baseWidth / 2;
  const radiusX = baseWidth / 2;
  const radiusY = depthY * 0.8;
  const bottomY = top + solidHeight;
  ctx.save();
  ctx.strokeStyle = "#8f6f3b";
  ctx.lineWidth = 3;
  if (state.solidType === "cylinder") {
    ellipse(centerX, top, radiusX, radiusY);
    ellipse(centerX, bottomY, radiusX, radiusY);
    connect({ x: centerX - radiusX, y: top }, { x: centerX - radiusX, y: bottomY });
    connect({ x: centerX + radiusX, y: top }, { x: centerX + radiusX, y: bottomY });
  } else {
    const apex = { x: centerX, y: top - solidHeight * 0.28 };
    ellipse(centerX, bottomY, radiusX, radiusY);
    connect({ x: centerX - radiusX, y: bottomY }, apex);
    connect({ x: centerX + radiusX, y: bottomY }, apex);
  }
  ctx.restore();

  const scale = state.solidType === "cylinder" ? 1 : 1 - state.sliceRatio;
  const sliceRadiusX = radiusX * scale;
  const sliceY = top + solidHeight * state.sliceRatio;
  ctx.save();
  ctx.fillStyle = "rgba(229,123,73,0.28)";
  ctx.strokeStyle = "#e57b49";
  ctx.lineWidth = 3;
  ellipse(centerX, sliceY, sliceRadiusX, radiusY * Math.max(scale, 0.45));
  ctx.restore();
}

function drawSectionPreview(width, height, features) {
  const centerX = width * 0.77;
  const centerY = height * 0.42;
  ctx.save();
  ctx.fillStyle = "rgba(53,45,35,0.88)";
  ctx.font = '14px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText("截面预览", centerX - 28, height * 0.12);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "#e57b49";
  ctx.fillStyle = "rgba(229,123,73,0.2)";
  ctx.lineWidth = 4;
  if (features.shape === "正方形") {
    const side = 44 * (features.sectionSize / Math.max(state.size, 0.1));
    ctx.beginPath();
    ctx.rect(centerX - side / 2, centerY - side / 2, side, side);
    ctx.fill();
    ctx.stroke();
  } else {
    const radius = 44 * (features.sectionRadius / Math.max(state.size, 0.1));
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawQuad(a, b, c, d) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.lineTo(d.x, d.y);
  ctx.closePath();
  ctx.stroke();
}

function connect(a, b) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function ellipse(cx, cy, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
}

function renderExplanation(features) {
  renderTeachingPanel(features);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前截面</span>
      <strong>${features.shape} · 面积 ${features.area.toFixed(2)}</strong>
      <p>现在我们只看“平行于底面的截面”，先把最基础也最稳定的空间感觉建立起来。</p>
    </div>
    <div class="info-card">
      <span class="info-label">关键性质</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>截面形状：${features.shape}</strong>
          <span>${features.shape === "正方形" ? "棱柱、棱锥在这里先看方形底面，截面仍保持相似的方形。" : "圆柱、圆锥在这里先看圆形底面，截面仍保持圆形。"}</span>
        </div>
        <div class="metric-item">
          <strong>面积变化：${features.areaTrend}</strong>
          <span>${features.areaTrend === "保持不变" ? "这类几何体往上切，平行底面的截面大小不会变。" : "这类几何体往上切，平行底面的截面会逐渐缩小。"}</span>
        </div>
        <div class="metric-item">
          <strong>截面位置：${state.sliceRatio.toFixed(2)}</strong>
          <span>数字越接近 1，说明切面越靠近顶部；越接近 0，说明越靠近底部。</span>
        </div>
      </div>
    </div>
    <div class="info-card tip-card">
      <span class="info-label">给孩子的解释</span>
      <strong>${buildStudentSummary(features)}</strong>
      <p>建议先对比棱柱和棱锥，再对比圆柱和圆锥，孩子会更容易总结出“柱体不变、锥体变小”的规律。</p>
    </div>
  `;
}

function renderTeachingPanel(features) {
  const chips = [
    features.shape,
    `面积 ${features.area.toFixed(2)}`,
    features.areaTrend,
  ];
  els.teachingPanel.innerHTML = `
    <div class="teaching-card">
      <span class="teaching-title">先抓规律</span>
      <strong class="teaching-value">${features.areaTrend === "保持不变" ? "柱体类截面大小保持不变" : "锥体类截面会逐渐缩小"}</strong>
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
  if (features.areaTrend === "保持不变") {
    return "现在最重要的是记住：柱体类几何体平行底面的截面不会越切越小，它会一直保持同样大小。";
  }
  return "现在最重要的是记住：锥体类几何体越往上切，截面会越小，直到顶点附近慢慢收缩。";
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
