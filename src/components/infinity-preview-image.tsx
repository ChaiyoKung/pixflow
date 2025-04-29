"use client";

import { Fragment, useEffect } from "react";
import { api } from "~/trpc/react";
import Link from "next/link";
import { Alert, Button, Center, SimpleGrid } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { PreviewImageSkeleton } from "./preview-image-skeleton";
import { ConditionPreviewImage } from "./condition-preview-image";

const limit = 12;

export interface InfinityPreviewImageProps {
  keywords?: string[];
  showNew?: boolean;
}

export function InfinityPreviewImage({ keywords, showNew }: InfinityPreviewImageProps) {
  const { isLoading, error, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    api.image.infinity.useInfiniteQuery({ limit, keywords }, { getNextPageParam: (lastPage) => lastPage.nextCursor });

  const { ref, entry } = useIntersection({
    threshold: 0,
    rootMargin: "80%",
  });
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      void fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage]);

  const loadingSkeletons = Array.from({ length: limit }).map((_, index) => <PreviewImageSkeleton key={index} />);

  if (isLoading) return <ResponsiveGrid>{loadingSkeletons}</ResponsiveGrid>;

  if (error)
    return (
      <Alert color="red" title="Error">
        {error.message}
      </Alert>
    );

  if (!data || data.pages.length === 0 || data.pages[0]?.images.length === 0) {
    return (
      <Alert color="red" title="No Images Found" radius="md">
        There are currently no images available
      </Alert>
    );
  }

  return (
    <>
      <ResponsiveGrid>
        {data.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.images.map((image, imageIndex) => (
              <Link key={image.id} href={`/image/${image.id}`}>
                <ConditionPreviewImage
                  data={image}
                  isNew={showNew && pageIndex === 0 && imageIndex === 0}
                  quality={10}
                  square
                />
              </Link>
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage && loadingSkeletons}
      </ResponsiveGrid>

      {hasNextPage && (
        <Center my="xl">
          <Button ref={ref} onClick={() => fetchNextPage()} loading={isFetchingNextPage} radius="md" variant="outline">
            Show More
          </Button>
        </Center>
      )}
    </>
  );
}

function ResponsiveGrid({ children }: { children?: React.ReactNode }) {
  return (
    <SimpleGrid cols={{ xs: 2, sm: 3 }} spacing="md">
      {children}
    </SimpleGrid>
  );
}
