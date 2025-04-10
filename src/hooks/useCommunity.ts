import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

import {
  getCommunityPostDetail,
  getPopularPosts,
  getCommunityPosts,
  createCommunityPost,
  toggleLike,
  getLikeStatus,
  getComments,
} from "@/services/communityService";
import {
  CommunityPostDetailResponse,
  PopularPostsResponse,
  CreateCommunityPostRequest,
  CreateCommunityPostResponse,
  LikeStatusResponse,
  CommentListResponse,
  CommentListParams,
} from "@/types/communityDTO";

export const usePopularPosts = () => {
  return useQuery<PopularPostsResponse>({
    queryKey: ["popularPosts"],
    queryFn: getPopularPosts,
  });
};

export const useCommunityPosts = (
  pageSize = 10,
  category: "TEACHER" | "PROSPECTIVE_TEACHER",
  options?: {
    categoryName?: string;
    title?: string;
    content?: string;
    userName?: string;
  }
) => {
  const queryParams = {
    pageSize,
    category,
    categoryName: options?.categoryName,
    title: options?.title,
    content: options?.content,
    userName: options?.userName,
  };

  return useInfiniteQuery({
    queryKey: ["communityPosts", queryParams],
    queryFn: ({ pageParam = 0 }) =>
      getCommunityPosts({
        page: pageParam,
        size: pageSize,
        category,
        ...options,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.content || lastPage.content.length === 0) return undefined;

      if (lastPage.last) return undefined;

      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
  });
};

export const useCommunityPostDetail = (id: number) => {
  return useQuery<CommunityPostDetailResponse>({
    queryKey: ["communityPost", id],
    queryFn: () => getCommunityPostDetail(id),
  });
};

export const useCreatePost = (options = { enabled: true }) => {
  const isFirstRender = React.useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
  }

  return useMutation<
    CreateCommunityPostResponse,
    Error,
    CreateCommunityPostRequest
  >({
    mutationFn: async (data) => {
      try {
        const response = await createCommunityPost(data);
        return response;
      } catch (error) {
        console.error("게시글 생성 API 오류:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("게시글 생성 Mutation 오류:", error);
    },
  });
};

// TODO: 게시글 수정

// TODO: 게시글 삭제

export const useToggleLike = () => {
  return useMutation<LikeStatusResponse, Error, number>({
    mutationFn: (postId) => toggleLike(postId),
  });
};

export const useLikeStatus = (postId: number) => {
  return useQuery<LikeStatusResponse>({
    queryKey: ["likeStatus", postId],
    queryFn: () => getLikeStatus(postId),
    enabled: !!postId,
  });
};

export const useComments = (params: CommentListParams) => {
  return useQuery<CommentListResponse>({
    queryKey: ["comments", params],
    queryFn: () => getComments(params),
    enabled: !!params.postId,
  });
};
