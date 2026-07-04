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
        <span>交互演示</span>
        <span>图形观察区</span>
      </div>
      <div>
        <h2 id="demo-stage-title">{title}</h2>
        <p className="contentSection__summary">
          拖动参数或切换场景后，观察结构、关系与关键量如何一起变化。
        </p>
      </div>
      <div className="demoStageCard__canvas">{children}</div>
    </section>
  );
}
