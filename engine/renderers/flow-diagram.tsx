type FlowStep = {
  id: string;
  title: string;
  summary: string;
  accent: string;
  detail?: string;
};

export function FlowDiagram({
  title,
  focus,
  steps,
}: {
  title: string;
  focus: string;
  steps: FlowStep[];
}) {
  return (
    <figure className="flowDiagram" aria-label={title}>
      <div className="flowDiagram__header">
        <strong>{title}</strong>
        <span>{focus}</span>
      </div>
      <div className="flowDiagram__steps">
        {steps.map((step, index) => (
          <article
            key={step.id}
            className="flowDiagram__step"
            style={{ borderColor: step.accent, backgroundColor: `${step.accent}10` }}
          >
            <div className="flowDiagram__stepTop">
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h3>{step.title}</h3>
            </div>
            <p>{step.summary}</p>
            {step.detail ? <span>{step.detail}</span> : null}
          </article>
        ))}
      </div>
    </figure>
  );
}
