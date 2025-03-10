import { Container, Flex, Space, Text } from "@mantine/core";
import { api, HydrateClient } from "~/trpc/server";
import { Header } from "~/app/_components/header";
import { Footer } from "~/app/_components/footer";
import { parsePageQueryParam } from "~/utils/parse-page-query-param";
import { VerticalMasonry } from "~/components/VerticalMasonry";
import { ConditionPreviewImage } from "~/app/_components/condition-preview-image";
import { Pagination } from "~/app/_components/pagination";
import { BackActiveIcon } from "../../../components/back-action-icon";

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
  const { images, totalPages, total } = await api.image.list({ page, pageSize, keywords: [keyword] });

  return (
    <HydrateClient>
      <Header />

      <Container size="lg" component="main">
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
            <ConditionPreviewImage key={image.id} data={image} />
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
