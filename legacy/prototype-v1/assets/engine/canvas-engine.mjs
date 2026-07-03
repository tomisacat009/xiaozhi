function getScale(viewport, width, height) {
  return {
    scaleX: width / (viewport.xMax - viewport.xMin),
    scaleY: height / (viewport.yMax - viewport.yMin),
  };
}

function worldToCanvas(viewport, width, height, x, y) {
  const { scaleX, scaleY } = getScale(viewport, width, height);
  return {
    x: (x - viewport.xMin) * scaleX,
    y: height - (y - viewport.yMin) * scaleY,
  };
}

function drawGrid(ctx, viewport, width, height) {
  const majorStep = 1;
  ctx.save();
  ctx.strokeStyle = "rgba(49, 107, 151, 0.12)";
  ctx.lineWidth = 1;

  for (let x = Math.ceil(viewport.xMin); x <= viewport.xMax; x += majorStep) {
    const point = worldToCanvas(viewport, width, height, x, 0);
    ctx.beginPath();
    ctx.moveTo(point.x, 0);
    ctx.lineTo(point.x, height);
    ctx.stroke();
  }

  for (let y = Math.ceil(viewport.yMin); y <= viewport.yMax; y += majorStep) {
    const point = worldToCanvas(viewport, width, height, 0, y);
    ctx.beginPath();
    ctx.moveTo(0, point.y);
    ctx.lineTo(width, point.y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawAxes(ctx, viewport, width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(19, 45, 74, 0.78)";
  ctx.lineWidth = 2;

  const xAxis = worldToCanvas(viewport, width, height, 0, 0);
  ctx.beginPath();
  ctx.moveTo(0, xAxis.y);
  ctx.lineTo(width, xAxis.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xAxis.x, 0);
  ctx.lineTo(xAxis.x, height);
  ctx.stroke();
  ctx.restore();
}

function drawPolygon(ctx, viewport, width, height, polygon) {
  if (!polygon.points?.length) return;

  ctx.save();
  ctx.beginPath();
  polygon.points.forEach((point, index) => {
    const canvasPoint = worldToCanvas(viewport, width, height, point.x, point.y);
    if (index === 0) ctx.moveTo(canvasPoint.x, canvasPoint.y);
    else ctx.lineTo(canvasPoint.x, canvasPoint.y);
  });
  ctx.closePath();
  if (polygon.fillColor) {
    ctx.fillStyle = polygon.fillColor;
    ctx.fill();
  }
  ctx.strokeStyle = polygon.color ?? "#e57b49";
  ctx.lineWidth = polygon.lineWidth ?? 3;
  ctx.stroke();
  ctx.restore();
}

function drawEllipseShape(ctx, viewport, width, height, ellipse) {
  const center = worldToCanvas(viewport, width, height, ellipse.center.x, ellipse.center.y);
  const { scaleX, scaleY } = getScale(viewport, width, height);
  const radiusX = ellipse.radiusX * scaleX;
  const radiusY = ellipse.radiusY * scaleY;

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(center.x, center.y, radiusX, radiusY, ellipse.rotation ?? 0, 0, Math.PI * 2);
  if (ellipse.fillColor) {
    ctx.fillStyle = ellipse.fillColor;
    ctx.fill();
  }
  ctx.strokeStyle = ellipse.color ?? "#8f6f3b";
  ctx.lineWidth = ellipse.lineWidth ?? 3;
  ctx.stroke();
  ctx.restore();
}

function drawPolyline(ctx, viewport, width, height, curve) {
  if (!curve.points?.length) return;

  ctx.save();
  ctx.beginPath();
  curve.points.forEach((point, index) => {
    const canvasPoint = worldToCanvas(viewport, width, height, point.x, point.y);
    if (index === 0) ctx.moveTo(canvasPoint.x, canvasPoint.y);
    else ctx.lineTo(canvasPoint.x, canvasPoint.y);
  });
  ctx.strokeStyle = curve.color ?? "#1d6fa5";
  ctx.lineWidth = curve.lineWidth ?? 3;
  ctx.stroke();
  ctx.restore();
}

function drawPoint(ctx, viewport, width, height, point) {
  const canvasPoint = worldToCanvas(viewport, width, height, point.x, point.y);
  ctx.save();
  ctx.fillStyle = point.color ?? "#f97316";
  ctx.beginPath();
  ctx.arc(canvasPoint.x, canvasPoint.y, point.radius ?? 5, 0, Math.PI * 2);
  ctx.fill();
  if (point.label) {
    ctx.fillStyle = "rgba(19, 45, 74, 0.92)";
    ctx.font = '12px "Avenir Next", "PingFang SC", sans-serif';
    ctx.fillText(point.label, canvasPoint.x + 10, canvasPoint.y - 10);
  }
  ctx.restore();
}

function drawSegment(ctx, viewport, width, height, segment) {
  const from = worldToCanvas(viewport, width, height, segment.from.x, segment.from.y);
  const to = worldToCanvas(viewport, width, height, segment.to.x, segment.to.y);

  ctx.save();
  if (segment.dashed) ctx.setLineDash([10, 8]);
  ctx.strokeStyle = segment.color ?? "rgba(244, 114, 24, 0.86)";
  ctx.lineWidth = segment.lineWidth ?? 2;
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.setLineDash([]);
  if (segment.label) {
    ctx.fillStyle = ctx.strokeStyle;
    ctx.font = '12px "Avenir Next", "PingFang SC", sans-serif';
    ctx.fillText(segment.label, (from.x + to.x) / 2 + 8, (from.y + to.y) / 2 - 8);
  }
  ctx.restore();
}

function drawCircle(ctx, viewport, width, height, circle) {
  const center = worldToCanvas(viewport, width, height, circle.center.x, circle.center.y);
  const { scaleX, scaleY } = getScale(viewport, width, height);
  const radius = circle.radius * Math.min(scaleX, scaleY);

  ctx.save();
  ctx.strokeStyle = circle.color ?? "#8b5cf6";
  ctx.lineWidth = circle.lineWidth ?? 3;
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawInfiniteLine(ctx, viewport, width, height, line) {
  const [startPoint, endPoint] = line.points ?? [line.from, line.to];
  if (!startPoint || !endPoint) return;

  const start = worldToCanvas(viewport, width, height, startPoint.x, startPoint.y);
  const end = worldToCanvas(viewport, width, height, endPoint.x, endPoint.y);

  ctx.save();
  if (line.dashed) ctx.setLineDash([10, 8]);
  ctx.strokeStyle = line.color ?? "#1d6fa5";
  ctx.lineWidth = line.lineWidth ?? 3;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function drawLabel(ctx, viewport, width, height, label) {
  const point = worldToCanvas(viewport, width, height, label.x, label.y);
  ctx.save();
  ctx.fillStyle = label.color ?? "rgba(19, 45, 74, 0.92)";
  ctx.font = '13px "Avenir Next", "PingFang SC", sans-serif';
  ctx.fillText(label.text, point.x + (label.dx ?? 0), point.y + (label.dy ?? 0));
  ctx.restore();
}

export function resizeCanvas(canvas, height = 680) {
  const width = canvas.parentElement.clientWidth;
  const responsiveHeight = resolveCanvasHeight(height, window.innerWidth || width);
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(responsiveHeight * dpr);
  canvas.style.height = `${responsiveHeight}px`;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

export function resolveCanvasHeight(baseHeight = 680, viewportWidth = 1440) {
  if (viewportWidth <= 480) {
    return Math.min(baseHeight, Math.max(320, Math.round(viewportWidth * 0.96)));
  }

  if (viewportWidth <= 920) {
    return Math.min(baseHeight, 520);
  }

  return baseHeight;
}

export function renderCanvas(ctx, canvas, view, drawModel = {}) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const viewport = view.viewport;

  ctx.clearRect(0, 0, width, height);

  if (view.showGrid !== false) {
    drawGrid(ctx, viewport, width, height);
  }

  if (view.showAxes !== false) {
    drawAxes(ctx, viewport, width, height);
  }

  (drawModel.curves ?? []).forEach((curve) => drawPolyline(ctx, viewport, width, height, curve));
  (drawModel.lines ?? []).forEach((line) => drawInfiniteLine(ctx, viewport, width, height, line));
  (drawModel.circles ?? []).forEach((circle) => drawCircle(ctx, viewport, width, height, circle));
  (drawModel.ellipses ?? []).forEach((ellipse) => drawEllipseShape(ctx, viewport, width, height, ellipse));
  (drawModel.polygons ?? []).forEach((polygon) => drawPolygon(ctx, viewport, width, height, polygon));
  (drawModel.points ?? []).forEach((point) => drawPoint(ctx, viewport, width, height, point));
  (drawModel.segments ?? []).forEach((segment) => drawSegment(ctx, viewport, width, height, segment));
  (drawModel.labels ?? []).forEach((label) => drawLabel(ctx, viewport, width, height, label));
}
