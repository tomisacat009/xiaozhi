import { modules } from "@/content/modules";
import { knowledgeUnits } from "@/content/units";
import { subjects } from "@/content/subjects";
import type { KnowledgeUnitMeta, Module, Subject } from "@/lib/content/types";

type ContentRegistryInput = {
  subjects: readonly Subject[];
  modules: readonly Module[];
  units: readonly KnowledgeUnitMeta[];
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

  for (const moduleEntry of items) {
    if (!subjectIds.has(moduleEntry.subjectId)) {
      throw new Error(`Unknown module subjectId: ${moduleEntry.subjectId}`);
    }

    const bucket = modulesBySubject.get(moduleEntry.subjectId);

    if (bucket) {
      bucket.push(moduleEntry);
      continue;
    }

    modulesBySubject.set(moduleEntry.subjectId, [moduleEntry]);
  }

  for (const bucket of modulesBySubject.values()) {
    bucket.sort((left, right) => left.order - right.order);
  }

  return modulesBySubject;
}

function indexUnitsByModule(
  items: readonly KnowledgeUnitMeta[],
  moduleIds: ReadonlySet<string>,
  subjectIds: ReadonlySet<string>,
) {
  const unitsByModule = new Map<string, KnowledgeUnitMeta[]>();

  for (const unit of items) {
    if (!subjectIds.has(unit.subjectId)) {
      throw new Error(`Unknown unit subjectId: ${unit.subjectId}`);
    }

    if (!moduleIds.has(unit.moduleId)) {
      throw new Error(`Unknown unit moduleId: ${unit.moduleId}`);
    }

    const bucket = unitsByModule.get(unit.moduleId);

    if (bucket) {
      bucket.push(unit);
      continue;
    }

    unitsByModule.set(unit.moduleId, [unit]);
  }

  for (const bucket of unitsByModule.values()) {
    bucket.sort((left, right) => left.order - right.order);
  }

  return unitsByModule;
}

export function validateContentRegistry(input: ContentRegistryInput) {
  const subjectIds = new Set(input.subjects.map((subject) => subject.id));
  const moduleIds = new Set(input.modules.map((moduleEntry) => moduleEntry.id));

  indexBySlug(input.subjects, "subject");
  indexBySlug(input.modules, "module");
  indexModulesBySubject(input.modules, subjectIds);
  indexBySlug(input.units, "unit");
  indexUnitsByModule(input.units, moduleIds, subjectIds);
}

validateContentRegistry({
  subjects,
  modules,
  units: knowledgeUnits,
});

export const subjectRegistry: readonly Subject[] = subjects;
export const moduleRegistry: readonly Module[] = modules;
export const unitRegistry: readonly KnowledgeUnitMeta[] = knowledgeUnits;
export const subjectsBySlug = indexBySlug(subjectRegistry, "subject");
export const unitsBySlug = indexBySlug(unitRegistry, "unit");
export const modulesBySubjectId = indexModulesBySubject(
  moduleRegistry,
  new Set(subjectRegistry.map((subject) => subject.id)),
);
export const unitsByModuleId = indexUnitsByModule(
  unitRegistry,
  new Set(moduleRegistry.map((moduleEntry) => moduleEntry.id)),
  new Set(subjectRegistry.map((subject) => subject.id)),
);
