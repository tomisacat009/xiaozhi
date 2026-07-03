import type { Metadata } from "next";

import { SubjectPageView } from "@/features/subjects/subject-page";
import { getAllSubjects, getSubjectBySlug } from "@/lib/content/loaders";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}): Promise<Metadata> {
  const { subjectSlug } = await params;
  const subject = getSubjectBySlug(subjectSlug);

  if (!subject) {
    return buildPageMetadata({
      title: "学科",
      description: "学科内容页",
      path: `/subjects/${subjectSlug}`,
    });
  }

  return buildPageMetadata({
    title: subject.nameZh,
    description: subject.summary,
    path: `/subjects/${subject.slug}`,
  });
}

export function generateStaticParams() {
  return getAllSubjects().map((subject) => ({
    subjectSlug: subject.slug,
  }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const resolved = await params;

  return <SubjectPageView {...resolved} />;
}
