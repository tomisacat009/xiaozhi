import Link from "next/link";

import type { Subject } from "@/lib/content/types";

export function SubjectGrid({ subjects }: { subjects: Subject[] }) {
  return (
    <section className="subjectGridSection" aria-labelledby="subject-grid-title">
      <div className="sectionHeading">
        <p className="sectionHeading__eyebrow">Subject Entry</p>
        <h2 id="subject-grid-title">从学科入口开始搭建知识图谱</h2>
      </div>
      <div className="subjectGrid">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            href={`/subjects/${subject.slug}`}
            className="subjectCard"
            data-theme={subject.theme}
          >
            <div className="subjectCard__meta">
              <span>{subject.nameEn}</span>
              <span>{subject.slug}</span>
            </div>
            <h3>{subject.nameZh}</h3>
            <p>{subject.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
