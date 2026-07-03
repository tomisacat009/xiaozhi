const functionRegistry = {
  quadratic: {
    label: "二次函数",
    modes: ["params", "points"],
  },
};

const demoSamples = [
  {
    name: "标准抛物线",
    params: { a: 1, b: 0, c: 0 },
    note: "这是最基础的二次函数，顶点在原点，开口向上。",
  },
  {
    name: "开口变宽",
    params: { a: 0.4, b: 0, c: 0 },
    note: "|a| 变小以后，图像会更平缓，开口看起来更宽。",
  },
  {
    name: "向右平移",
    params: { a: 1, b: -4, c: 3 },
    note: "b 和 c 一起变化后，顶点移动到了右边和上方。",
  },
  {
    name: "倒开口",
    params: { a: -1.2, b: 2, c: 4 },
    note: "当 a 变成负数，抛物线就会开口向下。",
  },
];

const state = {
  functionType: "quadratic",
  modeType: "params",
  parameterForm: "standard",
  quadratic: {
    standard: { a: 1, b: 0, c: 0 },
    vertex: { a: 1, h: 0, k: 0 },
    current: { a: 1, b: 0, c: 0 },
    defaults: { a: 1, b: 0, c: 0 },
  },
  points: [
    { x: -2, y: 4 },
    { x: 0, y: 0 },
    { x: 2, y: 4 },
  ],
  display: {
    showVertex: true,
    showAxis: true,
    showIntercept: true,
  },
  message: {
    text: "准备好了，先拖动参数看看图像怎么变。",
    type: "info",
  },
  view: {
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10,
  },
  animation: {
    frameId: null,
    timerId: null,
    isPlaying: false,
    sampleIndex: 0,
    duration: 1200,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  },
};

let canvas;
let ctx;
let elements = {};

function bootstrapApp() {
  cacheElements();
  resizeCanvas();
  syncStateToControls();
  bindEvents();
  renderSamples();
  updateModeVisibility();
  refreshScene();
  window.addEventListener("resize", resizeCanvas);
}

function cacheElements() {
  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");

  elements = {
    functionType: document.getElementById("functionType"),
    modeType: document.getElementById("modeType"),
    parameterForm: document.getElementById("parameterForm"),
    standardControls: document.getElementById("standardControls"),
    vertexControls: document.getElementById("vertexControls"),
    paramsSection: document.getElementById("paramsSection"),
    pointsSection: document.getElementById("pointsSection"),
    messageBox: document.getElementById("messageBox"),
    explanationPanel: document.getElementById("explanationPanel"),
    equationDisplay: document.getElementById("equationDisplay"),
    sampleStrip: document.getElementById("sampleStrip"),
    playButton: document.getElementById("playButton"),
    pauseButton: document.getElementById("pauseButton"),
    resetButton: document.getElementById("resetButton"),
    applyPointsButton: document.getElementById("applyPointsButton"),
    loadPointExampleButton: document.getElementById("loadPointExampleButton"),
    sliders: {
      a: document.getElementById("sliderA"),
      b: document.getElementById("sliderB"),
      c: document.getElementById("sliderC"),
      vertexA: document.getElementById("sliderVertexA"),
      h: document.getElementById("sliderH"),
      k: document.getElementById("sliderK"),
    },
    sliderValues: {
      a: document.getElementById("valueA"),
      b: document.getElementById("valueB"),
      c: document.getElementById("valueC"),
      vertexA: document.getElementById("valueVertexA"),
      h: document.getElementById("valueH"),
      k: document.getElementById("valueK"),
    },
    toggles: {
      vertex: document.getElementById("toggleVertex"),
      axis: document.getElementById("toggleAxis"),
      intercept: document.getElementById("toggleIntercept"),
    },
    points: [
      { x: document.getElementById("point0x"), y: document.getElementById("point0y") },
      { x: document.getElementById("point1x"), y: document.getElementById("point1y") },
      { x: document.getElementById("point2x"), y: document.getElementById("point2y") },
    ],
  };
}

