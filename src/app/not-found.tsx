import { Button, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <Stack align="center" justify="center" flex={1}>
      <Stack gap={0} align="center">
        <Title order={1}>404</Title>
        <Title order={2}>Page not found</Title>
      </Stack>

      <Button component={Link} href="/" radius="md">
        Back to home page
      </Button>
    </Stack>
  );
}
