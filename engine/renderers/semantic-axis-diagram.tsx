type SemanticAxisEntry = {
  id: string;
  word: string;
  summary: string;
  accent: string;
};

export function SemanticAxisDiagram({
  title,
  focus,
  lowLabel,
  highLabel,
  entries,
}: {
  title: string;
  focus: string;
  lowLabel: string;
  highLabel: string;
  entries: SemanticAxisEntry[];
}) {
  return (
    <figure className="semanticAxisDiagram" aria-label={title}>
      <div className="semanticAxisDiagram__header">
        <strong>{title}</strong>
        <span>{focus}</span>
      </div>
      <div className="semanticAxisDiagram__axis">
        <small>{lowLabel}</small>
        <div className="semanticAxisDiagram__line" />
        <small>{highLabel}</small>
      </div>
      <div className="semanticAxisDiagram__entries">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="semanticAxisDiagram__entry"
            style={{ borderColor: entry.accent, backgroundColor: `${entry.accent}12` }}
          >
            <h3>{entry.word}</h3>
            <p>{entry.summary}</p>
          </article>
        ))}
      </div>
    </figure>
  );
}
