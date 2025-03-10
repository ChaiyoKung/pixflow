"use client";

import { ActionIcon, type ActionIconProps } from "@mantine/core";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { type ReactNode } from "react";
import { convertSearchParamsToObject } from "../../utils/convert-search-params-to-object";

export interface PaginationItemProps {
  page: number;
  isActive?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
}

export function PaginationItem({ page, isActive, isDisabled, children }: PaginationItemProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const size: ActionIconProps["size"] = "lg";
  const redius: ActionIconProps["radius"] = "md";
  const notActiveVariant: ActionIconProps["variant"] = "light";
  const notActiveColor: ActionIconProps["color"] = "gray";

  if (isDisabled) {
    return (
      <ActionIcon size={size} radius={redius} variant={notActiveVariant} color={notActiveColor} disabled>
        {children}
      </ActionIcon>
    );
  }

  return (
    <NextLink
      href={{
        pathname,
        query: { ...convertSearchParamsToObject(searchParams), page },
      }}
      passHref
      legacyBehavior
    >
      <ActionIcon
        component="a"
        size={size}
        radius={redius}
        variant={isActive ? "filled" : notActiveVariant}
        color={isActive ? "blue" : notActiveColor}
      >
        {children}
      </ActionIcon>
    </NextLink>
  );
}
