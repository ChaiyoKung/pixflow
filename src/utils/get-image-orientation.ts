import { type ImageOrientation } from "~/types";

export function getImageOrientation(width: number, height: number): ImageOrientation {
  if (width > height) return "horizontal";
  if (height > width) return "vertical";
  return "square";
}
