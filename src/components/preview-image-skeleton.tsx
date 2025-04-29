import { AspectRatio, Skeleton } from "@mantine/core";

export function PreviewImageSkeleton() {
  return (
    <AspectRatio ratio={1 / 1}>
      <Skeleton w="100%" h="100%" c="gray" style={{ borderRadius: "var(--mantine-radius-md)" }} />
    </AspectRatio>
  );
}
