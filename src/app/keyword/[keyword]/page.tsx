import { Flex, Text } from "@mantine/core";
import { HydrateClient } from "~/trpc/server";
import { BackActiveIcon, InfinityPreviewImage, TotalImage } from "~/components";

interface KeywordPageProps {
  params: Promise<{ keyword: string }>;
}

export default async function KeywordPage({ params }: KeywordPageProps) {
  const { keyword } = await params;
  const decodedKeyword = decodeURIComponent(keyword);

  return (
    <HydrateClient>
      <Flex mb="xs" justify="space-between" align="end">
        <Flex align="center" gap="xs">
          <BackActiveIcon />
          <Text size="lg" fw="bold">
            Keyword: {decodedKeyword}
          </Text>
        </Flex>
        <TotalImage keywords={[decodedKeyword]} />
      </Flex>

      <InfinityPreviewImage keywords={[decodedKeyword]} />
    </HydrateClient>
  );
}
