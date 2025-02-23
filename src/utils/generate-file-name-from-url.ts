import { randomUUID } from "node:crypto";
import { getFileExtension } from "./get-file-extension";

export function generateFileNameFromUrl(url: string) {
  return randomUUID() + getFileExtension(url);
}
