import { describe, expect, it } from "vitest";

import { metadata } from "@/app/layout";

describe("root app metadata", () => {
  it("defines the Xiaozhi Chinese and English brand", () => {
    expect(metadata.title).toBe("小智 Xiaozhi");
  });
});
