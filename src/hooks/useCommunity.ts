import {
  useMutation,
  useQuery,
  useSuspenseInfiniteQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "@/hooks/useToast";

import {
  getCommunityPostDetail,
  getPopularPosts,
  getCommunityPosts,
  createCommunityPost,
  toggleLike,
  getLikeStatus,
  getComments,
  createComment,
} from "@/services/communityService";
import {
  CommunityPostDetailResponse,
  PopularPostsResponse,
  CreateCommunityPostRequest,
  CreateCommunityPostResponse,
  LikeStatusResponse,
  CommentListResponse,
  CommentListParams,
  CreateCommentRequest,
  CreateCommentResponse,
} from "@/types/communityDTO";

export const usePopularPosts = () => {
  return useQuery<PopularPostsResponse>({
    queryKey: ["popularPosts"],
    queryFn: getPopularPosts,
    staleTime: 1000 * 60 * 15, // 15분
    gcTime: 1000 * 60 * 30, // 30분
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

  return useSuspenseInfiniteQuery({
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
    refetchOnMount: true,
    staleTime: 1000 * 60 * 1, // 1분
    gcTime: 1000 * 60 * 5, // 5분
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
  const queryClient = useQueryClient();

  return useMutation<
    CreateCommunityPostResponse,
    Error,
    CreateCommunityPostRequest
  >({
    mutationFn: createCommunityPost,
    onSuccess: (data, variables) => {
      queryClient.refetchQueries({
        queryKey: ["communityPosts"],
        type: "active",
      });

      toast({
        title: "게시글을 등록했습니다.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "게시글 등록에 실패했습니다.",
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
    onError: (error) => {
      toast({
        title: "좋아요 토글에 실패했습니다.",
        description: error.message,
        variant: "destructive",
      });
      console.error("좋아요 토글 에러:", error);
    },
  });
};

export const useLikeStatus = (postId: number) => {
  return useQuery<LikeStatusResponse>({
    queryKey: ["likeStatus", postId],
    queryFn: () => getLikeStatus(postId),
    enabled: !!postId,
  });
};

/**
 * 댓글 목록 조회
 * @param params 댓글 목록 조회 파라미터
 */
export const useComments = (params: CommentListParams) => {
  const queryClient = useQueryClient();

  const startPage = 0;

  const result = useInfiniteQuery<CommentListResponse>({
    queryKey: ["comments", params.postId],
    queryFn: ({ pageParam = startPage }) =>
      getComments({
        ...params,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage): number | undefined =>
      lastPage.last ? undefined : lastPage.pageNumber + 1,
    initialPageParam: startPage,
    enabled: !!params.postId,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
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

/**
 * 댓글 작성
 */
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateCommentResponse, Error, CreateCommentRequest>({
    mutationFn: createComment,
    onSuccess: (data, variables) => {
      // 게시글 및 댓글 관련 모든 쿼리를 한 번에 무효화
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          if (!Array.isArray(queryKey)) return false;

          // 첫 번째 키가 post, comments, likeStatus인 모든 쿼리 무효화
          const primaryKey = queryKey[0];
          if (
            primaryKey === "post" ||
            primaryKey === "comments" ||
            primaryKey === "likeStatus"
          ) {
            // 두 번째 키가 현재 postId인 경우에만 무효화
            const secondaryKey = queryKey[1];
            const postId = variables.postId;
            return (
              secondaryKey === postId || secondaryKey === postId.toString()
            );
          }
          return false;
        },
      });
    },
    onError: (error) => {
      console.error("댓글 작성 에러:", error);

      toast({
        title: "댓글 등록에 실패했습니다.",
        variant: "destructive",
      });
    },
  });
};
