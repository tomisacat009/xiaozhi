import {
  solidRotationFeatures,
  solidSectionFeatures,
} from "../../assets/math-viz-core.mjs";

const SOLID_LABELS = {
  prism: "四棱柱",
  pyramid: "四棱锥",
  cylinder: "圆柱",
  cone: "圆锥",
};

function formatNumber(value, digits = 2) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value)
    .toFixed(digits)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function makeSegment(from, to, color = "#8f6f3b", lineWidth = 3, dashed = false, label) {
  return { from, to, color, lineWidth, dashed, label };
}

function makeQuad(a, b, c, d, color = "#8f6f3b", fillColor) {
  return {
    points: [a, b, c, d],
    color,
    fillColor,
    lineWidth: 3,
  };
}

function buildRectSolidScene(solidType, sliceRatio) {
  const left = 10;
  const bottom = 18;
  const solidHeight = 50;
  const baseWidth = 20;
  const depthX = 6;
  const depthY = 6;
  const top = bottom + solidHeight;
  const sliceY = bottom + solidHeight * (1 - sliceRatio);

  const frontTopLeft = { x: left, y: top };
  const frontTopRight = { x: left + baseWidth, y: top };
  const frontBottomLeft = { x: left, y: bottom };
  const frontBottomRight = { x: left + baseWidth, y: bottom };
  const backTopLeft = { x: left + depthX, y: top + depthY };
  const backTopRight = { x: left + baseWidth + depthX, y: top + depthY };
  const backBottomLeft = { x: left + depthX, y: bottom + depthY };
  const backBottomRight = { x: left + baseWidth + depthX, y: bottom + depthY };

  const segments = [];
  const polygons = [];

  segments.push(
    makeSegment(frontTopLeft, frontTopRight),
    makeSegment(frontTopRight, frontBottomRight),
    makeSegment(frontBottomRight, frontBottomLeft),
    makeSegment(frontBottomLeft, frontTopLeft),
  );

  if (solidType === "prism") {
    segments.push(
      makeSegment(backTopLeft, backTopRight),
      makeSegment(backTopRight, backBottomRight),
      makeSegment(backBottomRight, backBottomLeft),
      makeSegment(backBottomLeft, backTopLeft),
      makeSegment(frontTopLeft, backTopLeft),
      makeSegment(frontTopRight, backTopRight),
      makeSegment(frontBottomLeft, backBottomLeft),
      makeSegment(frontBottomRight, backBottomRight),
    );
  } else {
    const apex = { x: left + baseWidth / 2 + depthX / 2, y: top + solidHeight * 0.34 };
    segments.push(
      makeSegment(frontTopLeft, apex),
      makeSegment(frontTopRight, apex),
      makeSegment(frontBottomLeft, apex),
      makeSegment(frontBottomRight, apex),
    );
  }

  const scale = solidType === "prism" ? 1 : Math.max(1 - sliceRatio, 0.08);
  const sectionWidth = baseWidth * scale;
  const sectionLeft = left + (baseWidth - sectionWidth) / 2;
  polygons.push(
    makeQuad(
      { x: sectionLeft, y: sliceY },
      { x: sectionLeft + sectionWidth, y: sliceY },
      { x: sectionLeft + sectionWidth + depthX, y: sliceY + depthY },
      { x: sectionLeft + depthX, y: sliceY + depthY },
      "#e57b49",
      "rgba(229,123,73,0.28)",
    ),
  );

  return { segments, polygons };
}

