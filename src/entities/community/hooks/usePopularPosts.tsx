import { useSuspenseQuery } from "@tanstack/react-query";

import { getPopularPosts } from "@/entities/community/api";
import { DYNAMIC_CACHE_CONFIG } from "@/shared/config/query";

import { PopularPostsResponse } from "../DTO.d";

export const usePopularPosts = () => {
  return useSuspenseQuery<PopularPostsResponse>({
    queryKey: ["popularPosts"],
    queryFn: getPopularPosts,
    ...DYNAMIC_CACHE_CONFIG,
  });
};
