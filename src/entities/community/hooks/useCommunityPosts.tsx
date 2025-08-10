import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { DYNAMIC_CACHE_CONFIG } from "@/shared/config/query";

import { getCommunityPosts } from "../api";

export const useCommunityPosts = (
  pageSize = 10,
  category: "TEACHER" | "PROSPECTIVE_TEACHER",
  options?: {
    categoryName?: string;
    title?: string;
    content?: string;
    userName?: string;
  }
) => {
  // queryKey를 안정적으로 생성하기 위해 문자열 배열로 변경
  const queryKey = [
    "communityPosts",
    category,
    pageSize.toString(),
    options?.categoryName || "all",
    options?.title || "",
    options?.content || "",
    options?.userName || "",
  ];

  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) =>
      getCommunityPosts({
        page: pageParam,
        size: pageSize,
        category,
        ...options,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.content || lastPage.content.length === 0) return undefined;

      if (lastPage.last) return undefined;

      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    ...DYNAMIC_CACHE_CONFIG,
  });
};
