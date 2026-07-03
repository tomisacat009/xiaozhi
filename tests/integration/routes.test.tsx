// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { readFileSync } from "node:fs";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { generateMetadata as generateUnitMetadata } from "@/app/subjects/[subjectSlug]/[moduleSlug]/[unitSlug]/page";
import ModulePage from "@/app/subjects/[subjectSlug]/[moduleSlug]/page";
import UnitPage from "@/app/subjects/[subjectSlug]/[moduleSlug]/[unitSlug]/page";
import SubjectPage from "@/app/subjects/[subjectSlug]/page";
import HomePage from "@/app/page";
import { metadata } from "@/app/layout";

afterEach(() => {
  cleanup();
});

describe("root app metadata", () => {
  it("defines the Xiaozhi Chinese and English brand", () => {
    expect(metadata.title).toBe("小智 Xiaozhi");
  });

  it("does not require generated .next type imports in tracked config", () => {
    expect(readFileSync("next-env.d.ts", "utf8")).not.toContain(
      ".next/types/routes.d.ts",
    );
    expect(readFileSync("tsconfig.json", "utf8")).not.toContain(
      ".next/types/**/*.ts",
    );
    expect(readFileSync("tsconfig.json", "utf8")).not.toContain(
      ".next/dev/types/**/*.ts",
    );
  });

  it("builds absolute canonical metadata from a stable metadataBase", async () => {
    const pageMetadata = await generateUnitMetadata({
      params: Promise.resolve({
        subjectSlug: "math",
        moduleSlug: "functions",
        unitSlug: "quadratic-function",
      }),
    });

    expect(pageMetadata.metadataBase?.toString()).toBe("http://localhost:3000/");
    expect(pageMetadata.alternates?.canonical?.toString()).toBe(
      "http://localhost:3000/subjects/math/functions/quadratic-function",
    );
  });
});

describe("home page", () => {
  it("renders the homepage with all subject entries", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "小智 Xiaozhi" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /数学/i })).toHaveAttribute(
      "href",
      "/subjects/math",
    );
    expect(screen.getByRole("link", { name: /物理/i })).toHaveAttribute(
      "href",
      "/subjects/physics",
    );
    expect(screen.getByRole("link", { name: /化学/i })).toHaveAttribute(
      "href",
      "/subjects/chemistry",
    );
    expect(screen.getByRole("link", { name: /英语/i })).toHaveAttribute(
      "href",
      "/subjects/english",
    );
  });
});

describe("semantic route pages", () => {
  it("renders a subject page", async () => {
    const view = await SubjectPage({
      params: Promise.resolve({ subjectSlug: "math" }),
    });

    render(view);

    expect(
      screen.getByRole("heading", { name: "数学", level: 1 }),
    ).toBeInTheDocument();
  });

  it("renders a module page", async () => {
    const view = await ModulePage({
      params: Promise.resolve({
        subjectSlug: "math",
        moduleSlug: "functions",
      }),
    });

    render(view);

    expect(
      screen.getByRole("heading", { name: "函数", level: 1 }),
    ).toBeInTheDocument();
  });

  it("renders a unit page with breadcrumb trail", async () => {
    const view = await UnitPage({
      params: Promise.resolve({
        subjectSlug: "math",
        moduleSlug: "functions",
        unitSlug: "quadratic-function",
      }),
    });

    render(view);

    expect(
      screen.getByRole("heading", { name: "二次函数", level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "面包屑" }),
    ).toBeInTheDocument();
    expect(screen.getByText("y = ax^2 + bx + c", { selector: "code" })).toBeInTheDocument();
    expect(screen.getAllByText("a", { selector: "code" }).length).toBeGreaterThan(0);
    expect(screen.queryByText(/`y = ax\^2 \+ bx \+ c`/)).not.toBeInTheDocument();
  });
});
