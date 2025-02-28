"use client";

import { Flex } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight, IconDots } from "@tabler/icons-react";
import { PaginationItem } from "./pagination-item";

export interface PaginationProps {
  page?: number;
  total: number;
  initialPage?: number;
  siblings?: number;
}

export function Pagination(props: PaginationProps) {
  const { range, active } = usePagination(props);

  return (
    <Flex gap="0.5rem" justify="center" align="center" wrap="wrap">
      <PaginationItem page={active - 1} isDisabled={active === 1}>
        <IconChevronLeft size="1rem" />
      </PaginationItem>

      {range.map((page, index) => {
        if (page === "dots") {
          return <IconDots key={index} />;
        }

        return (
          <PaginationItem key={index} page={page} isActive={page === active}>
            {page}
          </PaginationItem>
        );
      })}

      <PaginationItem page={active + 1} isDisabled={active === props.total}>
        <IconChevronRight size="1rem" />
      </PaginationItem>
    </Flex>
  );
}
