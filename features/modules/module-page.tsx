import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { PageShell } from "@/components/layout/page-shell";
import { getModulesBySubject, getSubjectBySlug, getUnitByRoute } from "@/lib/content/loaders";
import { buildUnitPath } from "@/lib/routes";

import { getUnitsByModuleRoute } from "@/features/knowledge/unit-page";

export function ModulePageView({
  subjectSlug,
  moduleSlug,
}: {
  subjectSlug: string;
  moduleSlug: string;
}) {
  const subject = getSubjectBySlug(subjectSlug);

  if (!subject) {
    notFound();
  }

  const moduleEntry = getModulesBySubject(subject.id).find(
    (entry) => entry.slug === moduleSlug,
  );

  if (!moduleEntry) {
    notFound();
  }

  const units = getUnitsByModuleRoute(subjectSlug, moduleSlug);
  const unitEntries = units
    .map((unit) => ({
      route: unit,
      meta: getUnitByRoute(subjectSlug, moduleSlug, unit.unitSlug),
    }))
    .filter(
      (
        entry,
      ): entry is {
        route: (typeof units)[number];
        meta: NonNullable<ReturnType<typeof getUnitByRoute>>;
      } => entry.meta !== null,
    );

  return (
    <PageShell>
      <section className="contentSection">
        <Breadcrumbs
          items={[
            { href: "/", label: "首页" },
            { href: `/subjects/${subject.slug}`, label: subject.nameZh },
            { label: moduleEntry.title },
          ]}
        />
        <div className="contentSection__hero">
          <p className="sectionHeading__eyebrow">知识模块</p>
          <h1>{moduleEntry.title}</h1>
          <p className="contentSection__summary">{moduleEntry.summary}</p>
          <ul className="contentCard__chips">
            <li>{units.length} 个知识点</li>
            <li>{moduleEntry.highlights.length} 个学习抓手</li>
            <li>桌面端与手机端兼容</li>
          </ul>
        </div>
      </section>

      <section className="contentSection" aria-labelledby="module-units-title">
        <div className="sectionHeading">
          <p className="sectionHeading__eyebrow">知识点入口</p>
          <h2 id="module-units-title">当前模块的知识点入口</h2>
        </div>
        {units.length > 0 ? (
          <div className="contentGrid">
            {unitEntries.map(({ route, meta }) => (
              <Link
                key={route.unitSlug}
                href={buildUnitPath(route)}
                className="contentCard"
              >
                <div className="contentCard__meta">
                  <span>{meta.difficulty}</span>
                  <span>图形化讲解</span>
                </div>
                <h3>{route.title}</h3>
                <p>{route.summary}</p>
                <p className="contentSection__summary">
                  {meta.coreTakeaways[0] ?? "从图形和结构变化入手建立整体理解。"}
                </p>
                <ul className="contentCard__chips">
                  {meta.keywords.slice(0, 3).map((keyword) => (
                    <li key={keyword}>{keyword}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        ) : (
          <p className="contentEmpty">
            该模块的知识点内容正在建设中，后续会逐步补充。
          </p>
        )}
      </section>
    </PageShell>
  );
}
