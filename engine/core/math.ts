export type PlotPoint = {
  x: number;
  y: number;
};

export function sampleQuadratic(
  a: number,
  b: number,
  c: number,
): PlotPoint[] {
  const points: PlotPoint[] = [];

  for (let x = -10; x <= 10; x += 1) {
    points.push({
      x,
      y: a * x * x + b * x + c,
    });
  }

  return points;
}
