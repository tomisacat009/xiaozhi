import type { Metadata } from "next";

import { ModulePageView } from "@/features/modules/module-page";
import { getAllSubjects, getModulesBySubject, getSubjectBySlug } from "@/lib/content/loaders";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectSlug: string; moduleSlug: string }>;
}): Promise<Metadata> {
  const { subjectSlug, moduleSlug } = await params;
  const subject = getSubjectBySlug(subjectSlug);
  const module = subject
    ? getModulesBySubject(subject.id).find((entry) => entry.slug === moduleSlug)
    : null;

  if (!subject || !module) {
    return buildPageMetadata({
      title: "模块",
      description: "模块内容页",
      path: `/subjects/${subjectSlug}/${moduleSlug}`,
    });
  }

  return buildPageMetadata({
    title: `${subject.nameZh} · ${module.title}`,
    description: module.summary,
    path: `/subjects/${subject.slug}/${module.slug}`,
  });
}

export function generateStaticParams() {
  return getAllSubjects().flatMap((subject) =>
    getModulesBySubject(subject.id).map((module) => ({
      subjectSlug: subject.slug,
      moduleSlug: module.slug,
    })),
  );
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ subjectSlug: string; moduleSlug: string }>;
}) {
  const resolved = await params;

  return <ModulePageView {...resolved} />;
}
