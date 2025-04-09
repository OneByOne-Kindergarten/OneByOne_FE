import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getCommunityPostDetail,
  getPopularPosts,
  getCommunityPosts,
  toggleLike,
  createCommunityPost,
} from "@/services/communityService";
import {
  CommunityPostDetailResponse,
  PopularPostsResponse,
  LikeStatusResponse,
  CreateCommunityPostRequest,
  CreateCommunityPostResponse,
} from "@/types/communityDTO";

// 인기 게시글 TOP 10 조회
export const usePopularPosts = () => {
  return useQuery<PopularPostsResponse>({
    queryKey: ["popularPosts"],
    queryFn: getPopularPosts,
  });
};

// 게시글 목록 조회
export const useCommunityPosts = (pageSize = 10) => {
  return useInfiniteQuery({
    queryKey: ["communityPosts"],
    queryFn: ({ pageParam = 1 }) => getCommunityPosts(pageParam, pageSize),
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지가 비어있으면 더 이상 불러올 데이터가 없음
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};

// 게시글 상세 조회
export const useCommunityPostDetail = (id: number) => {
  return useQuery<CommunityPostDetailResponse>({
    queryKey: ["communityPost", id],
    queryFn: () => getCommunityPostDetail(id),
  });
};

// 게시글 좋아요 토글
export const useToggleLike = () => {
  return useMutation<LikeStatusResponse, Error, number>({
    mutationFn: (postId) => toggleLike(postId),
  });
};

// 게시글 작성
export const useCreatePost = () => {
  return useMutation<
    CreateCommunityPostResponse,
    Error,
    CreateCommunityPostRequest
  >({
    mutationFn: createCommunityPost,
  });
};

// TODO: 게시글 수정
// export const useUpdatePost = () => {
//   return useMutation<
//     UpdateCommunityPostResponse,
//     Error,
//     UpdateCommunityPostRequest
//   >({
//     mutationFn: updateCommunityPost,
//   });
// };

// TODO: 게시글 삭제
