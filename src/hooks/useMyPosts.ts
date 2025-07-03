import { useInfiniteQuery } from "@tanstack/react-query";

import { getMyPosts } from "@/services/myPostService";
import { MyPostParams } from "@/types/myPostDTO";

const DEFAULT_PAGE_SIZE = 10;

export const useMyPosts = (initialParams?: Partial<MyPostParams>) => {
  return useInfiniteQuery({
    queryKey: ["myPosts", initialParams],
    queryFn: ({ pageParam = 0 }) =>
      getMyPosts({
        page: pageParam,
        size: DEFAULT_PAGE_SIZE,
        ...initialParams,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 0,
  });
};
