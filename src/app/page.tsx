import { Flex } from "@mantine/core";
import { HydrateClient } from "~/trpc/server";
import { InfinityPreviewImage } from "./_components/infinity-preview-image";
import { TotalImage } from "./_components/total-image";

export default async function Home() {
  return (
    <HydrateClient>
      <Flex mb="xs" justify="end">
        <TotalImage />
      </Flex>

      <InfinityPreviewImage />
    </HydrateClient>
  );
}
