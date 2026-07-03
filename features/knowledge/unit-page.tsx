import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import path from "node:path";

import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { RichContent } from "@/components/content/rich-content";
import { QuadraticFunctionDemo } from "@/components/demo/quadratic-function-demo";
import { PageShell } from "@/components/layout/page-shell";
import {
  getAllModules,
  getAllSubjects,
  getAllUnits,
  getModulesBySubject,
  getSubjectBySlug,
  getUnitByRoute as loadUnitByRoute,
  getUnitsByModuleRoute as loadUnitsByModuleRoute,
} from "@/lib/content/loaders";
import type { KnowledgeUnitMeta } from "@/lib/content/types";

type UnitRouteEntry = {
  subjectSlug: string;
  moduleSlug: string;
  unitSlug: string;
  title: string;
  summary: string;
  status: KnowledgeUnitMeta["status"];
  sourcePath: string | null;
};

type UnitDocument = {
  title: string;
  summary: string;
  body: string;
  learningGoals: string[];
};

const unitSourcePaths = new Map<string, string>([
  [
    "math/functions/quadratic-function",
    path.join(process.cwd(), "content/units/math/functions/quadratic-function.mdx"),
  ],
]);

function buildUnitRouteEntries(): UnitRouteEntry[] {
  const subjects = getAllSubjects();
  const modules = getAllModules();
  const units = getAllUnits();
  const subjectById = new Map(subjects.map((subject) => [subject.id, subject]));
  const moduleById = new Map(modules.map((moduleEntry) => [moduleEntry.id, moduleEntry]));

  return units
    .map((unit) => {
      const subject = subjectById.get(unit.subjectId);
      const moduleEntry = moduleById.get(unit.moduleId);

      if (!subject || !moduleEntry) {
        return null;
      }

      const routeKey = `${subject.slug}/${moduleEntry.slug}/${unit.slug}`;

      return {
        subjectSlug: subject.slug,
        moduleSlug: moduleEntry.slug,
        unitSlug: unit.slug,
        title: unit.title,
        summary: unit.summary,
        status: unit.status,
        sourcePath: unitSourcePaths.get(routeKey) ?? null,
      };
    })
    .filter((entry): entry is UnitRouteEntry => entry !== null);
}

const unitEntries = buildUnitRouteEntries();

function parseFrontmatter(source: string) {
  if (!source.startsWith("---")) {
    return {
      metadata: {} as Record<string, string>,
      body: source.trim(),
    };
  }

  const endIndex = source.indexOf("\n---", 3);

  if (endIndex === -1) {
    return {
      metadata: {} as Record<string, string>,
      body: source.trim(),
    };
  }

  const rawFrontmatter = source.slice(3, endIndex).trim();
  const metadata = rawFrontmatter
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .reduce<Record<string, string>>((accumulator, line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        return accumulator;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line
        .slice(separatorIndex + 1)
        .trim()
        .replace(/^"(.*)"$/, "$1");

      accumulator[key] = value;
      return accumulator;
    }, {});

  const body = source.slice(endIndex + 4).trim();

  return { metadata, body };
}

async function readUnitDocument(
  entry: UnitRouteEntry,
  unitMeta: KnowledgeUnitMeta,
): Promise<UnitDocument> {
  if (!entry.sourcePath) {
    return {
      title: unitMeta.title,
      summary: unitMeta.summary,
      body: [
        "## 内容迁移中",
        "",
        "这一知识点已经进入正式站点的结构骨架，正文与交互演示正在从旧原型重构迁移中。",
        "",
        "### 当前可先关注",
        "",
        `- 所属模块：${entry.moduleSlug}`,
        `- 当前状态：${unitMeta.status === "migrating" ? "迁移中" : "规划中"}`,
        `- 旧原型来源：\`${unitMeta.migrationSource}\``,
      ].join("\n"),
      learningGoals: unitMeta.learningGoals,
    };
  }

  await access(entry.sourcePath);
  const source = await readFile(entry.sourcePath, "utf8");
  const { metadata, body } = parseFrontmatter(source);

  return {
    title: metadata.title ?? unitMeta.title,
    summary: metadata.summary ?? unitMeta.summary,
    body,
    learningGoals: unitMeta.learningGoals,
  };
}

export function getUnitsByModuleRoute(subjectSlug: string, moduleSlug: string) {
  return getUnitsByModuleRouteFromRegistry(subjectSlug, moduleSlug).map((unit) => ({
    subjectSlug,
    moduleSlug,
    unitSlug: unit.slug,
    title: unit.title,
    summary: unit.summary,
    status: unit.status,
  }));
}

function getUnitsByModuleRouteFromRegistry(subjectSlug: string, moduleSlug: string) {
  return loadUnitsByModuleRoute(subjectSlug, moduleSlug);
}

export function getUnitEntry(
  subjectSlug: string,
  moduleSlug: string,
  unitSlug: string,
) {
  return unitEntries.find(
    (entry) =>
      entry.subjectSlug === subjectSlug &&
      entry.moduleSlug === moduleSlug &&
      entry.unitSlug === unitSlug,
  );
}

export function getAllUnitEntries() {
  return [...unitEntries];
}

function renderUnitDemo(
  subjectSlug: string,
  moduleSlug: string,
  unitSlug: string,
) {
  if (
    subjectSlug === "math" &&
    moduleSlug === "functions" &&
    unitSlug === "quadratic-function"
  ) {
    return <QuadraticFunctionDemo />;
  }

  return null;
}

export async function UnitPageView({
  subjectSlug,
  moduleSlug,
  unitSlug,
}: {
  subjectSlug: string;
  moduleSlug: string;
  unitSlug: string;
}) {
  const subject = getSubjectBySlug(subjectSlug);

  if (!subject) {
    notFound();
  }

  const moduleEntry = getModulesBySubject(subject.id).find(
    (entry) => entry.slug === moduleSlug,
  );

  if (!moduleEntry) {
    notFound();
  }

  const unitEntry = getUnitEntry(subjectSlug, moduleSlug, unitSlug);
  const unitMeta = loadUnitByRoute(subjectSlug, moduleSlug, unitSlug);

  if (!unitEntry || !unitMeta) {
    notFound();
  }

  const document = await readUnitDocument(unitEntry, unitMeta);
  const demo = renderUnitDemo(subjectSlug, moduleSlug, unitSlug);

  return (
    <PageShell>
      <section className="contentSection">
        <Breadcrumbs
          items={[
            { href: "/", label: "首页" },
            { href: `/subjects/${subject.slug}`, label: subject.nameZh },
            {
              href: `/subjects/${subject.slug}/${moduleEntry.slug}`,
              label: moduleEntry.title,
            },
            { label: document.title },
          ]}
        />
        <div className="contentSection__hero">
          <p className="sectionHeading__eyebrow">Knowledge Unit</p>
          <h1>{document.title}</h1>
          <p className="contentSection__summary">{document.summary}</p>
          <p className="contentSection__summary">
            当前状态：
            {unitMeta.status === "migrating" ? "迁移中" : "规划中"}
          </p>
        </div>
      </section>

      {demo}

      <article className="contentSection">
        {document.learningGoals.length > 0 ? (
          <div className="contentCard" style={{ marginBottom: "1.5rem" }}>
            <h2>学习目标</h2>
            <ul className="contentCard__chips">
              {document.learningGoals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <RichContent source={document.body} />
      </article>
    </PageShell>
  );
}
