import { readFile } from "node:fs/promises";
import path from "node:path";

import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { RichContent } from "@/components/content/rich-content";
import { QuadraticFunctionDemo } from "@/components/demo/quadratic-function-demo";
import { PageShell } from "@/components/layout/page-shell";
import { getModulesBySubject, getSubjectBySlug } from "@/lib/content/loaders";

type UnitEntry = {
  subjectSlug: string;
  moduleSlug: string;
  unitSlug: string;
  title: string;
  summary: string;
  sourcePath: string;
};

type UnitDocument = {
  title: string;
  summary: string;
  body: string;
};

const unitEntries: UnitEntry[] = [
  {
    subjectSlug: "math",
    moduleSlug: "functions",
    unitSlug: "quadratic-function",
    title: "二次函数",
    summary: "理解二次函数的解析式、图像特征与解题观察角度。",
    sourcePath: path.join(
      process.cwd(),
      "content/units/math/functions/quadratic-function.mdx",
    ),
  },
];

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

async function readUnitDocument(entry: UnitEntry): Promise<UnitDocument> {
  const source = await readFile(entry.sourcePath, "utf8");
  const { metadata, body } = parseFrontmatter(source);

  return {
    title: metadata.title ?? entry.title,
    summary: metadata.summary ?? entry.summary,
    body,
  };
}

export function getUnitsByModuleRoute(subjectSlug: string, moduleSlug: string) {
  return unitEntries.filter(
    (entry) =>
      entry.subjectSlug === subjectSlug && entry.moduleSlug === moduleSlug,
  );
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

  if (!unitEntry) {
    notFound();
  }

  const document = await readUnitDocument(unitEntry);
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
        </div>
      </section>

      {demo}

      <article className="contentSection">
        <RichContent source={document.body} />
      </article>
    </PageShell>
  );
}
