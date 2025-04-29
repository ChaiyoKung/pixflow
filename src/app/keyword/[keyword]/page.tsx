import { Flex, Text } from "@mantine/core";
import { HydrateClient } from "~/trpc/server";
import { BackActiveIcon } from "~/components";
import { TotalImage } from "../../_components/total-image";
import { InfinityPreviewImage } from "../../_components/infinity-preview-image";

interface KeywordPageProps {
  params: Promise<{ keyword: string }>;
}

export default async function KeywordPage({ params }: KeywordPageProps) {
  const { keyword } = await params;

  return (
    <HydrateClient>
      <Flex mb="xs" justify="space-between" align="end">
        <Flex align="center" gap="xs">
          <BackActiveIcon />
          <Text size="lg" fw="bold">
            Keyword: {decodeURIComponent(keyword)}
          </Text>
        </Flex>
        <TotalImage keywords={[decodeURIComponent(keyword)]} />
      </Flex>

      <InfinityPreviewImage keywords={[decodeURIComponent(keyword)]} />
    </HydrateClient>
  );
}
