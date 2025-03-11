"use client";

import { Button, Container, Stack, Title } from "@mantine/core";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import Link from "next/link";

export default function Error() {
  return (
    <Stack mih="100vh">
      <Header />

      <Container
        component="main"
        flex={1}
        display="flex"
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "var(--mantine-spacing-md)",
        }}
      >
        <Title order={1}>Something went wrong!</Title>

        <Link href="/" passHref legacyBehavior>
          <Button component="a" radius="md">
            Back to home page
          </Button>
        </Link>
      </Container>

      <Footer />
    </Stack>
  );
}
