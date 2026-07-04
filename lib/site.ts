function normalizeBasePath(input: string | undefined) {
  if (!input) {
    return "";
  }

  const trimmed = input.trim();

  if (!trimmed || trimmed === "/") {
    return "";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
}

export function getBasePath() {
  return normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
}

export function withBasePath(path: string) {
  const basePath = getBasePath();

  if (!basePath) {
    return path;
  }

  if (!path || path === "/") {
    return `${basePath}/`;
  }

  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
