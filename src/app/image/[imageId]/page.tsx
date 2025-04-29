import { Badge, Button, Card, Divider, Flex, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { api, HydrateClient } from "~/trpc/server";
import { IconPhotoDown } from "@tabler/icons-react";
import { BackActiveIcon } from "~/components";
import { type Metadata } from "next";
import Link from "next/link";
import { PreviewImage } from "~/components/preview-image";

interface ImageDetailProps {
  params: Promise<{ imageId: string }>;
}

export async function generateMetadata({ params }: ImageDetailProps): Promise<Metadata> {
  const { imageId } = await params;
  const { prompt, keywords } = await api.image.get({ id: imageId });

  return {
    title: "Image Detail | PixFlow",
    description: prompt,
    keywords,
  };
}

export default async function ImageDetail({ params }: ImageDetailProps) {
  const { imageId } = await params;
  const image = await api.image.get({ id: imageId });
  const { prompt, downloadUrl, orientation, keywords } = image;

  return (
    <HydrateClient>
      <Flex mb="sm" justify="space-between">
        <BackActiveIcon />

        <Button component="a" href={downloadUrl} download radius="md" leftSection={<IconPhotoDown size="1rem" />}>
          Download Image
        </Button>
      </Flex>

      <SimpleGrid cols={{ xs: 1, sm: orientation === "horizontal" ? 1 : 2 }} spacing="sm">
        <PreviewImage data={image} h="fit-content" />

        <Card radius="md" h="fit-content">
          <Stack gap="sm">
            <Title order={3} c="blue">
              Keywords:
            </Title>
            <Flex wrap="wrap" gap="xs">
              {keywords.map((keyword) => (
                <Link key={keyword} href={`/keyword/${keyword}`}>
                  <Badge variant="filled" styles={{ root: { cursor: "pointer" } }}>
                    {keyword}
                  </Badge>
                </Link>
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
    </HydrateClient>
  );
}
