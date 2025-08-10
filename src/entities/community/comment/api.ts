import { apiCall } from "@/shared/api/utils";
import { API_PATHS } from "@/shared/config/api";

import {
  CommentListParams,
  CommentListResponse,
  CreateCommentRequest,
  CreateCommentResponse,
} from "./DTO.d";

/**
 * 댓글 목록 조회
 * @param params
 * @param params.postId
 * @param params.page 기본 값 0
 * @param params.size 기본 값 10
 * @param params.sort 기본 값 최신순
 */
export const getComments = async (
  params: CommentListParams
): Promise<CommentListResponse> => {
  const queryParams = new URLSearchParams({
    page: params.page?.toString() || "0",
    size: params.size?.toString() || "10",
    ...(params.sort && { sort: params.sort.join(",") }),
  }).toString();

  return apiCall<void, CommentListResponse>({
    method: "GET",
    path: `${API_PATHS.COMMUNITY.COMMENT.ALL(params.postId)}?${queryParams}`,
    withAuth: true,
  });
};

/**
 * 댓글 작성
 * @param data
 * @param data.postId
 * @param data.content
 * @param data.parentId 대댓글인 경우 원댓글 ID
 */
export const createComment = async (
  data: CreateCommentRequest
): Promise<CreateCommentResponse> => {
  const { postId, ...commentData } = data;

  return apiCall<Omit<CreateCommentRequest, "postId">, CreateCommentResponse>({
    method: "POST",
    path: API_PATHS.COMMUNITY.COMMENT.BASE(postId),
    data: commentData,
    withAuth: true,
  });
};

/**
 * 댓글 삭제
 * @param commentId 삭제할 댓글 ID
 */
export const deleteComment = async (commentId: number): Promise<void> => {
  return apiCall<void, void>({
    method: "DELETE",
    path: API_PATHS.COMMUNITY.COMMENT.DELETE(commentId),
    withAuth: true,
  });
};
