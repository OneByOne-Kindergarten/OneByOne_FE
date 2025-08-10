import { useQuery } from "@tanstack/react-query";

import { DETAIL_CACHE_CONFIG } from "@/shared/config/query";

import { getCommunityPostDetail } from "../api";
import { CommunityPostDetailResponse } from "../DTO.d";

/**
 * 게시글 상세 조회
 * @param id 게시글 ID
 * @returns
 */
export const useCommunityPostDetail = (id: number) => {
  return useQuery<CommunityPostDetailResponse>({
    queryKey: ["communityPost", id],
    queryFn: () => getCommunityPostDetail(id),
    enabled: !!id,
    ...DETAIL_CACHE_CONFIG,
  });
};
