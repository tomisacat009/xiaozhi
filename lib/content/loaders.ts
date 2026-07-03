import { learningPaths } from "@/content/learning-paths";
import { getDemoDefinition } from "@/content/demos/catalog";
import {
  moduleRegistry,
  modulesBySubjectId,
  subjectRegistry,
  subjectsBySlug,
  unitRegistry,
  unitsByModuleId,
  unitsBySlug,
} from "@/lib/content/registry";
import type {
  ContentStatus,
  KnowledgeUnitMeta,
  LearningPath,
  Module,
  Subject,
} from "@/lib/content/types";

function cloneSubject(subject: Subject): Subject {
  return { ...subject };
}

function cloneModule(module: Module): Module {
  return {
    ...module,
    highlights: [...module.highlights],
  };
}

const subjectsById = new Map(subjectRegistry.map((subject) => [subject.id, subject]));
const modulesById = new Map(moduleRegistry.map((moduleEntry) => [moduleEntry.id, moduleEntry]));

function resolveEffectiveUnitStatus(unit: KnowledgeUnitMeta): ContentStatus {
  const subject = subjectsById.get(unit.subjectId);
  const moduleEntry = modulesById.get(unit.moduleId);

  if (!subject || !moduleEntry) {
    return unit.status;
  }

  const hasDemo = getDemoDefinition(subject.slug, moduleEntry.slug, unit.slug) !== null;

  if (hasDemo) {
    return "available";
  }
  
  return unit.status;
}

function cloneUnit(unit: KnowledgeUnitMeta): KnowledgeUnitMeta {

  return {
    ...unit,
    status: resolveEffectiveUnitStatus(unit),
    learningGoals: [...unit.learningGoals],
    coreTakeaways: [...unit.coreTakeaways],
    keywords: [...unit.keywords],
    relatedUnits: [...unit.relatedUnits],
    demoIds: [...unit.demoIds],
  };
}

function cloneLearningPath(pathEntry: LearningPath): LearningPath {
  return {
    ...pathEntry,
    topics: [...pathEntry.topics],
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
  const unit = unitsBySlug.get(unitSlug);

  return unit ? cloneUnit(unit) : null;
}

export function getUnitsByModuleRoute(
  subjectSlug: string,
  moduleSlug: string,
): KnowledgeUnitMeta[] {
  const subject = getSubjectBySlug(subjectSlug);

  if (!subject) {
    return [];
  }

  const moduleEntry = getModulesBySubject(subject.id).find(
    (entry) => entry.slug === moduleSlug,
  );

  if (!moduleEntry) {
    return [];
  }

  return getUnitsByModuleId(moduleEntry.id);
}

export function getUnitByRoute(
  subjectSlug: string,
  moduleSlug: string,
  unitSlug: string,
): KnowledgeUnitMeta | null {
  return (
    getUnitsByModuleRoute(subjectSlug, moduleSlug).find(
      (entry) => entry.slug === unitSlug,
    ) ?? null
  );
}

export function getLearningPathsBySubject(subjectId: string): LearningPath[] {
  return learningPaths
    .filter((pathEntry) => pathEntry.subjectId === subjectId)
    .sort((left, right) => left.order - right.order)
    .map(cloneLearningPath);
}
