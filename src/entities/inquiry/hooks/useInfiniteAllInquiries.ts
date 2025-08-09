import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { INQUIRY_CACHE_CONFIG } from "@/common/constants/query-config";

import { getAllInquiries } from "../api";

import type { InquiryResponse } from "../DTO.d";

interface PaginationOptions {
  pageSize?: number;
  sort?: string;
}

function getNextPageParam(lastPage: InquiryResponse) {
  if (lastPage.last) return undefined;
  return (lastPage.pageNumber ?? 0) + 1;
}

export function useInfiniteAllInquiries(options?: PaginationOptions) {
  const pageSize = options?.pageSize ?? 10;
  const sort = options?.sort ?? "";

  return useSuspenseInfiniteQuery<InquiryResponse>({
    queryKey: ["inquiries", "infinite", pageSize, sort],
    queryFn: ({ pageParam = 0 }) =>
      getAllInquiries({ page: pageParam as number, size: pageSize, sort }),
    initialPageParam: 0,
    getNextPageParam,
    ...INQUIRY_CACHE_CONFIG,
  });
}
