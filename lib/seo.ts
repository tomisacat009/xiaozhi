import type { Metadata } from "next";

function resolveSiteUrl() {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  return new URL(rawSiteUrl.endsWith("/") ? rawSiteUrl : `${rawSiteUrl}/`);
}

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const metadataBase = resolveSiteUrl();

  return {
    title: `${input.title} | 小智 Xiaozhi`,
    description: input.description,
    metadataBase,
    alternates: {
      canonical: new URL(input.path, metadataBase).toString(),
    },
  };
}
