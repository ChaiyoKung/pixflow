import { AspectRatio, type AspectRatioProps } from "@mantine/core";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { type Image } from "@prisma/client";

export interface PreviewImageProps extends AspectRatioProps {
  data: Image;
  quality?: NextImageProps["quality"];
  square?: boolean;
}

export function PreviewImage({ data, quality, square, ...props }: PreviewImageProps) {
  const { downloadUrl, prompt, width, height } = data;
  const ratio = square ? 1 / 1 : width / height;

  return (
    <AspectRatio
      {...props}
      ratio={ratio}
      pos="relative"
      bg="gray"
      style={{ borderRadius: "var(--mantine-radius-md)", ...props.style }}
    >
      <NextImage
        src={downloadUrl}
        alt={prompt}
        width={width}
        height={height}
        quality={quality}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "var(--mantine-radius-md)",

          // HACK: Fix "next/image" marbin bottom
          // https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom
          verticalAlign: "middle",
        }}
      />
    </AspectRatio>
  );
}
