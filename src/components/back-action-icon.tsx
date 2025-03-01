"use client";

import { ActionIcon } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function BackActiveIcon() {
  const router = useRouter();

  return (
    <ActionIcon variant="subtle" color="gray" radius="md" onClick={() => router.back()}>
      <IconArrowLeft />
    </ActionIcon>
  );
}
