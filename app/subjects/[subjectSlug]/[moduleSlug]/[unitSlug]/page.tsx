import type { Metadata } from "next";

import {
  getAllUnitEntries,
  getUnitEntry,
  UnitPageView,
} from "@/features/knowledge/unit-page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    subjectSlug: string;
    moduleSlug: string;
    unitSlug: string;
  }>;
}): Promise<Metadata> {
  const { subjectSlug, moduleSlug, unitSlug } = await params;
  const unit = getUnitEntry(subjectSlug, moduleSlug, unitSlug);

  if (!unit) {
    return buildPageMetadata({
      title: "知识点",
      description: "知识点内容页",
      path: `/subjects/${subjectSlug}/${moduleSlug}/${unitSlug}`,
    });
  }

  return buildPageMetadata({
    title: unit.title,
    description: unit.summary,
    path: `/subjects/${unit.subjectSlug}/${unit.moduleSlug}/${unit.unitSlug}`,
  });
}

export function generateStaticParams() {
  return getAllUnitEntries().map((unit) => ({
    subjectSlug: unit.subjectSlug,
    moduleSlug: unit.moduleSlug,
    unitSlug: unit.unitSlug,
  }));
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{
    subjectSlug: string;
    moduleSlug: string;
    unitSlug: string;
  }>;
}) {
  const resolved = await params;

  return await UnitPageView(resolved);
}
