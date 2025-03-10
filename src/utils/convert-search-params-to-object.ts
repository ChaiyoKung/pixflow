export function convertSearchParamsToObject(init?: string[][] | Record<string, string> | string | URLSearchParams) {
  const urlSearchParams = new URLSearchParams(init);
  const result: Record<string, string | string[]> = {};

  for (const [key, value] of urlSearchParams) {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}
