import type { MetadataRoute } from "next";

import { getAllSubjects } from "@/lib/content/loaders";
import { buildUnitPath } from "@/lib/routes";

import { getAllUnitEntries } from "@/features/knowledge/unit-page";

function resolveSiteUrl() {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  return rawSiteUrl.endsWith("/") ? rawSiteUrl.slice(0, -1) : rawSiteUrl;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = resolveSiteUrl();

  const subjectEntries = getAllSubjects().map((subject) => ({
    url: `${siteUrl}/subjects/${subject.slug}`,
  }));

  const unitEntries = getAllUnitEntries().map((unit) => ({
    url: `${siteUrl}${buildUnitPath(unit)}`,
  }));

  return [{ url: siteUrl }, ...subjectEntries, ...unitEntries];
}
