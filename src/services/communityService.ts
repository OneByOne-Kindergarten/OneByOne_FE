import { API_PATHS } from "@/constants/api-path";
import {
  CommentListParams,
  CommentListResponse,
  CommunityPostData,
  CommunityPostDetailResponse,
  CommunityPostParams,
  CreateCommentRequest,
  CreateCommentResponse,
  CreateCommunityPostRequest,
  CreateCommunityPostResponse,
  LikeStatusRequest,
  LikeStatusResponse,
  PopularPostsResponse,
} from "@/types/communityDTO";
import { apiCall } from "@/utils/apiUtils";

/**
 * 인기 게시글 조회
 */
export const getPopularPosts = async (): Promise<PopularPostsResponse> => {
  return apiCall<void, PopularPostsResponse>({
    method: "GET",
    path: API_PATHS.COMMUNITY.POST.TOP,
  });
};

/**
 * 게시글 목록 조회
 * @param params 게시글 목록 조회 파라미터
 * @param params.category 상위 카테고리 (TEACHER, PROSPECTIVE_TEACHER)
 * @param params.categoryName 하위 카테고리
 * @param params.title
 * @param params.content
 * @param params.userName 게시글 작성자 이름
 * @param params.page 기본 값 0
 * @param params.size 기본 값 10
 * @param params.sort 기본 값 최신순
 */
export const getCommunityPosts = async (
  params: CommunityPostParams
): Promise<CommunityPostData> => {
  const queryParams = new URLSearchParams();

  queryParams.append("page", params.page?.toString() || "0");
  queryParams.append("size", params.size?.toString() || "10");
  queryParams.append("category", params.category || "TEACHER");

  if (params.categoryName && params.categoryName.trim() !== "") {
    queryParams.append("categoryName", params.categoryName);
  }

  if (params.title && params.title.trim() !== "") {
    queryParams.append("title", params.title);
  }

  if (params.content && params.content.trim() !== "") {
    queryParams.append("content", params.content);
  }

  if (params.userName && params.userName.trim() !== "") {
    queryParams.append("userName", params.userName);
  }

  return apiCall<void, CommunityPostData>({
    method: "GET",
    path: `${API_PATHS.COMMUNITY.BASE}?${queryParams.toString()}`,
    withAuth: true,
  });
};

/**
 * 게시글 상세 조회
 * @param id
 */
export const getCommunityPostDetail = async (
  id: number
): Promise<CommunityPostDetailResponse> => {
  return apiCall<void, CommunityPostDetailResponse>({
    method: "GET",
    path: API_PATHS.COMMUNITY.POST.DETAIL(id),
  });
};

/**
 * 게시글 작성
 * @param data
 * @param data.title
 * @param data.content
 * @param data.category 상위 카테고리 (TEACHER, PROSPECTIVE_TEACHER)
 * @param data.communityCategoryName 하위 카테고리
 * @param data.communityCategoryDescription 하위 카테고리 설명
 */
export const createCommunityPost = async (
  data: CreateCommunityPostRequest
): Promise<CreateCommunityPostResponse> => {
  return apiCall<CreateCommunityPostRequest, CreateCommunityPostResponse>({
    method: "POST",
    path: API_PATHS.COMMUNITY.BASE,
    data,
    withAuth: true,
  });
};

/**
 * 게시글 좋아요 상태 조회
 * @param postId
 */
export const getLikeStatus = async (
  postId: number
): Promise<LikeStatusResponse> => {
  return apiCall<void, LikeStatusResponse>({
    method: "GET",
    path: API_PATHS.COMMUNITY.POST.LIKE(postId),
    withAuth: true,
  });
};

/**
 * 게시글 좋아요 토글
 * @param postId
 */
export const toggleLike = async (
  postId: number
): Promise<LikeStatusResponse> => {
  const data: LikeStatusRequest = { postId };
  return apiCall<LikeStatusRequest, LikeStatusResponse>({
    method: "POST",
    path: API_PATHS.COMMUNITY.POST.LIKE(postId),
    data,
    withAuth: true,
  });
};

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
 * 게시글 삭제
 * @param postId 삭제할 게시글 ID
 */
export const deleteCommunityPost = async (postId: number): Promise<void> => {
  return apiCall<void, void>({
    method: "DELETE",
    path: API_PATHS.COMMUNITY.POST.DELETE(postId),
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
