import { useQuery } from "@tanstack/react-query";

import { REALTIME_CACHE_CONFIG } from "@/shared/config/query";

import { getLikeStatus } from "../api";
import { LikeStatusResponse } from "../DTO.d";

export const useLikeStatus = (postId: number) => {
  return useQuery<LikeStatusResponse>({
    queryKey: ["likeStatus", postId],
    queryFn: () => getLikeStatus(postId),
    enabled: !!postId,
    ...REALTIME_CACHE_CONFIG,
  });
};
