type VennNote = {
  id: string;
  title: string;
  summary: string;
  accent: string;
};

export function VennDiagram({
  title,
  focus,
  operation,
  notes,
}: {
  title: string;
  focus: string;
  operation: "intersection" | "union" | "complement";
  notes: VennNote[];
}) {
  const highlight = {
    intersection: "M 180 72 A 76 76 0 0 0 180 168 A 76 76 0 0 0 180 72 Z",
    union: "M 104 120 A 76 76 0 1 0 256 120 A 76 76 0 1 0 104 120 Z",
    complement: "M 24 24 H 336 V 216 H 24 Z M 180 120 m -76 0 a 76 76 0 1 0 152 0 a 76 76 0 1 0 -152 0 Z",
  }[operation];

  return (
    <figure className="vennDiagram" aria-label={title}>
      <div className="vennDiagram__header">
        <strong>{title}</strong>
        <span>{focus}</span>
      </div>
      <div className="vennDiagram__body">
        <svg className="vennDiagram__svg" viewBox="0 0 360 240" role="img" aria-label={title}>
          <defs>
            <clipPath id="venn-universe-cutout">
              <path d={highlight} fillRule="evenodd" clipRule="evenodd" />
            </clipPath>
          </defs>
          <rect x="16" y="16" width="328" height="208" rx="24" className="vennDiagram__universe" />
          {operation === "complement" ? (
            <rect
              x="16"
              y="16"
              width="328"
              height="208"
              rx="24"
              className="vennDiagram__highlight"
              clipPath="url(#venn-universe-cutout)"
            />
          ) : (
            <path d={highlight} className="vennDiagram__highlight" />
          )}
          <circle cx="148" cy="120" r="76" className="vennDiagram__set vennDiagram__set--a" />
          <circle cx="212" cy="120" r="76" className="vennDiagram__set vennDiagram__set--b" />
          <text x="112" y="78" className="vennDiagram__setLabel">
            A
          </text>
          <text x="236" y="78" className="vennDiagram__setLabel">
            B
          </text>
          <text x="28" y="42" className="vennDiagram__universeLabel">
            U
          </text>
          <text x="92" y="196" className="vennDiagram__caption">
            {operation === "intersection"
              ? "同时落在 A 和 B 中"
              : operation === "union"
                ? "落在 A 或 B 中即可"
                : "在全集 U 中，但不属于 A"}
          </text>
        </svg>
        <div className="vennDiagram__notes">
          {notes.map((note) => (
            <article
              key={note.id}
              className="vennDiagram__note"
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
