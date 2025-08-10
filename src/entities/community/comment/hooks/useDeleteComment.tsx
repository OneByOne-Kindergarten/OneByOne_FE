import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/shared/hooks/useToast";

import { deleteComment } from "../api";

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
