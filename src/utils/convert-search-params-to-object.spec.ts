import { describe, expect, it } from "vitest";
import { convertSearchParamsToObject } from "./convert-search-params-to-object";

describe("convertSearchParamsToObject", () => {
  it("should parse single query parameter", () => {
    const result = convertSearchParamsToObject("a=1");
    expect(result).toEqual({ a: "1" });
  });

  it("should parse multiple query parameters", () => {
    const result = convertSearchParamsToObject("a=1&b=2");
    expect(result).toEqual({ a: "1", b: "2" });
  });

  it("should handle duplicate query parameters", () => {
    const result = convertSearchParamsToObject("a=1&a=2");
    expect(result).toEqual({ a: ["1", "2"] });
  });

  it("should handle empty query string", () => {
    const result = convertSearchParamsToObject("");
    expect(result).toEqual({});
  });

  it("should handle query parameters with empty values", () => {
    const result = convertSearchParamsToObject("a=&b=");
    expect(result).toEqual({ a: "", b: "" });
  });

  it("should decode encoded query parameters", () => {
    const result = convertSearchParamsToObject("a=%201&b=%202");
    expect(result).toEqual({ a: " 1", b: " 2" });
  });

  it("should handle query parameters with special characters", () => {
    const result = convertSearchParamsToObject("a=1&b=@$%25^");
    expect(result).toEqual({ a: "1", b: "@$%^" });
  });

  it("should handle URLSearchParams input", () => {
    const params = new URLSearchParams("a=1&b=2");
    const result = convertSearchParamsToObject(params);
    expect(result).toEqual({ a: "1", b: "2" });
  });

  it("should handle Record<string, string> input", () => {
    const params = { a: "1", b: "2" };
    const result = convertSearchParamsToObject(params);
    expect(result).toEqual({ a: "1", b: "2" });
  });

  it("should handle string[][] input", () => {
    const params: string[][] = [
      ["a", "1"],
      ["b", "2"],
    ];
    const result = convertSearchParamsToObject(params);
    expect(result).toEqual({ a: "1", b: "2" });
  });
});
