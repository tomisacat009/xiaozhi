import { Hero } from "@/components/home/hero";
import { SubjectGrid } from "@/components/home/subject-grid";
import { PageShell } from "@/components/layout/page-shell";
import {
  getAllModules,
  getAllSubjects,
  getAllUnits,
  getLearningPathsBySubject,
} from "@/lib/content/loaders";

export default function HomePage() {
  const subjects = getAllSubjects();
  const modules = getAllModules();
  const units = getAllUnits();
  const learningPathCount = subjects.reduce(
    (count, subject) => count + getLearningPathsBySubject(subject.id).length,
    0,
  );
  const subjectEntries = subjects.map((subject) => ({
    ...subject,
    moduleCount: modules.filter((module) => module.subjectId === subject.id).length,
    unitCount: units.filter((unit) => unit.subjectId === subject.id).length,
    learningPathCount: getLearningPathsBySubject(subject.id).length,
  }));

  return (
    <PageShell>
      <Hero
        stats={{
          subjectCount: subjects.length,
          moduleCount: modules.length,
          unitCount: units.length,
          learningPathCount,
        }}
      />
      <SubjectGrid subjects={subjectEntries} />
    </PageShell>
  );
}
