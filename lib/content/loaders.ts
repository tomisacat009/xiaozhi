import {
  moduleRegistry,
  modulesBySubjectId,
  subjectRegistry,
  subjectsBySlug,
  unitRegistry,
  unitsByModuleId,
} from "@/lib/content/registry";
import type { KnowledgeUnitMeta, Module, Subject } from "@/lib/content/types";

function cloneSubject(subject: Subject): Subject {
  return { ...subject };
}

function cloneModule(module: Module): Module {
  return {
    ...module,
    highlights: [...module.highlights],
  };
}

function cloneUnit(unit: KnowledgeUnitMeta): KnowledgeUnitMeta {
  return {
    ...unit,
    learningGoals: [...unit.learningGoals],
    coreTakeaways: [...unit.coreTakeaways],
    keywords: [...unit.keywords],
    relatedUnits: [...unit.relatedUnits],
    demoIds: [...unit.demoIds],
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

export function getAllUnits(): KnowledgeUnitMeta[] {
  return unitRegistry.map(cloneUnit);
}

export function getUnitsByModuleId(moduleId: string): KnowledgeUnitMeta[] {
  const units = unitsByModuleId.get(moduleId);

  if (!units) {
    return [];
  }

  return units.map(cloneUnit);
}

export function getUnitBySlug(unitSlug: string): KnowledgeUnitMeta | null {
  const unit = unitRegistry.find((entry) => entry.slug === unitSlug);

  return unit ? cloneUnit(unit) : null;
}
