import {
  moduleRegistry,
  modulesBySubjectId,
  subjectRegistry,
  subjectsBySlug,
} from "@/lib/content/registry";
import type { Module, Subject } from "@/lib/content/types";

export function getAllSubjects(): Subject[] {
  return [...subjectRegistry];
}

export function getSubjectBySlug(subjectSlug: string): Subject | null {
  return subjectsBySlug.get(subjectSlug) ?? null;
}

export function getModulesBySubject(subjectId: string): Module[] {
  const modules = modulesBySubjectId.get(subjectId);

  if (!modules) {
    return [];
  }

  return [...modules];
}

export function getAllModules(): Module[] {
  return [...moduleRegistry];
}
