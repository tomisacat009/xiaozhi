import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { PageShell } from "@/components/layout/page-shell";
import {
  getLearningPathsBySubject,
  getModulesBySubject,
  getSubjectBySlug,
} from "@/lib/content/loaders";

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
  const learningPaths = getLearningPathsBySubject(subject.id);

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

      {learningPaths.length > 0 ? (
        <section
          className="contentSection"
          aria-labelledby="subject-learning-paths-title"
        >
          <div className="sectionHeading">
            <p className="sectionHeading__eyebrow">Learning Paths</p>
            <h2 id="subject-learning-paths-title">推荐学习路径</h2>
          </div>
          <div className="contentGrid">
            {learningPaths.map((pathEntry) => (
              <article key={pathEntry.id} className="contentCard">
                <div className="contentCard__meta">
                  <span>Path</span>
                  <span>{pathEntry.order}</span>
                </div>
                <h3>{pathEntry.title}</h3>
                <p>{pathEntry.summary}</p>
                <ul className="contentCard__chips">
                  {pathEntry.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