function buildRoundSolidScene(solidType, sliceRatio) {
  const centerX = 20;
  const radiusX = 10;
  const radiusY = 3.6;
  const bottom = 18;
  const solidHeight = 50;
  const top = bottom + solidHeight;
  const sliceY = bottom + solidHeight * (1 - sliceRatio);
  const segments = [];
  const ellipses = [];

  if (solidType === "cylinder") {
    ellipses.push(
      { center: { x: centerX, y: top }, radiusX, radiusY, color: "#8f6f3b", lineWidth: 3 },
      { center: { x: centerX, y: bottom }, radiusX, radiusY, color: "#8f6f3b", lineWidth: 3 },
    );
    segments.push(
      makeSegment({ x: centerX - radiusX, y: top }, { x: centerX - radiusX, y: bottom }),
      makeSegment({ x: centerX + radiusX, y: top }, { x: centerX + radiusX, y: bottom }),
    );
  } else {
    const apex = { x: centerX, y: top + solidHeight * 0.22 };
    ellipses.push(
      { center: { x: centerX, y: bottom }, radiusX, radiusY, color: "#8f6f3b", lineWidth: 3 },
    );
    segments.push(
      makeSegment({ x: centerX - radiusX, y: bottom }, apex),
      makeSegment({ x: centerX + radiusX, y: bottom }, apex),
    );
  }

  const scale = solidType === "cylinder" ? 1 : Math.max(1 - sliceRatio, 0.08);
  ellipses.push({
    center: { x: centerX, y: sliceY },
    radiusX: radiusX * scale,
    radiusY: radiusY * Math.max(scale, 0.45),
    color: "#e57b49",
    fillColor: "rgba(229,123,73,0.28)",
    lineWidth: 3,
  });

  return { segments, ellipses };
}

function buildPreviewShapes(features, size) {
  if (features.shape === "正方形") {
    const side = 12 * (features.sectionSize / Math.max(size, 0.1));
    return {
      polygons: [
        makeQuad(
          { x: 75 - side / 2, y: 50 - side / 2 },
          { x: 75 + side / 2, y: 50 - side / 2 },
          { x: 75 + side / 2, y: 50 + side / 2 },
          { x: 75 - side / 2, y: 50 + side / 2 },
          "#e57b49",
          "rgba(229,123,73,0.2)",
        ),
      ],
      circles: [],
    };
  }

  return {
    polygons: [],
    circles: [
      {
        center: { x: 75, y: 50 },
        radius: 6 * (features.sectionRadius / Math.max(size, 0.1)),
        color: "#e57b49",
        lineWidth: 4,
      },
    ],
  };
}

export function createSolidCard(title, conclusion, observation, warning, highlight = false) {
  return {
    title,
    conclusion,
    observation,
    warning,
    highlight,
  };
}

export function buildSolidTeachingItems(items) {
  return items.map((item) => ({
    title: item.title,
    value: item.value,
    badges: item.badges ?? [],
    text: item.text ?? "",
  }));
}

export function buildSolidStudentSummary(features) {
  if (features.areaTrend === "保持不变") {
    return "柱体类平行底面的截面不会越切越小，大小会一直保持不变。";
  }
  return "锥体类越往上切，截面会越小，直到靠近顶点时慢慢收缩。";
}

