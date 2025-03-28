import { Center, Flex, Text } from "@mantine/core";
import { api, HydrateClient } from "~/trpc/server";
import { parsePageQueryParam } from "~/utils/parse-page-query-param";
import { ConditionPreviewImage } from "~/app/_components/condition-preview-image";
import { BackActiveIcon, Pagination, VerticalMasonry } from "~/components";
import Link from "next/link";

const initialPage = 1;
const pageSize = 10;

interface KeywordPageProps {
  params: Promise<{ keyword: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function KeywordPage({ params, searchParams }: KeywordPageProps) {
  const { keyword } = await params;
  const queryParams = await searchParams;
  const page = parsePageQueryParam(queryParams.page, initialPage);
  const { images, totalPages, total } = await api.image.list({
    page,
    pageSize,
    keywords: [decodeURIComponent(keyword)],
  });

  return (
    <HydrateClient>
      <Flex mb="xs" justify="space-between" align="end">
        <Flex align="center" gap="xs">
          <BackActiveIcon />
          <Text size="lg" fw="bold">
            Keyword: {decodeURIComponent(keyword)}
          </Text>
        </Flex>
        <Text size="lg" c="blue">
          Total Images: {total}
        </Text>
      </Flex>

      <VerticalMasonry>
        {images.map((image) => (
          <Link key={image.id} href={`/image/${image.id}`}>
            <ConditionPreviewImage data={image} quality={10} mb="sm" />
          </Link>
        ))}
      </VerticalMasonry>

      <Center my="xl">
        <Pagination total={totalPages} page={page} siblings={2} />
      </Center>
    </HydrateClient>
  );
}
