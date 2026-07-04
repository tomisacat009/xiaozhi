type NetworkNode = {
  id: string;
  title: string;
  summary: string;
  accent: string;
  note?: string;
};

export function NetworkDiagram({
  title,
  focus,
  center,
  branches,
}: {
  title: string;
  focus: string;
  center: NetworkNode;
  branches: NetworkNode[];
}) {
  return (
    <figure className="networkDiagram" aria-label={title}>
      <div className="networkDiagram__header">
        <strong>{title}</strong>
        <span>{focus}</span>
      </div>
      <div className="networkDiagram__body">
        <article
          className="networkDiagram__center"
          style={{ borderColor: center.accent, backgroundColor: `${center.accent}14` }}
        >
          <small>核心节点</small>
          <h3>{center.title}</h3>
          <p>{center.summary}</p>
          {center.note ? <span>{center.note}</span> : null}
        </article>
        <div className="networkDiagram__branches">
          {branches.map((branch) => (
            <article
              key={branch.id}
              className="networkDiagram__branch"
              style={{ borderColor: branch.accent }}
            >
              <h3>{branch.title}</h3>
              <p>{branch.summary}</p>
              {branch.note ? <span>{branch.note}</span> : null}
            </article>
          ))}
        </div>
      </div>
    </figure>
  );
}