function bindEvents() {
  elements.functionType.addEventListener("change", handleFunctionTypeChange);
  elements.modeType.addEventListener("change", handleModeChange);
  elements.parameterForm.addEventListener("change", handleParameterFormChange);

  elements.sliders.a.addEventListener("input", handleStandardInput);
  elements.sliders.b.addEventListener("input", handleStandardInput);
  elements.sliders.c.addEventListener("input", handleStandardInput);
  elements.sliders.vertexA.addEventListener("input", handleVertexInput);
  elements.sliders.h.addEventListener("input", handleVertexInput);
  elements.sliders.k.addEventListener("input", handleVertexInput);

  elements.toggles.vertex.addEventListener("change", () => {
    state.display.showVertex = elements.toggles.vertex.checked;
    refreshScene();
  });
  elements.toggles.axis.addEventListener("change", () => {
    state.display.showAxis = elements.toggles.axis.checked;
    refreshScene();
  });
  elements.toggles.intercept.addEventListener("change", () => {
    state.display.showIntercept = elements.toggles.intercept.checked;
    refreshScene();
  });

  elements.applyPointsButton.addEventListener("click", applyPointsMode);
  elements.loadPointExampleButton.addEventListener("click", loadPointExample);
  elements.playButton.addEventListener("click", playSampleSequence);
  elements.pauseButton.addEventListener("click", pauseAnimation);
  elements.resetButton.addEventListener("click", resetToDefault);
}

function handleFunctionTypeChange() {
  if (elements.functionType.value !== "quadratic") {
    elements.functionType.value = "quadratic";
    setMessage("首版先支持二次函数，其他函数的扩展位已经预留好了。", "info");
    return;
  }
  state.functionType = "quadratic";
  refreshScene();
}

function handleModeChange() {
  state.modeType = elements.modeType.value;
  updateModeVisibility();
  if (state.modeType === "points") {
    setMessage("输入 3 个点，看看它们怎样一起决定一条抛物线。", "info");
  } else {
    setMessage("现在是参数模式，拖动 a、b、c 就能看到图像变化。", "info");
  }
  refreshScene();
}

function handleParameterFormChange() {
  state.parameterForm = elements.parameterForm.value;
  elements.standardControls.classList.toggle("is-hidden", state.parameterForm !== "standard");
  elements.vertexControls.classList.toggle("is-hidden", state.parameterForm !== "vertex");
  syncStateToControls();
  refreshScene();
}

function handleStandardInput() {
  pauseAnimation();
  state.quadratic.standard = {
    a: parseFloat(elements.sliders.a.value),
    b: parseFloat(elements.sliders.b.value),
    c: parseFloat(elements.sliders.c.value),
  };
  if (Math.abs(state.quadratic.standard.a) < 0.05) {
    state.quadratic.standard.a = state.quadratic.standard.a >= 0 ? 0.05 : -0.05;
  }
  state.quadratic.current = { ...state.quadratic.standard };
  state.quadratic.vertex = getVertexFormFromStandard(
    state.quadratic.current.a,
    state.quadratic.current.b,
    state.quadratic.current.c
  );
  syncStateToControls();
  setMessage("参数已经更新，观察开口、顶点和对称轴一起怎么变。", "info");
  refreshScene();
}

function handleVertexInput() {
  pauseAnimation();
  state.quadratic.vertex = {
    a: parseFloat(elements.sliders.vertexA.value),
    h: parseFloat(elements.sliders.h.value),
    k: parseFloat(elements.sliders.k.value),
  };
  if (Math.abs(state.quadratic.vertex.a) < 0.05) {
    state.quadratic.vertex.a = state.quadratic.vertex.a >= 0 ? 0.05 : -0.05;
  }
  state.quadratic.current = getStandardFromVertex(
    state.quadratic.vertex.a,
    state.quadratic.vertex.h,
    state.quadratic.vertex.k
  );
  state.quadratic.standard = { ...state.quadratic.current };
  syncStateToControls();
  setMessage("顶点式更适合看平移变化，留意顶点位置和开口方向。", "info");
  refreshScene();
}

function updateModeVisibility() {
  const isParams = state.modeType === "params";
  elements.paramsSection.classList.toggle("is-hidden", !isParams);
  elements.pointsSection.classList.toggle("is-hidden", isParams);
}

