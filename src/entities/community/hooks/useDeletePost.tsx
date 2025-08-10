import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/shared/hooks/useToast";

import { deleteCommunityPost } from "../api";

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
