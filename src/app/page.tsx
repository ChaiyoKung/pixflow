import { Container, Flex, Space, Text } from "@mantine/core";
import { api, HydrateClient } from "~/trpc/server";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { ConditionPreviewImage } from "./_components/condition-preview-image";
import { Pagination } from "./_components/pagination";
import { parsePageQueryParam } from "~/utils/parse-page-query-param";
import { VerticalMasonry } from "~/components/VerticalMasonry";

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
      <Header />

      <Container size="lg" component="main">
        <Flex mb="xs" justify="end">
          <Text size="lg" c="blue">
            Total Images: {total}
          </Text>
        </Flex>

        <VerticalMasonry>
          {images.map((image, index) => (
            <ConditionPreviewImage key={image.id} data={image} isNew={index === 0 && page === 1} />
          ))}
        </VerticalMasonry>

        <Space h="xl" />
        <Pagination total={totalPages} page={page} initialPage={initialPage} siblings={2} />
        <Space h="xl" />
      </Container>

      <Footer />
    </HydrateClient>
  );
}
