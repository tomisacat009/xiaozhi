export function Hero({
  stats,
}: {
  stats: {
    subjectCount: number;
    moduleCount: number;
    unitCount: number;
    learningPathCount: number;
  };
}) {
  return (
    <section className="hero" aria-labelledby="home-hero-title">
      <div className="hero__content">
        <p className="hero__eyebrow">面向高中的图形化学习</p>
        <h1 id="home-hero-title">小智 Xiaozhi</h1>
        <p className="hero__copy">
          用更清晰的结构、图示与演示，把高中阶段的重要知识点串成能理解、
          能回忆、能迁移的认知地图。
        </p>
        <ul className="hero__highlights">
          <li>把公式、图像、结构和题感放回同一条理解链</li>
          <li>每个知识点都尽量对应一个可观察、可操作的演示入口</li>
          <li>同时照顾电脑端浏览器访问和手机端碎片化复盘</li>
        </ul>
      </div>

      <div className="hero__stats" aria-label="站点内容规模">
        <article className="heroStat">
          <strong>{stats.subjectCount}</strong>
          <span>学科主线</span>
        </article>
        <article className="heroStat">
          <strong>{stats.moduleCount}</strong>
          <span>知识模块</span>
        </article>
        <article className="heroStat">
          <strong>{stats.unitCount}</strong>
          <span>知识点</span>
        </article>
        <article className="heroStat">
          <strong>{stats.learningPathCount}</strong>
          <span>推荐路径</span>
        </article>
      </div>
    </section>
  );
}
