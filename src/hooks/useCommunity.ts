import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

import {
  DETAIL_CACHE_CONFIG,
  DYNAMIC_CACHE_CONFIG,
  REALTIME_CACHE_CONFIG,
} from "@/constants/query-config";
import { toast } from "@/hooks/useToast";
import {
  createComment,
  createCommunityPost,
  deleteComment,
  deleteCommunityPost,
  getComments,
  getCommunityPostDetail,
  getCommunityPosts,
  getLikeStatus,
  getPopularPosts,
  toggleLike,
} from "@/services/communityService";
import {
  CommentListParams,
  CommentListResponse,
  CommunityPostDetailResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  CreateCommunityPostRequest,
  CreateCommunityPostResponse,
  LikeStatusResponse,
  PopularPostsResponse,
} from "@/types/communityDTO";

export const usePopularPosts = () => {
  return useSuspenseQuery<PopularPostsResponse>({
    queryKey: ["popularPosts"],
    queryFn: getPopularPosts,
    ...DYNAMIC_CACHE_CONFIG,
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
  // queryKey를 안정적으로 생성하기 위해 문자열 배열로 변경
  const queryKey = [
    "communityPosts",
    category,
    pageSize.toString(),
    options?.categoryName || "all",
    options?.title || "",
    options?.content || "",
    options?.userName || "",
  ];

  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) =>
      getCommunityPosts({
        page: pageParam,
        size: pageSize,
        category,
        ...options,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.content || lastPage.content.length === 0) return undefined;

      if (lastPage.last) return undefined;

      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    ...DYNAMIC_CACHE_CONFIG,
  });
};

export const useCommunityPostDetail = (id: number) => {
  return useQuery<CommunityPostDetailResponse>({
    queryKey: ["communityPost", id],
    queryFn: () => getCommunityPostDetail(id),
    enabled: !!id,
    ...DETAIL_CACHE_CONFIG,
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["communityPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["popularPosts"],
      });

      toast({
        title: "게시글이 등록되었습니다.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "게시글 등록에 실패했습니다.",
        variant: "destructive",
      });
    },
  });
};

export const useToggleLike = () => {
  return useMutation<LikeStatusResponse, Error, number>({
    mutationFn: (postId) => toggleLike(postId),
    onError: () => {
      toast({
        title: "좋아요 오류",
        variant: "destructive",
      });
    },
  });
};

export const useLikeStatus = (postId: number) => {
  return useQuery<LikeStatusResponse>({
    queryKey: ["likeStatus", postId],
    queryFn: () => getLikeStatus(postId),
    enabled: !!postId,
    ...REALTIME_CACHE_CONFIG,
  });
};

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

/**
 * 댓글 작성
 */
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateCommentResponse, Error, CreateCommentRequest>({
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
    onError: () => {
      toast({
        title: "댓글 작성에 실패했습니다.",
        variant: "destructive",
      });
    },
  });
};

/**
 * 게시글 삭제
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteCommunityPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["communityPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["popularPosts"],
      });

      toast({
        title: "게시글이 삭제되었습니다.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "게시글 삭제에 실패했습니다.",
        variant: "destructive",
      });
    },
  });
};

/**
 * 댓글 삭제
 */
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { commentId: number; postId: number }>({
    mutationFn: ({ commentId }) => deleteComment(commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
    onError: () => {
      toast({
        title: "댓글 삭제에 실패했습니다.",
        variant: "destructive",
      });
    },
  });
};
