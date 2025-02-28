/**
 * Parses the page query parameter and returns a valid page number.
 *
 * @param page The page query parameter which can be a string, an array of strings, or undefined.
 * @param [initialPage=1] The initial page number to return if the page query parameter is invalid or not provided.
 * @returns The parsed page number or the initial page number if the input is invalid.
 */
export function parsePageQueryParam(page: string | string[] | undefined, initialPage = 1) {
  if (typeof page === "string" && /^\d+$/.exec(page)) {
    return parseInt(page);
  }

  if (Array.isArray(page)) {
    const validPage = page.find((p) => /^\d+$/.exec(p));
    if (validPage) return parseInt(validPage);
  }

  return initialPage;
}
