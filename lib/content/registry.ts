import { modules } from "@/content/modules";
import { subjects } from "@/content/subjects";
import type { Module, Subject } from "@/lib/content/types";

function indexBySlug<T extends { slug: string }>(items: readonly T[]) {
  return new Map(items.map((item) => [item.slug, item]));
}

function indexModulesBySubject(items: readonly Module[]) {
  const modulesBySubject = new Map<string, Module[]>();

  for (const module of items) {
    const bucket = modulesBySubject.get(module.subjectId);

    if (bucket) {
      bucket.push(module);
      continue;
    }

    modulesBySubject.set(module.subjectId, [module]);
  }

  for (const bucket of modulesBySubject.values()) {
    bucket.sort((left, right) => left.order - right.order);
  }

  return modulesBySubject;
}

export const subjectRegistry: readonly Subject[] = subjects;
export const moduleRegistry: readonly Module[] = modules;
export const subjectsBySlug = indexBySlug(subjectRegistry);
export const modulesBySubjectId = indexModulesBySubject(moduleRegistry);
