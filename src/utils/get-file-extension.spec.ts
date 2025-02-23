import { describe, expect, it } from "vitest";
import { getFileExtension } from "./get-file-extension";

describe("getFileExtension", () => {
  it("should return the file extension of a URL", () => {
    const url = "https://example.com/image.png";
    const result = getFileExtension(url);
    expect(result).toBe(".png");
  });

  it("should return the file extension of a URL with query parameters", () => {
    const url = "https://example.com/image.png?size=1024";
    const result = getFileExtension(url);
    expect(result).toBe(".png");
  });

  it("should return the file extension of a URL with a hash", () => {
    const url = "https://example.com/image.png#hash";
    const result = getFileExtension(url);
    expect(result).toBe(".png");
  });
});
