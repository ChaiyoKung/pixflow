import {
  AspectRatio,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { api, HydrateClient } from "~/trpc/server";
import { Header } from "~/app/_components/header";
import { Footer } from "~/app/_components/footer";
import Image from "next/image";
import { IconPhotoDown } from "@tabler/icons-react";
import { BackActiveIcon } from "~/components/back-action-icon";

export default async function ImageDetail({ params }: { params: Promise<{ imageId: string }> }) {
  const { imageId } = await params;
  const { prompt, downloadUrl, width, height, orientation, keywords } = await api.image.get({ id: imageId });

  return (
    <HydrateClient>
      <Header />

      <Container component="main">
        <Flex mb="sm" justify="space-between">
          <BackActiveIcon />

          <Button component="a" href={downloadUrl} download radius="md" leftSection={<IconPhotoDown size="1rem" />}>
            Download Image
          </Button>
        </Flex>

        <SimpleGrid cols={{ xs: 1, sm: orientation === "horizontal" ? 1 : 2 }} spacing="sm">
          <AspectRatio
            ratio={width / height}
            pos="relative"
            bg="gray"
            h="fit-content"
            style={{ borderRadius: "var(--mantine-radius-md)" }}
          >
            <Image
              src={downloadUrl}
              alt={prompt}
              width={width}
              height={height}
              quality={75}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "var(--mantine-radius-md)",

                // HACK: Fix "next/image" marbin bottom
                // https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom
                verticalAlign: "middle",
              }}
            />
          </AspectRatio>

          <Card radius="md" h="fit-content">
            <Stack gap="sm">
              <Title order={3} c="blue">
                Keywords:
              </Title>
              <Flex wrap="wrap" gap="xs">
                {keywords.map((keyword) => (
                  <Badge key={keyword} variant="filled">
                    {keyword}
                  </Badge>
                ))}
              </Flex>
            </Stack>

            <Divider my="lg" />

            <Stack gap="sm">
              <Title order={3} c="blue">
                Prompt:
              </Title>
              <Text>{prompt}</Text>
            </Stack>
          </Card>
        </SimpleGrid>
      </Container>

      <Footer />
    </HydrateClient>
  );
}
