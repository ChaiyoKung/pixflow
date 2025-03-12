import { Center, Flex, Text } from "@mantine/core";
import { api, HydrateClient } from "~/trpc/server";
import { ConditionPreviewImage } from "./_components/condition-preview-image";
import { parsePageQueryParam } from "~/utils/parse-page-query-param";
import { Pagination, VerticalMasonry } from "~/components";
import NextLink from "next/link";

const initialPage = 1;
const pageSize = 10;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const queryParams = await searchParams;
  const page = parsePageQueryParam(queryParams.page, initialPage);
  const { images, totalPages, total } = await api.image.list({ page, pageSize });

  return (
    <HydrateClient>
      <Flex mb="xs" justify="end">
        <Text size="lg" c="blue">
          Total Images: {total}
        </Text>
      </Flex>

      <VerticalMasonry>
        {images.map((image, index) => (
          <NextLink key={image.id} href={`/image/${image.id}`}>
            <ConditionPreviewImage data={image} isNew={index === 0 && page === 1} mb="sm" />
          </NextLink>
        ))}
      </VerticalMasonry>

      <Center my="xl">
        <Pagination total={totalPages} page={page} siblings={2} />
      </Center>
    </HydrateClient>
  );
}
