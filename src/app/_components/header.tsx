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
      styles={{ root: { backdropFilter: "blur(5rem)", zIndex: 9999 } }}
    >
      <Title order={1}>PixFlow</Title>
    </Flex>
  );
}
