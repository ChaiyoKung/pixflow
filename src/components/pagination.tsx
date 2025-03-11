"use client";

import { Pagination as MtPagination, type PaginationProps as MtPaginationProps } from "@mantine/core";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { convertSearchParamsToObject } from "../utils/convert-search-params-to-object";

export interface PaginationProps
  extends Omit<
    MtPaginationProps,
    | "getItemProps"
    | "getControlProps"
    | "value"
    | "defaultValue"
    | "onChange"
    | "onNextPage"
    | "onPreviousPage"
    | "onFirstPage"
    | "onLastPage"
  > {
  page: number;
}

export function Pagination({ page, ...props }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <MtPagination
      {...props}
      value={page}
      getItemProps={(page) => ({
        component: NextLink,
        href: { pathname, query: { ...convertSearchParamsToObject(searchParams), page } },
      })}
      getControlProps={(control) => {
        if (control === "first") {
          return { component: NextLink, href: { pathname, query: { page: 1 } } };
        }

        if (control === "last") {
          return { component: NextLink, href: { pathname, query: { page: props.total } } };
        }

        if (control === "next") {
          return { component: NextLink, href: { pathname, query: { page: page + 1 } } };
        }

        if (control === "previous") {
          return { component: NextLink, href: { pathname, query: { page: page - 1 } } };
        }

        return {};
      }}
    />
  );
}
