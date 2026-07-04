type SentenceSegment = {
  text: string;
  role: string;
  accent: string;
};

type SentenceLayer = {
  id: string;
  label: string;
  summary: string;
  accent: string;
  segments: SentenceSegment[];
};

export function EnglishSentenceDiagram({
  title,
  sentence,
  translation,
  focus,
  layers,
}: {
  title: string;
  sentence: string;
  translation?: string;
  focus: string;
  layers: SentenceLayer[];
}) {
  return (
    <figure className="englishSentenceDiagram" aria-label={title}>
      <div className="englishSentenceDiagram__hero">
        <div className="englishSentenceDiagram__header">
          <strong>{title}</strong>
          <span>{focus}</span>
        </div>
        <blockquote className="englishSentenceDiagram__sentence">
          <p>{sentence}</p>
          {translation ? <footer>{translation}</footer> : null}
        </blockquote>
      </div>
      <div className="englishSentenceDiagram__layers">
        {layers.map((layer) => (
          <article
            key={layer.id}
            className="englishSentenceDiagram__layer"
            style={{ borderColor: layer.accent }}
          >
            <div className="englishSentenceDiagram__layerHead">
              <span
                className="englishSentenceDiagram__badge"
                style={{ backgroundColor: layer.accent }}
              >
                {layer.label}
              </span>
              <p>{layer.summary}</p>
            </div>
            <div className="englishSentenceDiagram__segments">
              {layer.segments.map((segment, index) => (
                <span
                  key={`${layer.id}-${index}-${segment.text}`}
                  className="englishSentenceDiagram__segment"
                  style={{
                    borderColor: segment.accent,
                    backgroundColor: `${segment.accent}18`,
                  }}
                >
                  <strong>{segment.text}</strong>
                  <small>{segment.role}</small>
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </figure>
  );
}
