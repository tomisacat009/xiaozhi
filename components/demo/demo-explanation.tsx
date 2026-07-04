export function DemoExplanation({ lines }: { lines: string[] }) {
  return (
    <section className="contentCard demoPanel" aria-labelledby="demo-explanation-title">
      <div className="contentCard__meta">
        <span>观察提示</span>
        <span>{lines.length} 条线索</span>
      </div>
      <h2 id="demo-explanation-title">理解线索</h2>
      {lines.length > 0 ? (
        <ul className="demoExplanationList">
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
