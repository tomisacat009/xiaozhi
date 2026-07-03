import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { PageShell } from "@/components/layout/page-shell";
import { getModulesBySubject, getSubjectBySlug } from "@/lib/content/loaders";
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
          <p className="sectionHeading__eyebrow">Module</p>
          <h1>{moduleEntry.title}</h1>
          <p className="contentSection__summary">{moduleEntry.summary}</p>
        </div>
      </section>

      <section className="contentSection" aria-labelledby="module-units-title">
        <div className="sectionHeading">
          <p className="sectionHeading__eyebrow">Knowledge Units</p>
          <h2 id="module-units-title">当前模块的知识点入口</h2>
        </div>
        {units.length > 0 ? (
          <div className="contentGrid">
            {units.map((unit) => (
              <Link
                key={unit.unitSlug}
                href={buildUnitPath(unit)}
                className="contentCard"
              >
                <div className="contentCard__meta">
                  <span>Knowledge Unit</span>
                  <span>图形化讲解</span>
                </div>
                <h3>{unit.title}</h3>
                <p>{unit.summary}</p>
                <p className="contentSection__summary">{unit.unitSlug}</p>
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
