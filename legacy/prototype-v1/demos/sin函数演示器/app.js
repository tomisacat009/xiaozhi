import { sineAngleGuide, sineKeyPoints, sineValue } from "../../assets/math-viz-core.mjs";

const state = {
  angle: 0,
  animation: { frameId: null, playing: false },
};

let canvas;
let ctx;
let els = {};

function init() {
  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");
  els = {
    angleSlider: document.getElementById("angleSlider"),
    angleValue: document.getElementById("angleValue"),
    angleDisplay: document.getElementById("angleDisplay"),
    playButton: document.getElementById("playButton"),
    pauseButton: document.getElementById("pauseButton"),
    resetButton: document.getElementById("resetButton"),
    angleGuidePanel: document.getElementById("angleGuidePanel"),
    messageBox: document.getElementById("messageBox"),
    explanationPanel: document.getElementById("explanationPanel"),
  };
  resizeCanvas();
  bindEvents();
  syncControls();
  render();
  window.addEventListener("resize", resizeCanvas);
}

function bindEvents() {
  els.angleSlider.addEventListener("input", () => {
    pauseAnimation();
    state.angle = parseFloat(els.angleSlider.value);
    syncControls();
    setMessage("观察左边圆上的点，尤其盯住它的纵坐标是怎样被搬到右边曲线上的。");
    render();
  });
  els.playButton.addEventListener("click", playCycle);
  els.pauseButton.addEventListener("click", pauseAnimation);
  els.resetButton.addEventListener("click", () => {
    pauseAnimation();
    state.angle = 0;
    syncControls();
    setMessage("已经回到起点，可以重新观察一个完整周期。");
    render();
  });
}

function playCycle() {
  if (state.animation.playing) return;
  state.animation.playing = true;
  setMessage("自动演示开始了，注意：圆上的高度就是右边曲线的函数值。");
  const start = performance.now() - (state.angle / (2 * Math.PI)) * 5000;
  const step = (now) => {
    if (!state.animation.playing) return;
    const progress = ((now - start) % 5000) / 5000;
    state.angle = progress * 2 * Math.PI;
    syncControls();
    render();
    state.animation.frameId = requestAnimationFrame(step);
  };
  state.animation.frameId = requestAnimationFrame(step);
}

function pauseAnimation() {
  state.animation.playing = false;
  if (state.animation.frameId) cancelAnimationFrame(state.animation.frameId);
  state.animation.frameId = null;
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

function syncControls() {
  const ratio = state.angle / Math.PI;
  const angleText = `${ratio.toFixed(2)}π`;
  els.angleSlider.value = state.angle;
  els.angleValue.textContent = angleText;
  els.angleDisplay.textContent = `x = ${angleText}`;
}

function render() {
  if (!ctx) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);
  drawLayout(width, height);
  drawUnitCircle(width, height);
  drawSineGraph(width, height);
  renderExplanation();
}

function drawLayout(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(43,122,120,0.14)";
  for (let x = 0; x <= width; x += width / 18) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y <= height; y += height / 18) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }
  ctx.restore();
}

function drawUnitCircle(width, height) {
  const cx = width * 0.24;
  const cy = height * 0.5;
  const radius = Math.min(width, height) * 0.18;
  const px = cx + radius * Math.cos(state.angle);
  const py = cy - radius * Math.sin(state.angle);

  ctx.save();
  ctx.strokeStyle = "rgba(23,48,66,0.74)";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx - radius - 20, cy); ctx.lineTo(cx + radius + 20, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, cy - radius - 20); ctx.lineTo(cx, cy + radius + 20); ctx.stroke();
  ctx.strokeStyle = "#ef8354";
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = "rgba(239,131,84,0.8)";
  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, cy); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#2b7a78";
  ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(23,48,66,0.88)";
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText("单位圆", cx - 24, cy - radius - 26);
  ctx.fillText(`sin(x) = ${Math.sin(state.angle).toFixed(2)}`, px + 12, py - 12);
  ctx.restore();
}

