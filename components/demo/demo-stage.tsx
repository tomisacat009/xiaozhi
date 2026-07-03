import type { ReactNode } from "react";

export function DemoStage({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="contentCard" aria-labelledby="demo-stage-title">
      <div className="contentCard__meta">
        <span>Demo Stage</span>
        <span>Task 6 renderer pending</span>
      </div>
      <div>
        <h2 id="demo-stage-title">{title}</h2>
        <p className="contentSection__summary">
          这里保留给后续知识点专属 renderer。当前 shell 仅负责统一布局与状态驱动。
        </p>
      </div>
      <div>{children}</div>
    </section>
  );
}
