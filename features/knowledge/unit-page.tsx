import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import path from "node:path";

import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { RichContent } from "@/components/content/rich-content";
import { UnitDemo } from "@/components/demo/unit-demo";
import { PageShell } from "@/components/layout/page-shell";
import { getDemoDefinition } from "@/content/demos/catalog";
import {
  getAllModules,
  getAllSubjects,
  getAllUnits,
  getModulesBySubject,
  getSubjectBySlug,
  getUnitByRoute as loadUnitByRoute,
  getUnitsByModuleRoute as loadUnitsByModuleRoute,
} from "@/lib/content/loaders";
import { buildFallbackUnitBody, stripProcessSections } from "@/lib/content/unit-documents";
import type { KnowledgeUnitMeta } from "@/lib/content/types";

type UnitRouteEntry = {
  subjectSlug: string;
  moduleSlug: string;
  unitSlug: string;
  title: string;
  summary: string;
  status: KnowledgeUnitMeta["status"];
  sourcePath: string;
};

type UnitDocument = {
  title: string;
  summary: string;
  body: string;
  learningGoals: string[];
};

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

      return {
        subjectSlug: subject.slug,
        moduleSlug: moduleEntry.slug,
        unitSlug: unit.slug,
        title: unit.title,
        summary: unit.summary,
        status: unit.status,
        sourcePath: path.join(
          process.cwd(),
          "content/units",
          subject.slug,
          moduleEntry.slug,
          `${unit.slug}.mdx`,
        ),
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
  moduleTitle: string,
): Promise<UnitDocument> {
  try {
    await access(entry.sourcePath);
    const source = await readFile(entry.sourcePath, "utf8");
    const { metadata, body } = parseFrontmatter(source);

    return {
      title: metadata.title ?? unitMeta.title,
      summary: metadata.summary ?? unitMeta.summary,
      body: stripProcessSections(body),
      learningGoals: unitMeta.learningGoals,
    };
  } catch {
    return {
      title: unitMeta.title,
      summary: unitMeta.summary,
      body: buildFallbackUnitBody(unitMeta, moduleTitle),
      learningGoals: unitMeta.learningGoals,
    };
  }
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

  const document = await readUnitDocument(unitEntry, unitMeta, moduleEntry.title);
  const hasDemo = getDemoDefinition(subjectSlug, moduleSlug, unitSlug) !== null;

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
          <p className="sectionHeading__eyebrow">知识点</p>
          <h1>{document.title}</h1>
          <p className="contentSection__summary">{document.summary}</p>
          <ul className="contentCard__chips">
            <li>{unitMeta.difficulty}</li>
            <li>{document.learningGoals.length} 个学习目标</li>
            <li>{unitMeta.coreTakeaways.length} 条关键结论</li>
          </ul>
        </div>
      </section>

      {hasDemo ? (
        <UnitDemo
          subjectSlug={subjectSlug}
          moduleSlug={moduleSlug}
          unitSlug={unitSlug}
        />
      ) : null}

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
        {unitMeta.coreTakeaways.length > 0 ? (
          <div className="contentCard" style={{ marginBottom: "1.5rem" }}>
            <h2>学完后要带走什么</h2>
            <div className="richContent">
              <ul>
                {unitMeta.coreTakeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        {unitMeta.keywords.length > 0 ? (
          <div className="contentCard" style={{ marginBottom: "1.5rem" }}>
            <h2>关键词</h2>
            <ul className="contentCard__chips">
              {unitMeta.keywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <RichContent source={document.body} />
      </article>
    </PageShell>
  );
}
