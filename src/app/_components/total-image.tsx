"use client";

import { Text } from "@mantine/core";
import { api } from "~/trpc/react";

export function TotalImage() {
  const { isLoading, isError, error, data } = api.image.count.useQuery({});

  let total: string;
  if (isLoading) {
    total = "Loading...";
  } else if (error) {
    total = `Error: ${error.message}`;
  } else if (!data) {
    total = "No data available";
  } else {
    total = data.toString();
  }

  return (
    <Text size="lg" c={isError ? "red" : "blue"}>
      Total Images: {total}
    </Text>
  );
}
