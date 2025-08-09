import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { INQUIRY_CACHE_CONFIG } from "@/common/constants/query-config";

import { getMyInquiries } from "../api";

import type { InquiryResponse } from "../DTO.d";

interface PaginationOptions {
  pageSize?: number;
  sort?: string;
}

function getNextPageParam(lastPage: InquiryResponse) {
  if (lastPage.last) return undefined;
  return (lastPage.pageNumber ?? 0) + 1;
}

export function useInfiniteMyInquiries(options?: PaginationOptions) {
  const pageSize = options?.pageSize ?? 10;
  const sort = options?.sort ?? "";

  return useSuspenseInfiniteQuery<InquiryResponse>({
    queryKey: ["myInquiries", "infinite", pageSize, sort],
    queryFn: ({ pageParam = 0 }) =>
      getMyInquiries({ page: pageParam as number, size: pageSize, sort }),
    initialPageParam: 0,
    getNextPageParam,
    ...INQUIRY_CACHE_CONFIG,
  });
}
