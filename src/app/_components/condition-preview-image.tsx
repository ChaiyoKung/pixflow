import { PreviewImageNewBadge } from "./preview-image-new-badge";
import { PreviewImage, type PreviewImageProps } from "./preview-image";

export interface ConditionPreviewImageProps extends PreviewImageProps {
  isNew?: boolean;
}

export function ConditionPreviewImage({ data, isNew }: ConditionPreviewImageProps) {
  if (isNew) return <PreviewImageNewBadge data={data} />;
  return <PreviewImage data={data} />;
}
