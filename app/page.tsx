import { Hero } from "@/components/home/hero";
import { SubjectGrid } from "@/components/home/subject-grid";
import { PageShell } from "@/components/layout/page-shell";
import { getAllSubjects } from "@/lib/content/loaders";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <SubjectGrid subjects={getAllSubjects()} />
    </PageShell>
  );
}
