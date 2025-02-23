import { AspectRatio, Container, Flex, Image, Indicator, SimpleGrid, Text, Title } from "@mantine/core";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const { images } = await api.image.list({ page: 1, pageSize: 100 });

  return (
    <HydrateClient>
      <Flex
        component="header"
        justify="center"
        align="center"
        p="xs"
        pos="sticky"
        top={0}
        styles={{ root: { backdropFilter: "blur(5rem)", zIndex: 9999 } }}
      >
        <Title order={1}>PixFlow</Title>
      </Flex>

      <Container component="main">
        <SimpleGrid cols={3} spacing="0.5rem">
          {images.map((image, index) =>
            index === 0 ? (
              <Indicator
                key={image.id}
                inline
                label="New"
                color="red"
                size="1rem"
                styles={{ indicator: { transform: "translate(-0.25rem, 0.25rem)" } }}
              >
                <AspectRatio>
                  <Image src={image.downloadUrl} alt={image.prompt} radius="0.5rem" bg="gray" />
                </AspectRatio>
              </Indicator>
            ) : (
              <AspectRatio key={image.id}>
                <Image src={image.downloadUrl} alt={image.prompt} radius="0.5rem" bg="gray" />
              </AspectRatio>
            )
          )}
        </SimpleGrid>
      </Container>

      <Flex component="footer" justify="center" align="center" p="xs">
        <Text>&copy; 2025 ChaiyoKung</Text>
      </Flex>
    </HydrateClient>
  );
}
