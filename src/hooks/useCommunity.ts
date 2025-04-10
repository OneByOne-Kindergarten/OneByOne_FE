import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/useToast";

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
import { URL_PATHS } from "@/constants/url-path";
import React from "react";

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

/**
 * 게시글 생성 API 호출
 * - 에러 처리
 * - 토스트 메세지 관리
 */
export const useCreatePost = () => {
  return useMutation<
    CreateCommunityPostResponse,
    Error,
    CreateCommunityPostRequest
  >({
    mutationFn: createCommunityPost,
    onSuccess: () => {
      toast({
        title: "게시글 등록 완료",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "게시글 등록 실패",
        variant: "destructive",
      });
      console.error("게시글 생성 에러:", error);
    },
  });
};

export const useCreateCommunityPost = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateCommunityPostRequest) => createCommunityPost(data),
    onSuccess: () => {
      toast({
        title: "게시글 등록 완료",
        variant: "default",
      });
      navigate(URL_PATHS.COMMUNITY);
    },
    onError: (error) => {
      toast({
        title: "게시글 등록 실패",
        variant: "destructive",
      });
      console.error("게시글 생성 에러:", error);
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
