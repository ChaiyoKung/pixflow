import { Flex } from "@mantine/core";
import { HydrateClient } from "~/trpc/server";
import { InfinityPreviewImage, TotalImage } from "~/components";

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
