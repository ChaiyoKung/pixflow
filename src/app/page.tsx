import { AspectRatio, Box, Container, Flex, Indicator, Text, Title } from "@mantine/core";
import Image from "next/image";
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
        <Box style={{ columns: "3", columnGap: "0.5rem" }}>
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
                <AspectRatio ratio={image.width / image.height} pos="relative" mb="0.5rem">
                  <Image
                    src={image.downloadUrl}
                    alt={image.prompt}
                    width={image.width}
                    height={image.height}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "0.5rem",
                      verticalAlign: "middle",
                    }}
                  />
                </AspectRatio>
              </Indicator>
            ) : (
              <AspectRatio key={image.id} ratio={image.width / image.height} pos="relative" mb="0.5rem">
                <Image
                  src={image.downloadUrl}
                  alt={image.prompt}
                  width={image.width}
                  height={image.height}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                    verticalAlign: "middle",
                  }}
                />
              </AspectRatio>
            )
          )}
        </Box>
      </Container>

      <Flex component="footer" justify="center" align="center" p="xs">
        <Text>&copy; 2025 ChaiyoKung</Text>
      </Flex>
    </HydrateClient>
  );
}
