// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { metadata } from "@/app/layout";

describe("root app metadata", () => {
  it("defines the Xiaozhi Chinese and English brand", () => {
    expect(metadata.title).toBe("小智 Xiaozhi");
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
