import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/common/hooks/useToast";

import { createCommunityPost } from "../api";
import {
  CreateCommunityPostRequest,
  CreateCommunityPostResponse,
} from "../DTO.d";

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
