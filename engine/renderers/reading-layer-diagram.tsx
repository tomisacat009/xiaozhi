type ReadingLayerBlock = {
  id: string;
  label: string;
  summary: string;
  accent: string;
  examples: string[];
};

export function ReadingLayerDiagram({
  title,
  excerpt,
  translation,
  layers,
}: {
  title: string;
  excerpt: string;
  translation: string;
  layers: ReadingLayerBlock[];
}) {
  return (
    <figure className="readingLayerDiagram" aria-label={title}>
      <div className="readingLayerDiagram__hero">
        <strong>{title}</strong>
        <blockquote>
          <p>{excerpt}</p>
          <footer>{translation}</footer>
        </blockquote>
      </div>
      <div className="readingLayerDiagram__layers">
        {layers.map((layer) => (
          <article
            key={layer.id}
            className="readingLayerDiagram__layer"
            style={{ borderColor: layer.accent }}
          >
            <div className="readingLayerDiagram__layerHead">
              <span style={{ backgroundColor: layer.accent }}>{layer.label}</span>
              <p>{layer.summary}</p>
            </div>
            <ul>
              {layer.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </figure>
  );
}
