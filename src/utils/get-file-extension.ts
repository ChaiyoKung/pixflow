import { extname } from "node:path";

/**
 * Extracts the file extension from a given URL or string representation of a URL.
 *
 * @param {string | URL} url The URL or string representation of the URL from which to extract the file extension.
 * @returns {string} The file extension, including the leading dot (e.g., ".jpg").
 */
export function getFileExtension(url: string | URL): string {
  const pathname = new URL(url).pathname;
  return extname(pathname);
}
