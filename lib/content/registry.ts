import { modules } from "@/content/modules";
import { subjects } from "@/content/subjects";
import type { Module, Subject } from "@/lib/content/types";

type ContentRegistryInput = {
  subjects: readonly Subject[];
  modules: readonly Module[];
};

function indexBySlug<T extends { slug: string }>(
  items: readonly T[],
  label: string,
) {
  const indexedItems = new Map<string, T>();

  for (const item of items) {
    if (indexedItems.has(item.slug)) {
      throw new Error(`Duplicate ${label} slug: ${item.slug}`);
    }

    indexedItems.set(item.slug, item);
  }

  return indexedItems;
}

function indexModulesBySubject(
  items: readonly Module[],
  subjectIds: ReadonlySet<string>,
) {
  const modulesBySubject = new Map<string, Module[]>();

  for (const module of items) {
    if (!subjectIds.has(module.subjectId)) {
      throw new Error(`Unknown module subjectId: ${module.subjectId}`);
    }

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

export function validateContentRegistry(input: ContentRegistryInput) {
  const subjectIds = new Set(input.subjects.map((subject) => subject.id));

  indexBySlug(input.subjects, "subject");
  indexBySlug(input.modules, "module");
  indexModulesBySubject(input.modules, subjectIds);
}

validateContentRegistry({
  subjects,
  modules,
});

export const subjectRegistry: readonly Subject[] = subjects;
export const moduleRegistry: readonly Module[] = modules;
export const subjectsBySlug = indexBySlug(subjectRegistry, "subject");
export const modulesBySubjectId = indexModulesBySubject(
  moduleRegistry,
  new Set(subjectRegistry.map((subject) => subject.id)),
);
