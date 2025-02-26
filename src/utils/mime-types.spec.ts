import { describe, expect, it } from "vitest";
import { lookup } from "./mime-types";

describe("lookup", () => {
  it("should return the correct mime type for json", () => {
    const result = lookup("json");
    expect(result).toBe("application/json");
  });

  it("should return the correct mime type for .md", () => {
    const result = lookup(".md");
    expect(result).toBe("text/markdown");
  });

  it("should return the correct mime type for file.html", () => {
    const result = lookup("file.html");
    expect(result).toBe("text/html");
  });

  it("should return the correct mime type for folder/file.js", () => {
    const result = lookup("folder/file.js");
    expect(result).toBe("application/javascript");
  });

  it("should return undefined for folder/.htaccess", () => {
    const result = lookup("folder/.htaccess");
    expect(result).toBeUndefined();
  });

  it("should return undefined for cats", () => {
    const result = lookup("cats");
    expect(result).toBeUndefined();
  });
});
