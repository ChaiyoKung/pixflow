import mime from "mime-types";

/**
 * Looks up the MIME type for a given filename or extension.
 *
 * @param filenameOrExt The filename or extension to look up.
 * @returns The MIME type if found, otherwise undefined.
 */
export function lookup(filenameOrExt: string) {
  const lookupResult = mime.lookup(filenameOrExt);
  if (lookupResult) return lookupResult;
  return;
}
