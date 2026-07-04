import type { MetadataRoute } from "next";

import { getAllSubjects } from "@/lib/content/loaders";
import { buildUnitPath } from "@/lib/routes";
import { withBasePath } from "@/lib/site";

import { getAllUnitEntries } from "@/features/knowledge/unit-page";

export const dynamic = "force-static";

function resolveSiteUrl() {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  return rawSiteUrl.endsWith("/") ? rawSiteUrl.slice(0, -1) : rawSiteUrl;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = resolveSiteUrl();

  const subjectEntries = getAllSubjects().map((subject) => ({
    url: `${siteUrl}${withBasePath(`/subjects/${subject.slug}`)}`,
  }));

  const unitEntries = getAllUnitEntries().map((unit) => ({
    url: `${siteUrl}${withBasePath(buildUnitPath(unit))}`,
  }));

  return [{ url: `${siteUrl}${withBasePath("/")}` }, ...subjectEntries, ...unitEntries];
}
