import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/common/hooks/useToast";

import { createComment } from "../api";
import { CreateCommentRequest, CreateCommentResponse } from "../DTO.d";

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
