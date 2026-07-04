import Link from "next/link";

import type { Subject } from "@/lib/content/types";

type SubjectEntry = Subject & {
  moduleCount: number;
  unitCount: number;
  learningPathCount: number;
};

export function SubjectGrid({ subjects }: { subjects: SubjectEntry[] }) {
  return (
    <section className="subjectGridSection" aria-labelledby="subject-grid-title">
      <div className="sectionHeading">
        <p className="sectionHeading__eyebrow">学科入口</p>
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
              <span>{subject.moduleCount} 个模块</span>
            </div>
            <h3>{subject.nameZh}</h3>
            <p>{subject.summary}</p>
            <ul className="contentCard__chips">
              <li>{subject.unitCount} 个知识点</li>
              <li>{subject.learningPathCount} 条学习路径</li>
              <li>图形化讲透</li>
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
