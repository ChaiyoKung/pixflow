import { Flex, Title } from "@mantine/core";

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
      <Title order={1}>PixFlow</Title>
    </Flex>
  );
}
