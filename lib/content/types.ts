export type Subject = {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  summary: string;
  theme: "sunrise" | "marine" | "leaf" | "plum";
};

export type Module = {
  id: string;
  subjectId: string;
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  order: number;
};

export type KnowledgeUnitMeta = {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  summary: string;
  order: number;
};
