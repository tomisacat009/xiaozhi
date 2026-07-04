type TimelinePoint = {
  id: string;
  label: string;
  summary: string;
  accent: string;
};

export function TimelineDiagram({
  title,
  sentence,
  translation,
  focus,
  points,
}: {
  title: string;
  sentence: string;
  translation: string;
  focus: string;
  points: TimelinePoint[];
}) {
  return (
    <figure className="timelineDiagram" aria-label={title}>
      <div className="timelineDiagram__hero">
        <strong>{title}</strong>
        <p>{focus}</p>
        <blockquote>
          <span>{sentence}</span>
          <footer>{translation}</footer>
        </blockquote>
      </div>
      <div className="timelineDiagram__rail" />
      <div className="timelineDiagram__points">
        {points.map((point) => (
          <article key={point.id} className="timelineDiagram__point">
            <i style={{ backgroundColor: point.accent }} />
            <h3>{point.label}</h3>
            <p>{point.summary}</p>
          </article>
        ))}
      </div>
    </figure>
  );
}
