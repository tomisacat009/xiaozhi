type RelationNote = {
  id: string;
  title: string;
  summary: string;
  accent: string;
};

export function SetRelationDiagram({
  title,
  focus,
  mode,
  notes,
}: {
  title: string;
  focus: string;
  mode: "element" | "subset";
  notes: RelationNote[];
}) {
  return (
    <figure className="setRelationDiagram" aria-label={title}>
      <div className="setRelationDiagram__header">
        <strong>{title}</strong>
        <span>{focus}</span>
      </div>
      <div className="setRelationDiagram__body">
        <svg
          className="setRelationDiagram__svg"
          viewBox="0 0 360 240"
          role="img"
          aria-label={title}
        >
          <rect x="16" y="16" width="328" height="208" rx="24" className="setRelationDiagram__universe" />
          <text x="32" y="42" className="setRelationDiagram__universeLabel">
            U
          </text>
          {mode === "element" ? (
            <>
              <circle cx="170" cy="124" r="74" className="setRelationDiagram__set setRelationDiagram__set--a" />
              <circle cx="150" cy="118" r="8" className="setRelationDiagram__point setRelationDiagram__point--inside" />
              <circle cx="272" cy="158" r="8" className="setRelationDiagram__point setRelationDiagram__point--outside" />
              <text x="196" y="94" className="setRelationDiagram__setLabel">
                A
              </text>
              <text x="130" y="145" className="setRelationDiagram__pointLabel">
                x 属于 A
              </text>
              <text x="246" y="185" className="setRelationDiagram__pointLabel">
                y 不属于 A
              </text>
            </>
          ) : (
            <>
              <circle cx="180" cy="120" r="82" className="setRelationDiagram__set setRelationDiagram__set--a" />
              <circle cx="180" cy="120" r="42" className="setRelationDiagram__set setRelationDiagram__set--b" />
              <text x="236" y="78" className="setRelationDiagram__setLabel">
                A
              </text>
              <text x="174" y="126" className="setRelationDiagram__setLabel">
                B
              </text>
              <text x="118" y="198" className="setRelationDiagram__pointLabel">
                B 是 A 的子集
              </text>
            </>
          )}
        </svg>
        <div className="setRelationDiagram__notes">
          {notes.map((note) => (
            <article
              key={note.id}
              className="setRelationDiagram__note"
              style={{ borderColor: note.accent, backgroundColor: `${note.accent}14` }}
            >
              <h3>{note.title}</h3>
              <p>{note.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </figure>
  );
}
