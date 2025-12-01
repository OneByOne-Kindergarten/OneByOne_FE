import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getUserInfo } from "@/entities/user/api";
import { useToast } from "@/shared/hooks/useToast";

import { deleteWorkReview } from "../api";
import { LikeResponse } from "../DTO.d";

export const useDeleteWorkReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    LikeResponse,
    Error,
    {
      workReviewId: number;
      kindergartenId?: number;
    }
  >({
    mutationFn: ({ workReviewId }) => deleteWorkReview(workReviewId),
    onSuccess: async (_, variables) => {
      if (variables.kindergartenId) {
        queryClient.invalidateQueries({
          queryKey: ["workReviews", variables.kindergartenId.toString()],
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["myPosts"],
      });

      await getUserInfo();

      toast({
        title: "근무 리뷰 삭제 완료",
        description: "리뷰가 삭제되었습니다.",
        variant: "default",
      });
    },
    onError: (error) => {
      let errorMessage = "잠시 후 다시 시도해주세요.";

      if (error instanceof Error && error.message) {
        if (error.message !== "Failed to fetch") {
          errorMessage = error.message;
        }
      }

      toast({
        title: "근무 리뷰 삭제 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
