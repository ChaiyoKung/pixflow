import { Flex, Title, UnstyledButton } from "@mantine/core";
import Link from "next/link";

export function Header() {
  return (
    <Flex
      component="header"
      justify="center"
      align="center"
      p="xs"
      pos="sticky"
      top={0}
      styles={{ root: { backdropFilter: "blur(3rem)", zIndex: 9999, backgroundColor: "rgba(36, 36, 36, 0.75)" } }}
    >
      <UnstyledButton component={Link} href="/">
        <Title order={1}>PixFlow</Title>
      </UnstyledButton>
    </Flex>
  );
}
