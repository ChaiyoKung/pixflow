import { Box, Container, Space } from "@mantine/core";
import { api, HydrateClient } from "~/trpc/server";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { ConditionPreviewImage } from "./_components/condition-preview-image";
import { Pagination } from "./_components/pagination";

const initialPage = 1;
const pageSize = 10;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const queryParams = await searchParams;
  const page = typeof queryParams.page === "string" ? parseInt(queryParams.page) : initialPage;
  const { images, totalPages } = await api.image.list({ page, pageSize });

  return (
    <HydrateClient>
      <Header />

      <Container component="main">
        <Box style={{ columns: "3", columnGap: "var(--mantine-spacing-sm)" }}>
          {images.map((image, index) => (
            <ConditionPreviewImage key={image.id} data={image} isNew={index === 0} />
          ))}
        </Box>

        <Space h="xl" />
        <Pagination total={totalPages} page={page} initialPage={initialPage} siblings={2} />
        <Space h="xl" />
      </Container>

      <Footer />
    </HydrateClient>
  );
}
