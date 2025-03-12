import { PreviewImageNewBadge } from "./preview-image-new-badge";
import { PreviewImage, type PreviewImageProps } from "./preview-image";

export interface ConditionPreviewImageProps extends PreviewImageProps {
  isNew?: boolean;
}

export function ConditionPreviewImage({ data, isNew, ...props }: ConditionPreviewImageProps) {
  if (isNew) return <PreviewImageNewBadge data={data} {...props} />;
  return <PreviewImage data={data} {...props} />;
}
