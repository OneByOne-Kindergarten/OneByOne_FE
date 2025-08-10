import { useMutation } from "@tanstack/react-query";

import { toast } from "@/shared/hooks/useToast";

import { toggleLike } from "../api";
import { LikeStatusResponse } from "../DTO.d";

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