function syncStateToControls() {
  const { standard, vertex, current } = state.quadratic;
  elements.sliders.a.value = standard.a;
  elements.sliders.b.value = standard.b;
  elements.sliders.c.value = standard.c;
  elements.sliders.vertexA.value = vertex.a;
  elements.sliders.h.value = vertex.h;
  elements.sliders.k.value = vertex.k;

  elements.sliderValues.a.textContent = formatNumber(standard.a);
  elements.sliderValues.b.textContent = formatNumber(standard.b);
  elements.sliderValues.c.textContent = formatNumber(standard.c);
  elements.sliderValues.vertexA.textContent = formatNumber(vertex.a);
  elements.sliderValues.h.textContent = formatNumber(vertex.h);
  elements.sliderValues.k.textContent = formatNumber(vertex.k);

  elements.toggles.vertex.checked = state.display.showVertex;
  elements.toggles.axis.checked = state.display.showAxis;
  elements.toggles.intercept.checked = state.display.showIntercept;
  elements.points.forEach((pointInputs, index) => {
    pointInputs.x.value = state.points[index].x;
    pointInputs.y.value = state.points[index].y;
  });

  elements.equationDisplay.textContent = formatQuadraticEquation(current);
}

function resizeCanvas() {
  const wrap = canvas.parentElement;
  const width = wrap.clientWidth;
  const height = parseInt(getComputedStyle(canvas).height, 10);
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  refreshScene();
}

function refreshScene() {
  const params = state.quadratic.current;
  const features = getQuadraticFeatures(params.a, params.b, params.c);
  state.view = getViewWindow(params, state.modeType === "points" ? state.points : [], features);
  elements.equationDisplay.textContent = formatQuadraticEquation(params);
  drawScene(params, features);
  renderExplanation(params, features);
}

function drawScene(params, features) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);

  drawGrid(width, height);
  drawAxes(width, height);
  drawQuadraticCurve(params, width, height);

  if (state.display.showAxis) {
    drawSymmetryAxis(features.axis, height);
  }

  if (state.modeType === "points") {
    drawPoints(state.points);
  }

  if (state.display.showVertex) {
    drawMarker(features.vertex.x, features.vertex.y, "#e63946", "顶点");
  }

  if (state.display.showIntercept) {
    drawMarker(0, params.c, "#ff7b54", "y 轴交点");
  }
}

function drawGrid(width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(75, 163, 217, 0.18)";
  ctx.lineWidth = 1;
  for (let x = Math.floor(state.view.xMin); x <= Math.ceil(state.view.xMax); x += 1) {
    const px = worldToScreen(x, 0).x;
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, height);
    ctx.stroke();
  }
  for (let y = Math.floor(state.view.yMin); y <= Math.ceil(state.view.yMax); y += 1) {
    const py = worldToScreen(0, y).y;
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
    ctx.stroke();
  }
  ctx.restore();
}

function drawAxes(width, height) {
  const xAxis = worldToScreen(0, 0).y;
  const yAxis = worldToScreen(0, 0).x;

  ctx.save();
  ctx.strokeStyle = "rgba(24, 49, 83, 0.72)";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, xAxis);
  ctx.lineTo(width, xAxis);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(yAxis, 0);
  ctx.lineTo(yAxis, height);
  ctx.stroke();

  ctx.fillStyle = "rgba(24, 49, 83, 0.85)";
  ctx.font = '12px "Avenir Next", "PingFang SC", sans-serif';
  for (let x = Math.ceil(state.view.xMin); x <= Math.floor(state.view.xMax); x += 2) {
    if (x === 0) continue;
    const pos = worldToScreen(x, 0);
    ctx.fillText(String(x), pos.x - 6, xAxis + 18);
  }
  for (let y = Math.ceil(state.view.yMin); y <= Math.floor(state.view.yMax); y += 2) {
    if (y === 0) continue;
    const pos = worldToScreen(0, y);
    ctx.fillText(String(y), yAxis + 8, pos.y + 4);
  }
  ctx.restore();
}

