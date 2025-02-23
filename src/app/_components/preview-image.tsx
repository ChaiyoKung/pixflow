import { AspectRatio } from "@mantine/core";
import NextImage from "next/image";
import { type Image } from "@prisma/client";

export interface PreviewImageProps {
  data: Image;
}

export function PreviewImage({ data }: PreviewImageProps) {
  const { downloadUrl, prompt, width, height } = data;

  return (
    <AspectRatio ratio={width / height} pos="relative" mb="0.5rem">
      <NextImage
        src={downloadUrl}
        alt={prompt}
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "0.5rem",

          // HACK: Fix "next/image" marbin bottom
          // https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom
          verticalAlign: "middle",
        }}
      />
    </AspectRatio>
  );
}
