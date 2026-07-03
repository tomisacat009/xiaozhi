import type { PlotPoint } from "@/engine/core/math";

function clampRange(min: number, max: number) {
  if (min === max) {
    return {
      min: min - 1,
      max: max + 1,
    };
  }

  return { min, max };
}

function roundLabel(value: number) {
  return Number(value.toFixed(2)).toString();
}

export function QuadraticSvg({ points }: { points: PlotPoint[] }) {
  const xValues = points.map((point) => point.x);
  const yValues = points.map((point) => point.y);

  const xRange = clampRange(Math.min(...xValues), Math.max(...xValues));
  const yRange = clampRange(Math.min(...yValues), Math.max(...yValues));

  const width = xRange.max - xRange.min;
  const height = yRange.max - yRange.min;
  const padding = 24;
  const viewBoxWidth = 360;
  const viewBoxHeight = 320;
  const innerWidth = viewBoxWidth - padding * 2;
  const innerHeight = viewBoxHeight - padding * 2;

  function mapX(x: number) {
    return padding + ((x - xRange.min) / width) * innerWidth;
  }

  function mapY(y: number) {
    return viewBoxHeight - padding - ((y - yRange.min) / height) * innerHeight;
  }

  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${mapX(point.x)} ${mapY(point.y)}`)
    .join(" ");

  const zeroX =
    xRange.min <= 0 && xRange.max >= 0 ? mapX(0) : undefined;
  const zeroY =
    yRange.min <= 0 && yRange.max >= 0 ? mapY(0) : undefined;

  return (
    <figure className="quadraticViz">
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="quadraticViz__svg"
        role="img"
        aria-label="二次函数图像"
      >
        <rect
          x="0"
          y="0"
          width={viewBoxWidth}
          height={viewBoxHeight}
          rx="28"
          fill="url(#quadratic-surface)"
        />
        <defs>
          <linearGradient id="quadratic-surface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff7ed" />
            <stop offset="100%" stopColor="#eff6ff" />
          </linearGradient>
        </defs>

        {zeroY ? (
          <line
            x1={padding}
            x2={viewBoxWidth - padding}
            y1={zeroY}
            y2={zeroY}
            className="quadraticViz__axis"
          />
        ) : null}
        {zeroX ? (
          <line
            x1={zeroX}
            x2={zeroX}
            y1={padding}
            y2={viewBoxHeight - padding}
            className="quadraticViz__axis"
          />
        ) : null}

        <path d={pathData} className="quadraticViz__curve" />

        {points.filter((point) => point.x % 5 === 0).map((point) => (
          <circle
            key={`${point.x}-${point.y}`}
            cx={mapX(point.x)}
            cy={mapY(point.y)}
            r="3"
            className="quadraticViz__marker"
          />
        ))}
      </svg>
      <figcaption className="quadraticViz__legend">
        <span>x 范围：{roundLabel(xRange.min)} 到 {roundLabel(xRange.max)}</span>
        <span>y 范围：{roundLabel(yRange.min)} 到 {roundLabel(yRange.max)}</span>
      </figcaption>
    </figure>
  );
}
