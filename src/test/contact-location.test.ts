import { describe, expect, it } from "vitest";
import { getContactLocation } from "@/lib/contactLocation";

describe("Request location prefill", () => {
  it("prefills Amsterdam for requests from the Amsterdam grounding page", () => {
    expect(getContactLocation(new URLSearchParams("type=aarding&plaats=amsterdam"))).toBe("Amsterdam");
  });

  it("leaves ordinary requests without a preset location", () => {
    expect(getContactLocation(new URLSearchParams("type=aarding"))).toBe("");
  });
});