export function buildSolidSectionModel({ solidType, size, height, sliceRatio }) {
  const features = solidSectionFeatures(solidType, size, height, sliceRatio);
  const label = SOLID_LABELS[solidType] ?? solidType;
  const rectScene = solidType === "prism" || solidType === "pyramid"
    ? buildRectSolidScene(solidType, sliceRatio)
    : { segments: [], polygons: [] };
  const roundScene = solidType === "cylinder" || solidType === "cone"
    ? buildRoundSolidScene(solidType, sliceRatio)
    : { segments: [], ellipses: [] };
  const preview = buildPreviewShapes(features, size);

  return {
    derived: {
      equation: `${label} · 底面尺寸 ${formatNumber(size)} · 高 ${formatNumber(height)} · 截面位置 ${formatNumber(sliceRatio, 1)}`,
      solidLabel: label,
      features,
    },
    view: {
      viewport: { xMin: 0, xMax: 100, yMin: 0, yMax: 100 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      segments: [
        ...rectScene.segments,
        ...roundScene.segments,
      ],
      polygons: [
        ...rectScene.polygons,
        ...preview.polygons,
      ],
      ellipses: [
        ...(roundScene.ellipses ?? []),
      ],
      circles: [
        ...preview.circles,
      ],
      labels: [
        { x: 75, y: 78, text: "截面预览", color: "rgba(53,45,35,0.88)", dx: -18, dy: 0 },
      ],
    },
  };
}

export function buildSolidRotationModel({ profileType, radius, height }) {
  const features = solidRotationFeatures(profileType, radius, height);
  const profileLeft = 14;
  const axisX = 36;
  const bottom = 24;
  const top = bottom + Math.min(features.height * 6, 44);
  const previewCenterX = 74;
  const previewCenterY = 48;
  const previewRadiusX = Math.min(features.radius * 3, 16);
  const previewRadiusY = Math.max(previewRadiusX * 0.34, 4);
  const polygons = [];
  const segments = [
    makeSegment({ x: axisX, y: 18 }, { x: axisX, y: 82 }, "#6b7280", 2, true, "旋转轴"),
  ];
  const ellipses = [];
  const circles = [];

  if (profileType === "triangle") {
    polygons.push({
      points: [
        { x: profileLeft, y: bottom },
        { x: axisX, y: bottom },
        { x: axisX, y: top },
      ],
      color: "#2f855a",
      fillColor: "rgba(47,133,90,0.18)",
      lineWidth: 3,
    });
    segments.push(
      makeSegment({ x: previewCenterX - previewRadiusX, y: previewCenterY + 18 }, { x: previewCenterX, y: previewCenterY - 20 }),
      makeSegment({ x: previewCenterX + previewRadiusX, y: previewCenterY + 18 }, { x: previewCenterX, y: previewCenterY - 20 }),
    );
    ellipses.push({
      center: { x: previewCenterX, y: previewCenterY + 18 },
      radiusX: previewRadiusX,
      radiusY: previewRadiusY,
      color: "#8f6f3b",
      lineWidth: 3,
    });
  } else if (profileType === "semicircle") {
    circles.push({
      center: { x: previewCenterX, y: previewCenterY },
      radius: Math.min(features.radius * 3, 18),
      color: "#8f6f3b",
      lineWidth: 4,
    });
    ellipses.push({
      center: { x: previewCenterX, y: previewCenterY },
      radiusX: Math.min(features.radius * 3, 18),
      radiusY: Math.max(Math.min(features.radius * 3, 18) * 0.45, 5),
      color: "rgba(143,111,59,0.55)",
      lineWidth: 2,
    });
  } else {
    polygons.push({
      points: [
        { x: profileLeft, y: bottom },
        { x: axisX, y: bottom },
        { x: axisX, y: top },
        { x: profileLeft, y: top },
      ],
      color: "#2f855a",
      fillColor: "rgba(47,133,90,0.18)",
      lineWidth: 3,
    });
    ellipses.push(
      {
        center: { x: previewCenterX, y: top - 6 },
        radiusX: previewRadiusX,
        radiusY: previewRadiusY,
        color: "#8f6f3b",
        lineWidth: 3,
      },
      {
        center: { x: previewCenterX, y: bottom + 8 },
        radiusX: previewRadiusX,
        radiusY: previewRadiusY,
        color: "#8f6f3b",
        lineWidth: 3,
      },
    );
    segments.push(
      makeSegment({ x: previewCenterX - previewRadiusX, y: top - 6 }, { x: previewCenterX - previewRadiusX, y: bottom + 8 }),
      makeSegment({ x: previewCenterX + previewRadiusX, y: top - 6 }, { x: previewCenterX + previewRadiusX, y: bottom + 8 }),
    );
  }

  return {
    derived: {
      equation: `${features.solidName} · 半径 ${formatNumber(features.radius)} · 高 ${formatNumber(features.height)}`,
      solidName: features.solidName,
      features,
    },
    view: {
      viewport: { xMin: 0, xMax: 100, yMin: 0, yMax: 100 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      polygons,
      segments,
      ellipses,
      circles,
      labels: [
        { x: 18, y: 84, text: "平面图形", color: "rgba(53,45,35,0.88)", dx: 0, dy: 0 },
        { x: 66, y: 84, text: "旋转后立体", color: "rgba(53,45,35,0.88)", dx: 0, dy: 0 },
      ],
    },
  };
}
