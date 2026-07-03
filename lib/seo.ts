import type { Metadata } from "next";

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: `${input.title} | 小智 Xiaozhi`,
    description: input.description,
    alternates: {
      canonical: input.path,
    },
  };
}
