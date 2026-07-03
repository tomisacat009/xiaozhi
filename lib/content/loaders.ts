import {
  moduleRegistry,
  modulesBySubjectId,
  subjectRegistry,
  subjectsBySlug,
} from "@/lib/content/registry";
import type { Module, Subject } from "@/lib/content/types";

function cloneSubject(subject: Subject): Subject {
  return { ...subject };
}

function cloneModule(module: Module): Module {
  return {
    ...module,
    highlights: [...module.highlights],
  };
}

export function getAllSubjects(): Subject[] {
  return subjectRegistry.map(cloneSubject);
}

export function getSubjectBySlug(subjectSlug: string): Subject | null {
  const subject = subjectsBySlug.get(subjectSlug);

  return subject ? cloneSubject(subject) : null;
}

export function getModulesBySubject(subjectId: string): Module[] {
  const modules = modulesBySubjectId.get(subjectId);

  if (!modules) {
    return [];
  }

  return modules.map(cloneModule);
}

export function getAllModules(): Module[] {
  return moduleRegistry.map(cloneModule);
}
