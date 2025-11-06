import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/shared/hooks/useToast";

import { deleteInternshipReview } from "../api";
import { LikeResponse } from "../DTO.d";

/**
 * 실습 리뷰 삭제 훅
 * @returns mutation 객체
 */
export const useDeleteInternshipReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    LikeResponse,
    Error,
    {
      internshipReviewId: number;
      kindergartenId?: number;
    }
  >({
    mutationFn: ({ internshipReviewId }) =>
      deleteInternshipReview(internshipReviewId),
    onSuccess: (_, variables) => {
      // 해당 유치원의 실습 리뷰 목록을 다시 불러오기
      if (variables.kindergartenId) {
        queryClient.invalidateQueries({
          queryKey: ["internshipReviews", variables.kindergartenId.toString()],
        });
      }

      // 내 게시물 목록도 갱신
      queryClient.invalidateQueries({
        queryKey: ["myPosts"],
      });

      toast({
        title: "실습 리뷰 삭제 완료",
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
        title: "실습 리뷰 삭제 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
