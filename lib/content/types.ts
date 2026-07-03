export type Subject = {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  summary: string;
  theme: "sunrise" | "marine" | "leaf" | "plum";
};

export type ContentStatus = "planned" | "migrating" | "available";

export type Module = {
  id: string;
  subjectId: string;
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  order: number;
  status: ContentStatus;
};

export type KnowledgeUnitMeta = {
  id: string;
  subjectId: string;
  moduleId: string;
  slug: string;
  title: string;
  titleEn: string | null;
  summary: string;
  order: number;
  difficulty: string;
  status: ContentStatus;
  learningGoals: string[];
  coreTakeaways: string[];
  keywords: string[];
  relatedUnits: string[];
  demoIds: string[];
  migrationSource: string;
};

export type LearningPath = {
  id: string;
  subjectId: Subject["id"];
  title: string;
  summary: string;
  topics: string[];
  order: number;
};