function drawSineGraph(width, height) {
  const graphLeft = width * 0.48;
  const graphWidth = width * 0.44;
  const graphTop = height * 0.18;
  const graphHeight = height * 0.64;
  const midY = graphTop + graphHeight / 2;
  const scaleY = graphHeight / 2.4;

  ctx.save();
  ctx.strokeStyle = "rgba(23,48,66,0.74)";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(graphLeft, midY); ctx.lineTo(graphLeft + graphWidth, midY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(graphLeft, graphTop); ctx.lineTo(graphLeft, graphTop + graphHeight); ctx.stroke();

  const keyPoints = sineKeyPoints({ amplitude: 1, omega: 1, phase: 0, offset: 0 });
  keyPoints.forEach((point, index) => {
    const x = graphLeft + (point.x / (2 * Math.PI)) * graphWidth;
    const y = midY - point.y * scaleY;
    ctx.fillStyle = "#173042";
    ctx.fillText(index === 0 ? "0" : `${(point.x / Math.PI).toFixed(1)}π`, x - 8, midY + 20);
    ctx.fillStyle = "#2b7a78";
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
  });

  ctx.beginPath();
  for (let i = 0; i <= 240; i += 1) {
    const angle = (i / 240) * (2 * Math.PI);
    const x = graphLeft + (angle / (2 * Math.PI)) * graphWidth;
    const y = midY - sineValue(1, 1, 0, 0, angle) * scaleY;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "#2b7a78";
  ctx.lineWidth = 4;
  ctx.stroke();

  const traceX = graphLeft + (state.angle / (2 * Math.PI)) * graphWidth;
  const traceY = midY - Math.sin(state.angle) * scaleY;
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = "rgba(239,131,84,0.82)";
  ctx.beginPath(); ctx.moveTo(traceX, traceY); ctx.lineTo(traceX, midY); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#ef8354";
  ctx.beginPath(); ctx.arc(traceX, traceY, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(23,48,66,0.88)";
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText("y = sin(x)", graphLeft + graphWidth - 70, graphTop - 16);
  ctx.restore();
}

function renderExplanation() {
  const sinNow = Math.sin(state.angle);
  const ratio = state.angle / Math.PI;
  const guide = sineAngleGuide(state.angle);
  renderAngleGuide(guide, sinNow);
  els.explanationPanel.innerHTML = `
    <div class="info-card">
      <span class="info-label">当前观察</span>
      <strong>x = ${ratio.toFixed(2)}π</strong>
      <p>左边圆上点的高度，正好就是右边图像此刻的函数值。</p>
    </div>
    <div class="info-card">
      <span class="info-label">关键性质</span>
      <div class="metric-list">
        <div class="metric-item">
          <strong>当前函数值：${sinNow.toFixed(2)}</strong>
          <span>当点在 x 轴上方时，sin(x) 为正；在下方时，sin(x) 为负。</span>
        </div>
        <div class="metric-item">
          <strong>一个周期：2π</strong>
          <span>圆上的点转一整圈，右边的正弦图像刚好走完一整段标准波形。</span>
        </div>
        <div class="metric-item">
          <strong>最高点与最低点：1 和 -1</strong>
          <span>标准正弦函数的最大值是 1，最小值是 -1。</span>
        </div>
        <div class="metric-item">
          <strong>当前位置：${guide.quadrant}</strong>
          <span>${guide.keyAngleLabel ? `你现在靠近关键角度 ${guide.keyAngleLabel}。` : "先观察它在第几象限，再判断函数值正负。"}</span>
        </div>
      </div>
    </div>
    <div class="info-card tip-card">
      <span class="info-label">给孩子的解释</span>
      <strong>${getStudentHint(sinNow, guide)}</strong>
      <p>先把“圆上的高度会变成图像的高度”这句话看懂，后面三角函数就容易多了。</p>
    </div>
  `;
}

function renderAngleGuide(guide, sinNow) {
  const keyAngleLine = guide.keyAngleLabel
    ? `${guide.keyAngleLabel} · ${guide.pointType}`
    : "当前不是关键角度";
  els.angleGuidePanel.innerHTML = `
    <div class="teaching-card">
      <span class="teaching-title">当前位置</span>
      <strong class="teaching-value">${guide.quadrant}</strong>
      <div class="badge-row">
        <span class="teaching-chip">sin(x) ${guide.valueSign === "0" ? "= 0" : guide.valueSign}</span>
        <span class="teaching-chip">${keyAngleLine}</span>
      </div>
    </div>
    <div class="teaching-card">
      <span class="teaching-title">速读提示</span>
      <p class="teaching-text">${getStudentHint(sinNow, guide)}</p>
    </div>
  `;
}

function getStudentHint(sinNow, guide) {
  if (guide.keyAngleLabel === "π/2") return "现在到了最高点，圆上的高度最大，所以图像也来到波峰。";
  if (guide.keyAngleLabel === "3π/2") return "现在到了最低点，圆上的高度最小，所以图像也来到波谷。";
  if (guide.keyAngleLabel === "0" || guide.keyAngleLabel === "π" || guide.keyAngleLabel === "2π") {
    return "现在点落在 x 轴上，所以 sin(x) 正好等于 0。";
  }
  if (Math.abs(sinNow) < 0.08) return "现在圆上的点接近 x 轴，所以 sin(x) 也接近 0。";
  if (sinNow > 0.75) return "现在点很高，所以右边的正弦曲线也来到了波峰附近。";
  if (sinNow < -0.75) return "现在点很低，所以右边的正弦曲线也来到了波谷附近。";
  return "现在函数值在平稳变化，你可以把它看成圆上的高度被一边走一边记录了下来。";
}

function setMessage(text) {
  els.messageBox.textContent = text;
}

window.addEventListener("DOMContentLoaded", init);
