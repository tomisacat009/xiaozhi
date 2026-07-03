export function DemoExplanation({ lines }: { lines: string[] }) {
  return (
    <section className="contentCard demoPanel" aria-labelledby="demo-explanation-title">
      <div className="contentCard__meta">
        <span>Explanation</span>
        <span>{lines.length} 条观察</span>
      </div>
      <h2 id="demo-explanation-title">观察要点</h2>
      {lines.length > 0 ? (
        <ul className="breadcrumbs__list">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : (
        <p className="contentSection__summary">当前参数还没有生成解释内容。</p>
      )}
    </section>
  );
}
