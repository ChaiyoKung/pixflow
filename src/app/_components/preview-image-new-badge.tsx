import { Indicator } from "@mantine/core";
import { PreviewImage, type PreviewImageProps } from "./preview-image";

export type PreviewImageNewBadgeProps = PreviewImageProps;

export function PreviewImageNewBadge({ data }: PreviewImageNewBadgeProps) {
  return (
    <Indicator
      key={data.id}
      inline
      label="New"
      color="red"
      size="1rem"
      styles={{ indicator: { transform: "translate(-0.25rem, 0.25rem)" } }}
    >
      <PreviewImage data={data} />
    </Indicator>
  );
}
