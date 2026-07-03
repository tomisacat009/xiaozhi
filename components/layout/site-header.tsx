import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="siteHeader__inner">
        <Link href="/" className="siteBrand" aria-label="返回小智首页">
          <span className="siteBrand__mark">X</span>
          <span className="siteBrand__text">
            <strong>小智</strong>
            <span>Xiaozhi</span>
          </span>
        </Link>
        <p className="siteHeader__tagline">高中知识可视化学习站点</p>
      </div>
    </header>
  );
}
