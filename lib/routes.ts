export function buildUnitPath(input: {
  subjectSlug: string;
  moduleSlug: string;
  unitSlug: string;
}) {
  return `/subjects/${input.subjectSlug}/${input.moduleSlug}/${input.unitSlug}`;
}
