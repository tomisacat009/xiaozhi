import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { PageShell } from "@/components/layout/page-shell";
import { getModulesBySubject, getSubjectBySlug } from "@/lib/content/loaders";

export function SubjectPageView({
  subjectSlug,
}: {
  subjectSlug: string;
}) {
  const subject = getSubjectBySlug(subjectSlug);

  if (!subject) {
    notFound();
  }

  const modules = getModulesBySubject(subject.id);

  return (
    <PageShell>
      <section className="contentSection">
        <Breadcrumbs
          items={[
            { href: "/", label: "首页" },
            { label: subject.nameZh },
          ]}
        />
        <div className="contentSection__hero">
          <p className="sectionHeading__eyebrow">Subject</p>
          <h1>{subject.nameZh}</h1>
          <p className="contentSection__summary">{subject.summary}</p>
        </div>
      </section>

      <section className="contentSection" aria-labelledby="subject-modules-title">
        <div className="sectionHeading">
          <p className="sectionHeading__eyebrow">Modules</p>
          <h2 id="subject-modules-title">从模块进入核心知识结构</h2>
        </div>
        <div className="contentGrid">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={`/subjects/${subject.slug}/${module.slug}`}
              className="contentCard"
            >
              <div className="contentCard__meta">
                <span>Module</span>
                <span>{module.slug}</span>
              </div>
              <h3>{module.title}</h3>
              <p>{module.summary}</p>
              <ul className="contentCard__chips">
                {module.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
