import { useSuspenseQuery } from "@tanstack/react-query";

import { DYNAMIC_CACHE_CONFIG } from "@/common/constants/query-config";
import { getPopularPosts } from "@/entities/community/api";

import { PopularPostsResponse } from "../DTO.d";

export const usePopularPosts = () => {
  return useSuspenseQuery<PopularPostsResponse>({
    queryKey: ["popularPosts"],
    queryFn: getPopularPosts,
    ...DYNAMIC_CACHE_CONFIG,
  });
};
