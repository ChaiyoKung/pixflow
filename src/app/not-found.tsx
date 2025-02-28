import { Button, Container, Stack, Title } from "@mantine/core";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import Link from "next/link";

export default function NotFound() {
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
        <Stack gap={0} justify="center" align="center">
          <Title order={1}>404</Title>
          <Title order={2}>Page not found</Title>
        </Stack>

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
