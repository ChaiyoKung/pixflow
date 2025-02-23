import { Box, Container } from "@mantine/core";
import { api, HydrateClient } from "~/trpc/server";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { ConditionPreviewImage } from "./_components/condition-preview-image";

export default async function Home() {
  const { images } = await api.image.list({ page: 1, pageSize: 100 });

  return (
    <HydrateClient>
      <Header />

      <Container component="main">
        <Box style={{ columns: "3", columnGap: "0.5rem" }}>
          {images.map((image, index) => (
            <ConditionPreviewImage key={image.id} data={image} isNew={index === 0} />
          ))}
        </Box>
      </Container>

      <Footer />
    </HydrateClient>
  );
}
