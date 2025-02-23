import { describe, expect, it } from "vitest";
import { generateFileNameFromUrl } from "./generate-file-name-from-url";

describe("generateFileNameFromUrl", () => {
  it("should generate a jpg file name from a URL", async () => {
    const imageUrl = "https://example.com/image.jpg";
    const result = generateFileNameFromUrl(imageUrl);
    expect(result).toMatch(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.jpg$/);
  });

  it("should generate a png file name from a URL", async () => {
    const imageUrl = "https://example.com/image.png";
    const result = generateFileNameFromUrl(imageUrl);
    expect(result).toMatch(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.png$/);
  });
});