function drawQuadraticCurve(params, width, height) {
  ctx.save();
  ctx.beginPath();
  let started = false;
  for (let pixelX = 0; pixelX <= width; pixelX += 2) {
    const x = screenToWorld(pixelX, 0).x;
    const y = quadraticValue(params.a, params.b, params.c, x);
    const point = worldToScreen(x, y);
    if (!started) {
      ctx.moveTo(point.x, point.y);
      started = true;
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, "#4ba3d9");
  gradient.addColorStop(1, "#1768ac");
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(23, 104, 172, 0.22)";
  ctx.shadowBlur = 18;
  ctx.stroke();
  ctx.restore();
}

function drawSymmetryAxis(axisX, height) {
  const point = worldToScreen(axisX, 0);
  ctx.save();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = "rgba(230, 90, 52, 0.7)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(point.x, 0);
  ctx.lineTo(point.x, height);
  ctx.stroke();
  ctx.restore();
}

function drawPoints(points) {
  points.forEach((point, index) => {
    drawMarker(point.x, point.y, "#183153", `点 ${index + 1}`);
  });
}

function drawMarker(x, y, color, label) {
  const point = worldToScreen(x, y);
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(24, 49, 83, 0.88)";
  ctx.font = '12px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText(label, point.x + 10, point.y - 10);
  ctx.restore();
}

function renderExplanation(params, features) {
  const cards = [
    {
      label: "图像结论",
      title: formatQuadraticEquation(params),
      body: "图像、表达式和性质，描述的是同一个函数。",
    },
    {
      label: "关键特征",
      metricList: [
        {
          title: `顶点：(${formatNumber(features.vertex.x)}, ${formatNumber(features.vertex.y)})`,
          hint: "顶点决定了图像的最低点或最高点。",
        },
        {
          title: `对称轴：x = ${formatNumber(features.axis)}`,
          hint: "左右两边的图像会围绕这条竖线对称。",
        },
        {
          title: `开口方向：${params.a > 0 ? "向上" : "向下"}`,
          hint: params.a > 0 ? "a 是正数，所以图像像一个笑脸。" : "a 是负数，所以图像像一个倒扣的碗。",
        },
        {
          title: `宽窄感觉：${describeWidth(params.a)}`,
          hint: "|a| 越大，图像越瘦；|a| 越小，图像越宽。",
        },
      ],
    },
    {
      label: "给孩子的解释",
      title: getStudentHint(params, features),
      body: state.modeType === "points"
        ? "现在是点坐标模式。3 个点一旦确定，只要它们能唯一确定一条抛物线，整条图像就被定下来了。"
        : state.parameterForm === "vertex"
          ? "顶点式最适合观察平移：h 管左右，k 管上下，a 管开口。"
          : "一般式更适合整体感受：a 决定开口，b 会影响对称轴位置，c 决定与 y 轴交点。",
      extraClass: "tip-card",
    },
  ];

  elements.explanationPanel.innerHTML = cards
    .map((card) => {
      if (card.metricList) {
        return `
          <div class="info-card">
            <span class="info-label">${card.label}</span>
            <div class="metric-list">
              ${card.metricList
                .map(
                  (item) => `
                    <div class="metric-item">
                      <strong>${item.title}</strong>
                      <span>${item.hint}</span>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        `;
      }
      return `
        <div class="info-card ${card.extraClass || ""}">
          <span class="info-label">${card.label}</span>
          <strong>${card.title}</strong>
          <p>${card.body}</p>
        </div>
      `;
    })
    .join("");
}

function renderSamples() {
  elements.sampleStrip.innerHTML = demoSamples
    .map(
      (sample, index) => `
        <button class="sample-chip ${index === state.animation.sampleIndex ? "is-active" : ""}" data-sample-index="${index}">
          ${sample.name}
        </button>
      `
    )
    .join("");

  elements.sampleStrip.querySelectorAll(".sample-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.dataset.sampleIndex, 10);
      pauseAnimation();
      state.animation.sampleIndex = index;
      animateToQuadratic(demoSamples[index].params, demoSamples[index].note);
      updateSampleActiveState();
    });
  });
}

function updateSampleActiveState() {
  elements.sampleStrip.querySelectorAll(".sample-chip").forEach((button, index) => {
    button.classList.toggle("is-active", index === state.animation.sampleIndex);
  });
}

function playSampleSequence() {
  if (state.animation.isPlaying) {
    return;
  }
  if (state.animation.sampleIndex < 0 || state.animation.sampleIndex >= demoSamples.length) {
    state.animation.sampleIndex = 0;
  }
  setMessage("自动演示开始了，你可以边看边说：现在开口、顶点、对称轴发生了什么？", "info");
  state.animation.isPlaying = true;
  runNextSample();
}

function runNextSample() {
  if (!state.animation.isPlaying) {
    return;
  }
  const sample = demoSamples[state.animation.sampleIndex];
  updateSampleActiveState();
  animateToQuadratic(sample.params, sample.note, () => {
    if (!state.animation.isPlaying) {
      return;
    }
    state.animation.timerId = window.setTimeout(() => {
      state.animation.sampleIndex = (state.animation.sampleIndex + 1) % demoSamples.length;
      runNextSample();
    }, 900);
  });
}

function pauseAnimation() {
  state.animation.isPlaying = false;
  if (state.animation.frameId) {
    cancelAnimationFrame(state.animation.frameId);
    state.animation.frameId = null;
  }
  if (state.animation.timerId) {
    clearTimeout(state.animation.timerId);
    state.animation.timerId = null;
  }
}

function resetToDefault() {
  pauseAnimation();
  state.animation.sampleIndex = 0;
  updateSampleActiveState();
  animateToQuadratic(state.quadratic.defaults, "已经回到最基础的标准抛物线。");
}

function applyPointsMode() {
  pauseAnimation();
  try {
    const points = elements.points.map((pointInputs) => ({
      x: parseFloat(pointInputs.x.value),
      y: parseFloat(pointInputs.y.value),
    }));

    if (points.some((point) => Number.isNaN(point.x) || Number.isNaN(point.y))) {
      throw new Error("请先把 3 个点的坐标都填完整。");
    }

    const params = solveQuadraticFromPoints(points);
    state.points = points;
    state.modeType = "points";
    elements.modeType.value = "points";
    updateModeVisibility();
    state.animation.sampleIndex = -1;
    updateSampleActiveState();
    animateToQuadratic(params, "这 3 个点已经唯一确定了一条二次函数图像。");
  } catch (error) {
    setMessage(error.message, "error");
  }
}

function loadPointExample() {
  state.points = [
    { x: -3, y: 7 },
    { x: -1, y: -1 },
    { x: 2, y: 8 },
  ];
  syncStateToControls();
  setMessage("已载入示例点，点击“生成二次函数”就能看到对应图像。", "info");
}

function animateToQuadratic(targetParams, message, onComplete) {
  const safeTarget = sanitizeParams(targetParams);
  const start = { ...state.quadratic.current };
  const end = { ...safeTarget };
  pauseAnimation();

  if (state.animation.reducedMotion) {
    state.quadratic.current = end;
    state.quadratic.standard = { ...end };
    state.quadratic.vertex = getVertexFormFromStandard(end.a, end.b, end.c);
    syncStateToControls();
    setMessage(message, "info");
    refreshScene();
    if (onComplete) onComplete();
    return;
  }

  const startTime = performance.now();

  const frame = (now) => {
    const progress = Math.min((now - startTime) / state.animation.duration, 1);
    const eased = easeInOutCubic(progress);
    state.quadratic.current = {
      a: lerp(start.a, end.a, eased),
      b: lerp(start.b, end.b, eased),
      c: lerp(start.c, end.c, eased),
    };
    state.quadratic.standard = { ...state.quadratic.current };
    state.quadratic.vertex = getVertexFormFromStandard(
      state.quadratic.current.a,
      state.quadratic.current.b,
      state.quadratic.current.c
    );
    syncStateToControls();
    refreshScene();
    if (progress < 1) {
      state.animation.frameId = requestAnimationFrame(frame);
    } else {
      state.animation.frameId = null;
      setMessage(message, "info");
      if (onComplete) onComplete();
    }
  };

  state.animation.frameId = requestAnimationFrame(frame);
}

function setMessage(text, type = "info") {
  state.message = { text, type };
  elements.messageBox.textContent = text;
  elements.messageBox.classList.toggle("is-error", type === "error");
}

function sanitizeParams(params) {
  const next = { ...params };
  if (Math.abs(next.a) < 0.05) {
    next.a = next.a >= 0 ? 0.05 : -0.05;
  }
  return next;
}

function getQuadraticFeatures(a, b, c) {
  const axis = -b / (2 * a);
  const vertexY = quadraticValue(a, b, c, axis);
  const discriminant = b * b - 4 * a * c;
  return {
    axis,
    vertex: { x: axis, y: vertexY },
    discriminant,
  };
}

function getStandardFromVertex(a, h, k) {
  return {
    a,
    b: -2 * a * h,
    c: a * h * h + k,
  };
}

function getVertexFormFromStandard(a, b, c) {
  const h = -b / (2 * a);
  const k = quadraticValue(a, b, c, h);
  return { a, h, k };
}

function getViewWindow(params, points, features) {
  const xMin = -10;
  const xMax = 10;
  const values = [];
  for (let x = xMin; x <= xMax; x += 0.5) {
    values.push(quadraticValue(params.a, params.b, params.c, x));
  }
  points.forEach((point) => values.push(point.y));
  values.push(features.vertex.y, params.c);

  const maxAbsY = Math.max(8, ...values.map((value) => Math.abs(value)));
  const yRange = Math.min(24, Math.ceil((maxAbsY + 2) / 2) * 2);
  return {
    xMin,
    xMax,
    yMin: -yRange,
    yMax: yRange,
  };
}

function solveQuadraticFromPoints(points) {
  const matrix = points.map((point) => [point.x * point.x, point.x, 1, point.y]);
  const solution = gaussianElimination(matrix);
  if (!solution) {
    throw new Error("这 3 个点不能唯一确定一条二次函数，请换一组横坐标不同的点。");
  }
  return sanitizeParams({ a: solution[0], b: solution[1], c: solution[2] });
}

function gaussianElimination(matrix) {
  const rows = matrix.map((row) => row.slice());
  const size = 3;

  for (let col = 0; col < size; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < size; row += 1) {
      if (Math.abs(rows[row][col]) > Math.abs(rows[pivot][col])) {
        pivot = row;
      }
    }
    if (Math.abs(rows[pivot][col]) < 1e-8) {
      return null;
    }
    if (pivot !== col) {
      [rows[pivot], rows[col]] = [rows[col], rows[pivot]];
    }

    const pivotValue = rows[col][col];
    for (let index = col; index <= size; index += 1) {
      rows[col][index] /= pivotValue;
    }

    for (let row = 0; row < size; row += 1) {
      if (row === col) continue;
      const factor = rows[row][col];
      for (let index = col; index <= size; index += 1) {
        rows[row][index] -= factor * rows[col][index];
      }
    }
  }

  return [rows[0][3], rows[1][3], rows[2][3]];
}

function quadraticValue(a, b, c, x) {
  return a * x * x + b * x + c;
}

function worldToScreen(x, y) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const px = ((x - state.view.xMin) / (state.view.xMax - state.view.xMin)) * width;
  const py = height - ((y - state.view.yMin) / (state.view.yMax - state.view.yMin)) * height;
  return { x: px, y: py };
}

function screenToWorld(px, py) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const x = state.view.xMin + (px / width) * (state.view.xMax - state.view.xMin);
  const y = state.view.yMax - (py / height) * (state.view.yMax - state.view.yMin);
  return { x, y };
}

function formatQuadraticEquation(params) {
  const aText = `${formatNumber(params.a)}x²`;
  const bText = params.b >= 0 ? ` + ${formatNumber(params.b)}x` : ` - ${formatNumber(Math.abs(params.b))}x`;
  const cText = params.c >= 0 ? ` + ${formatNumber(params.c)}` : ` - ${formatNumber(Math.abs(params.c))}`;
  return `y = ${aText}${bText}${cText}`;
}

function formatNumber(value) {
  return Number(value).toFixed(2).replace(/-0\.00/, "0.00");
}

function describeWidth(a) {
  const absA = Math.abs(a);
  if (absA > 1.4) return "比较窄";
  if (absA < 0.7) return "比较宽";
  return "中等";
}

function getStudentHint(params, features) {
  if (params.a > 0 && Math.abs(features.vertex.x) < 0.2 && Math.abs(features.vertex.y) < 0.2) {
    return "它还是围着原点附近展开，所以你会觉得“图像很标准”。";
  }
  if (params.a < 0) {
    return "注意 a 的符号一变，整条图像就像翻了一个方向。";
  }
  if (Math.abs(features.vertex.x) > 0.5 || Math.abs(features.vertex.y) > 0.5) {
    return "顶点离开原点以后，你可以把它理解成“整条抛物线在平移”。";
  }
  return "先抓住三个关键词：开口、顶点、对称轴，图像变化就不会乱。";
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

window.addEventListener("DOMContentLoaded", bootstrapApp);
