"use client";

import { Button, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default function Error() {
  return (
    <Stack align="center" justify="center" flex={1}>
      <Title order={1}>Something went wrong!</Title>

      <Link href="/" passHref legacyBehavior>
        <Button component="a" radius="md">
          Back to home page
        </Button>
      </Link>
    </Stack>
  );
}
