type PlotPoint = {
  x: number;
  y: number;
};

type PlotSeries = {
  id: string;
  label: string;
  color: string;
  points: PlotPoint[];
  strokeDasharray?: string;
  fillOpacity?: number;
};

type PlotMarker = {
  id: string;
  x: number;
  y: number;
  label?: string;
  color?: string;
};

type PlotBounds = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

function clampRange(min: number, max: number) {
  if (min === max) {
    return { min: min - 1, max: max + 1 };
  }

  return { min, max };
}

function roundLabel(value: number) {
  return Number(value.toFixed(2)).toString();
}

export function CartesianPlot({
  ariaLabel,
  bounds,
  series,
  markers = [],
}: {
  ariaLabel: string;
  bounds: PlotBounds;
  series: PlotSeries[];
  markers?: PlotMarker[];
}) {
  const xRange = clampRange(bounds.xMin, bounds.xMax);
  const yRange = clampRange(bounds.yMin, bounds.yMax);
  const width = xRange.max - xRange.min;
  const height = yRange.max - yRange.min;
  const padding = 30;
  const viewBoxWidth = 420;
  const viewBoxHeight = 300;
  const innerWidth = viewBoxWidth - padding * 2;
  const innerHeight = viewBoxHeight - padding * 2;

  function mapX(x: number) {
    return padding + ((x - xRange.min) / width) * innerWidth;
  }

  function mapY(y: number) {
    return viewBoxHeight - padding - ((y - yRange.min) / height) * innerHeight;
  }

  const zeroX = xRange.min <= 0 && xRange.max >= 0 ? mapX(0) : null;
  const zeroY = yRange.min <= 0 && yRange.max >= 0 ? mapY(0) : null;
  const gridX = Array.from({ length: 5 }, (_, index) => xRange.min + (width / 4) * index);
  const gridY = Array.from({ length: 5 }, (_, index) => yRange.min + (height / 4) * index);

  return (
    <figure className="plotFigure">
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="plotFigure__svg"
        role="img"
        aria-label={ariaLabel}
      >
        <rect
          x="0"
          y="0"
          width={viewBoxWidth}
          height={viewBoxHeight}
          rx="28"
          fill="url(#plot-surface)"
        />
        <defs>
          <linearGradient id="plot-surface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff7ed" />
            <stop offset="100%" stopColor="#eff6ff" />
          </linearGradient>
        </defs>

        {gridX.map((value) => (
          <line
            key={`grid-x-${value}`}
            x1={mapX(value)}
            x2={mapX(value)}
            y1={padding}
            y2={viewBoxHeight - padding}
            className="plotFigure__grid"
          />
        ))}
        {gridY.map((value) => (
          <line
            key={`grid-y-${value}`}
            x1={padding}
            x2={viewBoxWidth - padding}
            y1={mapY(value)}
            y2={mapY(value)}
            className="plotFigure__grid"
          />
        ))}

        {zeroY !== null ? (
          <line
            x1={padding}
            x2={viewBoxWidth - padding}
            y1={zeroY}
            y2={zeroY}
            className="plotFigure__axis"
          />
        ) : null}
        {zeroX !== null ? (
          <line
            x1={zeroX}
            x2={zeroX}
            y1={padding}
            y2={viewBoxHeight - padding}
            className="plotFigure__axis"
          />
        ) : null}

        {series.map((entry) => {
          const pathData = entry.points
            .map((point, index) => `${index === 0 ? "M" : "L"} ${mapX(point.x)} ${mapY(point.y)}`)
            .join(" ");

          return (
            <path
              key={entry.id}
              d={pathData}
              fill="none"
              stroke={entry.color}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={entry.strokeDasharray}
              opacity={entry.fillOpacity ?? 1}
            />
          );
        })}

        {markers.map((marker) => (
          <g key={marker.id}>
            <circle
              cx={mapX(marker.x)}
              cy={mapY(marker.y)}
              r="4.5"
              fill={marker.color ?? "#0f172a"}
            />
            {marker.label ? (
              <text
                x={mapX(marker.x) + 8}
                y={mapY(marker.y) - 8}
                className="plotFigure__label"
              >
                {marker.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>

      <figcaption className="plotFigure__legend">
        <span>x: {roundLabel(xRange.min)} {"->"} {roundLabel(xRange.max)}</span>
        <span>y: {roundLabel(yRange.min)} {"->"} {roundLabel(yRange.max)}</span>
        {series.map((entry) => (
          <span key={entry.id} className="plotFigure__legendItem">
            <i style={{ backgroundColor: entry.color }} />
            {entry.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

export function ConceptBoard({
  title,
  items,
}: {
  title: string;
  items: Array<{
    id: string;
    title: string;
    summary: string;
    accent?: string;
  }>;
}) {
  return (
    <figure className="conceptBoard" aria-label={title}>
      <div className="conceptBoard__header">
        <strong>{title}</strong>
        <span>结构可视化</span>
      </div>
      <div className="conceptBoard__grid">
        {items.map((item) => (
          <article
            key={item.id}
            className="conceptBoard__card"
            style={{ borderColor: item.accent ?? "rgba(148, 163, 184, 0.2)" }}
          >
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </figure>
  );
}
