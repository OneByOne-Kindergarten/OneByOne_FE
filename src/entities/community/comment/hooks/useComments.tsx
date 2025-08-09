import {
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

import { DYNAMIC_CACHE_CONFIG } from "@/common/constants/query-config";

import { getComments } from "../api";
import { CommentListParams, CommentListResponse } from "../DTO.d";

/**
 * 댓글 목록 조회
 * @param params 댓글 목록 조회 파라미터
 */
export const useComments = (params: CommentListParams) => {
  const queryClient = useQueryClient();

  const startPage = 0;

  const result = useSuspenseInfiniteQuery<CommentListResponse>({
    queryKey: ["comments", params.postId],
    queryFn: ({ pageParam = startPage }) =>
      getComments({
        ...params,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage): number | undefined =>
      lastPage.last ? undefined : lastPage.pageNumber + 1,
    initialPageParam: startPage,
    ...DYNAMIC_CACHE_CONFIG,
  });

  // 댓글 작성 후 댓글을 다시 불러오기 위한 함수
  const refetchComments = () => {
    return queryClient.invalidateQueries({
      queryKey: ["comments", params.postId],
    });
  };

  return {
    ...result,
    refetchComments,
  };
};
