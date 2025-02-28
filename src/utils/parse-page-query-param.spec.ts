import { describe, expect, it } from "vitest";
import { parsePageQueryParam } from "./parse-page-query-param";

describe("parsePageQueryParam", () => {
  it("should parse a valid page number string", () => {
    const page = parsePageQueryParam("1");
    expect(page).toBe(1);
  });

  it("should return default page number when input is undefined", () => {
    const page = parsePageQueryParam(undefined);
    expect(page).toBe(1);
  });

  it("should return default page number when input is an empty string", () => {
    const page = parsePageQueryParam("");
    expect(page).toBe(1);
  });

  it("should return default page number when input is an invalid string", () => {
    const page = parsePageQueryParam("x");
    expect(page).toBe(1);
  });

  it("should parse the first valid page number from an array", () => {
    const page = parsePageQueryParam(["2", "3"]);
    expect(page).toBe(2);
  });

  it("should return provided default page number when input is undefined", () => {
    const page = parsePageQueryParam(undefined, 2);
    expect(page).toBe(2);
  });

  it("should return provided default page number when input is an empty string", () => {
    const page = parsePageQueryParam("", 2);
    expect(page).toBe(2);
  });

  it("should return provided default page number when input is an invalid string", () => {
    const page = parsePageQueryParam("x", 2);
    expect(page).toBe(2);
  });

  it("should parse the first valid page number from an array with a default value", () => {
    const page = parsePageQueryParam(["", "3"], 2);
    expect(page).toBe(3);
  });

  it("should parse the first valid page number from an array with multiple invalid values and a default value", () => {
    const page = parsePageQueryParam(["", "3", "4"], 2);
    expect(page).toBe(3);
  });
});
