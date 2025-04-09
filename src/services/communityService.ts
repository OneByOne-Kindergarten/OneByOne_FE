import { apiCall } from "@/utils/apiUtils";
import { API_PATHS } from "@/constants/api-path";
import {
  CommunityPostData,
  CommunityPostDetailResponse,
  PopularPostsResponse,
  CreateCommunityPostRequest,
  CreateCommunityPostResponse,
  LikeStatusResponse,
} from "@/types/communityDTO";

// 게시글 목록
export const getCommunityPosts = async (
  page = 1,
  size = 10,
  sort = "latest"
) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  }).toString();

  return apiCall<void, CommunityPostData[]>({
    method: "GET",
    path: `${API_PATHS.COMMUNITY.POST.BASE}?${queryParams}`,
  });
};

// 게시글 상세
export const getCommunityPostDetail = async (
  id: number
): Promise<CommunityPostDetailResponse> => {
  return apiCall<void, CommunityPostDetailResponse>({
    method: "GET",
    path: API_PATHS.COMMUNITY.POST.DETAIL(id),
  });
};

// export const updateCommunityPost = async (
//   postId: number,
//   data: UpdateCommunityPostRequest
// ): Promise<UpdateCommunityPostResponse> => {
//   return apiCall<UpdateCommunityPostRequest, UpdateCommunityPostResponse>({
//     method: "PUT",
//     path: API_PATHS.COMMUNITY.POST.DETAIL(postId),
//     data,
//     withAuth: true,
//   });
// };

// 인기 게시글 TOP 10
export const getPopularPosts = async (): Promise<PopularPostsResponse> => {
  return apiCall<void, PopularPostsResponse>({
    method: "GET",
    path: API_PATHS.COMMUNITY.POST.TOP,
  });
};

// 게시글 좋아요 토글
export const toggleLike = async (
  postId: number
): Promise<LikeStatusResponse> => {
  return apiCall<void, LikeStatusResponse>({
    method: "POST",
    path: API_PATHS.COMMUNITY.POST.LIKE(postId),
    withAuth: true,
  });
};

// 게시글 작성
export const createCommunityPost = async (
  data: CreateCommunityPostRequest
): Promise<CreateCommunityPostResponse> => {
  return apiCall<CreateCommunityPostRequest, CreateCommunityPostResponse>({
    method: "POST",
    path: API_PATHS.COMMUNITY.POST.BASE,
    data,
    withAuth: true,
  });
};
