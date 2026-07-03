import type { ReactNode } from "react";

export function DemoStage({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="contentCard demoStageCard" aria-labelledby="demo-stage-title">
      <div className="contentCard__meta">
        <span>Demo Stage</span>
        <span>Interactive Graph</span>
      </div>
      <div>
        <h2 id="demo-stage-title">{title}</h2>
        <p className="contentSection__summary">
          拖动参数后，观察图像形态、位置与关键性质如何一起变化。
        </p>
      </div>
      <div className="demoStageCard__canvas">{children}</div>
    </section>
  );
}
