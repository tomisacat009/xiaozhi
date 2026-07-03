"use client";

import { DemoShell } from "@/components/demo/demo-shell";
import { getDemoDefinition } from "@/content/demos/catalog";
import type { DemoDefinition, DemoParams } from "@/engine/core/types";

export function UnitDemo({
  subjectSlug,
  moduleSlug,
  unitSlug,
}: {
  subjectSlug: string;
  moduleSlug: string;
  unitSlug: string;
}) {
  const definition = getDemoDefinition(
    subjectSlug,
    moduleSlug,
    unitSlug,
  ) as DemoDefinition<DemoParams> | null;

  if (!definition) {
    return null;
  }

  return <DemoShell definition={definition} />;
}
